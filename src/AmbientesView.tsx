import React, { useState } from 'react';
import { Search, Folder, Sparkles, Flame, Heart, Copy, Wand2, ArrowLeft, Loader2, Download } from 'lucide-react';
import { generateImageWithGemini } from './lib/gemini';

const categories = ["Todos", "Sala", "Quarto", "Corredor", "Varanda", "Banheiro"];

// Placeholder images for the masonry grid
const templates = [
  {
    id: 1,
    category: "Quarto",
    title: "AMBIENTE - QUARTO",
    desc: "Cenário ultra-realista de quarto para utilizar nos seus vídeos.",
    likes: 101,
    image: "https://promptsmvz.site/assets/ambiente-01.jpg",
    promptText: "Cenário de quarto realista."
  },
  {
    id: 2,
    category: "Corredor",
    title: "AMBIENTE - CORREDOR",
    desc: "Cenário ultra-realista de corredor para utilizar nos seus vídeos.",
    likes: 102,
    image: "https://promptsmvz.site/assets/ambiente-02.jpg",
    promptText: "Cenário de corredor realista."
  },
  {
    id: 3,
    category: "Banheiro",
    title: "AMBIENTE - BANHEIRO",
    desc: "Cenário ultra-realista de banheiro para utilizar nos seus vídeos.",
    likes: 103,
    image: "https://promptsmvz.site/assets/ambiente-03.jpg",
    promptText: "Cenário de banheiro realista."
  },
  {
    id: 4,
    category: "Corredor",
    title: "AMBIENTE - CORREDOR",
    desc: "Cenário ultra-realista de corredor para utilizar nos seus vídeos.",
    likes: 104,
    image: "https://promptsmvz.site/assets/ambiente-04.jpg",
    promptText: "Cenário de corredor realista."
  },
  {
    id: 5,
    category: "Varanda",
    title: "AMBIENTE - VARANDA",
    desc: "Cenário ultra-realista de varanda para utilizar nos seus vídeos.",
    likes: 105,
    image: "https://promptsmvz.site/assets/ambiente-05.jpg",
    promptText: "Cenário de varanda realista."
  },
  {
    id: 6,
    category: "Sala",
    title: "AMBIENTE - SALA",
    desc: "Cenário ultra-realista de sala para utilizar nos seus vídeos.",
    likes: 106,
    image: "https://promptsmvz.site/assets/ambiente-06.jpg",
    promptText: "Cenário de sala realista."
  },
  {
    id: 7,
    category: "Quarto",
    title: "AMBIENTE - QUARTO",
    desc: "Cenário ultra-realista de quarto para utilizar nos seus vídeos.",
    likes: 107,
    image: "https://promptsmvz.site/assets/ambiente-07.jpg",
    promptText: "Cenário de quarto realista."
  },
  {
    id: 8,
    category: "Varanda",
    title: "AMBIENTE - VARANDA",
    desc: "Cenário ultra-realista de varanda para utilizar nos seus vídeos.",
    likes: 108,
    image: "https://promptsmvz.site/assets/ambiente-08.jpg",
    promptText: "Cenário de varanda realista."
  },
  {
    id: 9,
    category: "Sala",
    title: "AMBIENTE - SALA",
    desc: "Cenário ultra-realista de sala para utilizar nos seus vídeos.",
    likes: 109,
    image: "https://promptsmvz.site/assets/ambiente-09.jpg",
    promptText: "Cenário de sala realista."
  },
  {
    id: 10,
    category: "Sala",
    title: "AMBIENTE - SALA",
    desc: "Cenário ultra-realista de sala para utilizar nos seus vídeos.",
    likes: 110,
    image: "https://promptsmvz.site/assets/ambiente-10.jpg",
    promptText: "Cenário de sala realista."
  },
  {
    id: 11,
    category: "Quarto",
    title: "AMBIENTE - QUARTO",
    desc: "Cenário ultra-realista de quarto para utilizar nos seus vídeos.",
    likes: 111,
    image: "https://promptsmvz.site/assets/ambiente-11.jpg",
    promptText: "Cenário de quarto realista."
  },
  {
    id: 12,
    category: "Sala",
    title: "AMBIENTE - SALA",
    desc: "Cenário ultra-realista de sala para utilizar nos seus vídeos.",
    likes: 112,
    image: "https://promptsmvz.site/assets/ambiente-12.jpg",
    promptText: "Cenário de sala realista."
  },
  {
    id: 13,
    category: "Sala",
    title: "AMBIENTE - SALA",
    desc: "Cenário ultra-realista de sala para utilizar nos seus vídeos.",
    likes: 113,
    image: "https://promptsmvz.site/assets/ambiente-13.jpg",
    promptText: "Cenário de sala realista."
  },
  {
    id: 14,
    category: "Sala",
    title: "AMBIENTE - SALA",
    desc: "Cenário ultra-realista de sala para utilizar nos seus vídeos.",
    likes: 114,
    image: "https://promptsmvz.site/assets/ambiente-14.jpg",
    promptText: "Cenário de sala realista."
  },
  {
    id: 15,
    category: "Sala",
    title: "AMBIENTE - SALA",
    desc: "Cenário ultra-realista de sala para utilizar nos seus vídeos.",
    likes: 115,
    image: "https://promptsmvz.site/assets/ambiente-15.jpg",
    promptText: "Cenário de sala realista."
  },
  {
    id: 16,
    category: "Sala",
    title: "AMBIENTE - SALA",
    desc: "Cenário ultra-realista de sala para utilizar nos seus vídeos.",
    likes: 116,
    image: "https://promptsmvz.site/assets/ambiente-16.jpg",
    promptText: "Cenário de sala realista."
  },
  {
    id: 17,
    category: "Corredor",
    title: "AMBIENTE - CORREDOR",
    desc: "Cenário ultra-realista de corredor para utilizar nos seus vídeos.",
    likes: 117,
    image: "https://promptsmvz.site/assets/ambiente-17.jpg",
    promptText: "Cenário de corredor realista."
  },
  {
    id: 18,
    category: "Corredor",
    title: "AMBIENTE - CORREDOR",
    desc: "Cenário ultra-realista de corredor para utilizar nos seus vídeos.",
    likes: 118,
    image: "https://promptsmvz.site/assets/ambiente-18.jpg",
    promptText: "Cenário de corredor realista."
  },
  {
    id: 19,
    category: "Corredor",
    title: "AMBIENTE - CORREDOR",
    desc: "Cenário ultra-realista de corredor para utilizar nos seus vídeos.",
    likes: 119,
    image: "https://promptsmvz.site/assets/ambiente-19.jpg",
    promptText: "Cenário de corredor realista."
  },
  {
    id: 20,
    category: "Sala",
    title: "AMBIENTE - SALA",
    desc: "Cenário ultra-realista de sala para utilizar nos seus vídeos.",
    likes: 120,
    image: "https://promptsmvz.site/assets/ambiente-20.jpg",
    promptText: "Cenário de sala realista."
  }
];

