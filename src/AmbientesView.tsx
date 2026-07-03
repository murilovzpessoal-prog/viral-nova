import React, { useState } from 'react';
import { Search, Folder, Download, Image as ImageIcon, Sparkles } from 'lucide-react';

const categories = [
  "Todos", "Urbano", "Natureza", "Interior", "Estúdio", "Luxo", "Minimalista", "Praia", "Café", "Noturno"
];

// Placeholder images for the masonry grid
const templates = [
  {
    id: 1,
    category: "Interior",
    likes: 145,
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    category: "Urbano",
    likes: 210,
    image: "https://images.unsplash.com/photo-1514539079130-25950c84af65?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    category: "Natureza",
    likes: 312,
    image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    category: "Estúdio",
    likes: 89,
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 5,
    category: "Luxo",
    likes: 420,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 6,
    category: "Café",
    likes: 176,
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 7,
    category: "Minimalista",
    likes: 231,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 8,
    category: "Praia",
    likes: 345,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800",
  },
];

export const AmbientesView = () => {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [downloadingId, setDownloadingId] = useState<number | null>(null);

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = activeCategory === "Todos" || template.category === activeCategory;
    const matchesSearch = template.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownload = async (imageUrl: string, id: number) => {
    setDownloadingId(id);
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `ambiente-${id}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
    } finally {
      setTimeout(() => setDownloadingId(null), 1000);
    }
  };

  return (
    <div className="flex-1 w-full flex flex-col overflow-hidden bg-transparent">
      
      {/* Header Sticky com Filtros */}
      <div className="sticky top-0 z-20 bg-[#060608]/95 backdrop-blur-xl border-b border-white/5 pt-8 pb-4">
        <div className="px-6 md:px-12 w-full max-w-[1600px] mx-auto">
          {/* Header Title */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
                <Sparkles className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-semibold text-emerald-500 tracking-wide uppercase">Exclusivo</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-semibold text-white mb-4 leading-tight flex items-center gap-3">
                <ImageIcon className="w-10 h-10 text-emerald-500" />
                Cenários Premium
              </h1>
              <p className="text-[#8d8d99] text-base leading-relaxed">
                Navegue por nossa galeria de ambientes de alta resolução. Faça o download do cenário ideal e utilize na aba de Trocas para teletransportar suas influenciadoras para qualquer lugar do mundo.
              </p>
            </div>
            
            <div className="flex flex-col gap-3 min-w-[280px]">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5b5b7b] group-focus-within:text-white transition-colors" />
                <input
                  type="text"
                  placeholder="Buscar ambientes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#13141c] text-white placeholder-[#5b5b7b] rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:bg-[#1a1b26] focus:ring-1 focus:ring-white/10 transition-all border border-white/5"
                />
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mask-fade-edges">
            <div className="flex items-center gap-2 px-2 min-w-max">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2.5 rounded-xl whitespace-nowrap text-sm font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-white text-black shadow-lg scale-105'
                      : 'bg-[#13141c] text-[#8d8d99] hover:bg-[#1a1b26] hover:text-white border border-white/5'
                  }`}
                >
                  {category === "Todos" ? <Folder className="w-4 h-4 inline-block mr-2" /> : null}
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid de Ambientes */}
      <div className="flex-1 overflow-y-auto px-6 md:px-12 py-8">
        <div className="w-full max-w-[1600px] mx-auto">
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="group relative rounded-3xl overflow-hidden bg-[#0e0f14] border border-white/5 hover:border-emerald-500/30 transition-all duration-500 break-inside-avoid shadow-lg hover:shadow-[0_0_40px_rgba(16,185,129,0.15)] transform hover:-translate-y-1"
              >
                <div className="aspect-auto">
                  <img
                    src={template.image}
                    alt={template.category}
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white/90 text-xs font-medium border border-white/10 shadow-sm">
                    {template.category}
                  </span>
                </div>

                <div className="absolute bottom-0 inset-x-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <button
                    onClick={() => handleDownload(template.image, template.id)}
                    disabled={downloadingId === template.id}
                    className={`w-full py-3.5 rounded-xl text-white text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-xl ${
                      downloadingId === template.id 
                        ? 'bg-emerald-500/50 cursor-not-allowed' 
                        : 'bg-emerald-500 hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                    }`}
                  >
                    {downloadingId === template.id ? (
                      <span>Baixando...</span>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        Baixar Cenário
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-6">
                <Search className="w-10 h-10 text-[#5b5b7b]" />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">Nenhum cenário encontrado</h3>
              <p className="text-[#8d8d99]">Tente buscar por outros termos ou categorias.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
