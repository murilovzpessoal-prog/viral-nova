import React, { useState, useEffect, useRef } from 'react';
// Force Vercel trigger
import { Search, Folder, Flame, Heart, Trash2, Link, Save, Download, DownloadIcon, LayoutTemplate, Layers, MousePointer2, Loader2, Sparkles, Wand2, Copy, DownloadCloud, Expand, ExternalLink, Minimize, History, Clock, ArrowLeft } from 'lucide-react';
import { generateImageWithGemini } from './lib/gemini';
import { generateImageWithFal, urlToBase64 } from './lib/fal';
import { applyFilmGrain } from './lib/cv';

const categories = [
  "Todos", "Selfies", "Lifestyle", "Close-up"
];

// Placeholder images for the masonry grid
const templates = [
  {
    "id": 1,
    "category": "Selfies",
    "likes": 101,
    "image": "/assets/builder-01.jpg",
    "promptText": "A medium close-up selfie of a young woman with long, straight, center-parted dark brown hair and olive skin. She has thick dark eyebrows, soft pink blush, and glossy dark brown lipstick, looking directly into the camera with a neutral, calm expression. She is wearing a fitted, ribbed olive green halter-neck crop top and a delicate silver necklace with a flower-shaped pendant. A dark brown leather shoulder bag strap is visible on her left shoulder. On her left upper arm, there is a tattoo of two butterflies, and a script tattoo is visible on her left forearm. She is wearing light-wash denim jeans. The background is a hotel room with a television mounted on the wall showing a streaming service interface, a black desk with a white landline phone, and a hallway door in the back. The lighting is soft and ambient, casting gentle shadows. The image has a sharp focus on the subject, photorealistic, high detail."
  },
  {
    "id": 5,
    "category": "Selfies",
    "likes": 105,
    "image": "/assets/builder-05.webp",
    "promptText": "Selfie ultra realista de jovem adulta brasileira, 19 anos, sentada no interior de um veículo, orientação frontal para a câmera, capturada com câmera frontal de smartphone. Expressão neutra, lábios fechados levemente projetados, olhar direto para a lente, calma sem exagero expressivo. Tom de pele claro, textura real com poros visíveis, sardas distribuídas pelo nariz e bochechas, acabamento natural sem aparência plastificada. Cabelo loiro, longo, partição central, liso com leve ondulação natural, solto sem styling elaborado. Maquiagem leve: base ou corretivo suave com acabamento natural, máscara de cílios evidente, definição sutil nos olhos, blush discreto, lábios com produto nude ou gloss transparente. Vestindo regata branca de algodão canelado, estilo casual. Colar de corrente fina dourada com pingente pequeno e discreto. Ambiente: interior de veículo com encosto de banco, teto do carro e janela lateral visíveis, situação cotidiana sem preparação de cenário. Iluminação natural lateral/frontal suave, difusa, sombras leves e realistas na pele. Câmera frontal de smartphone, estilo UGC nativo, ângulo ligeiramente abaixo da linha dos olhos, enquadramento close-up do peito para cima, proporção vertical 9:16, nitidez alta no rosto sem desfoque artificial. Sem filtros, contraste natural, saturação equilibrada, tratamento mínimo preservando textura real. Alto nível de autenticidade UGC: imperfeições naturais visíveis, iluminação não controlada, ambiente cotidiano, ausência de pose publicitária."
  },
  {
    "id": 7,
    "category": "Selfies",
    "likes": 107,
    "image": "/assets/builder-07.webp",
    "promptText": "9:16 Ultra-realistic, hand-taken vertical selfie of a 21-year-old blonde woman in a relaxed pose, captured in the authentic style of Instagram Stories. Slight motion blur, smooth texture and low resolution, warm indoor lighting. Close-up vertical selfie filling most of the Stories frame, camera very close to the face, imperfect angle of a hand-taken photo. She smiles with a relaxed and confident expression, direct eye contact with the camera. Instagram Stories realism - slight exposure variation, shallow depth of field, subtle grain, slightly softened iPhone edges, no cinematic polish. Natural, loose hair color or hairstyle. Minimal or optional makeup. Delicate gold rings on her fingers, shoulders framed by a green tank top in the colors of the Brazilian flag. Neutral inner background, softly blurred. No text on screen, no stickers, just the selfie in storyboard style."
  },
  {
    "id": 8,
    "category": "Selfies",
    "likes": 108,
    "image": "/assets/builder-08.webp",
    "promptText": "Ultra-realistic, hand-held vertical selfie of a 21-year-old blonde woman in a relaxed pose, in the authentic style of Instagram Stories. Slight motion blur, smooth texture and low resolution, natural lighting, daylight. Close-up vertical selfie filling most of the Stories frame, camera very close to the face, imperfect angle of a hand-taken photo. She smiles with a relaxed and confident expression, direct eye contact with the camera. Instagram Stories realism - slight variation in exposure, shallow depth of field, subtle grain, edges slightly softened by the iPhone, no cinematic retouching. Her face is slim and symmetrical, like a model's, her teeth are white and aligned, her skin is clear, youthful and attractive; Her hair is tied up in a bun. No makeup. The scene takes place in an open-air setting, like a typical Brazilian farm, a farm with banana trees, chickens, plenty of land, trees, and vegetation all around. Audio: The woman brings the camera close to her face and says in Brazilian Portuguese: \"É difícil de acreditar que eu não sou real né? Mas isso é porque eu sou linda, eu entendo!\". After the first sentence, the woman laughs naturally. After the laugh, the woman speaks again: \"O passo a passo pra gerar vídeos assim está no link, só clicar!\". Shoulders framed by a white tank top with thin straps. Neutral and slightly blurred background. No text on the screen, no stickers, just the selfie in storyboard style."
  },
  {
    "id": 9,
    "category": "Close-up",
    "likes": 109,
    "image": "/assets/builder-09.webp",
    "promptText": "Ultra-realistic close-up of a 20-year-old blonde influencer with slightly wavy blonde hair, 8K resolution, natural creator-style photography. Final hyper-realistic close-up scene, wearing a white Prada tank top, blue jeans, and a visible DJI lapel microphone. Same home environment with neutral light wall and warm cozy interior lighting. Camera at eye level, close-up of face and upper shoulders, vertical 9:16 framing. Her face fills most of the frame creating intimacy and trust. Warm and genuine smile, friendly eyes, relaxed facial muscles, confident yet approachable. She looks happy, calm, and trustworthy — not posing. Looking directly at the lens with a slight natural head tilt, minimal movement. Her expression clearly suggests \"trust me, come with me, click the link, follow me\" — the exact second before or after a call to action. Soft and even light on the face, natural skin highlights, no harsh shadows, visible realistic skin texture. No cinematic lighting, pure creator realism. Smartphone/creator aesthetic, everything in focus, no blur, no bokeh, no HDR. Looks like a real final frame from a TikTok or Reel. Final hook moment of trust, high conversion potential, ideal for last frame of video, thumbnail, CTA in Stories, or remarketing impression."
  },
  {
    "id": 10,
    "category": "Selfies",
    "likes": 110,
    "image": "/assets/builder-10.webp",
    "promptText": "Ultra-photorealistic 9:16 vertical iPhone 15 Pro Max front camera selfie of a young blonde woman sitting inside a car with brown leather seats. 8K resolution, natural iPhone camera realism with visible sensor noise, slight 24mm barrel distortion, iOS oversharpening artifacts. She has straight light blonde hair, loose, oval face shape, full lips, slim nose, smooth glowing skin with natural highlight on cheekbones, fine pores visible under the light, glossy lip texture, long almond-shaped nails painted in dark wine/burgundy polish. She wears a white ribbed cotton turtleneck tank top fitted to the body with a small silver metallic detail at the neckline, a dark brown leather jacket draped over her arms with visible metal zippers, dark oval sunglasses with slightly translucent tortoiseshell frame, thick gold hoop earrings. She holds a large clear plastic Dunkin' iced coffee cup with an orange straw near her face, lips slightly pursed around the straw. Neutral relaxed expression, eyes hidden behind sunglasses directed at the camera. Selfie taken from a slight low angle, medium-close shot from bust up. Left hand holding the phone out of frame. Car interior background with modern clean interior, sunroof/windows showing diffused daylight. Natural daylight entering through the front and top windows illuminating her face and chest softly. Medium contrast between illuminated skin and darker car interior background. No studio lighting, no ring light, no flash, no warm/orange tones. Lo-fi quality, not extremely sharp, looks like a real iPhone selfie posted online. Slight reflections of the car interior visible on the sunglasses lenses. Casual urban lifestyle aesthetic, 'that girl' vibe, trendy and confident."
  },
  {
    "id": 13,
    "category": "Selfies",
    "likes": 113,
    "image": "/assets/builder-13.webp",
    "promptText": "[STYLE: Casual selfie in the mirror, checking the outfit of the day, spontaneous home photography, smartphone realism], [POSE: Mirror reflection, standing, female figure, 20 years old, slightly leaning forward, holding smartphone with both hands at chest height, one hand interacting with the waistband of her pants, head tilted], [TEXTURES: White ribbed cotton tank top (stretched fabric at the chest), denim shorts, blonde hair in a bun, reflective mirror surface, cold polished marble floor], [SETTING: Interior of a spacious bathroom, arched doorway in the background, sink countertop in the foreground], [LIGHTING AND CAMERA: Warm tungsten lighting on the bathroom ceiling, soft shadows, mirror reflection photographed with a smartphone (iPhone Pro with a triple-lens setup), 24mm main lens, f/1.7, slight motion blur on the hand], [VISUAL EFFECTS: Dust particles on the mirror, slight lens flare due to light superior, natural color correction without editing]."
  },
  {
    "id": 29,
    "category": "Close-up",
    "likes": 129,
    "image": "/assets/builder-29.webp",
    "promptText": "A young woman, possibly in her 20s, is the main subject, captured in a medium close-up, from the back and slightly to the side, inside what appears to be a gym or fitness center. She has fair skin, a warm smile, and her head is tilted back over her right shoulder, her chest tilted forward, looking directly at the viewer with a slight smile. Her hair is tied back, possibly in a messy bun or ponytail, with a few strands hanging loose. She is wearing athletic attire: a dark gray sports bra with an abstract Nike design and navy blue spandex shorts. The shorts have a white Nike logo graphic on the left cheek. The shorts fit snugly, emphasizing her buttocks. Her physique is toned and athletic. The background suggests a gym environment. The walls are predominantly a bright mustard yellow or ochre, contrasted by black or dark gray vertical elements, likely structural columns or equipment racks. On the left, a mirrored surface reflects part of the gym's interior, including exercise equipment and another individual. In the background, on the left side, another woman is partially visible, with her back to the camera. This woman is wearing a dark top, possibly a bra top, and long red pants or leggings. Her back is exposed. Behind the main subject and to the right, there are glimpses of exercise equipment, including what appear to be yellow and possibly dark green weight plates, stacked on shelves. The lighting is bright and typical of an indoor sports facility. The overall image has a slight contrast, possibly retouched or stylized.\n-----------------"
  },
  {
    "id": 38,
    "category": "Selfies",
    "likes": 138,
    "image": "/assets/builder-38.webp",
    "promptText": "Ultra-photorealistic 9:16 vertical iPhone 15 Pro Max front camera selfie of a young woman with voluminous curly red hair, clear skin with visible freckles and natural imperfections. 8K resolution, natural iPhone selfie realism with slight 24mm barrel distortion and iOS oversharpening. She holds a dark amber cosmetics bottle with a pump near her right cheek, smiling broadly with teeth showing, looking directly at the camera with expressive relaxed eyes. Black painted nails, white pearl bracelet on right wrist. Wearing a fitted black tank top. Residential bedroom or closet background with gray wardrobe and exposed wooden ceiling. Natural daylight from a window to the front-right illuminating face and product label, soft natural shadows on the left side of face and neck. Medium-high contrast highlighting curls and hair volume. No ring light, no flash, no studio lighting, no warm/orange tones. Close-up framing shoulders face and hand with product. Casual beauty routine UGC content creator vibe, cheerful confident and natural. iPhone selfie POV at eye level slightly angled toward face. Slight natural grain in shadow areas of background.\n-----------------"
  },
  {
    "id": 39,
    "category": "Selfies",
    "likes": 139,
    "image": "/assets/builder-39.webp",
    "promptText": "Ultra-photorealistic 9:16 vertical iPhone 15 selfie of a young Latina woman aged 20-25 outdoors under clear blue sky. Shot with 24mm f/1.6 main lens. She has warm-toned tanned skin with visible pores on nose and inner cheeks, oily shine on T-zone, slight redness around nose and cheeks from sun exposure, small freckles scattered on cheeks, subtle old acne mark on right cheek, fine lines at eye corners. Dark brown wavy 2B hair in a messy bun with loose front strands, flyaway hairs on top and around forehead, slightly oily roots with frizz. Eyes closed in relaxed expression, mouth slightly open, head tilted back. Holding a facial cream tube with beige and gold label near her face with one hand, product label partially visible. Wearing a yellow thin-strap tank top with smooth slightly shiny fabric. Layered thin gold necklace and gold ring. Direct lateral sunlight from upper right creating harsh defined shadows under nose, lower lip and chin, hand shadow projected on side of face. Strong highlights on skin and product reflections. Warm color temperature predominant. Tight framing with slight crop at top of hair. Casual posed photo with product near face, attempting advertising aesthetic but captured as casual iPhone photo. Clean uniform blue sky background with no distractions.\n-----------------"
  },
  {
    "id": 41,
    "category": "Selfies",
    "likes": 141,
    "image": "/assets/builder-41.webp",
    "promptText": "Ultra realistic 8K UHD photorealistic iPhone 15 selfie, 9:16 vertical format, f/1.6 aperture, 24mm equivalent lens. Young European woman aged 20-25 with oval face, fair warm-toned skin with visible pores on inner cheeks and around nose, light shine on forehead and nose tip, slight redness on nose and cheeks, subtle dark circles with faint purple undertone and fine lines. Light brown almond-shaped eyes partially closed in a relaxed expression, thin slightly arched eyebrows with subtle gaps and misaligned hairs, fine peach fuzz above upper lip. Small delicate nose with rounded tip and slight redness. Full lips with soft contour, medium pink color with lip product shine and natural fine lines visible. Soft jawline with little definition, small rounded chin, gentle smile slightly higher on the right side. Long straight light blonde hair with lighter highlights and slightly darker roots, loose with side part, healthy appearance with light frizz and some dry ends, flyaway hairs around top and sides of face. Wearing a chunky knit burnt orange sweater with visible texture, slightly loose comfortable fit with natural fabric deformation, thin ring on right hand. Head tilted to the right, hand holding a small white skincare serum bottle with minimalist label near chin level, well-manicured natural short nails. Relaxed shoulders, eyes closed, peaceful self-care moment. Indoor residential setting with blurred warm neutral background, indistinct furniture shapes. Soft diffused natural light from front-left, warm overall tone, gentle shadows below nose and chin, slight overexposure on brightest face areas. Authentic casual iPhone selfie aesthetic with subtle oversharpening and slight barrel distortion at edges, not professionally staged.\n-----------------"
  },
  {
    "id": 42,
    "category": "Selfies",
    "likes": 142,
    "image": "/assets/builder-42.webp",
    "promptText": "Ultra realistic 8K UHD photorealistic professional UGC lifestyle photography, sharp focus on face and product. Beautiful 26-year-old European female lifestyle influencer with symmetrical face, defined cheekbones, natural freckles scattered across nose and cheeks, sharp well-groomed eyebrows. Soft confident expression with subtle pout while sipping from straw, direct eye contact with camera. Natural skin texture with soft matte glow, light freckles clearly visible, natural glam makeup with warm blush, nude lips, and defined curled lashes. Sleek half-up hairstyle with medium brown straight smooth hair pulled back neatly with natural shine. Wearing a white fitted crew-neck t-shirt, minimal chic lifestyle outfit. Gold chunky hoop earrings as statement accessory. Well-manicured hands with natural anatomy, short almond nails with nude polish. Holding a large matte beige insulated tumbler cup with metallic silver rim and metal straw, subtle embossed logo on cup surface, tumbler held close to mouth while sipping through straw, angled slightly toward camera showing full cup shape. Selfie-style upper body angle slightly tilted, casual relaxed pose, medium close-up shot. Vertical 9:16 format, f/2.8 aperture, shallow depth of field with blurred background. Natural window light from front-right, soft diffused lighting, 5500K daylight. Modern minimalist living room interior with blurred sofa, wardrobe, curtains, wooden floor, neutral warm tones. Clean cozy everyday lifestyle atmosphere. Neutral beige and white color palette, calm minimal aesthetic mood, natural soft saturation. Authentic UGC selfie content, relatable casual lifestyle moment, genuine and not overly staged.\n-----------------"
  },
  {
    "id": 43,
    "category": "Selfies",
    "likes": 143,
    "image": "/assets/builder-43.webp",
    "promptText": "Ultra realistic 8K UHD photorealistic iPhone 15 Pro Max selfie style, 9:16 vertical format, 24mm wide angle lens. Young 19-year-old Brazilian woman with clean girl aesthetic, standing facing camera in front of a pure white infinite studio background. Playful happy expression with wide smile showing teeth, tongue slightly out resting on lower teeth, left eye winking and right eye open, looking directly at camera. Natural skin texture with visible pores, realistic complexion, no heavy makeup, fresh clean face. Straight medium brown hair falling loosely over shoulders. Wearing a simple white cotton crew-neck t-shirt, fitted to body. Right hand raised holding a bright yellow cylindrical toothpaste tube with bold black text branding near face at cheek level, product label clearly visible and readable. Bright uniform studio lighting, soft frontal fill light eliminating harsh shadows, medium-low contrast, vibrant colors on product. Round catchlights in eyes from studio lights. Clean minimal commercial vibe, cheerful and vibrant atmosphere. Slight iPhone barrel distortion at edges, subtle oversharpening typical of iOS processing. Authentic casual selfie feel, not overly staged.\n-----------------"
  },
  {
    "id": 45,
    "category": "Selfies",
    "likes": 145,
    "image": "/assets/builder-45.webp",
    "promptText": "((ultra realistic)), 8k uhd, photorealistic, professional UGC content photography, sharp focus on face and product, highly detailed, beautiful Brazilian female tech influencer, 27 years old, symmetrical face, bright eyes, defined eyebrows, natural beauty, genuine excited smile, joyful surprised expression, natural skin texture, healthy glow, natural makeup with glossy lips, straight blonde hair with subtle highlights, smooth texture tucked behind ear, cozy red knit sweater with textured fabric, casual lifestyle outfit, small hoop earrings, ((well-manicured hands, five fingers, natural hand anatomy)):1.3, light pink glossy nails, ((hand holding product box close to face)):1.3, ((wireless earbuds retail box)):1.3, ((product box with earbuds image clearly visible)):1.25, clean modern packaging, ((held beside face at cheek level, slightly angled toward camera)):1.2, upper body slightly angled, relaxed posture, looking at camera, natural selfie-style influencer pose, medium close-up shot, f/2.8 aperture, shallow depth of field, vertical 9:16 format, natural window light, soft diffused lighting, 45-degree angle, 5500K natural daylight, blurred tiled indoor background with bokeh, clean casual environment, warm tones with vibrant red contrast, energetic inviting mood, authentic UGC influencer content, relatable and genuine product discovery moment\n-----------------"
  },
  {
    "id": 48,
    "category": "Close-up",
    "likes": 148,
    "image": "/assets/builder-48.webp",
    "promptText": "A high-resolution, close-up portrait photograph of a beautiful 20-year-old Brazilian woman with long, straight blonde hair, captured smiling genuinely with her teeth visible in an eclectic podcast studio. She is seated at a rustic wooden desk, with her hands elegantly clasped, holding a clear plastic water bottle. She wears a vibrant pink ribbed knit crop top and light blue denim jeans. A large black professional broadcast microphone is positioned in front of her. The background is softly blurred with a shallow depth of field, revealing dark shelves filled with fascinating artifacts: an aged, detailed brass skull mask, a book with a prominent, ornamental cross, glowing Edison bulbs, and curated items. The far wall is covered in diagonal yellow and black warning tapes with text like 'ATENÇÃO'. The lighting is soft cinematic studio lighting, with warm volumetric light from the Edison bulbs and subtle rim light. The image features high-resolution skin texture, visible pores, realistic fabric folds, and visible wood grain. Shot on ARRI Alexa, RAW film style, soft film grain, shallow depth of field, cinematic composition. The scene has an engaging noir curiosity shop feel.\n-----------------"
  },
  {
    "id": 52,
    "category": "Lifestyle",
    "likes": 152,
    "image": "/assets/builder-52.jpg",
    "promptText": "Crie uma imagem realista com o MEU ROSTO e a MINHA APARÊNCIA exatamente como na foto que enviei — não mude absolutamente nenhuma das minhas características físicas (rosto, traços, formato dos olhos, nariz, boca, pele, cabelo, corpo etc). Apenas replique o estilo e a composição da imagem abaixo com fidelidade. A pessoa deve estar com os braços erguidos atrás da cabeça, em uma pose confiante e sensual. A iluminação deve vir de uma janela, projetando faixas de luz e sombra no rosto e no corpo, criando um contraste dramático e artístico. A luz deve destacar principalmente os olhos e o brilho natural da pele. O fundo deve ser simples e neutro, em tom claro, para manter o foco no rosto. O clima geral da imagem precisa ser intimista, elegante e cinematográfico, com um toque de mistério e intensidade no olhar. A maquiagem deve ser natural e iluminada, com pele glow e lábios com leve brilho. Os cabelos devem estar soltos, com aparência natural e volume suave. A roupa deve ser uma blusa preta com alças, deixando os ombros à mostra. Importante: mantenha 100% das minhas características reais — não altere o formato do rosto, olhos, nariz, boca, cor da pele, cabelo ou qualquer traço físico meu. Apenas insira minha aparência nessa mesma pose, iluminação e estilo descritos.\n-----------------"
  },
  {
    "id": 53,
    "category": "Lifestyle",
    "likes": 153,
    "image": "/assets/builder-53.webp",
    "promptText": "Extreme macro photography of the model's [mouth] in the image. Photorealistic details with visible textures, such as pores, fine hairs, wrinkles, and fibers. Natural imperfections, including subtle imperfections such as uneven tone and small blemishes. Realistic surface variation with natural oily shine and dryness in different areas. No makeup, no retouching. The surrounding skin has authentic texture with visible pores, micro-details, and natural asymmetry. Real skin translucency, without idealized smoothness. The lighting is soft yet directional, falling on the surface at a shallow angle to reveal texture and depth. Neutral white balance, true-to-life colors, cinematic contrast. No saturated blacks, no blown-out highlights. Extremely shallow depth of field with precise focus on the surface and smooth fading towards the edges. Shot with a high-quality macro lens, equivalent to 100mm. The feeling of macro photography done with a DSLR or smartphone. Documentary realism, unretouched, raw and authentic. It's not CGI.\n-----------------"
  },
  {
    "id": 54,
    "category": "Lifestyle",
    "likes": 154,
    "image": "/assets/builder-54.webp",
    "promptText": "Extreme macro photography of the model's [eye] in the image. Photorealistic details with visible textures, such as pores, fine hairs, wrinkles, and fibers. Natural imperfections, including subtle imperfections such as uneven tone and small blemishes. Realistic surface variation with natural oily shine and dryness in different areas. No makeup, no retouching. The surrounding skin has authentic texture with visible pores, micro-details, and natural asymmetry. Real skin translucency, without idealized smoothness. The lighting is soft yet directional, falling on the surface at a shallow angle to reveal texture and depth. Neutral white balance, true-to-life colors, cinematic contrast. No saturated blacks, no blown-out highlights. Extremely shallow depth of field with precise focus on the surface and smooth fading towards the edges. Shot with a high-quality macro lens, equivalent to 100mm. The feeling of macro photography done with a DSLR or smartphone. Documentary realism, unretouched, raw and authentic. It's not CGI.\n-----------------"
  },
  {
    "id": 55,
    "category": "Lifestyle",
    "likes": 155,
    "image": "/assets/builder-55.webp",
    "promptText": "Extreme macro photography of the model's [nose] in the image. Photorealistic details with visible textures, such as pores, fine hairs, wrinkles, and fibers. Natural imperfections, including subtle imperfections such as uneven tone and small blemishes. Realistic surface variation with natural oily shine and dryness in different areas. No makeup, no retouching. The surrounding skin has authentic texture with visible pores, micro-details, and natural asymmetry. Real skin translucency, without idealized smoothness. The lighting is soft yet directional, falling on the surface at a shallow angle to reveal texture and depth. Neutral white balance, true-to-life colors, cinematic contrast. No saturated blacks, no blown-out highlights. Extremely shallow depth of field with precise focus on the surface and smooth fading towards the edges. Shot with a high-quality macro lens, equivalent to 100mm. The feeling of macro photography done with a DSLR or smartphone. Documentary realism, unretouched, raw and authentic. It's not CGI.\n-----------------"
  }
];

