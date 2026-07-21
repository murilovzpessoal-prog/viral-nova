import { fal } from '@fal-ai/client';
import { analyzeGarmentWithGemini, analyzeImageForUpscale, analyzeSkinForRefinement, analyzeImageForGlobalRefinement } from './geminiVision';

const createDiffMaskBase64 = (base64Original: string, urlModified: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const imgOrig = new Image();
    const imgMod = new Image();
    imgOrig.crossOrigin = "anonymous";
    imgMod.crossOrigin = "anonymous";
    
    let loaded = 0;
    const checkLoad = () => {
      loaded++;
      if (loaded === 2) {
        const width = imgOrig.width;
        const height = imgOrig.height;
        const canvasOrig = document.createElement('canvas');
        const canvasMod = document.createElement('canvas');
        const canvasMask = document.createElement('canvas');
        canvasOrig.width = canvasMod.width = canvasMask.width = width;
        canvasOrig.height = canvasMod.height = canvasMask.height = height;
        
        const ctxOrig = canvasOrig.getContext('2d', {willReadFrequently: true});
        const ctxMod = canvasMod.getContext('2d', {willReadFrequently: true});
        const ctxMask = canvasMask.getContext('2d');
        
        if (!ctxOrig || !ctxMod || !ctxMask) return reject(new Error("No ctx"));
        
        ctxOrig.drawImage(imgOrig, 0, 0, width, height);
        ctxMod.drawImage(imgMod, 0, 0, width, height);
        
        const dataOrig = ctxOrig.getImageData(0, 0, width, height).data;
        const dataMod = ctxMod.getImageData(0, 0, width, height).data;
        const maskImageData = ctxMask.createImageData(width, height);
        const dataMask = maskImageData.data;
        
        const THRESHOLD = 20; 
        for (let i = 0; i < dataOrig.length; i += 4) {
          const diffR = Math.abs(dataOrig[i] - dataMod[i]);
          const diffG = Math.abs(dataOrig[i+1] - dataMod[i+1]);
          const diffB = Math.abs(dataOrig[i+2] - dataMod[i+2]);
          const totalDiff = diffR + diffG + diffB;
          
          if (totalDiff > THRESHOLD * 3) {
            dataMask[i] = 255;
            dataMask[i+1] = 255;
            dataMask[i+2] = 255;
            dataMask[i+3] = 255;
          } else {
            dataMask[i] = 0;
            dataMask[i+1] = 0;
            dataMask[i+2] = 0;
            dataMask[i+3] = 255;
          }
        }
        ctxMask.putImageData(maskImageData, 0, 0);
        
        const blurredCanvas = document.createElement('canvas');
        blurredCanvas.width = width;
        blurredCanvas.height = height;
        const blurCtx = blurredCanvas.getContext('2d');
        if(blurCtx){
          blurCtx.filter = 'blur(16px)';
          blurCtx.drawImage(canvasMask, 0, 0);
          resolve(blurredCanvas.toDataURL('image/png'));
        } else {
          resolve(canvasMask.toDataURL('image/png'));
        }
      }
    };
    imgOrig.onload = checkLoad;
    imgMod.onload = checkLoad;
    imgOrig.onerror = () => reject(new Error("Erro imgOrig mask"));
    imgMod.onerror = () => reject(new Error("Erro imgMod mask"));
    
    imgOrig.src = base64Original;
    imgMod.src = urlModified;
  });
};

export const base64ToBlob = async (base64: string): Promise<Blob> => {
  const res = await fetch(base64);
  return res.blob();
};

export const urlToBase64 = async (url: string): Promise<string> => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export const generateImageWithFal = async (prompt: string): Promise<string> => {
  fal.config({ credentials: import.meta.env.VITE_FAL_API_KEY });
  const result = await fal.subscribe('fal-ai/flux/dev', {
    input: {
      prompt: prompt,
      image_size: "portrait_4_5",
      num_inference_steps: 35
    }
  });
  
  // @ts-ignore
  if (result.data && result.data.images && result.data.images.length > 0) {
    // @ts-ignore
    const imageUrl = result.data.images[0].url;
    return await urlToBase64(imageUrl);
  }
  
  throw new Error("Falha ao gerar imagem com Fal AI (Flux)");
};


