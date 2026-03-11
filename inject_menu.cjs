const fs = require("fs");
let app = fs.readFileSync("App.tsx", "utf8");

// 1. Add "Menu" and "X" to lucide-react imports if not present
if (!app.includes("Menu,")) {
  app = app.replace("} from \"lucide-react\";", "  Menu,\n  X,\n} from \"lucide-react\";");
  app = app.replace("} from 'lucide-react';", "  Menu,\n  X,\n} from 'lucide-react';");
}

// 2. Add state for mobile menu
if (!app.includes("isMobileMenuOpen")) {
  app = app.replace(
    "const App: React.FC = () => {",
    "const App: React.FC = () => {\n  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);"
  );
}

// 3. Inject the hamburger button into the header
const findHeaderLogo = `<div className="flex items-center gap-2 group cursor-pointer mr-auto" onClick={() => setCurrentPage('explorar')}>`;
const replaceHeaderLogo = `
            {/* Mobile Hamburger */}
            <button 
              className="lg:hidden mr-4 p-2 -ml-2 text-white hover:bg-[#1f2026] rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2 group cursor-pointer mr-auto" onClick={() => { setIsMobileMenuOpen(false); setCurrentPage('explorar'); }}>`;
app = app.replace(findHeaderLogo, replaceHeaderLogo);

// 4. Inject the Mobile Menu Overlay right after the LanguageContext Provider opens
const findProvider = `<LanguageContext.Provider value={{ language, setLanguage, t }}>`;
const mobileMenuOverlay = `
        {/* Mobile Sidebar Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[100] lg:hidden">
            <div className="absolute inset-0 bg-[#0b0c10]/80 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
            <div className="absolute left-0 top-0 bottom-0 w-[280px] bg-[#0b0c10] border-r border-[#1e1f26] flex flex-col pt-6 px-6">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setIsMobileMenuOpen(false); setCurrentPage('explorar'); }}>
                  <img src="/logo.png" alt="Viralpulse Logo" className="w-5 h-5 object-contain" />
                  <span className="text-xl font-black text-white">Viralpulse</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-[#8d8d99] hover:text-white rounded-lg hover:bg-[#1f2026]">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex flex-col gap-4">
                {['explorar', 'produtos', 'videos', 'criadores'].map((page) => (
                  <button
                    key={page}
                    onClick={() => { setCurrentPage(page as any); setIsMobileMenuOpen(false); }}
                    className={\`text-left text-base font-semibold py-3 px-4 rounded-xl transition-all \${currentPage === page ? 'text-white bg-[#3B82F6]' : 'text-[#8d8d99] hover:text-white hover:bg-[#1f2026]'}\`}
                  >
                    {t(page)}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        )}
`;

app = app.replace(findProvider, findProvider + mobileMenuOverlay);

fs.writeFileSync("App.tsx", app);
