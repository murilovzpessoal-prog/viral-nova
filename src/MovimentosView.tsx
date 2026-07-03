import React, { useState } from 'react';
import { Search, Folder, Sparkles, Flame, Heart, Copy } from 'lucide-react';

const categories = [
  "Animações", "YouTube Create", "Flow", "Grok"
];

// Placeholder images for the masonry grid
const templates = [
  { id: 1, category: "Moda", likes: 120, image: "https://ennvoai.com/assets/tpl-new-01-BVKrZL3P.jpeg" },
  { id: 2, category: "Lifestyle", likes: 85, image: "https://ennvoai.com/assets/tpl-new-02-CajyUH1F.jpeg" },
  { id: 3, category: "UGC", likes: 93, image: "https://ennvoai.com/assets/tpl-new-03-CANpAz3X.jpeg" },
  { id: 4, category: "Casa", likes: 110, image: "https://ennvoai.com/assets/tpl-new-04-BEwmOLZ1.jpeg" },
  { id: 5, category: "Fitness", likes: 78, image: "https://ennvoai.com/assets/tpl-new-05-B_NcP5ex.jpeg" },
  { id: 6, category: "Moda", likes: 230, image: "https://ennvoai.com/assets/tpl-new-06-DglCKvvY.jpeg" },
  { id: 7, category: "Estúdio", likes: 145, image: "https://ennvoai.com/assets/tpl-01-Y3zuWhEb.jpg" },
  { id: 8, category: "UGC", likes: 98, image: "https://ennvoai.com/assets/tpl-02-BwmjFx15.jpg" },
  { id: 9, category: "Beleza", likes: 167, image: "https://ennvoai.com/assets/tpl-03-B2QExTsd.jpg" },
  { id: 10, category: "Moda", likes: 89, image: "https://ennvoai.com/assets/tpl-04-D5PDyOtC.jpg" },
  { id: 11, category: "Tecnologia", likes: 210, image: "https://ennvoai.com/assets/tpl-05-Dz5PULhN.jpg" },
  { id: 12, category: "Lifestyle", likes: 134, image: "https://ennvoai.com/assets/tpl-06-0NaFF3j-.jpg" },
  { id: 13, category: "Moda", likes: 88, image: "https://ennvoai.com/assets/tpl-07-Cg8CSyVA.jpg" },
  { id: 14, category: "UGC", likes: 76, image: "https://ennvoai.com/assets/tpl-08-R910gh3B.jpg" },
  { id: 15, category: "Casa", likes: 150, image: "https://ennvoai.com/assets/tpl-09-BQc2blWj.jpg" },
  { id: 16, category: "Beleza", likes: 142, image: "https://ennvoai.com/assets/tpl-10-ClRXGraB.jpg" },
  { id: 17, category: "Lifestyle", likes: 91, image: "https://ennvoai.com/assets/tpl-11-CEAZS9wP.jpg" },
  { id: 18, category: "Moda", likes: 201, image: "https://ennvoai.com/assets/tpl-12-D33C8_62.jpg" },
  { id: 19, category: "UGC", likes: 112, image: "https://ennvoai.com/assets/tpl-13-Cc5wPAL2.jpg" },
  { id: 20, category: "Fitness", likes: 178, image: "https://ennvoai.com/assets/tpl-14-BEnBBG-X.jpg" },
  { id: 21, category: "Tecnologia", likes: 145, image: "https://ennvoai.com/assets/tpl-15-Dx2pkIDI.jpg" },
  { id: 22, category: "Beleza", likes: 96, image: "https://ennvoai.com/assets/tpl-16-cl1lJgFm.jpg" },
  { id: 23, category: "Moda", likes: 188, image: "https://ennvoai.com/assets/tpl-17-ueVWYAXf.jpg" },
  { id: 24, category: "Lifestyle", likes: 154, image: "https://ennvoai.com/assets/tpl-18-CG52uh7I.jpg" },
  { id: 30, category: "UGC", likes: 122, image: "https://ennvoai.com/assets/tpl-19-B8LkPyvI.jpg" },
  { id: 31, category: "Moda", likes: 176, image: "https://ennvoai.com/assets/tpl-20-33MI2ENB.jpg" },
  { id: 32, category: "Tecnologia", likes: 99, image: "https://ennvoai.com/assets/tpl-21-D9BAJlqn.png" },
  { id: 33, category: "Casa", likes: 140, image: "https://ennvoai.com/assets/tpl-22-DzpGYxby.jpg" },
  { id: 34, category: "Beleza", likes: 133, image: "https://ennvoai.com/assets/tpl-23-B7IK8I4D.jpg" },
  { id: 35, category: "Moda", likes: 198, image: "https://ennvoai.com/assets/tpl-24-CsCpL5lU.jpg" },
  { id: 36, category: "Lifestyle", likes: 156, image: "https://ennvoai.com/assets/tpl-25-CgalmhUl.jpg" },
  { id: 37, category: "UGC", likes: 170, image: "https://ennvoai.com/assets/tpl-26-C5yqO38D.jpg" },
  { id: 38, category: "Fitness", likes: 145, image: "https://ennvoai.com/assets/tpl-27-CTvcRBea.jpg" },
  { id: 39, category: "Beleza", likes: 188, image: "https://ennvoai.com/assets/tpl-28-Defhg6L0.jpg" },
  { id: 40, category: "Moda", likes: 215, image: "https://ennvoai.com/assets/tpl-29-u-etYjc_.jpg" },
  { id: 41, category: "Casa", likes: 134, image: "https://ennvoai.com/assets/tpl-30-DuSxpCTu.jpg" },
  { id: 42, category: "Tecnologia", likes: 167, image: "https://ennvoai.com/assets/tpl-31-BXrdhZhZ.jpg" },
  { id: 43, category: "UGC", likes: 190, image: "https://ennvoai.com/assets/tpl-32-Dcaosd4K.jpg" },
  { id: 45, category: "Moda", likes: 177, image: "https://ennvoai.com/assets/tpl-33-_QtiQzoB.jpg" },
  { id: 46, category: "Lifestyle", likes: 143, image: "https://ennvoai.com/assets/tpl-34-CZ7mlwt4.jpg" },
  { id: 47, category: "Beleza", likes: 199, image: "https://ennvoai.com/assets/tpl-35-BPjBqnbg.jpg" },
  { id: 48, category: "Fitness", likes: 155, image: "https://ennvoai.com/assets/tpl-36-BaibgRyl.jpg" },
  { id: 49, category: "Moda", likes: 210, image: "https://ennvoai.com/assets/tpl-37-C0Rn5yi4.jpg" }
];

