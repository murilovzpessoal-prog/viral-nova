const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'App.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

const componentsToInject = `
const SidebarItem = ({ id, icon: Icon, label, current, setCurrent }: any) => {
  const isActive = current === id || 
    (id === 'hacks-virais' && current === 'hacks-virais-detalhe') || 
    (id === 'galeria-avatares' && current === 'meus-avatares') ||
    (id === 'galeria-avatares' && current === 'criar-avatar');

  return (
    <button
      onClick={() => setCurrent(id)}
      className={\`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 relative group overflow-hidden \${isActive ? 'bg-white/10 text-white' : 'text-[#8d8d99] hover:bg-white/5 hover:text-white'}\`}
    >
      <Icon className={\`w-5 h-5 \${isActive ? 'text-[#D946EF]' : ''}\`} />
      <span className="text-sm font-medium">{label}</span>
      {isActive && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#D946EF] rounded-r-full shadow-[0_0_10px_#D946EF]"></div>
      )}
    </button>
  );
};

const DashboardHome = ({ setCurrentPage, t }: any) => {
  return (
    <div className="w-full flex flex-col gap-10 lg:mt-4">
      {/* Hero Banner */}
      <div className="w-full bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.5)] group">
        <div className="relative z-10 max-w-xl">
          <h2 className="text-2xl md:text-3xl font-light text-white italic mb-2">Aproveite o máximo da plataforma!</h2>
          <p className="text-sm md:text-base text-[#8d8d99] mb-8 font-light">
            Conteúdos pensados para acelerar seu fluxo de criação com mais controle e precisão.
          </p>
          <button 
            onClick={() => setCurrentPage('creator-academy')}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#2DD4BF] to-[#2DD4BF]/80 rounded-full text-white font-bold text-sm shadow-[0_0_20px_#2DD4BF]/30 hover:shadow-[0_0_30px_#2DD4BF]/50 transition-all hover:scale-105"
          >
            Acessar Academy <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Abstract Floating Glass Elements */}
        <div className="hidden md:block relative z-10 w-[200px] h-[150px] mr-10 perspective-[1000px]">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#D946EF]/20 to-transparent blur-3xl rounded-full"></div>
          <div className="absolute top-0 right-0 w-[120px] h-[90px] bg-white/10 backdrop-blur-xl border border-[#D946EF]/40 rounded-2xl transform rotate-12 rotateX-12 shadow-[0_0_30px_#D946EF]/20 group-hover:rotate-6 transition-transform duration-1000"></div>
          <div className="absolute bottom-0 left-10 w-[140px] h-[100px] bg-white/5 backdrop-blur-md border border-[#2DD4BF]/40 rounded-2xl transform -rotate-6 -rotateY-12 shadow-[0_0_30px_#2DD4BF]/20 group-hover:rotate-0 transition-transform duration-1000"></div>
        </div>
      </div>

      {/* Grid Section */}
      <div>
        <div className="flex items-center gap-2 text-[#D946EF] mb-2">
          <Zap className="w-4 h-4" />
          <span className="text-xs uppercase tracking-widest font-bold">Acesso Rápido</span>
        </div>
        <h3 className="text-xl md:text-2xl text-white font-light mb-6">
          Explore o <span className="font-medium text-[#2DD4BF]">universo Viralpulse</span>
          <span className="block text-sm text-[#8d8d99] font-light mt-1">Cada seção é uma ferramenta diferente do seu fluxo. Escolha por onde começar.</span>
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Large Card Left */}
          <div 
            onClick={() => setCurrentPage('produtos')}
            className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 flex flex-col cursor-pointer group hover:bg-white/10 transition-colors relative overflow-hidden min-h-[400px]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#2DD4BF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            {/* Center Icon Abstract */}
            <div className="flex-1 flex items-center justify-center relative z-10">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <div className="absolute inset-0 bg-[#2DD4BF]/20 blur-3xl rounded-full"></div>
                <div className="grid grid-cols-2 gap-2">
                   <div className="w-12 h-12 bg-white/10 rounded-xl border border-white/10 flex items-center justify-center"><LayoutGrid className="w-5 h-5 text-white/50" /></div>
                   <div className="w-12 h-12 bg-white/10 rounded-xl border border-[#2DD4BF]/30 flex items-center justify-center shadow-[0_0_15px_#2DD4BF]/30"><Zap className="w-5 h-5 text-[#2DD4BF]" /></div>
                   <div className="w-12 h-12 bg-[#2DD4BF]/10 rounded-full border border-[#2DD4BF]/40 flex items-center justify-center"><div className="w-4 h-4 bg-[#2DD4BF] rounded-full blur-[2px]"></div></div>
                   <div className="w-12 h-12 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center"><div className="w-2 h-2 bg-white/30 rounded-full"></div></div>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-auto flex items-end justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center"><LayoutGrid className="w-3 h-3 text-[#8d8d99]" /></div>
                  <span className="text-[10px] text-[#8d8d99] tracking-widest uppercase">Biblioteca</span>
                </div>
                <h4 className="text-xl text-white font-medium mb-2">Inventário</h4>
                <p className="text-sm text-[#8d8d99] mb-4">Organize produtos, referências e ferramentas em um só lugar.</p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 rounded-full border border-white/10 text-[10px] text-[#8d8d99]">Produtos</span>
                  <span className="px-3 py-1 rounded-full border border-white/10 text-[10px] text-[#8d8d99]">Virais</span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-white transition-colors" />
            </div>
          </div>

          {/* Right Column (Stacked Cards) */}
          <div className="flex flex-col gap-6">
            {/* Top Right Card */}
            <div 
              onClick={() => setCurrentPage('criadores')}
              className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 flex-1 flex flex-col cursor-pointer group hover:bg-white/10 transition-colors relative overflow-hidden"
            >
              <div className="flex-1 flex items-center justify-center pb-8 relative z-10">
                 <div className="w-16 h-16 rounded-full bg-[#D946EF]/10 border border-[#D946EF]/30 flex items-center justify-center relative">
                    <div className="absolute right-0 bottom-0 w-3 h-3 bg-[#D946EF] rounded-full shadow-[0_0_10px_#D946EF]"></div>
                    <Users className="w-6 h-6 text-[#D946EF]" />
                 </div>
              </div>
              <div className="relative z-10 flex items-end justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center"><Users className="w-3 h-3 text-[#8d8d99]" /></div>
                    <span className="text-[10px] text-[#8d8d99] tracking-widest uppercase">Explorar</span>
                  </div>
                  <h4 className="text-lg text-white font-medium mb-2">Influencers</h4>
                  <p className="text-xs text-[#8d8d99]">Descubra os criadores que estão dominando as trends.</p>
                </div>
                <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-white transition-colors" />
              </div>
            </div>

            {/* Bottom Right Card */}
            <div 
              onClick={() => setCurrentPage('ugc-criador')}
              className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 flex-1 flex flex-col cursor-pointer group hover:bg-white/10 transition-colors relative overflow-hidden"
            >
              <div className="flex-1 flex items-center justify-center pb-8 relative z-10">
                 <div className="flex items-center justify-center relative">
                    <div className="w-12 h-12 rounded-full bg-white/5 border border-white/20 flex items-center justify-center -mr-4 relative z-10 backdrop-blur-md"></div>
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#2DD4BF] to-[#D946EF] p-[1px] relative z-20 shadow-[0_0_20px_#D946EF]/40">
                      <div className="w-full h-full bg-[#0b0c10] rounded-full flex items-center justify-center">
                        <RefreshCw className="w-5 h-5 text-white" />
                      </div>
                    </div>
                 </div>
              </div>
              <div className="relative z-10 flex items-end justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center"><ImageIcon className="w-3 h-3 text-[#8d8d99]" /></div>
                    <span className="text-[10px] text-[#8d8d99] tracking-widest uppercase">IA Visual</span>
                  </div>
                  <h4 className="text-lg text-white font-medium mb-2">Swap AI</h4>
                  <p className="text-xs text-[#8d8d99]">Troca de rostos e produtos de forma cirúrgica e instantânea.</p>
                </div>
                <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-white transition-colors" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
`;

const targetIndex = content.indexOf('const App: React.FC = () => {');
if (targetIndex !== -1 && !content.includes('const DashboardHome')) {
  content = content.slice(0, targetIndex) + componentsToInject + '\n\n' + content.slice(targetIndex);
}

const oldExploreLine = "{currentPage === 'explorar' && <ExploreView products={exploreTopProducts} onGoToAcademy={() => setCurrentPage('creator-academy')} onGoToProducts={() => setCurrentPage('produtos')} />}";
const newExploreLine = "{currentPage === 'explorar' && <DashboardHome setCurrentPage={setCurrentPage} t={t} />}";

if (content.includes(oldExploreLine)) {
  content = content.replace(oldExploreLine, newExploreLine);
}

fs.writeFileSync(filePath, content, 'utf-8');
console.log('App.tsx Fixed completely!');
