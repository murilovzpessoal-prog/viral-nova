
import React, { useState, useEffect, createContext, useContext } from 'react';
import { translations, Language, TranslationKey } from './src/translations';
import {
  Search,
  Flame,
  ChevronRight,
  Check,
  Monitor,
  LayoutGrid,
  Sparkles,
  Zap,
  Eye,
  Video,
  ChevronLeft,
  Download,
  Moon,
  ArrowUpRight,
  ExternalLink,
  GraduationCap,
  Package,
  Wand2,
  TrendingUp,
  Play,
  DollarSign,
  ShoppingBag,
  Bookmark,
  Users,
  Crown,
  Instagram,
  Youtube,
  Twitter,
  Linkedin,
  Clock,
  ArrowRight,
  Home,
  Sofa,
  Utensils,
  Laptop,
  Sun,
  Car,
  Plus,
  Smile,
  Mic,
  Camera,
  AlertCircle,
  Info,
  Stars,
  Brain,
  CheckCircle2,
  Copy,
  Heart,
  Layout,
  MousePointer2,
  X,
  User,
  Type,
  Lock,
  LogOut,
  Settings,
  VolumeX,
  Pause,
  FileText,
  Mail,
  Rocket,
  Link,
  Menu
} from 'lucide-react';

// Language Context
const LanguageContext = createContext<{
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}>({
  language: 'pt',
  setLanguage: () => { },
  t: (key) => key,
});

const useTranslation = () => useContext(LanguageContext);

// Types
interface ProductViral {
  id: string;
  rank: number;
  image: string;
  title: string;
  category: string;
  highDemand?: boolean;
  revenue: string;
  sales: string;
  priceRange: string;
  videoUrl?: string;
  productUrl?: string;
}

interface ProductExplore {
  id: string;
  rank: number;
  image: string;
  title: string;
  revenue: string;
  priceRange: string;
  productUrl?: string;
}

interface VideoViral {
  id: string;
  rank: number;
  thumbnail: string;
  sales6h: string;
  revenue6h: string;
  productTitle: string;
  productImage: string;
  tiktokId?: string;
  videoUrl?: string;
  creatorName?: string;
  directVideoUrl?: string;
  profileUrl?: string;
}

interface CreatorViral {
  id: string;
  rank: number;
  username: string;
  shopName: string;
  category: string;
  revenue: string;
  avatar: string;
  profileUrl: string;
}

interface AvatarItem {
  id: string;
  name: string;
  role: string;
  image: string;
  hoverImage?: string;
  description?: string;
}

interface HackItem {
  id: string;
  title: string;
  image: string;
  icon: string;
  bannerColor: string;
  description: string;
  hasVeoBadge?: boolean;
  isHighlighted?: boolean;
  exampleVideos?: string[];
  examplePrompts?: string[];
  tiktokUrl?: string;
}

interface PromptItem {
  id: string;
  title: string;
  description: string;
  gif: string;
  prompt: string;
}

// --- CONFIGURAÇÕES VIEW ---
interface ConfiguracoesViewProps {
  profileImage: string | null;
  onImageUpload: (imageUrl: string) => void;
}

const ConfiguracoesView: React.FC<ConfiguracoesViewProps> = ({ profileImage, onImageUpload }) => {
  const { t } = useTranslation();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageUpload(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <main className="max-w-[800px] mx-auto px-6 py-10 md:py-16 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex flex-col items-center mb-12">
        <div
          onClick={() => fileInputRef.current?.click()}
          className="w-24 h-24 bg-[#3B82F6] rounded-full flex items-center justify-center text-[#7f5af0]xl font-black text-white shadow-2xl mb-6 relative group cursor-pointer overflow-hidden border-4 border-[#1a1a1e]"
        >
          {profileImage ? (
            <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            "N"
          )}
          <div className="absolute inset-0 bg-[#0b0c10]/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Camera className="w-8 h-8 text-white" />
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />
        </div>
        <h1 className="text-2xl md:text-4xl font-black text-white tracking-tighter mb-2">{t('configuracoes')}</h1>
        <p className="text-[#8d8d99] text-base font-medium opacity-80">{t('gerencieInformacoes')}</p>
      </div>

      {/* Cards Section */}
      <div className="w-full flex flex-col gap-6">
        {/* Personal Info Card */}
        <div className="bg-[#14151a] border border-[#1e1f26] rounded-[32px] p-5 md:p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-8">
            <User className="w-5 h-5 text-[#8d8d99]" />
            <h2 className="text-lg font-black text-white tracking-tight">{t('informacoesPessoais')}</h2>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2.5">
              <label className="text-[11px] font-black text-[#8d8d99] uppercase tracking-widest">{t('nome')}</label>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <input
                    type="text"
                    defaultValue="nicklousstefanianrj6"
                    className="w-full bg-[#14151a] border border-[#1e1f26] rounded-2xl py-4 px-6 text-sm text-white focus:outline-none focus:border-[#3B82F6]/40 transition-colors"
                  />
                </div>
                <button className="px-6 py-4 bg-[#3B82F6]/10 border border-[#3B82F6]/20 text-[#3B82F6] rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-[#3B82F6]/20 transition-all">
                  {t('editar')}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <label className="text-[11px] font-black text-[#8d8d99] uppercase tracking-widest">{t('email')}</label>
              <div className="relative">
                <input
                  type="email"
                  defaultValue="nicklousstefanianrj6@gmail.com"
                  readOnly
                  className="w-full bg-[#14151a] border border-[#1e1f26] rounded-2xl py-4 px-6 text-sm text-[#5b5b7b] cursor-not-allowed"
                />
              </div>
              <p className="text-[10px] font-medium text-[#5b5b7b] tracking-tight">{t('emailNaoAlterado')}</p>
            </div>
          </div>
        </div>

        {/* Security Card */}
        <div className="bg-[#14151a] border border-[#1e1f26] rounded-[32px] p-5 md:p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-8">
            <Lock className="w-5 h-5 text-[#8d8d99]" />
            <h2 className="text-lg font-black text-white tracking-tight">{t('seguranca')}</h2>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2.5">
              <label className="text-[11px] font-black text-[#8d8d99] uppercase tracking-widest">{t('novaSenha')}</label>
              <input
                type="password"
                placeholder={t('placeholderSenha')}
                className="w-full bg-[#14151a] border border-[#1e1f26] rounded-2xl py-4 px-6 text-sm text-white placeholder:text-[#44444f] focus:outline-none focus:border-[#3B82F6]/40 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2.5">
              <label className="text-[11px] font-black text-[#8d8d99] uppercase tracking-widest">{t('confirmarSenha')}</label>
              <input
                type="password"
                placeholder={t('placeholderConfirmar')}
                className="w-full bg-[#14151a] border border-[#1e1f26] rounded-2xl py-4 px-6 text-sm text-white placeholder:text-[#44444f] focus:outline-none focus:border-[#3B82F6]/40 transition-colors"
              />
            </div>

            <button className="w-full bg-[#3B82F6] hover:bg-[#4338ca] text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-lg shadow-[#3B82F6]/20 active:scale-[0.98]">
              {t('atualizarSenha')}
            </button>
          </div>
        </div>

        {/* Logout Button */}
        <button className="w-full bg-[#16161A] border border-[#2C2D38] text-[#3B82F6] py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:bg-[#3B82F6]/5 flex items-center justify-center gap-3">
          <LogOut className="w-5 h-5" />
          {t('sair')}
        </button>
      </div>

      <div className="h-24"></div>
    </main>
  );
};

