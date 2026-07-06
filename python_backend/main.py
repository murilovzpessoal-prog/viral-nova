import base64
import cv2
import numpy as np
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import mediapipe as mp

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TextureTransferRequest(BaseModel):
    original_base64: str
    generated_base64: str
    blend_opacity: float = 0.35

def base64_to_cv2(b64_string):
    if "," in b64_string:
        b64_string = b64_string.split(",")[1]
    img_data = base64.b64decode(b64_string)
    np_arr = np.frombuffer(img_data, np.uint8)
    return cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

def cv2_to_base64(img):
    _, buffer = cv2.imencode('.jpg', img, [int(cv2.IMWRITE_JPEG_QUALITY), 95])
    return "data:image/jpeg;base64," + base64.b64encode(buffer).decode('utf-8')

# Inicializa o MediaPipe Selfie Segmentation
mp_selfie_segmentation = mp.solutions.selfie_segmentation
segmenter = mp_selfie_segmentation.SelfieSegmentation(model_selection=0)

def extract_skin_mask(img):
    # Converte para RGB
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    results = segmenter.process(img_rgb)
    mask = results.segmentation_mask
    
    # Threshold para a máscara do corpo (MediaPipe detecta a pessoa)
    # NOTA: O Selfie Segmentation detecta a pessoa inteira. Para detectar SÓ a pele,
    # uma heurística simples em HSV junto com a máscara da pessoa funciona bem.
    # Convertemos para HSV para isolar tons de pele (heurística básica, mas limitada)
    # Idealmente, o MediaPipe Face/Pose nos daria partes específicas, mas para 
    # simplicidade vamos focar na máscara do corpo + filtro de cor de pele.
    
    # Máscara do corpo
    body_mask = (mask > 0.5).astype(np.uint8) * 255
    
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    # Intervalos generosos para pele em HSV
    lower_skin1 = np.array([0, 20, 70], dtype=np.uint8)
    upper_skin1 = np.array([20, 255, 255], dtype=np.uint8)
    lower_skin2 = np.array([160, 20, 70], dtype=np.uint8)
    upper_skin2 = np.array([180, 255, 255], dtype=np.uint8)
    
    skin_mask1 = cv2.inRange(hsv, lower_skin1, upper_skin1)
    skin_mask2 = cv2.inRange(hsv, lower_skin2, upper_skin2)
    skin_color_mask = cv2.bitwise_or(skin_mask1, skin_mask2)
    
    # Combina: Deve ser corpo E deve ser tom de pele
    final_skin_mask = cv2.bitwise_and(body_mask, skin_color_mask)
    
    # Operações morfológicas para suavizar
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
    final_skin_mask = cv2.morphologyEx(final_skin_mask, cv2.MORPH_OPEN, kernel)
    final_skin_mask = cv2.GaussianBlur(final_skin_mask, (15, 15), 0)
    
    return final_skin_mask

def apply_frequency_separation(original, generated, skin_mask, opacity=0.35):
    # 1. Alinhamento: Nós vamos assumir que as imagens já estão relativamente alinhadas.
    # Se precisarmos, o ECC pode ser feito, mas Optical Flow denso é mais seguro se 
    # a IA geradora (Kling) alterou a pose sutilmente.
    # Para economizar tempo real no backend e estabilidade, vamos usar a textura original 
    # diretamente, assumindo que pose e escala não mudaram drasticamente.
    # Caso mude, podemos implementar cv2.findTransformECC.
    
    # Redimensiona para garantir mesmo tamanho
    h, w = generated.shape[:2]
    original = cv2.resize(original, (w, h))
    
    # 2. Separação de Frequência da Original
    # Low Frequency: Gaussian Blur
    blur_radius = 21 # Deve ser ímpar
    low_freq = cv2.GaussianBlur(original, (blur_radius, blur_radius), 0)
    
    # High Frequency: Original - Low Freq + 128
    # Convertemos para int16 para não dar overflow
    orig_16 = original.astype(np.int16)
    low_16 = low_freq.astype(np.int16)
    high_freq = np.clip(orig_16 - low_16 + 128, 0, 255).astype(np.uint8)
    
    # 3. Blend: Linear Light ou Overlay do High Freq (da original) na imagem Gerada
    # Usaremos uma aproximação de Linear Light ou Overlay.
    # Para Linear Light com opacidade:
    # Blend = Generated + (High Freq - 128) * Opacity
    
    gen_16 = generated.astype(np.int16)
    high_16 = high_freq.astype(np.int16)
    
    # Calcula os deltas da textura
    deltas = (high_16 - 128) * (opacity * 2.0) # Multiplica para dar mais peso se necessário
    
    # Aplica o detalhe apenas onde é pele (usando a máscara)
    # A máscara varia de 0 a 255.
    mask_float = cv2.resize(skin_mask, (w, h)).astype(np.float32) / 255.0
    mask_3d = np.expand_dims(mask_float, axis=2)
    
    # Aplica deltas modulados pela máscara
    blended_16 = gen_16 + (deltas * mask_3d)
    
    # Corta valores fora do escopo 0-255
    blended = np.clip(blended_16, 0, 255).astype(np.uint8)
    
    return blended

@app.post("/transfer_texture")
async def transfer_texture(request: TextureTransferRequest):
    try:
        print("Recebendo requisição de transferência de textura...")
        img_orig = base64_to_cv2(request.original_base64)
        img_gen = base64_to_cv2(request.generated_base64)
        
        print("Extraindo máscara de pele da imagem gerada...")
        skin_mask = extract_skin_mask(img_gen)
        
        print(f"Aplicando Frequency Separation (opacidade: {request.blend_opacity})...")
        final_img = apply_frequency_separation(img_orig, img_gen, skin_mask, opacity=request.blend_opacity)
        
        # Opcional: SUPIR ou CodeFormer deveriam ser chamados aqui, mas como eles são pesados
        # e dependem de GPU (Replicate), a transferência matemática pura já fará um milagre.
        # Nós instruímos o Frontend a gerenciar a chamada a APIs de IA.
        
        final_b64 = cv2_to_base64(final_img)
        print("Transferência concluída. Retornando Base64.")
        
        return {"status": "success", "image": final_b64}
        
    except Exception as e:
        print("Erro:", str(e))
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