export const MovimentosView = () => {
  const [activeCategory, setActiveCategory] = useState("Animações");

  return (
    <div className="flex-1 w-full flex flex-col p-6 md:p-8 overflow-y-auto bg-transparent">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-light text-white mb-2 leading-tight">
            Copie <span className="font-medium bg-gradient-to-r from-purple-400 to-[#8B5CF6] text-transparent bg-clip-text">movimentos naturais</span>
          </h1>
          <p className="text-[#8d8d99] text-sm max-w-2xl">
            Inspire-se em movimentos reais e aplique na sua influenciadora para gerar vídeos ultra-realistas e engajadores.
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
                ? 'bg-[#8B5CF6]/10 border border-[#8B5CF6] text-white shadow-[0_0_15px_rgba(139,92,246,0.2)]'
                : 'bg-white/5 border border-white/5 text-[#8d8d99] hover:text-white hover:bg-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid Retangular */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
        {templates.map((template) => (
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
                MOVIMENTO {template.id}
              </h3>
              <p className="text-white/70 text-[11px] leading-relaxed line-clamp-2">
                Movimento fluido e dinâmico, perfeito para prender a atenção no início do vídeo.
              </p>
              
              <button className="mt-2 flex items-center justify-center gap-2 w-full py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 rounded-xl text-white text-[11px] font-bold uppercase tracking-wider transition-colors shadow-lg">
                <Copy className="w-4 h-4" />
                Copiar Movimento
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
