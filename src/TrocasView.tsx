import React, { useState, useRef } from 'react';
import { Upload, X, Loader2, Wand2, Image as ImageIcon, Shirt, ArrowLeft, Clapperboard, Scissors, Maximize, ScissorsLineDashed, Layers } from 'lucide-react';
import { SWAP_PROMPTS } from './swapPrompts';

type SwapMode = 'upper' | 'lower' | 'full' | 'background' | 'everything' | null;

export const TrocasView = () => {
  const [swapMode, setSwapMode] = useState<SwapMode>(null);
  
  const [influencerImg, setInfluencerImg] = useState<string | null>(null);
  const [clothesImg, setClothesImg] = useState<string | null>(null);
  const [bgImg, setBgImg] = useState<string | null>(null);
  const [resultImg, setResultImg] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const fileInputRef1 = useRef<HTMLInputElement>(null);
  const fileInputRef2 = useRef<HTMLInputElement>(null);
  const fileInputRef3 = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string | null>>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setter(url);
    }
  };

  const handleGenerate = () => {
    if (swapMode === 'everything') {
      if (!influencerImg || !clothesImg || !bgImg) return;
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
    
    // Simulação da API de geração
    setTimeout(() => {
      setResultImg(influencerImg); // Apenas um placeholder visual para simular o retorno
      setIsGenerating(false);
    }, 4000);
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
      <div className="flex-1 w-full flex flex-col p-6 md:p-12 overflow-y-auto bg-transparent">
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
              className="group p-8 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-[#8B5CF6]/50 transition-all duration-300 text-left relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Shirt className="w-32 h-32 text-white" />
              </div>
              <div className="w-14 h-14 bg-[#8B5CF6]/20 rounded-2xl flex items-center justify-center mb-6 border border-[#8B5CF6]/30 group-hover:scale-110 transition-transform">
                <Shirt className="w-7 h-7 text-[#8B5CF6]" />
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
              className="w-full group p-6 rounded-3xl bg-gradient-to-r from-[#8B5CF6]/10 to-blue-500/10 border border-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-between overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6]/0 to-blue-500/0 group-hover:from-[#8B5CF6]/10 group-hover:to-blue-500/10 transition-colors" />
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 relative z-10 w-full">
                <div className="w-14 h-14 bg-gradient-to-br from-[#8B5CF6] to-blue-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform shrink-0">
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
        </div>
      </div>
    );
  }

  // --- ÁREA DE EDIÇÃO ---

  // Adaptação dos textos baseado no modo
  const isBgMode = swapMode === 'background';
  const isEverythingMode = swapMode === 'everything';
  const targetLabel = isBgMode ? 'Cenário' : isEverythingMode ? 'Look Completo' : 'Roupa Alvo';
  const targetDesc = isBgMode ? 'Selecione o novo fundo' : isEverythingMode ? 'Selecione a roupa' : 'Selecione a peça de roupa';
  const targetUploadText = isBgMode ? 'Upload do Cenário' : 'Upload da Roupa';
  const targetUploadDesc = isBgMode ? 'Selecione a foto de fundo que deseja aplicar.' : 'Selecione a peça que deseja vestir na modelo.';
  const TargetIcon = isBgMode ? ImageIcon : Shirt;
  const buttonLabel = isBgMode ? 'Trocar Cenário' : 'Trocar Roupa';
  const generateLabel = isEverythingMode ? 'Realizar Troca Inteligente' : isBgMode ? 'Realizar Troca (Cenário)' : 'Realizar Troca (Roupa)';
  const modeTitle = swapMode === 'upper' ? 'Parte Superior' : swapMode === 'lower' ? 'Parte Inferior' : swapMode === 'full' ? 'Look Completo' : swapMode === 'everything' ? 'Troca Tudo' : 'Cenário';

  return (
    <div className="flex-1 w-full flex flex-col p-6 md:p-8 overflow-y-auto bg-transparent">
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

      {/* Grid de 3 ou 4 Colunas */}
      <div className={`grid grid-cols-1 md:grid-cols-2 ${isEverythingMode ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-6 pb-20`}>
        
        {/* COLUNA 1: INFLUENCIADORA */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-white uppercase tracking-widest">Etapa 1 · Avatar / Modelo</span>
            <span className="text-[11px] text-[#5b5b7b]">Envie a foto base</span>
          </div>

          <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden bg-[#0e0f14] border border-white/10 flex flex-col">
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
                    className="w-full py-3 bg-[#13141c] hover:bg-[#1a1b26] border border-white/5 rounded-xl text-white text-xs font-medium flex items-center justify-center gap-2 transition-all shadow-xl"
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
        <div className="flex flex-col gap-3">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-white uppercase tracking-widest">Etapa 2 · {targetLabel}</span>
            <span className="text-[11px] text-[#5b5b7b]">{targetDesc}</span>
          </div>

          <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden bg-[#0e0f14] border border-white/10 flex flex-col">
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
                    className="w-full py-3 bg-[#13141c] hover:bg-[#1a1b26] border border-white/5 rounded-xl text-white text-xs font-medium flex items-center justify-center gap-2 transition-all shadow-xl"
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

        {/* COLUNA 3 (OPCIONAL): CENÁRIO (SÓ NO MODO EVERYTHING) */}
        {isEverythingMode && (
          <div className="flex flex-col gap-3">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-white uppercase tracking-widest">Etapa 3 · Cenário</span>
              <span className="text-[11px] text-[#5b5b7b]">Selecione o novo fundo</span>
            </div>

            <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden bg-[#0e0f14] border border-white/10 flex flex-col">
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
                      className="w-full py-3 bg-[#13141c] hover:bg-[#1a1b26] border border-white/5 rounded-xl text-white text-xs font-medium flex items-center justify-center gap-2 transition-all shadow-xl"
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
            <span className="text-[10px] font-bold text-white uppercase tracking-widest">Etapa {isEverythingMode ? '4' : '3'} · Resultado Final</span>
            <span className="text-[11px] text-[#5b5b7b]">Aguarde a substituição</span>
          </div>

          <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden bg-[#0b0c10] border border-white/5 flex flex-col">
            {resultImg && !isGenerating ? (
              <img src={resultImg} alt="Resultado Final" className="w-full h-full object-cover animate-in fade-in duration-700" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-center p-8">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6">
                  {isGenerating ? (
                    <Loader2 className="w-8 h-8 text-[#8B5CF6] animate-spin" />
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
            {!isGenerating && influencerImg && clothesImg && (!isEverythingMode || bgImg) && (
              <div className="absolute bottom-4 inset-x-4">
                <button 
                  onClick={handleGenerate}
                  className="w-full py-4 bg-[#8B5CF6] hover:bg-[#7c3aed] rounded-xl text-white text-sm font-black flex items-center justify-center gap-2 transition-all shadow-[0_0_30px_rgba(139,92,246,0.3)] animate-in slide-in-from-bottom-4"
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
