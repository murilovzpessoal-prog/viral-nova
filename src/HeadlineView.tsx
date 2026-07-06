import React, { useState, useRef } from 'react';
import { Type, Upload, Sparkles, Copy, Check, ChevronLeft, Image as ImageIcon, X } from 'lucide-react';
import { supabase } from './lib/supabase';
import { analyzeImageForHeadline } from './lib/gemini';

export const HeadlineView: React.FC = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [headlines, setHeadlines] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setImagePreview(base64);
        setImageBase64(base64);
        setHeadlines([]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearImage = () => {
    setImagePreview(null);
    setImageBase64(null);
    setHeadlines([]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const generateHeadlines = async () => {
    if (!imageBase64) return;
    setIsGenerating(true);
    setHeadlines([]);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) throw new Error("Chave da API do Gemini não configurada.");
      
      const resultText = await analyzeImageForHeadline(imageBase64, apiKey);
      
      if (resultText) {
        const lines = resultText.split('\n').map((l: string) => l.trim().replace(/^-+|-+$/g, '').trim()).filter((l: string) => l.length > 0 && l.toLowerCase().includes('pov'));
        setHeadlines(lines.slice(0, 5));
      }
    } catch (err: any) {
      console.error("Erro ao gerar headlines:", err);
      alert(err.message || "Erro ao conectar com a IA");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <main className="max-w-[1200px] mx-auto px-6 py-12 md:py-16 relative min-h-screen flex flex-col">
      <div className="flex flex-col gap-6 mb-12">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[#00F0FF]/10 flex items-center justify-center backdrop-blur-sm border border-[#00F0FF]/30 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
            <Type className="w-5 h-5 text-[#00F0FF]" />
          </div>
          <div>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase">
              Gerador de <span className="bg-gradient-to-r from-[#00F0FF] via-[#FF007F] to-[#FF007F] bg-clip-text text-transparent">Headlines</span>
            </h1>
            <p className="text-[#8d8d99] mt-1 font-medium">Faça o upload de uma imagem e nossa IA criará headlines virais para seu conteúdo.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 flex-1">
        <div className="flex flex-col h-full">
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*" 
            onChange={handleImageUpload} 
          />
          
          <div className="bg-[#0B0B0E]/40 backdrop-blur-2xl border border-white/5 rounded-[32px] p-6 h-[500px] flex flex-col relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00F0FF]/5 via-transparent to-[#FF007F]/5 opacity-50"></div>
            
            {!imagePreview ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 border-2 border-dashed border-white/10 hover:border-[#00F0FF]/40 rounded-2xl flex flex-col items-center justify-center gap-4 cursor-pointer transition-all hover:bg-white/[0.02] relative z-10"
              >
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 group-hover:bg-[#00F0FF]/10 group-hover:shadow-[0_0_30px_rgba(0,240,255,0.2)]">
                  <Upload className="w-8 h-8 text-[#5b5b7b] group-hover:text-[#00F0FF] transition-colors" />
                </div>
                <div className="text-center">
                  <span className="block text-white font-black uppercase tracking-widest text-sm">Upload de Imagem</span>
                  <span className="text-xs text-[#5b5b7b] font-medium mt-1">Clique para selecionar foto (Produto/Influenciadora)</span>
                </div>
              </div>
            ) : (
              <div className="flex-1 relative rounded-2xl overflow-hidden flex items-center justify-center z-10">
                <img src={imagePreview} alt="Preview" className="max-w-full max-h-full object-contain rounded-2xl" />
                <button 
                  onClick={handleClearImage}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-red-500/80 transition-all border border-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
            
            <button
              onClick={generateHeadlines}
              disabled={!imagePreview || isGenerating}
              className={`mt-6 h-14 rounded-full flex items-center justify-center gap-3 relative overflow-hidden transition-all duration-500 z-10 ${
                !imagePreview ? 'bg-white/5 text-white/30 cursor-not-allowed' : 
                isGenerating ? 'bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/30' : 
                'bg-gradient-to-r from-[#00F0FF] to-[#FF007F] text-white hover:scale-[1.02] active:scale-[0.98] shadow-[0_10px_30px_rgba(255,0,127,0.3)]'
              }`}
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-2 border-[#00F0FF] border-t-transparent rounded-full animate-spin"></div>
                  <span className="font-black uppercase tracking-widest text-sm">Analisando Imagem...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span className="font-black uppercase tracking-widest text-sm">Gerar Headlines Virais</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="flex flex-col h-full">
          <div className="bg-[#0B0B0E]/40 backdrop-blur-2xl border border-white/5 rounded-[32px] p-6 lg:p-8 flex-1 flex flex-col relative overflow-hidden">
            <h2 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-[#FF007F]/20 flex items-center justify-center border border-[#FF007F]/30">
                <Type className="w-4 h-4 text-[#FF007F]" />
              </div>
              Sugestões da IA
            </h2>

            {headlines.length > 0 ? (
              <div className="flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar flex-1">
                {headlines.map((headline, idx) => (
                  <div 
                    key={idx}
                    className="group relative bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-[#00F0FF]/30 p-5 rounded-2xl transition-all duration-300"
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 left-0 w-1 h-0 bg-gradient-to-b from-[#00F0FF] to-[#FF007F] group-hover:h-3/4 rounded-r-full transition-all duration-300"></div>
                    <p className="text-white text-base md:text-lg font-medium pr-12 leading-relaxed">
                      {headline}
                    </p>
                    <button
                      onClick={() => copyToClipboard(headline, idx)}
                      className="absolute top-1/2 -translate-y-1/2 right-4 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#8d8d99] hover:text-white hover:bg-[#00F0FF]/20 hover:border-[#00F0FF]/40 transition-all"
                      title="Copiar"
                    >
                      {copiedIndex === idx ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50">
                <ImageIcon className="w-16 h-16 text-[#5b5b7b] mb-4 opacity-30" />
                <p className="text-[#8d8d99] font-medium max-w-[250px]">
                  Faça o upload da imagem e clique em "Gerar" para ver as headlines mágicas aparecerem aqui.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