const App: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [currentPage, setCurrentPage] = useState<'explorar' | 'produtos' | 'videos' | 'criadores' | 'ugc-criador' | 'galeria-avatares' | 'galeria-prompts' | 'meus-avatares' | 'criar-avatar' | 'previsibilidade-receita' | 'hacks-virais' | 'hacks-virais-detalhe' | 'creator-academy' | 'passos-iniciais' | 'como-se-afiliar' | 'regras-e-restricoes' | 'como-criar-avatar-ia' | 'como-criar-videos-ugc' | 'configuracoes'>('explorar');
  const [selectedHackId, setSelectedHackId] = useState<string | null>(null);
  const [userProfileImage, setUserProfileImage] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>('pt');
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const t = (key: TranslationKey) => translations[language][key] || key;

  const viralProducts: ProductViral[] = [
    { id: 'p1', rank: 1, image: 'https://i.imgur.com/eDa6uiJ.jpeg', title: 'Copo Térmico Inox 1.2L', category: 'Casa & Cozinha', revenue: 'R$ 6.014.334,12', sales: '80.129', priceRange: 'R$ 49,99 - R$ 99,99', videoUrl: 'https://player.vimeo.com/video/1163502593', productUrl: 'https://www.tiktok.com/view/product/1731371603647497700?_svg=1&checksum=75c2d3deb6afe8e4f4c104e8be82135e8ea17f55ff61f149e05da81abf0aa8bb&encode_params=MIIBUQQM2QbYCJWuf0IyhpV3BIIBLQkfzGymx7uGAo38fjnJMWijj_2QCfJgk4ZAqCLaCSACvHMm__M1haOKR5jiJSF-OBqz0h4w9K1CPwItT4ceRq9anhD8fg7YgtXaWTTkZv5j1c64_Be2pqMjlm4FF0G2oG6c0eOCtUcgW6_AjydHi6FuYt1UF99GoS1XtYszZjY3A6i_8d7GtDBxJ_CYjHJMeydSC2f_7oNP5VPhi5yn-evQ4-7Ib8iC2r5BwVcsAlrnFoXA1NGrMFdPPnB2eM0X8Re3gDcCaE9_DWwAp3an2tn8SHpLGihFRCLcjl0a0Ko__ygmF5aR1nw0HDofNUzwdJR9Hh6ehRm6ym_6-MNHZD1olTup3vXoqkAligdGRc3Hwn8Si9OjwvtDhREKFtoEG3NELRg-Jw3hLXkpkawEEOPnIJNHaItWeWA1ruiDYCo%3D&og_info=%7B%22title%22%3A%22Copo+T%C3%A9rmico+Inox+Port%C3%A1til+1200ml%5C%2F1.2L+Garrafa+T%C3%A9rmica+Inoxid%C3%A1vel+com+Tampa+e+Canudo%22%2C%22image%22%3A%22https%3A%5C%2F%5C%2Fp16-oec-sg.ibyteimg.com%5C%2Ftos-alisg-i-aphluv4xwc-sg%5C%2Fe062e139eab84e96bd04eb88497f026a~tplv-aphluv4xwc-resize-webp%3A260%3A260.webp%3Fdr%3D15582%26t%3D555f072d%26ps%3D933b5bde%26shp%3D7745054a%26shcp%3D9b759fb9%26idc%3Dmy%26from%3D2001012042%22%7D&sec_user_id=MS4wLjABAAAAGPJ9HjGz6Iuay6qmfIsuPNuurOsZ-IcMREG54wV7FpCyZpLNFGNNgtpxlaqhiZJP&share_app_id=1233&share_link_id=C810C467-7EF4-40E5-B646-5958A95765C4&share_region=BR&social_share_type=15&timestamp=1770366654&trackParams=%7B%22enable_shop_tab_popup%22%3A1%2C%22device_id%22%3A%227506972083776636422%22%2C%22enter_from_info%22%3A%22product_share_outside%22%2C%22source_page_type%22%3A%22product_share%22%2C%22traffic_source_list%22%3A%5B%5D%7D&tt_from=copy&u_code=E6FIJC%3AL28K12M&ug_btm=b6880%2Cb6661&unique_id=joaovellini_&user_id=7203069836077974534&utm_campaign=client_share&utm_medium=ios&utm_source=copy' },
    { id: 'p2', rank: 2, image: 'https://i.imgur.com/xnQ3DH6.jpeg', title: 'Depilador Facial Sem Fio', category: 'Beleza', revenue: 'R$ 2.456.638,25', sales: '49.123', priceRange: 'R$ 39,90 - R$ 60,00', productUrl: 'https://www.tiktok.com/view/product/1731719322323224250?_svg=1&checksum=668849b05fc733209627499c9ec47c654d61c2a482df0ba7c3cb34bb6724ec44&encode_params=MIIBUQQMvET23bxNm2QjqibJBIIBLdtst_z7alI5XROmsELle8bp1DysYH7E4HS1XpJlZK0Oihp-Q-N2_L7zCZAKO_rADddA1c49Z07Lkkhia9Mnlqu8FuXDUVa3xSaxZ3PQfadWGx5uBKN-96gKu_psQNc0sgCmXhHwZ37QyS8wCJE1TvuFXuUI7KQfth-A5jMyT64VIMyxdb156ngEFhWafr4bsRM3A_Bx6FP0C2zc_P5yD1yfvs6NUZ_12I7GUVYQCZ8ko43AAbscoTaBP7As7_SOPeTjD4FL7Sk3JWv494FFfiHTW_FpQDYZciZuTX4RU-LZ7Eo2sGBT-z7-TBr5YpCv6E2CoQcm5nLmiCPwgH8_HH6z5-FbV5P8UH3bP92_dHLTtrXrcaWYiidzybfDBEAN7RjT0mi7s8ihTLXw5csEEBTReM8tbM2bvEkGkFhXo3s%3D&og_info=%7B%22title%22%3A%22Depilador+Removedor+De+Pelos++Facial+e+Corporal+Sem+fio+Recarreg%C3%A1vel%22%2C%22image%22%3A%22https%3A%5C%2F%5C%2Fp16-oec-va.ibyteimg.com%5C%2Ftos-maliva-i-o3syd03w52-us%5C%2Fb253310de5dc4d458dd1585a6639806e~tplv-o3syd03w52-resize-webp%3A260%3A260.webp%3Fdr%3D15582%26t%3D555f072d%26ps%3D933b5bde%26shp%3D7745054a%26shcp%3D9b759fb9%26idc%3Dmy%26from%3D2001012042%22%7D&sec_user_id=MS4wLjABAAAAGPJ9HjGz6Iuay6qmfIsuPNuurOsZ-IcMREG54wV7FpCyZpLNFGNNgtpxlaqhiZJP&share_app_id=1233&share_link_id=EB6C1551-8585-4679-9019-F81779B03419&share_region=BR&social_share_type=15&timestamp=1770366504&trackParams=%7B%22enable_shop_tab_popup%22%3A1%2C%22device_id%22%3A%227506972083776636422%22%2C%22enter_from_info%22%3A%22product_share_outside%22%2C%22source_page_type%22%3A%22product_share%22%2C%22traffic_source_list%22%3A%5B%5D%7D&tt_from=copy&u_code=E6FIJC%3AL28K12M&ug_btm=b6880%2Cb6661&unique_id=joaovellini_&user_id=7203069836077974534&utm_campaign=client_share&utm_medium=ios&utm_source=copy' },
    { id: 'p3', rank: 3, image: 'https://i.imgur.com/O9hmYqT.png', title: 'Máquina de Cortar Kemei', category: 'Eletrônicos', revenue: 'R$ 957.445,15', sales: '19.145', priceRange: 'R$ 39,99 - R$ 60,00', productUrl: 'https://www.tiktok.com/view/product/1731253116026651705?_svg=1&checksum=0842656a147b55044ea8e80e5a9c1555fee38b612d7c6856336016624660e78e&encode_params=MIIBUQQMcfl08MXU5PWWDpHTBIIBLZKaZnasNqVEYBLWe2AwbGWsO0y5M6YauiTlemvhGTpCTV7BSTMp-SWlPAEVMnzkJ3n305LCMa-x5Sf-JLCy_vGo9Uf3Ay2MDL6BouwXYPRzE-hRFPm21-zeWmSWtGcDrNaWy1xkjGo9-C5lXyBf1iMKn8qdU3jTyTM5pAGD6r2GbLXwuqUvqVjmmPH_ClfdiO9OB1l2e4fbiv1xG_3dJabLqKt8b7N44-aA9gQDtK-2-t-SwhHBXDOUkujQ3CdGw4Y-dvEysKUut3fsOtAQc4QNCZOyrF1k4hbgMuYCL8iYdiuPHXBJPYeAeEkVCQOfTvMxZB1nFp2yTWtmrpCFChd1zkaBdsq85StY0HJChpJZovXsRNdO_nlHpw53i39E9ONsSOirVZH8cL0WGFoEEDReDIHNm_k5qq0FVnI502g%3D&og_info=%7B%22title%22%3A%22M%C3%A1quina+Cortar+Kemei+Acabamento+Profissional+Sem+Fio+KM-032+bivolt+110~220V%22%2C%22image%22%3A%22https%3A%5C%2F%5C%2Fp16-oec-va.ibyteimg.com%5C%2Ftos-maliva-i-o3syd03w52-us%5C%2F7f39952cbc1642379c64861493571a29~tplv-o3syd03w52-resize-webp%3A260%3A260.webp%3Fdr%3D15582%26t%3D555f072d%26ps%3D933b5bde%26shp%3D7745054a%26shcp%3D9b759fb9%26idc%3Dmy%26from%3D2001012042%22%7D&sec_user_id=MS4wLjABAAAAGPJ9HjGz6Iuay6qmfIsuPNuurOsZ-IcMREG54wV7FpCyZpLNFGNNgtpxlaqhiZJP&share_app_id=1233&share_link_id=81F1B1BE-AC3B-42A0-A935-AAD2C38C96C7&share_region=BR&social_share_type=15&timestamp=1770365318&trackParams=%7B%22enable_shop_tab_popup%22%3A1%2C%22device_id%22%3A%227506972083776636422%22%2C%22enter_from_info%22%3A%22product_share_outside%22%2C%22source_page_type%22%3A%22product_share%22%2C%22traffic_source_list%22%3A%5B%5D%7D&tt_from=copy&u_code=E6FIJC%3AL28K12M&ug_btm=b6880%2Cb6661&unique_id=joaovellini_&user_id=7203069836077974534&utm_campaign=client_share&utm_medium=ios&utm_source=copy' },
    { id: 'p4', rank: 4, image: 'https://i.imgur.com/cx5mdyh.png', title: 'Bermuda Compressão 2em1', category: 'Moda Masculina', revenue: 'R$ 658.964,28', sales: '11.964', priceRange: 'R$ 39,79 - R$ 70,00', productUrl: 'https://www.tiktok.com/view/product/1733848226137146523?_svg=1&checksum=6ed07697dde2f091392d842b1b5de93efe80ac1b0129ee1399c45a3240700de4&encode_params=MIIBUQQMIz88xBiGVDUW26BjBIIBLTjZRtUdhxoBXYoCjpuE31UUkKEg0WDgNcOiOaBBzfsLnnFAN4rOVP5vuybB-iXZWD6lBg7uIXmcvgeRuA5HDzXwDtLXpHtpeoCsfZMww108orbfMNrLYnu4gfXg9EGZb0KwmotnKPEGjQfvDfuAmROrmy9MujYZ-zndOXn-rIz2ZJ5IqcC2vVykzEEAZvqOMEosCO5ik5Z5iETOfGdTHSsgQldX9BFbrmKUjoqI8loRP6sPwlls6lJYMDcXzD4XBnOQyu3eiK7YLw6R2wvCICYB8XJSXBm1RljUKBtyCv5qC8m9zRU0w6BD2Lj_iAepW79IXsQcH4Ur_GGcMpseFZFZQt2n30lZfjyRoLwPGG3xNgMvurUOR_zkl3tKiFHgmA0sqC_A5MjTx9PWaB0EEG_dLMWwPo6oxMRdk7kBvtY%3D&og_info=%7B%22title%22%3A%22Bermuda+Short+Compressao+2+em+1+dry+fit+-+Modelo+Monster%22%2C%22image%22%3A%22https%3A%5C%2F%5C%2Fp16-oec-sg.ibyteimg.com%5C%2Ftos-alisg-i-aphluv4xwc-sg%5C%2Fe313769b47804081ab2d89617a915d45~tplv-aphluv4xwc-resize-webp%3A260%3A260.webp%3Fdr%3D15582%26t%3D555f072d%26ps%3D933b5bde%26shp%3D7745054a%26shcp%3D9b759fb9%26idc%3Dmy%26from%3D2001012042%22%7D&sec_user_id=MS4wLjABAAAAGPJ9HjGz6Iuay6qmfIsuPNuurOsZ-IcMREG54wV7FpCyZpLNFGNNgtpxlaqhiZJP&share_app_id=1233&share_link_id=793F7A64-AB7B-4BD6-B11F-ADE3EDD9F117&share_region=BR&social_share_type=15&timestamp=1770365720&trackParams=%7B%22enable_shop_tab_popup%22%3A1%2C%22device_id%22%3A%227506972083776636422%22%2C%22enter_from_info%22%3A%22product_share_outside%22%2C%22source_page_type%22%3A%22product_share%22%2C%22traffic_source_list%22%3A%5B%5D%7D&tt_from=copy&u_code=E6FIJC%3AL28K12M&ug_btm=b6880%2Cb6661&unique_id=joaovellini_&user_id=7203069836077974534&utm_campaign=client_share&utm_medium=ios&utm_source=copy' },
    { id: 'p5', rank: 5, image: 'https://i.imgur.com/uXXMxIb.png', title: 'Conjunto Fitness Canelado 3D', category: 'Moda Fitness', highDemand: true, revenue: 'R$ 8.752.443,52', sales: '125.143', priceRange: 'R$ 48,00 - R$ 97,00', productUrl: 'https://www.tiktok.com/view/product/1732308645212751548?_svg=1&checksum=a482387a20338ba4eed37c5090142fbbef79c8d71299aa38f2127523329d4645&encode_params=MIIBUQQMz9u2LBjaH-Z5D4hjBIIBLfpRAtqX1av3apP9NB1mwxBABXmY5zRWE-HbvH6j9BkE7jrQBfXVmyBZYr3qzMO_qbGS5aFjYc-jtdZmM0cKlj43uaaqk-WnDZR9hFEURJP3suNCesFSOKowQZldj0__265NpGKgo6G_lJutvsdoNS4kWxnJQZBOcHI0orkRIWHbyFd_18G1ivLWPzgKpNN6PwigiYtwjQuwFfz89fX7_yWQS6qwqkjZWvTX-RpSVsWbYS996948fn4q7LqbFEjQ-AV0qBCP2lWJLzumRIwmMZBzA7lxiR8xvJlYxGzMo9j_e5L9kp8aOaRvaxn-Y5FzYZovyY2hHySGP34OP_VqPqaeBasNWjbA_IhIsBQUu5ZZLtW15TXnvzWuTV25KCyMPoBLCrxJ0HnjdIAYcjQEEDoiP3l7uWuc5uE-qbY9ous%3D&og_info=%7B%22title%22%3A%22Conjunto+fitness+canelado+feminino+academia+top+e+legging+esportivo+com+brilho%22%2C%22image%22%3A%22https%3A%5C%2F%5C%2Fp16-oec-sg.ibyteimg.com%5C%2Ftos-alisg-i-aphluv4xwc-sg%5C%2F37e089211a4e4086970482e442eedf36~tplv-aphluv4xwc-resize-webp%3A260%3A260.webp%3Fdr%3D15582%26t%3D555f072d%26ps%3D933b5bde%26shp%3D7745054a%26shcp%3D9b759fb9%26idc%3Dmy%26from%3D2001012042%22%7D&sec_user_id=MS4wLjABAAAAGPJ9HjGz6Iuay6qmfIsuPNuurOsZ-IcMREG54wV7FpCyZpLNFGNNgtpxlaqhiZJP&share_app_id=1233&share_link_id=05843795-3E0E-43B0-B9EA-BC8ED0DFB210&share_region=BR&social_share_type=15&timestamp=1769928728&trackParams=%7B%22enable_shop_tab_popup%22%3A1%2C%22device_id%22%3A%227506972083776636422%22%2C%22enter_from_info%22%3A%22product_share_outside%22%2C%22source_page_type%22%3A%22product_share%22%7D&tt_from=copy&u_code=E6FIJC%3AL28K12M&ug_btm=b0%2Cb6661&unique_id=joaovellini_&user_id=7203069836077974534&utm_campaign=client_share&utm_medium=ios&utm_source=copy' },
    { id: 'p6', rank: 6, image: 'https://i.imgur.com/vQceZIK.jpeg', title: 'Perfume Attracione Men', category: 'Perfumaria', revenue: 'R$ 3.125.712,54', sales: '11.412', priceRange: 'R$ 79,00 - R$ 179,00', productUrl: 'https://www.tiktok.com/view/product/1732014306510406875?_svg=1&checksum=44b2e0017ff7561db56a12bff3e6b44cbfc13b160c9e7a0ad551bb4988628094&encode_params=MIIBUQQMUjT6Kb0nj8Gs-lUXBIIBLVbd90lqfRhkjeTCh5-UdmWfMTO4kW_4ZjGzr_82_lOkC1QyzCek6dFJJN0G1s9MTbARs1zCevrCw_apmywYzZt2YprY83W4xmZ8jJfpy_i_7J5O-CptckIQO6QwX6E-rG1p9q_b7Q-0c5qiTP6Hyj28he7VA29O30gL-pQv3wB4QAZRmYeBKdsoabxhnVr1HqX_XnZJAyyLG9fgaXsRMXJtM-cBa1DvlrR-8y7sHlmq5LFPPLjIwlTSNuFNmq1TWvSEze-bShCExpttRHoxpm_VW47OnyjuTv6HdzowrYeGwbgy5luROIrKQtiBRvMtdEbxIa1DI909crYvBfBKVbRUIhS0zIP2G8oE2u3FLPjdxBVH-Df03pbLbJbTYQIDNzI_9EqdUW3WDwN8nR8EEGgdI-DAbIbbyD86aAtgu9w%3D&og_info=%7B%22title%22%3A%22Perfume+Attracione+Men%22%2C%22image%22%3A%22https%3A%5C%2F%5C%2Fp16-oec-sg.ibyteimg.com%5C%2Ftos-alisg-i-aphluv4xwc-sg%5C%2F35762374d44d43a38adabb71c3bf97f8~tplv-aphluv4xwc-resize-webp%3A260%3A260.webp%3Fdr%3D15582%26t%3D555f072d%26ps%3D933b5bde%26shp%3D7745054a%26shcp%3D9b759fb9%26idc%3Dmy%26from%3D2001012042%22%7D&sec_user_id=MS4wLjABAAAAGPJ9HjGz6Iuay6qmfIsuPNuurOsZ-IcMREG54wV7FpCyZpLNFGNNgtpxlaqhiZJP&share_app_id=1233&share_link_id=29F2029C-634E-4473-BF9D-3F2213835904&share_region=BR&social_share_type=15&timestamp=1770366634&trackParams=%7B%22enable_shop_tab_popup%22%3A1%2C%22device_id%22%3A%227506972083776636422%22%2C%22enter_from_info%22%3A%22product_share_outside%22%2C%22source_page_type%22%3A%22product_share%22%2C%22traffic_source_list%22%3A%5B%5D%7D&tt_from=copy&u_code=E6FIJC%3AL28K12M&ug_btm=b6880%2Cb6661&unique_id=joaovellini_&user_id=7203069836077974534&utm_campaign=client_share&utm_medium=ios&utm_source=copy' },
    { id: 'p7', rank: 7, image: 'https://i.imgur.com/9cNgCYt.png', title: 'Bolsa Feminina Couro Transversal', category: 'Acessórios', revenue: 'R$ 957.445,15', sales: '19.145', priceRange: 'R$ 42,60 - R$ 160,00', productUrl: 'https://www.tiktok.com/view/product/1733575637953513124?_svg=1&checksum=4cc83e293ba61e0c5492cd72e54092e74c22798bab45e2e6dfbe49a819e567cb&encode_params=MIIBUQQMZTrxD3u3pxYs5Yo-BIIBLZ-NdRLDuiJEtuLWj947Lg5Bcb5DP4BTzQJireUQbUOp3HYeCW5gXWcC9bRoIf_PLBFa1iqzH9V6iPWNxDzRBoSIHyZTfqFl1gvDTjzSo0j_KtiHDcuDpxrNnuwHjoTab9yzQzloY_Qypx8NRPBIs7HVTZYWy_lHImMFng2TEu-qnSm__1bx0kLrd1telGOmBuDNNjPUbC0oDwA7-wfY5T2cILdfp9tJtZRK98Ok5yf-O7TYgwJwpfWOWVWNkiWslTTkJYMJnI_CeBuLimebK1kpAm_1-w4O8fyCU4ttVnTZM_B56sEMPWo-Erxm71txY6MbDRetT8Brkx-YuyV4EGIpqq8XwZZM4eFQREb7_nazI0QqNoX4U8P0mly-tfD3259yJlYWBSO_yKeGxVgEEOcm8eiOcRvOcl839PcgTu4%3D&og_info=%7B%22title%22%3A%22Bolsa+Feminina+Com+Al%C3%A7a+Lateral+Transversal+De+Ombro+De+Couro+PU+T304+AF%22%2C%22image%22%3A%22https%3A%5C%2F%5C%2Fp16-oec-va.ibyteimg.com%5C%2Ftos-maliva-i-o3syd03w52-us%5C%2F26afd3c2d5b647ca86ff0528cbd2fb2a~tplv-o3syd03w52-resize-webp%3A260%3A260.webp%3Fdr%3D15582%26t%3D555f072d%26ps%3D933b5bde%26shp%3D7745054a%26shcp%3D9b759fb9%26idc%3Dmy%26from%3D2001012042%22%7D&sec_user_id=MS4wLjABAAAAGPJ9HjGz6Iuay6qmfIsuPNuurOsZ-IcMREG54wV7FpCyZpLNFGNNgtpxlaqhiZJP&share_app_id=1233&share_link_id=90ADDB6E-B00C-45B1-8E8C-965E441ED0D5&share_region=BR&social_share_type=15&timestamp=1770366471&trackParams=%7B%22enable_shop_tab_popup%22%3A1%2C%22device_id%22%3A%227506972083776636422%22%2C%22enter_from_info%22%3A%22product_share_outside%22%2C%22source_page_type%22%3A%22product_share%22%2C%22traffic_source_list%22%3A%5B%5D%7D&tt_from=copy&u_code=E6FIJC%3AL28K12M&ug_btm=b6880%2Cb6661&unique_id=joaovellini_&user_id=7203069836077974534&utm_campaign=client_share&utm_medium=ios&utm_source=copy' },
    { id: 'p8', rank: 8, image: 'https://i.imgur.com/7mwfTvl.png', title: 'Camiseta Cristã Oversized', category: 'Moda Masculina', revenue: 'R$ 1.152.814,92', sales: '28.814', priceRange: 'R$ 29,90 - R$ 49,90', productUrl: 'https://www.tiktok.com/view/product/1732862152900838509?_svg=1&checksum=f18f39c5d4366ade4eb7b730f4f66e7f6f0a4e1edfb52b9fb9f38daca4f49fed&encode_params=MIIBUQQMu7YsitOjXNrCguyJBIIBLa7icz5c6xlDtOFP1e-3WG7Z7_D5WCNj7c960aKl2eO2ZqJQ70kLxtYmBJoIkgGkrt2LIFIB4Gj89NEThWWUj1VbWieXydbUHHcEDNtIvhxItpyUUUj9Ub8GYFkRP2HjniNgiucIhUFvHuie8fgf6Tf5M0J9LYNOiQr5uoByvk2_wSWHy7Y4xdRMA-srqVIB4XLPvMX11_-0NU7SNWKu1bwzCKoVilVwt1IVmFjcdoiXc8NQO2Z_pqJ_PYFE_bonw4Sb-ebjYYYAARZfvVmOi3nlqqq21TxBu5kBXEHDHAGgqqxl1Us4bKMZKAR7sh-unCHYmClgmCCtlN796fVk01LnWN2v-tryOFlVbUue8T1-NtKmFHD7EXJk4aY_I22zKDebAYNtR9mhbzbYCnoEED-eL2WqrUvpf1O0mfNjYBY%3D&og_info=%7B%22title%22%3A%22Camiseta+Crist%C3%A3+Oversized+Masculina+Camisa+Le%C3%A3o+Promo%C3%A7%C3%A3o%22%2C%22image%22%3A%22https%3A%5C%2F%5C%2Fp16-oec-va.ibyteimg.com%5C%2Ftos-maliva-i-o3syd03w52-us%5C%2Fb98a9c9b40ed410ebb9c23342569d87e~tplv-o3syd03w52-resize-webp%3A260%3A260.webp%3Fdr%3D15582%26t%3D555f072d%26ps%3D933b5bde%26shp%3D7745054a%26shcp%3D9b759fb9%26idc%3Dmy%26from%3D2001012042%22%7D&sec_user_id=MS4wLjABAAAAGPJ9HjGz6Iuay6qmfIsuPNuurOsZ-IcMREG54wV7FpCyZpLNFGNNgtpxlaqhiZJP&share_app_id=1233&share_link_id=72A0F242-33EC-4DDF-85A5-E2D1B4133B64&share_region=BR&social_share_type=15&timestamp=1770366402&trackParams=%7B%22enable_shop_tab_popup%22%3A1%2C%22device_id%22%3A%227506972083776636422%22%2C%22enter_from_info%22%3A%22product_share_outside%22%2C%22source_page_type%22%3A%22product_share%22%2C%22traffic_source_list%22%3A%5B%5D%7D&tt_from=copy&u_code=E6FIJC%3AL28K12M&ug_btm=b6880%2Cb6661&unique_id=joaovellini_&user_id=7203069836077974534&utm_campaign=client_share&utm_medium=ios&utm_source=copy' },
    { id: 'p9', rank: 9, image: 'https://i.imgur.com/CuGB2DW.png', title: 'Kit Body Splash Masculino', category: 'Perfumaria', revenue: 'R$ 1.567.332,84', sales: '14.932', priceRange: 'R$ 69,00 - R$ 140,00', productUrl: 'https://www.tiktok.com/view/product/1732403584554075381?_svg=1&checksum=53db01fa350929a22e518e6da6c2b39db230056ca89d3394e355231c86a0b2f3&encode_params=MIIBUQQMwJsE1M-5KaGJO7l7BIIBLQ8EMz8Rq0aPRi1ajmwY1x2rTfJZubmGuMu0NrUfmVj-aqf8QwVA41xyCB7Al0aPu0aFidIVWl3MacQE_zZ1Dvzck4x0lpSBpJb1IyQbVECokEjYgzF0Vk3HLFUDyyl85hX2VGl49JoS3c842JVo-8ySge2BoSekPKHs3DBw2FYO4Ry23MhCD0HPeeeNRJrXbWvGd04f4V9ZUEDeaDCQ6HbtXKwsyqCcMdYxyBPUBaDyrnohltoiYl3ljkhrSjXY-BiGnWSllfiwhjDnRgeWo_1_EJufBXa3n0WzSeYE8HtcRbrTs69mL71VRfY_xdgUeP_NuNhrujiZb3LKIdHdm047SP1OQzb9l9RTX8Gs4JTF_JlLOT5ieeMc1CcsC8SRhpTl-tmgj0_vlYqB_aMEEJqii85F0BpJzEByQLOJFT8%3D&og_info=%7B%22title%22%3A%22Kit+Body+Splash+Masculino+Barbarius+e+Midtown+200ml+by+Primacial%22%2C%22image%22%3A%22https%3A%5C%2F%5C%2Fp16-oec-sg.ibyteimg.com%5C%2Ftos-alisg-i-aphluv4xwc-sg%5C%2F5cfa18650ca54440bc6d2134652b7f27~tplv-aphluv4xwc-resize-webp%3A260%3A260.webp%3Fdr%3D15582%26t%3D555f072d%26ps%3D933b5bde%26shp%3D7745054a%26shcp%3D9b759fb9%26idc%3Dmy%26from%3D2001012042%22%7D&sec_user_id=MS4wLjABAAAAGPJ9HjGz6Iuay6qmfIsuPNuurOsZ-IcMREG54wV7FpCyZpLNFGNNgtpxlaqhiZJP&share_app_id=1233&share_link_id=0B93B05C-AD4B-4FD7-898F-C1D0BA5534EC&share_region=BR&social_share_type=15&timestamp=1770366294&trackParams=%7B%22enable_shop_tab_popup%22%3A1%2C%22device_id%22%3A%227506972083776636422%22%2C%22enter_from_info%22%3A%22product_share_outside%22%2C%22source_page_type%22%3A%22product_share%22%2C%22traffic_source_list%22%3A%5B%5D%7D&tt_from=copy&u_code=E6FIJC%3AL28K12M&ug_btm=b6880%2Cb6661&unique_id=joaovellini_&user_id=7203069836077974534&utm_campaign=client_share&utm_medium=ios&utm_source=copy' },
    { id: 'p10', rank: 10, image: 'https://i.imgur.com/9p2m7Yc.png', title: 'Garrafa Hilee Frutas', category: 'Casa & Cozinha', revenue: 'R$ 1.255.712,54', sales: '11.412', priceRange: 'R$ 69,00 - R$ 150,00', productUrl: 'https://www.tiktok.com/view/product/1731525047179970090?_svg=1&checksum=af30fcc4077791f68a1fcce62995a5efba5fd1aba9e9f21aa19665e986d2207b&encode_params=MIIBUQQMmlTj6Fv9yFKggnJsBIIBLYEXZiRK80Kn30iUZrJ7q4jI9IfbtYHxvh_jJf5r6zV2bf6As17TO6PAOKj9ytOytTzTb5OUyrtm8PK8c0iPWurSS5d7DdS55CVUYriuAl6hNgfD-ZD__HQ1Z78I21E_NoFucoAqyr2eUhKHBTzyktEZ5urkKvpNjIyHtIYkrw0FrNlNrLqmGqN_GcGLcvDnO2_XgBNRAVVQzJL9WOjxgPh7zStYFYNVExVWKCPpMP4DhEhN1BREJQIxAMP9OvM-ooFy0Ag8Wd_1_inFKL2aHc09KOA8UQe35FTxUn018y95qFM8tiWjMkoPfCnfQe8UMKZ0FheBwBukq77iDhgwhO-Mlzm1XF4abyNP0BCwDCShcH5xlFH4ZrP1LaayP30OR2EropQFePqi_fakevkEEK5GwSvxuvFxKidtZ4fsMj0%3D&og_info=%7B%22title%22%3A%22Hilee+Vers%C3%A3o+Frutas+%E2%80%93+Garrafa+T%C3%A9rmica+com+A%C3%A7o+Inoxid%C3%A1vel+de+Grau+Cir%C3%BArgico+%C2%B7+Brinde%3A+Base+de+Silicone+++Al%C3%A7a+Tran%C3%A7ada+%C2%B7+Estampa+Frutal+Fofa+e+Port%C3%A1til%22%2C%22image%22%3A%22https%3A%5C%2F%5C%2Fp16-oec-sg.ibyteimg.com%5C%2Ftos-alisg-i-aphluv4xwc-sg%5C%2F6251aec5bb874812b0af6a251d2d5b26~tplv-aphluv4xwc-resize-webp%3A260%3A260.webp%3Fdr%3D15582%26t%3D555f072d%26ps%3D933b5bde%26shp%3D7745054a%26shcp%3D9b759fb9%26idc%3Dmy%26from%3D2001012042%22%7D&sec_user_id=MS4wLjABAAAAGPJ9HjGz6Iuay6qmfIsuPNuurOsZ-IcMREG54wV7FpCyZpLNFGNNgtpxlaqhiZJP&share_app_id=1233&share_link_id=47AEF946-A313-44C1-995A-4D09834C17C7&share_region=BR&social_share_type=15&timestamp=1770365696&trackParams=%7B%22enable_shop_tab_popup%22%3A1%2C%22device_id%22%3A%227506972083776636422%22%2C%22enter_from_info%22%3A%22product_share_outside%22%2C%22source_page_type%22%3A%22product_share%22%2C%22traffic_source_list%22%3A%5B%5D%7D&tt_from=copy&u_code=E6FIJC%3AL28K12M&ug_btm=b6880%2Cb6661&unique_id=joaovellini_&user_id=7203069836077974534&utm_campaign=client_share&utm_medium=ios&utm_source=copy' },
    { id: 'p11', rank: 11, image: 'https://i.imgur.com/abvTKk4.jpeg', title: 'Body Splash My Sweet Delight', category: 'Beleza & Perfumaria', highDemand: true, revenue: 'R$ 4.973.527,34', sales: '110.527', priceRange: 'R$ 37,90 - R$ 56,90', productUrl: 'https://www.tiktok.com/view/product/1731980387027027364?_svg=1&checksum=a9c5de98a73994d33005227123b9b20fe8f9b3ce55bf1f02bbae0985ab3af405&encode_params=MIIBUQQMOOHA-kxTFlTxEp7wBIIBLWFtCamgbyrcmKVWIFWt9gzRHwE2HrDcUTxCqA6j65KUQOu4MGcr-W07Y3t8sH0-H9M7XnZhj4839SJgcQLo4BkzOq7MLeBsa5a5I5szRF6dpG9xJ46FrdMReaVZ6vkfEqRXVVgcmElpqGfTZepQBIRssa7x98cvN86Iq0Do04Sl5T6is33ACBP8nU-x7Qqz28H5TTAtxh947oPnpgSkDc5GAnLE6sXk6mnvVHiD7wCJ8Jcsz6dtgXExVfUdlIrPd7qRuw2gNtRroZnUmsxAErKkZBGPtFWdH4XCEqxa_KgOEpsRl0gFjXgrv8dAyl5Cyzdpza177UZ2-tFB6k_VfBgROsi5IoltgXY-fRG9bLIYddQvXHLgxjOBuZvJo90A827qNPS4GlVNHmXR_4AEEPNOOyh3BkOfWKiG5S3cLec%3D&og_info=%7B%22title%22%3A%22Kit+Perfume+Capilar+e+Body+Splash+My+Sweet+Delight+Barbour%27s+Beauty%22%2C%22image%22%3A%22https%3A%5C%2F%5C%2Fp16-oec-sg.ibyteimg.com%5C%2Ftos-alisg-i-aphluv4xwc-sg%5C%2F718b74c5ba7c425a8cc72e4ff2cce73b~tplv-aphluv4xwc-resize-webp%3A260%3A260.webp%3Fdr%3D15582%26t%3D555f072d%26ps%3D933b5bde%26shp%3D7745054a%26shcp%3D9b759fb9%26idc%3Dmy%26from%3D2001012042%22%7D&sec_user_id=MS4wLjABAAAAGPJ9HjGz6Iuay6qmfIsuPNuurOsZ-IcMREG54wV7FpCyZpLNFGNNgtpxlaqhiZJP&share_app_id=1233&share_link_id=4662E700-A913-4BE7-9955-A1588B48A446&share_region=BR&social_share_type=15&timestamp=1770069912&trackParams=%7B%22enable_shop_tab_popup%22%3A1%2C%22device_id%22%3A%227506972083776636422%22%2C%22enter_from_info%22%3A%22product_share_outside%22%2C%22source_page_type%22%3A%22product_share%22%7D&tt_from=copy&u_code=E6FIJC%3AL28K12M&ug_btm=b0%2Cb6661&unique_id=joaovellini_&user_id=7203069836077974534&utm_campaign=client_share&utm_medium=ios&utm_source=copy' },
    { id: 'p12', rank: 12, image: 'https://i.imgur.com/YiQXmBJ.jpeg', title: '365 Dias Amor com Deus', category: 'Livros', revenue: 'R$ 2.152.342,10', sales: '65.215', priceRange: 'R$ 25,90 - R$ 39,90', productUrl: 'https://www.tiktok.com/view/product/1732162437981636069?_svg=1&checksum=567705e88160d779881297dd947a81f8b98e059697272542909833078d5f220f&encode_params=MIIBUQQM5msiz6KiFuTbAcXkBIIBLQUWuYU4ggWLiRJDl1e5x7kxiPDg576eq9YYP_ec6jeXawka8PWur3x_nRlEX__i2GZ42zS6HYRAqe9RH6cjCdxGgAgDLQQVef0b3qszSDdkxugk5Ox01y1LofhDQ0u-_0ulNbxI8JaFe7UF8mAEGZ_m8_rcQtZ7fDRm7BgWIEtgaoaRnShjzsTQGOwZHs4Dt_hZAcepydP1ZQE65ys56K7Dp-EMFoGfSfGXlVFdLXVFxcRUDYAV-5A_xUNLBPomV3EOJd9LPQIaYwYKDlubEth5zQULGWyDPsLIHPM5iefyDFTlpDjSYPKFdqn2uT9SU2daWDoH2Sgc6Ma5L1Xfo3yblp1IddpZi1Xvo9p_Vl3mxE6b7p7v4_9I-kOfnVRmBs0CDELi7F5gsLy3lS0EEKSLGDeufV2NtUFVZ_hcaYw%3D&og_info=%7B%22title%22%3A%22365+Dias+Amor+com+Deus+-+Devocional%22%2C%22image%22%3A%22https%3A%5C%2F%5C%2Fp16-oec-sg.ibyteimg.com%5C%2Ftos-alisg-i-aphluv4xwc-sg%5C%2Fd81e85d400ea455d8b4fc4a2728a4306~tplv-aphluv4xwc-resize-webp%3A260%3A260.webp%3Fdr%3D15582%26t%3D555f072d%26ps%3D933b5bde%26shp%3D7745054a%26shcp%3D9b759fb9%26idc%3Dmy%26from%3D2001012042%22%7D&sec_user_id=MS4wLjABAAAAGPJ9HjGz6Iuay6qmfIsuPNuurOsZ-IcMREG54wV7FpCyZpLNFGNNgtpxlaqhiZJP&share_app_id=1233&share_link_id=33149E51-E61B-47B4-B554-18197CF36093&share_region=BR&social_share_type=15&timestamp=1770366614&trackParams=%7B%22enable_shop_tab_popup%22%3A1%2C%22device_id%22%3A%227506972083776636422%22%2C%22enter_from_info%22%3A%22product_share_outside%22%2C%22source_page_type%22%3A%22product_share%22%2C%22traffic_source_list%22%3A%5B%5D%7D&tt_from=copy&u_code=E6FIJC%3AL28K12M&ug_btm=b6880%2Cb6661&unique_id=joaovellini_&user_id=7203069836077974534&utm_campaign=client_share&utm_medium=ios&utm_source=copy' },
    { id: 'p13', rank: 13, image: 'https://i.imgur.com/9aYt8Mi.jpeg', title: 'Regata Fitness Alça Fina', category: 'Moda Fitness', revenue: 'R$ 1.327.536,68', sales: '24.136', priceRange: 'R$ 39,90 - R$ 69,90', productUrl: 'https://www.tiktok.com/view/product/1732402997107786776?_svg=1&checksum=d543759aa6a383493ef2f702c9d341003d9e23814738e82800bbe077304dabd7&encode_params=MIIBUQQMxsX0vJE1894euCx3BIIBLaUZWPug_Rtsv5GsEe6M2NvbuJPhaxj5umqMJogPJCJuNftvF0iWjsT5yA2VJFlyRB5g6ihMOha_ASUNcsptk7GufTN5X7cilNGweFPnBtd_kz9cmTNuPJOXgk-cOSmLy7yuLcvGyii3JlwI3oGlmv9MTlxG6O_wgBmKrbIBtzf3p_Wt84g6ag8n-IUqj6s53pN5qvjjYWPWICzXByAbDaU475giAV1os-6GZ1OtNtZPJeH1EcsIH5M5lihelC6eErOIBUxgchuCQZlgePLY9cmLSitRrw2lIfGXQV3DD91g5EjzsgIoBM0_cw1jq2ycrTi_M58ikrpepwgctwwb_puVDv07NXJBjAeogiXAhzcsl7DDIrGAkTIvkNEhx88W1J-n7nD1V03fg62Jz8gEEFLe3kaTWvpkApXqrxRZDf4%3D&og_info=%7B%22title%22%3A%22Regata+Al%C3%A7a+Fina+Fitness+Blusa+Feminino+Liso+Poliamida+Tank+Top+Slim+Camiseta+Academia+Ver%C3%A3o%22%2C%22image%22%3A%22https%3A%5C%2F%5C%2Fp16-oec-sg.ibyteimg.com%5C%2Ftos-alisg-i-aphluv4xwc-sg%5C%2F968950d11b8f4566a203a7d34a672654~tplv-aphluv4xwc-resize-webp%3A260%3A260.webp%3Fdr%3D15582%26t%3D555f072d%26ps%3D933b5bde%26shp%3D7745054a%26shcp%3D9b759fb9%26idc%3Dmy%26from%3D2001012042%22%7D&sec_user_id=MS4wLjABAAAAGPJ9HjGz6Iuay6qmfIsuPNuurOsZ-IcMREG54wV7FpCyZpLNFGNNgtpxlaqhiZJP&share_app_id=1233&share_link_id=F83477A9-AC9D-432C-BD51-25B06F3F1AB2&share_region=BR&social_share_type=15&timestamp=1770366380&trackParams=%7B%22enable_shop_tab_popup%22%3A1%2C%22device_id%22%3A%227506972083776636422%22%2C%22enter_from_info%22%3A%22product_share_outside%22%2C%22source_page_type%22%3A%22product_share%22%2C%22traffic_source_list%22%3A%5B%5D%7D&tt_from=copy&u_code=E6FIJC%3AL28K12M&ug_btm=b6880%2Cb6661&unique_id=joaovellini_&user_id=7203069836077974534&utm_campaign=client_share&utm_medium=ios&utm_source=copy' },
    { id: 'p14', rank: 14, image: 'https://i.imgur.com/LsdzL8M.png', title: 'Mochila CHL Reforçada', category: 'Acessórios', revenue: 'R$ 840.125,56', sales: '13.125', priceRange: 'R$ 39,88 - R$ 89,00', productUrl: 'https://www.tiktok.com/view/product/1731798889002141102?_svg=1&checksum=f03b46e99aa4c5c0efa780695c750e5d8d79319d928bcc269d3704e8419aa2e4&encode_params=MIIBUQQMGKlqN1Y1fJgFi6xLBIIBLWvwzcIIQyglk9fLFzxPKzP37YNXl1HlHOnXn-KVDMiZ1xXC0X11pfkiw3oMcONchiOrijZq2-FHp4bZ5ZN7d9wMIZK_Qqdw3agHB1xG7vk3rgBJxNaJs6RAbD_NYg1ex_ZbG6wU4-Gj3DeeC7WZb_TJ_9SZF2qwx8qBM3LTHKsMjbnrdfN9PphTxQwgi0TAsFWvoatjguC7q1aleOLL4PYhIzSdPugDQ3HowOtjoPofwyl1EsLwZ-uEklkWyUF6w9B6Q-95XVBLFkc4Mw6ym1OW-zMWQ330EmMhZgJaG8OeeUDDdgdIVova3voUNfDApCvlRmWvkn_RnjA4_SbfaPJYekmUOI9QVDGCoe4XnYHSuGu0VwdrEvsexMD5dVHwbO8oOUOXBkBf5rfJxu4EEO8j6E3DJyNoJZOY6hF-X84%3D&og_info=%7B%22title%22%3A%22Mochila+Unissex+De+Grande+Capacidade+De+Nylon+Para+Viagens+E+Neg%C3%B3cios+Com+Al%C3%A7as+Ajust%C3%A1veis+Com%22%2C%22image%22%3A%22https%3A%5C%2F%5C%2Fp16-oec-va.ibyteimg.com%5C%2Ftos-maliva-i-o3syd03w52-us%5C%2F10410dea0628462ba231e2b655eb4eaf~tplv-o3syd03w52-resize-webp%3A260%3A260.webp%3Fdr%3D15582%26t%3D555f072d%26ps%3D933b5bde%26shp%3D7745054a%26shcp%3D9b759fb9%26idc%3Dmy%26from%3D2001012042%22%7D&sec_user_id=MS4wLjABAAAAyzxcmiWaw9fVU7RBiDZu4_0PVccBm6V-bwm5S4FOlStpCR7kw2Lt-MMLa1UgxaEw&share_app_id=1233&share_link_id=35C801D3-5F30-4575-A13F-0CE6EAADA575&share_region=BR&social_share_type=15&timestamp=1772150108&trackParams=%7B%22source_page_type%22%3A%22product_share%22%2C%22traffic_source%22%3A7%2C%22enter_from_info%22%3A%22product_share_outside%22%2C%22device_id%22%3A%227532604552420836920%22%2C%22enable_shop_tab_popup%22%3A1%2C%22traffic_source_list%22%3A%5B2%2C7%5D%7D&tt_from=copy&u_code=EFCI%3A4H483IJ4I&ug_btm=b1478%2Cb6661&unique_id=murilovzh&user_id=7397426211184952326&utm_campaign=client_share&utm_medium=ios&utm_source=copy' },
    { id: 'p15', rank: 15, image: 'https://i.imgur.com/91dJ7Xs.jpeg', title: 'Chinelo Slide Nuvem Confort', category: 'Calçados', highDemand: true, revenue: 'R$ 5.724.863,85', sales: '95.418', priceRange: 'R$ 29,99 - R$ 99,99', productUrl: 'https://www.tiktok.com/view/product/1734261789877372669?_svg=1&checksum=782f06b151ccfec8f9f200209e9a78123f28879ad4f943d4aada5addccd94a76&encode_params=MIIBUQQMqMWscggKYZLXadgABIIBLZovPpQKWt9KOIP2LSyf8b2iFMY6BroHwo3n3u9JMKsA7KrqnNd0nmcKe012FbFem7iYPq5KLdtB2t7u9KwfEiJZyxg3uDRdq5RJAEBQz_X4s6b7hO-zUKpCltuLowGL0TvF5xlatIXqDqWbZcRtClb2biCuDjCDc06LRHibmyKqfeQ_e5EIGhfV3ZgqWIEjmRKNPxuPo5-Ud7lEYcBGNCQY163gu6qoIuu_lxS58asgqFjV2eR_QdCt02pQeNajrgOAsHt3p9_ewOU509N3O_GBJkMRF_aSJvVBn1zZuxaUZHMrY3U--LiSe8GD2JL4V1dDokgERjaWnQZ0OMgcEmsNf6F3gjChKHxLV1lrxD1A2HN0hhEHMHl0gXtPCV6KkOmBf_euVUGS-3DpwQcEEJCGseP_AvM-cpKxqGsd88M%3D&og_info=%7B%22title%22%3A%22Chinelo+Slide+Unissex+Casual+Para+Uso+Di%C3%A1rio%22%2C%22image%22%3A%22https%3A%5C%2F%5C%2Fp16-oec-va.ibyteimg.com%5C%2Ftos-maliva-i-o3syd03w52-us%5C%2F9a4070e224bd4714942a9e5442d1a9e8~tplv-o3syd03w52-resize-webp%3A260%3A260.webp%3Fdr%3D15582%26t%3D555f072d%26ps%3D933b5bde%26shp%3D7745054a%26shcp%3D9b759fb9%26idc%3Dmy%26from%3D2001012042%22%7D&sec_user_id=MS4wLjABAAAAGPJ9HjGz6Iuay6qmfIsuPNuurOsZ-IcMREG54wV7FpCyZpLNFGNNgtpxlaqhiZJP&share_app_id=1233&share_link_id=74CCB9BD-343F-4637-AF44-6E10F308BC5E&share_region=BR&social_share_type=15&timestamp=1770366698&trackParams=%7B%22enable_shop_tab_popup%22%3A1%2C%22device_id%22%3A%227506972083776636422%22%2C%22enter_from_info%22%3A%22product_share_outside%22%2C%22source_page_type%22%3A%22product_share%22%2C%22traffic_source_list%22%3A%5B%5D%7D&tt_from=copy&u_code=E6FIJC%3AL28K12M&ug_btm=b6880%2Cb6661&unique_id=joaovellini_&user_id=7203069836077974534&utm_campaign=client_share&utm_medium=ios&utm_source=copy' },
    { id: 'p16', rank: 16, image: 'https://i.imgur.com/SUa5AZ3.jpeg', title: 'Kit Panelas Premium 18 Peças', category: 'Casa & Cozinha', revenue: 'R$ 15.652.443,87', sales: '34.542', priceRange: 'R$ 409,90 - R$ 499,90', productUrl: 'https://www.tiktok.com/view/product/1733345274823345651?_svg=1&checksum=8e411db164bd56a2a4a73fb1691e8c2f163d9324f5f073162242289efb1dc5cf&encode_params=MIIBUQQMIVmAaRTp-9bk8C9RBIIBLY8Jp68znSogmLM4PtubW_wxEIJjY-Zxhdt7Ryd5xCKzdRwV01KGVBg00ApqH7yI6zUfGDwqgOXAUFsmAbkHmZr6Pu_phv95q2_tR0CvkHUNm5vJ9rcfeF4uRRCSu4-SCbZWoFL-Xo6Z6Vk0V3Xy6Bh9h7H0TPcbjhjUtMS-SbI1uWPXfYtlshOOSZdSBWoOtz07Rcds3F2AzXlV6t7EY-1nPNmCmbfRmEhzAfoPufl4wde54Wh0G9O6qEO420_tglotDjExgHWx31nH8aA-hCQG6C7gCj7I9cD13dxq0s70UeJD_CU_1n73fsK6XiOHyF-yNqg1PP9ap9Cxu7vpxM-yZmImWQVcU3oB5ieip1nTplReDasbiK1nj_pDhJWax_1O4p9jP79x0G2S_5YEECJcTNXMUxbafOvJ2EfYfho%3D&og_info=%7B%22title%22%3A%22Kit+Conjunto+de+Panelas+Premium+18+Pe%C3%A7as+A%C3%A7o+Inoxid%C3%A1vel+e+Cer%C3%A2mica+Antiaderente+com+Temporizador+de+Temperatura%22%2C%22image%22%3A%22https%3A%5C%2F%5C%2Fp16-oec-sg.ibyteimg.com%5C%2Ftos-alisg-i-aphluv4xwc-sg%5C%2F418e49ede5be4e70a0dc45f448144b81~tplv-aphluv4xwc-resize-webp%3A260%3A260.webp%3Fdr%3D15582%26t%3D555f072d%26ps%3D933b5bde%26shp%3D7745054a%26shcp%3D9b759fb9%26idc%3Dmy%26from%3D2001012042%22%7D&sec_user_id=MS4wLjABAAAAGPJ9HjGz6Iuay6qmfIsuPNuurOsZ-IcMREG54wV7FpCyZpLNFGNNgtpxlaqhiZJP&share_app_id=1233&share_link_id=B66E441A-9616-4588-A2EF-CD17D36E08C6&share_region=BR&social_share_type=15&timestamp=1770366589&trackParams=%7B%22enable_shop_tab_popup%22%3A1%2C%22device_id%22%3A%227506972083776636422%22%2C%22enter_from_info%22%3A%22product_share_outside%22%2C%22source_page_type%22%3A%22product_share%22%2C%22traffic_source_list%22%3A%5B%5D%7D&tt_from=copy&u_code=E6FIJC%3AL28K12M&ug_btm=b6880%2Cb6661&unique_id=joaovellini_&user_id=7203069836077974534&utm_campaign=client_share&utm_medium=ios&utm_source=copy' },
    { id: 'p17', rank: 17, image: 'https://i.imgur.com/4MEt6WH.jpeg', title: 'Parafusadeira Furadeira 48v', category: 'Ferramentas', revenue: 'R$ 6.451.128,24', sales: '16.128', priceRange: 'R$ 260,99 - R$ 544,00', productUrl: 'https://www.tiktok.com/view/product/1733093661342074653?_svg=1&checksum=6852d6ef55eca09f8b136a146ed2c4b85d290d2163b2d9d6bed9cf3c818f7690&encode_params=MIIBUQQM7DrymndbQjI0Zt8YBIIBLXnc4OCrCJysRVcD-bVTP5UK5yV-rMctx-nohpvBLAqW13-8WDLB-xU4ppOtMDDtK-MkKy756A6euOtJVjDyU-Iv3N54gdCf51QUQ5d-YbEgd04YMN4Z9546Yb04lRyxTDpat467DU-MCIbTUzzBVv3VLiTLlyjLw4tMHoH1nFtSsdokxlGTxIHF9692a5qCewKyP0qnCxd7VKlwvfzemiJxJIbXdEkNeRsbvo8ySQubBdMm1TFmea9pw-MStQUw5326iuX1ITQky3Nh1Y8L3QlsUDWh_ElrznQJyqgUoULR0NUdGoJs6Gu8uOxG8O4x0dcQ0Mu43IK6eXEfuKrOKzT3Oe400W56wcM1Tv--JCrTcWIS89M0HHLKoX6mYgXpik0okJ2C_M76K0PLYPwEECfunb8nCLgCOtF6BlgHhEo%3D&og_info=%7B%22title%22%3A%22RHOVISTAR+Chave+de+Impacto+48V+Sem+Fio+%7C+Parafusadeira+e+Furadeira+3+em+1+%7C+2+Baterias+%7C+Alta+Pot%C3%AAncia%22%2C%22image%22%3A%22https%3A%5C%2F%5C%2Fp16-oec-sg.ibyteimg.com%5C%2Ftos-alisg-i-aphluv4xwc-sg%5C%2F4b08ada1b3044db0a5b772d57a4a4de1~tplv-aphluv4xwc-resize-webp%3A260%3A260.webp%3Fdr%3D15582%26t%3D555f072d%26ps%3D933b5bde%26shp%3D7745054a%26shcp%3D9b759fb9%26idc%3Dmy%26from%3D2001012042%22%7D&sec_user_id=MS4wLjABAAAAGPJ9HjGz6Iuay6qmfIsuPNuurOsZ-IcMREG54wV7FpCyZpLNFGNNgtpxlaqhiZJP&share_app_id=1233&share_link_id=903E3B6A-6D88-4FDE-8D74-1F3B2F039232&share_region=BR&social_share_type=15&timestamp=1770366342&trackParams=%7B%22enable_shop_tab_popup%22%3A1%2C%22device_id%22%3A%227506972083776636422%22%2C%22enter_from_info%22%3A%22product_share_outside%22%2C%22source_page_type%22%3A%22product_share%22%2C%22traffic_source_list%22%3A%5B%5D%7D&tt_from=copy&u_code=E6FIJC%3AL28K12M&ug_btm=b6880%2Cb6661&unique_id=joaovellini_&user_id=7203069836077974534&utm_campaign=client_share&utm_medium=ios&utm_source=copy' },
    { id: 'p18', rank: 18, image: 'https://i.imgur.com/qVrhfOT.png', title: 'Bike Spinning Profissional', category: 'Esportes', revenue: 'R$ 8.320.658,07', sales: '12.058', priceRange: 'R$ 579,90 - R$ 799,90', productUrl: 'https://www.tiktok.com/view/product/1733313036964038131?_svg=1&checksum=2376ffae13005c4edb5b9f239ad18ae8780eb9b72bfa262f7db6b9d7de56b472&encode_params=MIIBUQQMEO65pMRXADYONacWBIIBLZtBnhAbF_1b1rSQB5pU-ObgDOBn4Oe0cENiDz2n9moWHo13vASJFC4656ciIHD7t3YM__i4Gwx9-LaShpLURqXg39tEah8yXyECT8sV9SRR0vJyM4JcPxUVsk7H1yyx-ir7nRlS9mS4BALsSVcP_2sKsWIaNrJ2nx6SspP9nXiaZG2RHvMcXjwgBLVvrhqEh-mNrLSnxNbBzQ_SDsaD-xxC_sAGVN1igHnOFBbhe9_xPgLY6iiCj3y3ypjp18Nfe_Z4dIiTGJ0PZf7hOnMzm5bo8y4APELshzsZzX-jxd6XTgXLQEe0L83worwW3DEtdMJQi9aNKuAHaht4uFSm9Xl_MRHtDLlJMynuwocDPISly5s_-9_TiwRWcuCrGvKOIV_83XOqEMKaJKtvbYcEEK7Eq3lTaZntKlJYLHyX9u4%3D&og_info=%7B%22title%22%3A%22Bicicleta+Spinning+Ergom%C3%A9trica+Academia+Fitness+Profissional+120kg%22%2C%22image%22%3A%22https%3A%5C%2F%5C%2Fp16-oec-sg.ibyteimg.com%5C%2Ftos-alisg-i-aphluv4xwc-sg%5C%2Fa67e1a38c09040bdac8d3c85aa58d09a~tplv-aphluv4xwc-resize-webp%3A260%3A260.webp%3Fdr%3D15582%26t%3D555f072d%26ps%3D933b5bde%26shp%3D7745054a%26shcp%3D9b759fb9%26idc%3Dmy%26from%3D2001012042%22%7D&sec_user_id=MS4wLjABAAAAGPJ9HjGz6Iuay6qmfIsuPNuurOsZ-IcMREG54wV7FpCyZpLNFGNNgtpxlaqhiZJP&share_app_id=1233&share_link_id=42F5F79B-5F38-490D-97B2-A8FFCC015D62&share_region=BR&social_share_type=15&timestamp=1770365746&trackParams=%7B%22enable_shop_tab_popup%22%3A1%2C%22device_id%22%3A%227506972083776636422%22%2C%22enter_from_info%22%3A%22product_share_outside%22%2C%22source_page_type%22%3A%22product_share%22%2C%22traffic_source_list%22%3A%5B%5D%7D&tt_from=copy&u_code=E6FIJC%3AL28K12M&ug_btm=b6880%2Cb6661&unique_id=joaovellini_&user_id=7203069836077974534&utm_campaign=client_share&utm_medium=ios&utm_source=copy' },
    { id: 'p19', rank: 19, image: 'https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/52ca8aa981d04e488dbabecfd37fc2fc~tplv-o3syd03w52-resize-webp:260:260.webp?dr=15582&t=555f072d&ps=933b5bde&shp=7745054a&shcp=9b759fb9&idc=my&from=2001012042', title: 'Boné Aba Curva Premium', category: 'Acessórios', revenue: 'R$ 452.125,56', sales: '9.125', priceRange: 'R$ 19,90 - R$ 39,90', productUrl: 'https://www.tiktok.com/view/product/1731400304624699153?_svg=1&checksum=e5dac3ab79ad43c6160c9e173db40dab62a295647eaca4561b49b367d5d22541&encode_params=MIIBUQQM_wbyvoG2HhIyvNAPBIIBLTzTYSxLXtFvQX0V042hJxZSb_LfllnfN9FcPOYOfAfzg2bV0-AzwbCibhSTg19_fhth5CYmtK3z6nqO7Dynw1Wcln4VYeT5DeKpiMru76Bu11OQPV7d0YnEeku2d8XC4PKhM8HMCoh0piQr7gcw--cko-vH_VG7_t_9ePGWTr_NORZ5cvNuIYPOcMdNImRsP0kGYG59MAdA41VQeuzF-BdfHgaf2MfUsmaPjEzjVUddgQojgqDBO1pY8-cJ4IZ5mD4iczdbnWnvfaSf8di90AfvgGsZAzSlpwbyB4zBuoJVxnjybsw1368QNVV0Ul6vMxAGElfSIS-sgu3k-VL3In6wrUPqC_3u7S4FttvXNc60sHUdP9czBxz3vrmXeCL-aPErhezDYw3HBduujZsEECOs90JvBvn5Ldg1srIMBZA%3D&og_info=%7B%22title%22%3A%22Bon%C3%A9+Aba+Curva+Premium+Strapback+Dad+Hat+Preto%22%2C%22image%22%3A%22https%3A%5C%2F%5C%2Fp16-oec-va.ibyteimg.com%5C%2Ftos-maliva-i-o3syd03w52-us%5C%2F52ca8aa981d04e488dbabecfd37fc2fc~tplv-o3syd03w52-resize-webp%3A260%3A260.webp%3Fdr%3D15582%26t%3D555f072d%26ps%3D933b5bde%26shp%3D7745054a%26shcp%3D9b759fb9%26idc%3Dmy%26from%3D2001012042%22%7D&sec_user_id=MS4wLjABAAAAGPJ9HjGz6Iuay6qmfIsuPNuurOsZ-IcMREG54wV7FpCyZpLNFGNNgtpxlaqhiZJP&share_app_id=1233&share_link_id=2D6B9E5B-817C-482D-81C7-8C895EE94667&share_region=BR&social_share_type=15&timestamp=1771789979&trackParams=%7B%22enable_shop_tab_popup%22%3A1%2C%22device_id%22%3A%227506972083776636422%22%2C%22enter_from_info%22%3A%22product_share_outside%22%2C%22source_page_type%22%3A%22product_share%22%7D&tt_from=copy&u_code=E6FIJC%3AL28K12M&ug_btm=b0%2Cb6661&unique_id=joaovellini_&user_id=7203069836077974534&utm_campaign=client_share&utm_medium=ios&utm_source=copy' },
    { id: 'p20', rank: 20, image: 'https://p16-oec-sg.ibyteimg.com/tos-alisg-i-aphluv4xwc-sg/6c6546e50cbf4f71ac94c2fba0cdc99f~tplv-aphluv4xwc-resize-webp:260:260.webp?dr=15582&t=555f072d&ps=933b5bde&shp=7745054a&shcp=9b759fb9&idc=my&from=2001012042', title: 'Óculos de Sol Vintage Leopardo', category: 'Acessórios', revenue: 'R$ 320.658,07', sales: '7.058', priceRange: 'R$ 29,90 - R$ 59,90', productUrl: 'https://www.tiktok.com/view/product/1733393453229770285?_svg=1&checksum=7b3ae9e9ebb9b1f53e74651ff1c3a0c4cecc5b9b393a5b9cbe41dddd8565ff9d&encode_params=MIIBUQQMc_XM96LrTXNQGESmBIIBLYCQbOUNazOnuvLfV_3dxLCaDB9xelhZQakNFw_QvxgkvQEHEoLW3-z4rBTLbb6rfYic2sj_lCZNSkiYhsed00uk1Tpxj3oRZzi2AuLK92vQCqvd1xkkOynkjtb4Ofl9Y-_eOJoaw6hg3uu0niBeW95ILsqb80Dsp-2AB34uP3itGalYzCI8gzz90jIoWURBgSqF8E9KZ4YYzASE0JCNfJO0rg3WS1BIvIfGICETzI8WrFPqiHVyf6HeINeb8hGm67H2vuGfj3JeM--ETU4zDgOEqoG96XSnh8QGZVpLvztFMQwETEjePd2vwgpBk1YPhD8-n-g84_Ejbrev9RPSBjoRv3HLMItD4-GpRPupD49hYqT_6hH8ppCCDzVONsReor3ohKHmm1PJKuJRL0EEEDDe8xpd_ssBZaiXfKm78GI%3D&og_info=%7B%22title%22%3A%22%C3%93culos+de+Sol+Vintage+Estampa+Leopardo+Luxo+Aro+Oval+Feminino+Moda+Europeia+Retr%C3%B4+Alta+Qualidade+Com+Estampa+de+Tartaruga%2C+Arma%C3%A7%C3%A3o+Oval%2C+Bloqueio+de+Luz+para+Moda+glasses+uv400++%C3%93culos+de+sol+bloqueira+oculos%22%2C%22image%22%3A%22https%3A%5C%2F%5C%2Fp16-oec-sg.ibyteimg.com%5C%2Ftos-alisg-i-aphluv4xwc-sg%5C%2F6251aec5bb874812b0af6a251d2d5b26~tplv-aphluv4xwc-resize-webp%3A260%3A260.webp%3Fdr%3D15582%26t%3D555f072d%26ps%3D933b5bde%26shp%3D7745054a%26shcp%3D9b759fb9%26idc%3Dmy%26from%3D2001012042%22%7D&sec_user_id=MS4wLjABAAAAGPJ9HjGz6Iuay6qmfIsuPNuurOsZ-IcMREG54wV7FpCyZpLNFGNNgtpxlaqhiZJP&share_app_id=1233&share_link_id=719DFF9A-76C4-491E-A4F4-808DBB3B6F1F&share_region=BR&social_share_type=15&timestamp=1771790000&trackParams=%7B%22enable_shop_tab_popup%22%3A1%2C%22device_id%22%3A%227506972083776636422%22%2C%22enter_from_info%22%3A%22product_share_outside%22%2C%22source_page_type%22%3A%22product_share%22%7D&tt_from=copy&u_code=E6FIJC%3AL28K12M&ug_btm=b0%2Cb6661&unique_id=joaovellini_&user_id=7203069836077974534&utm_campaign=client_share&utm_medium=ios&utm_source=copy' },
    { id: 'p21', rank: 21, image: 'https://p16-oec-sg.ibyteimg.com/tos-alisg-i-aphluv4xwc-sg/0db01e4a05f748ef9597fba39efd71dc~tplv-aphluv4xwc-resize-webp:260:260.webp?dr=15582&t=555f072d&ps=933b5bde&shp=7745054a&shcp=9b759fb9&idc=my&from=2001012042', title: 'Escova Dental Elétrica Sônica', category: 'Saúde & Beleza', revenue: 'R$ 1.245.678,90', sales: '25.432', priceRange: 'R$ 49,90 - R$ 89,90', productUrl: 'https://www.tiktok.com/view/product/1731264825620924204?_svg=1&chain_key=%7B%22cck%22%3A%22YSuXj5YUYiwhb+kq59YNotvLo2aWAFWxwtCfbggeCvMBco3NECeGobeq5v+Gdj3j0oqjFMheCyVeK4UjKeCo3i5AkH3AUB+MjFRFGw%3D%3D%22%2C%22mck%22%3A%22jxJLOTvT%2F2Ws4YKTwEAORIEXNeDUSe5QrjwYqStkvzACk3XulYi6citYZDhvAKWpPicvWVoKJa4L+oDS3ElZu4C3hNRi3iY6+gJmYg%3D%3D%22%2C%22v%22%3A1%7D&checksum=c4002dc2f12e70145fbd17209ee7d7538453c93a394ccf43801db7539054b6df&encode_params=MIIBUQQMlPR4B2kRpv6Ql2JzBIIBLV07Wz5Nei4w7lAcuriIKHXlLQC7BSO0cWUkTiqDhZ7-f1-WkoH0NqpNYRKc5S2oRuKb79SvZSBf5ko10B8WVKGBEYpf6NhoUDLQ5Eh8OG4T5dpfwhNitUZW4CMTCBXHuPnpm0N95zK-kJ4S1rq4NrF2byF2PN8DcJbgCOEbNweDMgMo35Jz6w8bwEudwgwdkm2sm9YWnRYuaubBvXazcnTZ-AssvC5Nxbhjt9-CJLKrdRAILmtTepm_GddgGaLY6FJH1s7P7B83yBNwTVE75QFZr5yNfPnWTjQqG7IiowjeX-rVtGYB6GPJ2jtJ5Byl7ngiR2BuPvGsM1Dfj0IxLQlSdOZfOiV-W-HdqWPb_NqmT_KqCWPn0oL1e_XDuFzviKAPKhLxK2tUCfWwxYYEEHtCnzPhkwR8t-G9oVn_RyE%3D&og_info=%7B%22title%22%3A%22Escova+Dental+El%C3%A9trica+USB+Carga+6+Engrenagem+%C3%80+Prova+D%27%C3%A1gua%22%2C%22image%22%3A%22https%3A%5C%2F%5C%2Fp16-oec-sg.ibyteimg.com%5C%2Ftos-alisg-i-aphluv4xwc-sg%5C%2F0db01e4a05f748ef9597fba39efd71dc~tplv-aphluv4xwc-resize-webp%3A260%3A260.webp%3Fdr%3D15582%26t%3D555f072d%26ps%3D933b5bde%26shp%3D7745054a%26shcp%3D9b759fb9%26idc%3Dmy%26from%3D2001012042%22%7D&sec_user_id=MS4wLjABAAAAGPJ9HjGz6Iuay6qmfIsuPNuurOsZ-IcMREG54wV7FpCyZpLNFGNNgtpxlaqhiZJP&share_app_id=1233&share_link_id=DF5CE7DE-EAB9-452E-84F9-A802DD61C092&share_region=BR&social_share_type=15&timestamp=1771789784&trackParams=%7B%22enable_shop_tab_popup%22%3A1%2C%22device_id%22%3A%227506972083776636422%22%2C%22enter_from_info%22%3A%22product_share_outside%22%2C%22source_page_type%22%3A%22product_share%22%2C%22traffic_source_list%22%3A%5B%222%22%5D%7D&tt_from=copy&u_code=E6FIJC%3AL28K12M&ug_btm=b6880%2Cb2878&unique_id=joaovellini_&user_id=7203069836077974534&utm_campaign=client_share&utm_medium=ios&utm_source=copy' },
    { id: 'p22', rank: 22, image: 'https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/47d1b4fc3e98423cb4dc376b65df2ffa~tplv-o3syd03w52-resize-webp:260:260.webp?dr=15582&t=555f072d&ps=933b5bde&shp=7745054a&shcp=9b759fb9&idc=my&from=2001012042', title: 'Boné Liso de Algodão', category: 'Acessórios', revenue: 'R$ 567.890,12', sales: '15.234', priceRange: 'R$ 29,90 - R$ 59,90', productUrl: 'https://www.tiktok.com/view/product/1731369975744595729?_svg=1&checksum=7d5c1890030370e58d6c89c9a5f86f71ecbfbfbe034dfdb4f243726219c95256&encode_params=MIIBUQQMiWUkej_jwQgdYRt0BIIBLYBWb0OfgmjXRwM2zLpeF5-TW9iZC-1vKXMKie4_tMWjBWw2OJhCaKWY9h74kw8prHGv7VPPaaswv60AlBA43XcvXGQ3ov2-UP5NQDRKechAvrGp2Zd-zgLwf135MdtF2Pgw0cBjxiS0kox-w8LBCTLz93iogiUB4Mt0c4NgYm0IqbFTsPcYTJeOgA0GjMEUB3n84rH7Q1tmCi_6m7naYMhQOylaxtSGTA_qBpCGz8eLhZiIUc-v8JcbAIhOUIaHLjE6MblnGnX6xbz92uYkvpt6_g42Uqgd2D_K1OHSi_-byijJGYLj-7MFlsAVrzMRhXFEHuGLY48QYIOIadFvJjpbG8dh9DvR0iAlKoTtN9EgbTy7jXgSKG4KQa9jCqmuRTp6S-6-DtCNgr5rIboEEEKZR-Wzoet-nMlxf67tM44%3D&og_info=%7B%22title%22%3A%22Bon%C3%A9+Liso+de+Algod%C3%A3o+Tecido+Aba+Curva+Voc%C3%AA+Decide+a+Cor%22%2C%22image%22%3A%22https%3A%5C%2F%5C%2Fp16-oec-va.ibyteimg.com%5C%2Ftos-maliva-i-o3syd03w52-us%5C%2F47d1b4fc3e98423cb4dc376b65df2ffa~tplv-o3syd03w52-resize-webp%3A260%3A260.webp%3Fdr%3D15582%26t%3D555f072d%26ps%3D933b5bde%26shp%3D7745054a%26shcp%3D9b759fb9%26idc%3Dmy%26from%3D2001012042%22%7D&sec_user_id=MS4wLjABAAAAGPJ9HjGz6Iuay6qmfIsuPNuurOsZ-IcMREG54wV7FpCyZpLNFGNNgtpxlaqhiZJP&share_app_id=1233&share_link_id=7A291096-759F-4A05-B3ED-2BF8EA8FEF17&share_region=BR&social_share_type=15&timestamp=1771790101&trackParams=%7B%22enable_shop_tab_popup%22%3A1%2C%22device_id%22%3A%227506972083776636422%22%2C%22enter_from_info%22%3A%22product_share_outside%22%2C%22source_page_type%22%3A%22product_share%22%7D&tt_from=copy&u_code=E6FIJC%3AL28K12M&ug_btm=b0%2Cb6661&unique_id=joaovellini_&user_id=7203069836077974534&utm_campaign=client_share&utm_medium=ios&utm_source=copy' },
    { id: 'p23', rank: 23, image: 'https://i.imgur.com/Be272Nl.png', title: 'Fone Bluetooth M10 Powerbank', category: 'Eletrônicos', revenue: 'R$ 845.231,45', sales: '12.432', priceRange: 'R$ 39,90 - R$ 79,90', productUrl: 'https://vt.tiktok.com/ZS9eGd2hy4Et5-N28gM/' },
    { id: 'p24', rank: 24, image: 'https://i.imgur.com/pa0pzNH.png', title: 'Bolsa Tiracolo Romantic Crown', category: 'Acessórios', revenue: 'R$ 432.125,56', sales: '8.125', priceRange: 'R$ 89,90 - R$ 159,90', productUrl: 'https://shop.tiktok.com/view/product/1731395674868385252?region=BR&locale=pt-BR&source=agency' },


  ];

  const exploreTopProducts: ProductExplore[] = [
    { id: 'e1', rank: 3, image: 'https://i.imgur.com/91dJ7Xs.jpeg', title: 'Chinelo Slide Nuvem Confort', revenue: 'R$ 5.724.863,85', priceRange: 'R$ 29,99 - R$ 99,99', productUrl: 'https://www.tiktok.com/view/product/1734261789877372669?_svg=1&checksum=782f06b151ccfec8f9f200209e9a78123f28879ad4f943d4aada5addccd94a76&encode_params=MIIBUQQMqMWscggKYZLXadgABIIBLZovPpQKWt9KOIP2LSyf8b2iFMY6BroHwo3n3u9JMKsA7KrqnNd0nmcKe012FbFem7iYPq5KLdtB2t7u9KwfEiJZyxg3uDRdq5RJAEBQz_X4s6b7hO-zUKpCltuLowGL0TvF5xlatIXqDqWbZcRtClb2biCuDjCDc06LRHibmyKqfeQ_e5EIGhfV3ZgqWIEjmRKNPxuPo5-Ud7lEYcBGNCQY163gu6qoIuu_lxS58asgqFjV2eR_QdCt02pQeNajrgOAsHt3p9_ewOU509N3O_GBJkMRF_aSJvVBn1zZuxaUZHMrY3U--LiSe8GD2JL4V1dDokgERjaWnQZ0OMgcEmsNf6F3gjChKHxLV1lrxD1A2HN0hhEHMHl0gXtPCV6KkOmBf_euVUGS-3DpwQcEEJCGseP_AvM-cpKxqGsd88M%3D&og_info=%7B%22title%22%3A%22Chinelo+Slide+Unissex+Casual+Para+Uso+Di%C3%A1rio%22%2C%22image%22%3A%22https%3A%5C%2F%5C%2Fp16-oec-va.ibyteimg.com%5C%2Ftos-maliva-i-o3syd03w52-us%5C%2F9a4070e224bd4714942a9e5442d1a9e8~tplv-o3syd03w52-resize-webp%3A260%3A260.webp%3Fdr%3D15582%26t%3D555f072d%26ps%3D933b5bde%26shp%3D7745054a%26shcp%3D9b759fb9%26idc%3Dmy%26from%3D2001012042%22%7D&sec_user_id=MS4wLjABAAAAGPJ9HjGz6Iuay6qmfIsuPNuurOsZ-IcMREG54wV7FpCyZpLNFGNNgtpxlaqhiZJP&share_app_id=1233&share_link_id=74CCB9BD-343F-4637-AF44-6E10F308BC5E&share_region=BR&social_share_type=15&timestamp=1770366698&trackParams=%7B%22enable_shop_tab_popup%22%3A1%2C%22device_id%22%3A%227506972083776636422%22%2C%22enter_from_info%22%3A%22product_share_outside%22%2C%22source_page_type%22%3A%22product_share%22%2C%22traffic_source_list%22%3A%5B%5D%7D&tt_from=copy&u_code=E6FIJC%3AL28K12M&ug_btm=b6880%2Cb6661&unique_id=joaovellini_&user_id=7203069836077974534&utm_campaign=client_share&utm_medium=ios&utm_source=copy' },
    { id: 'e2', rank: 6, image: 'https://i.imgur.com/YiQXmBJ.jpeg', title: '365 Dias Amor com Deus', revenue: 'R$ 2.152.342,10', priceRange: 'R$ 25,90 - R$ 39,90', productUrl: 'https://www.tiktok.com/view/product/1732162437981636069?_svg=1&checksum=567705e88160d779881297dd947a81f8b98e059697272542909833078d5f220f&encode_params=MIIBUQQM5msiz6KiFuTbAcXkBIIBLQUWuYU4ggWLiRJDl1e5x7kxiPDg576eq9YYP_ec6jeXawka8PWur3x_nRlEX__i2GZ42zS6HYRAqe9RH6cjCdxGgAgDLQQVef0b3qszSDdkxugk5Ox01y1LofhDQ0u-_0ulNbxI8JaFe7UF8mAEGZ_m8_rcQtZ7fDRm7BgWIEtgaoaRnShjzsTQGOwZHs4Dt_hZAcepydP1ZQE65ys56K7Dp-EMFoGfSfGXlVFdLXVFxcRUDYAV-5A_xUNLBPomV3EOJd9LPQIaYwYKDlubEth5zQULGWyDPsLIHPM5iefyDFTlpDjSYPKFdqn2uT9SU2daWDoH2Sgc6Ma5L1Xfo3yblp1IddpZi1Xvo9p_Vl3mxE6b7p7v4_9I-kOfnVRmBs0CDELi7F5gsLy3lS0EEKSLGDeufV2NtUFVZ_hcaYw%3D&og_info=%7B%22title%22%3A%22365+Dias+Amor+com+Deus+-+Devocional%22%2C%22image%22%3A%22https%3A%5C%2F%5C%2Fp16-oec-sg.ibyteimg.com%5C%2Ftos-alisg-i-aphluv4xwc-sg%5C%2Fd81e85d400ea455d8b4fc4a2728a4306~tplv-aphluv4xwc-resize-webp%3A260%3A260.webp%3Fdr%3D15582%26t%3D555f072d%26ps%3D933b5bde%26shp%3D7745054a%26shcp%3D9b759fb9%26idc%3Dmy%26from%3D2001012042%22%7D&sec_user_id=MS4wLjABAAAAGPJ9HjGz6Iuay6qmfIsuPNuurOsZ-IcMREG54wV7FpCyZpLNFGNNgtpxlaqhiZJP&share_app_id=1233&share_link_id=33149E51-E61B-47B4-B554-18197CF36093&share_region=BR&social_share_type=15&timestamp=1770366614&trackParams=%7B%22enable_shop_tab_popup%22%3A1%2C%22device_id%22%3A%227506972083776636422%22%2C%22enter_from_info%22%3A%22product_share_outside%22%2C%22source_page_type%22%3A%22product_share%22%2C%22traffic_source_list%22%3A%5B%5D%7D&tt_from=copy&u_code=E6FIJC%3AL28K12M&ug_btm=b6880%2Cb6661&unique_id=joaovellini_&user_id=7203069836077974534&utm_campaign=client_share&utm_medium=ios&utm_source=copy' },
    { id: 'e3', rank: 9, image: 'https://i.imgur.com/9cNgCYt.png', title: 'Bolsa Feminina Couro Transversal', revenue: 'R$ 3.824.747,43', priceRange: 'R$ 42,60 - R$ 160,00', productUrl: 'https://www.tiktok.com/view/product/1733575637953513124?_svg=1&checksum=4cc83e293ba61e0c5492cd72e54092e74c22798bab45e2e6dfbe49a819e567cb&encode_params=MIIBUQQMZTrxD3u3pxYs5Yo-BIIBLZ-NdRLDuiJEtuLWj947Lg5Bcb5DP4BTzQJireUQbUOp3HYeCW5gXWcC9bRoIf_PLBFa1iqzH9V6iPWNxDzRBoSIHyZTfqFl1gvDTjzSo0j_KtiHDcuDpxrNnuwHjoTab9yzQzloY_Qypx8NRPBIs7HVTZYWy_lHImMFng2TEu-qnSm__1bx0kLrd1telGOmBuDNNjPUbC0oDwA7-wfY5T2cILdfp9tJtZRK98Ok5yf-O7TYgwJwpfWOWVWNkiWslTTkJYMJnI_CeBuLimebK1kpAm_1-w4O8fyCU4ttVnTZM_B56sEMPWo-Erxm71txY6MbDRetT8Brkx-YuyV4EGIpqq8XwZZM4eFQREb7_nazI0QqNoX4U8P0mly-tfD3259yJlYWBSO_yKeGxVgEEOcm8eiOcRvOcl839PcgTu4%3D&og_info=%7B%22title%22%3A%22Bolsa+Feminina+Com+Al%C3%A7a+Lateral+Transversal+De+Ombro+De+Couro+PU+T304+AF%22%2C%22image%22%3A%22https%3A%5C%2F%5C%2Fp16-oec-va.ibyteimg.com%5C%2Ftos-maliva-i-o3syd03w52-us%5C%2F26afd3c2d5b647ca86ff0528cbd2fb2a~tplv-o3syd03w52-resize-webp%3A260%3A260.webp%3Fdr%3D15582%26t%3D555f072d%26ps%3D933b5bde%26shp%3D7745054a%26shcp%3D9b759fb9%26idc%3Dmy%26from%3D2001012042%22%7D&sec_user_id=MS4wLjABAAAAGPJ9HjGz6Iuay6qmfIsuPNuurOsZ-IcMREG54wV7FpCyZpLNFGNNgtpxlaqhiZJP&share_app_id=1233&share_link_id=90ADDB6E-B00C-45B1-8E8C-965E441ED0D5&share_region=BR&social_share_type=15&timestamp=1770366471&trackParams=%7B%22enable_shop_tab_popup%22%3A1%2C%22device_id%22%3A%227506972083776636422%22%2C%22enter_from_info%22%3A%22product_share_outside%22%2C%22source_page_type%22%3A%22product_share%22%2C%22traffic_source_list%22%3A%5B%5D%7D&tt_from=copy&u_code=E6FIJC%3AL28K12M&ug_btm=b6880%2Cb6661&unique_id=joaovellini_&user_id=7203069836077974534&utm_campaign=client_share&utm_medium=ios&utm_source=copy' },
    { id: 'e4', rank: 12, image: 'https://i.imgur.com/4MEt6WH.jpeg', title: 'Parafusadeira Furadeira 48v', revenue: 'R$ 6.451.128,24', priceRange: 'R$ 260,99 - R$ 544,00', productUrl: 'https://www.tiktok.com/view/product/1733093661342074653?_svg=1&checksum=6852d6ef55eca09f8b136a146ed2c4b85d290d2163b2d9d6bed9cf3c818f7690&encode_params=MIIBUQQM7DrymndbQjI0Zt8YBIIBLXnc4OCrCJysRVcD-bVTP5UK5yV-rMctx-nohpvBLAqW13-8WDLB-xU4ppOtMDDtK-MkKy756A6euOtJVjDyU-Iv3N54gdCf51QUQ5d-YbEgd04YMN4Z9546Yb04lRyxTDpat467DU-MCIbTUzzBVv3VLiTLlyjLw4tMHoH1nFtSsdokxlGTxIHF9692a5qCewKyP0qnCxd7VKlwvfzemiJxJIbXdEkNeRsbvo8ySQubBdMm1TFmea9pw-MStQUw5326iuX1ITQky3Nh1Y8L3QlsUDWh_ElrznQJyqgUoULR0NUdGoJs6Gu8uOxG8O4x0dcQ0Mu43IK6eXEfuKrOKzT3Oe400W56wcM1Tv--JCrTcWIS89M0HHLKoX6mYgXpik0okJ2C_M76K0PLYPwEECfunb8nCLgCOtF6BlgHhEo%3D&og_info=%7B%22title%22%3A%22RHOVISTAR+Chave+de+Impacto+48V+Sem+Fio+%7C+Parafusadeira+e+Furadeira+3+em+1+%7C+2+Baterias+%7C+Alta+Pot%C3%AAncia%22%2C%22image%22%3A%22https%3A%5C%2F%5C%2Fp16-oec-sg.ibyteimg.com%5C%2Ftos-alisg-i-aphluv4xwc-sg%5C%2F4b08ada1b3044db0a5b772d57a4a4de1~tplv-aphluv4xwc-resize-webp%3A260%3A260.webp%3Fdr%3D15582%26t%3D555f072d%26ps%3D933b5bde%26shp%3D7745054a%26shcp%3D9b759fb9%26idc%3Dmy%26from%3D2001012042%22%7D&sec_user_id=MS4wLjABAAAAGPJ9HjGz6Iuay6qmfIsuPNuurOsZ-IcMREG54wV7FpCyZpLNFGNNgtpxlaqhiZJP&share_app_id=1233&share_link_id=903E3B6A-6D88-4FDE-8D74-1F3B2F039232&share_region=BR&social_share_type=15&timestamp=1770366342&trackParams=%7B%22enable_shop_tab_popup%22%3A1%2C%22device_id%22%3A%227506972083776636422%22%2C%22enter_from_info%22%3A%22product_share_outside%22%2C%22source_page_type%22%3A%22product_share%22%2C%22traffic_source_list%22%3A%5B%5D%7D&tt_from=copy&u_code=E6FIJC%3AL28K12M&ug_btm=b6880%2Cb6661&unique_id=joaovellini_&user_id=7203069836077974534&utm_campaign=client_share&utm_medium=ios&utm_source=copy' },
  ];

  const hacks: HackItem[] = [
    {
      id: 'h1',
      title: 'Estilo Cartomante',
      image: 'https://i.imgur.com/5VayVwi.mp4',
      icon: '🔮',
      bannerColor: '#3b0764',
      description: 'Vídeos de leitura de cartas e previsões que geram alta curiosidade e compartilhamento.',
      hasVeoBadge: true,
      exampleVideos: [
        'https://player.vimeo.com/video/1165300648?autoplay=1&muted=1&loop=1&controls=0&title=0&byline=0&portrait=0&dnt=1',
        'https://player.vimeo.com/video/1165300660?autoplay=1&muted=1&loop=1&controls=0&title=0&byline=0&portrait=0&dnt=1'
      ],
      examplePrompts: [
        `Vertical video, aspect ratio 9:16, cinematic realism, ultra realistic human face, Brazilian Portuguese speech only.
No subtitles. No captions. No on-screen text. No music. No background soundtrack. No background narration. Only natural ambient sounds.

An elderly Brazilian northeastern woman, around 70 to 80 years old. She has deep wrinkles, natural aged skin texture, expressive eyes, and realistic human imperfections. She looks like a rural nordestina grandmother from the Agreste region of Northeast Brazil. She speaks Brazilian Portuguese with a clear northeastern accent. She is charismatic and slightly mystical, speaking as if she can see the future. No makeup glamour, no model appearance, no young face, no smooth skin. Fully realistic aged skin and wrinkles.

She wears simple rural clothing: a simple floral dress made of faded fabric and an old cloth headscarf tied on her head. The clothes are humble, slightly worn but clean.

Scene takes place inside a humble countryside house in the Northeast Brazil agreste. Clay brick walls, a rustic wooden door, sunlight entering from the side, a rustic wooden table, simple kitchen objects, and a coffee pot on a wood stove. Warm natural lighting. Very authentic Brazilian rural interior. No modern furniture and no urban environment.

She is sitting at a rustic wooden table holding a clay mug of hot coffee with visible steam rising. She looks directly into the camera as if speaking personally to the viewer. She takes a small sip of coffee, pauses, smiles slightly, and then speaks in a mystical tone.

She says in Brazilian Portuguese with northeastern accent:
"Até no café eu vi seu destino... dinheiro grande tá chegando. clica no mais da minha foto e comenta zero oito."

Camera fixed, chest-up framing, slight natural handheld micro movement, realistic lighting, shallow depth of field, cinematic focus on her face. Single continuous shot, no cuts, approximately 8 seconds duration.

Do not add subtitles. Do not add text overlays. Do not add background music. Do not translate the speech. Do not change the language. Do not generate English voice. Do not stylize animation. Do not cartoonize. It must look like a real filmed person.`,
        `Vertical video, aspect ratio 9:16, cinematic realism, ultra realistic human face, Brazilian Portuguese speech only.
No subtitles. No captions. No on-screen text. No music. No background soundtrack. No background narration. Only natural ambient sounds.

An elderly Brazilian northeastern woman, around 70 to 80 years old. She has deep wrinkles, natural aged skin texture, expressive eyes, and realistic human imperfections. She looks like a rural nordestina grandmother from the Agreste region of Northeast Brazil. She speaks Brazilian Portuguese with a clear northeastern accent. She is charismatic and slightly mystical, speaking as if she can see the future. No makeup glamour, no model appearance, no young face, no smooth skin. Fully realistic aged skin and wrinkles.

She wears simple rural clothing: a simple floral dress made of faded fabric and an old cloth headscarf tied on her head. The clothes are humble, slightly worn but clean.

Scene takes place inside a humble countryside house in the Northeast Brazil agreste. Clay brick walls, a rustic wooden door, sunlight entering from the side, a rustic wooden table, simple kitchen objects, and a coffee pot on a wood stove. Warm natural lighting. Very authentic Brazilian rural interior. No modern furniture and no urban environment.

She is sitting at a rustic wooden table holding a clay mug of hot coffee with visible steam rising. She looks directly into the camera as if speaking personally to the viewer. She takes a small sip of coffee, pauses, smiles slightly, and then speaks in a mystical tone.

She says in Brazilian Portuguese with northeastern accent:
"Até no café eu vi seu destino... dinheiro grande tá chegando. clica no mais da minha foto e comenta zero oito."

Camera fixed, chest-up framing, slight natural handheld micro movement, realistic lighting, shallow depth of field, cinematic focus on her face. Single continuous shot, no cuts, approximately 8 seconds duration.

Do not add subtitles. Do not add text overlays. Do not add background music. Do not translate the speech. Do not change the language. Do not generate English voice. Do not stylize animation. Do not cartoonize. It must look like a real filmed person.`
      ],
      tiktokUrl: 'https://www.tiktok.com/tag/cartomante?is_from_webapp=1&sender_device=pc'
    },
    {
      id: 'h2',
      title: 'Estilo Menina da Roça',
      image: 'https://i.imgur.com/izKvalq.mp4',
      icon: '🤠',
      bannerColor: '#8c4200',
      description: 'A estética rústica e simples que transmite humildade e gera forte conexão emocional.',
      exampleVideos: [
        'https://player.vimeo.com/video/1165284699?autoplay=1&muted=1&loop=1&controls=0&title=0&byline=0&portrait=0&dnt=1',
        'https://player.vimeo.com/video/1165284681?autoplay=1&muted=1&loop=1&controls=0&title=0&byline=0&portrait=0&dnt=1',
        'https://player.vimeo.com/video/1165284668?autoplay=1&muted=1&loop=1&controls=0&title=0&byline=0&portrait=0&dnt=1',
        'https://player.vimeo.com/video/1165284656?autoplay=1&muted=1&loop=1&controls=0&title=0&byline=0&portrait=0&dnt=1'
      ],
      examplePrompts: [
        `Vertical video, aspect ratio 9:16, realistic smartphone selfie style, ultra realistic human face, Brazilian Portuguese speech only.
No subtitles. No captions. No on-screen text. No music. No background soundtrack. No background narration. Only natural ambient sounds.

A beautiful Brazilian countryside woman, around 20 to 25 years old. She is naturally attractive, charismatic, friendly, and flirtatious in a sweet and innocent way. She has a realistic face with natural skin texture and imperfections (pores, small marks, natural lighting). She must look like a real person recorded on a phone camera, not a model photoshoot and not a celebrity. She speaks Brazilian Portuguese with a soft countryside interior accent.

She wears simple rural clothing: fitted basic t-shirt or cropped blouse, casual leggings or denim shorts, simple sandals. Hair natural and slightly messy from daily rural life, minimal makeup, natural beauty.

Scene takes place in a Brazilian countryside farm environment. Around her there are banana trees, dirt ground, wooden fence, pasture grass, distant cows or chickens, and a simple rural house. Warm late afternoon sunlight (golden hour). Authentic rural Brazil atmosphere. No urban buildings, no city environment, no American farm style.

She is holding the camera herself (selfie recording). She smiles, slightly shy, then looks directly at the viewer as if talking personally. Natural hand movement and body posture. Casual and spontaneous behavior, like recording a TikTok.

She speaks in Brazilian Portuguese:

"Você teria coragem de me namorar mesmo eu sendo do interior? Dá um toque ali embaixo da minha foto pra eu saber se você aceitou."

Camera handheld smartphone front camera style, natural micro movement, chest-up framing, shallow depth of field, warm natural lighting. Single continuous shot, about 7 to 9 seconds.

Do not add subtitles. Do not add text overlays. Do not add background music. Do not translate the speech. Do not change the language. Do not generate English voice. Do not stylize animation. Must look like a real recorded person.`,
        `Vertical video, aspect ratio 9:16, realistic smartphone selfie style, ultra realistic human face, Brazilian Portuguese speech only.
No subtitles. No captions. No on-screen text. No music. No background soundtrack. No background narration. Only natural ambient sounds.

A beautiful Brazilian countryside woman, around 20 to 25 years old. She is naturally attractive, charismatic, friendly, and flirtatious in a sweet and innocent way. She has a realistic face with natural skin texture and imperfections (pores, small marks, natural lighting). She must look like a real person recorded on a phone camera, not a model photoshoot and not a celebrity. She speaks Brazilian Portuguese with a soft countryside interior accent.

She wears simple rural clothing: fitted basic t-shirt or cropped blouse, casual leggings or denim shorts, simple sandals. Hair natural and slightly messy from daily rural life, minimal makeup, natural beauty.

Scene takes place in a Brazilian countryside farm environment. Around her there are banana trees, dirt ground, wooden fence, pasture grass, distant cows or chickens, and a simple rural house. Warm late afternoon sunlight (golden hour). Authentic rural Brazil atmosphere. No urban buildings, no city environment, no American farm style.

She is holding the camera herself (selfie recording). She smiles, slightly shy, then looks directly at the viewer as if talking personally. Natural hand movement and body posture. Casual and spontaneous behavior, like recording a TikTok.

She speaks in Brazilian Portuguese:

"Você teria coragem de me namorar mesmo eu sendo do interior? Dá um toque ali embaixo da minha foto pra eu saber se você aceitou."

Camera handheld smartphone front camera style, natural micro movement, chest-up framing, shallow depth of field, warm natural lighting. Single continuous shot, about 7 to 9 seconds.

Do not add subtitles. Do not add text overlays. Do not add background music. Do not translate the speech. Do not change the language. Do not generate English voice. Do not stylize animation. Must look like a real recorded person.`,
        `Vertical video, aspect ratio 9:16, realistic smartphone selfie style, ultra realistic human face, Brazilian Portuguese speech only.
No subtitles. No captions. No on-screen text. No music. No background soundtrack. No background narration. Only natural ambient sounds.

A beautiful Brazilian countryside woman, around 20 to 25 years old. She is naturally attractive, charismatic, friendly, and flirtatious in a sweet and innocent way. She has a realistic face with natural skin texture and imperfections (pores, small marks, natural lighting). She must look like a real person recorded on a phone camera, not a model photoshoot and not a celebrity. She speaks Brazilian Portuguese with a soft countryside interior accent.

She wears simple rural clothing: fitted basic t-shirt or cropped blouse, casual leggings or denim shorts, simple sandals. Hair natural and slightly messy from daily rural life, minimal makeup, natural beauty.

Scene takes place in a Brazilian countryside farm environment. Around her there are banana trees, dirt ground, wooden fence, pasture grass, distant cows or chickens, and a simple rural house. Warm late afternoon sunlight (golden hour). Authentic rural Brazil atmosphere. No urban buildings, no city environment, no American farm style.

She is holding the camera herself (selfie recording). She smiles, slightly shy, then looks directly at the viewer as if talking personally. Natural hand movement and body posture. Casual and spontaneous behavior, like recording a TikTok.

She speaks in Brazilian Portuguese:

"Você teria coragem de me namorar mesmo eu sendo do interior? Dá um toque ali embaixo da minha foto pra eu saber se você aceitou."

Camera handheld smartphone front camera style, natural micro movement, chest-up framing, shallow depth of field, warm natural lighting. Single continuous shot, about 7 to 9 seconds.

Do not add subtitles. Do not add text overlays. Do not add background music. Do not translate the speech. Do not change the language. Do not generate English voice. Do not stylize animation. Must look like a real recorded person.`,
        `Vertical video, aspect ratio 9:16, realistic smartphone selfie style, ultra realistic human face, Brazilian Portuguese speech only.
No subtitles. No captions. No on-screen text. No music. No background soundtrack. No background narration. Only natural ambient sounds.

A beautiful Brazilian countryside woman, around 20 to 25 years old. She is naturally attractive, charismatic, friendly, and flirtatious in a sweet and innocent way. She has a realistic face with natural skin texture and imperfections (pores, small marks, natural lighting). She must look like a real person recorded on a phone camera, not a model photoshoot and not a celebrity. She speaks Brazilian Portuguese with a soft countryside interior accent.

She wears simple rural clothing: fitted basic t-shirt or cropped blouse, casual leggings or denim shorts, simple sandals. Hair natural and slightly messy from daily rural life, minimal makeup, natural beauty.

Scene takes place in a Brazilian countryside farm environment. Around her there are banana trees, dirt ground, wooden fence, pasture grass, distant cows or chickens, and a simple rural house. Warm late afternoon sunlight (golden hour). Authentic rural Brazil atmosphere. No urban buildings, no city environment, no American farm style.

She is holding the camera herself (selfie recording). She smiles, slightly shy, then looks directly at the viewer as if talking personally. Natural hand movement and body posture. Casual and spontaneous behavior, like recording a TikTok.

She speaks in Brazilian Portuguese:

"Você teria coragem de me namorar mesmo eu sendo do interior? Dá um toque ali embaixo da minha foto pra eu saber se você aceitou."

Camera handheld smartphone front camera style, natural micro movement, chest-up framing, shallow depth of field, warm natural lighting. Single continuous shot, about 7 to 9 seconds.

Do not add subtitles. Do not add text overlays. Do not add background music. Do not translate the speech. Do not change the language. Do not generate English voice. Do not stylize animation. Must look like a real recorded person.`
      ],
      tiktokUrl: 'https://www.tiktok.com/tag/meninadaro%C3%A7a?is_from_webapp=1&sender_device=pc'
    },
    {
      id: 'h3',
      title: 'Estilo Religioso',
      image: 'https://i.imgur.com/ICp0jG3.mp4',
      icon: '🙏',
      bannerColor: '#1e293b',
      description: 'Mensagens de fé e passagens bíblicas que possuem alcance viral massivo e fidelização.',
      isHighlighted: true,
      exampleVideos: [
        'https://player.vimeo.com/video/1165300385?autoplay=1&muted=1&loop=1&controls=0&title=0&byline=0&portrait=0&dnt=1',
        'https://player.vimeo.com/video/1165300418?autoplay=1&muted=1&loop=1&controls=0&title=0&byline=0&portrait=0&dnt=1'
      ],
      examplePrompts: [
        `Vertical video, aspect ratio 9:16, realistic smartphone video, ultra realistic human appearance, Brazilian Portuguese speech only.
No subtitles. No captions. No on-screen text. No music. No background soundtrack. No narration. Only natural ambient sounds.

A humble middle-aged man (around 35 to 45 years old) with long dark hair, short beard, and a gentle and kind expression. He resembles the traditional appearance often associated with biblical characters, but he must look like a real person, not a painting, not a divine glowing figure, and not cinematic fantasy. Natural human skin texture and imperfections.

He wears simple ancient-style clothing: a light beige tunic, simple cloth mantle, leather sandals. Clothes look handmade and humble, slightly worn.

Scene takes place in front of a simple countryside house in a small Brazilian town. The house has plaster or brick walls, a wooden door, simple porch, and modest neighborhood around. Dirt street, simple houses nearby, warm late afternoon sunlight. Authentic Brazilian small-town interior environment. No modern city buildings.

He is standing at the doorway, as if someone inside opened the door and he is politely speaking to the person holding the camera (POV). Friendly, calm, welcoming tone.

He gently smiles and speaks in Brazilian Portuguese:

"Oi, posso entrar pra abençoar sua casa hoje? Se sim, comenta amém e clica no botão em baixo da minha foto e manda esse vídeo pra alguém."

Camera POV from inside the house looking at him at the doorway. Slight handheld natural movement, chest-up framing, natural lighting, shallow depth of field. Single continuous shot, approximately 8 seconds.

Do not add subtitles. Do not add text overlays. Do not add background music. Do not translate the speech. Do not change the language. Do not create cinematic effects, halos, divine glow, or fantasy atmosphere. Must look like a real recorded person.`,
        `Vertical video, aspect ratio 9:16, realistic smartphone video, ultra realistic human appearance, Brazilian Portuguese speech only.
No subtitles. No captions. No on-screen text. No music. No background soundtrack. No narration. Only natural ambient sounds.

A humble middle-aged man (around 35 to 45 years old) with long dark hair, short beard, and a gentle and kind expression. He resembles the traditional appearance often associated with biblical characters, but he must look like a real person, not a painting, not a divine glowing figure, and not cinematic fantasy. Natural human skin texture and imperfections.

He wears simple ancient-style clothing: a light beige tunic, simple cloth mantle, leather sandals. Clothes look handmade and humble, slightly worn.

Scene takes place in front of a simple countryside house in a small Brazilian town. The house has plaster or brick walls, a wooden door, simple porch, and modest neighborhood around. Dirt street, simple houses nearby, warm late afternoon sunlight. Authentic Brazilian small-town interior environment. No modern city buildings.

He is standing at the doorway, as if someone inside opened the door and he is politely speaking to the person holding the camera (POV). Friendly, calm, welcoming tone.

He gently smiles and speaks in Brazilian Portuguese:

"Oi, posso entrar pra abençoar sua casa hoje? Se sim, comenta amém e clica no botão em baixo da minha foto e manda esse vídeo pra alguém."

Camera POV from inside the house looking at him at the doorway. Slight handheld natural movement, chest-up framing, natural lighting, shallow depth of field. Single continuous shot, approximately 8 seconds.

Do not add subtitles. Do not add text overlays. Do not add background music. Do not translate the speech. Do not change the language. Do not create cinematic effects, halos, divine glow, or fantasy atmosphere. Must look like a real recorded person.`
      ],
      tiktokUrl: 'https://www.tiktok.com/search?q=%23camisetacrista&t=1772204055086'
    },
  ];

  const handleSelectHack = (id: string) => {
    setSelectedHackId(id);
    setCurrentPage('hacks-virais-detalhe');
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div className="absolute inset-0 bg-[#0b0c10]/80 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-[280px] bg-[#0b0c10] border-r border-[#1e1f26] flex flex-col pt-6 px-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setIsMobileMenuOpen(false); setCurrentPage('explorar'); }}>
                <img src="https://i.imgur.com/hkRPBxg.png" alt="Trendfy Logo" className="w-10 h-10 object-contain" />
                <span className="text-xl font-black text-white">Trendfy</span>
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
                  className={`text-left text-base font-semibold py-3 px-4 rounded-xl transition-all ${currentPage === page ? 'text-white bg-[#3B82F6]' : 'text-[#8d8d99] hover:text-white hover:bg-[#1f2026]'}`}
                >
                  {t(page)}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-[#0b0c10] text-[#e1e1e6] selection:bg-[#3B82F6]/30 flex flex-col">
        {/* PERFECT CLONE HEADER */}
        <header className="h-[72px] border-b border-[#1e1f26] bg-[#0b0c10] flex items-center sticky top-0 z-50">
          <div className="max-w-[1400px] w-full mx-auto px-6 flex items-center h-full">
            {/* Logo Area */}

            {/* Mobile Hamburger */}
            <button
              className="lg:hidden mr-4 p-2 -ml-2 text-white hover:bg-[#1f2026] rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2 group cursor-pointer mr-auto" onClick={() => { setIsMobileMenuOpen(false); setCurrentPage('explorar'); }}>
              <div className="w-14 h-14 bg-transparent flex items-center justify-center">
                <img
                  src="https://i.imgur.com/hkRPBxg.png"
                  alt="Trendfy Logo"
                  className="w-12 h-12 object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-[22px] font-black tracking-tighter text-white">Trendfy</span>
            </div>

            {/* Navigation Links Grouped closer to Right Actions */}
            <div className="flex items-center gap-5 md:gap-8 h-full">
              <nav className="hidden lg:flex items-center gap-5 h-full">
                <button
                  onClick={() => setCurrentPage('explorar')}
                  className={`text-sm font-semibold transition-colors relative h-full flex items-center px-2 ${currentPage === 'explorar' ? 'text-white' : 'text-[#8d8d99] hover:text-white'}`}
                >
                  {t('explorar')}
                  {currentPage === 'explorar' && <span className="absolute bottom-[-1px] left-0 w-full h-[3px] bg-[#3B82F6] rounded-t-sm"></span>}
                </button>
                <button
                  onClick={() => setCurrentPage('produtos')}
                  className={`text-sm font-semibold transition-colors relative h-full flex items-center px-2 ${currentPage === 'produtos' ? 'text-white' : 'text-[#8d8d99] hover:text-white'}`}
                >
                  {t('produtos')}
                  {currentPage === 'produtos' && <span className="absolute bottom-[-1px] left-0 w-full h-[3px] bg-[#3B82F6] rounded-t-sm"></span>}
                </button>
                <button
                  onClick={() => setCurrentPage('videos')}
                  className={`text-sm font-semibold transition-colors relative h-full flex items-center px-2 ${currentPage === 'videos' ? 'text-white' : 'text-[#8d8d99] hover:text-white'}`}
                >
                  {t('videos')}
                  {currentPage === 'videos' && <span className="absolute bottom-[-1px] left-0 w-full h-[3px] bg-[#3B82F6] rounded-t-sm"></span>}
                </button>
                <button
                  onClick={() => setCurrentPage('criadores')}
                  className={`text-sm font-semibold transition-colors relative h-full flex items-center px-2 ${currentPage === 'criadores' ? 'text-white' : 'text-[#8d8d99] hover:text-white'}`}
                >
                  {t('criadores')}
                  {currentPage === 'criadores' && <span className="absolute bottom-[-1px] left-0 w-full h-[3px] bg-[#3B82F6] rounded-t-sm"></span>}
                </button>

                {/* FERRAMENTAS DROPDOWN (HOVER) */}
                <div className="relative group h-full flex items-center px-2 cursor-pointer">
                  <div className="flex items-center gap-1">
                    <span className={`text-sm font-semibold transition-colors relative h-full flex items-center ${['ugc-criador', 'galeria-avatares', 'meus-avatares', 'criar-avatar', 'previsibilidade-receita', 'hacks-virais', 'hacks-virais-detalhe'].includes(currentPage) ? 'text-white' : 'text-[#8d8d99] group-hover:text-white'}`}>
                      {t('ferramentas')}
                      {['ugc-criador', 'galeria-avatares', 'meus-avatares', 'criar-avatar', 'previsibilidade-receita', 'hacks-virais', 'hacks-virais-detalhe'].includes(currentPage) && <span className="absolute bottom-[-1px] left-0 w-full h-[3px] bg-[#3B82F6] rounded-t-sm"></span>}
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#8d8d99] rotate-90 group-hover:text-white transition-colors" />
                  </div>

                  {/* Perfect Clone Tool Dropdown Menu */}
                  <div className="absolute top-[72px] left-1/2 -translate-x-1/2 invisible group-hover:visible opacity-0 group-hover:opacity-100 flex flex-col bg-[#14151a] border border-[#1e1f26] rounded-2xl p-2 min-w-[240px] shadow-[0_20px_40px_rgba(0,0,0,0.8)] z-[100] transition-all duration-200">
                    <DropdownToolItem label={t('ugcCriador')} badge="IA" isActive={currentPage === 'ugc-criador'} onClick={() => setCurrentPage('ugc-criador')} />
                    <DropdownToolItem label={t('galeriaAvatares')} badge="IA" isActive={currentPage === 'galeria-avatares'} onClick={() => setCurrentPage('galeria-avatares')} />
                    <DropdownToolItem label={t('galeriaPrompts')} isActive={currentPage === 'galeria-prompts'} onClick={() => setCurrentPage('galeria-prompts')} />
                    <DropdownToolItem label={t('previsibilidadeReceita')} isActive={currentPage === 'previsibilidade-receita'} onClick={() => setCurrentPage('previsibilidade-receita')} />
                    <DropdownToolItem label={t('hacksVirais')} isActive={['hacks-virais', 'hacks-virais-detalhe'].includes(currentPage)} onClick={() => setCurrentPage('hacks-virais')} />
                  </div>
                </div>

                <button
                  onClick={() => setCurrentPage('creator-academy')}
                  className={`text-sm font-semibold transition-colors relative h-full flex items-center px-2 ${currentPage === 'creator-academy' ? 'text-white' : 'text-[#8d8d99] hover:text-white'}`}
                >
                  {t('creatorAcademy')}
                  {currentPage === 'creator-academy' && <span className="absolute bottom-[-1px] left-0 w-full h-[3px] bg-[#3B82F6] rounded-t-sm"></span>}
                </button>
              </nav>

              {/* Separator */}
              <div className="w-[1.5px] h-6 bg-[#33333a] mx-1"></div>

              {/* Right Actions */}
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 border border-[#2C2D38] text-[#3B82F6] rounded-lg text-xs font-black hover:bg-[#3B82F6]/5 transition-all">
                  <Download className="w-4 h-4" />
                  {t('baixarApp')}
                </button>

                <div className="relative">
                  <div
                    onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-[#14151a] rounded-lg border border-[#1e1f26] text-xs font-bold cursor-pointer hover:border-[#44444f] transition-all"
                  >
                    <img src="https://flagcdn.com/w20/br.png" width="16" alt="Brazil" className="rounded-[1px]" />
                    <span className="text-[#8d8d99] uppercase">PT</span>
                    <ChevronRight className={`w-3 h-3 text-[#8d8d99] transition-transform ${isLangMenuOpen ? '-rotate-90' : 'rotate-90'}`} />
                  </div>

                  {isLangMenuOpen && (
                    <div className="absolute top-full mt-2 right-0 bg-[#14151a] border border-[#1e1f26] rounded-xl p-1.5 min-w-[160px] shadow-2xl z-[100] animate-in fade-in zoom-in-95 duration-200">
                      <button
                        onClick={() => { setLanguage('pt'); setIsLangMenuOpen(false); }}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-black transition-all ${language === 'pt' ? 'bg-[#3B82F6]/10 text-[#3B82F6]' : 'text-[#8d8d99] hover:bg-[#2d2d33] hover:text-white'}`}
                      >
                        <img src="https://flagcdn.com/w20/br.png" width="16" alt="Brazil" className="rounded-[1px]" />
                        {t('portugues')}
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex items-center p-1 bg-[#14151a] border border-[#1e1f26] rounded-full w-12 h-6 relative cursor-pointer">
                  <div className="w-4 h-4 bg-[#3B82F6] rounded-full translate-x-5 transition-transform flex items-center justify-center shadow-lg">
                    <Moon className="w-2.5 h-2.5 text-white" />
                  </div>
                </div>

                <div
                  onClick={() => setCurrentPage('configuracoes')}
                  className="flex items-center gap-2.5 bg-[#14151a] pl-1.5 pr-3 py-1.5 rounded-full border border-[#1e1f26] cursor-pointer hover:border-[#3B82F6]/30 transition-all"
                >
                  <div className="w-7 h-7 bg-[#3B82F6] rounded-full flex items-center justify-center text-[11px] font-black text-white shadow-lg shadow-[#3B82F6]/20 overflow-hidden">
                    {userProfileImage ? (
                      <img src={userProfileImage} alt="User" className="w-full h-full object-cover" />
                    ) : (
                      "N"
                    )}
                  </div>
                  <span className="text-xs font-black text-white uppercase tracking-tight">{t('usuario')}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex-1">
          {currentPage === 'explorar' && <ExploreView products={exploreTopProducts} onGoToAcademy={() => setCurrentPage('creator-academy')} onGoToProducts={() => setCurrentPage('produtos')} />}
          {currentPage === 'produtos' && <ProductsView products={viralProducts} />}
          {currentPage === 'videos' && <VideosView />}
          {currentPage === 'criadores' && <CreatorsView />}
          {currentPage === 'ugc-criador' && <UGCCreatorView viralProducts={viralProducts} exploreTopProducts={exploreTopProducts} />}
          {currentPage === 'galeria-avatares' && <GaleriaAvataresView onGoToMyAvatars={() => setCurrentPage('meus-avatares')} onCreateNew={() => setCurrentPage('criar-avatar')} />}
          {currentPage === 'galeria-prompts' && <GaleriaPromptsView />}
          {currentPage === 'meus-avatares' && <MeusAvataresView onBack={() => setCurrentPage('galeria-avatares')} onCreateNew={() => setCurrentPage('criar-avatar')} />}
          {currentPage === 'criar-avatar' && <CriarAvatarView onBack={() => setCurrentPage('galeria-avatares')} />}
          {currentPage === 'previsibilidade-receita' && <PrevisibilidadeReceitaView />}
          {currentPage === 'hacks-virais' && <HacksViraisView hacks={hacks} onSelectHack={handleSelectHack} />}
          {currentPage === 'hacks-virais-detalhe' && <HacksViraisDetalheView hack={hacks.find(h => h.id === selectedHackId) || hacks[0]} onBack={() => setCurrentPage('hacks-virais')} />}
          {currentPage === 'creator-academy' && <CreatorAcademyView onSelectModule={(id) => setCurrentPage(id as any)} />}
          {currentPage === 'passos-iniciais' && <PassosIniciaisView onBack={() => setCurrentPage('creator-academy')} />}
          {currentPage === 'como-se-afiliar' && <ComoSeAfiliarView onBack={() => setCurrentPage('creator-academy')} />}
          {currentPage === 'regras-e-restricoes' && <RegrasERestricoesView onBack={() => setCurrentPage('creator-academy')} />}
          {currentPage === 'como-criar-avatar-ia' && <ComoCriarAvatarIAView onBack={() => setCurrentPage('creator-academy')} />}
          {currentPage === 'como-criar-videos-ugc' && <ComoCriarVideosUGCView onBack={() => setCurrentPage('creator-academy')} />}
          {currentPage === 'configuracoes' && (
            <ConfiguracoesView
              profileImage={userProfileImage}
              onImageUpload={(url) => setUserProfileImage(url)}
            />
          )}
        </div>

        {/* PERFECT CLONE ROBUST FOOTER */}
        <footer className="bg-[#0b0c10] border-t border-[#1e1f26] pt-24 pb-12">
          <div className="max-w-[1400px] w-full mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 md:gap-12 mb-24">
              <div className="lg:col-span-2">
                <div className="flex items-center gap-2 mb-8 group cursor-pointer w-fit" onClick={() => setCurrentPage('explorar')}>
                  <img
                    src="https://i.imgur.com/hkRPBxg.png"
                    alt="Trendfy Logo"
                    className="w-20 h-20 object-contain"
                    referrerPolicy="no-referrer"
                  />
                  <span className="text-[#7f5af0]xl font-black tracking-tighter text-white">Trendfy</span>
                </div>
                <p className="text-[#8d8d99] text-lg leading-relaxed mb-10 max-w-sm font-medium">
                  A tecnologia definitiva para minerar produtos campeões e escalar operações de Dropshipping com inteligência artificial.
                </p>
                <div className="flex items-center gap-4">
                  <FooterSocialIcon icon={<Instagram className="w-5 h-5" />} />
                  <FooterSocialIcon icon={<Youtube className="w-5 h-5" />} />
                  <FooterSocialIcon icon={<Twitter className="w-5 h-5" />} />
                  <FooterSocialIcon icon={<Linkedin className="w-5 h-5" />} />
                </div>
              </div>

              <FooterColumn title="Produto" links={['Explorar', 'Produtos Virais', 'Vídeos Virais', 'Ranking Criadores', 'Lojas Monitoradas']} />
              <FooterColumn title={t('ferramentas')} links={['Extensão Chrome', 'Calculadora ROI', 'Nicho Tracker', 'Ads Analytics']} />
              <FooterColumn title="Educação" links={['Creator Academy', 'Blog', 'Documentação API', 'Webinars']} />
              <FooterColumn title="Legal" links={['Termos de Uso', 'Privacidade', 'Cookies', 'Contato']} />
            </div>

            <div className="pt-12 border-t border-[#1e1f26] flex flex-col md:flex-row items-center justify-between gap-5 md:gap-8">
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 md:gap-10">
                <span className="text-[#5b5b7b] text-sm font-bold tracking-tight">© 2025 Trendfy. All rights reserved.</span>
                <div className="flex items-center gap-6">
                  <a href="#" className="text-[#5b5b7b] hover:text-white text-xs font-bold transition-colors uppercase tracking-widest">{t('status')}</a>
                  <a href="#" className="text-[#5b5b7b] hover:text-white text-xs font-bold transition-colors uppercase tracking-widest">{t('sistemas')}</a>
                </div>
              </div>

              <div className="flex items-center gap-5 md:gap-8">
                <div className="flex items-center gap-2 px-4 py-2 bg-[#14151a] rounded-xl border border-[#1e1f26] shadow-inner">
                  <div className="w-2 h-2 bg-[#00b37e] rounded-full shadow-[0_0_8px_rgba(0,179,126,1)]"></div>
                  <span className="text-[10px] font-black text-white/80 uppercase tracking-[0.2em]">{t('serversOnline')}</span>
                </div>
                <div
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="flex items-center gap-3 px-4 py-2 bg-[#14151a] rounded-xl border border-[#1e1f26] cursor-pointer hover:border-[#3B82F6]/20 transition-all relative"
                >
                  <img src="https://flagcdn.com/w20/br.png" width="16" alt="" className="rounded-[1px]" />
                  <span className="text-[11px] font-bold text-[#8d8d99]">{t('portugues')}</span>
                  <ChevronRight className={`w-3 h-3 text-[#5b5b7b] transition-transform ${isLangMenuOpen ? '-rotate-90' : 'rotate-90'}`} />
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </LanguageContext.Provider>
  );
};

// --- Dropdown Components ---
const DropdownToolItem: React.FC<{ label: string; badge?: string; isActive?: boolean; onClick?: () => void }> = ({ label, badge, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-between px-4 py-3.5 rounded-xl transition-all group/item text-left w-full ${isActive ? 'bg-[#3B82F6]/10 border border-[#3B82F6]/20' : 'hover:bg-[#2d2d33]'}`}
  >
    <span className={`font-semibold text-[15px] transition-colors ${isActive ? 'text-[#3B82F6]' : 'text-[#8d8d99] group-hover/item:text-white'}`}>{label}</span>
    {badge && (
      <span className="px-1.5 py-0.5 bg-[#3B82F6] text-white text-[9px] font-black rounded-sm uppercase tracking-tighter">
        {badge}
      </span>
    )}
  </button>
);

// --- Footer Components ---
const FooterColumn: React.FC<{ title: string, links: string[] }> = ({ title, links }) => (
  <div className="flex flex-col gap-6">
    <h4 className="text-[11px] font-black text-white/40 uppercase tracking-[0.3em] mb-2">{title}</h4>
    <div className="flex flex-col gap-4">
      {links.map(link => (
        <a key={link} href="#" className="text-[#8d8d99] hover:text-[#3B82F6] transition-colors text-[15px] font-bold tracking-tight">{link}</a>
      ))}
    </div>
  </div>
);

const FooterSocialIcon: React.FC<{ icon: React.ReactNode }> = ({ icon }) => (
  <a href="#" className="w-11 h-11 bg-[#14151a] border border-[#1e1f26] rounded-2xl flex items-center justify-center text-[#5b5b7b] hover:text-white hover:border-[#3B82F6]/40 hover:bg-[#3B82F6]/5 transition-all shadow-lg">
    {icon}
  </a>
);

// --- EXPLORE PAGE VIEW ---
const ExploreView: React.FC<{ products: ProductExplore[], onGoToAcademy: () => void, onGoToProducts: () => void }> = ({ products, onGoToAcademy, onGoToProducts }) => (
  <main className="max-w-[1400px] mx-auto px-6 py-6 md:py-10">
    <div className="bg-[#1F2028] rounded-3xl p-6 md:p-10 border border-[#2C2D38]/30 flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-0 mb-8 md:mb-12 relative overflow-hidden min-h-[160px] shadow-2xl">
      <div className="hidden md:flex absolute left-10 top-1/2 -translate-y-1/2 items-center gap-4">
        <div className="w-14 h-14 bg-[#14151a] rounded-2xl flex items-center justify-center relative shadow-2xl border border-white/5">
          <LayoutGrid className="w-7 h-7 text-[#5b5b7b]" />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#3B82F6] rounded-lg flex items-center justify-center shadow-lg">
            <TrendingUp className="w-3.5 h-3.5 text-white" />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center text-center md:text-left gap-4 md:gap-8 mx-auto z-10 py-4 md:py-0">
        <h2 className="text-xl md:text-2xl font-black flex flex-col md:flex-row items-center gap-2 md:gap-6">
          <span className="text-[#3B82F6]">Novo no Trendfy?</span>
          <span className="hidden md:block w-[1px] h-10 bg-white/10"></span>
          <span className="text-[#a8a8b3] text-sm md:text-xl font-medium mt-1 md:mt-0">Acelere seus resultados com a Creator Academy</span>
        </h2>
        <button
          onClick={onGoToAcademy}
          className="bg-gradient-to-r from-[#5142f5] to-[#7f5af0] hover:opacity-90 text-white px-6 md:px-10 py-4 rounded-2xl text-base font-black flex items-center gap-3 transition-all shadow-2xl shadow-[#5142f5]/40 transform hover:scale-[1.03]"
        >
          Acessar Academy
          <GraduationCap className="w-6 h-6" />
        </button>
      </div>

      <div className="hidden md:block absolute right-10 top-1/2 -translate-y-1/2">
        <div className="w-14 h-14 bg-[#14151a] rounded-2xl flex items-center justify-center border border-white/5 shadow-2xl">
          <Monitor className="w-7 h-7 text-[#5b5b7b]" />
        </div>
      </div>
    </div>

    <div className="relative mb-12">
      <input
        type="text"
        placeholder="Pesquise produtos, lojas ou criadores..."
        className="w-full bg-[#14151a] border border-[#1e1f26] rounded-[32px] py-6 px-6 md:px-10 text-base text-[#e1e1e6] placeholder:text-[#5b5b7b] focus:outline-none focus:border-[#3B82F6]/50 transition-colors h-16 md:h-20 shadow-2xl text-sm md:text-base"
      />
      <button className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-[#3B82F6] rounded-2xl hover:bg-[#4338ca] transition-all shadow-xl hover:scale-105 active:scale-95">
        <Search className="w-7 h-7 text-white" />
      </button>
    </div>

    <div className="bg-[#14151a] border border-[#1e1f26] rounded-[40px] p-6 md:p-10 mb-16 relative shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8 relative">
        <div className="shrink-0 w-12 h-12 md:w-14 md:h-14 bg-[#24242a] rounded-2xl md:rounded-3xl flex items-center justify-center border border-[#1e1f26] shadow-inner mt-1 md:mt-0">
          <Sparkles className="w-7 h-7 text-[#4d4dff]" />
        </div>
        <div className="flex-1 pr-0 md:pr-20">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3 md:mb-4 pr-16 md:pr-0">
            <h3 className="text-2xl font-black text-white tracking-tight">Dica do Dia</h3>
            <span className="px-4 py-1.5 bg-[#4d4dff]/10 border border-[#4d4dff]/20 text-[#4d4dff] rounded-xl text-[11px] font-black uppercase tracking-[0.25em]">AI Insights</span>
          </div>
          <p className="text-[#a8a8b3] text-lg leading-relaxed font-medium">
            <span className="font-black text-white">A Regra dos 2 Segundos:</span> Se o produto não aparece nos primeiros 2 segundos do vídeo, você perde 70% da audiência. O TikTok analisa os primeiros frames para decidir para quem mostrar.
          </p>
        </div>
        <div className="absolute md:relative top-0 right-0 md:top-auto md:right-auto text-[#5b5b7b] text-sm font-black tabular-nums bg-[#0b0c10] px-5 py-2.5 rounded-2xl border border-[#1e1f26]">1 / 20</div>
      </div>

      <div className="mt-8 md:mt-10 bg-[#14151a] border border-[#1e1f26] rounded-2xl md:rounded-3xl p-4 md:p-8 flex flex-col md:flex-row md:items-start gap-4 md:gap-6 shadow-inner">
        <div className="p-3 bg-[#1c1c21] rounded-2xl">
          <Zap className="w-6 h-6 text-[#4d4dff]" />
        </div>
        <div>
          <span className="text-[11px] font-black text-[#5b5b7b] uppercase tracking-[0.3em] block mb-3">AÇÃO RECOMENDADA</span>
          <p className="text-base font-bold text-[#a8a8b3]">Comece SEMPRE com o produto na mão ou em close-up antes de qualquer introdução para maximizar o retencimento.</p>
        </div>
      </div>

      <div className="hidden md:flex absolute right-10 top-1/2 -translate-y-1/2 flex flex-col gap-6 md:gap-10">
        <button className="text-[#5b5b7b] hover:text-white transition-all transform hover:scale-125"><ChevronLeft className="w-8 h-8 rotate-90" /></button>
        <button className="text-[#5b5b7b] hover:text-white transition-all transform hover:scale-125"><ChevronLeft className="w-8 h-8 -rotate-90" /></button>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mb-24">
      <FeatureExploreCard icon={<Package className="w-7 h-7 text-[#3B82F6]" />} title="Produtos em Tendência" description="Identifique agora quais produtos estão escalando e gerando lucro real." onClick={onGoToProducts} />
      <FeatureExploreCard icon={<Wand2 className="w-7 h-7 text-[#3B82F6]" />} title="Influencer IA" description="Crie roteiros e vídeos UGC altamente persuasivos com inteligência artificial." onClick={() => { }} />
      <FeatureExploreCard icon={<Eye className="w-7 h-7 text-[#3B82F6]" />} title="Análise de Concorrentes" description="Espione estratégias, faturamento e criativos das maiores lojas do mercado." onClick={() => { }} />
      <FeatureExploreCard icon={<Video className="w-7 h-7 text-[#3B82F6]" />} title="Vídeos Virais" description="Base de dados with os criativos que mais converteram nas últimas 24h." onClick={() => { }} />
    </div>

    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-0 mb-8 md:mb-12">
        <div className="flex items-center gap-4">
          <Flame className="w-7 h-7 text-[#3B82F6]" />
          <h2 className="text-[#7f5af0]xl font-black text-white tracking-tighter">Top Produtos (24h)</h2>
        </div>
        <button onClick={onGoToProducts} className="text-[13px] font-black text-[#3B82F6] flex items-center gap-2 hover:underline underline-offset-[12px] transition-all uppercase tracking-[0.2em]">
          Expandir Ranking <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
        {products.map((product) => (
          <div key={product.id} className="bg-[#14151a] border border-[#1e1f26] rounded-[32px] overflow-hidden group cursor-pointer hover:border-[#3B82F6]/40 transition-all shadow-2xl">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#24242a]">
              <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="" />
              <div className="absolute top-5 left-5 px-4 py-1.5 bg-[#f59e0b] text-white rounded-xl text-xs font-black shadow-2xl border border-white/10">#{product.rank}</div>
            </div>
            <div className="p-5 md:p-8">
              <h4 className="text-lg font-bold text-white mb-5 truncate tracking-tight">{product.title}</h4>
              <div className="flex flex-col gap-2">
                <span className="text-[9px] text-[#8d8d99] font-medium uppercase tracking-wider">RECEITA ESTIMADA</span>
                <div className="flex items-end justify-between">
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-xs font-medium text-[#3B82F6]/70">R$</span>
                    <span className="text-lg font-semibold text-[#3B82F6] leading-none tracking-tight">{product.revenue.replace('R$ ', '')}</span>
                  </div>
                  <span className="text-[10px] font-medium text-[#8d8d99] leading-none">{product.priceRange}</span>
                </div>
              </div>

              {product.productUrl && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(product.productUrl, '_blank');
                  }}
                  className="mt-6 w-full bg-[#1c1c21] hover:bg-[#2a2a32] border border-[#1e1f26] hover:border-[#3B82F6]/30 text-white py-3 rounded-2xl font-black text-[11px] uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#3B82F6]" /> Ver Produto
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </main>
);

const FeatureExploreCard: React.FC<{ icon: React.ReactNode, title: string, description: string, onClick: () => void }> = ({ icon, title, description, onClick }) => (
  <div onClick={onClick} className="bg-[#14151a] border border-[#1e1f26] rounded-[32px] p-6 md:p-10 flex items-center gap-5 md:gap-8 hover:border-[#3B82F6]/40 transition-all cursor-pointer group shadow-2xl">
    <div className="w-16 h-16 bg-[#1F2028] rounded-[24px] flex items-center justify-center border border-[#2C2D38] shadow-inner group-hover:scale-110 transition-transform duration-500">
      {icon}
    </div>
    <div className="flex-1">
      <h4 className="font-black text-white text-xl mb-2 group-hover:text-[#3B82F6] transition-colors">{title}</h4>
      <p className="text-[#8d8d99] text-base font-medium leading-relaxed">{description}</p>
    </div>
  </div>
);

// --- PRODUCTS PAGE VIEW ---
const ProductsView: React.FC<{ products: ProductViral[] }> = ({ products }) => (
  <main className="max-w-[1400px] mx-auto px-6 py-6 md:py-10">
    <div className="bg-[#0c0c0e] border border-[#1c1c1f] rounded-[40px] p-6 md:p-12 lg:p-14 mb-16 relative overflow-hidden shadow-2xl">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 md:gap-12">
        <div className="flex flex-col gap-4">
          <h1 className="text-[44px] font-black text-white tracking-tighter leading-none">Produtos Virais</h1>
          <p className="text-[#5b5b7b] text-base font-medium">Identifique tendências antes dos concorrentes</p>

          <div className="mt-8 flex items-center gap-3 bg-[#101915] border border-[#1b3d2b] px-5 py-2 rounded-full w-fit">
            <div className="w-2.5 h-2.5 bg-[#00b37e] rounded-full shadow-[0_0_10px_rgba(0,179,126,0.8)]"></div>
            <span className="text-[11px] font-black uppercase tracking-[0.25em] text-[#00b37e]">SISTEMA ONLINE • MINERANDO</span>
          </div>
        </div>

        <div className="flex items-stretch gap-px bg-[#1c1c1f] p-[1.5px] rounded-[32px] overflow-hidden shadow-2xl min-w-[460px]">
          <div className="bg-[#0b0c10] flex-1 px-8 py-6 md:py-10 flex flex-col items-center justify-center gap-1 border-r border-[#1c1c1f] relative group">
            <div className="absolute top-4 left-4 opacity-20 group-hover:opacity-40 transition-opacity">
              <Package size={16} className="text-[#5b5b7b]" />
            </div>
            <span className="text-3xl md:text-5xl font-black text-white leading-none tracking-tighter">18</span>
            <span className="text-[10px] font-black text-[#5b5b7b] uppercase tracking-[0.3em] mt-4 flex items-center gap-2">
              <span className="w-1 h-1 bg-[#5b5b7b] rounded-full"></span>
              Novos Produtos
            </span>
          </div>

          <div className="bg-[#0b0c10] flex-[1.4] px-8 py-6 md:py-10 flex flex-col items-center justify-center gap-1 relative group">
            <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity">
              <TrendingUp size={16} className="text-[#00b37e]" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-[#00b37e]/60 leading-none">R$</span>
              <span className="text-3xl md:text-5xl font-black text-[#00b37e] leading-none tracking-tighter">3.9M</span>
            </div>
            <span className="text-[10px] font-black text-[#5b5b7b] uppercase tracking-[0.3em] mt-4 flex items-center gap-2">
              <span className="w-1 h-1 bg-[#00b37e] rounded-full animate-pulse"></span>
              Receita Detectada
            </span>
          </div>
        </div>
      </div>

      {/* Modern Horizontal Separator / Selection Bar */}
      <div className="mt-20 flex flex-col gap-6">
        <div className="flex items-end justify-between px-2">
          <div className="flex items-center gap-6 md:gap-12">
            <span className="text-[12px] font-black text-[#5b5b7b] uppercase tracking-[0.2em] cursor-pointer hover:text-white transition-colors">00:00 - 06:00</span>
            <span className="text-[12px] font-black text-[#5b5b7b] uppercase tracking-[0.2em] cursor-pointer hover:text-white transition-colors">06:00 - 12:00</span>
            <span className="text-[12px] font-black text-[#5b5b7b] uppercase tracking-[0.2em] cursor-pointer hover:text-white transition-colors">12:00 - 18:00</span>
            <span className="text-[12px] font-black text-white uppercase tracking-[0.2em] cursor-default">18:00 - 00:00</span>
          </div>

          <div className="flex flex-col items-end gap-1">
            <span className="text-[10px] font-black text-[#5b5b7b] uppercase tracking-[0.3em] opacity-80">PRÓXIMA ATUALIZAÇÃO EM:</span>
            <span className="text-[#7f5af0]xl font-black text-white tabular-nums tracking-tighter">04:35:11</span>
          </div>
        </div>

        <div className="relative w-full h-[3px] bg-[#1c1c1f] rounded-full overflow-hidden">
          {/* The active marker matching the screenshot placement under 18:00-00:00 */}
          <div className="absolute right-0 w-1/4 h-full bg-[#3B82F6] shadow-[0_0_15px_rgba(81,66,245,0.5)]"></div>
        </div>
      </div>
    </div>

    {/* IDENTICAL FILTERS BUTTONS AS PER REFERENCE */}
    <div className="flex items-center gap-3 mb-10 px-2">
      <button className="bg-[#3B82F6] text-white px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-[0.15em] flex items-center gap-2 shadow-lg shadow-[#3B82F6]/20 transition-all hover:scale-105 active:scale-95">
        <LayoutGrid className="w-4 h-4 fill-white" />
        Todos os Produtos
      </button>
      <button className="bg-[#14151a] border border-[#1e1f26] text-[#8d8d99] px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-[0.15em] flex items-center gap-2 transition-all hover:bg-[#24242a] hover:border-[#44444f] hover:text-white">
        <Sparkles className="w-4 h-4" />
        Dividir por Nicho
      </button>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
      {products.map((p) => (
        <ViralCard key={p.id} product={p} />
      ))}
    </div>
  </main>
);

const ViralCard: React.FC<{ product: ProductViral }> = ({ product }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="bg-[#14151a] border border-[#1e1f26] rounded-[48px] overflow-hidden group hover:border-[#3B82F6]/40 transition-all flex flex-col h-full shadow-2xl relative">
      {/* PRODUCT IMAGE SECTION */}
      <div className="p-5 pb-2">
        <div
          className="relative aspect-square overflow-hidden rounded-[36px] bg-[#0c0c0e] border border-white/5 cursor-pointer"
          onClick={() => product.videoUrl && setIsPlaying(true)}
        >
          {isPlaying && product.videoUrl ? (
            <iframe
              src={`${product.videoUrl}?autoplay=1`}
              className="w-full h-full border-0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <>
              <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />

              {/* SMALL RANK BADGE - PILL SHAPED */}
              <div className="absolute top-4 left-4 flex items-center gap-1.5 px-4 py-1.5 bg-[#3B82F6] rounded-full text-[10px] font-black text-white shadow-xl">
                <Flame className="w-3.5 h-3.5 fill-white" /> Top #{product.rank}
              </div>

              {/* SMALL PRICE BADGE - DARK GREY PILL */}
              <div className="absolute top-4 right-4 px-4 py-1.5 bg-[#14151a]/90 backdrop-blur-xl border border-white/5 rounded-full text-[10px] font-black text-white flex items-center gap-1.5 shadow-lg">
                <span className="text-[#00b37e] font-black">$</span> {product.priceRange}
              </div>

              {product.videoUrl && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#0b0c10]/20 group-hover:bg-[#0b0c10]/40 transition-colors">
                  <div className="w-16 h-16 bg-[#3B82F6] rounded-full flex items-center justify-center shadow-2xl shadow-[#3B82F6]/50 transform group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-white fill-current translate-x-1" />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* CONTENT SECTION - RECONFIGURED FOR PERFECT HIERARCHY */}
      <div className="px-6 md:px-10 pb-10 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-white mb-3 leading-tight tracking-tight group-hover:text-[#3B82F6] transition-colors">{product.title}</h3>

        <div className="mb-6 flex items-center gap-2">
          <span className="inline-block bg-[#14151a] text-[#8d8d99] px-3 py-1.5 rounded-lg text-[9px] font-medium uppercase tracking-wider border border-[#1e1f26]">
            {product.category}
          </span>
          {product.highDemand && (
            <span className="inline-block bg-[#ff8c00]/10 text-[#ff8c00] px-3 py-1.5 rounded-lg text-[9px] font-medium uppercase tracking-wider border border-[#ff8c00]/20 flex items-center gap-1">
              <Flame className="w-3 h-3 fill-current" /> Alta Demanda
            </span>
          )}
        </div>

        <div className="flex items-end justify-between mt-auto mb-8 pt-4 gap-4">
          <div className="flex flex-col">
            <span className="text-[9px] font-medium text-[#8d8d99] uppercase tracking-wider block mb-2">RECEITA EST.</span>
            <div className="flex items-baseline gap-0.5">
              <span className="text-[#3B82F6]/70 font-medium text-sm leading-none">R$</span>
              <span className="text-xl font-semibold text-[#3B82F6] tracking-tight leading-none">{product.revenue.replace('R$ ', '')}</span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[9px] font-medium text-[#8d8d99] uppercase tracking-wider block mb-2">vendidos</span>
            <span className="text-xl font-semibold text-white tracking-tight leading-none">{product.sales}</span>
          </div>
        </div>

        <button
          onClick={() => product.productUrl && window.open(product.productUrl, '_blank')}
          className="w-full bg-[#3B82F6] hover:bg-[#4338ca] text-white py-5 rounded-[28px] font-black text-[17px] uppercase tracking-[0.02em] flex items-center justify-center gap-2.5 transition-all shadow-[0_15px_40px_rgba(81,66,245,0.3)] hover:scale-[1.02] active:scale-[0.98]"
        >
          <ExternalLink className="w-5.5 h-5.5 stroke-[3px]" /> Ver Produto
        </button>
      </div>
    </div>
  );
};

// --- VIDEOS PAGE VIEW ---
const VideosView: React.FC = () => {
  const baseVideos: VideoViral[] = [
    {
      id: 'v1',
      rank: 1,
      thumbnail: 'https://i.imgur.com/J3Lxu2L.jpg',
      sales6h: '456 vendas',
      revenue6h: 'R$ 102.783',
      productTitle: 'Body Splash My Sweet Delight',
      productImage: 'https://i.imgur.com/abvTKk4.jpeg',
      directVideoUrl: 'https://www.tiktok.com/@cpandolfi_/video/7557686769769057592?_r=1&_t=ZS-93n0ckKLsiz',
      tiktokId: '7557686769769057592',
      creatorName: '@cpandolfi_',
      profileUrl: 'https://www.tiktok.com/@cpandolfi_?_r=1&_t=ZS-94AhN9JHPG6'
    },
    {
      id: 'v2',
      rank: 2,
      thumbnail: 'https://i.imgur.com/CDRqObe.jpg',
      sales6h: '220 vendas',
      revenue6h: 'R$ 38.400,00',
      productTitle: 'Garrafa Hilee Frutas',
      productImage: 'https://i.imgur.com/9p2m7Yc.png',
      directVideoUrl: 'https://www.tiktok.com/@hilee6708/video/7527246822444748038',
      tiktokId: '7527246822444748038',
      creatorName: '@achadinhos_br',
      profileUrl: 'https://www.tiktok.com/@hilee6708?_r=1&_t=ZS-94AhPxOlcrn'
    },
    {
      id: 'v3',
      rank: 3,
      thumbnail: 'https://i.imgur.com/rXbAqp2.jpg',
      sales6h: '280 vendas',
      revenue6h: 'R$ 51.200,80',
      productTitle: 'Camiseta Cristã Oversized',
      productImage: 'https://i.imgur.com/7mwfTvl.png',
      directVideoUrl: 'https://www.tiktok.com/@camilasantoscreator/video/7594975179671915784',
      tiktokId: '7594975179671915784',
      profileUrl: 'https://www.tiktok.com/@camilasantoscreator?_r=1&_t=ZS-94AhSABP8Rr'
    },
    {
      id: 'v4',
      rank: 4,
      thumbnail: 'https://i.imgur.com/h7MhRYy.jpg',
      sales6h: '342 vendas',
      revenue6h: 'R$ 67.892',
      productTitle: 'Copo Térmico Inox 1.2L',
      productImage: 'https://i.imgur.com/eDa6uiJ.jpeg',
      directVideoUrl: 'https://www.tiktok.com/@freyashop50/video/7583349025865518354?_r=1&_t=ZS-93n3T8psEyK',
      tiktokId: '7583349025865518354',
      profileUrl: 'https://www.tiktok.com/@freyashop50?_r=1&_t=ZS-94AhUseL2Wd'
    },
    {
      id: 'v5',
      rank: 5,
      thumbnail: 'https://i.imgur.com/zXvxIoG.jpg',
      sales6h: '300 vendas',
      revenue6h: 'R$ 55.400,00',
      productTitle: 'Camiseta Cristã Oversized',
      productImage: 'https://i.imgur.com/7mwfTvl.png',
      directVideoUrl: 'https://www.tiktok.com/@vibeshop02/video/7589813893975788807',
      tiktokId: '7589813893975788807',
      profileUrl: 'https://www.tiktok.com/@freyashop50?_r=1&_t=ZS-94AhUseL2Wd'
    },
    {
      id: 'v6',
      rank: 6,
      thumbnail: 'https://i.imgur.com/loNFIe1.jpg',
      sales6h: '103 vendas',
      revenue6h: 'R$ 89.456',
      productTitle: 'Bike Spinning Profissional',
      productImage: 'https://i.imgur.com/qVrhfOT.png',
      directVideoUrl: 'https://www.tiktok.com/@lojarafapandashop/video/7597133803454205191?_r=1&_t=ZS-93n3ciQnjW9',
      tiktokId: '7597133803454205191',
      profileUrl: 'https://www.tiktok.com/@lojarafapandashop?_r=1&_t=ZS-94AhX7At94k'
    },
    {
      id: 'v7',
      rank: 7,
      thumbnail: 'https://i.imgur.com/AjwPUqT.jpg',
      sales6h: '400 vendas',
      revenue6h: 'R$ 82.300,00',
      productTitle: 'Body Splash My Sweet Delight',
      productImage: 'https://i.imgur.com/CuGB2DW.png',
      directVideoUrl: 'https://www.tiktok.com/@lucasbrigatobr/video/7584096481305496852',
      tiktokId: '7584096481305496852',
      profileUrl: 'https://www.tiktok.com/@lucasbrigatobr?_r=1&_t=ZS-94AhYQAFKaY'
    },
    {
      id: 'v8',
      rank: 8,
      thumbnail: 'https://i.imgur.com/MqN6q8F.jpg',
      sales6h: '387 vendas',
      revenue6h: 'R$ 112.438',
      productTitle: 'Perfume Attracione Men',
      productImage: 'https://i.imgur.com/vQceZIK.jpeg',
      directVideoUrl: 'https://www.tiktok.com/@diegoshopof/video/7579668274087038215?_r=1&_t=ZS-93n3Z2fh2eb',
      tiktokId: '7579668274087038215',
      profileUrl: 'https://www.tiktok.com/@diegoshopof?_r=1&_t=ZS-94AhatPLxEw'
    },
    {
      id: 'v9',
      rank: 9,
      thumbnail: 'https://i.imgur.com/6cs5QU2.jpg',
      sales6h: '298 vendas',
      revenue6h: 'R$ 58.234',
      productTitle: 'Copo Térmico Inox 1.2L',
      productImage: 'https://i.imgur.com/eDa6uiJ.jpeg',
      directVideoUrl: 'https://www.tiktok.com/@menteblindada3247/video/7578877519135264008?_r=1&_t=ZS-93n3VO8ei7p',
      tiktokId: '7578877519135264008',
      profileUrl: ''
    },
    {
      id: 'v10',
      rank: 10,
      thumbnail: 'https://i.imgur.com/th79zNO.jpg',
      sales6h: '320 vendas',
      revenue6h: 'R$ 65.400,00',
      productTitle: 'Kit Body Splash Masculino',
      productImage: 'https://i.imgur.com/CuGB2DW.png',
      directVideoUrl: 'https://www.tiktok.com/@ofertastkshop/video/7600464442240814357',
      tiktokId: '7600464442240814357',
      profileUrl: 'https://www.tiktok.com/@ofertastkshop?_r=1&_t=ZS-94Ahf7UpOZG'
    },
    {
      id: 'v11',
      rank: 11,
      thumbnail: 'https://i.imgur.com/yIr6Q58.jpg',
      sales6h: '142 vendas',
      revenue6h: 'R$ 87.456',
      productTitle: 'Parafusadeira Furadeira 48v',
      productImage: 'https://i.imgur.com/4MEt6WH.jpeg',
      directVideoUrl: 'https://www.tiktok.com/@renan_soares_shop/video/7581503791653063943?_r=1&_t=ZS-93n39RgzFyv',
      tiktokId: '7581503791653063943',
      profileUrl: 'https://www.tiktok.com/@renan_soares_shop?_r=1&_t=ZS-94AhhDcSL6V'
    },
    {
      id: 'v12',
      rank: 12,
      thumbnail: 'https://i.imgur.com/T86Pdox.jpg',
      sales6h: '480 vendas',
      revenue6h: 'R$ 142.600,00',
      productTitle: 'Conjunto Fitness Canelado 3D',
      productImage: 'https://i.imgur.com/uXXMxIb.png',
      directVideoUrl: 'https://www.tiktok.com/@sulasimao2/video/7571853298005806337',
      tiktokId: '7571853298005806337',
      profileUrl: 'https://www.tiktok.com/@sulasimao2?_r=1&_t=ZS-94AhhunBDrG'
    },
    {
      id: 'v13',
      rank: 13,
      thumbnail: 'https://i.imgur.com/IMNDlTM.jpg',
      sales6h: '340 vendas',
      revenue6h: 'R$ 56.700,50',
      productTitle: 'Bolsa Feminina Couro Transversal',
      productImage: 'https://i.imgur.com/9cNgCYt.png',
      directVideoUrl: 'https://www.tiktok.com/@anajulia54335/video/7578883225083268360',
      tiktokId: '7578883225083268360',
      profileUrl: 'https://www.tiktok.com/@anajulia54335?_r=1&_t=ZS-94AhkLVuAop'
    },
    {
      id: 'v14',
      rank: 14,
      thumbnail: 'https://i.imgur.com/QoyFGSM.jpg',
      sales6h: '360 vendas',
      revenue6h: 'R$ 62.400,00',
      productTitle: 'Mochila CHL Reforçada',
      productImage: 'https://i.imgur.com/LsdzL8M.png',
      directVideoUrl: 'https://www.tiktok.com/@lunabshopp/video/7581095904665505031',
      tiktokId: '7581095904665505031',
      profileUrl: 'https://www.tiktok.com/@lunabshopp?_r=1&_t=ZS-94AhlM3vXuM'
    },
    {
      id: 'v15',
      rank: 15,
      thumbnail: 'https://i.imgur.com/NGqa38X.jpg',
      sales6h: '200 vendas',
      revenue6h: 'R$ 35.100,20',
      productTitle: 'Garrafa Hilee Frutas',
      productImage: 'https://i.imgur.com/9p2m7Yc.png',
      directVideoUrl: 'https://www.tiktok.com/@lavinyassis/video/7599830545345907986',
      tiktokId: '7599830545345907986',
      profileUrl: 'https://www.tiktok.com/@lavinyassis?_r=1&_t=ZS-94AhnNPEIaI'
    },
    {
      id: 'v16',
      rank: 16,
      thumbnail: 'https://i.imgur.com/JHEnnws.jpg',
      sales6h: '380 vendas',
      revenue6h: 'R$ 138.400,50',
      productTitle: 'Kit Panelas Premium 18 Peças',
      productImage: 'https://i.imgur.com/SUa5AZ3.jpeg',
      directVideoUrl: 'https://www.tiktok.com/@clubpromolovers/video/7587112722446273799',
      tiktokId: '7587112722446273799',
      profileUrl: 'https://www.tiktok.com/@clubpromolovers?_r=1&_t=ZS-94AhnxqQGvf'
    },
    {
      id: 'v17',
      rank: 17,
      thumbnail: 'https://i.imgur.com/6obNARD.jpg',
      sales6h: '438 vendas',
      revenue6h: 'R$ 98.743',
      productTitle: 'Conjunto Fitness Canelado 3D',
      productImage: 'https://i.imgur.com/uXXMxIb.png',
      directVideoUrl: 'https://www.tiktok.com/@helena.tiktokshop2/video/7601664671120149767?_r=1&_t=ZS-93n3Hq0a5zQ',
      tiktokId: '7601664671120149767',
      profileUrl: 'https://www.tiktok.com/@helena.tiktokshop2?_r=1&_t=ZS-94AhpF14T5E'
    },
    {
      id: 'v18',
      rank: 18,
      thumbnail: 'https://i.imgur.com/2KpvG59.jpg',
      sales6h: '400 vendas',
      revenue6h: 'R$ 145.600,00',
      productTitle: 'Kit Panelas Premium 18 Peças',
      productImage: 'https://i.imgur.com/SUa5AZ3.jpeg',
      directVideoUrl: 'https://www.tiktok.com/@forrotophits/video/7595699018152316167',
      tiktokId: '7595699018152316167',
      profileUrl: 'https://www.tiktok.com/@forrotophits?_r=1&_t=ZS-94AhsNsynF1'
    },
    {
      id: 'v19',
      rank: 19,
      thumbnail: 'https://i.imgur.com/Gk8HAif.jpg',
      sales6h: '340 vendas',
      revenue6h: 'R$ 58.200,00',
      productTitle: 'Regata Fitness Alça Fina',
      productImage: 'https://i.imgur.com/9aYt8Mi.jpeg',
      directVideoUrl: 'https://www.tiktok.com/@jujusampaio09/video/7589143943829490965',
      tiktokId: '7589143943829490965',
      profileUrl: 'https://www.tiktok.com/@jujusampaio09?_r=1&_t=ZS-94AhtJ227bG'
    },
    {
      id: 'v20',
      rank: 20,
      thumbnail: 'https://i.imgur.com/I7BIROn.jpg',
      sales6h: '238 vendas',
      revenue6h: 'R$ 47.698',
      productTitle: 'Bermuda Compressão 2em1',
      productImage: 'https://i.imgur.com/cx5mdyh.png',
      directVideoUrl: 'https://www.tiktok.com/@bext.store/video/7597356512758992129?_r=1&_t=ZS-93n3mEjOAXV',
      tiktokId: '7597356512758992129',
      profileUrl: 'https://www.tiktok.com/@bext.store?_r=1&_t=ZS-94AhuTQd0mg'
    },
    {
      id: 'v21',
      rank: 21,
      thumbnail: 'https://i.imgur.com/0MLfMGM.jpg',
      sales6h: '387 vendas',
      revenue6h: 'R$ 89.247',
      productTitle: 'Body Splash My Sweet Delight',
      productImage: 'https://i.imgur.com/eDa6uiJ.jpeg',
      directVideoUrl: 'https://www.tiktok.com/@luciana.mendes.vr/video/7578624098083900693',
      tiktokId: '7578624098083900693',
      profileUrl: 'https://www.tiktok.com/@luciana.mendes.vr?_r=1&_t=ZS-94AiHRq1L6d'
    },
    {
      id: 'v22',
      rank: 22,
      thumbnail: 'https://i.imgur.com/Dd2VM66.jpg',
      sales6h: '114 vendas',
      revenue6h: 'R$ 97.863',
      productTitle: 'Bike Spinning Profissional',
      productImage: 'https://i.imgur.com/qVrhfOT.png',
      directVideoUrl: 'https://www.tiktok.com/@rafapandashop/video/7596726762986310919?_r=1&_t=ZS-93n3awCUEqr',
      tiktokId: '7596726762986310919',
      profileUrl: 'https://www.tiktok.com/@rafapandashop?_r=1&_t=ZS-94AiK6zzU1g'
    },
    {
      id: 'v23',
      rank: 23,
      thumbnail: 'https://i.imgur.com/BJXY5wB.jpg',
      sales6h: '298 vendas',
      revenue6h: 'R$ 48.932',
      productTitle: 'Depilador Facial Sem Fio',
      productImage: 'https://i.imgur.com/xnQ3DH6.jpeg',
      directVideoUrl: 'https://www.tiktok.com/@ruivadofuturo/video/7534765849517886725?_r=1&_t=ZS-93n36okghfh',
      tiktokId: '7534765849517886725',
      profileUrl: 'https://www.tiktok.com/@ruivadofuturo?_r=1&_t=ZS-94AiKNtiqT1'
    },
    {
      id: 'v24',
      rank: 24,
      thumbnail: 'https://i.imgur.com/ewGLcta.jpg',
      sales6h: '489 vendas',
      revenue6h: 'R$ 114.534',
      productTitle: 'Conjunto Fitness Canelado 3D',
      productImage: 'https://i.imgur.com/uXXMxIb.png',
      directVideoUrl: 'https://www.tiktok.com/@tthaisrodrigues_/video/7574436238338411784?_r=1&_t=ZS-93n3InTUkhp',
      tiktokId: '7574436238338411784',
      profileUrl: 'https://www.tiktok.com/@tthaisrodrigues_?_r=1&_t=ZS-94AiNkbgUyI'
    },
    {
      id: 'v25',
      rank: 25,
      thumbnail: 'https://i.imgur.com/a0RZ8CT.jpg',
      sales6h: '341 vendas',
      revenue6h: 'R$ 73.892',
      productTitle: 'Body Splash My Sweet Delight',
      productImage: 'https://i.imgur.com/abvTKk4.jpeg',
      directVideoUrl: 'https://www.tiktok.com/@suabelezaturbinada/video/7560423231891557688?_r=1&_t=ZS-93n0aYTrfMr',
      tiktokId: '7560423231891557688',
      profileUrl: 'https://www.tiktok.com/@suabelezaturbinada?_r=1&_t=ZS-94AiPN8ogKu'
    },
    {
      id: 'v26',
      rank: 26,
      thumbnail: 'https://i.imgur.com/lqcZGPh.jpg',
      sales6h: '167 vendas',
      revenue6h: 'R$ 27.834',
      productTitle: 'Garrafa Hilee Frutas',
      productImage: 'https://i.imgur.com/9p2m7Yc.png',
      directVideoUrl: 'https://www.tiktok.com/@estermucida/video/7556776626571234616?_r=1&_t=ZS-93n2tCkwrjB',
      tiktokId: '7556776626571234616',
      profileUrl: 'https://www.tiktok.com/@estermucida?_r=1&_t=ZS-94AiTgjTPuh'
    },
    {
      id: 'v27',
      rank: 27,
      thumbnail: 'https://i.imgur.com/bhxcz6w.jpg',
      sales6h: '367 vendas',
      revenue6h: 'R$ 69.874',
      productTitle: 'Máquina de Cortar Kemei',
      productImage: 'https://i.imgur.com/O9hmYqT.png',
      directVideoUrl: 'https://www.tiktok.com/@loja_pratica/video/7595156200711326994?_r=1&_t=ZS-93n3ifWBS6f',
      tiktokId: '7595156200711326994',
      profileUrl: 'https://www.tiktok.com/@loja_pratica?_r=1&_t=ZS-94AiVVyZNjz'
    },
    {
      id: 'v28',
      rank: 28,
      thumbnail: 'https://i.imgur.com/RhjnzEw.jpg',
      sales6h: '340 vendas',
      revenue6h: 'R$ 59.100,50',
      productTitle: 'Mochila CHL Reforçada',
      productImage: 'https://i.imgur.com/LsdzL8M.png',
      directVideoUrl: 'https://www.tiktok.com/@danielrecomendaofc/video/7564115919534820628',
      tiktokId: '7564115919534820628',
      profileUrl: 'https://www.tiktok.com/@danielrecomendaofc?_r=1&_t=ZS-94AiXNA0zfm'
    },
    {
      id: 'v29',
      rank: 29,
      thumbnail: 'https://i.imgur.com/8TGnQnX.jpg',
      sales6h: '374 vendas',
      revenue6h: 'R$ 103.297',
      productTitle: 'Perfume Attracione Men',
      productImage: 'https://i.imgur.com/vQceZIK.jpeg',
      directVideoUrl: 'https://www.tiktok.com/@diegoshopof/video/7579668274087038215?_r=1&_t=ZS-93n3Z2fh2eb',
      tiktokId: '7579668274087038215',
      profileUrl: 'https://www.tiktok.com/@diegoshopof?_r=1&_t=ZS-94Aia7V1bEI'
    },
    {
      id: 'v30',
      rank: 30,
      thumbnail: 'https://i.imgur.com/23yYO0V.jpg',
      sales6h: '318 vendas',
      revenue6h: 'R$ 54.738',
      productTitle: 'Bolsa Feminina Couro Transversal',
      productImage: 'https://i.imgur.com/9cNgCYt.png',
      directVideoUrl: 'https://www.tiktok.com/@chrysoliveiiraa/video/7589061704785382676?_r=1&_t=ZS-93n3eYCZDb2',
      tiktokId: '7589061704785382676',
      profileUrl: 'https://www.tiktok.com/@chrysoliveiiraa?_r=1&_t=ZS-94Aib91l01H'
    },
    {
      id: 'v31',
      rank: 31,
      thumbnail: 'https://i.imgur.com/Z8pa0Mq.jpg',
      sales6h: '320 vendas',
      revenue6h: 'R$ 55.800,20',
      productTitle: 'Mochila CHL Reforçada',
      productImage: 'https://i.imgur.com/LsdzL8M.png',
      directVideoUrl: 'https://www.tiktok.com/@dudashopttk/video/7579715417271176455',
      tiktokId: '7579715417271176455',
      profileUrl: 'https://www.tiktok.com/@dudashopttk?_r=1&_t=ZS-94AidB7ub5u'
    },
    {
      id: 'v32',
      rank: 32,
      thumbnail: 'https://i.imgur.com/cC2yfdg.jpg',
      sales6h: '360 vendas',
      revenue6h: 'R$ 64.200,80',
      productTitle: 'Máquina de Cortar Kemei',
      productImage: 'https://i.imgur.com/O9hmYqT.png',
      directVideoUrl: 'https://www.tiktok.com/@new_scud/video/7279035418249645317',
      tiktokId: '7279035418249645317',
      profileUrl: 'https://www.tiktok.com/@new_scud?_r=1&_t=ZS-94AieedYZwQ'
    },
    {
      id: 'v33',
      rank: 33,
      thumbnail: 'https://i.imgur.com/cumT3s8.jpg',
      sales6h: '180 vendas',
      revenue6h: 'R$ 32.100,50',
      productTitle: '365 Dias Amor com Deus',
      productImage: 'https://i.imgur.com/YiQXmBJ.jpeg',
      directVideoUrl: 'https://www.tiktok.com/@royalchristiann/video/7590706118893063445?_r=1&_t=ZS-93n3u3znpvI',
      tiktokId: '7590706118893063445',
      profileUrl: 'https://www.tiktok.com/@royalchristiann?_r=1&_t=ZS-94AifPMK1bj'
    },
    {
      id: 'v34',
      rank: 34,
      thumbnail: 'https://i.imgur.com/V5uFa6x.jpg',
      sales6h: '330 vendas',
      revenue6h: 'R$ 59.800,20',
      productTitle: 'Máquina de Cortar Kemei',
      productImage: 'https://i.imgur.com/O9hmYqT.png',
      directVideoUrl: 'https://www.tiktok.com/@barberinhonevou/video/7590045994864151828',
      tiktokId: '7590045994864151828',
      profileUrl: 'https://www.tiktok.com/@barberinhonevou?_r=1&_t=ZS-94AihQsgNTM'
    },
    {
      id: 'v35',
      rank: 35,
      thumbnail: 'https://i.imgur.com/xnQ45F9.jpg',
      sales6h: '274 vendas',
      revenue6h: 'R$ 43.567',
      productTitle: 'Depilador Facial Sem Fio',
      productImage: 'https://i.imgur.com/xnQ3DH6.jpeg',
      directVideoUrl: 'https://www.tiktok.com/@dailydapri37/video/7592395167605214484?_r=1&_t=ZS-93n38HQc7D2',
      tiktokId: '7592395167605214484',
      profileUrl: 'https://www.tiktok.com/@dailydapri37?_r=1&_t=ZS-94AiixiQEwq'
    },
    {
      id: 'v36',
      rank: 36,
      thumbnail: 'https://i.imgur.com/KHnCsMq.jpg',
      sales6h: '190 vendas',
      revenue6h: 'R$ 105.400,00',
      productTitle: 'Parafusadeira Furadeira 48v',
      productImage: 'https://i.imgur.com/4MEt6WH.jpeg',
      directVideoUrl: 'https://www.tiktok.com/@brancoaraujo98/video/7523728817681157381',
      tiktokId: '7523728817681157381',
      profileUrl: 'https://www.tiktok.com/@brancoaraujo98?_r=1&_t=ZS-94AilE7KInS'
    },
    {
      id: 'v37',
      rank: 37,
      thumbnail: 'https://i.imgur.com/WcPyefK.jpg',
      sales6h: '150 vendas',
      revenue6h: 'R$ 51.500,40',
      productTitle: 'Regata Fitness Alça Fina',
      productImage: 'https://i.imgur.com/9aYt8Mi.jpeg',
      directVideoUrl: 'https://www.tiktok.com/@jujusampaio09/video/7589143943829490965',
      tiktokId: '7589143943829490965',
      profileUrl: 'https://www.tiktok.com/@jujusampaio09?_r=1&_t=ZS-94Ain3kXpMw'
    },
    {
      id: 'v38',
      rank: 38,
      thumbnail: 'https://i.imgur.com/bJz7mFA.jpg',
      sales6h: '210 vendas',
      revenue6h: 'R$ 38.450,00',
      productTitle: 'Garrafa Hilee Frutas',
      productImage: 'https://i.imgur.com/9p2m7Yc.png',
      directVideoUrl: 'https://www.tiktok.com/@hilee6708/video/7527246822444748038',
      tiktokId: '7527246822444748038',
      profileUrl: 'https://www.tiktok.com/@hilee6708?_r=1&_t=ZS-94AinOGVCN8'
    },
    {
      id: 'v39',
      rank: 39,
      thumbnail: 'https://i.imgur.com/lBpKxua.jpg',
      sales6h: '165 vendas',
      revenue6h: 'R$ 63.892,00',
      productTitle: 'Máquina de Cortar Kemei',
      productImage: 'https://i.imgur.com/O9hmYqT.png',
      directVideoUrl: 'https://www.tiktok.com/@barretoindica/video/7522652044377787654?_r=1&_t=ZS-93n3koIAUGj',
      tiktokId: '7522652044377787654',
      profileUrl: 'https://www.tiktok.com/@barretoindica?_r=1&_t=ZS-94AiopfbPwQ'
    },
    {
      id: 'v40',
      rank: 40,
      thumbnail: 'https://i.imgur.com/t5xAEp0.jpg',
      sales6h: '245 vendas',
      revenue6h: 'R$ 34.567,00',
      productTitle: 'garrafa Hilee Frutas',
      productImage: 'https://i.imgur.com/9p2m7Yc.png',
      directVideoUrl: 'https://www.tiktok.com/@daily_dalucy/video/7561737049871600917?_r=1&_t=ZS-93n2powHjeO',
      tiktokId: '7561737049871600917',
      profileUrl: 'https://www.tiktok.com/@daily_dalucy?_r=1&_t=ZS-94AisDGv7r8'
    }
  ];

  // Generate 40 videos (10 rows of 4)
  const videoData: VideoViral[] = Array.from({ length: 40 }, (_, i) => ({
    ...baseVideos[i % baseVideos.length],
    id: `v${i + 1}`,
    rank: i + 1
  }));

  return (
    <main className="max-w-[1400px] mx-auto px-6 py-6 md:py-10">
      <div className="bg-[#0c0c0e] border border-[#1c1c1f] rounded-[40px] p-6 md:p-12 lg:p-14 mb-16 relative overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 md:gap-12">
          <div className="flex flex-col gap-4">
            <h1 className="text-[44px] font-black text-white tracking-tighter leading-none">Vídeos</h1>
            <p className="text-[#5b5b7b] text-base font-medium">Aulas e análises de produtos virais.</p>

            <div className="mt-8 flex items-center gap-3 bg-[#101915] border border-[#1b3d2b] px-5 py-2 rounded-full w-fit">
              <div className="w-2.5 h-2.5 bg-[#00b37e] rounded-full shadow-[0_0_10px_rgba(0,179,126,0.8)]"></div>
              <span className="text-[11px] font-black uppercase tracking-[0.25em] text-[#00b37e]">SISTEMA ONLINE • MINERANDO</span>
            </div>
          </div>

          <div className="flex items-stretch gap-px bg-[#1c1c1f] p-[1.5px] rounded-[32px] overflow-hidden shadow-2xl min-w-[460px]">
            <div className="bg-[#0b0c10] flex-1 px-8 py-6 md:py-10 flex flex-col items-center justify-center gap-1 border-r border-[#1c1c1f] relative group">
              <div className="absolute top-4 left-4 opacity-20 group-hover:opacity-40 transition-opacity">
                <Video size={16} className="text-[#5b5b7b]" />
              </div>
              <span className="text-3xl md:text-5xl font-black text-white leading-none tracking-tighter">40</span>
              <span className="text-[10px] font-black text-[#5b5b7b] uppercase tracking-[0.3em] mt-4 flex items-center gap-2">
                <span className="w-1 h-1 bg-[#5b5b7b] rounded-full"></span>
                Vídeos Detectados
              </span>
            </div>

            <div className="bg-[#0b0c10] flex-[1.4] px-8 py-6 md:py-10 flex flex-col items-center justify-center gap-1 relative group">
              <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity">
                <TrendingUp size={16} className="text-[#00b37e]" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-[#00b37e]/60 leading-none">R$</span>
                <span className="text-3xl md:text-5xl font-black text-[#00b37e] leading-none tracking-tighter">1.2M</span>
              </div>
              <span className="text-[10px] font-black text-[#5b5b7b] uppercase tracking-[0.3em] mt-4 flex items-center gap-2">
                <span className="w-1 h-1 bg-[#00b37e] rounded-full animate-pulse"></span>
                Receita Analisada
              </span>
            </div>
          </div>
        </div>

        {/* Modern Horizontal Separator / Selection Bar */}
        <div className="mt-20 flex flex-col gap-6">
          <div className="flex items-end justify-between px-2">
            <div className="flex items-center gap-6 md:gap-12">
              <span className="text-[12px] font-black text-[#5b5b7b] uppercase tracking-[0.2em] cursor-pointer hover:text-white transition-colors">00:00 - 06:00</span>
              <span className="text-[12px] font-black text-[#5b5b7b] uppercase tracking-[0.2em] cursor-pointer hover:text-white transition-colors">06:00 - 12:00</span>
              <span className="text-[12px] font-black text-[#5b5b7b] uppercase tracking-[0.2em] cursor-pointer hover:text-white transition-colors">12:00 - 18:00</span>
              <span className="text-[12px] font-black text-white uppercase tracking-[0.2em] cursor-default">18:00 - 00:00</span>
            </div>

            <div className="flex flex-col items-end gap-1">
              <span className="text-[10px] font-black text-[#5b5b7b] uppercase tracking-[0.3em] opacity-80">PRÓXIMA ATUALIZAÇÃO EM:</span>
              <span className="text-[#7f5af0]xl font-black text-white tabular-nums tracking-tighter">04:29:38</span>
            </div>
          </div>

          <div className="relative w-full h-[3px] bg-[#1c1c1f] rounded-full overflow-hidden">
            {/* The active marker matching the screenshot placement under 18:00-00:00 */}
            <div className="absolute right-0 w-1/4 h-full bg-[#3B82F6] shadow-[0_0_15px_rgba(81,66,245,0.5)]"></div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-12 px-2">
        <button className="bg-[#3B82F6] text-white px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-[0.15em] flex items-center gap-2 shadow-lg shadow-[#3B82F6]/20 hover:scale-[1.03] transition-all">
          <LayoutGrid className="w-4 h-4" /> Todos os Vídeos
        </button>
        <button className="bg-[#14151a] border border-[#1e1f26] text-[#8d8d99] px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-[0.15em] flex items-center gap-2 hover:border-[#44444f] hover:text-white transition-all">
          <DollarSign className="w-4 h-4" /> Mais Faturados
        </button>
        <button className="bg-[#14151a] border border-[#1e1f26] text-[#8d8d99] px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-[0.15em] flex items-center gap-2 hover:border-[#44444f] hover:text-white transition-all">
          <ShoppingBag className="w-4 h-4" /> Mais Vendidos
        </button>
        <button className="bg-[#14151a] border border-[#1e1f26] text-[#8d8d99] px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-[0.15em] flex items-center gap-2 hover:border-[#44444f] hover:text-white transition-all">
          <Bookmark className="w-4 h-4" /> Favoritos
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
        {videoData.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </main>
  );
};

const ScriptModal: React.FC<{ isOpen: boolean; onClose: () => void; video: VideoViral }> = ({ isOpen, onClose, video }) => {
  if (!isOpen) return null;

  const handleCopyAndOpen = () => {
    let urlToCopy = '';
    if (video.directVideoUrl) urlToCopy = video.directVideoUrl;
    else if (video.tiktokId) urlToCopy = `https://www.tiktok.com/video/${video.tiktokId}`;
    else if (video.videoUrl) urlToCopy = video.videoUrl;

    navigator.clipboard.writeText(urlToCopy);
    window.open('https://www.transcript24.com/pt-BR', '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-[#0b0c10]/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-[#0b0c10] border border-[#1c1c1f] rounded-[32px] w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 md:p-8 flex items-center justify-between border-b border-[#1c1c1f]">
          <h2 className="text-xl font-black text-white">Como obter o Script</h2>
          <button onClick={onClose} className="text-[#5b5b7b] hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-5 md:p-8 flex flex-col gap-5 md:gap-8">
          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[#1F2028] flex items-center justify-center text-[#3B82F6] font-black text-sm shrink-0 mt-0.5">1</div>
              <p className="text-[#8d8d99] text-[15px] font-medium leading-relaxed">Clique no botão abaixo para copiar o link do vídeo.</p>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[#1F2028] flex items-center justify-center text-[#3B82F6] font-black text-sm shrink-0 mt-0.5">2</div>
              <p className="text-[#8d8d99] text-[15px] font-medium leading-relaxed">O site Transcript24 abrirá em uma nova aba.</p>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[#1F2028] flex items-center justify-center text-[#3B82F6] font-black text-sm shrink-0 mt-0.5">3</div>
              <p className="text-[#8d8d99] text-[15px] font-medium leading-relaxed">Cole o link no site para gerar o script completo.</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <button
              onClick={handleCopyAndOpen}
              className="w-full bg-[#3B82F6] hover:bg-[#4338ca] text-white py-5 rounded-2xl flex items-center justify-center gap-3 transition-all font-black text-[15px] shadow-lg shadow-[#3B82F6]/20"
            >
              <Copy className="w-5 h-5" /> Copiar Link e Abrir Site
            </button>
            <button
              onClick={onClose}
              className="w-full text-[#5b5b7b] hover:text-white transition-colors font-black text-[15px] py-2"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const VideoCard: React.FC<{ video: VideoViral }> = ({ video }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const renderVideo = () => {
    if (video.directVideoUrl) {
      return (
        <video
          ref={videoRef}
          src={video.directVideoUrl}
          className="absolute inset-0 w-full h-full object-cover scale-[1.2]"
          controls={isPlaying}
          playsInline
          autoPlay
          muted
          loop
          onClick={(e) => e.stopPropagation()}
        />
      );
    }
    if (video.tiktokId) {
      return (
        <iframe
          src={`https://www.tiktok.com/embed/v2/${video.tiktokId}?autoplay=1`}
          className="absolute inset-0 w-full h-full border-0 object-cover"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      );
    }
    if (video.videoUrl) {
      return (
        <iframe
          src={`${video.videoUrl}${video.videoUrl.includes('?') ? '&' : '?'}autoplay=1`}
          className="absolute inset-0 w-full h-full border-0 object-cover"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col group h-full">
      <div
        className="relative aspect-[9/16] bg-[#14151a] border border-[#1e1f26] rounded-[48px] overflow-hidden cursor-pointer shadow-2xl"
        onClick={() => (video.tiktokId || video.videoUrl || video.directVideoUrl) && handlePlay()}
      >
        {isPlaying && (video.tiktokId || video.videoUrl || video.directVideoUrl) ? (
          renderVideo()
        ) : (
          <>
            <img src={video.thumbnail} alt="" className="w-full h-full object-cover scale-[1.2] group-hover:scale-[1.25] transition-transform duration-1000 opacity-90 group-hover:opacity-100" />

            <div className="absolute top-8 left-8 w-12 h-12 bg-[#000000]/70 backdrop-blur-2xl rounded-2xl flex items-center justify-center text-lg font-black text-white/90 border border-white/10 shadow-2xl z-10">#{video.rank}</div>

            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="w-24 h-24 bg-[#0b0c10]/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform shadow-2xl">
                <div className="w-16 h-16 bg-[#3B82F6] rounded-full flex items-center justify-center shadow-2xl shadow-[#3B82F6]/50">
                  <Play className="w-8 h-8 text-white fill-current translate-x-1" />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="mt-8 bg-[#0b0c10] border border-[#1c1c1f] rounded-[40px] p-5 md:p-8 flex flex-col gap-6 shadow-2xl">
        <div className="flex flex-col gap-5 px-1">
          {/* Linha Superior (Informações Primárias) */}
          <div className="flex items-center justify-between w-full">
            <span className="text-[11px] font-medium text-[#5b5b7b] uppercase tracking-wider whitespace-nowrap">Últimas 6 horas</span>
            <span className="text-[15px] font-bold text-white tracking-tight whitespace-nowrap">{video.revenue6h}</span>
          </div>

          {/* Linha Inferior (Métrica Secundária) */}
          <div className="flex justify-center">
            <div className="bg-[#101915] border border-[#1b3d2b] px-3.5 py-1.5 rounded-xl flex items-center gap-2 shadow-[0_0_20px_rgba(0,179,126,0.05)]">
              <span className="text-[13px] font-black text-[#00b37e] leading-none">{video.sales6h.split(' ')[0]}</span>
              <span className="text-[9px] font-black text-[#00b37e] leading-none uppercase tracking-wider">vendas</span>
            </div>
          </div>
        </div>

        <div className="h-px bg-[#1c1c1f] w-full"></div>

        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl overflow-hidden border border-[#1c1c1f] shadow-2xl shrink-0">
            <img src={video.productImage} className="w-full h-full object-cover scale-[1.5]" alt="" />
          </div>
          <span className="text-lg font-black text-white line-clamp-1 flex-1 tracking-tight">{video.productTitle}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#1c1c1f] hover:bg-[#24242a] text-white py-4 rounded-2xl flex items-center justify-center gap-2 transition-all group/btn"
          >
            <FileText className="w-5 h-5 text-[#8d8d99] group-hover/btn:text-white transition-colors" />
            <span className="text-[13px] font-black">Script</span>
          </button>
          <button
            onClick={() => {
              const url = video.directVideoUrl || (video.tiktokId ? `https://www.tiktok.com/video/${video.tiktokId}` : '');
              if (url) {
                window.open(url, '_blank');
                navigator.clipboard.writeText(url);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }
            }}
            className="bg-[#1c1c1f] hover:bg-[#24242a] text-white py-4 rounded-2xl flex items-center justify-center gap-2 transition-all group/btn"
          >
            <Link className={`w-5 h-5 ${copied ? 'text-green-500' : 'text-[#3b82f6]'} group-hover/btn:text-white transition-colors`} />
            <span className="text-[13px] font-black">{copied ? 'Copiado!' : 'Link'}</span>
          </button>
          <button
            onClick={() => {
              if (video.profileUrl) {
                window.open(video.profileUrl, '_blank');
              }
            }}
            className="bg-[#1c1c1f] hover:bg-[#24242a] text-white py-4 rounded-2xl flex items-center justify-center gap-2 transition-all group/btn"
          >
            <User className="w-5 h-5 text-[#3B82F6] group-hover/btn:text-white transition-colors" />
            <span className="text-[13px] font-black">Perfil</span>
          </button>
        </div>

        <button className="w-full bg-[#1c1c1f] hover:bg-[#24242a] text-[#8d8d99] hover:text-white py-5 rounded-2xl flex items-center justify-center gap-3 transition-all font-black text-[15px] group/fav">
          <Bookmark className="w-5 h-5 group-hover/fav:fill-white transition-all" />
          Favoritar Vídeo
        </button>

        <ScriptModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          video={video}
        />
      </div>
    </div>
  );
};

// --- CREATORS PAGE VIEW ---
const CreatorsView: React.FC = () => {
  const creators: CreatorViral[] = [
    { id: 'c1', rank: 1, username: '@dicasdacleoofc', shopName: 'Dicas da Cleo', category: 'DICAS', revenue: 'R$ 102.489,32', avatar: 'https://i.imgur.com/8NA9NGB.jpeg', profileUrl: 'https://www.tiktok.com/@dicasdacleoofc' },
    { id: 'c2', rank: 2, username: '@luani.shop', shopName: 'Luani Shop', category: 'ACHADINHOS', revenue: 'R$ 45.987,63', avatar: 'https://i.imgur.com/P4vEkS8.jpeg', profileUrl: 'https://www.tiktok.com/@luani.shop' },
    { id: 'c3', rank: 3, username: '@helen.shopcreator', shopName: 'Helen', category: 'CREATOR', revenue: 'R$ 88.741,29', avatar: 'https://i.imgur.com/J8bEdbJ.jpeg', profileUrl: 'https://www.tiktok.com/@helen.shopcreator' },
    { id: 'c4', rank: 4, username: 'lara.azevedo71', shopName: 'Lara Azevedo', category: 'VARIEDADES', revenue: 'R$ 14.821,47', avatar: 'https://i.imgur.com/lzCy7xP.jpeg', profileUrl: 'https://www.tiktok.com/@lara.azevedo71' },
    { id: 'c5', rank: 5, username: '@jujuzinhashop', shopName: 'Juju', category: 'LIFESTYLE', revenue: 'R$ 56.321,50', avatar: 'https://i.imgur.com/hS2k80R.jpeg', profileUrl: 'https://www.tiktok.com/@jujuzinhashop' },
    { id: 'c6', rank: 6, username: '@elycashop', shopName: 'Ely', category: 'CASA', revenue: 'R$ 23.654,98', avatar: 'https://i.imgur.com/HKoQji5.jpeg', profileUrl: 'https://www.tiktok.com/@elycashop' },
    { id: 'c7', rank: 7, username: '@eliza.shop.ia', shopName: 'Eliza Shop', category: 'IA', revenue: 'R$ 68.214,15', avatar: 'https://i.imgur.com/1V8pMju.jpeg', profileUrl: 'https://www.tiktok.com/@eliza.shop.ia' },
    { id: 'c8', rank: 8, username: '@gigishop', shopName: 'Gigi', category: 'MODA', revenue: 'R$ 112.534,76', avatar: 'https://i.imgur.com/bcYp5bb.jpeg', profileUrl: 'https://www.tiktok.com/@gigishop' }
  ];

  return (
    <main className="max-w-[1400px] mx-auto px-6 py-6 md:py-10">
      <div className="bg-[#0c0c0e] border border-[#1c1c1f] rounded-[40px] p-6 md:p-12 lg:p-14 mb-16 relative overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 md:gap-12">
          <div className="flex flex-col gap-4">
            <h1 className="text-[44px] font-black text-white tracking-tighter leading-none">Criadores Virais</h1>
            <p className="text-[#5b5b7b] text-base font-medium">O ranking das mentes que estão gerando faturamentos astronômicos.</p>

            <div className="mt-8 flex items-center gap-3 bg-[#101915] border border-[#1b3d2b] px-5 py-2 rounded-full w-fit">
              <div className="w-2.5 h-2.5 bg-[#00b37e] rounded-full shadow-[0_0_10px_rgba(0,179,126,0.8)]"></div>
              <span className="text-[11px] font-black uppercase tracking-[0.25em] text-[#00b37e]">TRACKING EM TEMPO REAL</span>
            </div>
          </div>

          <div className="flex items-stretch gap-px bg-[#1c1c1f] p-[1.5px] rounded-[32px] overflow-hidden shadow-2xl min-w-[460px]">
            <div className="bg-[#0b0c10] flex-1 px-8 py-6 md:py-10 flex flex-col items-center justify-center gap-1 border-r border-[#1c1c1f] relative group">
              <div className="absolute top-4 left-4 opacity-20 group-hover:opacity-40 transition-opacity">
                <Users size={16} className="text-[#5b5b7b]" />
              </div>
              <span className="text-3xl md:text-5xl font-black text-white leading-none tracking-tighter">8</span>
              <span className="text-[10px] font-black text-[#5b5b7b] uppercase tracking-[0.3em] mt-4 flex items-center gap-2">
                <span className="w-1 h-1 bg-[#5b5b7b] rounded-full"></span>
                Monitorados
              </span>
            </div>

            <div className="bg-[#0b0c10] flex-[1.4] px-8 py-6 md:py-10 flex flex-col items-center justify-center gap-1 relative group">
              <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity">
                <DollarSign size={16} className="text-[#00b37e]" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-[#00b37e]/60 leading-none">R$</span>
                <span className="text-3xl md:text-5xl font-black text-[#00b37e] leading-none tracking-tighter">512.765</span>
              </div>
              <span className="text-[10px] font-black text-[#5b5b7b] uppercase tracking-[0.3em] mt-4 flex items-center gap-2">
                <span className="w-1 h-1 bg-[#00b37e] rounded-full animate-pulse"></span>
                Faturamento Total
              </span>
            </div>
          </div>
        </div>

        {/* Modern Horizontal Separator / Selection Bar */}
        <div className="mt-20 flex flex-col gap-6">
          <div className="flex items-end justify-between px-2">
            <div className="flex items-center gap-6 md:gap-12">
              <span className="text-[12px] font-black text-[#5b5b7b] uppercase tracking-[0.2em] cursor-pointer hover:text-white transition-colors">00:00 - 06:00</span>
              <span className="text-[12px] font-black text-[#5b5b7b] uppercase tracking-[0.2em] cursor-pointer hover:text-white transition-colors">06:00 - 12:00</span>
              <span className="text-[12px] font-black text-white uppercase tracking-[0.2em] cursor-default">12:00 - 18:00</span>
              <span className="text-[12px] font-black text-[#5b5b7b] uppercase tracking-[0.2em] cursor-pointer hover:text-white transition-colors">18:00 - 00:00</span>
            </div>

            <div className="flex flex-col items-end gap-1">
              <span className="text-[10px] font-black text-[#5b5b7b] uppercase tracking-[0.3em] opacity-80">PRÓXIMA ATUALIZAÇÃO EM:</span>
              <span className="text-[#7f5af0]xl font-black text-white tabular-nums tracking-tighter">01:18:30</span>
            </div>
          </div>

          <div className="relative w-full h-[3px] bg-[#1c1c1f] rounded-full overflow-hidden">
            {/* The active marker matching the screenshot placement under 12:00-18:00 */}
            <div className="absolute left-1/2 -translate-x-1/2 w-1/4 h-full bg-[#3B82F6] shadow-[0_0_15px_rgba(81,66,245,0.5)]"></div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 mb-24">
        {creators.map((creator) => (
          <CreatorRow key={creator.id} creator={creator} />
        ))}
      </div>
    </main>
  );
};

const CreatorRow: React.FC<{ creator: CreatorViral }> = ({ creator }) => (
  <div
    onClick={() => window.open(creator.profileUrl, '_blank')}
    className="bg-[#0b0c10] border border-[#27272a] rounded-[48px] px-6 md:px-10 py-8 flex items-center justify-between group hover:border-[#3B82F6]/40 transition-all cursor-pointer shadow-2xl"
  >
    <div className="flex items-center gap-6 md:gap-12 flex-1">
      {/* RANKING ICON */}
      <div className="w-16 h-16 flex items-center justify-center">
        {creator.rank === 1 ? (
          <div className="w-14 h-14 bg-[#f59e0b] rounded-[22px] flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.3)] transform rotate-1 animate-pulse">
            <Crown className="w-8 h-8 text-white fill-white" />
          </div>
        ) : (
          <div className="w-14 h-14 bg-[#14151a] border border-[#27272a] rounded-[22px] flex items-center justify-center text-lg font-bold text-[#5b5b7b]">
            #{creator.rank}
          </div>
        )}
      </div>

      {/* AVATAR + INFO */}
      <div className="flex items-center gap-6">
        <div className="relative">
          <div className="w-20 h-20 rounded-full overflow-hidden border-[4px] border-[#1c1c1f] shadow-2xl group-hover:scale-105 transition-transform duration-500">
            <img src={creator.avatar} className="w-full h-full object-cover" alt="" />
          </div>
          {creator.rank === 1 && (
            <div className="absolute -bottom-2 -right-1 bg-[#f59e0b] text-[9px] font-bold text-white px-2 py-0.5 rounded-lg border-[3px] border-[#111114] shadow-lg">TOP 1</div>
          )}
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-1">
            <span className="text-xl font-bold text-white group-hover:text-[#3B82F6] transition-colors tracking-tight">{creator.username}</span>
            <span className="px-3 py-1 bg-[#14151a] border border-[#27272a] text-[#8d8d99] rounded-lg text-[10px] font-medium uppercase tracking-wider">{creator.category}</span>
          </div>
          <span className="text-[13px] font-medium text-[#5b5b7b] uppercase tracking-wider">{creator.shopName}</span>
        </div>
      </div>

      {/* REVENUE SECTION - MOVED TO CENTER-RIGHT */}
      <div className="ml-auto pr-12 flex items-center gap-4">
        <div className="flex items-baseline gap-2.5">
          <span className="text-[#00b37e] font-medium text-xl">$</span>
          <span className="text-[#7f5af0]xl font-semibold text-[#00b37e] tracking-tight leading-none">{creator.revenue}</span>
          <span className="text-[10px] font-medium text-[#5b5b7b] uppercase tracking-wider ml-1">/MÊS ESTIMADO</span>
        </div>
      </div>
    </div>

    {/* ACTION BUTTON */}
    <button
      onClick={(e) => {
        e.stopPropagation();
        window.open(creator.profileUrl, '_blank');
      }}
      className="w-14 h-14 bg-[#14151a] border border-[#27272a] rounded-[22px] flex items-center justify-center group-hover:bg-[#3B82F6]/10 group-hover:border-[#3B82F6]/40 transition-all shadow-xl cursor-pointer"
    >
      <ExternalLink className="w-6 h-6 text-[#5b5b7b] group-hover:text-[#3B82F6] transition-colors" />
    </button>
  </div>
);

// --- UGC CREATOR VIEW (MULTI-STEP) ---
const UGCCreatorView: React.FC<{ viralProducts: ProductViral[], exploreTopProducts: ProductExplore[] }> = ({ viralProducts, exploreTopProducts }) => {
  const [step, setStep] = useState(1);
  const [selectedStyle, setSelectedStyle] = useState<string | null>('influencer');
  const [selectedInfluencer, setSelectedInfluencer] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'mulheres' | 'homens' | 'meus-avatares'>('mulheres');

  // Step 3 state (formerly Step 4)
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [selectedVideoModel, setSelectedVideoModel] = useState<string | null>(null);
  const [selectedTone, setSelectedTone] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);

  // Step 4 state (formerly Step 5)
  const [voiceGender, setVoiceGender] = useState<'fem' | 'masc'>('fem');
  const [selectedStepTone, setSelectedStepTone] = useState<string | null>(null);
  const [takes, setTakes] = useState(['', '', '']);

  // Loading state
  const [isLoading, setIsLoading] = useState(false);
  const [loadingPhase, setLoadingPhase] = useState(0);

  const influencersWomen = [
    { id: 'w1', name: 'Ana', image: 'https://i.imgur.com/hrGOGFM.jpeg' },
    { id: 'w2', name: 'Fernanda', image: 'https://i.imgur.com/3mnJIzU.jpeg' },
    { id: 'w3', name: 'Carla', image: 'https://i.imgur.com/gu8PLki.jpeg' },
    { id: 'w4', name: 'Juliana', image: 'https://i.imgur.com/gPcVAPz.jpeg' },
    { id: 'w5', name: 'Laura', image: 'https://i.imgur.com/rhvUP8G.jpeg' },
    { id: 'w6', name: 'Maria', image: 'https://i.imgur.com/6vg7fRq.jpeg' },
  ];

  const influencersMen = [
    { id: 'm1', name: 'Fábio', image: 'https://i.imgur.com/5ymF1nv.jpeg' },
    { id: 'm2', name: 'Henrique', image: 'https://i.imgur.com/WDsko8P.jpeg' },
    { id: 'm3', name: 'Marcos', image: 'https://i.imgur.com/2NxpAmW.jpeg' },
    { id: 'm4', name: 'Matheus', image: 'https://i.imgur.com/8LQB3BC.jpeg' },
    { id: 'm5', name: 'Miguel', image: 'https://i.imgur.com/loBeA7L.jpeg' },
    { id: 'm6', name: 'Pedro', image: 'https://i.imgur.com/Bziwg0O.jpeg' },
  ];

  const allInfluencers = [...influencersWomen, ...influencersMen];
  const currentInfluencers = activeTab === 'mulheres' ? influencersWomen : (activeTab === 'homens' ? influencersMen : []);

  const viralStepProducts = [
    ...viralProducts.map((p, index) => ({
      id: p.id,
      title: p.title,
      image: p.image,
      badge: index < 3 ? `#${index + 1} VIRAL` : 'Em Alta',
      viral: index < 3
    })),
    ...exploreTopProducts.filter(ep => !viralProducts.find(vp => vp.title === ep.title)).map(p => ({
      id: p.id,
      title: p.title,
      image: p.image,
      badge: 'Em Alta',
      viral: false
    }))
  ];

  const scenarios = [
    { id: 'quarto', label: 'Quarto Aconchegante', icon: <Home className="w-5 h-5" /> },
    { id: 'sala', label: 'Sala de Estar', icon: <Sofa className="w-5 h-5" /> },
    { id: 'cozinha', label: 'Cozinha', icon: <Utensils className="w-5 h-5" /> },
    { id: 'escritorio', label: 'Escritório/Setup', icon: <Laptop className="w-5 h-5" /> },
    { id: 'externa', label: 'Área Externa', icon: <Sun className="w-5 h-5" /> },
    { id: 'carro', label: 'Dentro do Carro', icon: <Car className="w-5 h-5" /> },
    { id: 'personalizado', label: 'Personalizado', icon: <Plus className="w-5 h-5" /> },
  ];

  const videoModels = [
    { id: 'ugc', title: 'UGC Autêntico', description: 'Estilo caseiro e natural' },
    { id: 'review', title: 'Review Clássico', description: 'Análise detalhada do produto' },
    { id: 'pov', title: 'POV Review', description: 'Unboxing em primeira pessoa' },
    { id: 'depoimento', title: 'Depoimento', description: 'Relato de experiência pessoal' },
    { id: 'problema', title: 'Problema -> Solução', description: 'Narrativa de transformação' },
  ];

  const tones = [
    { id: 'animado', label: 'Animado', icon: <Zap className="w-4 h-4" /> },
    { id: 'calmo', label: 'Calmo', icon: <Mic className="w-4 h-4" /> },
    { id: 'urgente', label: 'Urgente', icon: <AlertCircle className="w-4 h-4" /> },
    { id: 'divertido', label: 'Divertido', icon: <Smile className="w-4 h-4" /> },
  ];

  const durations = [
    { id: '1take', label: '1 Take (8s)' },
    { id: '2takes', label: '2 Takes (16s)' },
    { id: '3takes', label: '3 Takes (24s)' },
    { id: '4takes', label: '4 Takes (32s)' },
    { id: '5takes', label: '5 Takes (40s)' },
  ];

  const voiceTones = [
    'Grave', 'Médio', 'Agudo', 'Doce', 'Energético', 'Sábio'
  ];

  const loadingMessages = [
    'Escolhendo o melhor cenário...',
    'Ajustando a iluminação...',
    'Sincronizando áudio e roteiro...',
    'Finalizando sua experiência UGC...'
  ];

  useEffect(() => {
    let interval: any;
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingPhase((prev) => (prev + 1) % loadingMessages.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleInfluencerSelect = (id: string) => {
    setSelectedInfluencer(id);
    setTimeout(() => setStep(2), 400);
  };

  const handleProductSelect = (id: string) => {
    setSelectedProduct(id);
    setTimeout(() => setStep(3), 400);
  };

  const handleGenerate = () => {
    setIsLoading(true);
    // Simulation of backend process
    setTimeout(() => {
      setIsLoading(false);
      setStep(5); // Final result view
    }, 6000); // 6 seconds for realistic loading
  };

  const getStepTitle = () => {
    switch (step) {
      case 1: return 'Avatar / Influencer';
      case 2: return 'Produto';
      case 3: return 'Configuração Visual';
      case 4: return 'Roteiro & Voz';
      case 5: return 'Finalização';
      default: return 'UGC Criador';
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[100] bg-[#0b0c10] flex flex-col items-center justify-center animate-in fade-in duration-700">
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-[#3B82F6] rounded-full blur-[80px] opacity-20 animate-pulse scale-150"></div>
          <div className="absolute inset-0 bg-[#3B82F6] rounded-full blur-[40px] opacity-30 animate-pulse"></div>
          <div className="relative w-32 h-32 bg-[#14151a] border-2 border-[#1e1f26] rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(0,0,0,0.5)]">
            <Brain className="w-14 h-14 text-[#8d8d99] animate-pulse" />
          </div>
        </div>
        <h2 className="text-[#e1e1e6] text-xl font-medium tracking-tight mb-8">
          {loadingMessages[loadingPhase]}
        </h2>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-[#5b5b7b] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-1.5 h-1.5 bg-[#5b5b7b] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-1.5 h-1.5 bg-[#5b5b7b] rounded-full animate-bounce"></div>
        </div>
      </div>
    );
  }

  return (
    <main className={`max-w-[1400px] mx-auto px-6 flex flex-col items-center ${step === 5 ? 'pt-12 pb-20' : 'py-12 md:py-20'}`}>
      {/* Header Step Indicator */}
      <div className={`text-center ${step === 5 ? 'mb-16' : 'mb-10'}`}>
        <span className="text-[11px] font-black text-[#5b5b7b] uppercase tracking-[0.5em] mb-4 block opacity-80">
          PASSO {step === 5 ? '4' : step} DE 4
        </span>
        {step !== 5 && (
          <h1 className="text-[34px] font-black text-white tracking-tight">
            {getStepTitle()}
          </h1>
        )}
      </div>

      {/* Progress Bar */}
      {step !== 5 && (
        <div className="flex items-center gap-4 mb-20 w-full max-w-[640px] justify-center">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-[3px] flex-1 rounded-full transition-all duration-500 ${step >= s ? 'bg-[#3B82F6] shadow-[0_0_12px_rgba(81,66,245,0.5)]' : 'bg-[#33333a]'}`}
            ></div>
          ))}
        </div>
      )}

      {/* Step 1: Avatar / Influencer */}
      {step === 1 && (
        <div className="w-full max-w-[1080px] bg-[#14151a] border border-[#1e1f26]/60 rounded-[56px] p-6 md:p-12 shadow-2xl flex flex-col animate-in fade-in slide-in-from-right duration-500">
          {selectedStyle === 'review' ? (
            <>
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-2xl font-black text-white tracking-tight">Estilo POV</h2>
                <button onClick={() => setStep(1)} className="text-[#5b5b7b] hover:text-white text-sm font-black flex items-center gap-2 transition-all">
                  Voltar
                </button>
              </div>

              <div className="w-full h-[1px] bg-[#33333a] mb-12"></div>

              <div className="flex-1 flex flex-col items-center justify-center py-10 md:py-16 px-6 md:px-10 border-2 border-dashed border-[#1e1f26] rounded-[48px] bg-[#0b0c10] mb-12">
                <div className="w-20 h-20 bg-[#24242a] rounded-full flex items-center justify-center mb-8 shadow-xl">
                  <Eye className="w-10 h-10 text-[#8d8d99]" />
                </div>
                <p className="text-[#8d8d99] text-lg font-medium text-center max-w-[480px] leading-relaxed">
                  Modo POV selecionado. O vídeo focará nas mãos e no produto.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-2xl font-black text-white tracking-tight">Selecione o Influencer</h2>
              </div>

              <div className="bg-[#0b0c10] p-1 rounded-2xl flex items-center mb-10 border border-[#1e1f26]">
                <button
                  onClick={() => setActiveTab('mulheres')}
                  className={`flex-1 py-3.5 rounded-xl text-sm font-black transition-all ${activeTab === 'mulheres' ? 'bg-[#24242a] text-[#3B82F6]' : 'text-[#5b5b7b] hover:text-white'}`}
                >
                  Mulheres
                </button>
                <button
                  onClick={() => setActiveTab('homens')}
                  className={`flex-1 py-3.5 rounded-xl text-sm font-black transition-all ${activeTab === 'homens' ? 'bg-[#24242a] text-[#3B82F6]' : 'text-[#5b5b7b] hover:text-white'}`}
                >
                  Homens
                </button>
                <button
                  onClick={() => setActiveTab('meus-avatares')}
                  className={`flex-1 py-3.5 rounded-xl text-sm font-black transition-all ${activeTab === 'meus-avatares' ? 'bg-[#24242a] text-[#3B82F6]' : 'text-[#5b5b7b] hover:text-white'}`}
                >
                  Meus Avatares
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {currentInfluencers.map((inf) => (
                  <div
                    key={inf.id}
                    onClick={() => handleInfluencerSelect(inf.id)}
                    className={`group relative aspect-[3/4] rounded-3xl overflow-hidden border-2 cursor-pointer transition-all duration-300 ${selectedInfluencer === inf.id ? 'border-[#3B82F6] ring-4 ring-[#3B82F6]/20 shadow-2xl shadow-[#3B82F6]/30' : 'border-[#1e1f26] hover:border-white/20'}`}
                  >
                    <img src={inf.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={inf.name} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-5 left-5">
                      <span className="text-white text-sm font-black tracking-tight">{inf.name}</span>
                    </div>
                    {selectedInfluencer === inf.id && (
                      <div className="absolute top-4 right-4 w-6 h-6 bg-[#3B82F6] rounded-full flex items-center justify-center shadow-lg border border-white/20">
                        <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                ))}
                {activeTab === 'meus-avatares' && (
                  <div className="col-span-full py-12 md:py-20 flex flex-col items-center justify-center border-2 border-dashed border-[#1e1f26] rounded-[48px] bg-[#0b0c10]/20">
                    <div className="w-20 h-20 bg-[#14151a] rounded-full flex items-center justify-center mb-6 border border-[#1e1f26]">
                      <Plus className="w-10 h-10 text-[#5b5b7b]" />
                    </div>
                    <p className="text-[#8d8d99] font-medium">Você ainda não criou nenhum avatar personalizado.</p>
                    <button className="mt-6 px-8 py-3 bg-[#24242a] text-white rounded-xl text-sm font-black hover:bg-[#2a2a30] transition-all">
                      Criar Novo Avatar
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          <div className="flex justify-end">
            <button
              onClick={() => setStep(2)}
              disabled={selectedStyle === 'influencer' && !selectedInfluencer}
              className={`px-12 py-4 rounded-2xl text-base font-black flex items-center gap-3 transition-all ${(selectedStyle === 'review' || selectedInfluencer)
                ? 'bg-[#3B82F6] text-white shadow-xl shadow-[#3B82F6]/30 hover:scale-[1.03]'
                : 'bg-[#33333a] text-[#5b5b7b] cursor-not-allowed'
                }`}
            >
              Próximo
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Produto */}
      {step === 2 && (
        <div className="w-full max-w-[1080px] bg-[#14151a] border border-[#1e1f26]/60 rounded-[56px] p-6 md:p-12 shadow-2xl flex flex-col animate-in fade-in slide-in-from-right duration-500">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0 mb-6 md:mb-8">
            <h2 className="text-2xl font-black text-white tracking-tight">Selecione o Produto Viral</h2>
            <button onClick={() => setStep(1)} className="text-[#5b5b7b] hover:text-white text-sm font-black flex items-center gap-2 transition-all">
              Voltar
            </button>
          </div>

          <p className="text-[#5b5b7b] text-sm font-black mb-10 tracking-tight">Escolha um dos produtos em alta:</p>

          <div className="max-h-[500px] overflow-y-auto custom-scrollbar pr-4 -mr-4 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 md:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {viralStepProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => handleProductSelect(p.id)}
                  className={`group relative bg-[#24242a] border-2 rounded-[32px] overflow-hidden cursor-pointer transition-all duration-300 ${selectedProduct === p.id ? 'border-[#3B82F6] shadow-2xl shadow-[#3B82F6]/10' : 'border-[#1e1f26] hover:border-white/10'}`}
                >
                  <div className="aspect-square relative overflow-hidden bg-[#0b0c10]/40">
                    <img src={p.image} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt={p.title} />
                    <div className="absolute top-4 left-4">
                      {p.viral ? (
                        <span className="px-3 py-1.5 bg-[#3B82F6] text-white text-[9px] font-black rounded-lg uppercase tracking-widest flex items-center gap-1 shadow-lg">
                          {p.badge}
                        </span>
                      ) : (
                        <span className="px-3 py-1.5 bg-[#14151a] text-white text-[9px] font-black rounded-lg uppercase tracking-widest flex items-center gap-1 border border-white/5 shadow-lg">
                          <Flame className="w-2.5 h-2.5 text-[#ff8c00]" /> {p.badge}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-6 pt-5 bg-[#0b0c10]/20">
                    <h4 className="text-white text-[13px] font-black mb-3 line-clamp-2 leading-tight tracking-tight min-h-[32px] group-hover:text-[#3B82F6] transition-colors">{p.title}</h4>
                    <span className="inline-block px-3 py-1 bg-[#00b37e]/10 text-[#00b37e] text-[9px] font-black rounded-md uppercase tracking-widest border border-[#00b37e]/20">
                      Alta Demanda
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => setStep(3)}
              disabled={!selectedProduct}
              className={`px-12 py-4 rounded-2xl text-base font-black flex items-center gap-3 transition-all ${selectedProduct ? 'bg-[#3B82F6] text-white shadow-xl shadow-[#3B82F6]/30 hover:scale-[1.03]' : 'bg-[#33333a] text-[#5b5b7b] cursor-not-allowed'}`}
            >
              Próximo
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Configuração Visual */}
      {step === 3 && (
        <div className="w-full max-w-[1080px] bg-[#14151a] border border-[#1e1f26]/60 rounded-[56px] p-6 md:p-12 shadow-2xl flex flex-col animate-in fade-in slide-in-from-right duration-500">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-black text-white tracking-tight">Configuração do Vídeo</h2>
            <button onClick={() => setStep(3)} className="text-[#5b5b7b] hover:text-white text-sm font-black flex items-center gap-2 transition-all">
              Voltar
            </button>
          </div>

          <div className="mb-10">
            <h3 className="text-[11px] font-black text-[#5b5b7b] uppercase tracking-[0.3em] mb-5">CENÁRIO</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:grid-cols-7 gap-4">
              {scenarios.map((scen) => (
                <button
                  key={scen.id}
                  onClick={() => setSelectedScenario(scen.id)}
                  className={`flex flex-col items-center gap-3 group transition-all`}
                >
                  <div className={`w-full aspect-square bg-[#0b0c10] border-2 rounded-2xl flex items-center justify-center transition-all ${selectedScenario === scen.id ? 'border-[#3B82F6] bg-[#3B82F6]/5' : 'border-[#1e1f26] hover:border-white/20'}`}>
                    <div className={`transition-colors ${selectedScenario === scen.id ? 'text-[#3B82F6]' : 'text-[#5b5b7b] group-hover:text-white'}`}>
                      {scen.icon}
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold text-center leading-tight transition-colors ${selectedScenario === scen.id ? 'text-white' : 'text-[#5b5b7b] group-hover:text-white'}`}>
                    {scen.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-10">
            <h3 className="text-[11px] font-black text-[#5b5b7b] uppercase tracking-[0.3em] mb-5">MODELO DO VÍDEO</h3>
            <div className="grid grid-cols-1 md:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {videoModels.map((model) => (
                <button
                  key={model.id}
                  onClick={() => setSelectedVideoModel(model.id)}
                  className={`flex flex-col items-start p-6 bg-[#0b0c10] border-2 rounded-2xl transition-all text-left ${selectedVideoModel === model.id ? 'border-[#3B82F6] bg-[#3B82F6]/5' : 'border-[#1e1f26] hover:border-white/10'}`}
                >
                  <span className={`text-sm font-black mb-1 transition-colors ${selectedVideoModel === model.id ? 'text-[#3B82F6]' : 'text-white'}`}>
                    {model.title}
                  </span>
                  <span className="text-[11px] font-bold text-[#5b5b7b]">
                    {model.description}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-10">
            <h3 className="text-[11px] font-black text-[#5b5b7b] uppercase tracking-[0.3em] mb-5">TOM</h3>
            <div className="flex flex-wrap gap-4">
              {tones.map((tone) => (
                <button
                  key={tone.id}
                  onClick={() => setSelectedTone(tone.id)}
                  className={`flex items-center gap-2.5 px-6 py-3.5 bg-[#0b0c10] border-2 rounded-xl transition-all ${selectedTone === tone.id ? 'border-[#3B82F6] bg-[#3B82F6]/5 text-white' : 'border-[#1e1f26] text-[#8d8d99] hover:text-white hover:border-white/10'}`}
                >
                  <div className={`${selectedTone === tone.id ? 'text-[#3B82F6]' : 'text-current'}`}>
                    {tone.icon}
                  </div>
                  <span className="text-xs font-black">{tone.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-[11px] font-black text-[#5b5b7b] uppercase tracking-[0.3em] mb-5">DURAÇÃO</h3>
            <div className="flex flex-wrap gap-4">
              {durations.map((dur) => (
                <button
                  key={dur.id}
                  onClick={() => setSelectedDuration(dur.id)}
                  className={`flex items-center gap-2.5 px-6 py-3.5 bg-[#0b0c10] border-2 rounded-xl transition-all ${selectedDuration === dur.id ? 'border-[#3B82F6] bg-[#3B82F6]/5 text-white' : 'border-[#1e1f26] text-[#8d8d99] hover:text-white hover:border-white/10'}`}
                >
                  <Clock className={`w-4 h-4 ${selectedDuration === dur.id ? 'text-[#3B82F6]' : 'text-current'}`} />
                  <span className="text-xs font-black">{dur.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-8 border-t border-[#1e1f26]">
            <button
              onClick={() => setStep(4)}
              disabled={!selectedScenario || !selectedVideoModel || !selectedTone || !selectedDuration}
              className={`px-12 py-4 rounded-2xl text-base font-black flex items-center gap-3 transition-all ${selectedScenario && selectedVideoModel && selectedTone && selectedDuration ? 'bg-[#3B82F6] text-white shadow-xl shadow-[#3B82F6]/30 hover:scale-[1.03]' : 'bg-[#33333a] text-[#5b5b7b] cursor-not-allowed'}`}
            >
              Próximo
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Roteiro & Voz */}
      {step === 4 && (
        <div className="w-full max-w-[1080px] bg-[#14151a] border border-[#1e1f26]/60 rounded-[56px] p-6 md:p-12 shadow-2xl flex flex-col animate-in fade-in slide-in-from-right duration-500">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-0 mb-8 md:mb-12">
            <h2 className="text-2xl font-black text-white tracking-tight">Áudio & Roteiro</h2>
            <button onClick={() => setStep(3)} className="text-[#5b5b7b] hover:text-white text-sm font-black flex items-center gap-2 transition-all">
              Voltar
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mb-12">
            <div>
              <h3 className="text-[11px] font-black text-[#5b5b7b] uppercase tracking-[0.3em] mb-5">VOZ DO AVATAR</h3>
              <div className="bg-[#0b0c10] p-1 rounded-2xl flex items-center border border-[#1e1f26]">
                <button
                  onClick={() => setVoiceGender('fem')}
                  className={`flex-1 py-3.5 rounded-xl text-xs font-black transition-all ${voiceGender === 'fem' ? 'bg-[#24242a] text-[#3B82F6]' : 'text-[#5b5b7b] hover:text-white'}`}
                >
                  Feminino
                </button>
                <button
                  onClick={() => setVoiceGender('masc')}
                  className={`flex-1 py-3.5 rounded-xl text-xs font-black transition-all ${voiceGender === 'masc' ? 'bg-[#24242a] text-[#3B82F6]' : 'text-[#5b5b7b] hover:text-white'}`}
                >
                  Masculino
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-[11px] font-black text-[#5b5b7b] uppercase tracking-[0.3em] mb-5">TONALIDADE</h3>
              <div className="flex flex-wrap gap-3">
                {voiceTones.map((tone) => (
                  <button
                    key={tone}
                    onClick={() => setSelectedStepTone(tone)}
                    className={`px-6 py-2.5 rounded-full text-xs font-black border-2 transition-all ${selectedStepTone === tone ? 'border-[#3B82F6] bg-[#3B82F6]/5 text-white shadow-lg' : 'border-[#1e1f26] text-[#5b5b7b] hover:border-white/10 hover:text-white'}`}
                  >
                    {tone}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0 mb-6 md:mb-8">
              <h3 className="text-[11px] font-black text-[#5b5b7b] uppercase tracking-[0.3em]">ROTEIRO (COPY)</h3>
              <button className="flex items-center gap-2 px-5 py-2.5 bg-[#3B82F6]/10 border border-[#3B82F6]/20 text-[#3B82F6] rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#3B82F6]/20 transition-all">
                <Wand2 className="w-3.5 h-3.5" />
                Gerar com IA
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {takes.map((take, index) => (
                <div key={index} className="relative group">
                  <div className="absolute -top-3 left-6 px-3 bg-[#14151a] text-[10px] font-black text-[#3B82F6] uppercase tracking-widest z-10 border border-[#1e1f26] rounded-full">
                    Take {index + 1}
                  </div>
                  <textarea
                    value={take}
                    onChange={(e) => {
                      const newTakes = [...takes];
                      newTakes[index] = e.target.value.slice(0, 200);
                      setTakes(newTakes);
                    }}
                    placeholder={`Digite o roteiro do take ${index + 1} aqui...`}
                    className="w-full h-32 bg-[#0b0c10] border-2 border-[#1e1f26] rounded-[24px] p-5 md:p-8 text-sm text-white placeholder:text-[#44444f] focus:outline-none focus:border-[#3B82F6]/50 transition-all resize-none custom-scrollbar"
                  />
                  <div className="absolute bottom-4 right-6 text-[9px] font-black text-[#44444f] uppercase tracking-widest tabular-nums">
                    {take.length} / 200
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 mt-6 text-[#44444f]">
              <Info className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-tight">O avatar falará exatamente este texto dividido pelos takes.</span>
            </div>
          </div>

          <div className="flex justify-center pt-8 border-t border-[#1e1f26]">
            <button
              onClick={handleGenerate}
              disabled={takes.some(t => !t) || !selectedStepTone}
              className={`px-14 py-5 rounded-3xl text-base font-black flex items-center gap-3 transition-all ${takes.every(t => t) && selectedStepTone ? 'bg-[#94a3b8] text-black shadow-2xl hover:scale-[1.03]' : 'bg-[#33333a] text-[#5b5b7b] cursor-not-allowed'}`}
            >
              <Sparkles className="w-6 h-6" />
              Gerar Prompt & Visual
            </button>
          </div>
        </div>
      )}

      {/* Step 5: Final Result (Workstation) */}
      {step === 5 && (
        <div className="w-full max-w-[1240px] flex flex-col items-center animate-in fade-in zoom-in duration-700">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="w-[52px] h-[52px] bg-[#00b37e]/10 border border-[#00b37e]/30 rounded-full flex items-center justify-center mb-10 shadow-[0_0_30px_rgba(0,179,126,0.1)]">
              <CheckCircle2 className="w-6 h-6 text-[#00b37e]" />
            </div>
            <h1 className="text-[42px] font-black text-white tracking-tighter mb-4 leading-tight">
              Direção de IA Pronta!
            </h1>
            <p className="text-[#8d8d99] text-base font-medium opacity-70">
              Seu storyboard técnico foi gerado. Siga o checklist ao lado para finalizar.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.35fr] gap-5 md:gap-8 w-full">
            {/* Left side: Reference Images */}
            <div className="flex flex-col gap-5 md:gap-8">
              <div className="relative rounded-[32px] overflow-hidden group border border-white/5 shadow-[0_30px_60px_rgba(0,0,0,0.6)]">
                <img
                  src={allInfluencers.find(i => i.id === selectedInfluencer)?.image || allInfluencers[0].image}
                  className="w-full aspect-[4/3.5] object-cover opacity-90 group-hover:opacity-100 transition-all duration-700"
                  alt="Actor"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:pointer-events-auto">
                  <button
                    onClick={() => {
                      const url = allInfluencers.find(i => i.id === selectedInfluencer)?.image || allInfluencers[0].image;
                      window.open(url, '_blank');
                    }}
                    className="flex items-center gap-3 px-8 py-3.5 bg-[#0b0c10]/60 backdrop-blur-xl border border-white/10 rounded-full text-xs font-black text-white pointer-events-auto hover:bg-[#0b0c10]/80 transition-all"
                  >
                    <Download className="w-4 h-4" />
                    Obter Ator em Alta (PNG)
                  </button>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8 bg-gradient-to-t from-black via-black/40 to-transparent">
                  <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.25em] block mb-1">ATOR PRINCIPAL</span>
                  <span className="text-xl font-black text-white tracking-tight leading-none">{allInfluencers.find(i => i.id === selectedInfluencer)?.name || 'Ana'}</span>
                </div>
              </div>

              <div className="relative rounded-[32px] overflow-hidden group border border-[#1e1f26] shadow-[0_30px_60px_rgba(0,0,0,0.6)] bg-[#14151a] flex flex-col min-h-[340px]">
                <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative">
                  <img
                    src={viralStepProducts.find(p => p.id === selectedProduct)?.image || viralStepProducts[0].image}
                    className="max-w-[180px] aspect-square object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] opacity-90 group-hover:opacity-100 transition-all duration-700"
                    alt="Product"
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:pointer-events-auto">
                    <button
                      onClick={() => {
                        const url = viralStepProducts.find(p => p.id === selectedProduct)?.image || viralStepProducts[0].image;
                        window.open(url, '_blank');
                      }}
                      className="flex items-center gap-3 px-8 py-3.5 bg-[#0b0c10]/60 backdrop-blur-xl border border-white/10 rounded-full text-xs font-black text-white pointer-events-auto hover:bg-[#0b0c10]/80 transition-all"
                    >
                      <Download className="w-4 h-4" />
                      Obter Produto em Alta (PNG)
                    </button>
                  </div>
                </div>
                <div className="p-5 md:p-8 pt-0">
                  <span className="text-[10px] font-black text-[#5b5b7b] uppercase tracking-[0.25em] block mb-1">PRODUTO FOCO</span>
                  <span className="text-xl font-black text-white tracking-tight leading-none">High Res Cutout</span>
                </div>
              </div>
            </div>

            {/* Right side: Station / Checklist */}
            <div className="bg-[#14151a] border border-[#1e1f26] rounded-[48px] p-6 md:p-10 lg:p-14 shadow-2xl relative">
              <div className="flex items-center gap-3 mb-10">
                <Stars className="w-5 h-5 text-[#3B82F6] fill-[#3B82F6]" />
                <h3 className="text-[22px] font-black text-white tracking-tighter uppercase tracking-[0.1em]">Estação de Trabalho</h3>
              </div>

              <div className="flex flex-col gap-14 relative">
                <div className="absolute left-[13px] top-6 bottom-6 w-[2px] bg-[#1c1c21]"></div>

                {/* STEP 1 */}
                <div className="flex items-start gap-5 md:gap-8 relative z-10">
                  <div className="w-7 h-7 bg-[#1c1c21] border border-[#1e1f26] rounded-full flex items-center justify-center text-[11px] font-black text-[#44444f] shadow-lg">1</div>
                  <div className="flex-1">
                    <h4 className="text-[19px] font-black text-[#e1e1e6] mb-1.5 tracking-tight">Salvar Referências Visuais</h4>
                    <p className="text-[#5b5b7b] text-sm font-medium leading-relaxed">Clique nas imagens ao lado para baixar os assets.</p>
                  </div>
                </div>

                {/* STEP 2 */}
                <div className="flex items-start gap-5 md:gap-8 relative z-10">
                  <div className="w-7 h-7 bg-[#1c1c21] border border-[#1e1f26] rounded-full flex items-center justify-center text-[11px] font-black text-[#44444f] shadow-lg">2</div>
                  <div className="flex-1">
                    <h4 className="text-[19px] font-black text-[#e1e1e6] mb-1.5 tracking-tight">Roteiro de Direção (Veo 3)</h4>
                    <p className="text-[#5b5b7b] text-sm font-medium leading-relaxed mb-10">3 takes de 8 segundos cada. Gere cada vídeo separadamente e junte na edição.</p>

                    <div className="flex flex-col gap-4">
                      {[1, 2, 3].map((take) => (
                        <div key={take} className="bg-[#1c1c21] border border-[#1e1f26] rounded-[24px] p-6 flex flex-col gap-5 group hover:border-[#3B82F6]/20 transition-all">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-2.5 h-2.5 bg-[#00b37e] rounded-full shadow-[0_0_10px_rgba(0,179,126,0.3)]"></div>
                              <span className="text-[10px] font-black text-[#5b5b7b] uppercase tracking-[0.25em]">TAKE {take}/3</span>
                            </div>
                            <button className="text-[9px] font-black text-[#5b5b7b] uppercase tracking-[0.2em] hover:text-white transition-colors underline underline-offset-[6px]">[Ver Prompt]</button>
                          </div>

                          <button className="w-full flex items-center justify-center gap-3 py-4 bg-[#8d8d99] hover:bg-[#a8a8b3] rounded-2xl text-[13px] font-black text-black transition-all shadow-lg active:scale-[0.98]">
                            <ArrowUpRight className="w-4 h-4 stroke-[3px]" />
                            Copiar Take {take}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* STEP 3 */}
                <div className="flex items-start gap-5 md:gap-8 relative z-10">
                  <div className="w-7 h-7 bg-[#1c1c21] border border-[#1e1f26] rounded-full flex items-center justify-center text-[11px] font-black text-[#44444f] shadow-lg">3</div>
                  <div className="flex-1 pt-1">
                    <h4 className="text-[19px] font-black text-[#e1e1e6] mb-8 tracking-tight">Finalizar no Veo 3</h4>
                    <button className="w-full py-5 bg-[#3B82F6] hover:bg-[#4338ca] text-white rounded-2xl font-black text-base flex items-center justify-center gap-3 shadow-[0_15px_40px_rgba(81,66,245,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98]">
                      <Video className="w-6 h-6 fill-current" />
                      Abrir Veo Studio
                      <ExternalLink className="w-5 h-5 opacity-40 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="h-24"></div>
    </main>
  );
};

// --- PREVISIBILIDADE RECEITA VIEW ---
const PrevisibilidadeReceitaView: React.FC = () => {
  const [accounts, setAccounts] = useState(1);
  const [postsPerDay, setPostsPerDay] = useState(3);
  const [conversionRate, setConversionRate] = useState(1.5);
  const [averageTicket, setAverageTicket] = useState(97);
  const [commission, setCommission] = useState(25);

  const monthlyPosts = accounts * postsPerDay * 30;

  const formatBRL = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
  };

  const calculateResults = (viewsPerPost: number) => {
    const totalViews = monthlyPosts * viewsPerPost;
    const sales = totalViews * (conversionRate / 100);
    const totalRevenue = sales * averageTicket;
    // Fix: Remove space in variable declaration
    const predictedCommission = totalRevenue * (commission / 100);

    return {
      commission: predictedCommission,
      sales: Math.round(sales),
      totalRevenue: totalRevenue
    };
  };

  const projections = [
    {
      id: 'conservador',
      label: 'Conservador',
      views: '~250 views',
      icon: <Monitor className="w-4 h-4 text-[#5b5b7b]" />,
      data: calculateResults(250)
    },
    {
      id: 'moderado',
      label: 'Moderado',
      badge: 'RECOMMENDED',
      views: '~1k views',
      icon: <Sparkles className="w-4 h-4 text-[#3B82F6]" />,
      data: calculateResults(1000),
      isRecommended: true
    },
    {
      id: 'viral',
      label: 'Viral / Agressivo',
      views: '~5k views',
      icon: <Flame className="w-4 h-4 text-[#ff8c00]" />,
      data: calculateResults(5000)
    },
  ];

  return (
    <main className="max-w-[1400px] mx-auto px-6 py-12 flex flex-col gap-6 md:gap-10">
      <div>
        <h1 className="text-[34px] font-black text-white tracking-tighter mb-2">Previsibilidade de Receita</h1>
        <p className="text-[#8d8d99] text-base font-medium opacity-80">
          Projete seus ganhos e descubra o poder de escala da sua operação no TikTok.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.4fr] gap-5 md:gap-8 items-start">
        {/* Left Column: Operation Config */}
        <div className="flex flex-col gap-5 md:gap-8">
          <div className="bg-[#14151a] border border-[#1e1f26] rounded-[40px] p-6 md:p-10 flex flex-col gap-6 md:gap-12 shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 bg-[#14151a] border border-[#1e1f26] rounded-2xl flex items-center justify-center">
                <Settings className="w-5 h-5 text-[#3B82F6]" />
              </div>
              <h3 className="text-[17px] font-black text-white tracking-tight">Configuração da Operação</h3>
            </div>

            <div className="flex flex-col gap-6 md:gap-10">
              <OperationSlider
                icon={<Users className="w-4 h-4" />}
                label="Contas TikTok"
                value={accounts}
                onChange={setAccounts}
                min={1}
                max={20}
              />
              <OperationSlider
                icon={<Video className="w-4 h-4" />}
                label="Posts por Dia (cada)"
                value={postsPerDay}
                onChange={setPostsPerDay}
                min={1}
                max={10}
              />
              <OperationSlider
                icon={<TrendingUp className="w-4 h-4" />}
                label="Taxa de Conversão"
                value={conversionRate}
                onChange={setConversionRate}
                min={0.1}
                max={5}
                step={0.1}
                suffix="%"
                info="Média do mercado: 1% a 3%."
              />
              <OperationSlider
                icon={<DollarSign className="w-4 h-4" />}
                label="Ticket Médio"
                value={averageTicket}
                onChange={setAverageTicket}
                min={10}
                max={500}
                prefix="R$ "
                suffix="R$"
              />
              <OperationSlider
                icon={<ShoppingBag className="w-4 h-4" />}
                label="Sua Comissão"
                value={commission}
                onChange={setCommission}
                min={1}
                max={100}
                suffix="%"
              />
            </div>
          </div>

          {/* Bottom Summary Tags */}
          <div className="bg-[#14151a] border border-[#1e1f26] rounded-[32px] p-5 md:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 shadow-xl">
            <div className="flex flex-col items-center">
              <span className="text-[#7f5af0]xl font-black text-white leading-none">{accounts}</span>
              <span className="text-[9px] font-black text-[#5b5b7b] uppercase tracking-[0.2em] mt-2">CONTAS</span>
            </div>
            <div className="flex flex-col items-center border-x border-[#1e1f26]">
              <span className="text-[#7f5af0]xl font-black text-white leading-none">{postsPerDay}</span>
              <span className="text-[9px] font-black text-[#5b5b7b] uppercase tracking-[0.2em] mt-2">POSTS/DIA</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[#7f5af0]xl font-black text-[#3B82F6] leading-none">{monthlyPosts}</span>
              <span className="text-[9px] font-black text-[#5b5b7b] uppercase tracking-[0.2em] mt-2">POSTS/MÊS</span>
            </div>
          </div>
        </div>

        {/* Right Column: Projections */}
        <div className="flex flex-col gap-5 md:gap-8">
          <div className="flex items-center gap-4">
            <TrendingUp className="w-6 h-6 text-[#3B82F6]" />
            <h3 className="text-xs font-black text-[#5b5b7b] uppercase tracking-[0.4em]">PROJEÇÕES DE FATURAMENTO MENSAL</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projections.map((p) => (
              <div
                key={p.id}
                className={`relative bg-[#14151a] border border-[#1e1f26] rounded-[48px] p-6 md:p-10 flex flex-col h-[740px] transition-all duration-500 hover:scale-[1.02] shadow-2xl group ${p.isRecommended ? 'ring-2 ring-[#3B82F6]/30 shadow-[#3B82F6]/10' : ''}`}
              >
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-2.5 h-2.5 rounded-full bg-current opacity-40 group-hover:opacity-100 transition-opacity" style={{ color: p.id === 'conservador' ? '#5b5b7b' : p.id === 'moderado' ? '#3B82F6' : '#ff8c00' }}></div>
                  <span className="text-base font-black text-white tracking-tight">{p.label}</span>

                  {p.isRecommended && (
                    <span className="text-[10px] font-black text-[#1E1B4B] uppercase tracking-[0.1em] ml-auto">RECOMMENDED</span>
                  )}

                  <span className={`px-2.5 py-1 bg-[#14151a] border border-[#1e1f26] text-[9px] font-bold text-[#5b5b7b] rounded-lg ${p.isRecommended ? 'ml-3' : 'ml-auto'}`}>{p.views}</span>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center text-center">
                  <span className="text-[11px] font-black text-[#5b5b7b] uppercase tracking-[0.3em] mb-4">SUA COMISSÃO PREVISTA</span>
                  <span className="text-[52px] font-black text-white tracking-tighter leading-none mb-2">
                    {formatBRL(p.data.commission)}
                  </span>
                </div>

                <div className="pt-10 border-t border-[#1e1f26] flex flex-col gap-6">
                  <div className="flex items-end justify-between">
                    <span className="text-[10px] font-black text-[#5b5b7b] uppercase tracking-[0.3em]">VENDAS</span>
                    <span className="text-2xl font-black text-white tracking-tight">{p.data.sales}</span>
                  </div>
                  <div className="flex items-end justify-between">
                    <span className="text-[10px] font-black text-[#5b5b7b] uppercase tracking-[0.3em]">FATURAMENTO TOTAL</span>
                    <span className="text-xl font-black text-white tracking-tight leading-none">
                      <span className="text-[#5b5b7b] text-sm mr-1">R$</span>
                      {p.data.totalRevenue.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                </div>

                {p.isRecommended && (
                  <div className="absolute inset-0 rounded-[48px] bg-gradient-to-b from-[#3B82F6]/[0.03] to-transparent pointer-events-none"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="h-24"></div>
    </main>
  );
};

const OperationSlider: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: number;
  onChange: (val: number) => void;
  min: number;
  max: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  info?: string;
}> = ({ icon, label, value, onChange, min, max, step = 1, prefix = '', suffix = '', info }) => (
  <div className="flex flex-col gap-5">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="text-[#3B82F6]">{icon}</div>
        <span className="text-[13px] font-bold text-[#8d8d99] tracking-tight">{label}</span>
      </div>
      <div className="px-4 py-1.5 bg-[#14151a] border border-[#1e1f26] rounded-xl text-xs font-black text-white">
        {prefix}{value}{suffix}
      </div>
    </div>

    <div className="relative flex items-center h-6 group">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1 bg-[#0b0c10] rounded-lg appearance-none cursor-pointer accent-[#3B82F6] border border-[#1e1f26]"
      />
    </div>

    {info && (
      <div className="flex items-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
        <span className="text-[10px] font-medium text-[#5b5b7b] leading-tight">{info}</span>
      </div>
    )}
  </div>
);

// --- HACKS VIRAIS VIEW ---
const HacksViraisView: React.FC<{ hacks: HackItem[], onSelectHack: (id: string) => void }> = ({ hacks, onSelectHack }) => {
  return (
    <main className="max-w-[1400px] mx-auto px-6 py-12">
      <div className="mb-14">
        <h1 className="text-[44px] font-black text-white tracking-tighter mb-2 leading-none uppercase">
          Hacks Virais
        </h1>
        <p className="text-[#8d8d99] text-base font-medium opacity-80">
          Toque para explorar os estilos de vídeo que estão dominando o TikTok e batendo 2.000 seguidores em dias.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
        {hacks.map((hack) => (
          <div
            key={hack.id}
            onClick={() => onSelectHack(hack.id)}
            className={`relative aspect-[3/4.5] rounded-[40px] overflow-hidden group cursor-pointer border transition-all duration-500 shadow-2xl ${hack.isHighlighted ? 'border-[#3B82F6] ring-1 ring-[#3B82F6]/40' : 'border-white/5 bg-[#14151a] hover:border-white/20'}`}
          >
            {hack.image.endsWith('.mp4') ? (
              <video
                src={hack.image}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              />
            ) : (
              <img src={hack.image} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" alt={hack.title} />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

            {/* Emoji Badge */}
            <div className="absolute top-8 left-8 w-12 h-12 bg-[#0b0c10]/40 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10 shadow-xl">
              <span className="text-xl">{hack.icon}</span>
            </div>

            {/* Content Bottom */}
            <div className="absolute bottom-10 left-10 right-10 flex flex-col gap-3">
              <h3 className={`text-[28px] font-black text-white tracking-tight leading-tight ${hack.isHighlighted ? '' : 'mb-2'}`}>
                {hack.title}
              </h3>

              {hack.description && (
                <p className="text-[#8d8d99] text-sm font-medium leading-relaxed mb-6 opacity-80">
                  {hack.description}
                </p>
              )}

              {hack.isHighlighted && (
                <div className="flex items-center gap-3 group/link">
                  <span className="text-[11px] font-black text-[#3B82F6] uppercase tracking-[0.2em]">VER HACKS AGORA</span>
                  <div className="h-[1px] w-12 bg-[#3B82F6] opacity-60"></div>
                </div>
              )}
            </div>

            {hack.hasVeoBadge && (
              <div className="absolute bottom-6 right-6">
                <span className="text-[9px] font-black text-[#5b5b7b] uppercase tracking-[0.1em] opacity-40">Veo</span>
              </div>
            )}

            {hack.isHighlighted && (
              <div className="absolute inset-0 bg-gradient-to-b from-[#3B82F6]/[0.02] to-transparent pointer-events-none"></div>
            )}
          </div>
        ))}
      </div>

      <div className="h-24"></div>
    </main>
  );
};

// --- HACKS VIRAIS DETALHE VIEW (CLONED FROM ATTACHED IMAGES) ---
const HacksViraisDetalheView: React.FC<{ hack: HackItem, onBack: () => void }> = ({ hack, onBack }) => {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const defaultImages = [
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&h=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&h=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=400&h=800&auto=format&fit=crop'
  ];

  const exampleImages = hack.exampleVideos || defaultImages;

  return (
    <main className="max-w-[1400px] mx-auto px-6 py-6 md:py-10 flex flex-col gap-6 md:gap-10">
      {/* Upper Navigation */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[#5b5b7b] hover:text-white transition-colors text-sm font-bold w-fit"
      >
        <ChevronLeft className="w-4 h-4" />
        Voltar para Hacks
      </button>

      {/* Main Banner */}
      <div
        className="relative border border-white/5 rounded-[40px] p-6 md:p-12 lg:p-16 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12 shadow-2xl"
        style={{ backgroundColor: hack.bannerColor }}
      >
        {/* Decoration Gradient */}
        <div className="absolute -right-20 -top-20 w-[400px] h-[400px] bg-white/5 blur-[120px] rounded-full"></div>
        <div className="absolute right-0 top-0 w-full h-full pointer-events-none">
          <div className="absolute right-12 top-12 opacity-10 blur-sm scale-150">
            <span className="text-[120px]">{hack.icon}</span>
          </div>
        </div>

        <div className="flex items-center gap-6 md:gap-12 z-10">
          <div className="w-24 h-24 bg-[#0b0c10]/40 backdrop-blur-xl rounded-[32px] flex items-center justify-center border border-white/10 shadow-2xl">
            <span className="text-2xl md:text-4xl">{hack.icon}</span>
          </div>
          <div className="flex flex-col text-center md:text-left">
            <h1 className="text-[44px] font-black text-white tracking-tighter mb-4 leading-none">{hack.title}</h1>
            <p className="text-white/60 text-lg font-medium max-w-lg leading-relaxed">
              {hack.description}
            </p>
          </div>
        </div>

        <button
          onClick={() => hack.tiktokUrl && window.open(hack.tiktokUrl, '_blank')}
          className="bg-[#0b0c10] hover:bg-[#0b0c10]/80 text-white px-8 py-4 rounded-2xl text-sm font-black flex items-center gap-3 transition-all shadow-2xl z-10"
        >
          <Video className="w-5 h-5" />
          Mais vídeos no TikTok
        </button>
      </div>

      {/* Examples Grid Section */}
      <div className="mt-10">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-[3px] h-8 bg-[#3B82F6] rounded-full"></div>
          <h2 className="text-2xl font-black text-white tracking-tight">Exemplos de Vídeos</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
          {exampleImages.map((img, idx) => (
            <div key={idx} className="flex flex-col gap-4 group">
              <div className="relative aspect-[9/16] rounded-[48px] overflow-hidden bg-[#0b0c10] shadow-2xl cursor-pointer">
                {img.includes('vimeo.com') ? (
                  <iframe
                    src={img}
                    className="absolute inset-0 w-full h-full border-0 scale-[1.35] bg-[#0b0c10]"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : img.endsWith('.mp4') ? (
                  <video
                    src={img}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 scale-105"
                  />
                ) : (
                  <img
                    src={img}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 scale-105"
                    alt="Video Example"
                  />
                )}

                {/* Top Right Mute Icon */}
                {!img.includes('vimeo.com') && (
                  <div className="absolute top-8 right-8 w-10 h-10 bg-[#0b0c10]/40 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 opacity-60">
                    <VolumeX className="w-4 h-4 text-white" />
                  </div>
                )}

                {/* Center Pause Button */}
                {!img.includes('vimeo.com') && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform">
                      <Pause className="w-8 h-8 text-white fill-white" />
                    </div>
                  </div>
                )}

                {/* Bottom Text Overlay */}
                <div className="absolute bottom-8 left-8 flex flex-col">
                  <span className="text-white text-base font-black tracking-tight drop-shadow-lg">Estilo validado</span>
                </div>

                {/* Veo watermark like badge */}
                <div className="absolute bottom-6 right-6">
                  <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.1em]">Veo</span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <a
                  href="https://www.transcript24.com/pt-BR"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-5 bg-[#14151a] border border-white/5 hover:border-[#3B82F6]/30 rounded-2xl text-[13px] font-black text-[#8d8d99] hover:text-white flex items-center justify-center gap-3 transition-all shadow-lg"
                >
                  <FileText className="w-4 h-4 text-[#3B82F6]" />
                  Script (Transcrever)
                </a>

                <button
                  onClick={() => {
                    const promptToCopy = hack.examplePrompts?.[idx] || "";
                    if (promptToCopy) {
                      navigator.clipboard.writeText(promptToCopy);
                      setCopiedIdx(idx);
                      setTimeout(() => setCopiedIdx(null), 2000);
                    }
                  }}
                  className={`w-full py-4 rounded-2xl text-[13px] font-black flex items-center justify-center gap-3 transition-all shadow-lg active:scale-[0.98] ${copiedIdx === idx
                    ? 'bg-[#10b981] text-white'
                    : 'bg-[#312E81] hover:bg-[#3730A3] text-white'
                    }`}
                >
                  {copiedIdx === idx ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Copiado!
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Copiar Prompt
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-24"></div>
    </main>
  );
};

// --- PASSOS INICIAIS VIEW ---
const PassosIniciaisView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <main className="max-w-[1400px] mx-auto px-6 py-10 md:py-16">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[#5b5b7b] hover:text-white transition-colors text-sm font-bold w-fit mb-10 group"
      >
        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-all">
          <ChevronLeft className="w-4 h-4" />
        </div>
        <span className="uppercase tracking-[0.1em]">VOLTAR PARA MÓDULOS</span>
      </button>

      <div className="max-w-4xl">
        <h1 className="text-[40px] font-black text-white tracking-tighter mb-4 leading-tight">Passos iniciais</h1>
        <p className="text-[#8d8d99] text-lg font-medium opacity-80 mb-12 italic">
          Tudo o que você precisa saber para começar do jeito certo.
        </p>

        <div className="flex flex-col gap-6 md:gap-12">
          {/* Section 1 */}
          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-black text-white tracking-tight uppercase">BEM-VINDO AO TRENDFY APP</h2>
            <p className="text-[#8d8d99] text-base font-medium leading-relaxed max-w-3xl">
              O Trendfy é sua ferramenta definitiva para dominar o TikTok Shop. Nosso objetivo é fornecer dados, criativos e conhecimento para você escalar suas vendas.
            </p>
          </section>

          {/* Section 2 */}
          <section className="flex flex-col gap-6">
            <h2 className="text-xl font-black text-white tracking-tight uppercase">PRIMEIROS PASSOS</h2>

            <div className="flex flex-col gap-4">
              {[
                "Configure seu perfil completo no app.",
                "Conecte sua conta do TikTok para sincronizar dados.",
                "Explore a aba de \"Produtos Virais\" para identificar oportunidades.",
                "Familiarize-se com a calculadora de projeção de lucros."
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 group">
                  <div className="w-5 h-5 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-[#3B82F6]" />
                  </div>
                  <span className="text-[#e1e1e6] text-base font-medium opacity-90 group-hover:opacity-100 transition-opacity">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Important Box */}
          <div className="mt-2 p-6 bg-gradient-to-br from-[#1e1508] to-[#111114] border border-[#f59e0b]/20 rounded-[24px] flex items-center gap-5 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#f59e0b]/5 blur-[50px] rounded-full"></div>
            <div className="w-12 h-12 bg-[#f59e0b] rounded-xl flex items-center justify-center shrink-0 shadow-[0_10px_30px_rgba(245,158,11,0.2)]">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <p className="text-[#f59e0b] text-base font-black leading-snug tracking-tight">
              IMPORTANTE: O sucesso no TikTok Shop depende de consistência e análise de dados, não de sorte.
            </p>
          </div>
        </div>
      </div>

      <div className="h-32"></div>
    </main>
  );
};

// --- COMO SE AFILIAR VIEW ---
const ComoSeAfiliarView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <main className="max-w-[1400px] mx-auto px-6 py-10 md:py-16">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[#5b5b7b] hover:text-white transition-colors text-sm font-bold w-fit mb-10 group"
      >
        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-all">
          <ChevronLeft className="w-4 h-4" />
        </div>
        <span className="uppercase tracking-[0.1em]">VOLTAR PARA MÓDULOS</span>
      </button>

      <div className="max-w-4xl">
        <h1 className="text-[40px] font-black text-white tracking-tighter mb-4 leading-tight">Como se afiliar no TikTok Shop</h1>
        <p className="text-[#8d8d99] text-lg font-medium opacity-80 mb-12 italic">
          Passo a passo detalhado para sua primeira afiliação.
        </p>

        <div className="flex flex-col gap-6 md:gap-12">
          {/* Section 1 */}
          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-black text-white tracking-tight uppercase">REQUISITOS PARA AFILIAÇÃO</h2>
            <p className="text-[#8d8d99] text-base font-medium leading-relaxed max-w-3xl">
              Para começar a vender como afiliado, você precisa atender a certos critérios básicos do TikTok.
            </p>

            <div className="flex flex-col gap-4 mt-2">
              {[
                "Ter uma conta ativa com mais de 1.000 seguidores (ou usar uma conta Business/Seller).",
                "Ser maior de 18 anos.",
                "Ter publicado vídeos nos últimos 30 dias."
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 group">
                  <div className="w-5 h-5 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-[#3B82F6]" />
                  </div>
                  <span className="text-[#e1e1e6] text-base font-medium opacity-90 group-hover:opacity-100 transition-opacity">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Section 2 */}
          <section className="flex flex-col gap-6">
            <h2 className="text-xl font-black text-white tracking-tight uppercase">PASSO A PASSO NO APP</h2>

            <div className="flex flex-col gap-4">
              {[
                "Vá ao seu perfil e clique no menu de três linhas.",
                "Selecione \"Ferramentas do Criador\".",
                "Clique em \"TikTok Shop para Criadores\".",
                "Siga as instruções de inscrição e aguarde a aprovação."
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 group">
                  <span className="text-[#3B82F6] text-base font-black pt-0.5">{idx + 1}.</span>
                  <span className="text-[#e1e1e6] text-base font-medium opacity-90 group-hover:opacity-100 transition-opacity">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Dica Box */}
          <div className="mt-2 p-6 bg-gradient-to-br from-[#1e1508] to-[#111114] border border-[#f59e0b]/20 rounded-[24px] flex items-center gap-5 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#f59e0b]/5 blur-[50px] rounded-full"></div>
            <div className="w-12 h-12 bg-[#f59e0b] rounded-xl flex items-center justify-center shrink-0 shadow-[0_10px_30px_rgba(245,158,11,0.2)]">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <p className="text-[#f59e0b] text-base font-black leading-snug tracking-tight">
              DICA: Escolha nichos que você já domina para facilitar a criação de conteúdo autêntico.
            </p>
          </div>
        </div>
      </div>

      <div className="h-32"></div>
    </main>
  );
};

// --- REGRAS E RESTRICOES VIEW ---
const RegrasERestricoesView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <main className="max-w-[1400px] mx-auto px-6 py-10 md:py-16">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[#5b5b7b] hover:text-white transition-colors text-sm font-bold w-fit mb-10 group"
      >
        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-all">
          <ChevronLeft className="w-4 h-4" />
        </div>
        <span className="uppercase tracking-[0.1em]">VOLTAR PARA MÓDULOS</span>
      </button>

      <div className="max-w-4xl">
        <h1 className="text-[40px] font-black text-white tracking-tighter mb-4 leading-tight">Regras e restrições importantes de conhecer</h1>
        <p className="text-[#8d8d99] text-lg font-medium opacity-80 mb-12 italic">
          Evite bloqueios e penalidades conhecendo as diretrizes.
        </p>

        <div className="flex flex-col gap-6 md:gap-12">
          {/* Section 1 */}
          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-black text-white tracking-tight uppercase">DIRETRIZES DE CONTEÚDO</h2>
            <p className="text-[#8d8d99] text-base font-medium leading-relaxed max-w-3xl">
              O TikTok é rigoroso quanto à qualidade e autenticidade. Violar regras pode resultar em "Shadowban" ou suspensão da conta.
            </p>
          </section>

          {/* Section 2 */}
          <section className="flex flex-col gap-6">
            <h2 className="text-xl font-black text-white tracking-tight uppercase">O QUE NÃO FAZER</h2>

            <div className="flex flex-col gap-4 mt-2">
              {[
                { title: "Spam de vídeos:", desc: "Não poste o mesmo vídeo múltiplas vezes." },
                { title: "Conteúdo de baixa qualidade:", desc: "Vídeos pixelados ou sem áudio claro são penalizados." },
                { title: "Promessas falsas:", desc: "Não exagere nos benefícios do produto." },
                { title: "Direitos Autorais:", desc: "Use apenas músicas da biblioteca comercial do TikTok." }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 group">
                  <div className="w-5 h-5 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-[#3B82F6]" />
                  </div>
                  <p className="text-[#e1e1e6] text-base font-medium opacity-90 group-hover:opacity-100 transition-opacity">
                    <span className="font-bold">{item.title}</span> {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Warning Box */}
          <div className="mt-2 p-6 bg-gradient-to-br from-[#1e1508] to-[#111114] border border-[#f59e0b]/20 rounded-[24px] flex items-center gap-5 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#f59e0b]/5 blur-[50px] rounded-full"></div>
            <div className="w-12 h-12 bg-[#f59e0b] rounded-xl flex items-center justify-center shrink-0 shadow-[0_10px_30px_rgba(245,158,11,0.2)]">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <p className="text-[#f59e0b] text-base font-black leading-snug tracking-tight">
              CUIDADO: Links externos na bio ou nos comentários podem diminuir o alcance do seu vídeo.
            </p>
          </div>
        </div>
      </div>

      <div className="h-32"></div>
    </main>
  );
};

// --- COMO CRIAR AVATAR IA VIEW ---
const ComoCriarAvatarIAView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <main className="max-w-[1400px] mx-auto px-6 py-10 md:py-16">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[#5b5b7b] hover:text-white transition-colors text-sm font-bold w-fit mb-10 group"
      >
        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-all">
          <ChevronLeft className="w-4 h-4" />
        </div>
        <span className="uppercase tracking-[0.1em]">VOLTAR PARA MÓDULOS</span>
      </button>

      <div className="max-w-4xl">
        <h1 className="text-[40px] font-black text-white tracking-tighter mb-4 leading-tight">Como criar avatar com IA</h1>
        <p className="text-[#8d8d99] text-lg font-medium opacity-80 mb-12 italic">
          Use inteligência artificial para criar apresentadores humanos e realistas.
        </p>

        <div className="flex flex-col gap-6 md:gap-12">
          {/* Section 1 */}
          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-black text-white tracking-tight uppercase">UTILIZANDO A FERRAMENTA DE AVATAR</h2>
            <p className="text-[#8d8d99] text-base font-medium leading-relaxed max-w-3xl">
              Nossa IA permite gerar apresentadores que falam seu roteiro com expressões naturais.
            </p>
          </section>

          {/* Section 2 */}
          <section className="flex flex-col gap-6">
            <h2 className="text-xl font-black text-white tracking-tight uppercase">FLUXO DE TRABALHO</h2>

            <div className="flex flex-col gap-4 mt-2">
              {[
                "Acesse o menu \"Avatar Galeria\".",
                "Selecione um dos presets validados (como a \"Fernanda\" ou o \"Marcos\").",
                "Defina o \"Prompt Técnico\" descrevendo o tom de voz e o ambiente.",
                "Insira seu roteiro final e clique em \"Gerar Avatar\"."
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 group">
                  <div className="w-5 h-5 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-[#3B82F6]" />
                  </div>
                  <span className="text-[#e1e1e6] text-base font-medium opacity-90 group-hover:opacity-100 transition-opacity">{item}</span>
                </div>
              ))}
            </div>

            <p className="text-[#8d8d99] text-base font-medium leading-relaxed max-w-3xl italic mt-4">
              Lembre-se de manter o roteiro conciso (entre 15 a 45 segundos) para reter a atenção do espectador no TikTok.
            </p>
          </section>
        </div>
      </div>

      <div className="h-32"></div>
    </main>
  );
};

// --- COMO CRIAR VIDEOS UGC VIEW ---
const ComoCriarVideosUGCView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <main className="max-w-[1400px] mx-auto px-6 py-10 md:py-16">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[#5b5b7b] hover:text-white transition-colors text-sm font-bold w-fit mb-10 group"
      >
        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-all">
          <ChevronLeft className="w-4 h-4" />
        </div>
        <span className="uppercase tracking-[0.1em]">VOLTAR PARA MÓDULOS</span>
      </button>

      <div className="max-w-4xl">
        <h1 className="text-[40px] font-black text-white tracking-tighter mb-4 leading-tight">Como criar vídeos com UGC Criador</h1>
        <p className="text-[#8d8d99] text-lg font-medium opacity-80 mb-12 italic">
          Aprenda a criar roteiros e vídeos que vendem usando nossa ferramenta.
        </p>

        <div className="flex flex-col gap-6 md:gap-12">
          {/* Section 1 */}
          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-black text-white tracking-tight uppercase">CRIAÇÃO DE VÍDEOS UGC</h2>
            <p className="text-[#8d8d99] text-base font-medium leading-relaxed max-w-3xl">
              User Generated Content (UGC) é o formato que mais converte hoje. Nossa ferramenta automatiza a estrutura desses vídeos.
            </p>
          </section>

          {/* Section 2 */}
          <section className="flex flex-col gap-6">
            <h2 className="text-xl font-black text-white tracking-tight uppercase">CONFIGURANDO SEU VÍDEO</h2>

            <div className="flex flex-col gap-4 mt-2">
              {[
                "Escolha o Tipo de Vídeo: \"Influencer\" para conexão ou \"POV\" para foco no produto.",
                "Selecione o Cenário: Use \"Quarto Aconchegante\" para produtos de estética ou \"Cozinha\" para utensílios.",
                "Defina o Tom: \"Animado\" para lançamentos ou \"Calmo\" para produtos relaxantes.",
                "Gere o Roteiro via IA e faça os ajustes finais antes da produção."
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 group">
                  <div className="w-5 h-5 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-[#3B82F6]" />
                  </div>
                  <span className="text-[#e1e1e6] text-base font-medium opacity-90 group-hover:opacity-100 transition-opacity">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Strategy Box */}
          <div className="mt-2 p-6 bg-gradient-to-br from-[#1e1508] to-[#111114] border border-[#f59e0b]/20 rounded-[24px] flex items-center gap-5 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#f59e0b]/5 blur-[50px] rounded-full"></div>
            <div className="w-12 h-12 bg-[#f59e0b] rounded-xl flex items-center justify-center shrink-0 shadow-[0_10px_30px_rgba(245,158,11,0.2)]">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <p className="text-[#f59e0b] text-base font-black leading-snug tracking-tight">
              ESTRATÉGIA: O "Gancho" (os primeiros 3 segundos) é a parte mais importante do seu vídeo UGC.
            </p>
          </div>
        </div>
      </div>

      <div className="h-32"></div>
    </main>
  );
};

// --- CREATOR ACADEMY VIEW (CLONED FROM ATTACHED IMAGES) ---
const CreatorAcademyView: React.FC<{ onSelectModule: (id: string) => void }> = ({ onSelectModule }) => {
  return (
    <main className="max-w-[1400px] mx-auto px-6 py-10 md:py-16 flex flex-col items-center">
      {/* Title Section */}
      <div className="text-center mb-16">
        <h1 className="text-[48px] font-black text-white tracking-tighter mb-4 leading-none uppercase">Creator Academy</h1>
        <p className="text-[#8d8d99] text-lg font-medium opacity-80">
          O centro de conhecimento para escalar seu negócio no TikTok Shop.
        </p>
      </div>

      {/* Hero Card */}
      <div className="w-full relative bg-gradient-to-br from-[#16161A] via-[#1F2028] to-[#111114] border border-white/5 rounded-[48px] p-6 md:p-12 lg:p-20 overflow-hidden mb-24 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-16">
        {/* Decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#3B82F6]/5 to-transparent pointer-events-none"></div>
        <div className="absolute right-[-100px] top-[-50px] w-[600px] h-[600px] bg-[#3B82F6]/10 blur-[150px] rounded-full pointer-events-none"></div>

        <div className="flex flex-col items-center lg:items-start max-w-2xl z-10">
          <div className="flex items-center gap-3 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-black text-white/50 uppercase tracking-[0.2em] mb-10">
            <GraduationCap className="w-4 h-4 text-[#3B82F6]" />
            Domine o TikTok Shop com aulas práticas e estratégias validadas.
          </div>

          <h2 className="text-[64px] font-black text-white tracking-tighter mb-8 leading-[0.9] text-center lg:text-left">
            Guia Mestre de <br />
            <span className="text-[#3B82F6]">TikTok Shop</span>
          </h2>

          <p className="text-[#8d8d99] text-xl font-medium mb-12 leading-relaxed text-center lg:text-left max-w-xl">
            Explore as diretrizes oficiais e os atalhos validados para construir um ecossistema de vendas lucrativo.
          </p>

          <button className="bg-white/10 hover:bg-white/20 border border-white/10 text-white px-6 md:px-10 py-5 rounded-2xl text-base font-black flex items-center gap-3 transition-all backdrop-blur-xl shadow-2xl">
            COMEÇAR JORNADA
            <ArrowRight className="w-5 h-5 text-[#3B82F6]" />
          </button>
        </div>

        {/* Illustration Placeholder */}
        <div className="relative w-full max-w-[400px] aspect-square z-10 flex items-center justify-center">
          <div className="absolute inset-0 bg-white/5 border border-white/10 rounded-[56px] shadow-inner rotate-3"></div>
          <div className="relative w-full h-full bg-[#1c1c21] border border-white/10 rounded-[56px] shadow-2xl flex flex-col items-center justify-center -rotate-3 overflow-hidden">
            <Rocket className="w-40 h-40 text-[#3B82F6]/20 mb-[-20px]" />
            <div className="absolute bottom-[-20px] right-[-20px] opacity-10">
              <LayoutGrid className="w-40 h-40 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Module 1 */}
      <div className="w-full mb-24">
        <div className="flex items-center gap-5 mb-12">
          <h2 className="text-[28px] font-black text-white tracking-tighter uppercase leading-none">Módulo 1</h2>
          <span className="text-[11px] font-black text-[#3B82F6] uppercase tracking-[0.4em] pt-1">PASSOS INICIAIS</span>
          <div className="flex-1 h-[1px] bg-white/5 ml-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
          <AcademyCard
            title="Passos iniciais"
            description="Tudo o que você precisa saber para começar do jeito certo."
            onClick={() => onSelectModule('passos-iniciais')}
          />
          <AcademyCard
            title="Como se afiliar no TikTok Shop"
            description="Passo a passo detalhado para sua primeira afiliação."
            onClick={() => onSelectModule('como-se-afiliar')}
          />
          <AcademyCard
            title="Regras e restrições importantes de conhecer"
            description="Evite bloqueios e penalidades conhecendo as diretrizes."
            onClick={() => onSelectModule('regras-e-restricoes')}
          />
        </div>
      </div>

      {/* Module 2 */}
      <div className="w-full mb-32">
        <div className="flex items-center gap-5 mb-12">
          <h2 className="text-[28px] font-black text-white tracking-tighter uppercase leading-none">Módulo 2</h2>
          <span className="text-[11px] font-black text-[#3B82F6] uppercase tracking-[0.4em] pt-1">IA & CONTEÚDO</span>
          <div className="flex-1 h-[1px] bg-white/5 ml-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
          <AcademyCard
            title="Como criar avatar with IA"
            description="Use inteligência artificial para criar apresentadores humanos e realistas."
            onClick={() => onSelectModule('como-criar-avatar-ia')}
          />
          <AcademyCard
            title="Como criar vídeos com UGC Criador"
            description="Aprenda a criar roteiros e vídeos que vendem usando nossa ferramenta."
            isHighlighted
            onClick={() => onSelectModule('como-criar-videos-ugc')}
          />
        </div>
      </div>

      {/* Support Section */}
      <div className="w-full relative bg-[#1c1c21]/50 border border-white/5 rounded-[48px] p-6 md:p-12 lg:p-20 overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12">
        <div className="flex flex-col items-center md:items-start text-center md:text-left z-10">
          <span className="px-5 py-2 bg-white/5 border border-white/10 rounded-full text-[9px] font-black text-white/40 uppercase tracking-[0.3em] mb-8">Canal Oferecido</span>
          <h3 className="text-[52px] font-black text-white tracking-tighter leading-[0.9] mb-8">
            Dúvidas ou <br />
            <span className="text-[#3B82F6]">Dificuldades?</span>
          </h3>
          <p className="text-[#8d8d99] text-lg font-medium opacity-80 max-w-sm leading-relaxed">
            Nossa equipe de especialistas está pronta para ajudar você a destravar seus resultados.
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-6 z-10">
          <button className="bg-[#3B82F6] hover:bg-[#4338ca] text-white px-6 md:px-10 py-5 rounded-2xl text-base font-black flex items-center gap-3 transition-all shadow-[0_20px_50px_rgba(81,66,245,0.3)] hover:scale-[1.03]">
            <Mail className="w-6 h-6" />
            Contatar Suporte
          </button>
          <span className="text-[11px] font-black text-[#5b5b7b] uppercase tracking-[0.3em]">SUPORTETRENDFYAPP@GMAIL.COM</span>
        </div>
      </div>

      <div className="h-24"></div>
    </main>
  );
};

const AcademyCard: React.FC<{ title: string, description: string, isHighlighted?: boolean, onClick?: () => void }> = ({ title, description, isHighlighted, onClick }) => (
  <div
    onClick={onClick}
    className={`bg-[#14151a] border rounded-[40px] p-6 md:p-10 flex flex-col justify-between group hover:border-[#3B82F6]/30 transition-all shadow-2xl h-[340px] cursor-pointer ${isHighlighted ? 'border-[#3B82F6]/20 ring-1 ring-[#3B82F6]/10' : 'border-white/5'}`}
  >
    <div className="flex flex-col items-start gap-5 md:gap-8">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border border-white/5 transition-all shadow-xl ${isHighlighted ? 'bg-[#3B82F6] text-white' : 'bg-[#24242a] text-[#3B82F6]'}`}>
        <FileText className="w-6 h-6" />
      </div>
      <div className="flex flex-col gap-4">
        <h4 className="text-[22px] font-black text-white tracking-tight leading-[1.2] group-hover:text-[#3B82F6] transition-colors">{title}</h4>
        <p className="text-[#8d8d99] text-sm font-medium leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity">{description}</p>
      </div>
    </div>

    <div className="flex items-center justify-between pt-10 border-t border-white/5 mt-auto">
      <span className="text-[11px] font-black text-[#5b5b7b] uppercase tracking-[0.2em] group-hover:text-white transition-colors">Ler Artigo</span>
      <div className={`w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-all group-hover:scale-110 ${isHighlighted ? 'bg-[#3B82F6] text-white border-none' : 'bg-white/5 text-[#5b5b7b] group-hover:text-white group-hover:bg-[#3B82F6]/10'}`}>
        <ChevronRight className="w-5 h-5" />
      </div>
    </div>
  </div>
);

// --- GALERIA AVATARES VIEW ---
const GaleriaAvataresView: React.FC<{ onGoToMyAvatars: () => void; onCreateNew: () => void }> = ({ onGoToMyAvatars, onCreateNew }) => {
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarItem | null>(null);
  const [hoveredAvatarId, setHoveredAvatarId] = useState<string | null>(null);

  const avatars: AvatarItem[] = [
    { id: 'av1', name: 'Ana', role: 'Lifestyle Creator', image: 'https://i.imgur.com/hrGOGFM.png', hoverImage: 'https://www.trendfyai.space/avatars/ana.gif', description: 'Ana é especialista em vlogs de lifestyle e rotina, perfeita para unboxings autênticos.' },
    { id: 'av2', name: 'Fernanda', role: 'Beauty Expert', image: 'https://i.imgur.com/3mnJIzU.png', hoverImage: 'https://www.trendfyai.space/avatars/fernanda.gif', description: 'Fernanda domina o nicho de beleza e maquiagem, trazendo elegância e autoridade.' },
    { id: 'av3', name: 'Carla', role: 'Fashion Specialist', image: 'https://i.imgur.com/gu8PLki.png', hoverImage: 'https://www.trendfyai.space/avatars/carla.gif', description: 'Carla é expert em moda e tendências, ideal para provadores e looks do dia.' },
    { id: 'av4', name: 'Juliana', role: 'Home & Decor', image: 'https://i.imgur.com/gPcVAPz.png', hoverImage: 'https://www.trendfyai.space/avatars/juliana.gif', description: 'Juliana foca em organização e decoração de casa, ideal para utilidades domésticas.' },
    { id: 'av5', name: 'Laura', role: 'Health & Wellness', image: 'https://i.imgur.com/rhvUP8G.png', hoverImage: 'https://www.trendfyai.space/avatars/laura.gif', description: 'Laura traz dicas de saúde e bem-estar, perfeita para produtos naturais e fitness.' },
    { id: 'av6', name: 'Maria', role: 'Daily Vlog', image: 'https://i.imgur.com/6vg7fRq.png', hoverImage: 'https://www.trendfyai.space/avatars/maria.gif', description: 'Maria compartilha sua rotina diária, gerando forte conexão e confiança com o público.' },
    { id: 'av7', name: 'Fábio', role: 'Tech Reviewer', image: 'https://i.imgur.com/5ymF1nv.png', hoverImage: 'https://www.trendfyai.space/avatars/fabio.gif', description: 'Fábio é especialista em reviews de tecnologia e gadgets, com visual moderno e técnico.' },
    { id: 'av8', name: 'Henrique', role: 'Gadget Enthusiast', image: 'https://i.imgur.com/WDsko8P.png', hoverImage: 'https://www.trendfyai.space/avatars/henrique.gif', description: 'Henrique adora testar novidades tecnológicas com um visual despojado e autêntico.' },
    { id: 'av9', name: 'Marcos', role: 'Fitness Coach', image: 'https://i.imgur.com/2NxpAmW.png', hoverImage: 'https://www.trendfyai.space/avatars/marcos.gif', description: 'Marcos é o avatar ideal para suplementos e equipamentos esportivos, transmitindo energia.' },
    { id: 'av10', name: 'Matheus', role: 'Business & Finance', image: 'https://i.imgur.com/8LQB3BC.png', hoverImage: 'https://www.trendfyai.space/avatars/matheus.gif', description: 'Com visual executivo, Matheus é perfeito para cursos, ferramentas SaaS e consultorias.' },
    { id: 'av11', name: 'Miguel', role: 'Cook & Foodie', image: 'https://i.imgur.com/loBeA7L.png', hoverImage: 'https://www.trendfyai.space/avatars/miguel.gif', description: 'Miguel traz autoridade e sabor para reviews de produtos de cozinha e alimentação.' },
    { id: 'av12', name: 'Pedro', role: 'Lifestyle & Travel', image: 'https://i.imgur.com/Bziwg0O.png', hoverImage: 'https://www.trendfyai.space/avatars/pedro.gif', description: 'Pedro foca em lifestyle e viagens, ideal para produtos de uso externo e aventura.' },
  ];

  return (
    <main className="max-w-[1400px] mx-auto px-6 py-12 relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-5 md:gap-8">
        <div>
          <h1 className="text-[44px] font-black text-[#3B82F6] tracking-tighter mb-4 leading-none">
            Galeria de Avatares
          </h1>
          <p className="text-[#8d8d99] text-lg font-medium opacity-80">
            Escolha um avatar profissional ou crie o seu próprio com IA.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onGoToMyAvatars}
            className="px-6 py-4 bg-[#14151a] border border-[#1e1f26] rounded-2xl flex items-center gap-3 text-sm font-black text-white hover:bg-[#24242a] transition-all relative"
          >
            <User className="w-5 h-5 text-[#5b5b7b]" />
            Meus Avatares
            <span className="w-5 h-5 bg-[#3B82F6] rounded-full flex items-center justify-center text-[10px] font-black text-white ml-1">1</span>
          </button>
          <button
            onClick={onCreateNew}
            className="px-8 py-4 bg-[#3B82F6] rounded-2xl flex items-center gap-3 text-sm font-black text-white hover:bg-[#4338ca] transition-all shadow-[0_10px_30px_rgba(81,66,245,0.2)]"
          >
            <Sparkles className="w-5 h-5" />
            Criar do Zero
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 md:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {avatars.map((avatar) => (
          <div
            key={avatar.id}
            onClick={() => setSelectedAvatar(avatar)}
            onMouseEnter={() => setHoveredAvatarId(avatar.id)}
            onMouseLeave={() => setHoveredAvatarId(null)}
            className="relative aspect-[3/4.5] rounded-[32px] overflow-hidden group cursor-pointer border border-white/5 bg-[#14151a] hover:border-[#3B82F6]/40 transition-all duration-500 shadow-2xl"
          >
            <img
              src={hoveredAvatarId === avatar.id && avatar.hoverImage ? avatar.hoverImage : avatar.image}
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              alt="Avatar"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

            <div className="absolute bottom-8 left-8">
              <span className="text-2xl font-black text-white tracking-tight block mb-1">
                {avatar.name}
              </span>
              <span className="text-xs font-bold text-[#8d8d99] uppercase tracking-widest">
                {avatar.role}
              </span>
            </div>

            <div className="absolute top-6 right-6 w-10 h-10 bg-[#0b0c10]/40 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all border border-white/10 scale-90 group-hover:scale-100">
              <Plus className="w-5 h-5 text-white" />
            </div>
          </div>
        ))}
      </div>

      {/* AVATAR DETAIL MODAL - CLONED FROM REFERENCE */}
      {selectedAvatar && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-6 animate-in fade-in duration-300">
          <div
            className="absolute inset-0 bg-[#0b0c10]/80 backdrop-blur-md"
            onClick={() => setSelectedAvatar(null)}
          ></div>

          <div className="relative bg-[#14151a] border border-[#1e1f26] rounded-[40px] w-full max-w-[840px] overflow-hidden flex flex-col md:flex-row shadow-[0_40px_100px_rgba(0,0,0,0.8)] z-10">
            {/* Left side: Large Image */}
            <div className="md:w-[45%] h-[400px] md:h-auto relative overflow-hidden bg-[#0b0c10]/40">
              <img
                src={selectedAvatar.image}
                className="w-full h-full object-cover opacity-90"
                alt={selectedAvatar.name}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
            </div>

            {/* Right side: Content */}
            <div className="flex-1 p-6 md:p-10 md:p-14 flex flex-col justify-between relative bg-[#14151a]">
              {/* Close Button */}
              <button
                onClick={() => setSelectedAvatar(null)}
                className="absolute top-8 right-8 w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-[#5b5b7b] hover:text-white hover:bg-white/10 transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div>
                <h2 className="text-[44px] font-black text-white tracking-tighter mb-4 leading-none">
                  {selectedAvatar.name}
                </h2>
                <div className="mb-8">
                  <span className="px-4 py-1.5 bg-[#3B82F6]/10 border border-[#3B82F6]/20 text-[#3B82F6] rounded-full text-[11px] font-black uppercase tracking-[0.2em]">
                    {selectedAvatar.role}
                  </span>
                </div>

                <p className="text-[#8d8d99] text-lg leading-relaxed font-medium">
                  {selectedAvatar.description || "Descrição personalizada indisponível para este avatar."}
                </p>
              </div>

              <div className="mt-12">
                <button className="w-full py-5 bg-[#3B82F6] hover:bg-[#4338ca] text-white rounded-3xl font-black text-base flex items-center justify-center gap-3 shadow-[0_15px_40px_rgba(81,66,245,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98]">
                  <Download className="w-6 h-6" />
                  Baixar Imagem do Avatar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="h-24"></div>
    </main>
  );
};

// --- GALERIA PROMPTS VIEW ---
const GaleriaPromptsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'todos' | 'favoritos'>('todos');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const prompts: PromptItem[] = [
    {
      id: 'p1',
      title: 'Selfie pensativo',
      description: 'Apenas movimentos (sem áudio).',
      gif: 'https://i.imgur.com/OQXds0Y.mp4',
      prompt: JSON.stringify({
        "part": "PHONE_SELFIE_POSE_4",
        "duration": "0.0-8.0s",
        "visual_prompt": "Ultra-realistic UGC style. First-person perspective (POV) from a smartphone camera, held by a person, with subtle, iPhone-like handheld shake and micro-instability. The person makes a subtle 'thinking' gesture, perhaps touching their chin lightly, with a curious and thoughtful expression. Natural indoor lighting, high detail skin and hair textures. Photorealistic skin with subtle texture, natural pores, soft highlights, and realistic shadows. Natural hair movement with fine strand detail and believable physics. Accurate fabric behavior and product materials with correct reflections and weight. Clean, sharp image with natural color, balanced contrast, and realistic depth of field. No over-processing, no artificial cinematic effects. No mouth movement, no dialogue, no music. Authentic, unforced posture.",
        "audio_instructions": "No audio. Silent video.",
        "movement": "Subtle 'thinking' gesture, light touch to the chin, thoughtful eye contact, gentle head movements. Hands holding the phone are stable. Natural blinking and a curious, contemplative expression. Avoid static shots, but keep everything smooth and coherent. No robotic or stiff movements.",
        "technical_constraints": {
          "style": ["UGC", "Raw", "Authentic", "Hyper-realistic"],
          "prohibitions": ["No mouth movement", "No dialogue", "No music", "No overlays", "No artificial elements", "No robotic movements", "No stiff movements", "No exaggerated gestures"],
          "requirements": ["Ultra-realism", "Natural skin shaders", "Fluid movements", "Authentic expressions", "iPhone-like handheld camera motion, subtle instability"]
        }
      }, null, 2)
    },
    {
      id: 'p2',
      title: 'Selfie cabelo',
      description: 'Apenas movimentos (sem áudio).',
      gif: 'https://i.imgur.com/QgfXnQv.mp4',
      prompt: JSON.stringify({
        "part": "PHONE_SELFIE_POSE_2",
        "duration": "0.0-8.0s",
        "visual_prompt": "Ultra-realistic UGC style. First-person perspective (POV) from a smartphone camera, held by a person, with subtle, iPhone-like handheld shake and micro-instability. The person performs a gentle hair flip or adjustment, looking playfully at the camera. Natural indoor lighting, high detail skin and hair textures. Photorealistic skin with subtle texture, natural pores, soft highlights, and realistic shadows. Natural hair movement with fine strand detail and believable physics. Accurate fabric behavior and product materials with correct reflections and weight. Clean, sharp image with natural color, balanced contrast, and realistic depth of field. No over-processing, no artificial cinematic effects. No mouth movement, no dialogue, no music. Authentic, unforced posture.",
        "audio_instructions": "No audio. Silent video.",
        "movement": "Fluid hair flip or gentle hair adjustment, playful eye contact, subtle head movements. Hands holding the phone are stable. Natural blinking and an engaging, lighthearted expression. Avoid static shots, but keep everything smooth and coherent. No robotic or stiff movements.",
        "technical_constraints": {
          "style": ["UGC", "Raw", "Authentic", "Hyper-realistic"],
          "prohibitions": ["No mouth movement", "No dialogue", "No music", "No overlays", "No artificial elements", "No robotic movements", "No stiff movements", "No exaggerated gestures"],
          "requirements": ["Ultra-realism", "Natural skin shaders", "Fluid movements", "Authentic expressions", "iPhone-like handheld camera motion, subtle instability"]
        }
      }, null, 2)
    },
    {
      id: 'p3',
      title: 'Movimento Rítmico + Apontar',
      description: 'Vídeos com dancinha que terminam em venda. Frontal UGC shot. Rhythmic movement ending in CTA.',
      gif: 'https://i.imgur.com/1CixWG7.mp4',
      prompt: JSON.stringify({
        "prompt_name": "Frontal_CTA_Rhythmic",
        "video_generation_config": {
          "duration_seconds": 8,
          "aspect_ratio": "9:16"
        },
        "scene_sequence": [
          {
            "part": "CTA_SEQUENCE",
            "duration": "0.0-8.0s",
            "visual_prompt": "Frontal UGC shot. Rhythmic movement ending in CTA. No mirror.",
            "audio_instructions": "No audio. Silent video.",
            "movement_timeline": [
              "0.0-3.0s: Subject performs a simple side-to-side step-touch dance, shoulders moving, smiling.",
              "3.0-6.0s: On the beat, stops the dance and immediately points down with both hands in a synchronized motion.",
              "6.0-8.0s: Maintains the pointing gesture while doing a small playful hip sway, ending in a stable, smiling pose."
            ]
          }
        ]
      }, null, 2)
    },
    {
      id: 'p4',
      title: 'Energia alta (Promoções rápidas)',
      description: 'Frontal UGC shot. High energy movement. No mirror. No mouth movement.',
      gif: 'https://i.imgur.com/4UkK3Es.mp4',
      prompt: JSON.stringify({
        "prompt_name": "Frontal_CTA_High_Energy",
        "video_generation_config": {
          "duration_seconds": 8,
          "aspect_ratio": "9:16"
        },
        "scene_sequence": [
          {
            "part": "CTA_SEQUENCE",
            "duration": "0.0-8.0s",
            "visual_prompt": "Frontal UGC shot. High energy movement. No mirror. No mouth movement.",
            "audio_instructions": "No audio. Silent video.",
            "movement_timeline": [
              "0.0-2.0s: Subject enters frame with a small, enthusiastic hop, smiling broadly. High energy but natural.",
              "2.0-4.0s: Quickly points downwards with one hand while the other hand stays on the hip. Does a playful 'shaking' motion with the pointing finger to draw attention.",
              "4.0-6.0s: Switches hands and points down with the other, maintaining a fun and energetic expression. Small rhythmic shoulder bounce.",
              "6.0-8.0s: Final pose pointing down with both hands, big smile, holding still and steady."
            ]
          }
        ]
      }, null, 2)
    },
    {
      id: 'p5',
      title: 'Convite amigável',
      description: 'Passar confiança e convidar o cliente de forma leve.',
      gif: 'https://i.imgur.com/5II2D99.mp4',
      prompt: JSON.stringify({
        "prompt_name": "Frontal_CTA_Friendly_Point",
        "video_generation_config": {
          "duration_seconds": 8,
          "aspect_ratio": "9:16"
        },
        "scene_sequence": [
          {
            "part": "CTA_SEQUENCE",
            "duration": "0.0-8.0s",
            "visual_prompt": "Frontal UGC shot. Focus on pointing gesture. No mirror. No mouth movement. Silent video.",
            "audio_instructions": "No audio. Silent video.",
            "movement_timeline": [
              "0.0-2.0s: Subject starts with a warm, genuine smile, making direct eye contact. A subtle, approving nod as if saying 'you'll love this'.",
              "2.0-5.0s: Smoothly brings both hands to waist level, then extends index fingers pointing directly downwards. Performs 2 gentle 'taps' in the air towards the bottom of the screen.",
              "5.0-7.0s: Maintains the pointing gesture while leaning slightly forward, eyes bright and inviting, confirming the action.",
              "7.0-8.0s: Slowly relaxes arms back to sides, maintains a confident smile, and holds perfectly still until the end."
            ]
          }
        ],
        "technical_constraints": {
          "style": ["UGC", "CTA", "Frontal"],
          "prohibitions": ["No mouth movement", "No dialogue", "No robotic gestures"],
          "requirements": ["Ultra-realism", "Fluid hand motion", "Engaging facial expression"]
        }
      }, null, 2)
    },
    {
      id: 'p6',
      title: 'Dancinhas e movimentos rítmicos',
      description: 'Engajamento e mostrar o movimento da roupa no corpo.',
      gif: 'https://i.imgur.com/32Hrn3g.mp4',
      prompt: JSON.stringify({
        "prompt_name": "Frontal_Rhythmic_Dance",
        "video_generation_config": {
          "duration_seconds": 8,
          "aspect_ratio": "9:16"
        },
        "scene_sequence": [
          {
            "part": "DANCE_SEQUENCE",
            "duration": "0.0-8.0s",
            "visual_prompt": "Adult fictional character. Frontal shot, eye-level. High-energy but natural dance movement. No mirror, no phone. Photorealistic skin and fabric. No mouth movement. Silent video.",
            "audio_instructions": "No audio. Silent video.",
            "movement_timeline": [
              "0.0-2.0s: Subject starts with a rhythmic step-touch side to side, shoulders moving in sync. Genuine, joyful smile. Direct eye contact.",
              "2.0-4.0s: Small, fluid hip sway while raising hands to chest level, snapping fingers once naturally. Hair sways with the motion.",
              "4.0-6.0s: Performs a gentle, slow body roll starting from shoulders to waist, showcasing fabric flexibility. Smile remains bright.",
              "6.0-8.0s: Transitions back to a simple rhythmic sway, ends with a playful wink and a stable pose, holding still."
            ]
          }
        ],
        "technical_constraints": {
          "style": ["UGC", "Viral Dance", "Frontal"],
          "prohibitions": ["No mouth movement", "No dialogue", "No robotic posing", "No mirror"],
          "requirements": ["Ultra-realism", "Fluid body physics", "Natural hair sway", "Rhythmic continuity"]
        }
      }, null, 2)
    },
    {
      id: 'p7',
      title: 'Revelação e admiração',
      description: 'Mostrar o look completo com uma transição fluida.',
      gif: 'https://i.imgur.com/HHpJzw9.mp4',
      prompt: JSON.stringify({
        "prompt_name": "Frontal_Reveal_Admire",
        "video_generation_config": {
          "duration_seconds": 8,
          "aspect_ratio": "9:16",
          "resolution": "1080p",
          "fps": 30
        },
        "scene_sequence": [
          {
            "part": "FULL_SEQUENCE_8S",
            "duration": "0.0-8.0s",
            "visual_prompt": "Adult fictional character (reference image provided). Frontal shot, eye-level camera. Framing from torso to mid-thigh. Photorealistic skin, natural hair physics, accurate fabric behavior. No mirror, no phone in hand. No mouth movement. Silent video.",
            "audio_instructions": "No audio. Silent video.",
            "movement_timeline": [
              "0.0-1.0s: Subject enters frame from side, centralizing in front of the camera. Relaxed posture, shoulders loose, slight smile. Direct eye contact with the lens.",
              "1.0-3.0s: Subject holds up a folded product to chest level, then slowly lowers it to reveal the outfit being worn. Gentle, fluid arm movement.",
              "3.0-5.0s: Subject gently smooths the fabric of the main garment with one hand. Performs a subtle, rhythmic weight shift from one foot to the other.",
              "5.0-7.0s: Subject slightly turns torso to one side, then back to center, a small, confident pose to highlight the silhouette.",
              "7.0-8.0s: Final: pose stable, arms relaxed, genuine smile, direct contact visual, holds still until the end."
            ]
          }
        ],
        "technical_constraints": {
          "style": ["UGC", "Frontal", "Commercial", "Fashion"],
          "prohibitions": ["No mouth movement", "No dialogue", "No mirror", "No phone in hand", "No robotic movements"],
          "requirements": ["Ultra-realism", "Natural skin texture", "Subtle handheld camera shake", "Accurate fabric weight"]
        }
      }, null, 2)
    },
    {
      id: 'p8',
      title: 'Destaque de tecido',
      description: 'Close-up frontal focado na textura e qualidade do material.',
      gif: 'https://i.imgur.com/nEUWDQD.mp4',
      prompt: JSON.stringify({
        "prompt_name": "Frontal_Fabric_Highlight",
        "video_generation_config": {
          "duration_seconds": 8,
          "aspect_ratio": "9:16"
        },
        "scene_sequence": [
          {
            "part": "FULL_SEQUENCE_8S",
            "duration": "0.0-8.0s",
            "visual_prompt": "Adult fictional character (reference image provided). Frontal UGC shot. Focus on fabric interaction. Photorealistic textures. No mirror, no phone. No mouth movement. Silent video.",
            "audio_instructions": "No audio. Silent video.",
            "movement_timeline": [
              "0.0-1.0s: Subject already centralized, soft smile, direct eye contact with the lens.",
              "1.0-3.0s: Slowly brings one hand to touch the fabric (sleeve or waist). Fingers subtly caress the material, showing texture.",
              "3.0-5.0s: Fingers lightly pinch and release the fabric, demonstrating elasticity. Glances down at the fabric, then back to camera with a nod.",
              "5.0-7.0s: Slow pivot of the hips to show drape and flow. One arm extends slightly then returns.",
              "7.0-8.0s: Holds a satisfied pose, contented smile, direct eye contact, remains still."
            ]
          }
        ],
        "technical_constraints": {
          "style": ["UGC", "Product Focus", "Frontal"],
          "prohibitions": ["No mouth movement", "No dialogue", "No mirror", "No phone in hand"],
          "requirements": ["Ultra-realism", "Detailed fabric physics", "Natural hand pressure"]
        }
      }, null, 2)
    }
  ];

  const toggleFavorite = (id: string) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredPrompts = activeTab === 'todos' ? prompts : prompts.filter(p => favorites.includes(p.id));

  return (
    <main className="max-w-[1400px] mx-auto px-6 py-12 relative">
      <div className="flex items-center gap-4 mb-12">
        <button
          onClick={() => setActiveTab('todos')}
          className={`px-6 py-3 rounded-xl flex items-center gap-2 text-sm font-bold transition-all ${activeTab === 'todos' ? 'bg-[#3B82F6] text-white shadow-[0_10px_20px_rgba(81,66,245,0.3)]' : 'bg-[#14151a] text-[#8d8d99] border border-[#1e1f26] hover:bg-[#24242a]'}`}
        >
          <Sparkles className="w-4 h-4" />
          Todos os Prompts
        </button>
        <button
          onClick={() => setActiveTab('favoritos')}
          className={`px-6 py-3 rounded-xl flex items-center gap-2 text-sm font-bold transition-all ${activeTab === 'favoritos' ? 'bg-[#3B82F6] text-white shadow-[0_10px_20px_rgba(81,66,245,0.3)]' : 'bg-[#14151a] text-[#8d8d99] border border-[#1e1f26] hover:bg-[#24242a]'}`}
        >
          <Heart className="w-4 h-4" />
          Favoritos
        </button>
      </div>

      <div className="mb-12">
        <h1 className="text-[44px] font-black text-white tracking-tighter mb-2 leading-none">
          Galeria de Prompts
        </h1>
        <p className="text-[#8d8d99] text-lg font-medium opacity-80">
          Prompts prontos para gerar vídeos e imagens
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredPrompts.map((item) => (
          <div key={item.id} className="bg-[#14151a] border border-[#1e1f26] rounded-[32px] overflow-hidden flex flex-col group transition-all hover:border-[#3B82F6]/30">
            <div className="relative aspect-[3/4.5] overflow-hidden">
              {item.gif.endsWith('.mp4') ? (
                <video
                  src={item.gif}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-500"
                />
              ) : (
                <img
                  src={item.gif}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-500"
                  alt={item.title}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>

              <button
                onClick={() => toggleFavorite(item.id)}
                className="absolute top-6 right-6 w-10 h-10 bg-[#0b0c10]/40 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 hover:bg-[#0b0c10]/60 transition-all"
              >
                <Heart className={`w-5 h-5 ${favorites.includes(item.id) ? 'fill-[#3B82F6] text-[#3B82F6]' : 'text-white'}`} />
              </button>

              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-xl font-black text-white mb-2 leading-tight">
                  {item.title}
                </h3>
                <p className="text-xs font-medium text-[#8d8d99] leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>

            <div className="p-6">
              <button
                onClick={() => copyToClipboard(item.id, item.prompt)}
                className={`w-full py-4 rounded-2xl flex items-center justify-center gap-3 text-sm font-black transition-all duration-300 ${copiedId === item.id
                  ? 'bg-[#10b981] text-white border-transparent'
                  : 'bg-[#14151a] border border-[#1e1f26] text-white hover:bg-[#24242a] group/btn'
                  }`}
              >
                {copiedId === item.id ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5 text-[#5b5b7b] group-hover/btn:text-[#3B82F6] transition-colors" />
                    Copiar Prompt
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="h-24"></div>
    </main>
  );
};

// --- MEUS AVATARES VIEW ---
const MeusAvataresView: React.FC<{ onBack: () => void; onCreateNew: () => void }> = ({ onBack, onCreateNew }) => {
  return (
    <main className="max-w-[1400px] mx-auto px-6 py-6 md:py-10 flex flex-col min-h-[70vh]">
      {/* Upper Navigation and Header Row */}
      <div className="flex flex-col gap-6 mb-12">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#5b5b7b] hover:text-white transition-colors text-sm font-bold w-fit"
        >
          <ChevronLeft className="w-4 h-4" />
          Voltar para Galeria
        </button>

        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-[44px] font-black text-white tracking-tighter mb-2 leading-none">
              Meus Avatares
            </h1>
            <p className="text-[#8d8d99] text-lg font-medium opacity-80">
              Avatares que você criou do zero com IA.
            </p>
          </div>

          <button
            onClick={onCreateNew}
            className="px-8 py-4 bg-[#3B82F6] hover:bg-[#4338ca] rounded-2xl flex items-center gap-3 text-sm font-black text-white transition-all shadow-[0_10px_30px_rgba(81,66,245,0.2)]"
          >
            <Sparkles className="w-5 h-5" />
            Criar Novo
          </button>
        </div>
      </div>

      {/* Empty State Section - Perfectly Cloned from Screenshot */}
      <div className="flex-1 flex flex-col items-center justify-center py-12 md:py-20">
        <div className="w-[88px] h-[88px] bg-[#14151a] border border-[#1e1f26] rounded-full flex items-center justify-center mb-10 shadow-2xl">
          <User className="w-10 h-10 text-[#5b5b7b]" />
        </div>

        <h2 className="text-[22px] font-black text-white tracking-tight mb-4 text-center">
          Nenhum avatar criado ainda
        </h2>

        <p className="text-[#8d8d99] text-base font-medium mb-12 text-center max-w-[420px] leading-relaxed">
          Crie seu primeiro avatar personalizado e ele aparecerá aqui.
        </p>

        <button
          onClick={onCreateNew}
          className="px-6 md:px-10 py-5 bg-[#3B82F6] hover:bg-[#4338ca] rounded-[24px] flex items-center gap-3 text-[15px] font-black text-white transition-all shadow-[0_15px_40px_rgba(81,66,245,0.25)] hover:scale-[1.03] active:scale-[0.98]"
        >
          <Sparkles className="w-5 h-5" />
          Criar Primeiro Avatar
        </button>
      </div>

      <div className="h-24"></div>
    </main>
  );
};

// --- CRIAR AVATAR VIEW ---
const CriarAvatarView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'Masc' | 'Fem'>('Fem');
  const [age, setAge] = useState(28);
  const [ethnicity, setEthnicity] = useState('Latino');
  const [authenticityMarks, setAuthenticityMarks] = useState<string[]>(['Natural']);
  const [eyeColor, setEyeColor] = useState('Brown');
  const [faceShape, setFaceShape] = useState('Oval');
  const [hairColor, setHairColor] = useState('Castanho Escuro');
  const [hairStyle, setHairStyle] = useState('Longo Liso');
  const [vibe, setVibe] = useState('Elegante');
  const [accessories, setAccessories] = useState<string[]>([]);

  const ethnicities = ['Caucasiano', 'Latino', 'Negro', 'Asiático', 'Indígena/Mestiço'];
  const authMarks = ['Sardas', 'Pinta/Sinal', 'Cicatriz Leve', 'Natural'];
  const faceShapes = ['Oval', 'Quadrado', 'Redondo', 'Fino'];
  const hairColors = [
    { name: 'Preto', color: '#000000' },
    { name: 'Castanho Escuro', color: '#3d2b1f' },
    { name: 'Loiro', color: '#e6be8a' },
    { name: 'Ruivo', color: '#4338CA' },
    { name: 'Grisalho', color: '#d3d3d3' }
  ];
  const hairStyles = ['Longo Liso', 'Curto', 'Ondulado', 'Cacheado/Crespo', 'Raspado'];
  const vibes = [
    { id: 'Fitness', label: 'Fitness', icon: <Zap className="w-4 h-4 text-[#3B82F6]" /> },
    { id: 'Streetwear', label: 'Streetwear', icon: <LayoutGrid className="w-4 h-4 text-[#3B82F6]" /> },
    { id: 'Elegante', label: 'Elegante', icon: <Sparkles className="w-4 h-4 text-[#3B82F6]" /> },
    { id: 'Casual', label: 'Casual', icon: <Home className="w-4 h-4 text-[#3B82F6]" /> }
  ];
  const accessoryOptions = ['Óculos de Grau', 'Óculos de Sol', 'Piercing no Nariz', 'Tatuagem no Pescoço'];

  const toggleAuthMark = (mark: string) => {
    if (mark === 'Natural') {
      setAuthenticityMarks(['Natural']);
    } else {
      const filtered = authenticityMarks.filter(m => m !== 'Natural');
      if (filtered.includes(mark)) {
        const next = filtered.filter(m => m !== mark);
        setAuthenticityMarks(next.length === 0 ? ['Natural'] : next);
      } else {
        setAuthenticityMarks([...filtered, mark]);
      }
    }
  };

  const toggleAccessory = (acc: string) => {
    if (accessories.includes(acc)) {
      setAccessories(accessories.filter(a => a !== acc));
    } else {
      setAccessories([...accessories, acc]);
    }
  };

  // Determine if the form is complete enough to generate
  const isFormComplete = name.trim().length > 0;

  return (
    <main className="max-w-[1400px] mx-auto px-6 py-6 md:py-10 flex flex-col min-h-screen">
      {/* Upper Navigation */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[#5b5b7b] hover:text-white transition-colors text-sm font-bold w-fit mb-10"
      >
        <ChevronLeft className="w-4 h-4" />
        Voltar para Galeria
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-6 md:gap-12 items-start">
        {/* Left Column: Form */}
        <div className="flex flex-col gap-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-7 h-7 text-[#3B82F6] fill-[#3B82F6]" />
              <h1 className="text-[34px] font-black text-white tracking-tighter">Crie seu Avatar</h1>
            </div>
            <p className="text-[#8d8d99] text-base font-medium opacity-80">
              Defina as características e gere uma foto hiper-realista.
            </p>
          </div>

          {/* Section 1: IDENTIDADE */}
          <div className="flex flex-col gap-5 md:gap-8">
            <div className="flex items-center gap-4">
              <div className="w-6 h-6 bg-[#24242a] rounded-full flex items-center justify-center text-[11px] font-black text-[#8d8d99]">1</div>
              <h3 className="text-xs font-black text-[#8d8d99] uppercase tracking-[0.3em]">IDENTIDADE</h3>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <label className="text-[11px] font-black text-[#8d8d99] uppercase tracking-widest">Nome do Avatar</label>
                <div className="relative">
                  <Type className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5b5b7b]" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Ana, João, Mariana..."
                    className="w-full bg-[#14151a] border border-[#1e1f26] rounded-2xl py-5 pl-14 pr-6 text-sm text-white placeholder:text-[#5b5b7b] focus:outline-none focus:border-[#3B82F6]/40 transition-colors"
                  />
                </div>
              </div>

              <div className="bg-[#14151a] p-1 rounded-2xl flex items-center border border-[#1e1f26] w-full">
                <button
                  onClick={() => setGender('Masc')}
                  className={`flex-1 py-4 rounded-xl text-xs font-black transition-all ${gender === 'Masc' ? 'bg-[#24242a] text-[#8d8d99] hover:text-white' : 'text-[#8d8d99] hover:text-white'}`}
                >
                  Masculino
                </button>
                <button
                  onClick={() => setGender('Fem')}
                  className={`flex-1 py-4 rounded-xl text-xs font-black transition-all ${gender === 'Fem' ? 'bg-[#24242a] text-[#3B82F6]' : 'text-[#8d8d99] hover:text-white'}`}
                >
                  Feminino
                </button>
              </div>

              <div className="flex flex-col gap-5 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-black text-[#8d8d99] uppercase tracking-widest">Idade</label>
                  <span className="bg-[#14151a] border border-[#1e1f26] px-4 py-1.5 rounded-lg text-xs font-black text-white">{age} anos</span>
                </div>
                <input
                  type="range"
                  min="18"
                  max="70"
                  value={age}
                  onChange={(e) => setAge(parseInt(e.target.value))}
                  className="w-full h-1 bg-[#14151a] rounded-lg appearance-none cursor-pointer accent-[#3B82F6]"
                />
              </div>
            </div>
          </div>

          {/* Section 2: DNA & TRAÇOS */}
          <div className="flex flex-col gap-5 md:gap-8">
            <div className="flex items-center gap-4">
              <div className="w-6 h-6 bg-[#24242a] rounded-full flex items-center justify-center text-[11px] font-black text-[#8d8d99]">2</div>
              <h3 className="text-xs font-black text-[#8d8d99] uppercase tracking-[0.3em]">DNA & TRAÇOS</h3>
            </div>

            <div className="flex flex-col gap-5 md:gap-8">
              <div className="flex flex-col gap-4">
                <label className="text-[11px] font-black text-[#8d8d99] uppercase tracking-widest">Etnia</label>
                <div className="flex flex-wrap gap-3">
                  {ethnicities.map(e => (
                    <button
                      key={e}
                      onClick={() => setEthnicity(e)}
                      className={`px-6 py-3 rounded-full text-xs font-black border transition-all ${ethnicity === e ? 'bg-[#24242a] border-[#3B82F6]/40 text-[#3B82F6]' : 'bg-[#14151a] border-[#1e1f26] text-[#8d8d99] hover:border-white/10'}`}
                    >
                      {e}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <Layout className="w-3.5 h-3.5 text-[#8d8d99]" />
                  <label className="text-[11px] font-black text-[#8d8d99] uppercase tracking-widest">Marcas de Autenticidade (Anti-IA)</label>
                </div>
                <div className="flex flex-wrap gap-3">
                  {authMarks.map(m => (
                    <button
                      key={m}
                      onClick={() => toggleAuthMark(m)}
                      className={`px-6 py-3 rounded-full text-xs font-black border transition-all ${authenticityMarks.includes(m) ? 'bg-[#24242a] border-[#3B82F6]/40 text-[#3B82F6]' : 'bg-[#14151a] border-[#1e1f26] text-[#8d8d99] hover:border-white/10'}`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <Eye className="w-3.5 h-3.5 text-[#8d8d99]" />
                  <label className="text-[11px] font-black text-[#8d8d99] uppercase tracking-widest">Olhos</label>
                </div>
                <div className="flex gap-4">
                  {['#3d2b1f', '#b8860b', '#228b22', '#4682b4'].map((color, idx) => (
                    <button
                      key={color}
                      onClick={() => setEyeColor(['Brown', 'Hazel', 'Green', 'Blue'][idx])}
                      className={`w-10 h-10 rounded-full border-[3px] transition-all ${eyeColor === ['Brown', 'Hazel', 'Green', 'Blue'][idx] ? 'border-white scale-110 shadow-lg' : 'border-[#1e1f26]'}`}
                      style={{ backgroundColor: color }}
                    ></button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <label className="text-[11px] font-black text-[#8d8d99] uppercase tracking-widest">Formato do Rosto</label>
                <div className="flex flex-wrap gap-3">
                  {faceShapes.map(f => (
                    <button
                      key={f}
                      onClick={() => setFaceShape(f)}
                      className={`px-6 py-3 rounded-full text-xs font-black border transition-all ${faceShape === f ? 'bg-[#24242a] border-[#3B82F6]/40 text-[#3B82F6]' : 'bg-[#14151a] border-[#1e1f26] text-[#8d8d99] hover:border-white/10'}`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: CABELO & ESTILO */}
          <div className="flex flex-col gap-5 md:gap-8">
            <div className="flex items-center gap-4">
              <div className="w-6 h-6 bg-[#24242a] rounded-full flex items-center justify-center text-[11px] font-black text-[#8d8d99]">3</div>
              <h3 className="text-xs font-black text-[#8d8d99] uppercase tracking-[0.3em]">CABELO & ESTILO</h3>
            </div>

            <div className="flex flex-col gap-5 md:gap-8">
              <div className="flex flex-col gap-4">
                <label className="text-[11px] font-black text-[#8d8d99] uppercase tracking-widest">Cor</label>
                <div className="flex flex-wrap gap-3">
                  {hairColors.map(c => (
                    <button
                      key={c.name}
                      onClick={() => setHairColor(c.name)}
                      className={`px-6 py-3 rounded-full text-xs font-black border transition-all flex items-center gap-3 ${hairColor === c.name ? 'bg-[#24242a] border-[#3B82F6]/40 text-[#3B82F6]' : 'bg-[#14151a] border-[#1e1f26] text-[#8d8d99] hover:border-white/10'}`}
                    >
                      <div className="w-3 h-3 rounded-full border border-white/10 shadow-sm" style={{ backgroundColor: c.color }}></div>
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <label className="text-[11px] font-black text-[#8d8d99] uppercase tracking-widest">Estilo</label>
                <div className="flex flex-wrap gap-3">
                  {hairStyles.map(s => (
                    <button
                      key={s}
                      onClick={() => setHairStyle(s)}
                      className={`px-6 py-3 rounded-full text-xs font-black border transition-all ${hairStyle === s ? 'bg-[#24242a] border-[#3B82F6]/40 text-[#3B82F6]' : 'bg-[#14151a] border-[#1e1f26] text-[#8d8d99] hover:border-white/10'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: ARQUÉTIPO / VIBE */}
          <div className="flex flex-col gap-5 md:gap-8">
            <div className="flex items-center gap-4">
              <div className="w-6 h-6 bg-[#24242a] rounded-full flex items-center justify-center text-[11px] font-black text-[#8d8d99]">4</div>
              <h3 className="text-xs font-black text-[#8d8d99] uppercase tracking-[0.3em]">ARQUÉTIPO / VIBE</h3>
            </div>

            <div className="flex flex-col gap-5 md:gap-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {vibes.map(v => (
                  <button
                    key={v.id}
                    onClick={() => setVibe(v.id)}
                    className={`p-6 md:p-10 rounded-[32px] border-2 transition-all flex flex-col items-center gap-4 text-center ${vibe === v.id ? 'bg-[#1F2028] border-[#3B82F6]/40' : 'bg-[#14151a] border-[#1e1f26] hover:border-white/5'}`}
                  >
                    <div className="mb-2">{v.icon}</div>
                    <span className={`text-[15px] font-black ${vibe === v.id ? 'text-white' : 'text-[#8d8d99]'}`}>{v.label}</span>
                  </button>
                ))}
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#8d8d99]" />
                  <label className="text-[11px] font-black text-[#8d8d99] uppercase tracking-widest">Acessórios (Opcional)</label>
                </div>
                <div className="flex flex-wrap gap-3">
                  {accessoryOptions.map(a => (
                    <button
                      key={a}
                      onClick={() => toggleAccessory(a)}
                      className={`px-6 py-3 rounded-full text-xs font-black border transition-all ${accessories.includes(a) ? 'bg-[#24242a] border-[#3B82F6]/40 text-[#3B82F6]' : 'bg-[#14151a] border-[#1e1f26] text-[#8d8d99] hover:border-white/10'}`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Preview / Workstation */}
        <div className="sticky top-32 flex flex-col gap-5 md:gap-8">
          {/* Preview Card */}
          <div className="bg-[#14151a] border border-[#1e1f26] rounded-[48px] overflow-hidden shadow-2xl">
            <div className="aspect-[3/3.5] bg-[#0b0c10]/40 flex flex-col items-center justify-center p-6 md:p-12 text-center gap-6 border-b border-[#1e1f26]">
              <div className="w-20 h-20 bg-[#24242a] border border-[#1e1f26] rounded-full flex items-center justify-center shadow-inner">
                <User className="w-8 h-8 text-[#5b5b7b]" />
              </div>
              <p className="text-[#8d8d99] text-sm font-medium max-w-[200px] leading-relaxed">
                A foto do seu avatar aparecerá aqui após o Grok.
              </p>
            </div>
            <div className="p-6 md:p-10">
              <h4 className="text-2xl font-black text-white tracking-tight mb-2">
                {name || 'Seu Avatar'}
              </h4>
              <span className="text-xs font-bold text-[#8d8d99] uppercase tracking-widest">
                {age} anos
              </span>
            </div>
          </div>

          {/* Call to Action Container */}
          <div className="bg-[#14151a] border border-[#1e1f26] rounded-[40px] p-6 md:p-10 flex flex-col items-center gap-5 md:gap-8 shadow-2xl relative overflow-hidden group">
            {isFormComplete ? (
              <button
                onClick={() => window.open('https://x.ai/', '_blank', 'noopener,noreferrer')}
                className="w-full py-6 bg-gradient-to-r from-[#3B82F6] to-[#7f5af0] text-white rounded-[32px] font-black text-lg flex items-center justify-center gap-3 transition-all hover:scale-[1.05] hover:shadow-[0_0_30px_rgba(81,66,245,0.5)] active:scale-[0.98] shadow-lg shadow-[#3B82F6]/30 animate-in fade-in zoom-in duration-300 group"
              >
                <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-transform group-hover:rotate-12">
                  <ArrowUpRight className="w-5 h-5 text-white stroke-[4px]" />
                </div>
                Gerar Foto no Grok
              </button>
            ) : (
              <button className="w-full py-5 bg-[#24242a] text-[#5b5b7b] rounded-[28px] font-black text-base flex items-center justify-center gap-3 cursor-not-allowed border border-white/5 transition-all">
                <Lock className="w-5 h-5" />
                Complete o Perfil
              </button>
            )}

            <p className="text-[#8d8d99] text-[13px] font-medium text-center leading-relaxed">
              Nós criamos o prompt fotorrealista perfeito. Basta colar no Grok, gerar a imagem e trazer de volta para o Trendfy.
            </p>

            {/* Checklist Section */}
            <div className="w-full bg-[#14151a] border border-[#1e1f26] border-dashed rounded-[32px] p-5 md:p-8 mt-4 flex flex-col gap-6 md:gap-10">
              <div className="flex items-center gap-3">
                <MousePointer2 className="w-4 h-4 text-[#3B82F6]" />
                <span className="text-[11px] font-black text-[#3B82F6] uppercase tracking-[0.2em]">PRÓXIMOS PASSOS NO GROK</span>
              </div>

              <div className="flex flex-col gap-6 md:gap-10">
                <div className="flex items-start gap-5">
                  <div className="w-7 h-7 bg-[#24242a] border border-[#1e1f26] rounded-full flex items-center justify-center text-[10px] font-black text-[#5b5b7b]">1</div>
                  <div className="flex-1">
                    <h5 className="text-[15px] font-black text-white/90 mb-1">Selecione "Imagine"</h5>
                    <p className="text-[#8d8d99] text-xs font-medium leading-relaxed">No campo de texto do Grok, escolha a ferramenta de generation de imagem.</p>
                  </div>
                </div>
                <div className="flex items-start gap-5">
                  <div className="w-7 h-7 bg-[#24242a] border border-[#1e1f26] rounded-full flex items-center justify-center text-[10px] font-black text-[#5b5b7b]">2</div>
                  <div className="flex-1">
                    <h5 className="text-[15px] font-black text-white/90 mb-1">Ative o Modo Imagem</h5>
                    <p className="text-[#8d8d99] text-xs font-medium leading-relaxed">Garanta que a opção de criar imagens esteja selecionada.</p>
                  </div>
                </div>
                <div className="flex items-start gap-5">
                  <div className="w-7 h-7 bg-[#24242a] border border-[#1e1f26] rounded-full flex items-center justify-center text-[10px] font-black text-[#5b5b7b]">3</div>
                  <div className="flex-1">
                    <h5 className="text-[15px] font-black text-white/90 mb-1">Cole o Prompt</h5>
                    <p className="text-[#8d8d99] text-xs font-medium leading-relaxed">Basta colar (Ctrl+V) o texto que copiamos e dar Enter.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-24"></div>
    </main>
  );
};

export default App;