export const BuilderView = () => {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultImg, setResultImg] = useState<string | null>(null);
  
  const handleCopyPrompt = (template: any) => {
    if (template.promptText) {
      navigator.clipboard.writeText(template.promptText);
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) throw new Error("API Key do Gemini não configurada.");
      
      // Injeção de bloqueio Anti-CGI e Anti-Maquiagem (Regra Absoluta do Projeto - Otimizado para Gemini/Imagen)
      const rigorosoAntiCGI = `
      
IMPORTANT: NO MAKEUP. ZERO MAKEUP. Bare face, natural lips without lipstick, no foundation, no mascara. The subject MUST have a hyper-realistic, raw human skin texture. Visibly detailed pores, natural skin imperfections, subtle freckles, uneven skin tone. ABSOLUTELY NO airbrushing, no smooth plastic skin, no CGI aesthetic, no doll-like appearance. The face must look like an unretouched, raw, natural photograph of a real human being. Cara lavada, sem maquiagem.`;
      
      let referenceBase64: string | undefined = undefined;
      if (selectedTemplate.image) {
        try {
          referenceBase64 = await urlToBase64(selectedTemplate.image);
        } catch (e) {
          console.warn("Falha ao converter imagem de referência para base64", e);
        }
      }

      const finalPrompt = selectedTemplate.promptText + rigorosoAntiCGI;
      
      const b64Generated = await generateImageWithGemini(finalPrompt, apiKey, undefined, referenceBase64);
      
      let finalImg = b64Generated;
      try {
        console.log("Aplicando Granulação de Filme/Poros no Builder...");
        finalImg = await applyFilmGrain(b64Generated, 0.035);
      } catch (e) {
        console.warn("Falha ao aplicar textura de poros", e);
      }
      setResultImg(finalImg);
    } catch (error: any) {
      console.error(error);
      alert("Estamos atualizando essa função para melhorar a sua experiência, em breve estará online!");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleBack = () => {
    setSelectedTemplate(null);
    setResultImg(null);
    setIsGenerating(false);
  };

  // --- TELA DE GERAÇÃO (Quando um template é selecionado) ---
  if (selectedTemplate) {
    return (
      <div className="flex-1 w-full flex flex-col p-6 md:p-8 pt-16 md:pt-20 overflow-y-auto bg-transparent relative">
        <button 
          onClick={handleBack}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm font-medium text-white transition-all w-max mb-8 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para Galeria
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto w-full">
          {/* LADO ESQUERDO: REFERÊNCIA */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#7B00FF]" />
              Imagem de Referência
            </h2>
            <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden bg-white/[0.02] border border-white/10 backdrop-blur-[30px] shadow-2xl hover:border-[#00F0FF]/40 hover:shadow-[0_0_30px_rgba(0,240,255,0.2)] transition-all duration-300">
              <img 
                src={selectedTemplate.image} 
                alt="Referência" 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full border border-white/10 text-xs font-bold text-white uppercase tracking-widest">
                Referência Original
              </div>
            </div>
          </div>

          {/* LADO DIREITO: AÇÃO E RESULTADO */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <Wand2 className="w-5 h-5 text-[#00F0FF]" />
              Sua Nova Influenciadora
            </h2>

            <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden bg-white/[0.02] border border-white/10 backdrop-blur-[30px] flex flex-col items-center justify-center shadow-2xl p-6 hover:border-[#00F0FF]/40 hover:shadow-[0_0_30px_rgba(0,240,255,0.2)] transition-all duration-300">
              
              {!isGenerating && !resultImg && (
                <div className="text-center flex flex-col items-center max-w-sm">
                  <div className="w-20 h-20 rounded-full bg-[#7B00FF]/10 flex items-center justify-center mb-6">
                    <Sparkles className="w-10 h-10 text-[#7B00FF]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Pronto para Gerar</h3>
                  <p className="text-[#8d8d99] text-sm mb-8">
                    Nossa IA vai processar as características desta imagem e gerar a sua influenciadora de forma ultra-realista.
                  </p>
                  <button 
                    onClick={handleGenerate}
                    className="w-full py-4 bg-gradient-to-r from-[#FF007F] to-[#FF007F] hover:from-[#FF007F] hover:to-[#FF007F] text-white rounded-xl font-black text-lg shadow-[0_0_30px_rgba(123,0,255,0.3)] transition-all transform hover:scale-[1.02] active:scale-95"
                  >
                    ✨ Gerar Influenciadora
                  </button>
                </div>
              )}

              {isGenerating && (
                <div className="flex flex-col items-center gap-6">
                  <Loader2 className="w-12 h-12 text-[#7B00FF] animate-spin" />
                  <div className="text-center">
                    <p className="text-white font-bold text-lg mb-1">Processando Imagem...</p>
                    <p className="text-[#7B00FF] text-sm animate-pulse">Gerando influenciadora, aguarde um momento...</p>
                  </div>
                </div>
              )}

              {resultImg && !isGenerating && (
                <div className="absolute inset-0 w-full h-full">
                  <img src={resultImg} alt="Resultado" className="w-full h-full object-cover" />
                  
                  {/* Botões Overlay no Resultado */}
                  <div className="absolute bottom-6 left-0 w-full px-6 flex items-center gap-3">
                    <button 
                      onClick={async () => {
                        const { forceDownloadImage } = await import('./lib/download');
                        forceDownloadImage(resultImg, 'influenciadora.png');
                      }}
                      className="flex-1 py-3 bg-white text-black rounded-xl font-black text-sm flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors shadow-xl"
                    >
                      <Download className="w-4 h-4" />
                      Baixar Imagem
                    </button>
                    <button 
                      onClick={handleGenerate}
                      className="px-6 py-3 bg-black/50 backdrop-blur-md border border-white/20 text-white rounded-xl font-bold text-sm hover:bg-black/70 transition-colors shadow-xl"
                    >
                      Gerar Outra
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    );
  }

  // --- GRID PRINCIPAL (Galeria) ---
  return (
    <div className="flex-1 w-full flex flex-col p-6 md:p-8 pt-16 md:pt-20 overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-light text-white mb-2 leading-tight">
            Gere <span className="font-medium bg-gradient-to-r from-[#00F0FF] to-[#FF007F] text-transparent bg-clip-text">imagens incríveis</span> com seu avatar e produto
          </h1>
          <p className="text-[#8d8d99] text-sm max-w-2xl">
            Escolha um template do feed para recriar exatamente o mesmo visual com o seu produto e avatar — ou comece do zero descrevendo sua ideia.
          </p>
        </div>
      </div>

      {/* Filter Categories */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-4 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-[13px] font-medium whitespace-nowrap transition-all duration-300 ${
              activeCategory === cat
                ? 'bg-[#7B00FF]/10 border border-[#7B00FF] text-white shadow-[0_0_15px_rgba(123,0,255,0.2)]'
                : 'bg-white/5 border border-white/5 text-[#8d8d99] hover:text-white hover:bg-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid Retangular */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
        {templates.filter(t => activeCategory === 'Todos' || t.category === activeCategory).map((template) => (
          <div key={template.id} className="relative group aspect-[4/5] rounded-[24px] overflow-hidden bg-white/5 border border-white/5 flex flex-col justify-end p-5">
            {/* Imagem de Fundo */}
            <img
              src={template.image}
              alt="Template"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Top Right - Heart */}
            <div className="absolute top-4 right-4 z-10">
              <div className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 text-white hover:bg-black/60 transition-colors cursor-pointer">
                <Heart className="w-4 h-4" />
              </div>
            </div>

            {/* Gradient Overlay na parte inferior para leitura */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-80 pointer-events-none" />

            {/* Conteúdo (Bottom) */}
            <div className="relative z-10 flex flex-col gap-2">
              <h3 className="text-white font-black text-sm uppercase tracking-wide shadow-sm">
                {template.category.toUpperCase()}
              </h3>
              <p className="text-white/70 text-[11px] leading-relaxed line-clamp-2">
                {['Builder', 'Trocas', 'Selfies', 'Lifestyle', 'Close-up'].includes(template.category) ? 'Use este card para gerar imagens baseando-se no prompt em anexo.' : `Explore e baixe este template de ${template.category.toLowerCase()}.`}
              </p>
              
              {['Builder', 'Trocas', 'Selfies', 'Lifestyle', 'Close-up'].includes(template.category) ? (
                <button 
                  onClick={() => setSelectedTemplate(template)}
                  className="mt-2 flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-[#FF007F] to-[#FF007F] hover:from-[#FF007F] hover:to-[#FF007F] backdrop-blur-md border border-white/10 rounded-xl text-white text-[11px] font-bold uppercase tracking-wider transition-colors shadow-lg group-hover:shadow-[0_0_20px_rgba(255,0,127,0.3)]"
                >
                  <Wand2 className="w-4 h-4" />
                  Inspire-se
                </button>
              ) : (
                <button
                  onClick={async (e) => {
                    e.stopPropagation();
                    const { forceDownloadImage } = await import('./lib/download');
                    forceDownloadImage(template.image, `imagem-${template.id}.jpg`);
                  }}
                  className="mt-2 flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-[#00F0FF]/80 to-[#00F0FF]/80 hover:from-[#00F0FF] hover:to-[#00F0FF] backdrop-blur-md border border-white/10 rounded-xl text-white text-[11px] font-bold uppercase tracking-wider transition-colors shadow-lg group-hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]"
                >
                  <Download className="w-4 h-4" />
                  Baixar Imagem
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