export const generateVTONWithFal = async (
  influencerBase64: string, 
  garmentBase64: string, 
  mode: 'upper_body' | 'lower_body' | 'everything' | 'full' | 'background' | 'upscale',
  prompt: string,
  backgroundImgBase64?: string,
  engine: 'fashn' | 'kolors' = 'kolors'
): Promise<string> => {
  fal.config({ credentials: import.meta.env.VITE_FAL_API_KEY });

  let category = 'tops';
  if (mode === 'lower_body' || mode === 'lower' as any) category = 'bottoms';
  if (mode === 'everything' || mode === 'full' as any) category = 'one-pieces';

  try {
    let fashnPrompt = "";
    let fluxPrompt = "";
    let faceBox: number[] = [0, 0, 0, 0];

    if (mode !== 'background' as any && mode !== 'upscale' as any) {
      console.log("Analisando estrutura física da roupa e pele com Gemini Vision...");
      const analysis = await analyzeGarmentWithGemini(garmentBase64, influencerBase64, mode as any);
      fashnPrompt = analysis.fashnPrompt;
      fluxPrompt = analysis.fluxPrompt;
      faceBox = analysis.faceBox;
      console.log("Fashn Prompt:", fashnPrompt);
    }

    console.log("Normalizando proporções da imagem...");
    const resizeAndCropToVTON = (base64Str: string): Promise<string> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          const targetWidth = 768;
          const targetHeight = 1024;
          const targetRatio = targetWidth / targetHeight;
          const imgRatio = img.width / img.height;

          let sWidth = img.width;
          let sHeight = img.height;
          let sx = 0;
          let sy = 0;

          if (imgRatio > targetRatio) {
            sWidth = img.height * targetRatio;
            sx = (img.width - sWidth) / 2;
          } else {
            sHeight = img.width / targetRatio;
            sy = (img.height - sHeight) / 2;
          }

          const canvas = document.createElement('canvas');
          canvas.width = targetWidth;
          canvas.height = targetHeight;
          const ctx = canvas.getContext('2d');
          if (!ctx) return resolve(base64Str);
          
          ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, targetWidth, targetHeight);
          resolve(canvas.toDataURL('image/jpeg', 1.0));
        };
        img.onerror = () => reject(new Error("Erro ao ler imagem"));
        img.src = base64Str;
      });
    };

    const croppedHuman = await resizeAndCropToVTON(influencerBase64);
    let croppedGarment = '';
    
    if (mode === 'background' as any) {
      croppedGarment = garmentBase64;
    } else if (mode !== 'upscale' as any && garmentBase64) {
      croppedGarment = await resizeAndCropToVTON(garmentBase64);
    }

    const humanBlob = await base64ToBlob(croppedHuman);
    const humanUrl = await fal.storage.upload(humanBlob);
    
    let garmentUrl = '';
    if (mode !== 'background' as any && mode !== 'upscale' as any) {
      const garmentBlob = await base64ToBlob(croppedGarment);
      garmentUrl = await fal.storage.upload(garmentBlob);
    }

    let finalImageUrl = humanUrl;

    // --- MODO UPSCALE (Single Image Bounding Box Inpainting) ---
    if (mode === 'upscale' as any) {
      console.log("Iniciando modo Upscale (Proteção de Rosto com Máscara Bounding Box)...");
      
      console.log("Analisando imagem com Gemini Vision para gerar Prompt e detectar Rosto...");
      const upscaleData = await analyzeImageForUpscale(influencerBase64);
      const upscalePrompt = upscaleData.prompt;
      const faceBox = upscaleData.faceBox;
      console.log("Prompt Cirúrgico de Upscale:", upscalePrompt);
      console.log("Coordenadas do rosto:", faceBox);
      
      console.log("Gerando máscara de proteção...");
      const maskBase64 = await new Promise<string>((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
           const canvas = document.createElement('canvas');
           canvas.width = img.width;
           canvas.height = img.height;
           const ctx = canvas.getContext('2d');
           if (!ctx) return reject();
           
           // Fundo branco (onde o inpainting vai atuar consertando roupas e pele)
           ctx.fillStyle = 'white';
           ctx.fillRect(0, 0, canvas.width, canvas.height);
           
           // Rosto preto (onde o inpainting NÃO vai atuar)
           if (faceBox && faceBox.length === 4 && faceBox[2] > 0) {
             const [ymin, xmin, ymax, xmax] = faceBox;
             
             const x = xmin * canvas.width;
             const y = ymin * canvas.height;
             const w = (xmax - xmin) * canvas.width;
             const h = (ymax - ymin) * canvas.height;
             
             // Adicionar padding para proteger o cabelo/cabeça toda
             const paddingX = w * 0.4;
             const paddingY = h * 0.4;
             
             ctx.fillStyle = 'black';
             ctx.beginPath();
             ctx.ellipse(x + w/2, y + h/2, (w/2) + paddingX, (h/2) + paddingY, 0, 0, 2 * Math.PI);
             ctx.fill();
             
             // Aplicar Blur para transição suave
             const blurCanvas = document.createElement('canvas');
             blurCanvas.width = canvas.width;
             blurCanvas.height = canvas.height;
             const blurCtx = blurCanvas.getContext('2d');
             if(blurCtx) {
               blurCtx.filter = 'blur(24px)';
               blurCtx.drawImage(canvas, 0, 0);
               return resolve(blurCanvas.toDataURL('image/png'));
             }
           }
           resolve(canvas.toDataURL('image/png'));
        };
        img.onerror = () => reject(new Error("Erro mask upscale"));
        img.src = croppedHuman; // Imagem base redimensionada
      });
      
      const maskBlob = await base64ToBlob(maskBase64);
      const maskUrl = await fal.storage.upload(maskBlob);
      
      const upscaleResult = await fal.subscribe('fal-ai/flux-lora/inpainting', {
        input: {
          image_url: finalImageUrl,
          mask_url: maskUrl,
          prompt: upscalePrompt,
          strength: 0.32,
          guidance_scale: 4.5
        }
      });
      
      if (upscaleResult && upscaleResult.data) {
        if (upscaleResult.data.image && upscaleResult.data.image.url) {
          console.log("Upscale concluído com sucesso.");
          return upscaleResult.data.image.url;
        } else if (upscaleResult.data.images && upscaleResult.data.images[0].url) {
          console.log("Upscale concluído com sucesso.");
          return upscaleResult.data.images[0].url;
        }
      }
      console.error("Upscale Result Data:", upscaleResult?.data);
      throw new Error("Falha ao gerar o Upscale. Retorno da API inválido.");
    }

    // --- FASE 1: VTON (GERAÇÃO DE ROUPA) ---
    if (mode !== 'background' as any) {
      if (engine === 'kolors') {
        console.log("Acionando Kling Kolors VTON...");
        const kolorsResult = await fal.subscribe('fal-ai/kling/v1-5/kolors-virtual-try-on', {
          input: {
            human_image_url: humanUrl,
            garment_image_url: garmentUrl
          }
        });
        if (kolorsResult && kolorsResult.data) {
          if (kolorsResult.data.image && kolorsResult.data.image.url) finalImageUrl = kolorsResult.data.image.url;
          else if (kolorsResult.data.url) finalImageUrl = kolorsResult.data.url;
          else if (kolorsResult.data.images && kolorsResult.data.images[0].url) finalImageUrl = kolorsResult.data.images[0].url;
        }
        if (finalImageUrl === humanUrl) throw new Error("A Fal.ai Kolors não retornou a URL da imagem.");
        console.log("Kolors VTON concluído.");
      } else {
        console.log("Acionando FASHN VTON...");
        const vtonResult = await fal.subscribe('fal-ai/fashn/tryon/v1.6', {
          input: {
            model_image: humanUrl,
            garment_image: garmentUrl,
            category: category,
            garment_photo_type: "auto",
            prompt: fashnPrompt, 
            guidance_scale: 2.5 
          }
        });
        if (vtonResult && vtonResult.data && vtonResult.data.images && vtonResult.data.images[0].url) {
          finalImageUrl = vtonResult.data.images[0].url;
          console.log("VTON FASHN concluído.");
        } else {
          throw new Error("A Fal.ai FASHN não retornou a URL da imagem.");
        }
      }
    }
    
    // --- FASE 1.5: TEXTURE TRANSFER (COMPUTER VISION) ---
    // Aplica Frequency Separation matematicamente direto no Frontend (Javascript/Canvas)
    // Isso transfere a textura fotográfica original (poros) de volta para a IA gerada.
    console.log("Iniciando Texture Transfer (Frequency Separation) via Javascript Canvas...");
    try {
      const { applyFrequencySeparation } = await import('./cv');
      
      const origB64 = influencerUrl.startsWith('http') ? await urlToBase64(influencerUrl) : influencerUrl;
      const genB64 = finalImageUrl.startsWith('http') ? await urlToBase64(finalImageUrl) : finalImageUrl;
      
      finalImageUrl = await applyFrequencySeparation(origB64, genB64, 0.35);
      console.log("Texture Transfer via Canvas concluído com sucesso!");
    } catch (e) {
      console.warn("Aviso: Falha ao aplicar Frequency Separation. Retornando imagem sem textura. Erro:", e);
    }

    // --- FASE 2: BACKGROUND SWAP ---
    if (mode === 'background' || mode === 'everything' as any) {
      console.log("Iniciando Troca de Cenário. Removendo fundo com Bria RMBG 2.0...");
      const targetBgBase64 = mode === 'everything' as any ? backgroundImgBase64 : garmentBase64;
      if (!targetBgBase64) throw new Error("Imagem de fundo não fornecida.");

      const bgRemoveResult = await fal.subscribe('fal-ai/bria/background/remove', {
        input: { image_url: finalImageUrl }
      });

      if (!bgRemoveResult || !bgRemoveResult.data || !bgRemoveResult.data.image || !bgRemoveResult.data.image.url) {
        throw new Error("Falha ao remover o fundo da imagem.");
      }
      const foregroundUrl = bgRemoveResult.data.image.url;

      const compositedBase64 = await new Promise<string>((resolve, reject) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject(new Error("Canvas context not available"));

        const fgImg = new Image();
        const bgImg = new Image();
        fgImg.crossOrigin = "anonymous";
        
        fgImg.onload = () => {
          canvas.width = fgImg.width;
          canvas.height = fgImg.height;

          bgImg.onload = () => {
            const canvasRatio = canvas.width / canvas.height;
            const bgRatio = bgImg.width / bgImg.height;
            let drawWidth = canvas.width;
            let drawHeight = canvas.height;
            let offsetX = 0;
            let offsetY = 0;

            if (bgRatio > canvasRatio) {
              drawWidth = canvas.height * bgRatio;
              offsetX = (canvas.width - drawWidth) / 2;
            } else {
              drawHeight = canvas.width / bgRatio;
              offsetY = (canvas.height - drawHeight) / 2;
            }

            ctx.drawImage(bgImg, offsetX, offsetY, drawWidth, drawHeight);
            
            // Adicionar sombra de contato (Ambient Occlusion sintético) para não parecer "flutuante"
            ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
            ctx.shadowBlur = 40;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 20;
            
            ctx.drawImage(fgImg, 0, 0, canvas.width, canvas.height);
            
            // Limpar sombra para futuros desenhos no ctx (se houver)
            ctx.shadowColor = 'transparent';
            
            resolve(canvas.toDataURL('image/jpeg', 0.95));
          };
          bgImg.onerror = () => reject(new Error("Erro ao carregar imagem de cenário."));
          bgImg.src = targetBgBase64;
        };
        fgImg.onerror = () => reject(new Error("Erro ao carregar influenciadora sem fundo."));
        fgImg.src = foregroundUrl;
      });

      console.log("Composição de fundo concluída. Fazendo upload para Fal...");
      const compositedBlob = await base64ToBlob(compositedBase64);
      finalImageUrl = await fal.storage.upload(compositedBlob);
    }

    return finalImageUrl;
  } catch (error: any) {
    console.error("Erro no VTON da Fal:", error);
    const detail = error?.body?.detail || error?.detail || error?.message || "Erro desconhecido.";
    throw new Error(detail);
  }
};
