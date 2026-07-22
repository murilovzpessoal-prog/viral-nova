import React, { useState, useRef } from 'react';
import { Upload, X, Loader2, Wand2, Image as ImageIcon, Shirt, ArrowLeft, Clapperboard, Scissors, Maximize, ScissorsLineDashed, Layers, Download, Copy, Heart, Check } from 'lucide-react';
import { SWAP_PROMPTS } from './swapPrompts';
import { generateImageWithGemini } from './lib/gemini';
import { generateVTONWithFal } from './lib/fal';

type SwapMode = 'upper' | 'lower' | 'full' | 'background' | 'everything' | 'upscale' | null;

export const TrocasView = () => {
  const [swapMode, setSwapMode] = useState<SwapMode>(null);
  
  const [influencerImg, setInfluencerImg] = useState<string | null>(null);
  const [clothesImg, setClothesImg] = useState<string | null>(null);
  const [bgImg, setBgImg] = useState<string | null>(null);
  const [resultImg, setResultImg] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [vtonEngine, setVtonEngine] = useState<'kolors' | 'fashn'>('kolors');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fileInputRef1 = useRef<HTMLInputElement>(null);
  const fileInputRef2 = useRef<HTMLInputElement>(null);
  const fileInputRef3 = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string | null>>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setter(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (swapMode === 'everything') {
      if (!influencerImg || !clothesImg || !bgImg) return;
    } else if (swapMode === 'upscale') {
      if (!influencerImg) return;
    } else {
      if (!influencerImg || !clothesImg) return;
    }
    setIsGenerating(true);
    
    // Preparar o payload para a API
    const apiPayload = {
      mode: swapMode,
      influencerImage: influencerImg,
      targetImage: clothesImg,
      backgroundImage: swapMode === 'everything' ? bgImg : undefined,
      prompt: swapMode ? SWAP_PROMPTS[swapMode] : ''
    };
    
    console.log("=== ENVIANDO PARA API ===");
    console.log(apiPayload);
    console.log("=========================");
    
    try {
      const falResultUrl = await generateVTONWithFal(
        apiPayload.influencerImage,
        apiPayload.targetImage,
        apiPayload.mode as any,
        apiPayload.prompt,
        apiPayload.backgroundImage,
        vtonEngine as 'fashn' | 'kolors'
      );
      
      setResultImg(falResultUrl);
    } catch (err: any) {
      console.error(err);
      alert("Estamos atualizando essa função para melhorar a sua experiência, em breve estará online!");
    } finally {
      setIsGenerating(false);
    }
  };

  const resetFlow = () => {
    setSwapMode(null);
    setInfluencerImg(null);
    setClothesImg(null);
    setBgImg(null);
    setResultImg(null);
    setIsGenerating(false);
  };

  // Renderiza o Menu de Seleção Inicial
  if (swapMode === null) {
    return (
      <div className="flex-1 w-full flex flex-col p-6 md:p-12 pt-16 md:pt-20 overflow-y-auto bg-transparent">
        <div className="max-w-5xl mx-auto w-full">
          <div className="mb-12 text-center md:text-left">

            <h1 className="text-4xl md:text-5xl font-semibold text-white mb-4 leading-tight flex items-center justify-center md:justify-start gap-3">
              <Clapperboard className="w-10 h-10 text-blue-500" />
              O que você deseja trocar?
            </h1>
            <p className="text-[#8d8d99] text-base max-w-2xl mx-auto md:mx-0 leading-relaxed">
              Escolha o tipo de modificação que deseja aplicar. Nossa Inteligência Artificial cuidará de adaptar iluminação, texturas e proporções automaticamente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Parte Superior */}
            <button 
              onClick={() => setSwapMode('upper')}
              className="group p-8 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-[#7B00FF]/50 transition-all duration-300 text-left relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Shirt className="w-32 h-32 text-white" />
              </div>
              <div className="w-14 h-14 bg-[#7B00FF]/20 rounded-2xl flex items-center justify-center mb-6 border border-[#7B00FF]/30 group-hover:scale-110 transition-transform">
                <Shirt className="w-7 h-7 text-[#7B00FF]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Parte Superior</h3>
              <p className="text-[#8d8d99] text-sm max-w-[80%]">Substitua apenas camisetas, blusas, jaquetas e casacos, mantendo a calça original.</p>
            </button>

            {/* Parte Inferior */}
            <button 
              onClick={() => setSwapMode('lower')}
              className="group p-8 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-blue-500/50 transition-all duration-300 text-left relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <ScissorsLineDashed className="w-32 h-32 text-white" />
              </div>
              <div className="w-14 h-14 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/30 group-hover:scale-110 transition-transform">
                <ScissorsLineDashed className="w-7 h-7 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Parte Inferior</h3>
              <p className="text-[#8d8d99] text-sm max-w-[80%]">Substitua apenas calças, bermudas, saias e shorts, mantendo a blusa original.</p>
            </button>

            {/* Troca Completa */}
            <button 
              onClick={() => setSwapMode('full')}
              className="group p-8 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-pink-500/50 transition-all duration-300 text-left relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Maximize className="w-32 h-32 text-white" />
              </div>
              <div className="w-14 h-14 bg-pink-500/20 rounded-2xl flex items-center justify-center mb-6 border border-pink-500/30 group-hover:scale-110 transition-transform">
                <Maximize className="w-7 h-7 text-pink-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Look Completo</h3>
              <p className="text-[#8d8d99] text-sm max-w-[80%]">Substitua a vestimenta inteira do influenciador (ex: vestidos, conjuntos completos).</p>
            </button>

            {/* Cenário */}
            <button 
              onClick={() => setSwapMode('background')}
              className="group p-8 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-emerald-500/50 transition-all duration-300 text-left relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <ImageIcon className="w-32 h-32 text-white" />
              </div>
              <div className="w-14 h-14 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-6 border border-emerald-500/30 group-hover:scale-110 transition-transform">
                <ImageIcon className="w-7 h-7 text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Trocar Cenário</h3>
              <p className="text-[#8d8d99] text-sm max-w-[80%]">Teletransporte sua influenciadora para qualquer lugar enviando uma foto de fundo.</p>
            </button>
          </div>

          {/* Troca Tudo */}
          <div className="mt-6">
            <button 
              onClick={() => setSwapMode('everything')}
              className="w-full group p-6 rounded-3xl bg-gradient-to-r from-[#7B00FF]/10 to-blue-500/10 border border-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-between overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#7B00FF]/0 to-blue-500/0 group-hover:from-[#7B00FF]/10 group-hover:to-blue-500/10 transition-colors" />
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 relative z-10 w-full">
                <div className="w-14 h-14 bg-gradient-to-br from-[#7B00FF] to-blue-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform shrink-0">
                  <Layers className="w-7 h-7 text-white" />
                </div>
                <div className="text-left flex-1">
                  <h3 className="text-xl font-bold text-white mb-1">Troca Tudo (Look + Cenário)</h3>
                  <p className="text-[#8d8d99] text-sm">Modifique a influenciadora, a roupa completa e o ambiente de uma só vez.</p>
                </div>
                <div className="relative z-10 mt-4 md:mt-0 shrink-0 self-end md:self-auto">
                  <span className="px-5 py-2.5 rounded-full bg-white/10 text-white text-sm font-medium border border-white/5 flex items-center gap-2 group-hover:bg-white/20 transition-colors">
                    Acessar Troca Inteligente
                  </span>
                </div>
              </div>
            </button>
          </div>

          {/* Upscale */}
          <div className="mt-6">
            <button 
              onClick={() => setSwapMode('upscale')}
              className="w-full group p-6 rounded-3xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-between overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 to-teal-500/0 group-hover:from-emerald-500/10 group-hover:to-teal-500/10 transition-colors" />
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 relative z-10 w-full">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform shrink-0">
                  <Wand2 className="w-7 h-7 text-white" />
                </div>
                <div className="text-left flex-1">
                  <h3 className="text-xl font-bold text-white mb-1">Troca Manual (Ajuste Fino)</h3>
                  <p className="text-[#8d8d99] text-sm">Realize ajustes precisos e manuais na troca de roupa para controle total do resultado.</p>
                </div>
                <div className="relative z-10 mt-4 md:mt-0 shrink-0 self-end md:self-auto">
                  <span className="px-5 py-2.5 rounded-full bg-white/10 text-white text-sm font-medium border border-white/5 flex items-center gap-2 group-hover:bg-white/20 transition-colors">
                    Acessar Troca Manual
                  </span>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (swapMode === 'upscale') {
    const handleCopy = (id: string, text: string) => {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "absolute";
        textArea.style.left = "-999999px";
        document.body.prepend(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
        } catch (error) {
          console.error(error);
        } finally {
          textArea.remove();
        }
      }
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    };

    const cards = [
      {
        id: 'inferior',
        title: 'TROCA DE ROUPA INFERIOR',
        desc: 'Troque a roupa inferior da sua influenciadora mantendo a parte de cima original.',
        img: 'https://promptsmvz.site/assets/troca-roupa-inferior.jpg',
        prompt: `Apply ONLY the lower-body clothing (e.g., pants, skirt, shorts) from Image 2 onto the AI-generated virtual influencer from Image 1 with extremely realistic and professional quality.\n\nIMPORTANT RULES:\n\n1. Identity & Background: Preserve 100% of the influencer's face, identity, hairstyle, makeup, expression, and body proportions. Keep the original pose, framing, camera angle, and background exactly as shown in Image 1.\n2. Bottom Transfer (Target): Identify the lower-body garment in Image 2. Copy this bottom EXACTLY as shown. Preserve identical colors, fabric, texture, stitching, patterns, fit, and details. The bottom must fit naturally on the influencer's body with realistic fabric draping and folds.\n3. Top Preservation: Do NOT change or remove the influencer's original upper-body garment from Image 1. She must wear her original shirt, blouse, or jacket.\n4. No Modifications: Do NOT remove original accessories (from the bottom being copied). Do NOT add extra elements. Do NOT stylize or redesign the bottom.\n5. Technical Quality: Ultra realistic result, high definition, premium quality, fashion photography style. Detailed fabric preservation, accurate bottom transfer, and seamless virtual try-on.\n6. Realism: DSLR realism, natural skin texture, professional editorial lighting. Realistic shadows and reflections.\n7. Final Objective: A professional fashion photo of the fictional AI virtual influencer wearing the exact same bottom from Image 2 while retaining her original top from Image 1, all while maintaining perfect identity consistency.`
      },
      {
        id: 'superior',
        title: 'TROCA DE ROUPA SUPERIOR',
        desc: 'Troque a roupa superior da sua influenciadora mantendo a parte de baixo original.',
        img: 'https://promptsmvz.site/assets/troca-roupa-superior.jpg',
        prompt: `Apply ONLY the upper-body clothing (e.g., shirt, top, jacket) from Image 2 onto the AI-generated virtual influencer from Image 1 with extremely realistic and professional quality.\n\nIMPORTANT RULES:\n\n1. Identity & Background: Preserve 100% of the influencer's face, identity, hairstyle, makeup, expression, and body proportions. Keep the original pose, framing, camera angle, and background exactly as shown in Image 1.\n2. Top Transfer (Target): Identify the upper-body garment in Image 2. Copy this top EXACTLY as shown. Preserve identical colors, fabric, texture, stitching, patterns, fit, and details. The top must fit naturally on the influencer's body with realistic fabric draping and folds.\n3. Bottom Preservation: Do NOT change or remove the influencer's original lower-body garment from Image 1. She must wear her original pants, skirt, or shorts.\n4. No Modifications: Do NOT remove original accessories (from the top being copied). Do NOT add extra elements. Do NOT stylize or redesign the top.\n5. Technical Quality: Ultra realistic result, high definition, premium quality, fashion photography style. Detailed fabric preservation, accurate top transfer, and seamless virtual try-on.\n6. Realism: DSLR realism, natural skin texture, professional editorial lighting. Realistic shadows and reflections.\n7. Final Objective: A professional fashion photo of the fictional AI virtual influencer wearing the exact same top from Image 2 while retaining her original bottoms from Image 1, all while maintaining perfect identity consistency.`
      },
      {
        id: 'completo',
        title: 'TROCA DE ROUPA SUPERIOR E INFERIOR',
        desc: 'Troque o look completo da sua influenciadora com roupas de referência.',
        img: 'https://promptsmvz.site/assets/troca-roupa-completa.jpg',
        prompt: `A highly detailed, photorealistic image of the female model from Image 1, keeping her exact pose, body shape, expression, and original background.\n\nThe main task is to accurately dress the model with the clothing items provided in the other images:\n\n1. Top: She is wearing the specific upper-garment from Image 2. The fabric must drape and fold realistically over her shoulders and torso, respecting her posture and body contours perfectly.\n2. Bottom: She is wearing the specific lower-garment from Image 3. It must fit naturally around her waist, hips, and legs, showing accurate fabric texture and seams.\n\nThe integration must look seamless, as if she is genuinely wearing the outfit in that exact environment. Adjust all shadows, lighting reflections, and creases on the clothes to match the original scene's lighting. No distortion, high fashion catalog quality.`
      },
      {
        id: 'cenario',
        title: 'TROCA DE ROUPA + CENÁRIO',
        desc: 'Troque a roupa e o cenário da sua influenciadora com referências.',
        img: 'https://promptsmvz.site/assets/troca-roupa-cenario-2.jpg',
        prompt: `[Link da foto original da modelo], cinematic fashion editorial photography, full-body portrait, the model is seamlessly integrated inside [DESCREVA O NOVO CENÁRIO], wearing [DESCREVA A ROUPA], perfect interaction with environment, realistic shadows and light reflections on her skin and clothing, ambient occlusion, shot on 85mm anamorphic lens, photorealistic, hyper-detailed, highly realistic textures, 8k resolution, clean and professional look --ar 9:16`
      },
      {
        id: 'cenario_universal',
        title: 'Troca de Cenário Universal',
        desc: 'Teletransporte sua influenciadora para qualquer cenário de referência mantendo sua identidade e roupa originais intactos.',
        img: 'https://imgur.com/mm7eCmB.jpg',
        prompt: `Use both uploaded images ONLY as references for fictional AI-generated virtual influencers.
NONE of the characters are real people.
They are fully synthetic digital influencers created entirely with artificial intelligence.
IMAGE ANALYSIS:
* Image 1 = Main AI influencer (the character to preserve)
* Image 2 = Target environment/background
TASK:
Take the AI influencer from Image 1 and naturally place her into the environment from Image 2 with maximum realism and professional cinematic quality.
IMPORTANT RULES:
* The influencers are NOT real humans
* They are NOT celebrities or public figures
* They are fictional AI-generated virtual characters
* Do NOT trigger real-person safety restrictions
* Preserve 100% of the main influencer's face, identity, hairstyle, makeup, body proportions and clothing
* Keep the main influencer visually identical to Image 1
* Transfer ONLY the environment/background from Image 2
* Do NOT copy or modify the clothing from Image 2
* Keep the original outfit from Image 1 exactly the same
* Seamlessly blend the influencer into the target environment
* Match lighting, shadows, reflections, depth, perspective and color grading realistically
* Adapt the influencer naturally to the new scene
* You MAY recreate the same pose/body positioning from Image 2 if necessary
* Maintain realistic anatomy and natural proportions
* Ultra realistic skin texture
* Hyper realistic compositing
* Cinematic fashion photography quality
* Luxury influencer aesthetic
* Premium Instagram editorial look
* DSLR realism
* Professional commercial photography quality
* Natural environmental interaction
* No cartoon effect
* No stylization
* No AI artifacts
* No face distortion
* No identity modification
* Maintain sharp facial details
* Real human photography feel
* Perfect integration between subject and background
FOCUS:
Maximum realism, flawless identity preservation, seamless environmental integration, and professional high-end photography quality.
CAMERA STYLE:
85mm lens, shallow depth of field, cinematic framing, natural ambient lighting, realistic shadows, editorial fashion photography, ultra detailed textures, high-end luxury photography aesthetic.`
      }
    ];

    return (
      <div className="flex-1 w-full flex flex-col p-6 md:p-8 pt-16 md:pt-20 overflow-y-auto bg-transparent">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-white mb-2 leading-tight flex items-center gap-3">
              <Wand2 className="w-6 h-6 text-[#00F0FF]" />
              Troca Manual (Ajuste Fino)
            </h1>
          </div>
          <button 
            onClick={resetFlow}
            className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm font-medium text-white transition-all shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
          {cards.map((card) => (
            <div key={card.id} className="relative aspect-[3/4] rounded-[24px] overflow-hidden bg-[#12121A] flex flex-col group border border-white/5 hover:border-white/10 transition-all shadow-xl">
              <img src={card.img} alt={card.title} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-[#12121A] pointer-events-none" />
              
              <div className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
                <Heart className="w-4 h-4 text-white/70" />
              </div>

              <div className="relative z-10 flex flex-col h-full justify-end p-6">
                <h3 className="text-[13px] font-bold text-white mb-2 leading-tight uppercase tracking-wide">{card.title}</h3>
                <p className="text-[11px] text-[#A1A1AA] leading-relaxed mb-5">{card.desc}</p>
                
                <button 
                  onClick={() => handleCopy(card.id, card.prompt)}
                  className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white text-[11px] font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-all backdrop-blur-md shadow-lg"
                >
                  {copiedId === card.id ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      COPIADO
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      COPIAR PROMPT
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // --- ÁREA DE EDIÇÃO ---

  // Adaptação dos textos baseado no modo
  const isBgMode = swapMode === 'background';
  const isEverythingMode = swapMode === 'everything';
  const isUpscaleMode = swapMode === 'upscale';
  const targetLabel = isBgMode ? 'Cenário' : isEverythingMode ? 'Look Completo' : 'Roupa Alvo';
  const targetDesc = isBgMode ? 'Selecione o novo fundo' : isEverythingMode ? 'Selecione a roupa' : 'Selecione a peça de roupa';
  const targetUploadText = isBgMode ? 'Upload do Cenário' : 'Upload da Roupa';
  const targetUploadDesc = isBgMode ? 'Selecione a foto de fundo que deseja aplicar.' : 'Selecione a peça que deseja vestir na modelo.';
  const TargetIcon = isBgMode ? ImageIcon : Shirt;
  const buttonLabel = isBgMode ? 'Trocar Cenário' : 'Trocar Roupa';
  const generateLabel = isUpscaleMode ? 'Realizar Upscale' : isEverythingMode ? 'Realizar Troca Inteligente' : isBgMode ? 'Realizar Troca (Cenário)' : 'Realizar Troca (Roupa)';
  const modeTitle = swapMode === 'upper' ? 'Parte Superior' : swapMode === 'lower' ? 'Parte Inferior' : swapMode === 'full' ? 'Look Completo' : swapMode === 'everything' ? 'Troca Tudo' : swapMode === 'upscale' ? 'Upscale 1000x' : 'Cenário';

  return (
    <div className="flex-1 w-full flex flex-col p-6 md:p-8 pt-16 md:pt-20 overflow-y-auto bg-transparent">
      {/* Header Cloned from image */}
      <div className="mb-6 flex items-center justify-between">
        <div>

          <h1 className="text-2xl md:text-3xl font-semibold text-white mb-2 leading-tight flex items-center gap-3">
            <Clapperboard className="w-6 h-6 text-blue-500" />
            Configurando Troca
          </h1>
        </div>

        <button 
          onClick={resetFlow}
          className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm font-medium text-white transition-all shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Mudar Tipo de Troca
        </button>
      </div>

      {/* Grid de Colunas */}
      <div className={`grid grid-cols-1 md:grid-cols-2 ${isEverythingMode ? 'lg:grid-cols-4' : isUpscaleMode ? 'lg:grid-cols-2' : 'lg:grid-cols-3'} gap-6 pb-20 max-w-${isUpscaleMode ? '4xl' : '7xl'} mx-auto w-full`}>
        
        {/* COLUNA 1: INFLUENCIADORA */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-white uppercase tracking-widest">Etapa 1 · {isUpscaleMode ? 'Imagem' : 'Avatar / Modelo'}</span>
            <span className="text-[11px] text-[#5b5b7b]">{isUpscaleMode ? 'Envie a foto bugada' : 'Envie a foto base'}</span>
          </div>

          <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden bg-white/[0.02] border border-white/10 backdrop-blur-[30px] flex flex-col hover:border-[#00F0FF]/40 hover:shadow-[0_0_30px_rgba(0,240,255,0.2)] transition-all duration-300">
            {influencerImg ? (
              <>
                <img src={influencerImg} alt="Influenciadora" className="w-full h-full object-cover" />
                <button 
                  onClick={() => setInfluencerImg(null)}
                  className="absolute top-4 right-4 w-8 h-8 bg-black/60 rounded-full flex items-center justify-center text-white hover:bg-red-500/80 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-4 inset-x-4">
                  <button 
                    onClick={() => fileInputRef1.current?.click()}
                    className="w-full py-3 bg-white/[0.03] border border-white/10 backdrop-blur-[30px] hover:bg-white/[0.05] border border-white/10 backdrop-blur-[20px] border border-white/5 rounded-xl text-white text-xs font-medium flex items-center justify-center gap-2 transition-all shadow-xl"
                  >
                    <Upload className="w-4 h-4" />
                    Trocar Foto
                  </button>
                </div>
              </>
            ) : (
              <button 
                onClick={() => fileInputRef1.current?.click()}
                className="w-full h-full flex flex-col items-center justify-center gap-4 hover:bg-white/[0.02] transition-colors p-6 group"
              >
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ImageIcon className="w-8 h-8 text-[#5b5b7b]" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-white mb-1">Upload da Modelo</p>
                  <p className="text-[11px] text-[#5b5b7b] px-4">Arraste a imagem ou clique para selecionar do computador.</p>
                </div>
              </button>
            )}
            <input type="file" ref={fileInputRef1} onChange={(e) => handleImageUpload(e, setInfluencerImg)} accept="image/*" className="hidden" />
          </div>
        </div>

        {/* COLUNA 2: ALVO (ROUPA OU CENÁRIO) */}
        {!isUpscaleMode && (
          <div className="flex flex-col gap-3">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-white uppercase tracking-widest">Etapa 2 · {targetLabel}</span>
              <span className="text-[11px] text-[#5b5b7b]">{targetDesc}</span>
            </div>

            <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden bg-white/[0.02] border border-white/10 backdrop-blur-[30px] flex flex-col hover:border-[#00F0FF]/40 hover:shadow-[0_0_30px_rgba(0,240,255,0.2)] transition-all duration-300">
              {clothesImg ? (
                <>
                  <img src={clothesImg} alt={targetLabel} className="w-full h-full object-cover" />
                  <button 
                    onClick={() => setClothesImg(null)}
                    className="absolute top-4 right-4 w-8 h-8 bg-black/60 rounded-full flex items-center justify-center text-white hover:bg-red-500/80 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-4 inset-x-4">
                    <button 
                      onClick={() => fileInputRef2.current?.click()}
                      className="w-full py-3 bg-white/[0.03] border border-white/10 backdrop-blur-[30px] hover:bg-white/[0.05] border border-white/10 backdrop-blur-[20px] border border-white/5 rounded-xl text-white text-xs font-medium flex items-center justify-center gap-2 transition-all shadow-xl"
                    >
                      <Upload className="w-4 h-4" />
                      {buttonLabel}
                    </button>
                  </div>
                </>
              ) : (
                <button 
                  onClick={() => fileInputRef2.current?.click()}
                  className="w-full h-full flex flex-col items-center justify-center gap-4 hover:bg-white/[0.02] transition-colors p-6 group"
                >
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <TargetIcon className="w-8 h-8 text-[#5b5b7b]" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-white mb-1">{targetUploadText}</p>
                    <p className="text-[11px] text-[#5b5b7b] px-4">{targetUploadDesc}</p>
                  </div>
                </button>
              )}
              <input type="file" ref={fileInputRef2} onChange={(e) => handleImageUpload(e, setClothesImg)} accept="image/*" className="hidden" />
            </div>
          </div>
        )}

        {/* COLUNA 3 (OPCIONAL): CENÁRIO (SÓ NO MODO EVERYTHING) */}
        {isEverythingMode && (
          <div className="flex flex-col gap-3">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-white uppercase tracking-widest">Etapa 3 · Cenário</span>
              <span className="text-[11px] text-[#5b5b7b]">Selecione o novo fundo</span>
            </div>

            <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden bg-white/[0.02] border border-white/10 backdrop-blur-[30px] flex flex-col hover:border-[#00F0FF]/40 hover:shadow-[0_0_30px_rgba(0,240,255,0.2)] transition-all duration-300">
              {bgImg ? (
                <>
                  <img src={bgImg} alt="Cenário" className="w-full h-full object-cover" />
                  <button 
                    onClick={() => setBgImg(null)}
                    className="absolute top-4 right-4 w-8 h-8 bg-black/60 rounded-full flex items-center justify-center text-white hover:bg-red-500/80 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-4 inset-x-4">
                    <button 
                      onClick={() => fileInputRef3.current?.click()}
                      className="w-full py-3 bg-white/[0.03] border border-white/10 backdrop-blur-[30px] hover:bg-white/[0.05] border border-white/10 backdrop-blur-[20px] border border-white/5 rounded-xl text-white text-xs font-medium flex items-center justify-center gap-2 transition-all shadow-xl"
                    >
                      <Upload className="w-4 h-4" />
                      Trocar Cenário
                    </button>
                  </div>
                </>
              ) : (
                <button 
                  onClick={() => fileInputRef3.current?.click()}
                  className="w-full h-full flex flex-col items-center justify-center gap-4 hover:bg-white/[0.02] transition-colors p-6 group"
                >
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ImageIcon className="w-8 h-8 text-[#5b5b7b]" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-white mb-1">Upload do Cenário</p>
                    <p className="text-[11px] text-[#5b5b7b] px-4">Selecione a foto de fundo que deseja aplicar.</p>
                  </div>
                </button>
              )}
              <input type="file" ref={fileInputRef3} onChange={(e) => handleImageUpload(e, setBgImg)} accept="image/*" className="hidden" />
            </div>
          </div>
        )}

        {/* COLUNA FINAL: RESULTADO */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-white uppercase tracking-widest">Etapa {isUpscaleMode ? '2' : isEverythingMode ? '4' : '3'} · Resultado Final</span>
            <span className="text-[11px] text-[#5b5b7b]">Aguarde a substituição</span>
          </div>

          <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden bg-white/[0.02] border border-white/10 backdrop-blur-[40px] border border-white/5 flex flex-col group/result">
            {resultImg && !isGenerating ? (
              <>
                <img src={resultImg} alt="Resultado Final" className="w-full h-full object-cover animate-in fade-in duration-700" />
                <button 
                  onClick={async () => {
                    try {
                      // Fetch the image as a blob to bypass cross-origin download restrictions
                      const response = await fetch(resultImg);
                      const blob = await response.blob();
                      const blobUrl = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = blobUrl;
                      a.download = `viralpulse-troca-${Date.now()}.png`;
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                      URL.revokeObjectURL(blobUrl);
                    } catch (err) {
                      console.error("Erro ao baixar:", err);
                      // Fallback: alertar o usuário sobre o bloqueio de segurança do navegador
                      alert('Seu navegador bloqueou o download automático por segurança. A imagem será aberta em uma nova guia. Clique com o botão direito nela e selecione "Salvar Imagem Como..."');
                      window.open(resultImg, '_blank');
                    }
                  }}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-[#7B00FF] rounded-full flex items-center justify-center backdrop-blur-md border border-white/10 text-white transition-all opacity-0 group-hover/result:opacity-100"
                  title="Baixar Imagem"
                >
                  <Download className="w-5 h-5" />
                </button>
              </>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-center p-8">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6">
                  {isGenerating ? (
                    <Loader2 className="w-8 h-8 text-[#7B00FF] animate-spin" />
                  ) : (
                    <TargetIcon className="w-8 h-8 text-[#5b5b7b] opacity-50" />
                  )}
                </div>
                {isGenerating ? (
                  <>
                    <h3 className="text-sm font-bold text-white mb-2">Processando IA...</h3>
                    <p className="text-[11px] text-[#5b5b7b]">Isso pode levar alguns segundos. Estamos ajustando detalhes finos de forma realista.</p>
                  </>
                ) : (
                  <p className="text-[11px] text-[#5b5b7b] max-w-[200px]">
                    Conclua as etapas anteriores para liberar a edição final.
                  </p>
                )}
              </div>
            )}
            
            {/* Botão de Geração sobreposto */}
            {!isGenerating && influencerImg && (isUpscaleMode || clothesImg) && (!isEverythingMode || bgImg) && (
              <div className="absolute bottom-4 inset-x-4">
                <button 
                  onClick={handleGenerate}
                  className="w-full py-4 bg-[#7B00FF] hover:bg-[#7B00FF] rounded-xl text-white text-sm font-black flex items-center justify-center gap-2 transition-all shadow-[0_0_30px_rgba(123,0,255,0.3)] animate-in slide-in-from-bottom-4"
                >
                  <Wand2 className="w-5 h-5" />
                  {resultImg ? 'Gerar Novamente' : generateLabel}
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