export const AmbientesView = () => {
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
      
      const b64Generated = await generateImageWithGemini(selectedTemplate.promptText, apiKey);
      setResultImg(b64Generated);
    } catch (error: any) {
      console.error(error);
      alert('Erro ao gerar cenário (Gemini): ' + (error.message || 'Erro desconhecido.'));
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
                    Nossa IA vai analisar o prompt vinculado a esta imagem e gerar a sua influenciadora de forma ultra-realista.
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
                    <p className="text-[#7B00FF] text-sm animate-pulse">Enviando prompt para a API e gerando...</p>
                  </div>
                </div>
              )}

              {resultImg && !isGenerating && (
                <div className="absolute inset-0 w-full h-full">
                  <img src={resultImg} alt="Resultado" className="w-full h-full object-cover" />
                  
                  {/* Botões Overlay no Resultado */}
                  <div className="absolute bottom-6 left-0 w-full px-6 flex items-center gap-3">
                    <button className="flex-1 py-3 bg-white text-black rounded-xl font-black text-sm flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors shadow-xl">
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
            Navegue pelos <span className="font-medium bg-gradient-to-r from-[#00F0FF] to-[#FF007F] text-transparent bg-clip-text">Cenários Premium</span> para o seu avatar
          </h1>
          <p className="text-[#8d8d99] text-sm max-w-2xl">
            Escolha e baixe um ambiente de alta resolução para utilizar na aba de Trocas e teletransportar sua influenciadora virtual.
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
          <div 
            key={template.id} 
            onClick={() => setSelectedTemplate(template)}
            className="relative group aspect-[4/5] rounded-[24px] overflow-hidden bg-white/5 border border-white/5 flex flex-col justify-end p-5 cursor-pointer"
          >
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
                Baixe este cenário para utilizá-lo nas trocas inteligentes de fundo.
              </p>
              
              {/* Botão Baixar Cenário */}
              <a
                href={template.image}
                download
                target="_blank"
                className="mt-2 flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-[#00F0FF]/80 to-[#00F0FF]/80 hover:from-[#00F0FF] hover:to-[#00F0FF] backdrop-blur-md border border-white/10 rounded-xl text-white text-[11px] font-bold uppercase tracking-wider transition-colors shadow-lg group-hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]"
              >
                <Download className="w-4 h-4" />
                Baixar Cenário
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

