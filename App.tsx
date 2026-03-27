import React, { useState, useEffect, createContext, useContext } from 'react';
import { translations, Language, TranslationKey } from './src/translations';
import { fal } from "@fal-ai/client";

fal.config({
   credentials: import.meta.env.VITE_FAL_API_KEY || "f98afc7c-a671-413a-ab90-abf8a46bd39e:188b2ca4044b9985e1af1544658282f3"
});
import { supabase, uploadImageToSupabase } from './src/lib/supabase';
import { Login } from './src/Login';
import {
  Search,
  Loader2,
  Flame,
  ChevronRight,
  ChevronDown,
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
  Trash2,
  Copy,
  Heart,
  Layout,
  MousePointer2,
  X,
  Upload,
  User,
  Type,
  Lock,
  LogOut,
  Terminal,
  Cpu,
  FileDown,
  Settings,
  VolumeX,
  Pause,
  FileText,
  Mail,
  Rocket,
  Link,
  Menu,
  Activity,
  Globe,
  Target,
  ArrowLeft,
  BookOpen,
  Award,
  Star,
  Image as ImageIcon,
  Clapperboard,
  Accessibility,
  CreditCard,
  RefreshCw
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
  onImageUpload: (file: File) => Promise<void>;
  onLogout: () => void;
}

const ConfiguracoesView: React.FC<ConfiguracoesViewProps> = ({ profileImage, onImageUpload, onLogout }) => {
  const { t } = useTranslation();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      await onImageUpload(file);
      setIsUploading(false);
    }
  };

  return (
    <main className="max-w-[800px] mx-auto px-6 py-10 md:py-16 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex flex-col items-center mb-12">
        <div
          onClick={() => !isUploading && fileInputRef.current?.click()}
          className="w-28 h-28 bg-gradient-to-br from-[#8B5CF6] to-[#d946ef] rounded-full flex items-center justify-center text-4xl font-black text-white shadow-[0_0_40px_rgba(139,92,246,0.3)] mb-8 relative group cursor-pointer overflow-hidden border-4 border-white/10 backdrop-blur-xl transition-all hover:scale-105 active:scale-95"
        >
          {isUploading ? (
            <div className="animate-spin w-8 h-8 border-4 border-white/20 border-t-white rounded-full"></div>
          ) : profileImage ? (
            <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            "N"
          )}
          {!isUploading && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
              <Camera className="w-8 h-8 text-white animate-in zoom-in duration-300" />
            </div>
          )}
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
        <div className="bg-white/[0.02] border border-white/5 backdrop-blur-[20px] rounded-[40px] p-6 md:p-10 shadow-2xl relative overflow-hidden group/card hover:border-white/10 transition-all">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#8B5CF6]/50 to-transparent"></div>
          <div className="flex items-center gap-4 mb-10">
            <div className="w-10 h-10 rounded-2xl bg-[#8B5CF6]/10 flex items-center justify-center">
              <User className="w-5 h-5 text-[#8B5CF6]" />
            </div>
            <h2 className="text-xl font-black text-white tracking-tight">{t('informacoesPessoais')}</h2>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2.5">
              <label className="text-[11px] font-black text-[#8d8d99] uppercase tracking-widest">{t('nome')}</label>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1 group">
                  <input
                    type="text"
                    defaultValue="nicklousstefanianrj6"
                    className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-5 px-6 text-[15px] text-white focus:outline-none focus:border-[#8B5CF6]/40 focus:ring-4 focus:ring-[#8B5CF6]/10 transition-all font-medium"
                  />
                </div>
                <button className="px-8 py-5 bg-white/[0.03] border border-white/10 text-white rounded-2xl text-[13px] font-black uppercase tracking-widest hover:bg-[#8B5CF6] hover:border-[#8B5CF6] transition-all hover:shadow-[0_0_20px_rgba(139,92,246,0.2)] w-full sm:w-auto">
                  {t('editar')}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <label className="text-[11px] font-black text-[#8d8d99] uppercase tracking-widest leading-none ml-1">{t('email')}</label>
              <div className="relative">
                <input
                  type="email"
                  defaultValue="nicklousstefanianrj6@gmail.com"
                  readOnly
                  className="w-full bg-white/[0.01] border border-white/5 rounded-2xl py-5 px-6 text-[15px] text-[#5b5b7b] cursor-not-allowed font-medium"
                />
              </div>
              <div className="flex items-center gap-2 ml-1">
                <div className="w-1 h-1 rounded-full bg-[#5b5b7b]"></div>
                <p className="text-[10px] font-medium text-[#5b5b7b] tracking-wider uppercase">{t('emailNaoAlterado')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Security Card */}
        <div className="bg-white/[0.02] border border-white/5 backdrop-blur-[20px] rounded-[40px] p-6 md:p-10 shadow-2xl relative overflow-hidden group/card hover:border-white/10 transition-all">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#d946ef]/50 to-transparent"></div>
          <div className="flex items-center gap-4 mb-10">
            <div className="w-10 h-10 rounded-2xl bg-[#d946ef]/10 flex items-center justify-center">
              <Lock className="w-5 h-5 text-[#d946ef]" />
            </div>
            <h2 className="text-xl font-black text-white tracking-tight">{t('seguranca')}</h2>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2.5">
              <label className="text-[11px] font-black text-[#8d8d99] uppercase tracking-widest ml-1">{t('novaSenha')}</label>
              <input
                type="password"
                placeholder={t('placeholderSenha')}
                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-5 px-6 text-[15px] text-white placeholder:text-[#44444f] focus:outline-none focus:border-[#d946ef]/40 focus:ring-4 focus:ring-[#d946ef]/10 transition-all font-medium"
              />
            </div>

            <div className="flex flex-col gap-2.5">
              <label className="text-[11px] font-black text-[#8d8d99] uppercase tracking-widest ml-1">{t('confirmarSenha')}</label>
              <input
                type="password"
                placeholder={t('placeholderConfirmar')}
                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-5 px-6 text-[15px] text-white placeholder:text-[#44444f] focus:outline-none focus:border-[#d946ef]/40 focus:ring-4 focus:ring-[#d946ef]/10 transition-all font-medium"
              />
            </div>

            <button className="w-full bg-gradient-to-r from-[#8B5CF6] to-[#d946ef] hover:scale-[1.02] text-white py-5 rounded-2xl font-black text-[15px] uppercase tracking-widest transition-all shadow-[0_10px_30px_rgba(139,92,246,0.3)] active:scale-[0.98]">
              {t('atualizarSenha')}
            </button>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="w-full bg-white/[0.02] border border-white/5 text-[#d946ef]/80 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:bg-[#d946ef]/5 hover:border-[#d946ef]/20 flex items-center justify-center gap-3 group/logout"
        >
          <LogOut className="w-5 h-5 group-hover/logout:-translate-x-1 transition-transform" />
          {t('sair')}
        </button>
      </div>

      <div className="h-24"></div>
    </main>
  );
};

// --- GLOBAL BACKGROUND COMPONENT ---
const GlobalBackground: React.FC = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-[0]">
    {/* Mesh Gradients */}
    <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#8B5CF6]/10 blur-[120px] rounded-full animate-[pulse-soft_8s_infinite] mix-blend-screen"></div>
    <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#d946ef]/10 blur-[120px] rounded-full animate-[pulse-soft_12s_infinite_reverse] mix-blend-screen"></div>

    {/* Digital Grid with Perspective */}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 transform perspective-[1000px] rotateX-[20deg] origin-top scale-110"></div>

    {/* Neural Particles (Digital Dust) */}
    <div className="absolute inset-0 opacity-20">
      <div className="absolute top-[20%] left-[15%] w-1 h-1 bg-white rounded-full animate-pulse shadow-[0_0_8px_white]"></div>
      <div className="absolute top-[45%] left-[85%] w-1 h-1 bg-[#8B5CF6] rounded-full animate-pulse shadow-[0_0_8px_#8B5CF6] delay-700"></div>
      <div className="absolute top-[75%] left-[25%] w-1 h-1 bg-[#d946ef] rounded-full animate-pulse shadow-[0_0_8px_#d946ef] delay-1000"></div>
      <div className="absolute top-[15%] left-[65%] w-1 h-1 bg-white rounded-full animate-pulse shadow-[0_0_8px_white] delay-300"></div>
    </div>

    {/* Scanning Line Effect */}
    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#8B5CF6]/20 to-transparent animate-[scanline_10s_linear_infinite]"></div>
  </div>
);

interface CustomAvatar { id: string; name: string; image: string; }

const App: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [currentPage, setCurrentPage] = useState<'explorar' | 'produtos' | 'videos' | 'criadores' | 'ugc-criador' | 'galeria-avatares' | 'galeria-prompts' | 'meus-avatares' | 'criar-avatar' | 'previsibilidade-receita' | 'hacks-virais' | 'hacks-virais-detalhe' | 'creator-academy' | 'passos-iniciais' | 'como-se-afiliar' | 'regras-e-restricoes' | 'como-criar-avatar-ia' | 'como-criar-videos-ugc' | 'configuracoes' | 'creator-engine' | 'creator-engine-imagem' | 'creator-engine-video' | 'creator-engine-video-influencer' | 'creator-engine-video-cinematico' | 'creator-engine-video-imitar'>('explorar');
  const [selectedHackId, setSelectedHackId] = useState<string | null>(null);
  const [userProfileImage, setUserProfileImage] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>('pt');
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [customAvatars, setCustomAvatars] = useState<CustomAvatar[]>([]);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showIOSInstallGuide, setShowIOSInstallGuide] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = async () => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;

    if (isIOS) {
      setShowIOSInstallGuide(true);
      return;
    }

    if (!deferredPrompt) {
      console.log('PWA installation prompt not available. Maybe already installed or unsupported.');
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    setDeferredPrompt(null);
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      window.location.reload(); // Simple reload handles redirection to index's auth state or whatever blocks unauthenticated views
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleAddCustomAvatar = async (file: File): Promise<CustomAvatar | null> => {
    if (!session?.user?.id) return null;
    const publicUrl = await uploadImageToSupabase(file, 'custom-avatars', session.user.id);
    if (!publicUrl) return null;

    const newAvatar: CustomAvatar = { id: `custom-${Date.now()}`, name: `Meu Avatar ${customAvatars.length + 1}`, image: publicUrl };
    const newAvatars = [...customAvatars, newAvatar];
    setCustomAvatars(newAvatars);
    await supabase.auth.updateUser({ data: { custom_avatars: newAvatars } });
    return newAvatar;
  };

  const handleDeleteCustomAvatar = async (id: string) => {
    const newAvatars = customAvatars.filter(a => a.id !== id);
    setCustomAvatars(newAvatars);
    await supabase.auth.updateUser({ data: { custom_avatars: newAvatars } });
  };

  const handleProfileImageUpload = async (file: File) => {
    if (!session?.user?.id) return;
    const publicUrl = await uploadImageToSupabase(file, 'avatars', session.user.id);
    if (publicUrl) {
      setUserProfileImage(publicUrl);
      await supabase.from('profiles').upsert({ id: session.user.id, avatar_url: publicUrl });
      getProfile(); // Refresh
    }
  };

  const t = (key: TranslationKey) => {
    if (!translations[language]) return key;
    return translations[language][key] || key;
  };

  const [session, setSession] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [videos, setVideos] = useState<VideoViral[]>([]);
  const [creators, setCreators] = useState<CreatorViral[]>([]);
  const [viralProducts, setViralProducts] = useState<ProductViral[]>([]);
  const [exploreTopProducts, setExploreTopProducts] = useState<ProductExplore[]>([]);
  const [hacks, setHacks] = useState<HackItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsAuthChecking(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setIsAuthChecking(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session?.user) {
      getProfile();
    } else {
      setProfile(null);
    }
  }, [session]);

  useEffect(() => {
    fetchData();
  }, []);

  const getProfile = async () => {
    if (!session?.user?.id) return;
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();
    setProfile(data);
    if (data?.avatar_url) setUserProfileImage(data.avatar_url);
    if (session.user.user_metadata?.custom_avatars) {
      setCustomAvatars(session.user.user_metadata.custom_avatars);
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // KEEP UI VISUALLY INTACT: Force static data for component state
      setViralProducts(STATIC_VIRAL_PRODUCTS);
      setExploreTopProducts(STATIC_EXPLORE_PRODUCTS);
      setHacks(STATIC_HACKS);

      // Background Supabase Check (Non-Visual)
      const { data: fetchedProducts } = await supabase
        .from('products_viral')
        .select('*')
        .order('rank', { ascending: true });

      const { data: hacksData } = await supabase.from('hacks_virais').select('*');

      console.log('Supabase Connection Active:', { products: fetchedProducts?.length, hacks: hacksData?.length });

    } catch (e) {
      console.error('Supabase Error:', e);
      // Fallback already set above
    } finally {
      setIsLoading(false);
    }
  };

  const STATIC_VIRAL_PRODUCTS: ProductViral[] = [
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



  const STATIC_EXPLORE_PRODUCTS: ProductExplore[] = [
    { id: 'e1', rank: 3, image: 'https://i.imgur.com/91dJ7Xs.jpeg', title: 'Chinelo Slide Nuvem Confort', revenue: 'R$ 5.724.863,85', priceRange: 'R$ 29,99 - R$ 99,99', productUrl: 'https://www.tiktok.com/view/product/1734261789877372669?_svg=1&checksum=782f06b151ccfec8f9f200209e9a78123f28879ad4f943d4aada5addccd94a76&encode_params=MIIBUQQMqMWscggKYZLXadgABIIBLZovPpQKWt9KOIP2LSyf8b2iFMY6BroHwo3n3u9JMKsA7KrqnNd0nmcKe012FbFem7iYPq5KLdtB2t7u9KwfEiJZyxg3uDRdq5RJAEBQz_X4s6b7hO-zUKpCltuLowGL0TvF5xlatIXqDqWbZcRtClb2biCuDjCDc06LRHibmyKqfeQ_e5EIGhfV3ZgqWIEjmRKNPxuPo5-Ud7lEYcBGNCQY163gu6qoIuu_lxS58asgqFjV2eR_QdCt02pQeNajrgOAsHt3p9_ewOU509N3O_GBJkMRF_aSJvVBn1zZuxaUZHMrY3U--LiSe8GD2JL4V1dDokgERjaWnQZ0OMgcEmsNf6F3gjChKHxLV1lrxD1A2HN0hhEHMHl0gXtPCV6KkOmBf_euVUGS-3DpwQcEEJCGseP_AvM-cpKxqGsd88M%3D&og_info=%7B%22title%22%3A%22Chinelo+Slide+Unissex+Casual+Para+Uso+Di%C3%A1rio%22%2C%22image%22%3A%22https%3A%5C%2F%5C%2Fp16-oec-va.ibyteimg.com%5C%2Ftos-maliva-i-o3syd03w52-us%5C%2F9a4070e224bd4714942a9e5442d1a9e8~tplv-o3syd03w52-resize-webp%3A260%3A260.webp%3Fdr%3D15582%26t%3D555f072d%26ps%3D933b5bde%26shp%3D7745054a%26shcp%3D9b759fb9%26idc%3Dmy%26from%3D2001012042%22%7D&sec_user_id=MS4wLjABAAAAGPJ9HjGz6Iuay6qmfIsuPNuurOsZ-IcMREG54wV7FpCyZpLNFGNNgtpxlaqhiZJP&share_app_id=1233&share_link_id=74CCB9BD-343F-4637-AF44-6E10F308BC5E&share_region=BR&social_share_type=15&timestamp=1770366698&trackParams=%7B%22enable_shop_tab_popup%22%3A1%2C%22device_id%22%3A%227506972083776636422%22%2C%22enter_from_info%22%3A%22product_share_outside%22%2C%22source_page_type%22%3A%22product_share%22%2C%22traffic_source_list%22%3A%5B%5D%7D&tt_from=copy&u_code=E6FIJC%3AL28K12M&ug_btm=b6880%2Cb6661&unique_id=joaovellini_&user_id=7203069836077974534&utm_campaign=client_share&utm_medium=ios&utm_source=copy' },
    { id: 'e2', rank: 6, image: 'https://i.imgur.com/YiQXmBJ.jpeg', title: '365 Dias Amor com Deus', revenue: 'R$ 2.152.342,10', priceRange: 'R$ 25,90 - R$ 39,90', productUrl: 'https://www.tiktok.com/view/product/1732162437981636069?_svg=1&checksum=567705e88160d779881297dd947a81f8b98e059697272542909833078d5f220f&encode_params=MIIBUQQM5msiz6KiFuTbAcXkBIIBLQUWuYU4ggWLiRJDl1e5x7kxiPDg576eq9YYP_ec6jeXawka8PWur3x_nRlEX__i2GZ42zS6HYRAqe9RH6cjCdxGgAgDLQQVef0b3qszSDdkxugk5Ox01y1LofhDQ0u-_0ulNbxI8JaFe7UF8mAEGZ_m8_rcQtZ7fDRm7BgWIEtgaoaRnShjzsTQGOwZHs4Dt_hZAcepydP1ZQE65ys56K7Dp-EMFoGfSfGXlVFdLXVFxcRUDYAV-5A_xUNLBPomV3EOJd9LPQIaYwYKDlubEth5zQULGWyDPsLIHPM5iefyDFTlpDjSYPKFdqn2uT9SU2daWDoH2Sgc6Ma5L1Xfo3yblp1IddpZi1Xvo9p_Vl3mxE6b7p7v4_9I-kOfnVRmBs0CDELi7F5gsLy3lS0EEKSLGDeufV2NtUFVZ_hcaYw%3D&og_info=%7B%22title%22%3A%22365+Dias+Amor+com+Deus+-+Devocional%22%2C%22image%22%3A%22https%3A%5C%2F%5C%2Fp16-oec-sg.ibyteimg.com%5C%2Ftos-alisg-i-aphluv4xwc-sg%5C%2Fd81e85d400ea455d8b4fc4a2728a4306~tplv-aphluv4xwc-resize-webp%3A260%3A260.webp%3Fdr%3D15582%26t%3D555f072d%26ps%3D933b5bde%26shp%3D7745054a%26shcp%3D9b759fb9%26idc%3Dmy%26from%3D2001012042%22%7D&sec_user_id=MS4wLjABAAAAGPJ9HjGz6Iuay6qmfIsuPNuurOsZ-IcMREG54wV7FpCyZpLNFGNNgtpxlaqhiZJP&share_app_id=1233&share_link_id=33149E51-E61B-47B4-B554-18197CF36093&share_region=BR&social_share_type=15&timestamp=1770366614&trackParams=%7B%22enable_shop_tab_popup%22%3A1%2C%22device_id%22%3A%227506972083776636422%22%2C%22enter_from_info%22%3A%22product_share_outside%22%2C%22source_page_type%22%3A%22product_share%22%2C%22traffic_source_list%22%3A%5B%5D%7D&tt_from=copy&u_code=E6FIJC%3AL28K12M&ug_btm=b6880%2Cb6661&unique_id=joaovellini_&user_id=7203069836077974534&utm_campaign=client_share&utm_medium=ios&utm_source=copy' },
    { id: 'e3', rank: 9, image: 'https://i.imgur.com/9cNgCYt.png', title: 'Bolsa Feminina Couro Transversal', revenue: 'R$ 3.824.747,43', priceRange: 'R$ 42,60 - R$ 160,00', productUrl: 'https://www.tiktok.com/view/product/1733575637953513124?_svg=1&checksum=4cc83e293ba61e0c5492cd72e54092e74c22798bab45e2e6dfbe49a819e567cb&encode_params=MIIBUQQMZTrxD3u3pxYs5Yo-BIIBLZ-NdRLDuiJEtuLWj947Lg5Bcb5DP4BTzQJireUQbUOp3HYeCW5gXWcC9bRoIf_PLBFa1iqzH9V6iPWNxDzRBoSIHyZTfqFl1gvDTjzSo0j_KtiHDcuDpxrNnuwHjoTab9yzQzloY_Qypx8NRPBIs7HVTZYWy_lHImMFng2TEu-qnSm__1bx0kLrd1telGOmBuDNNjPUbC0oDwA7-wfY5T2cILdfp9tJtZRK98Ok5yf-O7TYgwJwpfWOWVWNkiWslTTkJYMJnI_CeBuLimebK1kpAm_1-w4O8fyCU4ttVnTZM_B56sEMPWo-Erxm71txY6MbDRetT8Brkx-YuyV4EGIpqq8XwZZM4eFQREb7_nazI0QqNoX4U8P0mly-tfD3259yJlYWBSO_yKeGxVgEEOcm8eiOcRvOcl839PcgTu4%3D&og_info=%7B%22title%22%3A%22Bolsa+Feminina+Com+Al%C3%A7a+Lateral+Transversal+De+Ombro+De+Couro+PU+T304+AF%22%2C%22image%22%3A%22https%3A%5C%2F%5C%2Fp16-oec-va.ibyteimg.com%5C%2Ftos-maliva-i-o3syd03w52-us%5C%2F26afd3c2d5b647ca86ff0528cbd2fb2a~tplv-o3syd03w52-resize-webp%3A260%3A260.webp%3Fdr%3D15582%26t%3D555f072d%26ps%3D933b5bde%26shp%3D7745054a%26shcp%3D9b759fb9%26idc%3Dmy%26from%3D2001012042%22%7D&sec_user_id=MS4wLjABAAAAGPJ9HjGz6Iuay6qmfIsuPNuurOsZ-IcMREG54wV7FpCyZpLNFGNNgtpxlaqhiZJP&share_app_id=1233&share_link_id=90ADDB6E-B00C-45B1-8E8C-965E441ED0D5&share_region=BR&social_share_type=15&timestamp=1770366471&trackParams=%7B%22enable_shop_tab_popup%22%3A1%2C%22device_id%22%3A%227506972083776636422%22%2C%22enter_from_info%22%3A%22product_share_outside%22%2C%22source_page_type%22%3A%22product_share%22%2C%22traffic_source_list%22%3A%5B%5D%7D&tt_from=copy&u_code=E6FIJC%3AL28K12M&ug_btm=b6880%2Cb6661&unique_id=joaovellini_&user_id=7203069836077974534&utm_campaign=client_share&utm_medium=ios&utm_source=copy' },
    { id: 'e4', rank: 12, image: 'https://i.imgur.com/4MEt6WH.jpeg', title: 'Parafusadeira Furadeira 48v', revenue: 'R$ 6.451.128,24', priceRange: 'R$ 260,99 - R$ 544,00', productUrl: 'https://www.tiktok.com/view/product/1733093661342074653?_svg=1&checksum=6852d6ef55eca09f8b136a146ed2c4b85d290d2163b2d9d6bed9cf3c818f7690&encode_params=MIIBUQQM7DrymndbQjI0Zt8YBIIBLXnc4OCrCJysRVcD-bVTP5UK5yV-rMctx-nohpvBLAqW13-8WDLB-xU4ppOtMDDtK-MkKy756A6euOtJVjDyU-Iv3N54gdCf51QUQ5d-YbEgd04YMN4Z9546Yb04lRyxTDpat467DU-MCIbTUzzBVv3VLiTLlyjLw4tMHoH1nFtSsdokxlGTxIHF9692a5qCewKyP0qnCxd7VKlwvfzemiJxJIbXdEkNeRsbvo8ySQubBdMm1TFmea9pw-MStQUw5326iuX1ITQky3Nh1Y8L3QlsUDWh_ElrznQJyqgUoULR0NUdGoJs6Gu8uOxG8O4x0dcQ0Mu43IK6eXEfuKrOKzT3Oe400W56wcM1Tv--JCrTcWIS89M0HHLKoX6mYgXpik0okJ2C_M76K0PLYPwEECfunb8nCLgCOtF6BlgHhEo%3D&og_info=%7B%22title%22%3A%22RHOVISTAR+Chave+de+Impacto+48V+Sem+Fio+%7C+Parafusadeira+e+Furadeira+3+em+1+%7C+2+Baterias+%7C+Alta+Pot%C3%AAncia%22%2C%22image%22%3A%22https%3A%5C%2F%5C%2Fp16-oec-sg.ibyteimg.com%5C%2Ftos-alisg-i-aphluv4xwc-sg%5C%2F4b08ada1b3044db0a5b772d57a4a4de1~tplv-aphluv4xwc-resize-webp%3A260%3A260.webp%3Fdr%3D15582%26t%3D555f072d%26ps%3D933b5bde%26shp%3D7745054a%26shcp%3D9b759fb9%26idc%3Dmy%26from%3D2001012042%22%7D&sec_user_id=MS4wLjABAAAAGPJ9HjGz6Iuay6qmfIsuPNuurOsZ-IcMREG54wV7FpCyZpLNFGNNgtpxlaqhiZJP&share_app_id=1233&share_link_id=903E3B6A-6D88-4FDE-8D74-1F3B2F039232&share_region=BR&social_share_type=15&timestamp=1770366342&trackParams=%7B%22enable_shop_tab_popup%22%3A1%2C%22device_id%22%3A%227506972083776636422%22%2C%22enter_from_info%22%3A%22product_share_outside%22%2C%22source_page_type%22%3A%22product_share%22%2C%22traffic_source_list%22%3A%5B%5D%7D&tt_from=copy&u_code=E6FIJC%3AL28K12M&ug_btm=b6880%2Cb6661&unique_id=joaovellini_&user_id=7203069836077974534&utm_campaign=client_share&utm_medium=ios&utm_source=copy' },
  ];

  const STATIC_HACKS: HackItem[] = [
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
    }
  ];

  const handleSelectHack = (id: string) => {
    setSelectedHackId(id);
    setCurrentPage('hacks-virais-detalhe');
  };

  if (isAuthChecking) {
    return (
      <div className="min-h-screen bg-[#0B0B0E] flex flex-col gap-4 items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#8B5CF6] animate-spin" />
        <span className="text-[#8d8d99] text-sm font-medium tracking-widest uppercase">Autenticando...</span>
      </div>
    );
  }

  if (!session) {
    return <Login />;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div className="absolute inset-0 bg-[#0b0c10]/80 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-[280px] bg-[#0b0c10] border-r border-[#1e1f26] flex flex-col pt-6 px-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setIsMobileMenuOpen(false); setCurrentPage('explorar'); }}>
                <img src="/logo.png" alt="Viralpulse Logo" className="w-6 h-6 object-contain" />
                <span className="text-xl font-black text-white">Viralpulse</span>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-[#8d8d99] hover:text-white rounded-lg hover:bg-[#1f2026]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-3 py-4 overflow-y-auto max-h-[70vh]">
              {[
                { id: 'explorar', label: t('explorar') },
                { id: 'produtos', label: t('produtos') },
                { id: 'videos', label: t('videos') },
                { id: 'criadores', label: t('criadores') },
                { id: 'creator-engine', label: 'Creator Engine (NOVO)' },
                { id: 'ugc-criador', label: t('ugcCriador') },
                { id: 'galeria-avatares', label: t('galeriaAvatares') },
                { id: 'galeria-prompts', label: t('galeriaPrompts') },
                { id: 'previsibilidade-receita', label: t('previsibilidadeReceita') },
                { id: 'hacks-virais', label: t('hacksVirais') },
                { id: 'creator-academy', label: t('creatorAcademy') }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setCurrentPage(item.id as any); setIsMobileMenuOpen(false); }}
                  className={`text-left text-sm font-semibold py-3 px-4 rounded-xl transition-all ${currentPage === item.id ? 'text-white bg-[#8B5CF6]' : 'text-[#8d8d99] hover:text-white hover:bg-[#1f2026]'}`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Mobile App Install Button */}
            <div className="mt-auto pb-6 pt-4 border-t border-[#1e1f26]">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleInstallClick();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-[#8B5CF6]/40 bg-[#8B5CF6]/5 text-[#8B5CF6] rounded-xl text-sm font-black hover:bg-[#8B5CF6]/10 transition-all"
              >
                <Download className="w-5 h-5" />
                {t('baixarApp')}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-[#0b0c10] text-[#e1e1e6] selection:bg-[#3B82F6]/30 flex flex-col relative">
        {/* GLOBAL PREMIUM BACKGROUND (EXCLUINDO EXPLORAR) */}
        {currentPage !== 'explorar' && <GlobalBackground />}

        {/* PERFECT CLONE HEADER */}
        <header className="h-[72px] bg-[#0B0B0E]/80 backdrop-blur-xl border-b border-white/5 sticky top-0 z-[100]">
          <div className="max-w-[1400px] w-full mx-auto px-3 sm:px-4 md:px-6 flex items-center h-full">
            {/* Logo Area */}

            {/* Mobile Hamburger */}
            <button
              className="lg:hidden mr-2 md:mr-4 p-1 md:p-2 -ml-2 text-white hover:bg-[#1f2026] rounded-lg transition-colors shrink-0"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <div className="flex items-center gap-1.5 md:gap-2 group cursor-pointer mr-auto min-w-0" onClick={() => { setIsMobileMenuOpen(false); setCurrentPage('explorar'); }}>
              <div className="flex items-center justify-center shrink-0">
                <img
                  src="/logo.png"
                  alt="Viralpulse Logo"
                  className="w-5 h-5 md:w-6 md:h-6 object-contain"
                />
              </div>
              <span className="text-[17px] sm:text-[20px] md:text-[22px] font-black tracking-tighter text-white truncate">Viralpulse</span>
            </div>

            {/* Navigation Links Grouped closer to Right Actions */}
            <div className="flex items-center gap-5 md:gap-8 h-full">
              <nav className="hidden lg:flex items-center gap-5 h-full">
                <button
                  onClick={() => setCurrentPage('explorar')}
                  className={`text-sm font-semibold transition-colors relative h-full flex items-center px-2 ${currentPage === 'explorar' ? 'text-white' : 'text-[#8d8d99] hover:text-white'}`}
                >
                  {t('explorar')}
                  {currentPage === 'explorar' && <span className="absolute bottom-[-1px] left-0 w-full h-[3px] bg-[#8B5CF6] rounded-t-sm"></span>}
                </button>
                <button
                  onClick={() => setCurrentPage('produtos')}
                  className={`text-sm font-semibold transition-colors relative h-full flex items-center px-2 ${currentPage === 'produtos' ? 'text-white' : 'text-[#8d8d99] hover:text-white'}`}
                >
                  {t('produtos')}
                  {currentPage === 'produtos' && <span className="absolute bottom-[-1px] left-0 w-full h-[3px] bg-[#8B5CF6] rounded-t-sm"></span>}
                </button>
                <button
                  onClick={() => setCurrentPage('videos')}
                  className={`text-sm font-semibold transition-colors relative h-full flex items-center px-2 ${currentPage === 'videos' ? 'text-white' : 'text-[#8d8d99] hover:text-white'}`}
                >
                  {t('videos')}
                  {currentPage === 'videos' && <span className="absolute bottom-[-1px] left-0 w-full h-[3px] bg-[#8B5CF6] rounded-t-sm"></span>}
                </button>
                <button
                  onClick={() => setCurrentPage('criadores')}
                  className={`text-sm font-semibold transition-colors relative h-full flex items-center px-2 ${currentPage === 'criadores' ? 'text-white' : 'text-[#8d8d99] hover:text-white'}`}
                >
                  {t('criadores')}
                  {currentPage === 'criadores' && <span className="absolute bottom-[-1px] left-0 w-full h-[3px] bg-[#8B5CF6] rounded-t-sm"></span>}
                </button>

                {/* FERRAMENTAS DROPDOWN (HOVER) */}
                <div className="relative group h-full flex items-center px-2 cursor-pointer">
                  <div className="flex items-center gap-1">
                    <span className={`text-sm font-semibold transition-colors relative h-full flex items-center ${['creator-engine', 'ugc-criador', 'galeria-avatares', 'meus-avatares', 'criar-avatar', 'previsibilidade-receita', 'hacks-virais', 'hacks-virais-detalhe'].includes(currentPage) ? 'text-white' : 'text-[#8d8d99] group-hover:text-white'}`}>
                      {t('ferramentas')}
                      {['creator-engine', 'ugc-criador', 'galeria-avatares', 'meus-avatares', 'criar-avatar', 'previsibilidade-receita', 'hacks-virais', 'hacks-virais-detalhe'].includes(currentPage) && <span className="absolute bottom-[-1px] left-0 w-full h-[3px] bg-[#8B5CF6] rounded-t-sm"></span>}
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#8d8d99] rotate-90 group-hover:text-white transition-colors" />
                  </div>

                  {/* Perfect Clone Tool Dropdown Menu */}
                  <div className="absolute top-[72px] left-1/2 -translate-x-1/2 invisible group-hover:visible opacity-0 group-hover:opacity-100 flex flex-col bg-[#14151a] border border-[#1e1f26] rounded-2xl p-2 min-w-[240px] shadow-[0_20px_40px_rgba(0,0,0,0.8)] z-[100] transition-all duration-200">
                    <DropdownToolItem label="Creator Engine" badge="NOVO" isActive={currentPage === 'creator-engine'} onClick={() => setCurrentPage('creator-engine')} />
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
                  {currentPage === 'creator-academy' && <span className="absolute bottom-[-1px] left-0 w-full h-[3px] bg-[#8B5CF6] rounded-t-sm"></span>}
                </button>
              </nav>

              {/* Separator */}
              <div className="w-[1.5px] h-6 bg-[#33333a] mx-1"></div>

              {/* Right Actions */}
              <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 shrink-0">
                <button
                  onClick={handleInstallClick}
                  className="hidden sm:flex items-center gap-2 px-4 py-2 border border-[#8B5CF6]/40 text-[#8B5CF6] rounded-lg text-xs font-black hover:bg-[#8B5CF6]/5 transition-all"
                >
                  <Download className="w-4 h-4" />
                  {t('baixarApp')}
                </button>

                <div className="relative">
                  <div
                    onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                    className="flex items-center gap-1 md:gap-2 px-2 py-1 md:px-3 md:py-1.5 bg-[#14151a] rounded-lg border border-[#1e1f26] text-[10px] md:text-xs font-bold cursor-pointer hover:border-[#44444f] transition-all"
                  >
                    <img src="https://flagcdn.com/w20/br.png" width="16" alt="Brazil" className="rounded-[1px] w-3 md:w-4" />
                    <span className="text-[#8d8d99] uppercase">PT</span>
                    <ChevronRight className={`w-2.5 h-2.5 md:w-3 md:h-3 text-[#8d8d99] transition-transform ${isLangMenuOpen ? '-rotate-90' : 'rotate-90'}`} />
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


                <div
                  onClick={() => setCurrentPage('configuracoes')}
                  className="flex items-center gap-1.5 md:gap-2.5 bg-[#14151a] pl-1 pr-2 md:pl-1.5 md:pr-3 py-1 md:py-1.5 rounded-full border border-[#1e1f26] cursor-pointer hover:border-[#3B82F6]/30 transition-all shrink-0"
                >
                  <div className="w-6 h-6 md:w-7 md:h-7 bg-[#8B5CF6] rounded-full flex items-center justify-center text-[10px] md:text-[11px] font-black text-white shadow-lg shadow-[#8B5CF6]/30 overflow-hidden shrink-0">
                    {userProfileImage ? (
                      <img src={userProfileImage} alt="User" className="w-full h-full object-cover shrink-0" />
                    ) : (
                      "N"
                    )}
                  </div>
                  <span className="text-[9px] md:text-xs font-black text-white uppercase tracking-tight truncate">{t('usuario')}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex-1">
          {currentPage === 'creator-engine' && <CreatorEngineView onGoToImagem={() => setCurrentPage('creator-engine-imagem')} onGoToVideo={() => setCurrentPage('creator-engine-video')} onGoToMinhasCriacoes={() => setCurrentPage('creator-engine-minhas-criacoes')} onGoToCreditos={() => setCurrentPage('creator-engine-creditos')} />}
          {currentPage === 'creator-engine-minhas-criacoes' && <CreatorEngineMinhasCriacoesView onBack={() => setCurrentPage('creator-engine')} />}
          {currentPage === 'creator-engine-creditos' && <CreatorEngineCreditosView onBack={() => setCurrentPage('creator-engine')} />}
          {currentPage === 'creator-engine-imagem' && <CreatorEngineGerarImagemView onBack={() => setCurrentPage('creator-engine')} />}
          {currentPage === 'creator-engine-video' && <CreatorEngineGerarVideoView onBack={() => setCurrentPage('creator-engine')} onGoToInfluencer={() => setCurrentPage('creator-engine-video-influencer')} onGoToCinematico={() => setCurrentPage('creator-engine-video-cinematico')} onGoToImitar={() => setCurrentPage('creator-engine-video-imitar')} />}
          {currentPage === 'creator-engine-video-influencer' && <CreatorEngineGerarVideoInfluencerIAView onBack={() => setCurrentPage('creator-engine-video')} />}
          {currentPage === 'creator-engine-video-cinematico' && <CreatorEngineGerarVideoCinematicoView onBack={() => setCurrentPage('creator-engine-video')} />}
          {currentPage === 'creator-engine-video-imitar' && <CreatorEngineGerarVideoImitarMovimentosView onBack={() => setCurrentPage('creator-engine-video')} />}
          {currentPage === 'explorar' && <ExploreView products={exploreTopProducts} onGoToAcademy={() => setCurrentPage('creator-academy')} onGoToProducts={() => setCurrentPage('produtos')} />}
          {currentPage === 'produtos' && <ProductsView products={viralProducts} />}
          {currentPage === 'videos' && <VideosView />}
          {currentPage === 'criadores' && <CreatorsView />}
          {currentPage === 'ugc-criador' && <UGCCreatorView viralProducts={viralProducts} exploreTopProducts={exploreTopProducts} customAvatars={customAvatars} onAddCustomAvatar={handleAddCustomAvatar} onDeleteCustomAvatar={handleDeleteCustomAvatar} />}
          {currentPage === 'galeria-avatares' && <GaleriaAvataresView onGoToMyAvatars={() => setCurrentPage('meus-avatares')} onCreateNew={() => setCurrentPage('criar-avatar')} />}
          {currentPage === 'galeria-prompts' && <GaleriaPromptsView />}
          {currentPage === 'meus-avatares' && <MeusAvataresView avatars={customAvatars} onAddAvatar={handleAddCustomAvatar} onDeleteAvatar={handleDeleteCustomAvatar} onBack={() => setCurrentPage('galeria-avatares')} onCreateNew={() => setCurrentPage('criar-avatar')} />}
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
              onImageUpload={handleProfileImageUpload}
              onLogout={handleLogout}
            />
          )}
        </div>

      </div>

      {/* iOS PWA Install Guide Modal */}
      {showIOSInstallGuide && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-[#14151a] border border-[#1e1f26] rounded-2xl w-full max-w-sm p-6 relative shadow-[0_30px_60px_rgba(0,0,0,0.8)]">
            <button onClick={() => setShowIOSInstallGuide(false)} className="absolute top-4 right-4 text-[#8d8d99] hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <div className="flex flex-col items-center text-center gap-4 mt-2">
              <div className="w-16 h-16 bg-[#8B5CF6]/10 rounded-full flex items-center justify-center mb-2 shadow-[0_0_20px_rgba(139,92,246,0.2)] border border-[#8B5CF6]/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#8B5CF6]"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              </div>
              <h2 className="text-xl font-black text-white">Instale o Viralpulse</h2>
              <p className="text-sm text-[#8d8d99] mb-4">Para concluir a instalação no seu iPhone/iPad, siga os passos rápidos abaixo:</p>

              <div className="w-full space-y-4 text-left bg-[#0B0B0E]/50 p-4 rounded-xl border border-white/5">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#1e1f26] flex items-center justify-center shrink-0 border border-white/10 font-black text-xs text-[#8B5CF6]">1</div>
                  <p className="text-sm text-white/90 pt-1 leading-relaxed">Toque no ícone de <strong>Compartilhar</strong> (quadradinho com seta para cima) na barra inferior do Safari.</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#1e1f26] flex items-center justify-center shrink-0 border border-white/10 font-black text-xs text-[#8B5CF6]">2</div>
                  <p className="text-sm text-white/90 pt-1 leading-relaxed">Role o menu para baixo e toque em <strong>"Adicionar à Tela de Início"</strong>.</p>
                </div>
              </div>

              <button
                onClick={() => setShowIOSInstallGuide(false)}
                className="mt-6 w-full py-4 bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] text-white font-black rounded-xl hover:scale-[1.02] transition-transform shadow-lg shadow-[#8B5CF6]/20 uppercase tracking-widest text-xs"
              >
                Eu Entendi
              </button>
            </div>
          </div>
        </div>
      )}

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
      <span className="px-1.5 py-0.5 bg-[#8B5CF6] text-white text-[9px] font-black rounded-sm uppercase tracking-tighter shadow-sm">
        {badge}
      </span>
    )}
  </button>
);


const enhancePromptWithGemini = async (userDescription: string, tipoCriacao?: string, refBase64?: string | null, baseBase64?: string | null) => {
  let systemPrompt = "";

  if (tipoCriacao === 'Clone (Influencer IA)') {
    systemPrompt = `Você é o operador mestre de fundição fotorealista da IA AntiGravity.
Sua função é gerar o "Prompt Estratégico" para substituição de identidade facial (Clone), onde a Imagem Base (âncora contextual) recebe o rosto da Imagem de Referência (DNA facial), integrando-os com perfeição sem aspecto de "recorte" artificial.

Siga EXATAMENTE este bloco estrutural em inglês, injetando sua análise visual incrivelmente detalhada nos colchetes:
"High-definition professional portrait, merging the identity of the person in the reference image onto the body and context of the person in the base image. The face, eyes, bone structure, skin texture, and core facial identity must be an exact, unmistakable match to the reference image. Prioritize reference geometry over base geometry. Maintain all context from the base image without deviation: [INSERIR DESCRIÇÃO MEGA DETALHADA DA POSE, DA ROUPA ESPECÍFICA (EX: PINK BLAZER), E DO CENÁRIO DA BASE]. The lighting, color grading, and environmental shadows present in the base image must be applied seamlessly to the new face, ensuring perfect integration with no 'cut-out' look. Ensure the skin tones are matched. [INSERIR A DESCRIÇÃO DE COMO O CABELO ESPECÍFICO DA REFERÊNCIA SE INTEGRA NA CENA DA BASE]. Additional actions/instructions: [INSERIR DESCRIÇÃO DO USUÁRIO TRADUZIDA PARA INGLÊS]."

Retorne APENAS o prompt final montado. Sem aspas iniciais, sem introduções.`;
  } else if (tipoCriacao === 'Clone (Celebridades)') {
    systemPrompt = `Você é o Diretor de Arte (Prompt Engineer) da IA AntiGravity.
Sua única função é analisar as DUAS imagens enviadas (Base e Referência) e gerar um "Prompt Descritivo" EXTREMAMENTE rico em detalhes visuais, seguindo rigorosamente as instruções a seguir.

INSTRUÇÃO OBRIGATÓRIA SALVA NO SISTEMA:
"Ultra-photorealistic 8k cinematic masterpiece, extreme high-fidelity identity re-projection. MANDATORY INSTRUCTION: Use the 'Base Image' as a strict spatial and skeletal template. Extract the exact anatomical pose, shoulder orientation, hand gestures (e.g., thumbs up, heart sign, selfie stance), and head tilt from the person in the Base Image. MANDATORY INSTRUCTION: Replace the entire subject with the flawless aesthetic identity, facial bone structure, specific eye shape, and hair texture of the person in the 'Reference Image'. The subject must be perfectly anchored into the 'Base Image' environment, preserving every background detail: wood-paneled ceilings, furniture, computer screens, and reflected subjects without any distortion. LIGHTING INTEGRATION: Apply the exact global illumination, specular highlights, and ambient occlusion from the base scene onto the new identity. SKIN TEXTURE: Render hyper-detailed skin with visible micro-pores, natural imperfections, fine peach fuzz, and realistic subsurface scattering for a 'living skin' effect. CLOTHING: Seamlessly adapt the clothing style from the Reference Image to fit the physical pose and body type of the generated celebrity. Shot on 35mm lens, f/1.8, deep focus, sharp edges, professional color grading, zero blurring, indistinguishable from a real photograph"

Você vai absorver essa instrução mestre e as imagens fornecidas. Depois, você OBRIGATORIAMENTE retornará o seguinte esqueleto, traduzindo o que viu nas imagens para o inglês de forma hiper-realista:

"Ultra-photorealistic 8k cinematic masterpiece, extreme high-fidelity identity re-projection. [DESCREVA EM DETALHES VISUAIS A EXATA POSE, AÇÃO, E O CENÁRIO VISTO NA IMAGEM BASE]. The subject has the exact aesthetic identity: [DESCREVA EM DETALHES O ROSTO, OLHOS E O CABELO DA IMAGEM DE REFERÊNCIA]. The subject is wearing: [DESCREVA A ROUPA EXATA DA IMAGEM DE REFERÊNCIA]. Application of exact global illumination, specular highlights, and ambient occlusion from the base scene. Hyper-detailed skin with visible micro-pores, natural imperfections, fine peach fuzz, and realistic subsurface scattering. Shot on 35mm lens, f/1.8, deep focus, sharp edges, professional color grading, zero blurring, indistinguishable from a real photograph."

Retorne APENAS o bloco de texto final estruturado, totalmente em inglês, preenchendo as descrições solicitadas. Sem aspas iniciais, sem explicações extras.`;
  } else {
    systemPrompt = `Você é um engenheiro de prompt. Sua única função é pegar a descrição básica que o usuário enviou e mesclar perfeitamente dentro DESTE ESQUELETO EXATO, mantendo TODAS as palavras em inglês do esqueleto e apenas substituindo a parte descritiva pela do usuário. 
  
  O esqueleto OBRIGATÓRIO que você deve retornar é este:
  "Ultra realistic candid photo of [INSERIR A DESCRIÇÃO DO USUÁRIO TRADUZIDA PARA INGLÊS AQUI]. Casual real life photo taken with a modern mobile phone camera. Natural raw lighting, realistic shadows, authentic colors. Clear background environment, no artificial blur. Extremely detailed unedited human skin texture with visible micro pores, subtle blemishes, realistic skin reflections, vellus hair, slight facial asymmetry and natural hair strands. Completely unretouched, zero makeup effect, authentic everyday photography style, looks exactly like a real person photographed casually in real life. 4K HDR raw photo, ultra detailed, realistic composition. Important: the image must NOT contain any camera interface, phone UI, screenshot frame, recording indicators, shutter buttons, plastic skin, CGI, or AI smoothing."
  
  PRESTE ATENÇÃO AO GÊNERO DO SUJEITO: 
  Se o usuário pedir uma MULHER (influenciadora, menina, etc), adicione OBRIGATORIAMENTE ao lado da descrição: "Ultra detailed RAW photography of an authentic everyday Brazilian woman, South American Latina. CRITICAL INSTRUCTIONS FOR FEMALE: 0% makeup, ABSOLUTELY NO AIRBRUSHING, extremely raw textured skin, heavily visible micro pores on nose and cheeks, peach fuzz, subtle real-life blemishes, authentic female facial asymmetry, hyper-realistic candid lighting. This must look like a real unfiltered everyday mundane iphone photo."
  Se o usuário pedir um HOMEM (influenciador, menino, etc), adicione OBRIGATORIAMENTE ao lado da descrição: "authentic brazilian man, typical latin american features, raw unedited skin".
  E independentemente do gênero, mantenha sempre características marcantes de uma PESSOA BRASILEIRA COMUM e AUTÊNTICA.
  
  Retorne APENAS o prompt final em inglês montado com esse esqueleto. Sem aspas iniciais, sem explicações.`;
  }

  const parts: any[] = [{ text: `${systemPrompt}\n\nDescrição original do usuário: ${userDescription}` }];
  
  if (baseBase64 && (tipoCriacao === 'Clone (Influencer IA)' || tipoCriacao === 'Clone (Celebridades)')) {
    try {
       const b64Data = baseBase64.includes(',') ? baseBase64.split(',')[1] : baseBase64;
       let mime = 'image/jpeg';
       if (baseBase64.startsWith('data:')) mime = baseBase64.split(';')[0].split(':')[1];
       parts.push({ inlineData: { data: b64Data, mimeType: mime } });
       parts[0].text += `\n\nA visual reference of the BASE IMAGE (Scene/Body/Pose) is attached FIRST. Analyze the background, lighting, and body pose structure in detail, and insert that into the [INSERT SCENE/BACKGROUND/POSE DESCRIPTION HERE] block.`;
    } catch(e) {}
  }

  if (refBase64) {
    try {
       const base64Data = refBase64.includes(',') ? refBase64.split(',')[1] : refBase64;
       let mimeType = 'image/jpeg';
       if (refBase64.startsWith('data:')) mimeType = refBase64.split(';')[0].split(':')[1];
       parts.push({ inlineData: { data: base64Data, mimeType } });
       parts[0].text += `\n\nA visual reference of the PERSON TO CLONE is attached LAST. Analyze her/his facial features, hair, and clothing in extreme visual detail, and insert that visual description into the [INSERT HIGHLY DETAILED PHYSICAL DESCRIPTION...] block of your response so the image generator can accurately recreate her/him.`;
    } catch(e) {}
  }

  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts }]
    })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message || 'Erro ao comunicar com Gemini IA');
  return data.candidates[0].content.parts[0].text.trim();
};

const CreatorEngineGerarImagemView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [tipoCriacao, setTipoCriacao] = useState('Influencer Realista');
  const [isTipoOpen, setIsTipoOpen] = useState(false);
  const [refOpcional, setRefOpcional] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [promptTexto, setPromptTexto] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [proporcao, setProporcao] = useState('9:16');
  const [imageBase, setImageBase] = useState<File | null>(null);
  const [imageRef, setImageRef] = useState<File | null>(null);

  const handleGenerate = async () => {
    if (!promptTexto.trim() && tipoCriacao !== 'Clone (Celebridades)' && tipoCriacao !== 'Clone (Influencer IA)') {
      alert('Por favor, digite uma descrição para a sua imagem.');
      return;
    }

    setIsGenerating(true);
    setGeneratedImage(null);
    try {
      let imageBase64 = null;
      if (refOpcional) {
        imageBase64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(refOpcional);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      }

      let baseBase64 = null;
      let refBase64 = null;
      let falUrlBase = null;
      let falUrlRef = null;
      
      if (tipoCriacao === 'Clone (Influencer IA)' || tipoCriacao === 'Clone (Celebridades)') {
         if (!imageBase || !imageRef) {
            alert('Você precisa enviar a Imagem Base e a Imagem de Referência para fazer o Clone.');
            setIsGenerating(false);
            return;
         }
         baseBase64 = imageBase;
         refBase64 = imageRef;
         try {
           setIsGenerating(true);
           // Fazemos upload direto para a Media Cloud do Fal.ai
           falUrlBase = await fal.storage.upload(imageBase);
           falUrlRef = await fal.storage.upload(imageRef);
         } catch (err) {
           console.error("Falha a carregar imagens na cloud", err);
           alert("Erro ao transferir Imagens para Nuvem da IA Fal. Tente novamente.");
           setIsGenerating(false);
           return;
         }
      }

      let enhancedPromptText = promptTexto;
      // Usar a Gemini para criar o prompt top a não ser que o upload contorne o texto
      if (tipoCriacao === 'Clone (Celebridades)') {
         let base64B = await new Promise<string>((resolve) => { const r = new FileReader(); r.readAsDataURL(imageBase!); r.onload = () => resolve(r.result as string); });
         let base64R = await new Promise<string>((resolve) => { const r = new FileReader(); r.readAsDataURL(imageRef!); r.onload = () => resolve(r.result as string); });
         enhancedPromptText = await enhancePromptWithGemini("Clone Celebridade", tipoCriacao, base64R, base64B);
      } else if (promptTexto.trim() && !refOpcional && tipoCriacao !== 'Clone (Influencer IA)') {
        enhancedPromptText = await enhancePromptWithGemini(promptTexto, tipoCriacao);
      } else if (tipoCriacao === 'Clone (Influencer IA)') {
        const HARDCODED_PROMPT = "High-definition professional face-swap merging. Transfer the facial identity and features from the identity reference image onto the person in the base image. Preserve the pose, clothing, and background from the base image without modification. Ensure perfect blend.";
        enhancedPromptText = HARDCODED_PROMPT;
      }

      const { data, error } = await supabase.functions.invoke('did-api', {
        body: { 
          action: 'stage1', 
          payload: { 
            view: 'imagem', 
            tipo: tipoCriacao, 
            text: enhancedPromptText,
            image_base64: imageBase64,
            base_image_base64: falUrlBase,
            swap_image_base64: falUrlRef,
            aspect_ratio: proporcao
          } 
        }
      });
      if (error) throw error;
      
      if (data?.data?.image_url) {
         // O Backend do Gemini (Imagen) retornou a Base64 da imagem perfeitamente desenhada!
         setGeneratedImage(data.data.image_url);
         if (data?.data?.enhanced_prompt) {
           console.log("Prompt Mestre Utilizado:", data.data.enhanced_prompt);
         }
      } else {
         throw new Error("A Inteligência Artificial não retornou a imagem.");
      }
      setIsGenerating(false);

    } catch (err: any) {
      console.error(err);
      alert('Erro na geração (App): ' + (err.message || err.toString() || 'Erro desconhecido.'));
      setIsGenerating(false);
    } 
  };

  const tiposDeCriacao = [
    'Influencer Realista',
    'Influencer UGC',
    'Clone (Influencer IA)',
    'Clone (Celebridades)',
    'POV (mostrando produto)',
    'Cenário Cinematográfico'
  ];

  return (
    <main className="max-w-[1000px] mx-auto px-4 md:px-8 py-10 md:py-16 flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-3xl mb-10">
        <h1 className="text-3xl md:text-[32px] font-bold text-white mb-2 tracking-tight">Gerador de Imagens</h1>
        <p className="text-[#a8a8b3] text-sm md:text-base">Gere imagens e vídeos com inteligência artificial</p>
      </div>

      {/* Main Form Container */}
      <div className="w-full max-w-3xl bg-[#111114] border border-[#27272A] rounded-3xl p-6 md:p-10 relative">

        {/* Back Button */}
        <button onClick={onBack} className="flex items-center gap-2 text-[#a8a8b3] hover:text-white transition-colors mb-8 font-medium text-sm group focus:outline-none">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Voltar
        </button>

        <h2 className="text-xl md:text-2xl font-bold text-white mb-8 tracking-tight">Gerar Imagem</h2>

        {/* Form Fields */}
        <div className="space-y-6">

          {/* Tipo de criação (CUSTOM DROPDOWN) */}
          <div className="relative">
            <label className="block text-sm font-semibold text-white mb-2.5">O que você quer gerar?</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsTipoOpen(!isTipoOpen)}
                className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-4 py-3.5 text-sm text-[#e4e4e7] flex items-center justify-between focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]/50 transition-all font-medium"
              >
                {tipoCriacao || 'Selecione um tipo de criação'}
                <ChevronDown className={`w-4 h-4 text-[#a8a8b3] transition-transform ${isTipoOpen ? 'rotate-180' : ''}`} />
              </button>

              {isTipoOpen && (
                <div className="absolute z-50 left-0 right-0 top-[calc(100%+8px)] bg-[#18181B] border border-[#27272A] rounded-xl shadow-2xl py-1.5 overflow-hidden pointer-events-auto">
                  {tiposDeCriacao.map((tipo) => (
                    <button
                      key={tipo}
                      type="button"
                      onClick={() => {
                        setTipoCriacao(tipo);
                        setIsTipoOpen(false);
                      }}
                      className={`w-[calc(100%-12px)] mx-1.5 text-left px-3 py-2.5 text-sm font-medium flex items-center gap-3 transition-colors ${tipoCriacao === tipo
                          ? 'bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563EB]'
                          : 'text-[#e4e4e7] hover:text-white hover:bg-[#27272A] rounded-lg'
                        }`}
                    >
                      {tipoCriacao === tipo ? (
                        <Check className="w-4 h-4 text-white" />
                      ) : (
                        <div className="w-4 h-4" /> /* Invisible spacer */
                      )}
                      {tipo}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Conditional Estilo da Foto */}
          {(tipoCriacao === 'Influencer Realista' || tipoCriacao === 'Influencer UGC' || tipoCriacao === 'Clone (Celebridades)') && (
            <div>
              <label className="block text-sm font-semibold text-white mb-2.5">Estilo da Foto</label>
              <div className="relative">
                <select className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-4 py-3.5 text-sm text-[#e4e4e7] appearance-none cursor-pointer focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]/50 transition-all font-medium">
                  <option value="frente">De frente</option>
                  <option value="perfil">De perfil</option>
                  <option value="corpo-inteiro">Corpo inteiro</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a8a8b3] pointer-events-none" />
              </div>
            </div>
          )}

          {/* Conditional Double Upload Box for Clone IA */}
          {tipoCriacao === 'Clone (Influencer IA)' && (
            <div>
              <label className="block text-sm font-semibold text-white mb-2.5">Referências obrigatórias</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span className="text-xs text-[#a8a8b3] mb-2 font-medium">Imagem Base</span>
                  <label className="h-28 sm:h-32 relative bg-transparent border-[1.5px] border-dashed border-[#27272A] rounded-[14px] flex flex-col items-center justify-center cursor-pointer hover:border-[#4F46E5] hover:bg-[#18181B] transition-all overflow-hidden group">
                    <input type="file" className="hidden" accept="image/jpeg, image/png, image/webp" onChange={(e) => { if (e.target.files && e.target.files[0]) setImageBase(e.target.files[0]); }} />
                    {imageBase ? (
                      <div className="absolute inset-0 w-full h-full">
                        <img src={URL.createObjectURL(imageBase)} alt="Base" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 xl:opacity-0 xl:group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button onClick={(e) => { e.preventDefault(); setImageBase(null); }} className="p-2">
                            <X className="w-5 h-5 text-white" strokeWidth={2.5} />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <ImageIcon className="w-6 h-6 text-[#a8a8b3] group-hover:text-[#4F46E5] mb-2 transition-colors" strokeWidth={1.5} />
                        <span className="text-sm font-medium text-[#e4e4e7]">Enviar</span>
                      </>
                    )}
                  </label>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-[#a8a8b3] mb-2 font-medium">Imagem de Referência</span>
                  <label className="h-28 sm:h-32 relative bg-transparent border-[1.5px] border-dashed border-[#27272A] rounded-[14px] flex flex-col items-center justify-center cursor-pointer hover:border-[#4F46E5] hover:bg-[#18181B] transition-all overflow-hidden group">
                    <input type="file" className="hidden" accept="image/jpeg, image/png, image/webp" onChange={(e) => { if (e.target.files && e.target.files[0]) setImageRef(e.target.files[0]); }} />
                    {imageRef ? (
                      <div className="absolute inset-0 w-full h-full">
                        <img src={URL.createObjectURL(imageRef)} alt="Referencia" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 xl:opacity-0 xl:group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button onClick={(e) => { e.preventDefault(); setImageRef(null); }} className="p-2">
                            <X className="w-5 h-5 text-white" strokeWidth={2.5} />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <ImageIcon className="w-6 h-6 text-[#a8a8b3] group-hover:text-[#4F46E5] mb-2 transition-colors" strokeWidth={1.5} />
                        <span className="text-sm font-medium text-[#e4e4e7]">Enviar</span>
                      </>
                    )}
                  </label>
                </div>
              </div>
              <p className="text-xs font-medium text-[#a8a8b3] mt-3">
                A imagem base define o cenário e pose. A imagem de referência define o rosto e aparência.
              </p>
            </div>
          )}

          {/* Descrição */}
          {tipoCriacao !== 'Clone (Influencer IA)' && tipoCriacao !== 'Clone (Celebridades)' && (
            <div>
              <label className="block text-sm font-semibold text-white mb-2.5">Descrição</label>
              <div className="relative">
                <textarea
                  rows={4}
                  value={promptTexto}
                  onChange={(e) => setPromptTexto(e.target.value)}
                  className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-4 py-3.5 text-sm text-[#e4e4e7] placeholder:text-[#a8a8b3]/50 focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]/50 transition-all resize-none font-medium"
                  placeholder={
                    tipoCriacao === 'Clone (Celebridades)'
                      ? "Crie uma imagem do/da (celebridade) Usando o mesmo cenário e substituindo 100% a pessoa da imagem de referência"
                      : "Descreva o que você quer criar. Exemplo: influencer brasileira de 23 anos com roupa fitness"
                  }
                ></textarea>
                <div className="absolute bottom-3 right-4 text-xs text-[#a8a8b3] font-medium">{promptTexto.length}/2000</div>
              </div>
            </div>
          )}

          {/* Conditional Alert Box for Clone Celebridades */}
          {tipoCriacao === 'Clone (Celebridades)' && (
            <div className="bg-[#EAB308]/[0.05] border border-[#EAB308]/30 rounded-xl p-4 flex gap-3 items-start">
              <AlertCircle className="w-5 h-5 text-[#EAB308] shrink-0 mt-0.5" />
              <p className="text-sm font-medium text-[#EAB308] leading-relaxed">
                Exemplos com celebridades são apenas demonstrativos. Recomendamos utilizar imagens de influencers geradas por IA ou imagens que você tenha permissão para usar.
              </p>
            </div>
          )}

          {/* Proporção */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2.5">Proporção</label>
            <div className="relative">
              <select 
                value={proporcao}
                onChange={(e) => setProporcao(e.target.value)}
                className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-4 py-3.5 text-sm text-[#e4e4e7] appearance-none cursor-pointer focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]/50 transition-all font-medium"
              >
                <option value="1:1">1:1 Quadrado</option>
                <option value="9:16">9:16 Vertical (Stories)</option>
                <option value="16:9">16:9 Horizontal (YouTube)</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a8a8b3] pointer-events-none" />
            </div>
          </div>

          {/* Conditional Double Upload Box for Clone Celebridades */}
          {tipoCriacao === 'Clone (Celebridades)' && (
            <div className="mt-8">
              <label className="block text-sm font-semibold text-white mb-2.5">Referências obrigatórias</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span className="text-xs text-[#a8a8b3] mb-2 font-medium">Imagem Base</span>
                  <label className="h-28 sm:h-32 relative bg-transparent border-[1.5px] border-dashed border-[#27272A] rounded-[14px] flex flex-col items-center justify-center cursor-pointer hover:border-[#4F46E5] hover:bg-[#18181B] transition-all overflow-hidden group">
                    <input type="file" className="hidden" accept="image/jpeg, image/png, image/webp" onChange={(e) => { if (e.target.files && e.target.files[0]) setImageBase(e.target.files[0]); }} />
                    {imageBase ? (
                      <div className="absolute inset-0 w-full h-full">
                        <img src={URL.createObjectURL(imageBase)} alt="Base" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 xl:opacity-0 xl:group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button onClick={(e) => { e.preventDefault(); setImageBase(null); }} className="p-2">
                            <X className="w-5 h-5 text-white" strokeWidth={2.5} />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <ImageIcon className="w-6 h-6 text-[#a8a8b3] group-hover:text-[#4F46E5] mb-2 transition-colors" strokeWidth={1.5} />
                        <span className="text-sm font-medium text-[#e4e4e7]">Enviar</span>
                      </>
                    )}
                  </label>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-[#a8a8b3] mb-2 font-medium">Imagem de Referência</span>
                  <label className="h-28 sm:h-32 relative bg-transparent border-[1.5px] border-dashed border-[#27272A] rounded-[14px] flex flex-col items-center justify-center cursor-pointer hover:border-[#4F46E5] hover:bg-[#18181B] transition-all overflow-hidden group">
                    <input type="file" className="hidden" accept="image/jpeg, image/png, image/webp" onChange={(e) => { if (e.target.files && e.target.files[0]) setImageRef(e.target.files[0]); }} />
                    {imageRef ? (
                      <div className="absolute inset-0 w-full h-full">
                        <img src={URL.createObjectURL(imageRef)} alt="Referencia" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 xl:opacity-0 xl:group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button onClick={(e) => { e.preventDefault(); setImageRef(null); }} className="p-2">
                            <X className="w-5 h-5 text-white" strokeWidth={2.5} />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <ImageIcon className="w-6 h-6 text-[#a8a8b3] group-hover:text-[#4F46E5] mb-2 transition-colors" strokeWidth={1.5} />
                        <span className="text-sm font-medium text-[#e4e4e7]">Enviar</span>
                      </>
                    )}
                  </label>
                </div>
              </div>
              <p className="text-xs font-medium text-[#a8a8b3] mt-3">
                A imagem base define o cenário e pose. A imagem de referência define o rosto da celebridade.
              </p>
            </div>
          )}

          {/* Referências opcionais (hidden for Clone IA and Clone Celebridades) */}
          {tipoCriacao !== 'Clone (Influencer IA)' && tipoCriacao !== 'Clone (Celebridades)' && (
            <div className="mt-8">
              <label className="block text-sm font-semibold text-white mb-2.5">Referências opcionais</label>
              <label className="w-20 h-20 relative bg-transparent border-[1.5px] border-dashed border-[#27272A] rounded-[14px] flex items-center justify-center cursor-pointer hover:border-[#4F46E5] hover:bg-[#18181B] transition-all overflow-hidden group">
                <input type="file" className="hidden" accept="image/jpeg, image/png, image/webp" onChange={(e) => { if (e.target.files && e.target.files[0]) setRefOpcional(e.target.files[0]); }} />
                {refOpcional ? (
                  <div className="absolute inset-0 w-full h-full">
                    <img src={URL.createObjectURL(refOpcional)} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 hover:bg-black/60 transition-colors flex items-center justify-center">
                      <button onClick={(e) => { e.preventDefault(); setRefOpcional(null); }} className="p-2">
                        <X className="w-5 h-5 text-white" strokeWidth={2.5} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <Upload className="w-5 h-5 text-[#a8a8b3] group-hover:text-[#4F46E5] transition-colors" strokeWidth={2} />
                )}
              </label>
            </div>
          )}

          {/* Custo e Saldo */}
          <div className="flex items-center justify-between bg-[#18181B] border border-[#27272A] rounded-xl px-5 py-4 mt-8">
            <div className="flex items-center gap-2">
              <Link className="w-4 h-4 text-[#3B82F6]" />
              <span className="text-sm font-medium text-white">Custo: 45 créditos</span>
            </div>
            <div className="text-sm font-medium text-[#a8a8b3]">
              Saldo: 500
            </div>
          </div>

          {/* Botão Gerar */}
          <button 
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full bg-[#3B82F6] hover:bg-[#2563EB] disabled:bg-[#3B82F6]/50 disabled:cursor-not-allowed text-white rounded-xl py-4 font-bold text-sm transition-all shadow-md hover:shadow-[#3B82F6]/20 flex items-center justify-center gap-2 group mt-4">
            {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            {isGenerating ? 'Processando na IA...' : 'Gerar Imagem'}
          </button>
        </div>
      </div>

      {/* Result Section (Exibido quando a imagem finaliza) */}
      {generatedImage && (
        <div className="w-full max-w-3xl bg-[#111114] border border-[#3B82F6]/30 rounded-3xl p-6 md:p-10 relative mt-8 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500 shadow-[0_0_40px_rgba(59,130,246,0.1)]">
           <div className="w-12 h-12 bg-[#3B82F6]/20 rounded-full flex items-center justify-center mb-4">
             <Check className="w-6 h-6 text-[#3B82F6]" strokeWidth={3} />
           </div>
           <h2 className="text-xl md:text-2xl font-bold text-white mb-6 text-center">Sua Imagem Retornou com Sucesso! 🎉</h2>
           
           <img src={generatedImage} alt="Gerada" className="w-full max-w-sm rounded-2xl shadow-2xl mb-8 border border-[#27272A]" />
           
           <a href={generatedImage} download target="_blank" rel="noreferrer" className="bg-[#18181B] border border-[#27272A] hover:bg-[#27272A] hover:border-[#3F3F46] text-white px-8 py-3.5 rounded-xl font-bold transition-all flex items-center gap-2">
             <Upload className="w-4 h-4 rotate-180" /> Baixar Imagem (JPG)
           </a>
        </div>
      )}

      {/* Decorative Bottom Sparkle */}
      <div className="mt-8 opacity-[0.25] flex flex-col items-center">
        <Sparkles className="w-8 h-8 text-white mb-3" strokeWidth={1.5} />
        <span className="text-sm font-medium text-white">Descreva o que deseja criar e clique em gerar</span>
      </div>
    </main>
  );
};

// --- CREATOR ENGINE: GERAR VÍDEO VIEW ---
const CreatorEngineGerarVideoView: React.FC<{ onBack: () => void; onGoToInfluencer: () => void; onGoToCinematico: () => void; onGoToImitar: () => void }> = ({ onBack, onGoToInfluencer, onGoToCinematico, onGoToImitar }) => {
  return (
    <main className="max-w-[1000px] mx-auto px-4 md:px-8 py-10 md:py-16 flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-4xl mb-10">
        <h1 className="text-3xl md:text-[32px] font-bold text-white mb-2 tracking-tight">Produção de Vídeos com IA</h1>
        <p className="text-[#a8a8b3] text-sm md:text-base">Crie, anime e transforme ideias em vídeos profissionais com facilidade.</p>
      </div>

      {/* Main Form Container */}
      <div className="w-full max-w-4xl bg-[#111114] border border-[#27272A] rounded-3xl p-6 md:p-10 relative">

        {/* Back Button */}
        <button onClick={onBack} className="flex items-center gap-2 text-[#a8a8b3] hover:text-white transition-colors mb-8 font-medium text-sm group focus:outline-none">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Voltar
        </button>

        <h2 className="text-xl md:text-2xl font-bold text-white mb-1 tracking-tight">Gerar Vídeo</h2>
        <p className="text-[#a8a8b3] text-sm md:text-base mb-8">Escolha o estilo de vídeo</p>

        {/* 3 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

          {/* Card 1 */}
          <button onClick={onGoToInfluencer} className="flex flex-col text-left bg-[#18181B] border border-[#27272A] hover:border-[#3F3F46] p-6 rounded-2xl transition-all group shadow-sm hover:shadow-lg focus:outline-none">
            <Wand2 className="w-6 h-6 text-[#a8a8b3] group-hover:text-[#e4e4e7] mb-4 transition-colors" strokeWidth={1.5} />
            <h3 className="text-white font-bold text-[15px] mb-2 tracking-tight">Influencer IA</h3>
            <p className="text-[#a8a8b3] text-xs leading-relaxed">Crie vídeos realistas de influencer UGC com IA</p>
          </button>

          {/* Card 2 */}
          <button onClick={onGoToCinematico} className="flex flex-col text-left bg-[#18181B] border border-[#27272A] hover:border-[#3F3F46] p-6 rounded-2xl transition-all group shadow-sm hover:shadow-lg focus:outline-none">
            <Clapperboard className="w-6 h-6 text-[#a8a8b3] group-hover:text-[#e4e4e7] mb-4 transition-colors" strokeWidth={1.5} />
            <h3 className="text-white font-bold text-[15px] mb-2 tracking-tight leading-tight">Vídeo Cinematográfico</h3>
            <p className="text-[#a8a8b3] text-xs leading-relaxed">Transforme imagens em vídeos cinematográficos com IA</p>
          </button>

          {/* Card 3 */}
          <button onClick={onGoToImitar} className="flex flex-col text-left bg-[#18181B] border border-[#27272A] hover:border-[#3F3F46] p-6 rounded-2xl transition-all group shadow-sm hover:shadow-lg focus:outline-none">
            <Accessibility className="w-6 h-6 text-[#a8a8b3] group-hover:text-[#e4e4e7] mb-4 transition-colors" strokeWidth={1.5} />
            <h3 className="text-white font-bold text-[15px] mb-2 tracking-tight">Imitar Movimentos</h3>
            <p className="text-[#a8a8b3] text-xs leading-relaxed">Replique movimentos de um vídeo</p>
          </button>

        </div>
      </div>
    </main>
  );
};

// --- CREATOR ENGINE: GERAR VÍDEO - INFLUENCER IA VIEW ---
const CreatorEngineGerarVideoInfluencerIAView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [imagemRef, setImagemRef] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [promptTexto, setPromptTexto] = useState('');
  const [pollingText, setPollingText] = useState('');
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!promptTexto.trim()) {
      alert('Por favor, digite uma descrição para o vídeo.');
      return;
    }

    setIsGenerating(true);
    setGeneratedVideo(null);

    try {
      // FileReader Helper
      let imageBase64 = null;
      if (imagemRef) {
        imageBase64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(imagemRef);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      }

      // Função Auxiliar de Polling Reutilizável
      const pollService = async (serviceName: string, requestId: string, maxRetries = 60) => {
        for (let i = 0; i < maxRetries; i++) {
          await new Promise(r => setTimeout(r, 5000));
          const res = await supabase.functions.invoke(`did-api?action=status&request_id=${requestId}&service=${serviceName}`, { method: 'GET' });
          const statusData = res.data;
          
          if (statusData?.error) throw new Error(statusData.error);

          if (statusData?.data?.status === 'completed' || statusData?.data?.status === 'success') {
             return statusData.data.result_url;
          } else if (statusData?.data?.status === 'failed') {
             throw new Error(`O serviço ${serviceName} falhou.`);
          }
        }
        throw new Error(`Tempo limite atingido para o serviço ${serviceName}.`);
      };

      // ==========================================
      // STAGE 1: GERAR CENÁRIO BASE (IMAGEM)
      // ==========================================
      setPollingText('Preparando cenário e modelo de visualização...');
      const s1 = await supabase.functions.invoke('did-api', {
        body: { action: 'stage1', payload: { view: 'influencer-ia', text: promptTexto, image_base64: imageBase64 } }
      });
      if (s1.error || !s1.data?.data?.image_url) throw new Error(s1.error?.message || "Falha na Etapa 1 (Imagem indisponível)");
      
      const imageUrl = s1.data.data.image_url;

      // ==========================================
      // STAGE 2: ANIMAÇÃO DE MOVIMENTO (KLING PRO 1.5)
      // ==========================================
      setPollingText('Iniciando Inteligência Kling Pro (Hollywood Padrão Ouro)...\nMovimento e realismo cinematográficos absolutos. Leva cerca de 3 a 4 minutos...');
      const s2 = await supabase.functions.invoke('did-api', {
        body: { action: 'stage2', payload: { image_url: imageUrl, text: promptTexto } }
      });
      if (s2.error || !s2.data?.data?.kling_request_id) throw new Error(s2.error?.message || "Falha na Etapa 2 (Movimento)");
      
      const klingRequestId = s2.data.data.kling_request_id;
      const klingVideoUrl = await pollService('kling', klingRequestId, 80); // Video leva ~4 min
      if (!klingVideoUrl) throw new Error("Falha ao gerar o vídeo de Movimento.");

      // Tudo pronto, sem necessidade de LipSync!
      setGeneratedVideo(klingVideoUrl);

    } catch (err: any) {
      console.error('Erro na HeyGen API:', err);
      alert('⚠️ Erro ao processar o vídeo: ' + err.message);
    } finally {
      setIsGenerating(false);
      setPollingText('');
    }
  };

  return (
    <main className="max-w-[1000px] mx-auto px-4 md:px-8 py-10 md:py-16 flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-3xl mb-10">
        <h1 className="text-3xl md:text-[32px] font-bold text-white mb-2 tracking-tight">Seu Influencer com IA</h1>
        <p className="text-[#a8a8b3] text-sm md:text-base max-w-2xl">Crie avatares realistas e profissionais prontos para representar sua marca em qualquer conteúdo.</p>
      </div>

      {/* Main Form Container */}
      <div className="w-full max-w-3xl bg-[#111114] border border-[#27272A] rounded-3xl p-6 md:p-10 relative">

        {/* Back Button */}
        <button onClick={onBack} className="flex items-center gap-2 text-[#a8a8b3] hover:text-white transition-colors mb-8 font-medium text-sm group focus:outline-none">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Voltar
        </button>

        <h2 className="text-xl md:text-2xl font-bold text-white mb-8 tracking-tight">Criativo</h2>

        {/* Form Fields */}
        <div className="space-y-6">

          {/* O que você quer gerar? */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2.5">O que você quer gerar?</label>
            <div className="relative">
              <select 
                defaultValue="ugc"
                className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-4 py-3.5 text-sm text-white appearance-none cursor-pointer focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]/50 transition-all font-medium">
                <option value="ugc">Influencer UGC</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a8a8b3] pointer-events-none" />
            </div>
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2.5">Descrição</label>
            <div className="relative">
              <textarea
                rows={4}
                value={promptTexto}
                onChange={(e) => setPromptTexto(e.target.value)}
                className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-4 py-3.5 text-sm text-[#e4e4e7] placeholder:text-[#a8a8b3]/50 focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]/50 transition-all resize-none font-medium"
                placeholder="Descreva o que você quer criar..."
              ></textarea>
              <div className="absolute bottom-3 right-4 text-xs text-[#a8a8b3] font-medium">{promptTexto.length}/2000</div>
            </div>
          </div>


          {/* Imagem de Referência */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2.5">Imagem de Referência</label>
            <label className="w-full h-36 relative bg-transparent border-[1.5px] border-dashed border-[#27272A] rounded-[14px] flex flex-col items-center justify-center cursor-pointer hover:border-[#4F46E5] hover:bg-[#18181B] transition-all group overflow-hidden">
              <input type="file" className="hidden" accept="image/jpeg, image/png, image/webp" onChange={(e) => { if (e.target.files && e.target.files[0]) setImagemRef(e.target.files[0]); }} />
              {imagemRef ? (
                <div className="absolute inset-0 w-full h-full">
                  <img src={URL.createObjectURL(imagemRef)} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 hover:bg-black/60 transition-colors flex items-center justify-center">
                    <button onClick={(e) => { e.preventDefault(); setImagemRef(null); }} className="p-2 rounded-full backdrop-blur-sm bg-black/20 hover:bg-black/40 transition-all">
                      <X className="w-6 h-6 text-white" strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <ImageIcon className="w-6 h-6 text-[#a8a8b3] group-hover:text-[#4F46E5] mb-2 transition-colors" strokeWidth={1.5} />
                  <span className="text-sm font-medium text-[#e4e4e7] mb-1">Clique para enviar uma imagem</span>
                  <span className="text-xs font-medium text-[#a8a8b3]">JPG, PNG ou WEBP</span>
                </>
              )}
            </label>
          </div>

          {/* Proporção e Duração Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Proporção */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2.5">Proporção</label>
              <div className="relative">
                <select className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-4 py-3.5 text-sm text-[#e4e4e7] appearance-none cursor-pointer focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]/50 transition-all font-medium">
                  <option value="9:16">9:16 Retrato</option>
                  <option value="16:9">16:9 Paisagem</option>
                  <option value="1:1">1:1 Quadrado</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a8a8b3] pointer-events-none" />
              </div>
            </div>

            {/* Duração */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2.5">Duração</label>
              <div className="relative">
                <select className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-4 py-3.5 text-sm text-[#e4e4e7] appearance-none cursor-pointer focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]/50 transition-all font-medium">
                  <option value="8">8 segundos</option>
                  <option value="15">15 segundos</option>
                  <option value="30">30 segundos</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a8a8b3] pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Custo e Saldo */}
          <div className="flex items-center justify-between bg-[#18181B] border border-[#27272A] rounded-xl px-5 py-4 mt-8">
            <div className="flex items-center gap-2">
              <Link className="w-4 h-4 text-[#3B82F6]" />
              <span className="text-sm font-medium text-white">Custo: 150 créditos</span>
            </div>
            <div className="text-sm font-medium text-[#a8a8b3]">
              Saldo: 500
            </div>
          </div>

          {/* Botão Gerar Vídeo */}
          <button 
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full bg-[#3B82F6] hover:bg-[#2563EB] disabled:bg-[#3B82F6]/50 disabled:cursor-not-allowed text-white rounded-xl py-4 font-bold text-sm transition-all shadow-md hover:shadow-[#3B82F6]/20 flex items-center justify-center gap-2 group mt-4 relative overflow-hidden">
            {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Video className="w-5 h-5" />}
            {isGenerating ? (pollingText || 'Processando...') : 'Gerar Vídeo'}
          </button>
        </div>
      </div>

      {/* Result Section (Exibido quando o vídeo finaliza - TikTok View) */}
      {/* Result Section (Exibido quando o vídeo finaliza - TikTok View) */}
      {generatedVideo && (
        <div className="w-full max-w-[460px] mx-auto mt-12 animate-in fade-in slide-in-from-bottom-8 duration-700 flex flex-col items-center">
           <div className="w-12 h-12 bg-[#3B82F6]/20 rounded-full flex items-center justify-center mb-4">
             <Check className="w-6 h-6 text-[#3B82F6]" strokeWidth={3} />
           </div>
           <h2 className="text-xl md:text-2xl font-bold text-white mb-6 text-center">Vídeo Pronto! 🎉</h2>
           
           {/* Card Central Unificado (Vídeo + Botões) */}
           <div className="w-full bg-[#111114] border border-[#27272A] rounded-[32px] p-4 shadow-[0_0_50px_rgba(59,130,246,0.15)] flex flex-col gap-4">
             
             {/* TikTok Player Container (9:16 Aspect Ratio) */}
             <div className="w-full aspect-[9/16] bg-black rounded-2xl overflow-hidden relative shadow-inner border border-[#27272A]/50 group">
               <video 
                 src={generatedVideo} 
                 controls 
                 autoPlay 
                 loop
                 playsInline
                 className="w-full h-full object-cover" 
               />
             </div>

             {/* Action Buttons Grid (4 colunas exatas) */}
             <div className="w-full grid grid-cols-4 gap-2">
               <a href={generatedVideo} download target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center gap-1.5 bg-[#18181B] hover:bg-[#27272A] border border-[#27272A] py-3 rounded-[16px] transition-all cursor-pointer group">
                 <Download className="w-4 h-4 md:w-5 md:h-5 text-[#a8a8b3] group-hover:text-white transition-colors" />
                 <span className="text-[10px] md:text-xs font-semibold text-[#a8a8b3] group-hover:text-white">Baixar</span>
               </a>
               <button onClick={() => {
                   navigator.clipboard.writeText(promptTexto);
                   alert('Prompt copiado para a área de transferência!');
                 }} 
                 className="flex flex-col items-center justify-center gap-1.5 bg-[#18181B] hover:bg-[#27272A] border border-[#27272A] py-3 rounded-[16px] transition-all cursor-pointer group">
                 <Copy className="w-4 h-4 md:w-5 md:h-5 text-[#a8a8b3] group-hover:text-white transition-colors" />
                 <span className="text-[10px] md:text-xs font-semibold text-[#a8a8b3] group-hover:text-white">Copiar</span>
               </button>
               <button onClick={handleGenerate} className="flex flex-col items-center justify-center gap-1.5 bg-[#18181B] hover:bg-[#27272A] border border-[#27272A] py-3 rounded-[16px] transition-all cursor-pointer group">
                 <RefreshCw className="w-4 h-4 md:w-5 md:h-5 text-[#a8a8b3] group-hover:text-white transition-colors" />
                 <span className="text-[10px] md:text-xs font-semibold text-[#a8a8b3] group-hover:text-white">Variação</span>
               </button>
               <button className="flex flex-col items-center justify-center gap-1.5 bg-[#18181B] hover:bg-[#27272A] border border-[#27272A] py-3 rounded-[16px] transition-all cursor-pointer group">
                 <Bookmark className="w-4 h-4 md:w-5 md:h-5 text-[#a8a8b3] group-hover:text-white transition-colors" />
                 <span className="text-[10px] md:text-xs font-semibold text-[#a8a8b3] group-hover:text-white">Salvar</span>
               </button>
             </div>
             
           </div>
        </div>
      )}

      {/* Decorative Bottom */}
      <div className="mt-8 opacity-[0.25] flex flex-col items-center">
        <Video className="w-8 h-8 text-white mb-3" strokeWidth={1.5} />
        <span className="text-sm font-medium text-white">Descreva o vídeo que deseja criar e clique em gerar</span>
      </div>
    </main>
  );
};


// --- CREATOR ENGINE: GERAR VÍDEO - CINEMATOGRÁFICO VIEW ---
const CreatorEngineGerarVideoCinematicoView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [imagemBase, setImagemBase] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('heygen-api', {
        body: { action: 'generate', payload: { view: 'cinematico' } }
      });
      if (error) throw error;
      alert('✅ Vídeo Cinemático em produção pela HeyGen! Em breve estará nas Suas Criações.');
    } catch (err: any) {
      console.error('Erro na HeyGen API:', err);
      alert('⚠️ Erro ao conectar com a IA: A chave API pode não estar configurada.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main className="max-w-[1000px] mx-auto px-4 md:px-8 py-10 md:py-16 flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-3xl mb-10">
        <h1 className="text-3xl md:text-[32px] font-bold text-white mb-2 tracking-tight">Vídeos Cinematográficos com IA</h1>
        <p className="text-[#a8a8b3] text-sm md:text-base max-w-2xl">Use IA para transformar qualquer ideia em cenas cinematográficas que prendem atenção e geram resultado.</p>
      </div>

      {/* Main Form Container */}
      <div className="w-full max-w-3xl bg-[#111114] border border-[#27272A] rounded-3xl p-6 md:p-10 relative">

        {/* Back Button */}
        <button onClick={onBack} className="flex items-center gap-2 text-[#a8a8b3] hover:text-white transition-colors mb-8 font-medium text-sm group focus:outline-none">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Voltar
        </button>

        <h2 className="text-xl md:text-2xl font-bold text-white mb-8 tracking-tight">Vídeo Cinematográfico</h2>

        {/* Form Fields */}
        <div className="space-y-6">

          {/* Imagem Base */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2.5">Imagem Base</label>
            <label className="w-full h-36 relative bg-transparent border-[1.5px] border-dashed border-[#27272A] rounded-[14px] flex flex-col items-center justify-center cursor-pointer hover:border-[#4F46E5] hover:bg-[#18181B] transition-all group overflow-hidden">
              <input type="file" className="hidden" accept="image/jpeg, image/png, image/webp" onChange={(e) => { if (e.target.files && e.target.files[0]) setImagemBase(e.target.files[0]); }} />
              {imagemBase ? (
                <div className="absolute inset-0 w-full h-full">
                  <img src={URL.createObjectURL(imagemBase)} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 hover:bg-black/60 transition-colors flex items-center justify-center">
                    <button onClick={(e) => { e.preventDefault(); setImagemBase(null); }} className="p-2 rounded-full backdrop-blur-sm bg-black/20 hover:bg-black/40 transition-all">
                      <X className="w-6 h-6 text-white" strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <ImageIcon className="w-6 h-6 text-[#a8a8b3] group-hover:text-[#4F46E5] mb-2 transition-colors" strokeWidth={1.5} />
                  <span className="text-sm font-medium text-[#e4e4e7] mb-1">Clique para enviar uma imagem</span>
                  <span className="text-xs font-medium text-[#a8a8b3]">JPG, PNG ou WEBP</span>
                </>
              )}
            </label>
          </div>

          {/* Descrição ("O que deve acontecer...") */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2.5">O que deve acontecer no vídeo?</label>
            <div className="relative">
              <textarea
                rows={4}
                className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-4 py-3.5 text-sm text-[#e4e4e7] placeholder:text-[#a8a8b3]/50 focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]/50 transition-all resize-none font-medium"
                placeholder="Descreva a ação: carro acelerando, vento no cabelo, pessoa andando, câmera cinematográfica..."
              ></textarea>
              <div className="absolute bottom-3 right-4 text-xs text-[#a8a8b3] font-medium">0/2000</div>
            </div>
            <p className="text-xs font-medium text-[#a8a8b3] mt-3">
              Envie uma imagem e descreva o que deve acontecer no vídeo. Exemplo: carro acelerando, vento no cabelo, pessoa andando, câmera cinematográfica.
            </p>
          </div>

          {/* Custo e Saldo */}
          <div className="flex items-center justify-between bg-[#18181B] border border-[#27272A] rounded-xl px-5 py-4 mt-8">
            <div className="flex items-center gap-2">
              <Link className="w-4 h-4 text-[#3B82F6]" />
              <span className="text-sm font-medium text-white">Custo: 180 créditos</span>
            </div>
            <div className="text-sm font-medium text-[#a8a8b3]">
              Saldo: 500
            </div>
          </div>

          {/* Botão Gerar Vídeo */}
          <button 
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full bg-[#3B82F6] hover:bg-[#2563EB] disabled:bg-[#3B82F6]/50 disabled:cursor-not-allowed text-white rounded-xl py-4 font-bold text-sm transition-all shadow-md hover:shadow-[#3B82F6]/20 flex items-center justify-center gap-2 group mt-4">
            {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Video className="w-5 h-5" />}
            {isGenerating ? 'Processando Vídeo...' : 'Gerar Vídeo'}
          </button>
        </div>
      </div>

      {/* Decorative Bottom */}
      <div className="mt-8 opacity-[0.25] flex flex-col items-center">
        <Video className="w-8 h-8 text-white mb-3" strokeWidth={1.5} />
        <span className="text-sm font-medium text-white">Envie uma imagem e descreva o vídeo que deseja criar</span>
      </div>
    </main>
  );
};


// --- CREATOR ENGINE: GERAR VÍDEO - IMITAR MOVIMENTOS VIEW ---
const CreatorEngineGerarVideoImitarMovimentosView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [imagemRef, setImagemRef] = useState<File | null>(null);
  const [videoRef, setVideoRef] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('heygen-api', {
        body: { action: 'generate', payload: { view: 'imitar-movimentos' } }
      });
      if (error) throw error;
      alert('✅ Vídeo de Movimentos em produção pela HeyGen! Em breve nas Suas Criações.');
    } catch (err: any) {
      console.error('Erro na HeyGen API:', err);
      alert('⚠️ Erro ao conectar com a IA: A chave API pode não estar configurada.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main className="max-w-[1000px] mx-auto px-4 md:px-8 py-10 md:py-16 flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-3xl mb-10">
        <h1 className="text-3xl md:text-[32px] font-bold text-white mb-2 tracking-tight">Imite Movimentos com IA</h1>
        <p className="text-[#a8a8b3] text-sm md:text-base max-w-2xl">Faça seu avatar copiar qualquer movimento de forma realista.</p>
      </div>

      {/* Main Form Container */}
      <div className="w-full max-w-3xl bg-[#111114] border border-[#27272A] rounded-3xl p-6 md:p-10 relative">

        {/* Back Button */}
        <button onClick={onBack} className="flex items-center gap-2 text-[#a8a8b3] hover:text-white transition-colors mb-8 font-medium text-sm group focus:outline-none">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Voltar
        </button>

        <h2 className="text-xl md:text-2xl font-bold text-white mb-8 tracking-tight">Imitar Movimentos</h2>

        {/* Form Fields */}
        <div className="space-y-6">

          {/* Referências obrigatórias */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2.5">Referências obrigatórias</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Imagem */}
              <div>
                <label className="block text-xs font-medium text-[#a8a8b3] mb-1.5">Imagem</label>
                <label className="w-full h-32 relative bg-transparent border-[1.5px] border-dashed border-[#27272A] rounded-[14px] flex flex-col items-center justify-center cursor-pointer hover:border-[#4F46E5] hover:bg-[#18181B] transition-all group overflow-hidden">
                  <input type="file" className="hidden" accept="image/jpeg, image/png, image/webp" onChange={(e) => { if (e.target.files && e.target.files[0]) setImagemRef(e.target.files[0]); }} />
                  {imagemRef ? (
                    <div className="absolute inset-0 w-full h-full">
                      <img src={URL.createObjectURL(imagemRef)} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 hover:bg-black/60 transition-colors flex items-center justify-center">
                        <button onClick={(e) => { e.preventDefault(); setImagemRef(null); }} className="p-2 rounded-full backdrop-blur-sm bg-black/20 hover:bg-black/40 transition-all">
                          <X className="w-6 h-6 text-white" strokeWidth={2.5} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <ImageIcon className="w-5 h-5 text-[#a8a8b3] group-hover:text-[#4F46E5] mb-2 transition-colors" strokeWidth={1.5} />
                      <span className="text-xs font-medium text-[#e4e4e7]">Enviar</span>
                    </>
                  )}
                </label>
              </div>

              {/* Vídeo de Movimento */}
              <div>
                <label className="block text-xs font-medium text-[#a8a8b3] mb-1.5">Vídeo de Movimento</label>
                <label className="w-full h-32 relative bg-transparent border-[1.5px] border-dashed border-[#27272A] rounded-[14px] flex flex-col items-center justify-center cursor-pointer hover:border-[#4F46E5] hover:bg-[#18181B] transition-all group overflow-hidden">
                  <input type="file" className="hidden" accept="video/mp4, video/webm, video/quicktime" onChange={(e) => { if (e.target.files && e.target.files[0]) setVideoRef(e.target.files[0]); }} />
                  {videoRef ? (
                    <div className="absolute inset-0 w-full h-full">
                      <video src={URL.createObjectURL(videoRef)} className="w-full h-full object-cover" muted loop autoPlay playsInline />
                      <div className="absolute inset-0 bg-black/40 hover:bg-black/60 transition-colors flex items-center justify-center">
                        <button onClick={(e) => { e.preventDefault(); setVideoRef(null); }} className="p-2 rounded-full backdrop-blur-sm bg-black/20 hover:bg-black/40 transition-all">
                          <X className="w-6 h-6 text-white" strokeWidth={2.5} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Video className="w-5 h-5 text-[#a8a8b3] group-hover:text-[#4F46E5] mb-2 transition-colors" strokeWidth={1.5} />
                      <span className="text-xs font-medium text-[#e4e4e7]">Enviar</span>
                    </>
                  )}
                </label>
              </div>
            </div>
          </div>

          {/* Descrição (opcional) */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2.5">Descrição (opcional)</label>
            <div className="relative">
              <textarea
                rows={3}
                className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-4 py-3.5 text-sm text-[#e4e4e7] placeholder:text-[#a8a8b3]/50 focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]/50 transition-all resize-none font-medium"
                placeholder="Descreva detalhes adicionais sobre o movimento..."
              ></textarea>
              <div className="absolute bottom-3 right-4 text-xs text-[#a8a8b3] font-medium">0/2000</div>
            </div>
          </div>

          {/* Qualidade de saída */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2.5">Qualidade de saída</label>
            <div className="relative">
              <select className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-4 py-3.5 text-sm text-[#e4e4e7] appearance-none cursor-pointer focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]/50 transition-all font-medium">
                <option value="720p">720P (HD)</option>
                <option value="1080p">1080P (Full HD)</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a8a8b3] pointer-events-none" />
            </div>
          </div>

          {/* Botão Gerar Vídeo */}
          <button 
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full bg-[#3B82F6] hover:bg-[#2563EB] disabled:bg-[#3B82F6]/50 disabled:cursor-not-allowed text-white rounded-xl py-4 font-bold text-sm transition-all shadow-md hover:shadow-[#3B82F6]/20 flex items-center justify-center gap-2 group mt-6">
            {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Video className="w-5 h-5" />}
            {isGenerating ? 'Processando Vídeo...' : 'Gerar Vídeo'}
          </button>
        </div>
      </div>

      {/* Decorative Bottom */}
      <div className="mt-8 opacity-[0.25] flex flex-col items-center">
        <Video className="w-8 h-8 text-white mb-3" strokeWidth={1.5} />
        <span className="text-sm font-medium text-white">Envie as referências e clique em gerar</span>
      </div>
    </main>
  );
};


// --- CREATOR ENGINE MINHAS CRIAÇÕES VIEW ---
const CreatorEngineMinhasCriacoesView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <main className="max-w-[1400px] mx-auto px-6 py-8 md:py-12 min-h-screen">
      {/* Header */}
      <div className="mb-8 relative pl-14 md:pl-16">
        <button 
          onClick={onBack}
          className="absolute left-0 top-1 w-10 h-10 md:w-11 md:h-11 bg-[#18181B] border border-[#27272A] rounded-full flex items-center justify-center hover:bg-[#27272A] hover:border-[#3F3F46] transition-all group shadow-sm z-20"
        >
          <ArrowLeft className="w-5 h-5 text-[#A1A1AA] group-hover:text-white transition-colors" strokeWidth={2} />
        </button>
        <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">Minhas Criações</h1>
        <p className="text-sm text-[#A1A1AA] font-medium">Histórico de imagens e vídeos gerados</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-20">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#71717A]" strokeWidth={2} />
          <input 
            type="text" 
            placeholder="Buscar por prompt..." 
            className="w-full bg-[#18181B] hover:bg-[#27272A]/50 border border-[#27272A] rounded-[12px] pl-12 pr-4 py-3.5 text-sm text-white placeholder:text-[#52525B] focus:outline-none focus:bg-[#18181B] focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]/50 transition-all font-medium"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 shrink-0">
          <button className="px-5 py-3.5 bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm font-bold rounded-[12px] transition-colors shadow-sm">
            Todos
          </button>
          <button className="px-5 py-3.5 bg-[#18181B] hover:bg-[#27272A] border border-[#27272A] text-[#A1A1AA] hover:text-white text-sm font-medium rounded-[12px] transition-colors shadow-sm">
            Imagens
          </button>
          <button className="px-5 py-3.5 bg-[#18181B] hover:bg-[#27272A] border border-[#27272A] text-[#A1A1AA] hover:text-white text-sm font-medium rounded-[12px] transition-colors shadow-sm">
            Vídeos
          </button>
        </div>
      </div>

      {/* Empty State */}
      <div className="flex flex-col items-center justify-center py-20 opacity-80">
        <div className="mb-6 relative">
          <ImageIcon className="w-16 h-16 text-[#3F3F46]" strokeWidth={1.5} />
          <div className="absolute -bottom-2 -right-2 bg-[#09090b] rounded-full p-1 border border-[#09090b]">
             <ImageIcon className="w-8 h-8 text-[#52525B]" strokeWidth={1.5} />
          </div>
        </div>
        <p className="text-[#71717A] text-[15px] font-medium">Nenhuma criação encontrada</p>
      </div>
    </main>
  );
};

// --- CREATOR ENGINE CRÉDITOS VIEW ---
const CreatorEngineCreditosView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <main className="max-w-[1400px] mx-auto px-6 py-8 md:py-12 min-h-screen">
      {/* Header */}
      <div className="mb-10 relative pl-14 md:pl-16">
        <button 
          onClick={onBack}
          className="absolute left-0 top-1 w-10 h-10 md:w-11 md:h-11 bg-[#18181B] border border-[#27272A] rounded-full flex items-center justify-center hover:bg-[#27272A] hover:border-[#3F3F46] transition-all group shadow-sm z-20"
        >
          <ArrowLeft className="w-5 h-5 text-[#A1A1AA] group-hover:text-white transition-colors" strokeWidth={2} />
        </button>
        <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">Créditos</h1>
        <p className="text-sm text-[#A1A1AA] font-medium">Gerencie seus créditos e plano</p>
      </div>

      {/* Saldo Atual */}
      <div className="w-full bg-[#111114] border border-[#27272A] rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
        {/* Glow sub-surface */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#3B82F6]/5 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <CreditCard className="w-4 h-4 text-[#3B82F6]" />
            <span className="text-sm text-[#A1A1AA] font-medium">Saldo atual</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl md:text-5xl font-black text-white tracking-tighter">500</span>
            <span className="text-[#A1A1AA] text-sm md:text-base font-medium">créditos</span>
          </div>
        </div>
      </div>

      {/* Planos Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        
        {/* Starter Plan */}
        <div className="bg-[#111114] border border-[#27272A] rounded-2xl p-6 md:p-8 flex flex-col h-full hover:border-[#3B82F6]/30 transition-colors group">
          <h3 className="text-lg font-bold text-white mb-4 group-hover:text-[#bfdbfe] transition-colors">Starter</h3>
          <div className="flex items-baseline gap-1 mb-1">
            <span className="text-[#3B82F6] font-bold text-lg">R$</span>
            <span className="text-[#3B82F6] text-4xl font-black tracking-tighter">47</span>
            <span className="text-[#A1A1AA] text-xs">/mês</span>
          </div>
          <p className="text-[#3B82F6] text-sm font-medium mb-8">500 créditos</p>
          
          <ul className="flex flex-col gap-4 mb-8 flex-1">
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-[#3B82F6] shrink-0 mt-0.5" strokeWidth={3} />
              <span className="text-sm text-[#A1A1AA] font-medium leading-relaxed">Até 20 gerações de conteúdo</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-[#3B82F6] shrink-0 mt-0.5" strokeWidth={3} />
              <span className="text-sm text-[#A1A1AA] font-medium leading-relaxed">Crie influencers hiper-realistas</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-[#3B82F6] shrink-0 mt-0.5" strokeWidth={3} />
              <span className="text-sm text-[#A1A1AA] font-medium leading-relaxed">Gere imagens, clones e vídeos</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-[#3B82F6] shrink-0 mt-0.5" strokeWidth={3} />
              <span className="text-sm text-[#A1A1AA] font-medium leading-relaxed">Combinação livre entre recursos</span>
            </li>
          </ul>
          
          <button className="w-full py-4 bg-[#232328] hover:bg-[#2A2A30] text-[#A1A1AA] hover:text-white rounded-xl text-sm font-bold transition-all shadow-sm">
            Assinar agora
          </button>
        </div>

        {/* Creator Plan (Highlighted) */}
        <div className="bg-[#18181B] border-2 border-[#3B82F6] rounded-2xl p-6 md:p-8 flex flex-col h-full relative shadow-[0_0_40px_rgba(59,130,246,0.08)]">
          {/* Badge */}
          <div className="absolute -top-3 left-8">
            <span className="bg-[#3B82F6] text-white text-[9px] font-black uppercase tracking-widest py-1.5 px-4 rounded-full shadow-lg">Mais Popular</span>
          </div>

          <h3 className="text-lg font-bold text-white mb-4 mt-2">Creator</h3>
          <div className="flex items-baseline gap-1 mb-1">
            <span className="text-[#3B82F6] font-bold text-lg">R$</span>
            <span className="text-[#3B82F6] text-4xl font-black tracking-tighter">79</span>
            <span className="text-[#A1A1AA] text-xs">/mês</span>
          </div>
          <p className="text-[#3B82F6] text-sm font-medium mb-8">1.000 créditos</p>
          
          <ul className="flex flex-col gap-4 mb-8 flex-1">
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-[#3B82F6] shrink-0 mt-0.5" strokeWidth={3} />
              <span className="text-sm text-[#A1A1AA] font-medium leading-relaxed">Até 40 gerações de conteúdo</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-[#3B82F6] shrink-0 mt-0.5" strokeWidth={3} />
              <span className="text-sm text-[#A1A1AA] font-medium leading-relaxed">Criação rápida de influencers e vídeos</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-[#3B82F6] shrink-0 mt-0.5" strokeWidth={3} />
              <span className="text-sm text-[#A1A1AA] font-medium leading-relaxed">Ideal para criadores de conteúdo</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-[#3B82F6] shrink-0 mt-0.5" strokeWidth={3} />
              <span className="text-sm text-[#A1A1AA] font-medium leading-relaxed">Equilíbrio entre imagens e vídeos</span>
            </li>
          </ul>
          
          <button className="w-full py-4 bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-[#3B82F6]/20">
            Assinar agora
          </button>
        </div>

        {/* Pro Plan */}
        <div className="bg-[#111114] border border-[#27272A] rounded-2xl p-6 md:p-8 flex flex-col h-full hover:border-[#3B82F6]/30 transition-colors group">
          <h3 className="text-lg font-bold text-white mb-4 group-hover:text-[#bfdbfe] transition-colors">Pro</h3>
          <div className="flex items-baseline gap-1 mb-1">
            <span className="text-[#3B82F6] font-bold text-lg">R$</span>
            <span className="text-[#3B82F6] text-4xl font-black tracking-tighter">149</span>
            <span className="text-[#A1A1AA] text-xs">/mês</span>
          </div>
          <p className="text-[#3B82F6] text-sm font-medium mb-8">2.000 créditos</p>
          
          <ul className="flex flex-col gap-4 mb-8 flex-1">
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-[#3B82F6] shrink-0 mt-0.5" strokeWidth={3} />
              <span className="text-sm text-[#A1A1AA] font-medium leading-relaxed">Até 80 gerações de conteúdo</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-[#3B82F6] shrink-0 mt-0.5" strokeWidth={3} />
              <span className="text-sm text-[#A1A1AA] font-medium leading-relaxed">Produção intensa de criativos</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-[#3B82F6] shrink-0 mt-0.5" strokeWidth={3} />
              <span className="text-sm text-[#A1A1AA] font-medium leading-relaxed">Ideal para criadores e agências</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-[#3B82F6] shrink-0 mt-0.5" strokeWidth={3} />
              <span className="text-sm text-[#A1A1AA] font-medium leading-relaxed">Alta escala de geração</span>
            </li>
          </ul>
          
          <button className="w-full py-4 bg-[#232328] hover:bg-[#2A2A30] text-[#A1A1AA] hover:text-white rounded-xl text-sm font-bold transition-all shadow-sm">
            Assinar agora
          </button>
        </div>

        {/* Business Plan */}
        <div className="bg-[#111114] border border-[#27272A] rounded-2xl p-6 md:p-8 flex flex-col h-full hover:border-[#3B82F6]/30 transition-colors group">
          <h3 className="text-lg font-bold text-white mb-4 group-hover:text-[#bfdbfe] transition-colors">Business</h3>
          <div className="flex items-baseline gap-1 mb-1">
            <span className="text-[#3B82F6] font-bold text-lg">R$</span>
            <span className="text-[#3B82F6] text-4xl font-black tracking-tighter">397</span>
            <span className="text-[#A1A1AA] text-xs">/mês</span>
          </div>
          <p className="text-[#3B82F6] text-sm font-medium mb-8">5.000 créditos</p>
          
          <ul className="flex flex-col gap-4 mb-8 flex-1">
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-[#3B82F6] shrink-0 mt-0.5" strokeWidth={3} />
              <span className="text-sm text-[#A1A1AA] font-medium leading-relaxed">Até 200 gerações de conteúdo</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-[#3B82F6] shrink-0 mt-0.5" strokeWidth={3} />
              <span className="text-sm text-[#A1A1AA] font-medium leading-relaxed">Criação em escala profissional</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-[#3B82F6] shrink-0 mt-0.5" strokeWidth={3} />
              <span className="text-sm text-[#A1A1AA] font-medium leading-relaxed">Ideal para produção de alto volume</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-[#3B82F6] shrink-0 mt-0.5" strokeWidth={3} />
              <span className="text-sm text-[#A1A1AA] font-medium leading-relaxed">Produção contínua de conteúdo</span>
            </li>
          </ul>
          
          <button className="w-full py-4 bg-[#232328] hover:bg-[#2A2A30] text-[#A1A1AA] hover:text-white rounded-xl text-sm font-bold transition-all shadow-sm">
            Assinar agora
          </button>
        </div>
      </div>

      <div className="mb-8 flex items-center gap-2 mt-20">
        <Zap className="w-5 h-5 text-[#3B82F6] fill-[#3B82F6]" />
        <h2 className="text-[22px] font-bold text-white tracking-tight">Comprar Créditos Avulsos</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Avulso 1 */}
        <div className="bg-[#111114] border border-[#27272A] rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:border-[#3B82F6]/30 transition-colors group">
          <span className="text-[40px] font-black text-[#3B82F6] tracking-tighter mb-1 group-hover:scale-105 transition-transform">450</span>
          <span className="text-sm text-[#A1A1AA] mb-8 font-medium">créditos</span>
          <span className="text-2xl font-bold text-white mb-8 tracking-tight">R$ 39,90</span>
          <button className="w-full py-4 bg-[#232328] hover:bg-[#2A2A30] text-[#A1A1AA] hover:text-white rounded-xl text-sm font-bold transition-all shadow-sm">
            Comprar agora
          </button>
        </div>

        {/* Avulso 2 (Highlighted) */}
        <div className="bg-[#18181B] border-2 border-[#3B82F6] rounded-2xl p-8 flex flex-col items-center justify-center text-center relative shadow-[0_0_30px_rgba(59,130,246,0.1)]">
           {/* Badge */}
           <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <span className="bg-[#3B82F6] text-white text-[9px] font-black uppercase tracking-widest py-1.5 px-4 rounded-full shadow-lg whitespace-nowrap">Mais Vendido</span>
          </div>
          <span className="text-[48px] font-black text-[#3B82F6] tracking-tighter mb-1 mt-2">900</span>
          <span className="text-sm text-[#A1A1AA] mb-8 font-medium">créditos</span>
          <span className="text-2xl font-bold text-white mb-8 tracking-tight">R$ 69,90</span>
          <button className="w-full py-4 bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-[#3B82F6]/20">
            Comprar agora
          </button>
        </div>

        {/* Avulso 3 */}
        <div className="bg-[#111114] border border-[#27272A] rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:border-[#3B82F6]/30 transition-colors group">
          <span className="text-[40px] font-black text-[#3B82F6] tracking-tighter mb-1 group-hover:scale-105 transition-transform">1.850</span>
          <span className="text-sm text-[#A1A1AA] mb-8 font-medium">créditos</span>
          <span className="text-2xl font-bold text-white mb-8 tracking-tight">R$ 119,90</span>
          <button className="w-full py-4 bg-[#232328] hover:bg-[#2A2A30] text-[#A1A1AA] hover:text-white rounded-xl text-sm font-bold transition-all shadow-sm">
            Comprar agora
          </button>
        </div>
      </div>
    </main>
  );
};

// --- CREATOR ENGINE VIEW ---
const CreatorEngineView: React.FC<{ onGoToImagem: () => void; onGoToVideo: () => void; onGoToMinhasCriacoes: () => void; onGoToCreditos: () => void; }> = ({ onGoToImagem, onGoToVideo, onGoToMinhasCriacoes, onGoToCreditos }) => {
  return (
    <main className="max-w-[1400px] mx-auto px-4 md:px-8 pt-8 md:pt-12 pb-16 flex flex-col items-center min-h-[85vh] relative overflow-hidden">

      {/* Subtle Background */}
      <div className="absolute inset-x-0 top-0 pointer-events-none z-0 flex items-start justify-center pt-20">
        <div className="w-[800px] h-[500px] bg-gradient-to-r from-[#8B5CF6]/10 to-[#d946ef]/10 blur-[150px] rounded-full"></div>
      </div>

        <div className="relative w-full max-w-5xl flex flex-col items-center z-10 pt-4 pb-12">
        {/* "VÍDEOS VIRAIS" AESTHETIC BANNER - COMPACT RECTANGULAR */}
        <div className="flex flex-col items-center justify-center mb-10 md:mb-14 relative z-10 bg-[#0B0B0E]/30 backdrop-blur-md py-10 px-6 md:py-14 md:px-16 rounded-[24px] md:rounded-[36px] border border-white/10 shadow-2xl w-full max-w-[900px]">
          
          <div className="flex flex-col items-center text-center w-full">
            {/* Indicator Badge */}
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-4">
              <div className="hidden sm:block h-[1px] w-8 md:w-16 bg-gradient-to-r from-transparent to-[#8B5CF6]"></div>
              <span className="text-[9px] md:text-[11px] font-black text-[#8B5CF6] tracking-[0.3em] md:tracking-[0.4em] uppercase">Creator Engine Active</span>
              <div className="flex gap-1 shrink-0">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-1 h-1 bg-[#8B5CF6]/40 rounded-full animate-pulse" style={{ animationDelay: `${i * 200}ms` }}></div>
                ))}
              </div>
              <div className="hidden sm:block h-[1px] w-8 md:w-16 bg-gradient-to-l from-transparent to-[#8B5CF6]"></div>
            </div>
            
            {/* Adjusted Typography - Single Line Formatted */}
            <div className="relative mb-4 flex justify-center w-full py-4">
              <h1 className="text-[26px] sm:text-4xl md:text-[46px] lg:text-[50px] font-black tracking-tighter leading-loose select-none text-center flex flex-wrap justify-center items-center">
                <span className="bg-gradient-to-b from-white to-white/20 mr-2 md:mr-3" style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', paddingBottom: '12px', paddingRight: '6px', marginBottom: '-12px', display: 'inline-block' }}>O que vamos</span>
                <span className="bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#d946ef]" style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', paddingBottom: '12px', paddingRight: '6px', marginBottom: '-12px', display: 'inline-block' }}>criar hoje?</span>
              </h1>
            </div>
            
            {/* Content paragraph */}
            <p className="text-[#8d8d99] text-sm md:text-[15px] font-medium max-w-lg leading-relaxed text-center">
              Selecione a ferramenta de geração e comece a <span className="text-white">transformar suas ideias</span>.
            </p>
          </div>
        </div>

        {/* Clean Cards Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full max-w-[1150px] mx-auto place-items-center">
          
          {/* Card Imagem */}
          <button onClick={onGoToImagem} className="flex flex-col items-center justify-center bg-[#111114] border border-[#1e1e24] p-8 md:p-10 rounded-[20px] transition-all duration-500 hover:bg-[#151518] hover:border-[#8B5CF6]/30 hover:shadow-[0_0_30px_rgba(139,92,246,0.05)] cursor-pointer w-full max-w-[360px] min-h-[260px] group focus:outline-none relative overflow-hidden">
            
            {/* Subtle Gradient Glow inside Card on Hover */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#8B5CF6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-[52px] h-[52px] rounded-[14px] bg-[#18181B] border border-[#27272A] flex items-center justify-center mb-6 group-hover:bg-[#8B5CF6]/10 group-hover:border-[#8B5CF6]/30 transition-all duration-300 shadow-sm">
                <ImageIcon className="w-5 h-5 text-[#A1A1AA] group-hover:text-[#c4b5fd] transition-colors" strokeWidth={1.5} />
              </div>
              
              <h3 className="text-[17px] font-bold text-white mb-2 tracking-tight group-hover:text-[#e0d6ff] transition-colors">
                Imagem
              </h3>
              
              <p className="text-[13px] text-[#A1A1AA] text-center leading-relaxed max-w-[260px] group-hover:text-[#A1A1AA]/80 transition-colors">
                Crie imagens realistas com IA, influencers, produtos, e cenas cinematográficas.
              </p>
            </div>
          </button>

          {/* Card Vídeo */}
          <button onClick={onGoToVideo} className="flex flex-col items-center justify-center bg-[#111114] border border-[#1e1e24] p-8 md:p-10 rounded-[20px] transition-all duration-500 hover:bg-[#151518] hover:border-[#3B82F6]/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.05)] cursor-pointer w-full max-w-[360px] min-h-[260px] group focus:outline-none relative overflow-hidden">
            
            {/* Subtle Gradient Glow inside Card on Hover */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#3B82F6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-[52px] h-[52px] rounded-[14px] bg-[#18181B] border border-[#27272A] flex items-center justify-center mb-6 group-hover:bg-[#3B82F6]/10 group-hover:border-[#3B82F6]/30 transition-all duration-300 shadow-sm">
                <Video className="w-5 h-5 text-[#A1A1AA] group-hover:text-[#93c5fd] transition-colors" strokeWidth={1.5} />
              </div>
              
              <h3 className="text-[17px] font-bold text-white mb-2 tracking-tight group-hover:text-[#bfdbfe] transition-colors">
                Vídeo
              </h3>
              
              <p className="text-[13px] text-[#A1A1AA] text-center leading-relaxed max-w-[260px] group-hover:text-[#A1A1AA]/80 transition-colors">
                Crie vídeos com IA, influencers em movimento e motion control.
              </p>
            </div>
          </button>

          {/* Card Minhas Criações */}
          <button onClick={onGoToMinhasCriacoes} className="flex flex-col items-center justify-center bg-[#111114] border border-[#1e1e24] p-8 md:p-10 rounded-[20px] transition-all duration-500 hover:bg-[#151518] hover:border-[#EC4899]/30 hover:shadow-[0_0_30px_rgba(236,72,153,0.05)] cursor-pointer w-full max-w-[360px] min-h-[260px] group focus:outline-none relative overflow-hidden">
            
            {/* Subtle Gradient Glow inside Card on Hover */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#EC4899]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-[52px] h-[52px] rounded-[14px] bg-[#18181B] border border-[#27272A] flex items-center justify-center mb-6 group-hover:bg-[#EC4899]/10 group-hover:border-[#EC4899]/30 transition-all duration-300 shadow-sm">
                <LayoutGrid className="w-5 h-5 text-[#A1A1AA] group-hover:text-[#fbcfe8] transition-colors" strokeWidth={1.5} />
              </div>
              
              <h3 className="text-[17px] font-bold text-white mb-2 tracking-tight group-hover:text-[#fce7f3] transition-colors">
                Minhas Criações
              </h3>
              
              <p className="text-[13px] text-[#A1A1AA] text-center leading-relaxed max-w-[260px] group-hover:text-[#A1A1AA]/80 transition-colors">
                Histórico de imagens e vídeos gerados.
              </p>
            </div>
          </button>

          {/* Card Créditos */}
          <button onClick={onGoToCreditos} className="lg:col-start-2 flex flex-col items-center justify-center bg-[#111114] border border-[#1e1e24] p-8 md:p-10 rounded-[20px] transition-all duration-500 hover:bg-[#151518] hover:border-[#10B981]/30 hover:shadow-[0_0_30px_rgba(16,185,129,0.05)] cursor-pointer w-full max-w-[360px] min-h-[260px] group focus:outline-none relative overflow-hidden">
            
            {/* Subtle Gradient Glow inside Card on Hover */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#10B981]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-[52px] h-[52px] rounded-[14px] bg-[#18181B] border border-[#27272A] flex items-center justify-center mb-6 group-hover:bg-[#10B981]/10 group-hover:border-[#10B981]/30 transition-all duration-300 shadow-sm">
                <Zap className="w-5 h-5 text-[#A1A1AA] group-hover:text-[#a7f3d0] transition-colors" strokeWidth={1.5} />
              </div>
              
              <h3 className="text-[17px] font-bold text-white mb-2 tracking-tight group-hover:text-[#d1fae5] transition-colors">
                Créditos
              </h3>
              
              <p className="text-[13px] text-[#A1A1AA] text-center leading-relaxed max-w-[260px] group-hover:text-[#A1A1AA]/80 transition-colors">
                Gerencie seus créditos e plano.
              </p>
            </div>
          </button>
        </div>
      </div>
    </main>
  );
};

// --- EXPLORE PAGE VIEW ---
const ExploreView: React.FC<{ products: ProductExplore[], onGoToAcademy: () => void, onGoToProducts: () => void }> = ({ products, onGoToAcademy, onGoToProducts }) => (
  <main className="max-w-[1400px] mx-auto px-6 py-8 md:py-12">
    {/* PREMIUM HERO SECTION */}
    <div className="relative mb-16 md:mb-20 flex flex-col items-center justify-center text-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] bg-gradient-to-r from-[#3B82F6]/20 to-[#8B5CF6]/20 blur-[100px] md:blur-[120px] rounded-full pointer-events-none"></div>

      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#16161A] border border-white/5 mb-6 shadow-xl relative z-10">
        <Sparkles className="w-4 h-4 text-[#3B82F6]" />
        <span className="text-[10px] md:text-xs font-black text-[#8d8d99] tracking-[0.2em] md:tracking-[0.25em] uppercase">Inteligência Estratégica</span>
      </div>

      <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-[72px] font-black text-white tracking-tighter mb-6 max-w-4xl leading-[1.1] relative z-10">
        Descubra os próximos <br className="hidden md:block" />
        <span className="bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent">Produtos Vencedores</span>
      </h1>

      <p className="text-[#a8a8b3] text-base md:text-xl font-medium max-w-2xl mb-10 md:mb-12 relative z-10">
        Analise tendências, monitore concorrentes ocultos e encontre sua próxima campanha milionária antes de todo mundo.
      </p>

      {/* SUPER SEARCH BAR */}
      <div className="relative w-full max-w-3xl group z-20">
        <div className="absolute inset-x-0 -inset-y-2 md:inset-0 bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] rounded-full blur-[20px] md:blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
        <div className="relative flex items-center bg-[#0B0B0E]/80 backdrop-blur-2xl border border-white/10 rounded-full p-2 md:p-2.5 h-16 md:h-20 shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all hover:border-white/20">
          <div className="pl-6 md:pl-8 text-[#5b5b7b]">
            <Search className="w-5 h-5 md:w-6 md:h-6" />
          </div>
          <input
            type="text"
            placeholder="Pesquise por nicho, loja ou criador..."
            className="flex-1 bg-transparent text-white placeholder:text-[#5b5b7b] text-sm md:text-lg px-4 md:px-6 focus:outline-none w-full"
          />
          <button
            onClick={onGoToProducts}
            className="bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white h-full px-6 md:px-10 rounded-full font-black text-sm md:text-base tracking-wide shadow-lg hover:scale-[1.02] transition-transform flex items-center gap-2"
          >
            Explorar
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 hidden sm:block" />
          </button>
        </div>
      </div>
    </div>

    {/* QUICK METRICS / DASHBOARD WIDGETS */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-20">
      <div className="bg-[#0B0B0E] border border-[#1e1f26] rounded-[32px] p-6 md:p-8 relative overflow-hidden group hover:border-[#3B82F6]/30 transition-all shadow-2xl">
        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
          <TrendingUp className="w-32 h-32 text-[#3B82F6]" />
        </div>
        <div className="relative z-10 flex flex-col gap-5">
          <div className="w-14 h-14 rounded-2xl bg-[#16161a] flex items-center justify-center border border-white/5 group-hover:border-[#3B82F6]/30 transition-colors shadow-inner">
            <Activity className="w-6 h-6 text-[#3B82F6]" />
          </div>
          <div>
            <span className="text-[#5b5b7b] text-[10px] md:text-xs font-black uppercase tracking-[0.2em] block mb-2">MERCADO AQUECIDO</span>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl md:text-5xl font-black text-white tracking-tighter">4.2k</span>
              <span className="text-[#00b37e] text-xs font-black flex items-center bg-[#00b37e]/10 px-2 py-1 rounded-lg border border-[#00b37e]/20">+12% hoje</span>
            </div>
            <p className="text-[#8d8d99] text-sm font-medium mt-3">Produtos detectados com pico de vendas no tracking</p>
          </div>
        </div>
      </div>

      <div className="bg-[#0B0B0E] border border-[#1e1f26] rounded-[32px] p-6 md:p-8 relative overflow-hidden group hover:border-[#8B5CF6]/30 transition-all shadow-2xl">
        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
          <Eye className="w-32 h-32 text-[#8B5CF6]" />
        </div>
        <div className="relative z-10 flex flex-col gap-5">
          <div className="w-14 h-14 rounded-2xl bg-[#16161a] flex items-center justify-center border border-white/5 group-hover:border-[#8B5CF6]/30 transition-colors shadow-inner">
            <Globe className="w-6 h-6 text-[#8B5CF6]" />
          </div>
          <div>
            <span className="text-[#5b5b7b] text-[10px] md:text-xs font-black uppercase tracking-[0.2em] block mb-2">LOJAS RASTREADAS</span>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl md:text-5xl font-black text-white tracking-tighter">128</span>
              <span className="text-[#8B5CF6] text-xs font-black flex items-center bg-[#8B5CF6]/10 px-2 py-1 rounded-lg border border-[#8B5CF6]/20">Ativas</span>
            </div>
            <p className="text-[#8d8d99] text-sm font-medium mt-3">Monitoramento estrutural 24h por dia das top lojas</p>
          </div>
        </div>
      </div>

      <div className="bg-[#0B0B0E] border border-[#1e1f26] rounded-[32px] p-6 md:p-8 relative overflow-hidden group hover:border-[#f59e0b]/30 transition-all shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-[#f59e0b]/[0.02] to-transparent group-hover:from-[#f59e0b]/[0.05] transition-colors"></div>
        <div className="relative z-10 flex flex-col h-full justify-between gap-6">
          <div className="flex items-start justify-between">
            <div className="w-14 h-14 rounded-2xl bg-[#16161a] flex items-center justify-center border border-white/5 group-hover:border-[#f59e0b]/30 transition-colors shadow-inner">
              <GraduationCap className="w-6 h-6 text-[#f59e0b]" />
            </div>
            <span className="px-3 py-1 bg-[#16161A] text-[#f59e0b] text-[9px] font-black uppercase tracking-[0.2em] rounded-lg border border-white/5 shadow-md">Academy</span>
          </div>
          <div>
            <h3 className="text-xl font-black text-white mb-2">Treinamento Exclusivo</h3>
            <p className="text-[#8d8d99] text-sm font-medium mb-4 md:mb-6">Acelere seus resultados com as estratégias e métodos dos maiores players.</p>
            <button onClick={onGoToAcademy} className="w-full py-3 md:py-3.5 bg-[#16161A] hover:bg-[#1c1c21] border border-[#1e1f26] hover:border-[#f59e0b]/40 rounded-xl text-white font-black text-[13px] uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg group/btn">
              Acessar Módulos <ChevronRight className="w-4 h-4 text-[#5b5b7b] group-hover/btn:text-white transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* FEATURES GRID */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mb-20 md:mb-24">
      <FeatureExploreCard icon={<Package className="w-6 h-6 md:w-7 md:h-7 text-[#3B82F6]" />} title="Produtos em Tendência" description="Identifique agora quais produtos estão escalando e gerando lucro real." onClick={onGoToProducts} />
      <FeatureExploreCard icon={<Wand2 className="w-6 h-6 md:w-7 md:h-7 text-[#3B82F6]" />} title="Influencer IA" description="Crie roteiros e vídeos UGC altamente persuasivos com inteligência artificial." onClick={() => { }} />
      <FeatureExploreCard icon={<Eye className="w-6 h-6 md:w-7 md:h-7 text-[#3B82F6]" />} title="Análise de Concorrentes" description="Espione estratégias, faturamento e criativos das maiores lojas do mercado." onClick={() => { }} />
      <FeatureExploreCard icon={<Video className="w-6 h-6 md:w-7 md:h-7 text-[#3B82F6]" />} title="Vídeos Virais" description="Base de dados completa com os criativos que mais converteram nas últimas 24h." onClick={() => { }} />
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
  <div onClick={onClick} className={`relative bg-[#0B0B0E] p-5 md:p-10 flex flex-col gap-4 md:gap-6 rounded-[32px] border border-[#1e1f26] overflow-hidden group cursor-pointer transition-all duration-300 ${onClick ? 'hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(59,130,246,0.1)] hover:border-[#3B82F6]/30' : ''}`}>
    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#3B82F6]/0 to-[#3B82F6]/0 group-hover:from-[#3B82F6]/[0.03] group-hover:to-transparent transition-all duration-500 pointer-events-none"></div>

    <div className="w-12 h-12 md:w-16 md:h-16 bg-[#16161a] rounded-2xl flex items-center justify-center border border-white/5 group-hover:border-[#3B82F6]/30 transition-all duration-300 shadow-inner z-10 shrink-0">
      <div className="transform group-hover:scale-110 transition-transform duration-500">
        {React.cloneElement(icon as React.ReactElement, { className: 'w-5 h-5 md:w-7 md:h-7' })}
      </div>
    </div>

    <div className="z-10 flex-1 flex flex-col justify-end">
      <h3 className="text-lg md:text-2xl font-black text-white mb-2 md:mb-3 group-hover:text-[#3B82F6] transition-colors">{title}</h3>
      <p className="text-[#8d8d99] leading-relaxed text-[13px] md:text-base font-medium">{description}</p>
    </div>
  </div>
);

// --- PRODUCTS PAGE VIEW ---
const ProductsView: React.FC<{ products: ProductViral[] }> = ({ products }) => {
  const [viewMode, setViewMode] = useState<'radar' | 'mapa'>('radar');

  // Build niche map: group products by category
  const nicheMap = products.reduce((acc, p) => {
    const cat = p.category || 'Outros';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(p);
    return acc;
  }, {} as Record<string, ProductViral[]>);

  const nicheList = (Object.entries(nicheMap) as [string, ProductViral[]][]).sort((a, b) => b[1].length - a[1].length);

  const nicheColors: Record<string, { gradient: string; accent: string; glow: string }> = {
    'Casa & Cozinha': { gradient: 'from-[#00b37e]/20 to-transparent', accent: '#00b37e', glow: '0_0_30px_rgba(0,179,126,0.15)' },
    'Beleza': { gradient: 'from-[#d946ef]/20 to-transparent', accent: '#d946ef', glow: '0_0_30px_rgba(217,70,239,0.15)' },
    'Moda Fitness': { gradient: 'from-[#3B82F6]/20 to-transparent', accent: '#3B82F6', glow: '0_0_30px_rgba(59,130,246,0.15)' },
    'Moda Masculina': { gradient: 'from-[#8B5CF6]/20 to-transparent', accent: '#8B5CF6', glow: '0_0_30px_rgba(139,92,246,0.15)' },
    'Acessórios': { gradient: 'from-[#f59e0b]/20 to-transparent', accent: '#f59e0b', glow: '0_0_30px_rgba(245,158,11,0.15)' },
    'Perfumaria': { gradient: 'from-[#ec4899]/20 to-transparent', accent: '#ec4899', glow: '0_0_30px_rgba(236,72,153,0.15)' },
    'Eletrônicos': { gradient: 'from-[#06b6d4]/20 to-transparent', accent: '#06b6d4', glow: '0_0_30px_rgba(6,182,212,0.15)' },
    'Livros': { gradient: 'from-[#84cc16]/20 to-transparent', accent: '#84cc16', glow: '0_0_30px_rgba(132,204,22,0.15)' },
    'Calçados': { gradient: 'from-[#f97316]/20 to-transparent', accent: '#f97316', glow: '0_0_30px_rgba(249,115,22,0.15)' },
    'Esportes': { gradient: 'from-[#14b8a6]/20 to-transparent', accent: '#14b8a6', glow: '0_0_30px_rgba(20,184,166,0.15)' },
    'Ferramentas': { gradient: 'from-[#ef4444]/20 to-transparent', accent: '#ef4444', glow: '0_0_30px_rgba(239,68,68,0.15)' },
    'Saúde & Beleza': { gradient: 'from-[#a855f7]/20 to-transparent', accent: '#a855f7', glow: '0_0_30px_rgba(168,85,247,0.15)' },
    'Beleza & Perfumaria': { gradient: 'from-[#e879f9]/20 to-transparent', accent: '#e879f9', glow: '0_0_30px_rgba(232,121,249,0.15)' },
  };

  const getColor = (cat: string) => nicheColors[cat] || { gradient: 'from-[#8B5CF6]/20 to-transparent', accent: '#8B5CF6', glow: '0_0_30px_rgba(139,92,246,0.15)' };

  const totalRevenue = (prods: ProductViral[]) => {
    return prods.reduce((sum, p) => {
      if (!p.revenue) return sum;
      // Format: "R$ 6.014.334,12" → remove "R$ ", remove ".", replace "," with "."
      const cleaned = p.revenue.replace('R$ ', '').replace(/\./g, '').replace(',', '.');
      const val = parseFloat(cleaned);
      return isNaN(val) ? sum : sum + val;
    }, 0);
  };

  const formatRevenue = (val: number) => {
    if (val >= 1_000_000) return `R$ ${(val / 1_000_000).toFixed(1)}M`;
    if (val >= 1_000) return `R$ ${(val / 1_000).toFixed(0)}K`;
    return `R$ ${val.toFixed(0)}`;
  };

  return (
    <main className="max-w-[1500px] mx-auto px-4 md:px-6 py-8 md:py-16 relative">

      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-10 md:mb-16 relative z-10 bg-[#0B0B0E]/20 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-[32px] md:rounded-[48px] border border-white/5 shadow-2xl">

        {/* LEFT: TYPOGRAPHY SCULPTURE & PULSE */}
        <div className="flex flex-col gap-6 flex-1 min-w-0 lg:min-w-[400px]">
          <div className="relative group">
            {/* ARCHITECTURAL STATUS LINE */}
            <div className="flex items-center gap-4 mb-4">
              <div className="h-[1px] w-8 bg-gradient-to-r from-[#00b37e] to-transparent"></div>
              <span className="text-[9px] font-black text-[#00b37e] tracking-[0.4em] uppercase">System Pulse Active</span>
              <div className="flex gap-1">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-1 h-1 bg-[#00b37e]/40 rounded-full animate-pulse" style={{ animationDelay: `${i * 200}ms` }}></div>
                ))}
              </div>
            </div>

            <div className="relative">
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] select-none text-left pl-1">
                <span className="block bg-gradient-to-b from-white to-white/20 bg-clip-text text-transparent">Produtos</span>
                <span className="block bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#d946ef] bg-clip-text text-transparent">Virais</span>
              </h1>
            </div>
          </div>

          <p className="text-[#8d8d99] text-sm md:text-base font-medium max-w-sm leading-relaxed border-l border-white/10 pl-6">
            Nossa rede neural minera <span className="text-white">trilhões de signals</span> para materializar oportunidades de escala global.
          </p>
        </div>

        {/* RIGHT: COMPACT METRICS GRID */}
        <div className="flex flex-wrap items-center justify-center lg:justify-end gap-6 flex-[1.5]">
          {/* NEW DETECTED (ORGANIC FROSTED) */}
          <div className="relative group">
            <div className="absolute inset-0 bg-[#3B82F6]/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="w-24 h-24 md:w-40 md:h-40 backdrop-blur-3xl bg-white/[0.03] border border-white/10 rounded-[28px] md:rounded-[40px] p-3 md:p-6 flex flex-col items-center justify-center shadow-2xl transition-all duration-500 group-hover:scale-105">
              <Package className="w-4 h-4 md:w-6 md:h-6 text-[#3B82F6] mb-1.5 md:mb-2 opacity-50" />
              <span className="text-2xl md:text-4xl font-black text-white tracking-tighter mb-0.5 md:mb-1">18</span>
              <span className="text-[6px] md:text-[8px] font-black text-[#5b5b7b] uppercase tracking-[0.3em]">HITS HOJE</span>
            </div>
          </div>

          {/* REVENUE ORB (DYNAMIC) */}
          <div className="relative group">
            <div className="absolute inset-x-0 -bottom-6 h-12 bg-[#00b37e]/10 blur-3xl rounded-full opacity-40"></div>
            <div className="w-30 h-30 md:w-48 md:h-48 backdrop-blur-3xl bg-[#0B0B0E]/60 border border-white/10 rounded-full p-4 md:p-8 flex flex-col items-center justify-center shadow-2xl relative overflow-hidden group-hover:border-[#00b37e]/30 transition-all group-hover:scale-105">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#00b37e]/10 to-transparent pointer-events-none"></div>
              <TrendingUp className="w-3.5 h-3.5 md:w-5 md:h-5 text-[#00b37e] mb-1 animate-bounce" />
              <div className="flex items-baseline gap-0.5">
                <span className="text-[9px] md:text-xs font-black text-[#00b37e]/40">R$</span>
                <span className="text-2xl md:text-4xl font-black text-[#00b37e] tracking-tighter tabular-nums drop-shadow-[0_0_15px_rgba(0,179,126,0.3)]">3.9M</span>
              </div>
              <span className="text-[6px] md:text-[8px] font-black text-[#5b5b7b] uppercase tracking-[0.4em] mt-0.5 md:mt-1 text-center">VOLUME REAL</span>
            </div>
          </div>

          {/* ACCURACY SPHERE (SCIFI DATA ORB) */}
          <div className="relative group">
            <div className="w-24 h-24 md:w-40 md:h-40 flex items-center justify-center p-1 md:p-2 group-hover:scale-105 transition-all">
              <div className="absolute inset-0 bg-[#8B5CF6]/10 blur-3xl rounded-full animate-pulse"></div>
              <div className="relative w-full h-full flex items-center justify-center rounded-full border border-white/5 bg-[#0B0B0E]/40 backdrop-blur-md">
                <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                  <circle cx="50%" cy="50%" r="42%" stroke="currentColor" strokeWidth="0.5" fill="transparent" className="text-white/5" />
                  <circle cx="50%" cy="50%" r="42%" stroke="currentColor" strokeWidth="6" fill="transparent" strokeDasharray="280" strokeDashoffset="10" strokeLinecap="round" className="text-[#8B5CF6] transition-all duration-1000 opacity-20" />
                  <circle cx="50%" cy="50%" r="42%" stroke="currentColor" strokeWidth="1.5" fill="transparent" strokeDasharray="280" strokeDashoffset="10" strokeLinecap="round" className="text-[#8B5CF6] shadow-[0_0_20px_#8B5CF6]" />
                </svg>
                <div className="flex flex-col items-center">
                  <span className="text-xl md:text-3xl font-black text-white tracking-tighter">98<span className="text-[8px] md:text-xs text-[#5b5b7b]">%</span></span>
                  <span className="text-[5px] md:text-[7px] font-black text-[#8B5CF6] uppercase tracking-[0.2em]">Accuracy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TOOLBAR - RE-ALIGN TO GRID */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-16 relative z-20 px-4">
        <div className="flex items-center gap-4">
          <button onClick={() => setViewMode('radar')} className={`relative px-8 py-4 rounded-[20px] font-black uppercase text-[10px] tracking-widest shadow-2xl hover:scale-105 transition-all flex items-center gap-2.5 ${viewMode === 'radar' ? 'bg-white text-black' : 'bg-[#16161A]/60 backdrop-blur-xl border border-white/5 text-[#5b5b7b] hover:text-white'}`}>
            <LayoutGrid className="w-4 h-4" />
            RADAR
          </button>
          <button onClick={() => setViewMode('mapa')} className={`px-8 py-4 rounded-[20px] font-black uppercase text-[10px] tracking-widest hover:text-white transition-all flex items-center gap-2.5 ${viewMode === 'mapa' ? 'bg-white text-black shadow-2xl' : 'bg-[#16161A]/60 backdrop-blur-xl border border-white/5 text-[#5b5b7b]'}`}>
            <Sparkles className="w-4 h-4" />
            MAPA DE NICHOS
          </button>
        </div>

        <div className="h-[1px] flex-1 bg-gradient-to-r from-white/5 via-white/10 to-transparent hidden xl:block mx-8"></div>

        <div className="flex items-center gap-10">
          <div className="flex items-center gap-6">
            {['00-06', '06-12', '12-18', '18-00'].map((time, idx) => (
              <div key={time} className="flex flex-col items-center group cursor-pointer">
                <span className={`text-[9px] font-black tracking-[0.2em] uppercase transition-all ${idx === 3 ? 'text-[#3B82F6]' : 'text-[#5b5b7b] group-hover:text-white/60'}`}>
                  {time}
                </span>
                <div className={`w-1 h-1 rounded-full mt-1.5 transition-all ${idx === 3 ? 'bg-[#3B82F6] shadow-[0_0_10px_#3B82F6]' : 'bg-white/5 group-hover:bg-white/20'}`}></div>
              </div>
            ))}
          </div>

          <div className="px-6 py-3 rounded-[24px] bg-white/[0.02] border border-white/5 backdrop-blur-md flex items-center gap-4">
            <Clock className="w-4 h-4 text-[#3B82F6] animate-pulse" />
            <div className="flex flex-col">
              <span className="text-[7px] font-black text-[#5b5b7b] tracking-wider uppercase">SYNC</span>
              <span className="text-base font-black text-white tabular-nums tracking-tighter">04:35:11</span>
            </div>
          </div>
        </div>
      </div>

      {viewMode === 'radar' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
          {products.map((p) => (
            <ViralCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {nicheList.map(([category, prods]) => {
            const color = getColor(category);
            const rev = totalRevenue(prods);
            return (
              <div
                key={category}
                className="relative bg-[#0B0B0E]/40 backdrop-blur-2xl border border-white/5 rounded-[40px] overflow-hidden p-8 flex flex-col gap-6 transition-all duration-500 hover:border-white/10 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] group"
                style={{ boxShadow: `0 0 0 0 transparent` }}
              >
                {/* BG GRADIENT */}
                <div className={`absolute inset-0 bg-gradient-to-br ${color.gradient} opacity-30 pointer-events-none rounded-[40px]`}></div>

                {/* HEADER */}
                <div className="relative z-10 flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: color.accent }}></div>
                      <span className="text-[9px] font-black uppercase tracking-[0.3em]" style={{ color: color.accent }}>Nicho Ativo</span>
                    </div>
                    <h3 className="text-2xl font-black text-white tracking-tighter leading-tight">{category}</h3>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[9px] font-black text-[#5b5b7b] uppercase tracking-widest">Volume</span>
                    <span className="text-xl font-black tabular-nums" style={{ color: color.accent }}>{formatRevenue(rev)}</span>
                  </div>
                </div>

                {/* STATS ROW */}
                <div className="relative z-10 flex items-center gap-4">
                  <div className="flex-1 bg-white/[0.03] border border-white/5 rounded-2xl px-4 py-3 flex flex-col items-center gap-1">
                    <span className="text-2xl font-black text-white">{prods.length}</span>
                    <span className="text-[8px] font-black text-[#5b5b7b] uppercase tracking-widest">Produtos</span>
                  </div>
                  <div className="flex-1 bg-white/[0.03] border border-white/5 rounded-2xl px-4 py-3 flex flex-col items-center gap-1">
                    <span className="text-2xl font-black text-white">{prods.filter(p => p.highDemand).length > 0 ? prods.filter(p => p.highDemand).length : '—'}</span>
                    <span className="text-[8px] font-black text-[#5b5b7b] uppercase tracking-widest">Hot 🔥</span>
                  </div>
                  <div className="flex-1 bg-white/[0.03] border border-white/5 rounded-2xl px-4 py-3 flex flex-col items-center gap-1">
                    <span className="text-[13px] font-black text-white">#{prods[0]?.rank ?? '—'}</span>
                    <span className="text-[8px] font-black text-[#5b5b7b] uppercase tracking-widest">Top Rank</span>
                  </div>
                </div>

                {/* MINI PRODUCT THUMBNAILS */}
                <div className="relative z-10 flex items-center gap-3">
                  {prods.slice(0, 4).map((p, i) => (
                    <div key={p.id} className="relative group/thumb">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-14 h-14 rounded-2xl object-cover border border-white/10 group-hover/thumb:border-white/30 transition-all"
                      />
                      <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-[8px] font-black flex items-center justify-center border border-black" style={{ backgroundColor: color.accent, color: '#000' }}>
                        #{p.rank}
                      </div>
                    </div>
                  ))}
                  {prods.length > 4 && (
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <span className="text-xs font-black text-[#5b5b7b]">+{prods.length - 4}</span>
                    </div>
                  )}
                </div>

                {/* HEAT BAR */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[8px] font-black text-[#5b5b7b] uppercase tracking-widest">Potencial do Nicho</span>
                    <span className="text-[8px] font-black uppercase tracking-widest" style={{ color: color.accent }}>{Math.min(99, Math.round((prods.length / products.length) * 100 * 5 + 40))}%</span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{ width: `${Math.min(99, Math.round((prods.length / products.length) * 100 * 5 + 40))}%`, backgroundColor: color.accent }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
};

const ViralCard: React.FC<{ product: ProductViral }> = ({ product }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="bg-[#14151a] border border-[#1e1f26] rounded-[32px] md:rounded-[48px] overflow-hidden group hover:border-[#3B82F6]/40 transition-all flex flex-col h-full shadow-2xl relative">
      {/* PRODUCT IMAGE SECTION */}
      <div className="p-2 md:p-5 pb-2">
        <div
          className="relative aspect-square overflow-hidden rounded-[20px] md:rounded-[36px] bg-[#0c0c0e] border border-white/5 cursor-pointer"
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
              <div className="absolute top-2.5 left-2.5 md:top-4 md:left-4 flex items-center gap-1.5 px-2.5 py-0.5 md:px-4 md:py-1.5 bg-[#3B82F6] rounded-full text-[8px] md:text-[10px] font-black text-white shadow-xl theme-glow-blue">
                <Flame className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 fill-white" /> Top #{product.rank}
              </div>

              {/* SMALL PRICE BADGE - DARK GREY PILL */}
              <div className="absolute top-2.5 right-2.5 md:top-4 md:right-4 px-2.5 py-0.5 md:px-4 md:py-1.5 bg-[#14151a]/90 backdrop-blur-xl border border-white/5 rounded-full text-[8px] md:text-[10px] font-black text-white flex items-center gap-1.5 shadow-lg">
                <span className="text-[#00b37e] font-black">$</span> {product.priceRange}
              </div>

              {product.videoUrl && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#0b0c10]/20 group-hover:bg-[#0b0c10]/40 transition-colors">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-[#3B82F6] rounded-full flex items-center justify-center shadow-2xl shadow-[#3B82F6]/50 transform group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 md:w-8 md:h-8 text-white fill-current translate-x-1" />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className="px-4 md:px-10 pb-6 md:pb-10 flex-1 flex flex-col">
        <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3 leading-tight tracking-tight group-hover:text-[#3B82F6] transition-colors">{product.title}</h3>

        <div className="mb-4 md:mb-6 flex items-center gap-2">
          <span className="inline-block bg-[#14151a] text-[#8d8d99] px-2.5 py-1 md:px-3 md:py-1.5 rounded-lg text-[8px] md:text-[9px] font-medium uppercase tracking-wider border border-[#1e1f26]">
            {product.category}
          </span>
          {product.highDemand && (
            <span className="inline-block bg-[#ff8c00]/10 text-[#ff8c00] px-3 py-1.5 rounded-lg text-[9px] font-medium uppercase tracking-wider border border-[#ff8c00]/20 flex items-center gap-1">
              <Flame className="w-3 h-3 fill-current" /> Alta Demanda
            </span>
          )}
        </div>

        <div className="flex items-end justify-between mt-auto mb-6 md:mb-8 pt-2 md:pt-4 gap-4">
          <div className="flex flex-col">
            <span className="text-[8px] md:text-[9px] font-medium text-[#8d8d99] uppercase tracking-wider block mb-1 md:mb-2">RECEITA EST.</span>
            <div className="flex items-baseline gap-0.5">
              <span className="text-[#3B82F6]/70 font-medium text-[11px] md:text-sm leading-none">R$</span>
              <span className="text-lg md:text-xl font-semibold text-[#3B82F6] tracking-tight leading-none">{product.revenue.replace('R$ ', '')}</span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[8px] md:text-[9px] font-medium text-[#8d8d99] uppercase tracking-wider block mb-1 md:mb-2">vendidos</span>
            <span className="text-lg md:text-xl font-semibold text-white tracking-tight leading-none">{product.sales}</span>
          </div>
        </div>

        <button
          onClick={() => product.productUrl && window.open(product.productUrl, '_blank')}
          className="w-full bg-[#3B82F6] hover:bg-[#4338ca] text-white py-3 md:py-5 rounded-[20px] md:rounded-[28px] font-black text-sm md:text-[17px] uppercase tracking-[0.02em] flex items-center justify-center gap-2.5 transition-all shadow-[0_15px_40px_rgba(81,66,245,0.3)] hover:scale-[1.02] active:scale-[0.98]"
        >
          <ExternalLink className="w-4 h-4 md:w-5.5 md:h-5.5 stroke-[3px]" /> Ver Produto
        </button>
      </div>
    </div>
  );
};



const VideosView: React.FC = () => {
  const [videoFilter, setVideoFilter] = React.useState<'all' | 'revenue' | 'sales' | 'favorites'>('all');
  const [favorites, setFavorites] = React.useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('vp_fav_videos') || '[]'); } catch { return []; }
  });
  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const next = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id];
      localStorage.setItem('vp_fav_videos', JSON.stringify(next));
      return next;
    });
  };
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

  const allVideoData: VideoViral[] = Array.from({ length: 40 }, (_, i) => ({
    ...baseVideos[i % baseVideos.length],
    id: `v${i + 1}`,
    rank: i + 1
  }));

  const parseRevenue = (rev: string) => {
    if (!rev) return 0;
    const cleaned = rev.replace('R$ ', '').replace(/\./g, '').replace(',', '.');
    return parseFloat(cleaned) || 0;
  };
  const parseSales = (sales: string) => {
    if (!sales) return 0;
    const match = sales.match(/[\d]+/);
    return match ? parseInt(match[0]) : 0;
  };

  const videoData = (() => {
    let data = [...allVideoData];
    if (videoFilter === 'revenue') {
      data = [...data].sort((a, b) => parseRevenue(b.revenue6h) - parseRevenue(a.revenue6h));
    } else if (videoFilter === 'sales') {
      data = [...data].sort((a, b) => parseSales(b.sales6h) - parseSales(a.sales6h));
    } else if (videoFilter === 'favorites') {
      data = data.filter(v => favorites.includes(v.id));
    }
    return data;
  })();

  return (
    <main className="max-w-[1500px] mx-auto px-4 md:px-6 py-8 md:py-16 relative">

      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-10 md:mb-16 relative z-10 bg-[#0B0B0E]/20 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-[32px] md:rounded-[48px] border border-white/5 shadow-2xl">
        <div className="flex flex-col gap-6 flex-1 min-w-0 lg:min-w-[400px]">
          <div className="relative group">
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4">
              <div className="hidden sm:block h-[1px] w-8 bg-gradient-to-r from-[#00b37e] to-transparent"></div>
              <span className="text-[9px] font-black text-[#00b37e] tracking-[0.4em] uppercase">Visual Sync Active</span>
              <div className="flex gap-1 shrink-0">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-1 h-1 bg-[#00b37e]/40 rounded-full animate-pulse" style={{ animationDelay: `${i * 200}ms` }}></div>
                ))}
              </div>
            </div>
            <div className="relative">
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] select-none text-left pl-1">
                <span className="block bg-gradient-to-b from-white to-white/20 bg-clip-text text-transparent">Vídeos</span>
                <span className="block bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#d946ef] bg-clip-text text-transparent">Virais</span>
              </h1>
            </div>
          </div>
          <p className="text-[#8d8d99] text-sm md:text-base font-medium max-w-sm leading-relaxed border-l border-white/10 pl-6">
            Análise cinemática de <span className="text-white">engagement patterns</span> para identificar os criativos que dominam o feed global.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center lg:justify-end gap-6 flex-[1.5]">
          {/* HIT COUNT (ORGANIC FROSTED) */}
          <div className="relative group">
            <div className="absolute inset-0 bg-[#3B82F6]/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="w-24 h-24 md:w-40 md:h-40 backdrop-blur-3xl bg-white/[0.03] border border-white/10 rounded-[28px] md:rounded-[40px] p-3 md:p-6 flex flex-col items-center justify-center shadow-2xl transition-all duration-500 group-hover:scale-105">
              <Zap className="w-4 h-4 md:w-6 md:h-6 text-[#3B82F6] mb-1.5 md:mb-2 opacity-50 animate-bounce" />
              <span className="text-2xl md:text-4xl font-black text-white tracking-tighter mb-0.5 md:mb-1">40</span>
              <span className="text-[6px] md:text-[8px] font-black text-[#5b5b7b] uppercase tracking-[0.3em]">HITS HOJE</span>
            </div>
          </div>

          {/* REVENUE ORB (DYNAMIC) */}
          <div className="relative group">
            <div className="absolute inset-x-0 -bottom-6 h-12 bg-[#00b37e]/10 blur-3xl rounded-full opacity-40"></div>
            <div className="w-30 h-30 md:w-48 md:h-48 backdrop-blur-3xl bg-[#0B0B0E]/60 border border-white/10 rounded-full p-4 md:p-8 flex flex-col items-center justify-center shadow-2xl relative overflow-hidden group-hover:border-[#00b37e]/30 transition-all group-hover:scale-105">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#00b37e]/10 to-transparent pointer-events-none"></div>
              <Activity className="w-3.5 h-3.5 md:w-5 md:h-5 text-[#00b37e] mb-1 animate-bounce" />
              <div className="flex items-baseline gap-0.5">
                <span className="text-[9px] md:text-xs font-black text-[#00b37e]/40">R$</span>
                <span className="text-2xl md:text-4xl font-black text-[#00b37e] tracking-tighter tabular-nums drop-shadow-[0_0_15px_rgba(0,179,126,0.3)]">1.2M</span>
              </div>
              <span className="text-[6px] md:text-[8px] font-black text-[#5b5b7b] uppercase tracking-[0.4em] mt-0.5 md:mt-1 text-center">VOLUME REAL</span>
            </div>
          </div>

          {/* ENGAGEMENT SPHERE (SCIFI DATA ORB) */}
          <div className="relative group">
            <div className="w-24 h-24 md:w-40 md:h-40 flex items-center justify-center p-1 md:p-2 group-hover:scale-105 transition-all">
              <div className="absolute inset-0 bg-[#8B5CF6]/10 blur-3xl rounded-full animate-pulse"></div>
              <div className="relative w-full h-full flex items-center justify-center rounded-full border border-white/5 bg-[#0B0B0E]/40 backdrop-blur-md">
                <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                  <circle cx="50%" cy="50%" r="42%" stroke="currentColor" strokeWidth="0.5" fill="transparent" className="text-white/5" />
                  <circle cx="50%" cy="50%" r="42%" stroke="currentColor" strokeWidth="6" fill="transparent" strokeDasharray="280" strokeDashoffset="10" strokeLinecap="round" className="text-[#8B5CF6] transition-all duration-1000 opacity-20" />
                  <circle cx="50%" cy="50%" r="42%" stroke="currentColor" strokeWidth="1.5" fill="transparent" strokeDasharray="280" strokeDashoffset="10" strokeLinecap="round" className="text-[#8B5CF6] shadow-[0_0_20px_#8B5CF6]" />
                </svg>
                <div className="flex flex-col items-center">
                  <span className="text-xl md:text-3xl font-black text-white tracking-tighter">99<span className="text-[8px] md:text-xs text-[#5b5b7b]">%</span></span>
                  <span className="text-[5px] md:text-[7px] font-black text-[#8B5CF6] uppercase tracking-[0.2em]">Engagement</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-16 relative z-20 px-4">
        <div className="flex flex-col gap-2">
          <span className="text-[9px] font-black text-[#5b5b7b] tracking-[0.4em] uppercase mb-1">System Frequency Timeline</span>
          <div className="flex items-center gap-10 h-8 border-b border-white/5 pb-2">
            {['00-06', '06-12', '12-18', '18-00'].map((time, idx) => (
              <div key={time} className="flex flex-col items-center group cursor-pointer relative h-full justify-end">
                <span className={`text-[10px] font-black tracking-widest uppercase transition-all mb-2 ${idx === 3 ? 'text-[#00b37e]' : 'text-[#5b5b7b] group-hover:text-white/60'}`}>
                  {time}
                </span>
                <div className={`w-[2px] h-2 transition-all ${idx === 3 ? 'bg-[#00b37e] shadow-[0_0_10px_#00b37e]' : 'bg-white/10 group-hover:bg-white/30'}`}></div>
                {idx === 3 && <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-px bg-[#00b37e] blur-[2px]"></div>}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="px-10 py-4 rounded-[28px] bg-white/[0.02] border border-white/5 backdrop-blur-md flex items-center gap-5 group hover:border-[#00b37e]/20 transition-all">
            <div className="relative">
              <div className="absolute inset-0 bg-[#00b37e]/20 blur-lg rounded-full animate-ping"></div>
              <Clock className="w-5 h-5 text-[#00b37e] relative z-10" />
            </div>
            <div className="flex flex-col">
              <span className="text-[8px] font-black text-[#5b5b7b] tracking-widest uppercase">NEXT UPDATE</span>
              <span className="text-2xl font-black text-white tabular-nums tracking-tighter">04:29:38</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-12 px-2 flex-wrap">
        <button onClick={() => setVideoFilter('all')} className={`px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-[0.15em] flex items-center gap-2 hover:scale-[1.03] transition-all ${videoFilter === 'all' ? 'bg-[#8B5CF6] text-white shadow-lg shadow-[#8B5CF6]/20' : 'bg-[#14151a] border border-[#1e1f26] text-[#8d8d99] hover:border-[#44444f] hover:text-white'}`}>
          <LayoutGrid className="w-4 h-4" /> Todos os Vídeos
        </button>
        <button onClick={() => setVideoFilter('revenue')} className={`px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-[0.15em] flex items-center gap-2 hover:scale-[1.03] transition-all ${videoFilter === 'revenue' ? 'bg-[#00b37e] text-white shadow-lg shadow-[#00b37e]/20' : 'bg-[#14151a] border border-[#1e1f26] text-[#8d8d99] hover:border-[#44444f] hover:text-white'}`}>
          <DollarSign className="w-4 h-4" /> Mais Faturados
        </button>
        <button onClick={() => setVideoFilter('sales')} className={`px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-[0.15em] flex items-center gap-2 hover:scale-[1.03] transition-all ${videoFilter === 'sales' ? 'bg-[#8B5CF6] text-white shadow-lg shadow-[#8B5CF6]/20' : 'bg-[#14151a] border border-[#1e1f26] text-[#8d8d99] hover:border-[#44444f] hover:text-white'}`}>
          <ShoppingBag className="w-4 h-4" /> Mais Vendidos
        </button>
        <button onClick={() => setVideoFilter('favorites')} className={`px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-[0.15em] flex items-center gap-2 hover:scale-[1.03] transition-all ${videoFilter === 'favorites' ? 'bg-[#f59e0b] text-white shadow-lg shadow-[#f59e0b]/20' : 'bg-[#14151a] border border-[#1e1f26] text-[#8d8d99] hover:border-[#44444f] hover:text-white'}`}>
          <Bookmark className="w-4 h-4" /> Favoritos {favorites.length > 0 && <span className="ml-1 bg-white/20 text-[9px] px-1.5 py-0.5 rounded-full">{favorites.length}</span>}
        </button>
      </div>

      {videoFilter === 'favorites' && videoData.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <Bookmark className="w-12 h-12 text-[#5b5b7b]" />
          <p className="text-[#5b5b7b] font-black uppercase tracking-widest text-sm">Nenhum vídeo favoritado ainda</p>
          <button onClick={() => setVideoFilter('all')} className="text-[#8B5CF6] text-sm font-black hover:underline">Ver todos os vídeos</button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
        {videoData.map((video) => (
          <VideoCard key={video.id} video={video} isFavorite={favorites.includes(video.id)} onToggleFavorite={toggleFavorite} />
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
              <div className="w-8 h-8 rounded-full bg-[#1F2028] flex items-center justify-center text-[#8B5CF6] font-black text-sm shrink-0 mt-0.5">1</div>
              <p className="text-[#8d8d99] text-[15px] font-medium leading-relaxed">Clique no botão abaixo para copiar o link do vídeo.</p>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[#1F2028] flex items-center justify-center text-[#8B5CF6] font-black text-sm shrink-0 mt-0.5">2</div>
              <p className="text-[#8d8d99] text-[15px] font-medium leading-relaxed">O site Transcript24 abrirá em uma nova aba.</p>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[#1F2028] flex items-center justify-center text-[#8B5CF6] font-black text-sm shrink-0 mt-0.5">3</div>
              <p className="text-[#8d8d99] text-[15px] font-medium leading-relaxed">Cole o link no site para gerar o script completo.</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <button
              onClick={handleCopyAndOpen}
              className="w-full bg-[#8B5CF6] hover:bg-[#7c3aed] text-white py-5 rounded-2xl flex items-center justify-center gap-3 transition-all font-black text-[15px] shadow-lg shadow-[#8B5CF6]/20"
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



const VideoCard: React.FC<{ video: VideoViral; isFavorite?: boolean; onToggleFavorite?: (id: string) => void }> = ({ video, isFavorite = false, onToggleFavorite }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const renderVideo = () => {
    const videoSrc = video.thumbnail
      ? video.thumbnail
        .replace('i.imgur.com/', 'i.imgur.com/')
        .replace(/\.(jpg|jpeg|png|gif|webp)(\?.*)?$/, '.mp4')
      : null;

    if (videoSrc) {
      return (
        <video
          ref={videoRef}
          src={videoSrc}
          className="absolute inset-0 w-full h-full object-cover"
          playsInline
          autoPlay
          loop
          muted={false}
          onClick={(e) => {
            e.stopPropagation();
            togglePlay();
          }}
        />
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col group h-full">
      <div
        className="relative aspect-[9/12] md:aspect-[9/16] bg-[#14151a] border border-[#1e1f26] rounded-2xl md:rounded-[48px] overflow-hidden cursor-pointer shadow-2xl hover:border-[#8B5CF6]/30 transition-all"
        onClick={togglePlay}
      >
        {isPlaying ? (
          renderVideo()
        ) : (
          <>
            <img src={video.thumbnail} alt="" className="w-full h-full object-cover scale-[1.2] group-hover:scale-[1.25] transition-transform duration-1000 opacity-90 group-hover:opacity-100" />

            <div className="absolute top-2.5 left-2.5 md:top-8 md:left-8 w-7 h-7 md:w-12 md:h-12 bg-[#000000]/70 backdrop-blur-2xl rounded-lg md:rounded-2xl flex items-center justify-center text-[10px] md:text-lg font-black text-white/90 border border-white/10 shadow-2xl z-10">#{video.rank}</div>


            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="w-12 h-12 md:w-24 md:h-24 bg-[#0b0c10]/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform shadow-2xl">
                <div className="w-10 h-10 md:w-16 md:h-16 bg-[#8B5CF6] rounded-full flex items-center justify-center shadow-2xl shadow-[#8B5CF6]/50">
                  <Play className="w-4 h-4 md:w-8 md:h-8 text-white fill-current translate-x-1" />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="mt-2 md:mt-8 bg-[#0b0c10] border border-[#1c1c1f] rounded-2xl md:rounded-[40px] p-3.5 md:p-8 flex flex-col gap-2.5 md:gap-6 shadow-2xl">
        <div className="flex flex-col gap-3.5 md:gap-5 px-1">
          {/* Linha Superior (Informações Primárias) */}
          <div className="flex items-center justify-between w-full">
            <span className="text-[10px] md:text-[11px] font-medium text-[#5b5b7b] uppercase tracking-wider whitespace-nowrap">Últimas 6 horas</span>
            <span className="text-[14px] md:text-[15px] font-bold text-white tracking-tight whitespace-nowrap">{video.revenue6h}</span>
          </div>

          {/* Linha Inferior (Métrica Secundária) */}
          <div className="flex justify-center">
            <div className="bg-[#101915] border border-[#1b3d2b] px-2 py-0.5 md:px-3.5 md:py-1.5 rounded-xl flex items-center gap-2 shadow-[0_0_20px_rgba(0,179,126,0.05)]">
              <span className="text-[11px] md:text-[13px] font-black text-[#00b37e] leading-none">{video.sales6h.split(' ')[0]}</span>
              <span className="text-[8px] md:text-[9px] font-black text-[#00b37e] leading-none uppercase tracking-wider">vendas</span>
            </div>
          </div>
        </div>

        <div className="h-px bg-[#1c1c1f] w-full"></div>

        <div className="flex items-center gap-3 md:gap-5">
          <div className="w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl overflow-hidden border border-[#1c1c1f] shadow-2xl shrink-0">
            <img src={video.productImage} className="w-full h-full object-cover scale-[1.5]" alt="" />
          </div>
          <span className="text-[15px] md:text-lg font-black text-white line-clamp-1 flex-1 tracking-tight">{video.productTitle}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#1c1c1f] hover:bg-[#24242a] text-white py-2.5 md:py-4 rounded-xl md:rounded-2xl flex items-center justify-center gap-2 transition-all group/btn"
          >
            <FileText className="w-4 h-4 md:w-5 h-5 text-[#8d8d99] group-hover/btn:text-white transition-colors" />
            <span className="text-xs md:text-[13px] font-black">Script</span>
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
            className="bg-[#1c1c1f] hover:bg-[#24242a] text-white py-2.5 md:py-4 rounded-xl md:rounded-2xl flex items-center justify-center gap-2 transition-all group/btn"
          >
            <Link className={`w-4 h-4 md:w-5 h-5 ${copied ? 'text-green-500' : 'text-[#3b82f6]'} group-hover/btn:text-white transition-colors`} />
            <span className="text-xs md:text-[13px] font-black">{copied ? 'Copiado!' : 'Link'}</span>
          </button>
          <button
            onClick={() => {
              if (video.profileUrl) {
                window.open(video.profileUrl, '_blank');
              }
            }}
            className="bg-[#1c1c1f] hover:bg-[#24242a] text-white py-2.5 md:py-4 rounded-xl md:rounded-2xl flex items-center justify-center gap-2 transition-all group/btn"
          >
            <User className="w-4 h-4 md:w-5 h-5 text-[#3B82F6] group-hover/btn:text-white transition-colors" />
            <span className="text-xs md:text-[13px] font-black">Perfil</span>
          </button>
        </div>

        <button
          onClick={() => onToggleFavorite && onToggleFavorite(video.id)}
          className={`w-full py-3.5 md:py-5 rounded-2xl flex items-center justify-center gap-3 transition-all font-black text-[15px] ${isFavorite ? 'bg-[#f59e0b] text-white shadow-lg shadow-[#f59e0b]/20' : 'bg-[#1c1c1f] hover:bg-[#24242a] text-[#8d8d99] hover:text-white'}`}
        >
          <Bookmark className={`w-5 h-5 transition-all ${isFavorite ? 'fill-current text-white' : 'group-hover/fav:fill-white'}`} />
          {isFavorite ? 'Favoritado ✓' : 'Favoritar Vídeo'}
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
    <main className="max-w-[1500px] mx-auto px-4 md:px-6 py-8 md:py-16 relative">

      {/* RADICAL ASYMMETRIC HEADER - REFINED SPACING */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-10 md:mb-16 relative z-10 bg-[#0B0B0E]/20 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-[32px] md:rounded-[48px] border border-white/5 shadow-2xl">

        {/* LEFT: TYPOGRAPHY SCULPTURE & PULSE */}
        <div className="flex flex-col gap-6 flex-1 min-w-0 lg:min-w-[400px]">
          <div className="relative group">
            {/* ARCHITECTURAL STATUS LINE */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4">
              <div className="hidden sm:block h-[1px] w-8 bg-gradient-to-r from-[#00b37e] to-transparent"></div>
              <span className="text-[9px] font-black text-[#00b37e] tracking-[0.4em] uppercase">Creator Hub Active</span>
              <div className="flex gap-1 shrink-0">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-1 h-1 bg-[#00b37e]/40 rounded-full animate-pulse" style={{ animationDelay: `${i * 200}ms` }}></div>
                ))}
              </div>
            </div>

            <div className="relative">
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] select-none text-left pl-1">
                <span className="block bg-gradient-to-b from-white to-white/20 bg-clip-text text-transparent">Criadores</span>
                <span className="block bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#d946ef] bg-clip-text text-transparent">Virais</span>
              </h1>
            </div>
          </div>

          <p className="text-[#8d8d99] text-sm md:text-base font-medium max-w-sm leading-relaxed border-l border-white/10 pl-6">
            O ranking das mentes brilhantes que estão gerando <span className="text-white">faturamentos astronômicos</span> no feed digital.
          </p>
        </div>

        {/* RIGHT: COMPACT METRICS GRID */}
        <div className="flex flex-wrap items-center justify-center lg:justify-end gap-6 flex-[1.5]">
          {/* MONITORADOS (ORGANIC FROSTED) */}
          <div className="relative group">
            <div className="absolute inset-0 bg-[#3B82F6]/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="w-24 h-24 md:w-40 md:h-40 backdrop-blur-3xl bg-white/[0.03] border border-white/10 rounded-[28px] md:rounded-[40px] p-3 md:p-6 flex flex-col items-center justify-center shadow-2xl transition-all duration-500 group-hover:scale-105">
              <Users className="w-4 h-4 md:w-6 md:h-6 text-[#3B82F6] mb-1.5 md:mb-2 opacity-50 animate-bounce" />
              <span className="text-2xl md:text-4xl font-black text-white tracking-tighter mb-0.5 md:mb-1">8</span>
              <span className="text-[6px] md:text-[8px] font-black text-[#5b5b7b] uppercase tracking-[0.3em]">INSIGHTS HOJE</span>
            </div>
          </div>

          {/* REVENUE ORB (DYNAMIC) */}
          <div className="relative group">
            <div className="absolute inset-x-0 -bottom-6 h-12 bg-[#00b37e]/10 blur-3xl rounded-full opacity-40"></div>
            <div className="w-30 h-30 md:w-48 md:h-48 backdrop-blur-3xl bg-[#0B0B0E]/60 border border-white/10 rounded-full p-4 md:p-8 flex flex-col items-center justify-center shadow-2xl relative overflow-hidden group-hover:border-[#00b37e]/30 transition-all group-hover:scale-105">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#00b37e]/10 to-transparent pointer-events-none"></div>
              <TrendingUp className="w-3.5 h-3.5 md:w-5 md:h-5 text-[#00b37e] mb-1 animate-bounce" />
              <div className="flex items-baseline gap-1.5">
                <span className="text-[9px] md:text-xs font-black text-[#00b37e]/40">R$</span>
                <span className="text-2xl md:text-4xl font-black text-[#00b37e] tracking-tighter tabular-nums drop-shadow-[0_0_15px_rgba(0,179,126,0.3)]">512k</span>
              </div>
              <span className="text-[6px] md:text-[8px] font-black text-[#5b5b7b] uppercase tracking-[0.4em] mt-0.5 md:mt-1 text-center">VOLUME REAL</span>
            </div>
          </div>

          {/* DOMINANCE SPHERE (SCIFI DATA ORB) */}
          <div className="relative group">
            <div className="w-24 h-24 md:w-40 md:h-40 flex items-center justify-center p-1 md:p-2 group-hover:scale-105 transition-all">
              <div className="absolute inset-0 bg-[#8B5CF6]/10 blur-3xl rounded-full animate-pulse"></div>
              <div className="relative w-full h-full flex items-center justify-center rounded-full border border-white/5 bg-[#0B0B0E]/40 backdrop-blur-md">
                <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                  <circle cx="50%" cy="50%" r="42%" stroke="currentColor" strokeWidth="0.5" fill="transparent" className="text-white/5" />
                  <circle cx="50%" cy="50%" r="42%" stroke="currentColor" strokeWidth="6" fill="transparent" strokeDasharray="280" strokeDashoffset="10" strokeLinecap="round" className="text-[#8B5CF6] transition-all duration-1000 opacity-20" />
                  <circle cx="50%" cy="50%" r="42%" stroke="currentColor" strokeWidth="1.5" fill="transparent" strokeDasharray="280" strokeDashoffset="10" strokeLinecap="round" className="text-[#8B5CF6] shadow-[0_0_20px_#8B5CF6]" />
                </svg>
                <div className="flex flex-col items-center">
                  <Crown className="w-4 h-4 md:w-5 md:h-5 text-[#8B5CF6] mb-1 opacity-50 animate-pulse" />
                  <span className="text-xl md:text-3xl font-black text-white tracking-tighter">98<span className="text-[8px] md:text-xs text-[#5b5b7b]">%</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TIMELINE - RE-ALIGN TO GRID */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-16 relative z-20 px-4">
        <div className="flex flex-col gap-2">
          <span className="text-[9px] font-black text-[#5b5b7b] tracking-[0.4em] uppercase mb-1">System Frequency Timeline</span>
          <div className="flex items-center gap-10 h-8 border-b border-white/5 pb-2">
            {['00-06', '06-12', '12-18', '18-00'].map((time, idx) => (
              <div key={time} className="flex flex-col items-center group cursor-pointer relative h-full justify-end">
                <span className={`text-[10px] font-black tracking-widest uppercase transition-all mb-2 ${idx === 2 ? 'text-[#3B82F6]' : 'text-[#5b5b7b] group-hover:text-white/60'}`}>
                  {time}
                </span>
                <div className={`w-[2px] h-2 transition-all ${idx === 2 ? 'bg-[#3B82F6] shadow-[0_0_10px_#3B82F6]' : 'bg-white/10 group-hover:bg-white/30'}`}></div>
                {idx === 2 && <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-px bg-[#3B82F6] blur-[2px]"></div>}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="px-10 py-4 rounded-[28px] bg-white/[0.02] border border-white/5 backdrop-blur-md flex items-center gap-5 group hover:border-[#3B82F6]/20 transition-all shadow-2xl">
            <div className="relative">
              <div className="absolute inset-0 bg-[#3B82F6]/20 blur-lg rounded-full animate-ping"></div>
              <Clock className="w-5 h-5 text-[#3B82F6] relative z-10" />
            </div>
            <div className="flex flex-col">
              <span className="text-[7px] font-black text-[#5b5b7b] tracking-[0.3em] uppercase">Status de Sync</span>
              <span className="text-xl font-black text-white tabular-nums tracking-tighter">Online</span>
            </div>
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
    className="relative group cursor-pointer mb-2"
  >
    {/* ARCHITECTURAL SELECTION CLIPS (HOVER ONLY) - ULTRA-COMPACT */}
    <div className="absolute -inset-0.25 bg-gradient-to-r from-[#3B82F6]/20 via-transparent to-[#8B5CF6]/20 rounded-xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500"></div>

    {/* MAIN ARCHITECTURAL CONTAINER - ENHANCED SCALE & PROFESSIONAL */}
    <div className="relative bg-[#0B0B0E]/80 backdrop-blur-3xl border border-white/5 rounded-xl px-4 py-4 md:px-6 md:py-5 flex items-center justify-between overflow-hidden shadow-2xl transition-all duration-500 group-hover:translate-x-1 group-hover:border-white/10 group-hover:bg-[#0B0B0E]/90">

      {/* DATA-VIZ BACKGROUND PATTERN - HIGH DENSITY GRID */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-dense" width="16" height="16" patternUnits="userSpaceOnUse">
              <path d="M 16 0 L 0 0 0 16" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-dense)" />
        </svg>
      </div>

      {/* SCANLINE SWEEP EFFECT */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:animate-[scanline_2s_ease-in-out_infinite] pointer-events-none"></div>

      <div className="flex items-center gap-4 md:gap-10 flex-1 relative z-10 min-w-0">

        {/* RANKING SEGMENT (TECHNICAL POD) - ULTRA SCALE */}
        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          <div className="relative group/rank">
            {creator.rank === 1 ? (
              <div className="relative">
                <div className="absolute inset-0 bg-[#f59e0b]/20 blur-xl rounded-full animate-pulse"></div>
                <div className="w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br from-[#f59e0b] to-[#d97706] rounded-lg flex items-center justify-center border border-white/20 shadow-[0_0_15px_rgba(245,158,11,0.3)] transform rotate-1 group-hover:rotate-3 transition-transform duration-500">
                  <Crown className="w-6 h-6 md:w-9 md:h-9 text-white fill-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" />
                </div>
              </div>
            ) : (
              <div className="w-10 h-10 md:w-12 md:h-12 bg-white/[0.02] border border-white/5 rounded-lg flex items-center justify-center relative overflow-hidden group-hover:border-white/20 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="text-xs md:text-sm font-black text-[#5b5b7b] group-hover:text-white transition-colors tabular-nums tracking-tighter">#{creator.rank}</span>
              </div>
            )}
          </div>

          {/* AVATAR POD (FLOATING IDENTITY) - ULTRA SCALE */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-br from-[#3B82F6]/20 to-transparent rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative w-12 h-12 md:w-16 md:h-16 p-0.5 rounded-full bg-gradient-to-br from-white/10 to-transparent border border-white/5 group-hover:border-white/20 transition-all duration-500">
              <div className="w-full h-full rounded-full overflow-hidden border border-[#1c1c1f] shadow-2xl relative">
                <img src={creator.avatar} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 group-hover:ring-white/30 transition-all"></div>
              </div>
              {creator.rank === 1 && (
                <div className="absolute -bottom-0.5 -right-0.5 bg-[#f59e0b] text-[4px] md:text-[5px] font-black text-white px-1 py-0.5 rounded-full border border-[#0B0B0E] shadow-xl tracking-tighter z-20 whitespace-nowrap uppercase">TOP ALPHA</div>
              )}
            </div>
          </div>
        </div>

        {/* CREATOR INTEL (TYPOGRAPHY) - ULTRA DENSE PROFILE */}
        <div className="flex flex-col gap-0.5 min-w-0 flex-1">
          <div className="flex items-center gap-1.5 md:gap-2">
            <h3 className="text-lg md:text-xl font-black text-white group-hover:text-[#3B82F6] transition-colors leading-none tracking-tighter truncate">
              {creator.username}
            </h3>
            <div className="px-1 md:px-1.5 py-0 bg-white/[0.03] border border-white/10 rounded flex items-center gap-1 shrink-0">
              <div className="w-1 h-1 bg-[#3B82F6] rounded-full animate-pulse"></div>
              <span className="text-[6px] md:text-[6.5px] font-black text-[#8d8d99] uppercase tracking-[0.2em]">{creator.category}</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 md:gap-2">
            <div className="flex items-center gap-1 px-1 md:px-1.5 py-0 rounded bg-[#00b37e]/5 border border-[#00b37e]/10 truncate">
              <div className="w-0.5 h-0.5 bg-[#00b37e] rounded-full"></div>
              <span className="text-[7.5px] md:text-[8px] font-black text-[#00b37e] uppercase tracking-[0.15em] opacity-80 truncate">{creator.shopName}</span>
            </div>
            <span className="w-0.5 h-0.5 bg-white/10 rounded-full shrink-0"></span>
            <span className="text-[7px] md:text-[7.5px] font-bold text-[#5b5b7b] uppercase tracking-widest whitespace-nowrap truncate">Verified</span>
          </div>
        </div>

        {/* FINANCIAL DATA MODULE - ULTRA SLIM */}
        <div className="ml-auto pr-1 md:pr-4 shrink-0">
          <div className="flex flex-col items-end gap-0.5 relative">
            <span className="text-[6px] md:text-[7px] font-black text-[#5b5b7b] uppercase tracking-[0.3em] md:tracking-[0.4em] mb-0 flex items-center gap-1">
              <TrendingUp size={7} className="text-[#00b37e] opacity-40 md:hidden" />
              <TrendingUp size={8} className="text-[#00b37e] opacity-40 hidden md:flex" />
              <span className="hidden xs:inline">Monthly</span> Yield
            </span>
            <div className="relative group/revenue">
              <div className="absolute -inset-x-2 -inset-y-0.5 bg-[#00b37e]/5 blur-lg rounded-xl opacity-0 group-hover/revenue:opacity-100 transition-opacity"></div>
              <div className="flex items-baseline gap-0.5 md:gap-1 relative">
                <span className="text-sm md:text-lg font-black text-[#00b37e]/40 tabular-nums">R$</span>
                <span className="text-xl md:text-2xl font-black text-[#00b37e] tracking-tighter tabular-nums drop-shadow-[0_0_15px_rgba(0,179,126,0.15)]">
                  {creator.revenue.replace('R$ ', '')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* EXTERNAL LINK POD - ULTRA SCALE */}
      <div className="relative group/link">
        <div className="absolute inset-0 bg-[#3B82F6]/20 blur-xl rounded-full opacity-0 group-hover/link:opacity-100 transition-opacity"></div>
        <div className="w-12 h-12 bg-white/[0.03] border border-white/10 rounded-lg flex items-center justify-center transition-all duration-500 group-hover:bg-[#3B82F6] group-hover:border-[#3B82F6] group-hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]">
          <ExternalLink className="w-6 h-6 text-[#5b5b7b] group-hover:text-white transition-colors" />
        </div>
      </div>
    </div>
  </div>
);

const downloadImage = async (url: string, filename: string) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const objectUrl = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = objectUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(objectUrl);
    document.body.removeChild(a);
  } catch (error) {
    console.error('Erro ao baixar a imagem:', error);
    window.open(url, '_blank');
  }
};

// --- UGC CREATOR VIEW (MULTI-STEP) ---
const UGCCreatorView: React.FC<{ viralProducts: ProductViral[], exploreTopProducts: ProductExplore[], customAvatars: CustomAvatar[], onAddCustomAvatar: (file: File) => Promise<CustomAvatar | null>, onDeleteCustomAvatar: (id: string) => void }> = ({ viralProducts, exploreTopProducts, customAvatars, onAddCustomAvatar, onDeleteCustomAvatar }) => {
  const [step, setStep] = useState(1);
  const [selectedStyle, setSelectedStyle] = useState<string | null>('influencer');
  const [selectedInfluencer, setSelectedInfluencer] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'mulheres' | 'homens' | 'meus-avatares'>('mulheres');
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const newAvatar = await onAddCustomAvatar(file);
      if (newAvatar) {
        setSelectedInfluencer(newAvatar.id);
      }
      setIsUploading(false);
    }
  };

  // Step 3 state (formerly Step 4)
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [selectedVideoModel, setSelectedVideoModel] = useState<string | null>(null);
  const [selectedTone, setSelectedTone] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);

  // Step 4 state (formerly Step 5)
  const [voiceGender, setVoiceGender] = useState<'fem' | 'masc'>('fem');
  const [selectedStepTone, setSelectedStepTone] = useState<string | null>(null);
  const [takes, setTakes] = useState(['']);

  // Loading state
  const [isLoading, setIsLoading] = useState(false);
  const [loadingPhase, setLoadingPhase] = useState(0);

  // Prompt View State
  const [viewedPrompt, setViewedPrompt] = useState<{ title: string; text: string } | null>(null);

  // Generation State
  const [isGeneratingScript, setIsGeneratingScript] = useState(false);

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
  };

  const handleProductSelect = (id: string) => {
    setSelectedProduct(id);
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
      <div className="fixed inset-0 z-[200] bg-[#0B0B0E] flex flex-col items-center justify-center animate-in fade-in duration-1000 overflow-hidden">
        {/* ATMOSPHERIC DEPTH LAYERS */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0%,transparent_70%)] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none"></div>

        {/* TECHNICAL GRID SYSTEM */}
        <div className="absolute inset-0 opacity-[0.1] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#3B82F6 1px, transparent 1px), linear-gradient(90deg, #3B82F6 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B0B0E] to-transparent opacity-60"></div>

        {/* NEURAL CORE VISUALIZATION */}
        <div className="relative mb-12 md:mb-24 scale-90 md:scale-150">
          {/* SYNAPTIC RINGS */}
          <div className="absolute inset-0 w-48 h-48 -left-8 -top-8 border border-[#3B82F6]/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
          <div className="absolute inset-0 w-56 h-56 -left-12 -top-12 border border-[#8B5CF6]/10 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
          <div className="absolute inset-0 w-40 h-40 -left-4 -top-4 border-2 border-dashed border-[#3B82F6]/5 rounded-full animate-[spin_20s_linear_infinite]"></div>

          {/* INNER HUB */}
          <div className="relative w-32 h-32 bg-[#14151a] border border-white/10 rounded-full flex items-center justify-center shadow-[0_0_80px_rgba(59,130,246,0.2)]">
            <div className="absolute inset-0 bg-[#3B82F6]/5 rounded-full blur-xl animate-pulse"></div>
            <Brain className="w-16 h-16 text-white animate-[pulse_2s_ease-in-out_infinite]" strokeWidth={1.5} />

            {/* SCANNING RADAR */}
            <div className="absolute inset-0 border-t-2 border-[#3B82F6] rounded-full animate-[spin_3s_linear_infinite]"></div>
          </div>

          {/* ORBITAL DATA NODES */}
          {[0, 120, 240].map((deg) => (
            <div
              key={deg}
              className="absolute w-2 h-2 bg-[#3B82F6] rounded-full shadow-[0_0_10px_#3B82F6] animate-pulse"
              style={{
                left: 'calc(50% - 4px)',
                top: '-20px',
                transformOrigin: '50% 84px',
                transform: `rotate(${deg}deg)`
              }}
            ></div>
          ))}
        </div>

        {/* PHASIC STATUS INTERFACE */}
        <div className="relative z-10 flex flex-col items-center gap-6 md:gap-8 w-full max-w-md px-6 md:px-8 text-center">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-center gap-3 opacity-0">
              <div className="w-2 h-2 bg-[#3B82F6] rounded-full animate-ping"></div>
              <span className="text-[10px] font-black text-[#5b5b7b] uppercase tracking-[0.5em]">.</span>
            </div>
            <h2 className="text-[1.1rem] md:text-2xl font-black text-white tracking-widest uppercase transition-all duration-1000 animate-in fade-in slide-in-from-bottom-2 leading-snug">
              {loadingMessages[loadingPhase]}
            </h2>
          </div>

          {/* HIGH-DYNAMIC PROGRESS BAR */}
          <div className="w-full flex flex-col gap-3">
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden relative border border-white/5">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[tech-shimmer_3s_infinite]"></div>
              <div
                className="h-full bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#3B82F6] relative transition-all duration-1000 ease-out"
                style={{ width: `${(loadingPhase + 1) * 25}%` }}
              >
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-white/40 blur-sm"></div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[8px] font-mono text-[#5b5b7b] uppercase tracking-widest">Sinc: 0x{((loadingPhase + 1) * 25).toString(16).toUpperCase()}_VALID</span>
              <span className="text-[8px] font-mono text-[#5b5b7b] uppercase tracking-widest">{(loadingPhase + 1) * 25}%</span>
            </div>
          </div>

          {/* TECHNICAL PROCESSING LOGS (SIMULATED CONSOLE) */}
          <div className="w-full p-3 md:p-4 bg-black/40 border border-white/5 rounded-2xl md:rounded-3xl font-mono text-left space-y-1.5 backdrop-blur-md">
            <div className="flex items-center gap-2 md:gap-3 text-[7px] md:text-[8px] text-[#3B82F6] font-black uppercase tracking-widest mb-1">
              <Terminal className="w-3 h-3" /> System Logs // Real-time
            </div>
            <div className="space-y-1 opacity-40">
              <p className="text-[8px] text-[#3B82F6] animate-in slide-in-from-left duration-300">{'>>'} INITIALIZING_NEURAL_SYNAPSE_LINK...</p>
              {loadingPhase >= 1 && <p className="text-[8px] text-white animate-in slide-in-from-left duration-300">{'>>'} PARSING_AVATAR_FACIAL_MATRICS... [OK]</p>}
              {loadingPhase >= 2 && <p className="text-[8px] text-white animate-in slide-in-from-left duration-300">{'>>'} MODULATING_ACOUSTIC_SYNTHESIS... [READY]</p>}
              {loadingPhase >= 3 && <p className="text-[8px] text-[#00b37e] animate-in slide-in-from-left duration-300">{'>>'} EXPORTING_FINAL_RENDER_FRAME... [100%]</p>}
              <p className="text-[8px] text-[#3B82F6] flex gap-1 items-center">{'>>'} EXEC_STATE: <span className="w-1 h-3 bg-[#3B82F6] animate-pulse"></span></p>
            </div>
          </div>
        </div>

        {/* SCANLINES OVERLAY */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_2px,3px_100%] z-50"></div>
      </div>
    );
  }

  return (
    <main className={`max-w-[1400px] mx-auto px-4 md:px-6 flex flex-col items-center relative ${step === 5 ? 'pt-8 pb-16' : 'py-8 md:py-20'}`}>

      {/* HOLOGRAPHIC STEP HEADER & TECHNICAL PROGRESS */}
      <div className="w-full max-w-[1080px] mb-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center md:items-end justify-center md:justify-between gap-6 mb-8">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-3 mb-2 opacity-0">
              <div className="w-2 h-2 bg-[#3B82F6] rounded-full"></div>
              <span className="text-[10px] font-black text-[#3B82F6] uppercase tracking-[0.4em]">.</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-none">
              {getStepTitle()}
            </h1>
          </div>

          <div className="flex items-baseline gap-4">
            <div className="flex flex-col items-center md:items-end">
              <span className="text-[9px] font-black text-[#5b5b7b] uppercase tracking-[0.3em] mb-1">Etapa do Processo</span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl md:text-4xl font-black text-white tabular-nums tracking-tighter">{step === 5 ? '04' : `0${step}`}</span>
                <span className="text-lg md:text-xl font-black text-[#1e1f26]">//</span>
                <span className="text-lg md:text-xl font-black text-[#5b5b7b] tabular-nums">04</span>
              </div>
            </div>
          </div>
        </div>

        {/* DATA-VIZ PROGRESS TIMELINE */}
        <div className="relative h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#d946ef] shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-1000 ease-out"
            style={{ width: `${(step / 4) * 100}%` }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.4)_50%,transparent_100%)] animate-[shimmer_2s_infinite]"></div>
          </div>
        </div>
      </div>

      {/* Step 1: Avatar / Influencer */}
      {step === 1 && (
        <div className="w-full max-w-[1080px] bg-[#0B0B0E]/60 backdrop-blur-3xl border border-white/5 rounded-[32px] md:rounded-[48px] p-5 md:p-12 shadow-2xl flex flex-col animate-in fade-in slide-in-from-bottom-8 duration-700 relative overflow-hidden group/container">
          {/* TECHNICAL BACKGROUND GRID */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid-step1" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-step1)" />
            </svg>
          </div>

          {selectedStyle === 'review' ? (
            <>
              <div className="flex items-center justify-between mb-12 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#3B82F6]/10 rounded-xl flex items-center justify-center border border-[#3B82F6]/20">
                    <Eye className="w-5 h-5 text-[#3B82F6]" />
                  </div>
                  <h2 className="text-2xl font-black text-white tracking-tight uppercase">POV Configuration</h2>
                </div>
                <button onClick={() => setStep(1)} className="px-5 py-2 rounded-xl bg-white/5 border border-white/10 text-[#5b5b7b] hover:text-white hover:bg-white/10 text-xs font-black flex items-center gap-2 transition-all group/back">
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Voltar
                </button>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center py-16 px-10 border border-white/5 rounded-[40px] bg-[#0B0B0E]/40 mb-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#3B82F6]/5 to-transparent"></div>
                <div className="w-24 h-24 bg-[#14151a] rounded-full flex items-center justify-center mb-8 shadow-2xl border border-white/10 relative z-10">
                  <Eye className="w-12 h-12 text-[#3B82F6] opacity-50" />
                </div>
                <p className="text-[#8d8d99] text-xl font-medium text-center max-w-[500px] leading-relaxed relative z-10 tracking-tight">
                  <span className="text-white">Modo POV detectado.</span> O sistema irá renderizar a perspectiva em primeira pessoa, focando na interação tátil com o produto.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12 relative z-10">
                <div className="flex flex-col">
                  <h2 className="text-2xl md:text-3xl font-black text-white tracking-tighter uppercase mb-1">Selecionar Identidade</h2>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-3 bg-[#3B82F6] rounded-full"></div>
                    <span className="text-[10px] font-black text-[#8d8d99] tracking-[0.4em] uppercase opacity-70">Autenticação de Avatar</span>
                  </div>
                </div>

                {/* MECHANICAL HARDWARE TABS */}
                <div className="bg-[#0B0B0E]/90 backdrop-blur-3xl p-1 rounded-2xl flex items-center border border-white/10 shadow-[inner_0_2px_4px_rgba(255,255,255,0.05)] relative overflow-hidden group/tabs">
                  <div className="absolute inset-x-0 h-[1px] top-0 bg-gradient-to-r from-transparent via-[#3B82F6]/40 to-transparent"></div>
                  {[
                    { id: 'mulheres', label: 'Mulheres', icon: <User size={14} /> },
                    { id: 'homens', label: 'Homens', icon: <User size={14} /> },
                    { id: 'meus-avatares', label: 'Meus Avatares', icon: <Plus size={14} /> }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center gap-3 px-4 md:px-8 py-2 md:py-3 rounded-lg md:rounded-xl text-[10px] md:text-[11px] font-black transition-all duration-700 relative group/tab ${activeTab === tab.id ? 'text-[#3B82F6] bg-[#3B82F6]/5' : 'text-[#5b5b7b] hover:text-white hover:bg-white/5'}`}
                    >
                      <span className={`${activeTab === tab.id ? 'opacity-100 scale-110' : 'opacity-40'} transition-all duration-500`}>{tab.icon}</span>
                      <span className="relative z-10 uppercase tracking-[0.2em]">{tab.label}</span>
                      {activeTab === tab.id && (
                        <>
                          <div className="absolute left-0 top-1/4 bottom-1/4 w-[2px] bg-[#3B82F6] rounded-full shadow-[0_0_10px_#3B82F6]"></div>
                          <div className="absolute right-0 top-1/4 bottom-1/4 w-[2px] bg-[#3B82F6] rounded-full shadow-[0_0_10px_#3B82F6]"></div>
                          <div className="absolute inset-0 bg-gradient-to-t from-[#3B82F6]/10 to-transparent animate-pulse"></div>
                        </>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-10 mb-10 md:mb-16 relative z-10">
                {currentInfluencers.map((inf) => (
                  <div
                    key={inf.id}
                    onClick={() => handleInfluencerSelect(inf.id)}
                    className="relative group/card cursor-pointer"
                  >
                    {/* ULTRA-PREMIUM ROTATING ORBITAL RING */}
                    {selectedInfluencer === inf.id && (
                      <div className="absolute -inset-6 animate-in fade-in duration-1000">
                        <div className="absolute inset-0 border-[1.5px] border-dashed border-[#3B82F6]/40 rounded-[48px] animate-[rotate-orbital_20s_linear_infinite]"></div>
                        <div className="absolute inset-4 border-[1px] border-white/10 rounded-[40px] animate-[rotate-orbital_15s_linear_infinite_reverse]"></div>
                        <div className="absolute -inset-10 bg-[#3B82F6]/10 blur-[60px] rounded-full animate-pulse"></div>
                      </div>
                    )}

                    <div className={`relative aspect-[3/4] md:aspect-[3.5/4.5] rounded-[32px] md:rounded-[40px] overflow-hidden border-2 transition-all duration-700 ${selectedInfluencer === inf.id ? 'border-[#3B82F6] shadow-[0_0_50px_rgba(59,130,246,0.3)] scale-[1.02]' : 'border-white/5 hover:border-white/20 hover:scale-[1.01]'}`}>

                      {/* HARDWARE DECALS & ID OVERLAYS */}
                      <div className="absolute top-8 left-8 z-20 flex flex-col gap-1 opacity-40">
                        <span className="text-[7px] font-mono text-[#3B82F6] tracking-[2px]">SYS_ID_{inf.id.toUpperCase()}</span>
                        <div className="w-12 h-[1px] bg-gradient-to-r from-[#3B82F6] to-transparent"></div>
                      </div>

                      {/* IMAGE LAYER */}
                      <img src={inf.image} className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover/card:scale-110" alt={inf.name} />

                      {/* BIO-SCAN RADIUS OVERLAY (HOVER ONLY) */}
                      <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(59,130,246,0.1)_100%)]"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] aspect-square border border-[#3B82F6]/10 rounded-full animate-[rotate-orbital_10s_linear_infinite]"></div>

                        {/* TARGETING BRACKETS */}
                        <div className="absolute top-1/4 left-1/4 w-8 h-8 border-t border-l border-[#3B82F6] animate-pulse"></div>
                        <div className="absolute top-1/4 right-1/4 w-8 h-8 border-t border-r border-[#3B82F6] animate-pulse"></div>
                        <div className="absolute bottom-1/4 left-1/4 w-8 h-8 border-b border-l border-[#3B82F6] animate-pulse"></div>
                        <div className="absolute bottom-1/4 right-1/4 w-8 h-8 border-b border-r border-[#3B82F6] animate-pulse"></div>

                        {/* SCANNER LINE */}
                        <div className="absolute inset-x-0 h-[30%] bg-gradient-to-b from-[#3B82F6]/20 to-transparent -top-1/4 group-hover/card:animate-[scanline_3s_ease-in-out_infinite]"></div>
                      </div>

                      {/* GLASS EFFECT SYSTEM */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0E] via-[#0B0B0E]/20 to-transparent opacity-90 group-hover/card:opacity-70 transition-opacity"></div>

                      {/* DATA LABEL POD */}
                      <div className="absolute bottom-10 left-10 right-10">
                        <div className="flex flex-col gap-1.5 translate-y-2 group-hover/card:translate-y-0 transition-transform duration-500">
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-[#3B82F6] rounded-full animate-pulse"></div>
                            <span className="text-[9px] font-black text-[#8d8d99] uppercase tracking-[0.3em] font-mono">{inf.id.startsWith('w') ? 'NEURAL_UNIT_W' : 'NEURAL_UNIT_M'}</span>
                          </div>
                          <h3 className="text-3xl font-black text-white tracking-tighter leading-none uppercase group-hover/card:text-[#3B82F6] transition-colors">{inf.name}</h3>
                        </div>
                      </div>

                      {/* ACTIVE STATUS & NEURAL SYNC */}
                      {selectedInfluencer === inf.id && (
                        <div className="absolute top-10 right-10 flex flex-col items-end gap-2">
                          <div className="relative w-12 h-12 flex items-center justify-center">
                            <div className="absolute inset-0 bg-[#3B82F6] blur-xl rounded-full animate-ping"></div>
                            <div className="relative w-full h-full bg-[#3B82F6] rounded-full flex items-center justify-center border-2 border-white/40 shadow-[0_0_20px_#3B82F6]">
                              <Check className="w-7 h-7 text-white" strokeWidth={4} />
                            </div>
                          </div>
                          <span className="text-[7px] font-bold text-[#3B82F6] uppercase tracking-[0.2em] animate-pulse">Linked</span>
                        </div>
                      )}

                      {/* CORNER CLIPS (CINEMATIC) */}
                      <div className="absolute top-0 left-0 w-12 h-12 border-t-[3px] border-l-[3px] border-[#3B82F6]/20 rounded-tl-[40px] opacity-0 group-hover/card:opacity-100 transition-all duration-700 group-hover/card:top-2 group-hover/card:left-2"></div>
                      <div className="absolute bottom-0 right-0 w-12 h-12 border-b-[3px] border-r-[3px] border-[#3B82F6]/20 rounded-br-[40px] opacity-0 group-hover/card:opacity-100 transition-all duration-700 group-hover/card:bottom-2 group-hover/card:right-2"></div>
                    </div>
                  </div>
                ))}

                {activeTab === 'meus-avatares' && (
                  <div className={`col-span-full border-[2px] border-dashed border-white/5 rounded-[56px] bg-white/[0.01] relative overflow-hidden group/new ${customAvatars.length > 0 ? 'p-8' : 'py-12 flex flex-col items-center justify-center'}`}>
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/10 via-transparent to-transparent opacity-0 group-hover/new:opacity-100 transition-opacity duration-1000"></div>

                    {customAvatars.length > 0 ? (
                      <div className="flex flex-col gap-6 z-10 relative">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                          {customAvatars.map((av) => (
                            <div key={av.id} className={`relative aspect-[3.5/4.5] rounded-[32px] overflow-hidden border-2 cursor-pointer transition-all duration-700 ${selectedInfluencer === av.id ? 'border-[#3B82F6] shadow-[0_0_40px_rgba(59,130,246,0.3)] scale-[1.02]' : 'border-white/10 hover:border-white/30'}`} onClick={() => setSelectedInfluencer(av.id)}>
                              <img src={av.image} className="w-full h-full object-cover" alt={av.name} />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0E] via-[#0B0B0E]/20 to-transparent opacity-70"></div>
                              <div className="absolute bottom-4 left-4 right-4">
                                <h3 className="text-base font-black text-white tracking-tighter uppercase">{av.name}</h3>
                              </div>
                              <button onClick={(e) => { e.stopPropagation(); onDeleteCustomAvatar(av.id); if (selectedInfluencer === av.id) setSelectedInfluencer(null); }} className="absolute top-3 right-3 w-7 h-7 bg-red-500/80 rounded-full flex items-center justify-center hover:bg-red-500 transition-all z-20">
                                <Trash2 className="w-3.5 h-3.5 text-white" />
                              </button>
                              {selectedInfluencer === av.id && (
                                <div className="absolute top-3 left-3 w-7 h-7 bg-[#3B82F6] rounded-full flex items-center justify-center border border-white/40 shadow-[0_0_15px_#3B82F6]">
                                  <Check className="w-4 h-4 text-white" strokeWidth={3} />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                        <button onClick={() => !isUploading && fileInputRef.current?.click()} className="self-center px-10 py-4 bg-white/5 text-white rounded-[24px] text-sm font-black hover:bg-white/10 transition-all border border-white/10 flex items-center gap-2 z-10 relative disabled:opacity-50">
                          {isUploading ? <div className="animate-spin w-4 h-4 border-2 border-t-white border-white/30 rounded-full"></div> : <Plus className="w-4 h-4" />}
                          {isUploading ? 'Adicionando...' : 'Adicionar Avatar'}
                        </button>
                      </div>
                    ) : (
                      <>
                        <button onClick={() => !isUploading && fileInputRef.current?.click()} className="group relative w-full aspect-[3.5/4.5] rounded-[32px] border-2 border-dashed border-white/20 bg-white/[0.02] hover:bg-white/[0.05] hover:border-[#3B82F6]/50 transition-all cursor-pointer flex flex-col items-center justify-center gap-4 overflow-hidden disabled:opacity-50">
                          <div className="absolute inset-0 bg-gradient-to-t from-[#3B82F6]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          {isUploading ? (
                            <div className="w-14 h-14 rounded-full flex items-center justify-center animate-spin">
                              <div className="w-8 h-8 border-4 border-t-white border-[#3B82F6]/30 rounded-full"></div>
                            </div>
                          ) : (
                            <div className="w-14 h-14 rounded-full bg-[#3B82F6]/20 border border-[#3B82F6]/40 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#3B82F6] transition-all relative z-10">
                              <Plus className="w-6 h-6 text-white" />
                            </div>
                          )}
                          <span className="text-xs font-black text-white uppercase tracking-widest group-hover:text-[#3B82F6] transition-colors relative z-10">{isUploading ? 'Carregando...' : 'Adicionar Avatar'}</span>
                        </button>
                        <p className="text-[#8d8d99] text-xl font-medium tracking-tight mb-10 relative z-10 max-w-[400px] text-center leading-relaxed">Nenhum <span className="text-white">avatar personalizado</span> detectado nesta conta.</p>
                        <button onClick={() => !isUploading && fileInputRef.current?.click()} className="px-12 py-5 bg-[#3B82F6] text-white rounded-[24px] text-base font-black hover:bg-[#2563EB] transition-all relative z-10 shadow-[0_15px_30px_rgba(59,130,246,0.3)] hover:scale-105 active:scale-95 group/btn disabled:opacity-50">
                          <span className="relative z-10 uppercase tracking-[0.2em] flex items-center gap-3">
                            {isUploading ? <div className="animate-spin w-5 h-5 border-2 border-t-white border-white/30 rounded-full"></div> : <Upload className="w-5 h-5" />}
                            {isUploading ? 'Processando...' : 'Fazer Upload'}
                          </span>
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </>
          )}

          <div className="flex justify-between items-center relative z-10">
            <div className="flex flex-col gap-1">
              <span className="text-[9px] font-black text-[#5b5b7b] uppercase tracking-[0.4em]">Unit Verification Status</span>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${selectedInfluencer ? 'bg-[#00b37e] shadow-[0_0_8px_#00b37e]' : 'bg-[#5b5b7b]'} transition-colors`}></div>
                <span className={`text-[10px] font-bold uppercase tracking-widest ${selectedInfluencer ? 'text-white' : 'text-[#5b5b7b]'}`}>
                  {selectedInfluencer ? 'Signature Verified // Ready' : 'Awaiting Authentication'}
                </span>
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={selectedStyle === 'influencer' && !selectedInfluencer}
              className={`px-8 md:px-16 py-4 md:py-6 rounded-full md:rounded-[24px] text-sm md:text-lg font-black flex items-center gap-4 md:gap-6 transition-all duration-700 relative overflow-hidden group/next ${(selectedStyle === 'review' || selectedInfluencer)
                ? 'bg-white/10 backdrop-blur-xl border border-white/20 text-white shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:bg-white/20 hover:scale-[1.05] active:scale-95'
                : 'bg-white/5 text-[#5b5b7b] border border-white/5 cursor-not-allowed opacity-40'
                }`}
            >
              <span className="relative z-10 uppercase tracking-widest md:tracking-[0.3em]">Prosseguir</span>
              <div className="relative z-10 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover/next:bg-white/20 transition-colors">
                <ArrowRight className="w-5 h-5 group-hover/next:translate-x-1 transition-transform" />
              </div>

              {(selectedStyle === 'review' || selectedInfluencer) && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/next:animate-[tech-shimmer_2s_infinite]"></div>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Produto */}
      {step === 2 && (
        <div className="w-full max-w-[1200px] bg-[#0B0B0E]/90 backdrop-blur-3xl border border-white/10 rounded-[64px] p-8 md:p-16 shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col relative overflow-hidden animate-in fade-in zoom-in-95 duration-1000">

          {/* HOLOGRAPHIC STAGE HEADER */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 relative z-10">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 opacity-0">
                <div className="px-3 py-1 bg-[#3B82F6]/10 border border-[#3B82F6]/30 rounded-full">
                  <span className="text-[10px] font-black text-[#3B82F6] uppercase tracking-widest">.</span>
                </div>
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none">
                Selecione o <span className="text-[#3B82F6]">Produto Viral</span>
              </h1>
            </div>

            <div className="flex flex-col items-end gap-3">
              <div className="flex items-center gap-3 md:gap-4 text-right">
                <div className="flex flex-col">
                  <span className="text-[8px] md:text-[10px] font-black text-[#5b5b7b] uppercase tracking-[0.2em] md:tracking-[0.3em]">Process Stage</span>
                  <div className="flex items-baseline gap-1 justify-end">
                    <span className="text-3xl md:text-4xl font-black text-white tracking-tighter tabular-nums">02</span>
                    <span className="text-lg md:text-xl font-black text-[#1e1f26]">//</span>
                    <span className="text-lg md:text-xl font-black text-[#5b5b7b] tabular-nums">04</span>
                  </div>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="group/back flex items-center justify-center w-14 h-14 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500"
                >
                  <ChevronLeft className="w-6 h-6 text-[#5b5b7b] group-hover/back:text-white group-hover/back:-translate-x-1 transition-all" />
                </button>
              </div>

              {/* DATA-VIZ PROGRESS TIMELINE */}
              <div className="w-64 h-1.5 bg-white/5 rounded-full overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[tech-shimmer_3s_infinite]"></div>
                <div
                  className="h-full bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] relative"
                  style={{ width: '50%' }}
                >
                  <div className="absolute right-0 top-0 bottom-0 w-4 bg-white/40 blur-sm"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="max-h-[560px] overflow-y-auto custom-scrollbar pr-4 -mr-4 mb-16 relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {viralStepProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => handleProductSelect(p.id)}
                  className={`group relative bg-[#0B0B0E]/40 backdrop-blur-xl border-2 rounded-[40px] overflow-hidden cursor-pointer transition-all duration-700 transform-gpu hover:scale-[1.03] ${selectedProduct === p.id ? 'border-[#3B82F6] shadow-[0_0_50px_rgba(59,130,246,0.2)]' : 'border-white/5 hover:border-white/20'}`}
                >
                  <div className="aspect-square relative overflow-hidden bg-black/40">
                    <img src={p.image} className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1" alt={p.title} />

                    {/* BIO-SCAN HOVER EFFECT */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="absolute inset-x-0 h-[1px] bg-[#3B82F6]/50 top-0 animate-[scanline_2s_infinite]"></div>
                      <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-[#3B82F6] opacity-40"></div>
                      <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-[#3B82F6] opacity-40"></div>
                    </div>

                    {/* HARDWARE DECALS */}
                    <div className="absolute top-4 left-4 flex flex-col gap-1 translate-x-[-10px] group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <span className="text-[8px] font-mono text-[#3B82F6] bg-black/60 px-2 py-0.5 rounded border border-[#3B82F6]/30 uppercase tracking-tighter">SYS_ID_1048_X</span>
                      <span className="text-[8px] font-mono text-white/40 bg-black/40 px-2 py-0.5 rounded border border-white/10 uppercase tracking-tighter">REF_PROD_V{p.id.slice(0, 4)}</span>
                    </div>

                    <div className="absolute bottom-4 right-4 translate-y-[10px] group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      {p.viral ? (
                        <div className="bg-[#3B82F6] px-3 py-1 rounded-full shadow-lg flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                          <span className="text-[9px] font-black text-white uppercase tracking-widest">{p.badge}</span>
                        </div>
                      ) : (
                        <div className="bg-black/80 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full shadow-lg flex items-center gap-2">
                          <Flame className="w-3 h-3 text-[#ff8c00]" />
                          <span className="text-[9px] font-black text-white uppercase tracking-widest">{p.badge}</span>
                        </div>
                      )}
                    </div>

                    {/* ACTIVE SYNC OVERLAY */}
                    {selectedProduct === p.id && (
                      <div className="absolute inset-0 bg-[#3B82F6]/10 flex items-center justify-center animate-in fade-in duration-500">
                        <div className="w-20 h-20 rounded-full border-2 border-[#3B82F6] border-t-transparent animate-spin"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Check className="text-[#3B82F6] w-10 h-10" strokeWidth={3} />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-4 md:p-8 relative bg-black/20">
                    <h4 className="text-white text-sm md:text-[15px] font-black mb-3 md:mb-4 line-clamp-2 leading-tight tracking-tight min-h-[36px] md:min-h-[40px] group-hover:text-[#3B82F6] transition-colors">{p.title}</h4>

                    <div className="flex items-center justify-between">
                      <div className="px-3 py-1 bg-[#00b37e]/10 border border-[#00b37e]/20 rounded-md">
                        <span className="text-[9px] font-black text-[#00b37e] uppercase tracking-widest leading-none">Alta Demanda</span>
                      </div>
                      {selectedProduct === p.id && (
                        <span className="text-[9px] font-black text-[#3B82F6] uppercase tracking-[0.2em] animate-pulse">Synchronized</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center pt-12 border-t border-white/5 relative z-10">
            <div className="flex flex-col gap-1">
              <span className="text-[9px] font-black text-[#5b5b7b] uppercase tracking-[0.4em]">Hardware Link Ready</span>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${selectedProduct ? 'bg-[#00b37e] shadow-[0_0_8px_#00b37e]' : 'bg-[#5b5b7b]'} transition-colors`}></div>
                <span className={`text-[10px] font-bold uppercase tracking-widest ${selectedProduct ? 'text-white' : 'text-[#5b5b7b]'}`}>
                  {selectedProduct ? 'Data Packet Validated // Optimized' : 'Establishing Secure Link'}
                </span>
              </div>
            </div>

            <button
              onClick={() => setStep(3)}
              disabled={!selectedProduct}
              className={`px-8 md:px-16 py-4 md:py-6 rounded-full md:rounded-[24px] text-sm md:text-lg font-black flex items-center gap-4 md:gap-6 transition-all duration-700 relative overflow-hidden group/next ${selectedProduct
                ? 'bg-white/10 backdrop-blur-xl border border-white/20 text-white shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:bg-white/20 hover:scale-[1.05] active:scale-95'
                : 'bg-white/5 text-[#5b5b7b] border border-white/5 cursor-not-allowed opacity-40'
                }`}
            >
              <span className="relative z-10 uppercase tracking-widest md:tracking-[0.3em]">Prosseguir</span>
              <div className="relative z-10 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover/next:bg-white/20 transition-colors">
                <ArrowRight className="w-5 h-5 group-hover/next:translate-x-1 transition-transform" />
              </div>

              {selectedProduct && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/next:animate-[tech-shimmer_2s_infinite]"></div>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Configuração Visual */}
      {step === 3 && (
        <div className="w-full max-w-[1200px] bg-[#0B0B0E]/90 backdrop-blur-3xl border border-white/10 rounded-[32px] md:rounded-[64px] p-5 md:p-16 shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col relative overflow-hidden animate-in fade-in zoom-in-95 duration-1000">

          {/* HOLOGRAPHIC STAGE HEADER */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 relative z-10">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none">
                Configuração <span className="text-[#3B82F6]">do Vídeo</span>
              </h1>
            </div>

            <div className="flex flex-col items-end gap-3 mt-4 md:mt-0">
              <div className="flex items-center gap-3 md:gap-4 text-right">
                <div className="flex flex-col">
                  <span className="text-[8px] md:text-[10px] font-black text-[#5b5b7b] uppercase tracking-[0.2em] md:tracking-[0.3em]">Process Stage</span>
                  <div className="flex items-baseline gap-1 justify-end">
                    <span className="text-3xl md:text-4xl font-black text-white tracking-tighter tabular-nums">03</span>
                    <span className="text-lg md:text-xl font-black text-[#1e1f26]">//</span>
                    <span className="text-lg md:text-xl font-black text-[#5b5b7b] tabular-nums">04</span>
                  </div>
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="group/back flex items-center justify-center w-14 h-14 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500"
                >
                  <ChevronLeft className="w-6 h-6 text-[#5b5b7b] group-hover/back:text-white group-hover/back:-translate-x-1 transition-all" />
                </button>
              </div>

              {/* DATA-VIZ PROGRESS TIMELINE */}
              <div className="w-64 h-1.5 bg-white/5 rounded-full overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[tech-shimmer_3s_infinite]"></div>
                <div
                  className="h-full bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] relative"
                  style={{ width: '75%' }}
                >
                  <div className="absolute right-0 top-0 bottom-0 w-4 bg-white/40 blur-sm"></div>
                </div>
              </div>
            </div>
          </div>

          {/* ENVIRONMENT PODS (CENÁRIO) */}
          <div className="mb-10 md:mb-16 relative z-10">
            <div className="flex items-center gap-4 mb-6 md:mb-8">
              <div className="w-12 h-[1px] bg-gradient-to-r from-[#3B82F6] to-transparent"></div>
              <h3 className="text-[10px] md:text-[12px] font-black text-white uppercase tracking-[0.3em] md:tracking-[0.5em]">Ambiente // Cenário</h3>
            </div>

            <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-6">
              {scenarios.map((scen) => (
                <button
                  key={scen.id}
                  onClick={() => setSelectedScenario(scen.id)}
                  className="flex flex-col items-center gap-3 md:gap-4 group/pod perspective-1000"
                >
                  <div className={`relative w-full aspect-square rounded-[24px] md:rounded-[32px] flex items-center justify-center transition-all duration-700 transform-gpu group-hover/pod:scale-105 group-active/pod:scale-95 ${selectedScenario === scen.id ? 'bg-[#3B82F6]/10 border-2 border-[#3B82F6] shadow-[0_0_30px_rgba(59,130,246,0.2)]' : 'bg-[#0B0B0E] border border-white/5 hover:border-white/20'}`}>

                    {/* POD SCANNER EFFECT */}
                    {selectedScenario === scen.id && (
                      <div className="absolute inset-0 overflow-hidden rounded-[30px]">
                        <div className="absolute inset-x-0 h-[2px] bg-[#3B82F6]/40 top-0 animate-[scanline_2s_infinite]"></div>
                      </div>
                    )}

                    <div className={`relative z-10 transition-all duration-500 ${selectedScenario === scen.id ? 'text-[#3B82F6] scale-125' : 'text-[#5b5b7b] group-hover/pod:text-white'}`}>
                      {React.cloneElement(scen.icon as React.ReactElement, { size: 32, strokeWidth: 1.5 })}
                    </div>

                    {/* SELECTION INDICATOR */}
                    {selectedScenario === scen.id && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#3B82F6] rounded-full flex items-center justify-center border-2 border-[#0B0B0E] shadow-lg">
                        <Check size={12} className="text-white" strokeWidth={4} />
                      </div>
                    )}
                  </div>
                  <span className={`text-[10px] font-black text-center uppercase tracking-widest transition-colors duration-500 ${selectedScenario === scen.id ? 'text-white' : 'text-[#8d8d99] group-hover/pod:text-white'}`}>
                    {scen.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* NEURAL PROCESSING MODULES (MODELO DO VÍDEO) */}
          <div className="mb-16 relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-[1px] bg-gradient-to-r from-[#3B82F6] to-transparent"></div>
              <h3 className="text-[12px] font-black text-white uppercase tracking-[0.5em]">Processamento // Template</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videoModels.map((model) => (
                <button
                  key={model.id}
                  onClick={() => setSelectedVideoModel(model.id)}
                  className={`group/model relative flex flex-col items-start p-8 rounded-[32px] border-2 transition-all duration-700 text-left overflow-hidden ${selectedVideoModel === model.id ? 'bg-[#3B82F6]/5 border-[#3B82F6] shadow-[0_0_40px_rgba(59,130,246,0.15)] scale-[1.02]' : 'bg-[#0B0B0E] border-white/5 hover:border-white/10'}`}
                >
                  {/* ACTIVE MODULE GLOW */}
                  {selectedVideoModel === model.id && (
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-[#3B82F6] shadow-[0_0_20px_#3B82F6] animate-pulse"></div>
                  )}

                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-2 h-2 rounded-full transition-colors ${selectedVideoModel === model.id ? 'bg-[#3B82F6] animate-pulse' : 'bg-[#1e1f26]'}`}></div>
                    <span className={`text-sm font-black tracking-tight uppercase transition-colors ${selectedVideoModel === model.id ? 'text-[#3B82F6]' : 'text-white/80 group-hover/model:text-white'}`}>
                      {model.title}
                    </span>
                  </div>

                  <p className="text-[11px] font-medium text-[#5b5b7b] leading-relaxed mb-6">
                    {model.description}
                  </p>

                  <div className={`mt-auto flex items-center gap-2 opacity-0 group-hover/model:opacity-100 transition-opacity duration-500 ${selectedVideoModel === model.id ? 'opacity-100' : ''}`}>
                    <span className="text-[8px] font-black text-[#3B82F6] uppercase tracking-[0.2em]">Neural Match</span>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className={`w-1 h-3 rounded-full ${i <= 3 ? 'bg-[#3B82F6]' : 'bg-[#1e1f26]'}`}></div>
                      ))}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* SYNAPTIC TUNERS (TOM & DURAÇÃO) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 relative z-10">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-8 h-[1px] bg-gradient-to-r from-[#3B82F6] to-transparent"></div>
                <h3 className="text-[12px] font-black text-white uppercase tracking-[0.5em]">Tonalidade // Sync</h3>
              </div>
              <div className="flex flex-wrap gap-4">
                {tones.map((tone) => (
                  <button
                    key={tone.id}
                    onClick={() => setSelectedTone(tone.id)}
                    className={`flex items-center gap-3 px-8 py-4 rounded-2xl border-2 transition-all duration-500 relative overflow-hidden group/tone ${selectedTone === tone.id ? 'bg-[#3B82F6]/10 border-[#3B82F6] text-white shadow-lg' : 'bg-[#0B0B0E] border-white/5 text-[#8d8d99] hover:text-white hover:border-white/10'}`}
                  >
                    <div className={`transition-all duration-500 ${selectedTone === tone.id ? 'text-[#3B82F6] scale-125' : 'text-current opacity-40 group-hover/tone:opacity-100'}`}>
                      {tone.icon}
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest">{tone.label}</span>
                    {selectedTone === tone.id && (
                      <div className="absolute inset-0 bg-gradient-to-t from-[#3B82F6]/10 to-transparent"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-8 h-[1px] bg-gradient-to-r from-[#3B82F6] to-transparent"></div>
                <h3 className="text-[12px] font-black text-white uppercase tracking-[0.5em]">Temporal // Ciclo</h3>
              </div>
              <div className="flex flex-wrap gap-4">
                {durations.map((dur) => (
                  <button
                    key={dur.id}
                    onClick={() => setSelectedDuration(dur.id)}
                    className={`flex items-center gap-3 px-8 py-4 rounded-2xl border-2 transition-all duration-500 relative overflow-hidden group/dur ${selectedDuration === dur.id ? 'bg-[#3B82F6]/10 border-[#3B82F6] text-white shadow-lg' : 'bg-[#0B0B0E] border-white/5 text-[#8d8d99] hover:text-white hover:border-white/10'}`}
                  >
                    <Clock className={`w-4 h-4 transition-all duration-500 ${selectedDuration === dur.id ? 'text-[#3B82F6] scale-125' : 'text-current opacity-40 group-hover/dur:opacity-100'}`} />
                    <span className="text-xs font-black uppercase tracking-widest">{dur.label}</span>
                    {selectedDuration === dur.id && (
                      <div className="absolute inset-0 bg-gradient-to-t from-[#3B82F6]/10 to-transparent"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* CINEMATIC NAVIGATION FOOTER */}
          <div className="flex justify-between items-center pt-12 border-t border-white/5 relative z-10">
            <div className="flex flex-col gap-1">
              <span className="text-[9px] font-black text-[#5b5b7b] uppercase tracking-[0.4em]">Hardware Config Status</span>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${selectedScenario && selectedVideoModel && selectedTone && selectedDuration ? 'bg-[#00b37e] shadow-[0_0_8px_#00b37e]' : 'bg-[#5b5b7b]'} transition-colors`}></div>
                <span className={`text-[10px] font-bold uppercase tracking-widest ${selectedScenario && selectedVideoModel && selectedTone && selectedDuration ? 'text-white' : 'text-[#5b5b7b]'}`}>
                  {selectedScenario && selectedVideoModel && selectedTone && selectedDuration ? 'Config Optimized // Ready' : 'Pending Parameters'}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                const count = parseInt(selectedDuration || '1') || 1;
                setTakes(prev => {
                  if (prev.length === count) return prev;
                  if (prev.length < count) {
                    return [...prev, ...Array(count - prev.length).fill('')];
                  }
                  return prev.slice(0, count);
                });
                setStep(4);
              }}
              disabled={!selectedScenario || !selectedVideoModel || !selectedTone || !selectedDuration}
              className={`px-8 md:px-16 py-4 md:py-6 rounded-full md:rounded-[24px] text-sm md:text-lg font-black flex items-center gap-6 transition-all duration-700 relative overflow-hidden group/next ${selectedScenario && selectedVideoModel && selectedTone && selectedDuration
                ? 'bg-white/10 backdrop-blur-xl border border-white/20 text-white shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:bg-white/20 hover:scale-[1.05] active:scale-95'
                : 'bg-white/5 text-[#5b5b7b] border border-white/5 cursor-not-allowed opacity-40'
                }`}
            >
              <span className="relative z-10 uppercase tracking-widest md:tracking-[0.3em]">Prosseguir</span>
              <div className="relative z-10 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover/next:bg-white/20 transition-colors">
                <ArrowRight className="w-5 h-5 group-hover/next:translate-x-1 transition-transform" />
              </div>

              {(selectedScenario && selectedVideoModel && selectedTone && selectedDuration) && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/next:animate-[tech-shimmer_2s_infinite]"></div>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Roteiro & Voz */}
      {step === 4 && (
        <div className="w-full max-w-[1240px] bg-[#0B0B0E]/90 backdrop-blur-3xl border border-white/10 rounded-[64px] p-8 md:p-16 shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col relative overflow-hidden animate-in fade-in zoom-in-95 duration-1000">

          {/* HOLOGRAPHIC STAGE HEADER */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 relative z-10">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 opacity-0">
                <div className="px-3 py-1 bg-[#3B82F6]/10 border border-[#3B82F6]/30 rounded-full">
                  <span className="text-[10px] font-black text-[#3B82F6] uppercase tracking-widest">.</span>
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none">
                Roteiro <span className="text-[#3B82F6]">& Voz</span>
              </h1>
            </div>

            <div className="flex flex-col items-end gap-3">
              <div className="flex items-center gap-4 text-right">
                <div className="flex flex-col">
                  <span className="text-[8px] md:text-[10px] font-black text-[#5b5b7b] uppercase tracking-[0.2em] md:tracking-[0.3em]">Process Stage</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl md:text-4xl font-black text-white tracking-tighter tabular-nums">04</span>
                    <span className="text-lg md:text-xl font-black text-[#1e1f26]">//</span>
                    <span className="text-lg md:text-xl font-black text-[#5b5b7b] tabular-nums">04</span>
                  </div>
                </div>
                <button
                  onClick={() => setStep(3)}
                  className="group/back flex items-center justify-center w-14 h-14 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500"
                >
                  <ChevronLeft className="w-6 h-6 text-[#5b5b7b] group-hover/back:text-white group-hover/back:-translate-x-1 transition-all" />
                </button>
              </div>

              {/* DATA-VIZ PROGRESS TIMELINE */}
              <div className="w-64 h-1.5 bg-white/5 rounded-full overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[tech-shimmer_3s_infinite]"></div>
                <div
                  className="h-full bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] relative"
                  style={{ width: '100%' }}
                >
                  <div className="absolute right-0 top-0 bottom-0 w-4 bg-white/40 blur-sm"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 relative z-10">
            {/* HARDWARE VOICE MODULES */}
            <div className="space-y-12">
              <div>
                <div className="flex items-center gap-4 mb-4 md:mb-8">
                  <div className="w-8 h-[1px] bg-gradient-to-r from-[#3B82F6] to-transparent"></div>
                  <h3 className="text-[10px] md:text-[11px] font-black text-white uppercase tracking-[0.3em] md:tracking-[0.5em]">Gênero // Matriz</h3>
                </div>
                <div className="flex gap-3 p-1.5 md:p-2 bg-black/40 border border-white/5 rounded-2xl md:rounded-3xl backdrop-blur-xl">
                  {['fem', 'masc'].map((gender) => (
                    <button
                      key={gender}
                      onClick={() => setVoiceGender(gender as 'fem' | 'masc')}
                      className={`flex-1 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500 relative overflow-hidden group/gen ${voiceGender === gender ? 'text-white border border-[#3B82F6]/50 bg-[#3B82F6]/10' : 'text-[#5b5b7b] hover:text-white hover:bg-white/5'}`}
                    >
                      {gender === 'fem' ? 'Feminino' : 'Masculino'}
                      {voiceGender === gender && <div className="absolute inset-0 bg-[#3B82F6]/5 shadow-[inset_0_0_20px_rgba(59,130,246,0.1)]"></div>}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-4 mb-4 md:mb-8">
                  <div className="w-8 h-[1px] bg-gradient-to-r from-[#3B82F6] to-transparent"></div>
                  <h3 className="text-[10px] md:text-[11px] font-black text-white uppercase tracking-[0.3em] md:tracking-[0.5em]">Tonalidade // Modulação</h3>
                </div>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {voiceTones.map((tone) => (
                    <button
                      key={tone}
                      onClick={() => setSelectedStepTone(tone)}
                      className={`px-4 md:px-8 py-2 md:py-3.5 rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-black border-2 transition-all duration-500 uppercase tracking-widest ${selectedStepTone === tone ? 'border-[#3B82F6] bg-[#3B82F6]/10 text-white shadow-lg shadow-[#3B82F6]/10' : 'border-white/5 bg-black/40 text-[#5b5b7b] hover:border-white/20 hover:text-white'}`}
                    >
                      {tone}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* NEURAL SCRIPT ENGINE */}
            <div className="space-y-8">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-[1px] bg-gradient-to-r from-[#3B82F6] to-transparent"></div>
                  <h3 className="text-[11px] font-black text-white uppercase tracking-[0.5em]">Neural Script Engine</h3>
                </div>
                <button
                  onClick={() => {
                    setIsGeneratingScript(true);

                    const influencer = allInfluencers.find(i => i.id === selectedInfluencer)?.name || 'Anônimo';
                    const product = viralStepProducts.find(p => p.id === selectedProduct)?.title || 'Produto Neutro';
                    const scenario = scenarios.find(s => s.id === selectedScenario)?.label || 'Cenário Padrão';
                    const videoModel = videoModels.find(m => m.id === selectedVideoModel)?.title || 'Vídeo Padrão';
                    const tone = tones.find(t => t.id === selectedTone)?.label || 'Normal';

                    let numTakes = 1;
                    if (selectedDuration === '2takes') numTakes = 2;
                    if (selectedDuration === '3takes') numTakes = 3;
                    if (selectedDuration === '4takes') numTakes = 4;
                    if (selectedDuration === '5takes') numTakes = 5;

                    setTimeout(() => {
                      const generatedTakes = [];
                      for (let i = 0; i < numTakes; i++) {
                        if (numTakes === 1) {
                          generatedTakes.push(`"Gente, eu testei esse ${product} e o resultado é surreal. Faz toda a diferença no dia a dia. Clica no link aqui embaixo pra garantir o seu antes que acabe o estoque!"`);
                        } else if (numTakes === 2) {
                          if (i === 0) generatedTakes.push(`"Você não vai acreditar no que o ${product} pode fazer por você! Eu testei e o resultado é simplesmente absurdo."`);
                          if (i === 1) generatedTakes.push(`"A praticidade disso é surreal. Clica no link aqui embaixo antes que acabe o estoque, vai por mim!"`);
                        } else if (numTakes === 3) {
                          if (i === 0) generatedTakes.push(`"Se você ainda não conhece o ${product}, você tá perdendo tempo! O resultado que ele entrega logo no primeiro uso é impressionante."`);
                          if (i === 1) generatedTakes.push(`"Olha só a qualidade e os pequenos detalhes. Ele resolve aquele problema clássico do dia a dia em segundos. Sério, é muito prático."`);
                          if (i === 2) generatedTakes.push(`"Tá com um super desconto por tempo limitado! Clica no link aqui embaixo para comprar o seu, você vai me agradecer depois!"`);
                        } else if (numTakes === 4) {
                          if (i === 0) generatedTakes.push(`"Para tudo que você tá fazendo! Olha essa diferença surreal usando apenas o ${product}."`);
                          if (i === 1) generatedTakes.push(`"Eu não acreditava quando vi na internet, mas é muito simples. Você usa de forma rápida e ele já resolve tudo na hora."`);
                          if (i === 2) generatedTakes.push(`"A melhor parte é que a durabilidade e a praticidade são surreais. Já recomendei pra todo mundo da minha família."`);
                          if (i === 3) generatedTakes.push(`"Não deixa pra depois, porque o estoque tá acabando rápido. Clica no link abaixo agora e aproveita!"`);
                        } else {
                          if (i === 0) generatedTakes.push(`"Eu só acreditei testando! Esse ${product} entregou um resultado muito acima da média."`);
                          if (i === 1) generatedTakes.push(`"Sabe quando você tenta fazer de tudo e nada resolve? Pois é, isso aqui muda o jogo totalmente."`);
                          if (i === 2) generatedTakes.push(`"Você só precisa aplicar e pronto. Em questão de alguns minutos, a diferença é cristalina. Olha isso!"`);
                          if (i === 3) generatedTakes.push(`"Eu já joguei fora todas as outras opções que tinha em casa. A qualidade desse material vale cada centavo investido."`);
                          if (i === 4) generatedTakes.push(`"Tá esperando o quê? Tem promoção rolando agora mesmo. Clica no link e garante o seu antes que suma do estoque!"`);
                        }
                      }
                      setTakes(generatedTakes);
                      setIsGeneratingScript(false);
                    }, 1500); // 1.5s delay for effect
                  }}
                  disabled={isGeneratingScript}
                  className="px-4 py-2 bg-[#3B82F6]/10 border border-[#3B82F6]/20 text-[#3B82F6] rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-[#3B82F6]/20 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                  {isGeneratingScript ? (
                    <><Loader2 className="w-3 h-3 animate-spin" /> Processando...</>
                  ) : (
                    <><Sparkles className="w-3 h-3" /> IA Optimization</>
                  )}
                </button>
              </div>

              <div className="space-y-8 max-h-[450px] overflow-y-auto custom-scrollbar pr-4 pt-6 pb-4">
                {takes.map((take, index) => (
                  <div key={index} className="relative group/take animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="absolute -top-3 left-6 px-4 py-1 bg-[#0B0B0E] border border-white/10 rounded-full z-10 flex items-center gap-3 shadow-2xl">
                      <span className="text-[9px] font-black text-[#3B82F6] uppercase tracking-widest leading-none">Module {index + 1}</span>
                      {index > 0 && (
                        <button
                          onClick={() => setTakes(takes.filter((_, i) => i !== index))}
                          className="text-[#ef4444] hover:scale-125 transition-transform"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                    <textarea
                      value={take}
                      onChange={(e) => {
                        const newTakes = [...takes];
                        newTakes[index] = e.target.value.slice(0, 200);
                        setTakes(newTakes);
                      }}
                      placeholder={`Initialize transcription for module ${index + 1}...`}
                      className="w-full h-32 bg-black/40 backdrop-blur-xl border-2 border-white/5 rounded-[32px] p-8 text-sm text-white placeholder:text-[#5b5b7b]/30 focus:outline-none focus:border-[#3B82F6]/30 transition-all duration-500 resize-none font-medium leading-relaxed"
                    />
                    <div className="absolute bottom-6 right-8 flex items-center gap-4 opacity-40 group-hover/take:opacity-100 transition-opacity">
                      <div className="w-[1px] h-3 bg-white/10"></div>
                      <span className="text-[9px] font-mono text-[#5b5b7b] uppercase tracking-widest tabular-nums font-black">
                        {take.length} // 200
                      </span>
                    </div>
                  </div>
                ))}

                <button
                  onClick={() => setTakes([...takes, ''])}
                  className="w-full py-6 rounded-[32px] border-2 border-dashed border-white/5 hover:border-[#3B82F6]/30 hover:bg-[#3B82F6]/5 text-[#5b5b7b] hover:text-[#3B82F6] flex items-center justify-center gap-4 transition-all duration-500 group/add"
                >
                  <Plus className="w-6 h-6 group-hover/add:rotate-90 transition-transform duration-500" />
                  <span className="text-xs font-black uppercase tracking-[0.2em]">Initialize Additional Module</span>
                </button>
              </div>

              <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
                <Info className="w-4 h-4 text-[#3B82F6]" />
                <p className="text-[10px] font-bold text-[#5b5b7b] uppercase tracking-wider leading-relaxed">
                  Neural link established. Avatar will synthesize text with 99.8% synaptic accuracy.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-10 md:pt-12 border-t border-white/5 relative z-10">
            <div className="flex flex-col gap-1 items-center sm:items-start text-center sm:text-left">
              <span className="text-[9px] font-black text-[#5b5b7b] uppercase tracking-[0.4em]">Synthesis Ready Status</span>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${takes.every(t => t.length > 0) && selectedStepTone ? 'bg-[#00b37e] shadow-[0_0_8px_#00b37e]' : 'bg-[#5b5b7b]'} transition-colors`}></div>
                <span className={`text-[10px] font-bold uppercase tracking-widest ${takes.every(t => t.length > 0) && selectedStepTone ? 'text-white' : 'text-[#5b5b7b]'}`}>
                  {takes.every(t => t.length > 0) && selectedStepTone ? 'Neural Path Clear' : 'Awaiting Matrix'}
                </span>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={takes.some(t => !t) || !selectedStepTone}
              className={`w-full sm:w-auto px-8 md:px-16 py-4 md:py-6 rounded-[20px] md:rounded-[24px] text-base md:text-lg font-black flex items-center justify-center gap-4 md:gap-6 transition-all duration-700 relative overflow-hidden group/generate ${takes.every(t => t) && selectedStepTone
                ? 'bg-white/10 backdrop-blur-xl border border-white/20 text-white shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:bg-white/20 hover:scale-[1.05] active:scale-95'
                : 'bg-white/5 text-[#5b5b7b] border border-white/5 cursor-not-allowed opacity-40'
                }`}
            >
              <span className="relative z-10 uppercase tracking-[0.3em]">Gerar Vídeo</span>
              <div className="relative z-10 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover/generate:bg-white/20 transition-colors">
                <Sparkles className="w-5 h-5 group-hover/generate:rotate-12 transition-transform" />
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Step 5: Final Result (Limpo e Profissional) */}
      {step === 5 && (
        <div className="w-full max-w-[1200px] flex flex-col items-center animate-in fade-in zoom-in duration-1000 relative z-10 px-4">

          <div className="w-full flex flex-col items-center text-center mb-16">
            <div className="w-16 h-16 bg-[#00b37e]/10 border border-[#00b37e]/30 rounded-full flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(0,179,126,0.2)]">
              <CheckCircle2 className="w-8 h-8 text-[#00b37e]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4 uppercase">
              Sua Direção de IA está <span className="text-[#3B82F6]">Pronta!</span>
            </h1>
            <p className="text-[#8d8d99] text-lg font-medium max-w-2xl">
              Tudo pronto! Siga os passos abaixo para baixar seus arquivos e gerar seu vídeo no estúdio.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
            {/* Coluna da Esquerda: Arquivos para Baixar (4 cols) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              {/* AVATAR REPOSITORY CARD */}
              <div className="relative group/asset rounded-[40px] overflow-hidden border border-white/5 bg-[#14151a] shadow-2xl transition-all duration-700 hover:border-[#3B82F6]/30">
                <div className="absolute top-6 left-6 z-20 flex items-center gap-3">
                  <div className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full">
                    <span className="text-[9px] font-mono text-[#3B82F6] uppercase tracking-[0.2em]">ID_AVATAR_{selectedInfluencer?.toUpperCase() || 'NULL'}</span>
                  </div>
                </div>

                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src={allInfluencers.find(i => i.id === selectedInfluencer)?.image || allInfluencers[0].image}
                    className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-700"
                    alt="Avatar"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-6">
                    <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Avatar Selecionado</span>
                    <p className="text-white font-bold">{allInfluencers.find(i => i.id === selectedInfluencer)?.name || 'Modelo'}</p>
                  </div>
                </div>
                <div className="p-5">
                  <button
                    onClick={() => {
                      const url = allInfluencers.find(i => i.id === selectedInfluencer)?.image || allInfluencers[0].image;
                      downloadImage(url, `avatar_${selectedInfluencer || 'modelo'}.png`);
                    }}
                    className="w-full py-4 bg-white hover:bg-[#3B82F6] text-black hover:text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-lg active:scale-95"
                  >
                    <Download className="w-4 h-4" strokeWidth={3} />
                    Baixar Imagem PNG
                  </button>
                </div>
              </div>

              {/* Card de Download do Produto */}
              <div className="bg-[#14151a] border border-white/5 rounded-[32px] overflow-hidden group/card shadow-2xl">
                <div className="h-48 bg-[#1a1b23] flex items-center justify-center p-8 relative overflow-hidden">
                  <img
                    src={viralStepProducts.find(p => p.id === selectedProduct)?.image || viralStepProducts[0].image}
                    className="max-w-full max-h-full object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)] group-hover/card:scale-110 transition-transform duration-700"
                    alt="Produto"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
                <div className="p-5">
                  <div className="mb-4">
                    <span className="text-[10px] font-bold text-[#5b5b7b] uppercase tracking-widest">Produto Selecionado</span>
                    <p className="text-white font-bold text-sm truncate max-w-[200px]" title={viralStepProducts.find(p => p.id === selectedProduct)?.title || 'Produto'}>{viralStepProducts.find(p => p.id === selectedProduct)?.title || 'Produto'}</p>
                  </div>
                  <button
                    onClick={() => {
                      const url = viralStepProducts.find(p => p.id === selectedProduct)?.image || viralStepProducts[0].image;
                      downloadImage(url, `produto_${selectedProduct || 'item'}.png`);
                    }}
                    className="w-full py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl text-xs font-black uppercase tracking-widest border border-white/5 transition-all flex items-center justify-center gap-3 active:scale-95"
                  >
                    <Download className="w-4 h-4" />
                    Baixar Produto
                  </button>
                </div>
              </div>
            </div>

            {/* Coluna da Direita: Estação de Trabalho (8 cols) */}
            <div className="lg:col-span-8">
              <div className="bg-[#14151a]/60 backdrop-blur-3xl border border-white/5 rounded-[32px] md:rounded-[48px] p-5 md:p-14 shadow-2xl relative overflow-hidden group/station h-full">
                {/* Cabeçalho Tech */}
                <div className="flex items-center gap-4 mb-8 md:mb-16 relative z-10">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-[14px] md:rounded-2xl bg-[#3B82F6]/10 border border-[#3B82F6]/30 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.2)] shrink-0">
                    <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-[#3B82F6]" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight leading-tight">Estação de Trabalho</h3>
                </div>

                <div className="flex flex-col gap-10 md:gap-16 relative">
                  {/* Linha Vertical de Conexão */}
                  <div className="absolute left-[13px] top-6 bottom-6 w-[1.5px] bg-gradient-to-b from-[#3B82F6]/50 via-white/5 to-white/5"></div>

                  {/* PASSO 01: SALVAR REFERÊNCIAS */}
                  <div className="flex items-start gap-4 md:gap-8 relative z-10 group/step">
                    <div className="w-[26px] h-[26px] bg-black border-2 border-[#3B82F6] rounded-full flex items-center justify-center text-[10px] font-black text-[#3B82F6] shadow-[0_0_15px_rgba(59,130,246,0.4)] group-hover/step:scale-110 transition-transform shrink-0">1</div>
                    <div className="flex-1 mt-0.5">
                      <h4 className="text-lg md:text-xl font-bold text-white mb-1.5 md:mb-2 uppercase tracking-tight leading-tight">Salvar Referências Visuais</h4>
                      <p className="text-[#5b5b7b] text-xs md:text-sm font-medium leading-relaxed uppercase tracking-wider">Clique nas imagens ao lado para baixar os assets.</p>
                    </div>
                  </div>

                  {/* PASSO 02: ROTEIRO DE DIREÇÃO */}
                  <div className="flex items-start gap-4 md:gap-8 relative z-10 group/step">
                    <div className="w-[26px] h-[26px] bg-black border-2 border-white/10 rounded-full flex items-center justify-center text-[10px] font-black text-white/40 shadow-xl group-hover/step:border-[#3B82F6]/50 group-hover/step:text-[#3B82F6] transition-all shrink-0">2</div>
                    <div className="flex-1 mt-0.5">
                      <h4 className="text-lg md:text-xl font-bold text-white mb-1.5 md:mb-2 uppercase tracking-tight leading-tight">Roteiro de Direção (Veo 3)</h4>
                      <p className="text-[#5b5b7b] text-xs md:text-sm font-medium leading-relaxed uppercase tracking-wider mb-6 md:mb-8">
                        {takes.length} takes de 8 segundos cada. Gere cada vídeo separadamente e junte na edição.
                      </p>

                      <div className="flex flex-col gap-4 md:gap-5">
                        {takes.map((text, idx) => (
                          <div key={idx} className="bg-black/40 border border-white/5 rounded-[20px] md:rounded-[28px] p-4 md:p-6 flex flex-col gap-4 md:gap-5 group/take transition-all hover:bg-black/60 hover:border-[#3B82F6]/30 shadow-lg">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
                              <div className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#00b37e] animate-pulse shadow-[0_0_8px_#00b37e]"></div>
                                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Take {idx + 1} / {takes.length}</span>
                              </div>
                              <button
                                onClick={() => {
                                  const productName = viralStepProducts.find(p => p.id === selectedProduct)?.title || 'Product';
                                  const generoVoz = voiceGender === 'fem' ? 'Female' : 'Male';
                                  const tomVoz = selectedStepTone || 'Standard';
                                  const cenarioAcao = scenarios.find(s => s.id === selectedScenario)?.label || 'Clean, well-lit environment';

                                  const masterPrompt = `[CORE INSTRUCTIONS FOR GOOGLE VEO 3]
You have been provided with two reference images attached:
1. Avatar Reference (the digital influencer/model who will guide this video)
2. Product Reference (${productName})

[VISUAL SETTING & ENVIRONMENT]
- Background/Environment: ${cenarioAcao}
- Lighting: Cinematic, soft diffused lighting, highlighting the subject and product naturally with high-end commercial quality.
- Camera & Framing: 4K resolution, 35mm lens equivalent, shallow depth of field (subtle bokeh) for a premium UGC look. The framing should focus clearly on the Avatar's upper body and the product.

[AUDIO & VOICE CONFIGURATION]
- Voice Gender: ${generoVoz}
- Voice Tone/Modulation: ${tomVoz}
- Audio Quality: Studio-grade, noise-free, crisp vocal clarity.

[ACTION & CINEMATIC DIRECTION]
Generate a hyper-realistic, photorealistic video where the Avatar (from image 1) is naturally holding, interacting with, and showcasing the Product (from image 2). 
- The Avatar must look directly into the camera with an engaging, charismatic eye contact and realistic micro-expressions.
- The product must be clearly visible, accurately matching the reference image in shape, color, and texture.
- Ensure flawless, realistic hand articulation when the Avatar is holding the product. The movements must feel authentic and native to a high-converting TikTok/Reels ad style.

[SCRIPT & LIP-SYNC (PORTUGUESE)]
Make the Avatar speak EXACTLY the following script in Portuguese with perfect, seamless lip-sync matching the syllables flawlessly:

"${text || takes[idx]}"`;

                                  setViewedPrompt({ title: `TAKE ${idx + 1} — Prompt Completo`, text: masterPrompt });
                                }}
                                className="text-[10px] font-black text-[#3B82F6] uppercase tracking-widest hover:underline opacity-60 hover:opacity-100 transition-opacity"
                              >
                                [Ver Prompt]
                              </button>
                            </div>

                            <button
                              onClick={() => {
                                const productName = viralStepProducts.find(p => p.id === selectedProduct)?.title || 'Product';
                                const generoVoz = voiceGender === 'fem' ? 'Female' : 'Male';
                                const tomVoz = selectedStepTone || 'Standard';
                                const cenarioAcao = scenarios.find(s => s.id === selectedScenario)?.label || 'Clean, well-lit environment';

                                const masterPrompt = `[CORE INSTRUCTIONS FOR GOOGLE VEO 3]
You have been provided with two reference images attached:
1. Avatar Reference (the digital influencer/model who will guide this video)
2. Product Reference (${productName})

[VISUAL SETTING & ENVIRONMENT]
- Background/Environment: ${cenarioAcao}
- Lighting: Cinematic, soft diffused lighting, highlighting the subject and product naturally with high-end commercial quality.
- Camera & Framing: 4K resolution, 35mm lens equivalent, shallow depth of field (subtle bokeh) for a premium UGC look. The framing should focus clearly on the Avatar's upper body and the product.

[AUDIO & VOICE CONFIGURATION]
- Voice Gender: ${generoVoz}
- Voice Tone/Modulation: ${tomVoz}
- Audio Quality: Studio-grade, noise-free, crisp vocal clarity.

[ACTION & CINEMATIC DIRECTION]
Generate a hyper-realistic, photorealistic video where the Avatar (from image 1) is naturally holding, interacting with, and showcasing the Product (from image 2). 
- The Avatar must look directly into the camera with an engaging, charismatic eye contact and realistic micro-expressions.
- The product must be clearly visible, accurately matching the reference image in shape, color, and texture.
- Ensure flawless, realistic hand articulation when the Avatar is holding the product. The movements must feel authentic and native to a high-converting TikTok/Reels ad style.

[SCRIPT & LIP-SYNC (PORTUGUESE)]
Make the Avatar speak EXACTLY the following script in Portuguese with perfect, seamless lip-sync matching the syllables flawlessly:

"${text || takes[idx]}"`;

                                navigator.clipboard.writeText(masterPrompt);
                              }}
                              className="w-full flex items-center justify-center gap-3 py-4 bg-[#2a2b33] hover:bg-[#3B82F6] text-white/50 hover:text-white rounded-2xl text-[12px] font-black uppercase tracking-widest transition-all active:scale-95 group/btn"
                            >
                              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                              Copiar Take {idx + 1}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* PASSO 03: FINALIZAR NO VEO */}
                  <div className="flex items-start gap-4 md:gap-8 relative z-10 group/step">
                    <div className="w-[26px] h-[26px] bg-black border-2 border-white/10 rounded-full flex items-center justify-center text-[10px] font-black text-white/40 shadow-xl group-hover/step:border-[#3B82F6]/50 group-hover/step:text-[#3B82F6] transition-all shrink-0">3</div>
                    <div className="flex-1 mt-0.5">
                      <h4 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-8 uppercase tracking-tight leading-tight">Finalizar no Veo 3</h4>

                      <button onClick={() => window.open('https://labs.google/flow/about', '_blank')} className="w-full py-4 md:py-6 px-4 bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] hover:scale-[1.02] text-white rounded-[20px] md:rounded-3xl font-black text-sm sm:text-base md:text-lg flex items-center justify-center gap-2 md:gap-4 shadow-[0_20px_40px_rgba(59,130,246,0.3)] transition-all active:scale-[0.98] group/final">
                        <Video className="w-5 h-5 md:w-7 md:h-7 shrink-0" />
                        <span>ABRIR VEO STUDIO</span>
                        <ExternalLink className="w-4 h-4 md:w-5 md:h-5 opacity-40 group-hover/final:opacity-100 transition-opacity shrink-0" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PROMPT PREVIEW MODAL */}
      {viewedPrompt && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setViewedPrompt(null)}></div>
          <div className="relative bg-[#0B0B0E] border border-white/10 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-[#3B82F6]" />
                <h3 className="text-xl font-bold text-white uppercase tracking-tight">{viewedPrompt.title}</h3>
              </div>
              <button onClick={() => setViewedPrompt(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X className="w-5 h-5 text-white/50 hover:text-white" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
              <div className="bg-black/50 border border-white/5 rounded-2xl p-6 relative group/content">
                <p className="text-white/80 font-medium leading-relaxed whitespace-pre-wrap select-all selection:bg-[#3B82F6]/30 selection:text-white">
                  {viewedPrompt.text}
                </p>

                {/* Floating copy button inside content area */}
                <div className="absolute top-4 right-4 opacity-0 group-hover/content:opacity-100 transition-opacity">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(viewedPrompt.text);
                    }}
                    className="flex items-center gap-2 px-3 py-1.5 bg-[#3B82F6]/20 border border-[#3B82F6]/30 hover:bg-[#3B82F6] text-[#3B82F6] hover:text-white rounded-lg text-xs font-bold uppercase transition-all shadow-lg"
                  >
                    <ArrowRight className="w-3 h-3" />
                    Copiar
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-white/10 bg-white/[0.02] flex justify-end">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(viewedPrompt.text);
                  setViewedPrompt(null);
                }}
                className="flex items-center justify-center gap-3 px-8 py-4 bg-[#3B82F6] hover:bg-[#2563eb] text-white rounded-2xl font-black uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(59,130,246,0.3)]"
              >
                Copiar e Fechar
                <ArrowRight className="w-4 h-4" />
              </button>
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
    <main className="max-w-[1500px] mx-auto px-4 md:px-6 py-8 md:py-16 relative">
      {/* RADICAL ASYMMETRIC HEADER - PROFIT MATRIX SYNC */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-10 md:mb-16 relative z-10 bg-[#0B0B0E]/30 backdrop-blur-3xl p-6 md:p-10 rounded-[32px] md:rounded-[48px] border border-white/5 shadow-2xl overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/5 via-transparent to-[#8B5CF6]/5 opacity-50"></div>

        {/* LEFT: TYPOGRAPHY SCULPTURE & PULSE */}
        <div className="flex flex-col gap-6 flex-1 min-w-0 lg:min-w-[400px] relative z-20">
          <div className="relative">
            {/* ARCHITECTURAL STATUS LINE */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 justify-center lg:justify-start">
              <div className="hidden sm:block h-[1px] w-8 bg-gradient-to-r from-[#3B82F6] to-transparent"></div>
              <span className="text-[9px] font-black text-[#3B82F6] tracking-[0.4em] uppercase">Profit Matrix Alignment</span>
              <div className="flex gap-1 shrink-0">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-1 h-1 bg-[#3B82F6]/40 rounded-full animate-pulse" style={{ animationDelay: `${i * 200}ms` }}></div>
                ))}
              </div>
            </div>

            <div className="relative">
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter leading-[0.85] select-none text-center lg:text-left pl-1 lg:pl-0">
                <span className="block bg-gradient-to-b from-white to-white/20 bg-clip-text text-transparent uppercase text-shadow-sm">Previsibilidade de</span>
                <span className="block bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#d946ef] bg-clip-text text-transparent uppercase">Receita</span>
              </h1>
            </div>
          </div>

          <p className="text-[#8d8d99] text-sm md:text-base font-medium max-w-sm leading-relaxed border-l border-white/10 pl-4 lg:pl-6 text-center lg:text-left mx-auto lg:mx-0">
            Projete seus ganhos e descubra o poder de <span className="text-white">escala cognitiva</span> da sua operação no TikTok.
          </p>
        </div>

        {/* RIGHT: SYNERGIC MODULE CLUSTER */}
        <div className="flex flex-wrap items-center justify-center lg:justify-end gap-4 md:gap-6 flex-1 relative z-20">
          <div className="relative group">
            <div className="absolute inset-0 bg-[#3B82F6]/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="w-30 h-30 md:w-40 md:h-40 backdrop-blur-3xl bg-white/[0.03] border border-white/10 rounded-[28px] md:rounded-[40px] p-4 md:p-6 flex flex-col items-center justify-center shadow-2xl transition-all duration-500 group-hover:scale-105">
              <Activity className="w-4 h-4 md:w-6 md:h-6 text-[#3B82F6] mb-1.5 md:mb-2 opacity-50" />
              <span className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-0.5 md:mb-1">98%</span>
              <span className="text-[6px] md:text-[8px] font-black text-[#5b5b7b] uppercase tracking-[0.3em]">ACCURACY RATE</span>
            </div>
          </div>

          <div className="relative group hidden sm:block">
            <div className="absolute inset-0 bg-[#8B5CF6]/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="w-32 h-32 backdrop-blur-3xl bg-white/[0.02] border border-white/5 rounded-[32px] p-6 flex flex-col items-center justify-center shadow-xl transition-all duration-500 group-hover:scale-105">
              <Zap className="w-5 h-5 text-[#8B5CF6] mb-2 opacity-30" />
              <span className="text-2xl font-black text-white tracking-tighter mb-1">PRO</span>
              <span className="text-[7px] font-black text-[#5b5b7b] uppercase tracking-[0.2em]">MATRIX LEVEL</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_2fr] gap-8 items-start">
        {/* Left Column: Operation Config - ATMOSPHERIC REVIVAL */}
        <div className="flex flex-col gap-8 relative">
          <div className="bg-[#0B0B0E]/60 backdrop-blur-3xl border border-white/10 rounded-[32px] md:rounded-[48px] p-6 md:p-12 flex flex-col gap-6 md:gap-14 shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative overflow-hidden group">
            {/* DECORATIVE LIGHTING */}
            <div className="absolute -left-20 -top-20 w-40 h-40 bg-[#3B82F6]/5 blur-[80px] rounded-full pointer-events-none"></div>

            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center shadow-xl transition-transform group-hover:rotate-6">
                <Settings className="w-6 h-6 text-[#3B82F6] filter drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white tracking-tight uppercase">Configuração da Operação</h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse"></div>
                  <span className="text-[8px] font-black text-[#5b5b7b] uppercase tracking-[0.3em]">Active Input Core</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-8 md:gap-12 relative z-10">
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

          {/* Bottom Summary Tags - UNIFIED CAPSULE STYLE */}
          <div className="bg-[#0B0B0E]/40 backdrop-blur-2xl border border-white/5 rounded-[32px] p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-6 shadow-2xl">
            <div className="flex flex-col items-center group/tag">
              <span className="text-3xl md:text-4xl font-black text-white leading-none tracking-tighter group-hover:text-[#3B82F6] transition-colors">{accounts}</span>
              <span className="text-[9px] md:text-[10px] font-black text-[#5b5b7b] uppercase tracking-[0.4em] mt-2 md:mt-3">CONTAS</span>
            </div>
            <div className="flex flex-col items-center border-x border-white/5 px-4 md:px-6 group/tag">
              <span className="text-3xl md:text-4xl font-black text-white leading-none tracking-tighter group-hover:text-[#8B5CF6] transition-colors">{postsPerDay}</span>
              <span className="text-[9px] md:text-[10px] font-black text-[#5b5b7b] uppercase tracking-[0.4em] mt-2 md:mt-3">POSTS/DIA</span>
            </div>
            <div className="flex flex-col items-center group/tag">
              <div className="relative">
                <div className="absolute -inset-1 bg-[#3B82F6]/20 blur-lg rounded-full opacity-0 group-hover/tag:opacity-100 transition-opacity"></div>
                <span className="relative text-3xl md:text-4xl font-black text-[#3B82F6] leading-none tracking-tighter">{monthlyPosts}</span>
              </div>
              <span className="text-[9px] md:text-[10px] font-black text-[#5b5b7b] uppercase tracking-[0.4em] mt-2 md:mt-3">POSTS/MÊS</span>
            </div>
          </div>
        </div>

        {/* Right Column: Projections - HIGH PERFORMANCE */}
        <div className="flex flex-col gap-10">
          <div className="flex items-center gap-5 relative">
            <div className="w-1 h-8 bg-gradient-to-b from-[#3B82F6] to-transparent"></div>
            <h3 className="text-sm font-black text-[#8d8d99] uppercase tracking-[0.5em] leading-none">Projeções de Faturamento Mensal</h3>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-white/10 to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
            {/* AMBIANT GLOW FOR GRID */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#3B82F6]/5 blur-[120px] rounded-full -z-10 pointer-events-none"></div>

            {projections.map((p) => (
              <div
                key={p.id}
                className={`group relative bg-[#0B0B0E]/60 backdrop-blur-3xl border border-white/5 rounded-[40px] md:rounded-[64px] p-6 md:p-10 flex flex-col min-h-[580px] md:min-h-[680px] transition-all duration-700 hover:scale-[1.03] hover:-translate-y-2 shadow-2xl overflow-hidden ${p.isRecommended ? 'border-[#3B82F6]/30 shadow-[0_40px_100px_rgba(59,130,246,0.15)] ring-1 ring-[#3B82F6]/20' : 'hover:border-white/20'}`}
              >
                {/* SCAN LINE ANIMATION */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#3B82F6] to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[scan-line_3s_linear_infinite] z-20"></div>

                {/* STATUS BAR */}
                <div className="flex flex-col gap-3 mb-10 relative z-10 transition-transform group-hover:translate-x-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full shadow-[0_0_10px_currentColor] animate-pulse" style={{ color: p.id === 'conservador' ? '#5b5b7b' : p.id === 'moderado' ? '#3B82F6' : '#ff8c00' }}></div>
                    <span className="text-base font-black text-white tracking-tight uppercase leading-none">{p.label}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-white/5 border border-white/10 text-[9px] font-black text-[#5b5b7b] rounded-lg uppercase tracking-widest leading-none flex items-center h-6">{p.views}</span>
                    {p.isRecommended && (
                      <div className="px-3 py-1 bg-[#3B82F6]/10 border border-[#3B82F6]/30 rounded-full flex items-center h-6">
                        <span className="text-[7px] font-black text-[#3B82F6] uppercase tracking-[0.1em]">Recommended</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center text-center relative z-10">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05),transparent)] pointer-events-none scale-150"></div>

                  <div className="flex items-center gap-4 mb-3 border-b border-white/5 pb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]"></div>
                    <span className="text-[11px] font-black text-[#5b5b7b] uppercase tracking-[0.4em]">Sua Comissão Prevista</span>
                  </div>

                  <div className="relative group/val">
                    <div className="absolute inset-x-0 bottom-2 h-1/3 bg-[#3B82F6]/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <span className="relative text-3xl md:text-5xl font-black text-white tracking-tighter leading-none block mb-2 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
                      {formatBRL(p.data.commission)}
                    </span>
                  </div>

                  <div className="mt-8 px-5 py-2 bg-white/5 border border-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-3 h-3 text-[#3B82F6]" />
                      <span className="text-[9px] font-black text-[#3B82F6] uppercase tracking-widest">Growth Matrix Active</span>
                    </div>
                  </div>
                </div>

                <div className="pt-10 border-t border-white/5 flex flex-col gap-6 relative z-10">
                  <div className="flex items-end justify-between group/row">
                    <div className="flex flex-col gap-1">
                      <span className="text-[8px] md:text-[9px] font-black text-[#5b5b7b] uppercase tracking-[0.2em] group-hover/row:text-white transition-colors">Vendas Totais</span>
                      <div className="h-[1px] w-0 group-hover/row:w-6 bg-[#3B82F6] transition-all duration-500"></div>
                    </div>
                    <span className="text-xl md:text-2xl font-black text-white tracking-tight leading-none">{p.data.sales}</span>
                  </div>

                  <div className="flex items-end justify-between group/row">
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] font-black text-[#5b5b7b] uppercase tracking-[0.2em] group-hover/row:text-white transition-colors">Faturamento Total</span>
                      <div className="h-[1px] w-0 group-hover/row:w-10 bg-[#8B5CF6] transition-all duration-500"></div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[8px] font-black text-[#8B5CF6] uppercase mb-1 tracking-widest">Bruto Estimado</span>
                      <span className="text-xl font-black text-white tracking-tight leading-none bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                        <span className="text-[#5b5b7b] text-xs mr-1">R$</span>
                        {p.data.totalRevenue.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* OVERLAY DECORATION */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>
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
  <div className="flex flex-col gap-6 group/slider">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-[#3B82F6] shadow-lg group-hover/slider:scale-110 transition-transform">
          {icon}
        </div>
        <div className="flex flex-col">
          <span className="text-[13px] font-black text-white/90 uppercase tracking-tight">{label}</span>
          {info && <span className="text-[9px] font-bold text-[#5b5b7b] uppercase tracking-wider">{info}</span>}
        </div>
      </div>
      <div className="px-5 py-2 bg-[#1E1B4B]/40 border border-[#3B82F6]/30 rounded-2xl text-[13px] font-black text-[#3B82F6] shadow-[0_0_20px_rgba(59,130,246,0.2)]">
        {prefix}{value}{suffix}
      </div>
    </div>

    <div className="relative flex items-center h-8">
      <div className="absolute inset-x-0 h-2 bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] shadow-[0_0_15px_rgba(59,130,246,0.5)]"
          style={{ width: `${((value - min) / (max - min)) * 100}%` }}
        ></div>
      </div>
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
    <main className="max-w-[1500px] mx-auto px-4 md:px-6 py-8 md:py-16 relative">
      {/* RADICAL ASYMMETRIC HEADER - SYNCED WITH VIRAL SECTIONS */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-10 md:mb-16 relative z-10 bg-[#0B0B0E]/30 backdrop-blur-3xl p-6 md:p-10 rounded-[32px] md:rounded-[48px] border border-white/5 shadow-2xl overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/5 via-transparent to-[#8B5CF6]/5 opacity-50"></div>

        {/* LEFT: TYPOGRAPHY SCULPTURE & PULSE */}
        <div className="flex flex-col gap-6 flex-1 min-w-0 lg:min-w-[400px] relative z-20">
          <div className="relative">
            {/* ARCHITECTURAL STATUS LINE */}
            <div className="flex items-center gap-4 mb-4">
              <div className="h-[1px] w-8 bg-gradient-to-r from-[#FACC15] to-transparent"></div>
              <span className="text-[9px] font-black text-[#FACC15] tracking-[0.4em] uppercase">Intelligence Matrix Active</span>
              <div className="flex gap-1">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-1 h-1 bg-[#FACC15]/40 rounded-full animate-pulse" style={{ animationDelay: `${i * 200}ms` }}></div>
                ))}
              </div>
            </div>

            <div className="relative">
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] select-none pl-1">
                <span className="block bg-gradient-to-b from-white to-white/20 bg-clip-text text-transparent uppercase">Hacks</span>
                <span className="block bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#d946ef] bg-clip-text text-transparent uppercase">Virais</span>
              </h1>
            </div>
          </div>

          <p className="text-[#8d8d99] text-sm md:text-base font-medium max-w-sm leading-relaxed border-l border-white/10 pl-6">
            Mapeamento de <span className="text-white">padrões comportamentais</span> que romperam as barreiras algoritmas globais.
          </p>
        </div>

        {/* RIGHT: SYNERGIC STATS CLUSTER */}
        <div className="flex items-center justify-center lg:justify-end gap-6 flex-1 relative z-20">
          <div className="relative group">
            <div className="absolute inset-0 bg-[#FACC15]/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="w-40 h-40 backdrop-blur-3xl bg-white/[0.03] border border-white/10 rounded-[40px] p-6 flex flex-col items-center justify-center shadow-2xl transition-all duration-500 group-hover:scale-105">
              <Zap className="w-6 h-6 text-[#FACC15] mb-2 opacity-50" />
              <span className="text-4xl font-black text-white tracking-tighter mb-1">98%</span>
              <span className="text-[8px] font-black text-[#5b5b7b] uppercase tracking-[0.3em]">PRECISÃO</span>
            </div>
          </div>

          <div className="relative group hidden sm:block">
            <div className="absolute inset-0 bg-[#3B82F6]/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="w-32 h-32 backdrop-blur-3xl bg-white/[0.02] border border-white/5 rounded-[32px] p-6 flex flex-col items-center justify-center shadow-xl transition-all duration-500 group-hover:scale-105">
              <TrendingUp className="w-5 h-5 text-[#3B82F6] mb-2 opacity-30" />
              <span className="text-2xl font-black text-white tracking-tighter mb-1">+2K</span>
              <span className="text-[7px] font-black text-[#5b5b7b] uppercase tracking-[0.2em]">DAY GAINS</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {/* AMBIANT BACKGROUND GLOWS */}
        <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] bg-[#3B82F6]/10 blur-[120px] rounded-full -z-10 pointer-events-none"></div>
        <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] bg-[#8B5CF6]/10 blur-[120px] rounded-full -z-10 pointer-events-none"></div>

        {hacks.map((hack) => (
          <div
            key={hack.id}
            onClick={() => onSelectHack(hack.id)}
            className="group relative aspect-[3/4] md:aspect-[3/4.5] bg-[#0B0B0E]/40 backdrop-blur-2xl border border-white/5 rounded-[32px] md:rounded-[48px] overflow-hidden cursor-pointer transition-all duration-500 hover:border-[#3B82F6]/40 hover:shadow-[0_40px_80px_rgba(0,0,0,0.6)] hover:-translate-y-2"
          >
            {hack.image.endsWith('.mp4') ? (
              <video
                src={hack.image}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
            ) : (
              <img
                src={hack.image}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                alt={hack.title}
              />
            )}

            {/* GRADIENT OVERLAYS */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0E] via-transparent to-black/20 opacity-80 group-hover:opacity-60 transition-opacity"></div>

            {/* SCAN LINE ANIMATION */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#3B82F6] to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[scan-line_3s_linear_infinite] z-20"></div>

            {/* EMOJI BADGE - PREMIUM POD */}
            <div className="absolute top-4 left-4 md:top-8 md:left-8 w-10 h-10 md:w-14 md:h-14 bg-white/5 backdrop-blur-xl rounded-[15px] md:rounded-[20px] flex items-center justify-center border border-white/10 shadow-2xl transform transition-transform group-hover:rotate-12">
              <span className="text-xl md:text-2xl drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">{hack.icon}</span>
            </div>

            {/* CONTENT CLUSTER */}
            <div className="absolute bottom-10 left-10 right-10 flex flex-col gap-4 z-30">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-[#3B82F6] to-transparent"></div>
                  <h3 className="text-3xl font-black text-white tracking-tighter leading-[0.9] uppercase group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-all">
                    {hack.title}
                  </h3>
                </div>

                {hack.description && (
                  <p className="text-[#8d8d99] text-[13px] font-medium leading-relaxed line-clamp-2 pl-4 border-l border-white/5 group-hover:border-[#3B82F6]/30 transition-colors">
                    {hack.description}
                  </p>
                )}
              </div>

              {hack.isHighlighted && (
                <div className="flex items-center gap-4 mt-2 group/btn">
                  <div className="relative h-12 flex-1">
                    <div className="absolute inset-0 bg-[#3B82F6] rounded-2xl opacity-80 group-hover/btn:opacity-100 transition-opacity blur-[2px]"></div>
                    <div className="absolute inset-0 bg-white/10 rounded-2xl border border-white/20"></div>
                    <div className="relative h-full flex items-center justify-center gap-3 px-6">
                      <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Acessar Matrix</span>
                      <Zap className="w-3 h-3 text-white animate-pulse" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {hack.hasVeoBadge && (
              <div className="absolute top-8 right-8">
                <div className="px-3 py-1 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
                  <span className="text-[7px] font-black text-white/40 uppercase tracking-[0.2em]">Neural Veo</span>
                </div>
              </div>
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
        className="relative border border-white/5 rounded-[32px] md:rounded-[40px] p-6 md:p-12 lg:p-16 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12 shadow-2xl"
        style={{ backgroundColor: hack.bannerColor }}
      >
        {/* Decoration Gradient */}
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
            <h1 className="text-3xl md:text-[44px] font-black text-white tracking-tighter mb-4 leading-none">{hack.title}</h1>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {exampleImages.map((img, idx) => (
            <div key={idx} className="flex flex-col gap-4 group">
              <div className="relative aspect-[9/14] md:aspect-[9/16] rounded-[32px] md:rounded-[48px] overflow-hidden bg-[#0b0c10] shadow-2xl cursor-pointer">
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
        <h1 className="text-[28px] md:text-[40px] font-black text-white tracking-tighter mb-4 leading-tight">Passos iniciais</h1>
        <p className="text-[#8d8d99] text-sm md:text-lg font-medium opacity-80 mb-8 md:mb-12 italic">
          Tudo o que você precisa saber para começar do jeito certo.
        </p>

        <div className="flex flex-col gap-6 md:gap-12">
          {/* Section 1 */}
          <section className="flex flex-col gap-4">
            <h2 className="text-lg md:text-xl font-black text-white tracking-tight uppercase">BEM-VINDO AO TRENDFY APP</h2>
            <p className="text-[#8d8d99] text-sm md:text-base font-medium leading-relaxed max-w-3xl">
              O Viralpulse é sua ferramenta definitiva para dominar o TikTok Shop. Nosso objetivo é fornecer dados, criativos e conhecimento para você escalar suas vendas.
            </p>
          </section>

          {/* Section 2 */}
          <section className="flex flex-col gap-6">
            <h2 className="text-lg md:text-xl font-black text-white tracking-tight uppercase">PRIMEIROS PASSOS</h2>

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
                  <span className="text-[#e1e1e6] text-xs sm:text-sm md:text-base font-medium opacity-90 group-hover:opacity-100 transition-opacity">{item}</span>
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
            <p className="text-[#f59e0b] text-sm md:text-base font-black leading-snug tracking-tight">
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
        <h1 className="text-[28px] md:text-[40px] font-black text-white tracking-tighter mb-4 leading-tight">Como se afiliar no TikTok Shop</h1>
        <p className="text-[#8d8d99] text-sm md:text-lg font-medium opacity-80 mb-8 md:mb-12 italic">
          Passo a passo detalhado para sua primeira afiliação.
        </p>

        <div className="flex flex-col gap-6 md:gap-12">
          {/* Section 1 */}
          <section className="flex flex-col gap-4">
            <h2 className="text-lg md:text-xl font-black text-white tracking-tight uppercase">REQUISITOS PARA AFILIAÇÃO</h2>
            <p className="text-[#8d8d99] text-sm md:text-base font-medium leading-relaxed max-w-3xl">
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
                  <span className="text-[#e1e1e6] text-xs sm:text-sm md:text-base font-medium opacity-90 group-hover:opacity-100 transition-opacity">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Section 2 */}
          <section className="flex flex-col gap-6">
            <h2 className="text-lg md:text-xl font-black text-white tracking-tight uppercase">PASSO A PASSO NO APP</h2>

            <div className="flex flex-col gap-4">
              {[
                "Vá ao seu perfil e clique no menu de três linhas.",
                "Selecione \"Ferramentas do Criador\".",
                "Clique em \"TikTok Shop para Criadores\".",
                "Siga as instruções de inscrição e aguarde a aprovação."
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 group">
                  <span className="text-[#3B82F6] text-sm md:text-base font-black pt-0.5">{idx + 1}.</span>
                  <span className="text-[#e1e1e6] text-xs sm:text-sm md:text-base font-medium opacity-90 group-hover:opacity-100 transition-opacity">{item}</span>
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
            <p className="text-[#f59e0b] text-sm md:text-base font-black leading-snug tracking-tight">
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
        <h1 className="text-[28px] md:text-[40px] font-black text-white tracking-tighter mb-4 leading-tight">Regras e restrições importantes de conhecer</h1>
        <p className="text-[#8d8d99] text-sm md:text-lg font-medium opacity-80 mb-8 md:mb-12 italic">
          Evite bloqueios e penalidades conhecendo as diretrizes.
        </p>

        <div className="flex flex-col gap-6 md:gap-12">
          {/* Section 1 */}
          <section className="flex flex-col gap-4">
            <h2 className="text-lg md:text-xl font-black text-white tracking-tight uppercase">DIRETRIZES DE CONTEÚDO</h2>
            <p className="text-[#8d8d99] text-sm md:text-base font-medium leading-relaxed max-w-3xl">
              O TikTok é rigoroso quanto à qualidade e autenticidade. Violar regras pode resultar em "Shadowban" ou suspensão da conta.
            </p>
          </section>

          {/* Section 2 */}
          <section className="flex flex-col gap-6">
            <h2 className="text-lg md:text-xl font-black text-white tracking-tight uppercase">O QUE NÃO FAZER</h2>

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
                  <p className="text-[#e1e1e6] text-xs sm:text-sm md:text-base font-medium opacity-90 group-hover:opacity-100 transition-opacity">
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
            <p className="text-[#f59e0b] text-sm md:text-base font-black leading-snug tracking-tight">
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
        <h1 className="text-3xl md:text-[40px] font-black text-white tracking-tighter mb-4 leading-tight">Como criar avatar com IA</h1>
        <p className="text-[#8d8d99] text-base md:text-lg font-medium opacity-80 mb-8 md:mb-12 italic">
          Use inteligência artificial para criar apresentadores humanos e realistas.
        </p>

        <div className="flex flex-col gap-6 md:gap-12">
          {/* Section 1 */}
          <section className="flex flex-col gap-4">
            <h2 className="text-lg md:text-xl font-black text-white tracking-tight uppercase">UTILIZANDO A FERRAMENTA DE AVATAR</h2>
            <p className="text-[#8d8d99] text-sm md:text-base font-medium leading-relaxed max-w-3xl">
              Nossa IA permite gerar apresentadores que falam seu roteiro com expressões naturais.
            </p>
          </section>

          {/* Section 2 */}
          <section className="flex flex-col gap-6">
            <h2 className="text-lg md:text-xl font-black text-white tracking-tight uppercase">FLUXO DE TRABALHO</h2>

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
                  <span className="text-[#e1e1e6] text-xs sm:text-sm md:text-base font-medium opacity-90 group-hover:opacity-100 transition-opacity">{item}</span>
                </div>
              ))}
            </div>

            <p className="text-[#8d8d99] text-sm md:text-base font-medium leading-relaxed max-w-3xl italic mt-4">
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
        <h1 className="text-3xl md:text-[40px] font-black text-white tracking-tighter mb-4 leading-tight">Como criar vídeos com UGC Criador</h1>
        <p className="text-[#8d8d99] text-base md:text-lg font-medium opacity-80 mb-8 md:mb-12 italic">
          Aprenda a criar roteiros e vídeos que vendem usando nossa ferramenta.
        </p>

        <div className="flex flex-col gap-6 md:gap-12">
          {/* Section 1 */}
          <section className="flex flex-col gap-4">
            <h2 className="text-lg md:text-xl font-black text-white tracking-tight uppercase">CRIAÇÃO DE VÍDEOS UGC</h2>
            <p className="text-[#8d8d99] text-sm md:text-base font-medium leading-relaxed max-w-3xl">
              User Generated Content (UGC) é o formato que mais converte hoje. Nossa ferramenta automatiza a estrutura desses vídeos.
            </p>
          </section>

          {/* Section 2 */}
          <section className="flex flex-col gap-6">
            <h2 className="text-lg md:text-xl font-black text-white tracking-tight uppercase">CONFIGURANDO SEU VÍDEO</h2>

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
                  <span className="text-[#e1e1e6] text-xs sm:text-sm md:text-base font-medium opacity-90 group-hover:opacity-100 transition-opacity">{item}</span>
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
            <p className="text-[#f59e0b] text-sm md:text-base font-black leading-snug tracking-tight">
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
    <main className="max-w-[1500px] mx-auto px-4 md:px-6 py-8 md:py-16 relative">
      {/* RADICAL ASYMMETRIC HEADER - KNOWLEDGE MATRIX SYNC */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8 mb-10 md:mb-20 relative z-10 bg-[#0B0B0E]/30 backdrop-blur-3xl p-5 md:p-10 rounded-[28px] md:rounded-[48px] border border-white/5 shadow-2xl overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/5 via-transparent to-[#8B5CF6]/5 opacity-50"></div>

        {/* LEFT: TYPOGRAPHY SCULPTURE & PULSE */}
        <div className="flex flex-col gap-6 flex-1 min-w-0 lg:min-w-[400px] relative z-20 w-full overflow-hidden">
          <div className="relative w-full">
            {/* ARCHITECTURAL STATUS LINE */}
            <div className="flex items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-4 flex-wrap">
              <div className="hidden sm:block h-[1px] w-8 bg-gradient-to-r from-[#3B82F6] to-transparent"></div>
              <span className="text-[7px] sm:text-[9px] font-black text-[#3B82F6] tracking-[0.2em] sm:tracking-[0.4em] uppercase text-center break-words">Knowledge Matrix Syncing</span>
              <div className="flex gap-1 shrink-0">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-[#3B82F6]/40 rounded-full animate-pulse" style={{ animationDelay: `${i * 200}ms` }}></div>
                ))}
              </div>
            </div>

            <div className="relative w-full">
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] select-none text-center lg:text-left break-words w-full">
                <span className="block bg-gradient-to-b from-white to-white/20 bg-clip-text text-transparent uppercase text-shadow-sm truncate sm:overflow-visible sm:whitespace-normal">Creator</span>
                <span className="block bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#d946ef] bg-clip-text text-transparent uppercase truncate sm:overflow-visible sm:whitespace-normal">Academy</span>
              </h1>
            </div>
          </div>

          <p className="text-[#8d8d99] text-[11px] sm:text-sm md:text-base font-medium max-w-sm leading-relaxed border-l-0 lg:border-l border-white/10 pl-0 lg:pl-6 text-center lg:text-left mx-auto lg:mx-0 px-2 sm:px-0 break-words w-full">
            O centro de <span className="text-white">inteligência cognitiva</span> para escalar sua operação no TikTok Shop com autoridade.
          </p>
        </div>

        {/* RIGHT: SYNERGIC MODULE CLUSTER */}
        <div className="flex items-center justify-center lg:justify-end gap-4 md:gap-6 w-full lg:flex-1 relative z-20">
          <div className="relative group">
            <div className="absolute inset-0 bg-[#3B82F6]/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="w-32 h-32 md:w-40 md:h-40 backdrop-blur-3xl bg-white/[0.03] border border-white/10 rounded-[32px] md:rounded-[40px] p-5 md:p-6 flex flex-col items-center justify-center shadow-2xl transition-all duration-500 group-hover:scale-105">
              <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-[#3B82F6] mb-2 opacity-50" />
              <span className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-1">12</span>
              <span className="text-[7px] md:text-[8px] font-black text-[#5b5b7b] uppercase tracking-[0.3em]">MÓDULOS</span>
            </div>
          </div>

          <div className="relative group hidden sm:block">
            <div className="absolute inset-0 bg-[#8B5CF6]/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="w-32 h-32 backdrop-blur-3xl bg-white/[0.02] border border-white/5 rounded-[32px] p-6 flex flex-col items-center justify-center shadow-xl transition-all duration-500 group-hover:scale-105">
              <Award className="w-5 h-5 text-[#8B5CF6] mb-2 opacity-30" />
              <span className="text-2xl font-black text-white tracking-tighter mb-1">GOLD</span>
              <span className="text-[7px] font-black text-[#5b5b7b] uppercase tracking-[0.2em]">ACCESS LEVEL</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Card - ATMOSPHERIC REVIVAL */}
      <div className="w-full relative bg-[#0B0B0E]/60 backdrop-blur-3xl border border-white/5 rounded-[32px] md:rounded-[64px] p-5 md:p-12 lg:p-20 overflow-hidden mb-12 md:mb-32 shadow-[0_40px_100px_rgba(0,0,0,0.8)] flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-16 group">
        {/* ATMOSPHERIC GLOWS */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#3B82F6] to-transparent opacity-30"></div>
        <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-80 h-80 bg-[#3B82F6]/10 blur-[120px] rounded-full pointer-events-none group-hover:opacity-100 transition-opacity animate-pulse"></div>

        <div className="flex flex-col items-center lg:items-start w-full lg:max-w-2xl z-10">
          <div className="flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2.5 md:py-3 bg-white/5 border border-white/10 rounded-full text-[9px] md:text-[10px] font-black text-[#3B82F6] uppercase tracking-[0.2em] md:tracking-[0.3em] mb-8 md:mb-12 shadow-xl backdrop-blur-md">
            <GraduationCap className="w-3.5 h-3.5 md:w-4 md:h-4" />
            Estratégias de Elite Validadas
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-[84px] font-black text-white tracking-tighter mb-6 md:mb-10 leading-[0.85] text-center lg:text-left">
            Guia Mestre <br />
            <span className="bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent uppercase break-words">TikTok Shop</span>
          </h2>

          <p className="text-[#8d8d99] text-sm sm:text-base md:text-xl font-medium mb-10 md:mb-14 leading-relaxed text-center lg:text-left w-full lg:max-w-xl pl-4 md:pl-6 border-l-2 border-[#3B82F6]/20 group-hover:border-[#3B82F6]/60 transition-colors">
            O roadmap definitivo para dominar diretrizes e <span className="text-white">atalhos lucrativos</span> de um ecossistema de alta conversão.
          </p>

          <button className="relative group/btn overflow-hidden h-14 md:h-16 px-8 md:px-12 rounded-[20px] md:rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 transition-all hover:scale-[1.03] active:scale-95 shadow-2xl w-full sm:w-auto">
            <div className="absolute inset-0 bg-[#3B82F6]/80 group-hover/btn:bg-[#3B82F6] transition-colors translate-y-full group-hover/btn:translate-y-0 duration-500"></div>
            <div className="relative z-10 flex items-center gap-4 text-white font-black text-sm uppercase tracking-widest">
              Começar Jornada
              <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
            </div>
          </button>
        </div>

        {/* ILLUSTRATION POD - CINEMATIC VERSION */}
        <div className="relative w-full max-w-[450px] aspect-square z-10 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/20 to-[#8B5CF6]/20 blur-[60px] rounded-full opacity-40 group-hover:opacity-60 transition-opacity"></div>
          <div className="absolute inset-4 bg-white/5 border border-white/10 rounded-[64px] backdrop-blur-2xl shadow-inner group-hover:rotate-6 transition-transform duration-1000"></div>
          <div className="relative w-full h-full bg-[#0B0B0E]/80 border border-white/10 rounded-[64px] shadow-2xl flex flex-col items-center justify-center group-hover:-rotate-3 transition-transform duration-1000 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent)]"></div>
            <Rocket className="w-48 h-48 text-[#3B82F6] opacity-30 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 filter drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]" />
            <div className="absolute bottom-10 right-10 opacity-20">
              <LayoutGrid className="w-20 h-20 text-white animate-spin-slow" />
            </div>
          </div>
        </div>
      </div>

      {/* Module 1 */}
      <div className="w-full mb-28 relative">
        <div className="flex items-center gap-6 mb-16 relative">
          <div className="flex items-center gap-4">
            <div className="w-2 h-10 bg-gradient-to-b from-[#3B82F6] to-transparent"></div>
            <h2 className="text-3xl font-black text-white tracking-tighter uppercase leading-none">Módulo 1</h2>
          </div>
          <div className="flex items-center gap-4 border-l border-white/10 pl-6 pt-1">
            <div className="w-1.5 h-1.5 bg-[#3B82F6] rounded-full animate-pulse"></div>
            <span className="text-[11px] font-black text-[#8d8d99] uppercase tracking-[0.4em]">Active Learning Path</span>
          </div>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-white/10 to-transparent ml-4"></div>
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
      <div className="w-full mb-32 relative">
        <div className="flex items-center gap-6 mb-16 relative">
          <div className="flex items-center gap-4">
            <div className="w-2 h-10 bg-gradient-to-b from-[#8B5CF6] to-transparent"></div>
            <h2 className="text-3xl font-black text-white tracking-tighter uppercase leading-none">Módulo 2</h2>
          </div>
          <div className="flex items-center gap-4 border-l border-white/10 pl-6 pt-1">
            <div className="w-1.5 h-1.5 bg-[#8B5CF6] rounded-full animate-pulse"></div>
            <span className="text-[11px] font-black text-[#8d8d99] uppercase tracking-[0.4em]">Expansion Vectors</span>
          </div>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-white/10 to-transparent ml-4"></div>
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

      {/* Support Section - FLAGSHIP STANDARD */}
      <div className="w-full relative bg-[#0B0B0E]/60 backdrop-blur-3xl border border-white/10 rounded-[32px] md:rounded-[64px] p-6 md:p-12 lg:p-20 overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 group">
        <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/5 to-transparent pointer-events-none"></div>
        <div className="absolute -right-40 bottom-0 w-[500px] h-[500px] bg-[#8B5CF6]/5 blur-[120px] rounded-full pointer-events-none group-hover:bg-[#8B5CF6]/10 transition-colors"></div>

        <div className="flex flex-col items-center md:items-start text-center md:text-left z-10 w-full lg:max-w-lg">
          <div className="flex items-center gap-2 md:gap-3 px-4 md:px-5 py-2 bg-white/5 border border-white/10 rounded-full text-[8px] md:text-[9px] font-black text-[#8B5CF6] uppercase tracking-[0.2em] md:tracking-[0.3em] mb-6 md:mb-10 shadow-lg">
            <Star className="w-2.5 h-2.5 md:w-3 md:h-3" />
            Knowledge Support Matrix
          </div>
          <h3 className="text-4xl sm:text-5xl md:text-[64px] font-black text-white tracking-tighter leading-[0.85] mb-6 md:mb-10 uppercase">
            Dúvidas ou <br />
            <span className="bg-gradient-to-r from-[#3B82F6] to-[#d946ef] bg-clip-text text-transparent break-words">Dificuldades?</span>
          </h3>
          <p className="text-[#8d8d99] text-sm sm:text-base md:text-lg font-medium opacity-80 leading-relaxed pl-4 md:pl-6 border-l-2 border-white/10 group-hover:border-[#8B5CF6]/30 transition-colors">
            Nossa equipe de especialistas está operando em <span className="text-white">synch-time</span> para destravar seus resultados.
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-10 z-10 w-full md:w-auto">
          <button className="relative group/mail h-20 w-full md:w-[320px] rounded-2xl overflow-hidden transition-all hover:scale-[1.03] active:scale-95 shadow-3xl">
            <div className="absolute inset-0 bg-[#3B82F6] shadow-[0_20px_50px_rgba(59,130,246,0.4)]"></div>
            <div className="absolute inset-0 bg-black translate-y-full group-hover/mail:translate-y-0 transition-transform duration-500"></div>
            <div className="relative h-full flex items-center justify-center gap-4 px-10">
              <Mail className="w-6 h-6 text-white" />
              <span className="text-sm font-black text-white uppercase tracking-[0.2em]">Contatar Suporte</span>
            </div>
          </button>

          <div className="flex flex-col items-center md:items-end gap-2 px-4 py-2 bg-white/5 border border-white/5 rounded-2xl backdrop-blur-md">
            <span className="text-[10px] font-black text-[#5b5b7b] uppercase tracking-[0.4em] opacity-40">Direct Intelligence Channel</span>
            <span className="text-[10px] md:text-[11px] font-black text-white/80 uppercase tracking-[0.1em] md:tracking-[0.3em] overflow-hidden truncate max-w-[280px] md:max-w-none">VIRALPULSE.SUPORTE@GMAIL.COM</span>
          </div>
        </div>
      </div>

      <div className="h-24"></div>
    </main>
  );
};

const AcademyCard: React.FC<{ title: string, description: string, isHighlighted?: boolean, onClick?: () => void }> = ({ title, description, isHighlighted, onClick }) => (
  <div
    onClick={onClick}
    className={`relative group h-[260px] md:h-[380px] cursor-pointer rounded-[32px] md:rounded-[48px] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_40px_80px_rgba(0,0,0,0.6)] border transition-all ${isHighlighted ? 'border-[#3B82F6]/30 bg-[#0B0B0E]/60' : 'border-white/5 bg-[#0B0B0E]/40 hover:border-white/10'}`}
  >
    {/* GLASS LAYER */}
    <div className="absolute inset-0 backdrop-blur-3xl"></div>

    {/* SCAN LINE ANIMATION */}
    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#3B82F6] to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[scan-line_3s_linear_infinite] z-20"></div>

    <div className="relative z-10 p-6 md:p-10 h-full flex flex-col justify-between">
      <div className="flex flex-col gap-4 md:gap-8">
        <div className={`w-10 h-10 md:w-16 md:h-16 rounded-[16px] md:rounded-[24px] flex items-center justify-center border transition-all duration-500 shadow-2xl shrink-0 ${isHighlighted ? 'bg-[#3B82F6] border-white/20 text-white rotate-6' : 'bg-white/5 border-white/10 text-[#3B82F6] group-hover:rotate-12 group-hover:bg-[#3B82F6]/10'}`}>
          <FileText className="w-5 h-5 md:w-7 md:h-7" />
        </div>

        <div className="space-y-3 md:space-y-4">
          <div className="flex items-center gap-2 md:gap-3">
            <div className={`w-1 h-5 md:h-6 transition-all duration-500 shrink-0 ${isHighlighted ? 'bg-white' : 'bg-[#3B82F6]/40 group-hover:bg-[#3B82F6]'}`}></div>
            <h4 className="text-[18px] md:text-2xl font-black text-white tracking-tighter leading-tight uppercase group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-all">
              {title}
            </h4>
          </div>
          <p className="text-[#8d8d99] text-xs md:text-sm font-medium leading-relaxed md:leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity pl-3 md:pl-4">
            {description}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-8 border-t border-white/5">
        <div className="flex items-center gap-4">
          <div className="w-2 h-2 rounded-full bg-[#3B82F6] animate-pulse"></div>
          <span className="text-[10px] font-black text-[#5b5b7b] uppercase tracking-[0.3em] group-hover:text-white transition-colors">Acessar Módulo</span>
        </div>
        <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all duration-500 group-hover:scale-110 shadow-xl ${isHighlighted ? 'bg-[#3B82F6] border-white/20 text-white' : 'bg-white/5 border-white/10 text-[#3B82F6] group-hover:bg-[#3B82F6] group-hover:text-white'}`}>
          <ChevronRight className="w-6 h-6" />
        </div>
      </div>
    </div>
  </div>
);

// --- GALERIA AVATARES VIEW ---
const GaleriaAvataresView: React.FC<{ onGoToMyAvatars: () => void; onCreateNew: () => void }> = ({ onGoToMyAvatars, onCreateNew }) => {
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarItem | null>(null);
  const [hoveredAvatarId, setHoveredAvatarId] = useState<string | null>(null);

  const avatars: AvatarItem[] = [
    { id: 'av1', name: 'Ana', role: 'Lifestyle Creator', image: 'https://i.imgur.com/hrGOGFM.png', hoverImage: 'https://www.trendlyai.space/avatars/ana.gif', description: 'Ana é especialista em vlogs de lifestyle e rotina, perfeita para unboxings autênticos.' },
    { id: 'av2', name: 'Fernanda', role: 'Beauty Expert', image: 'https://i.imgur.com/3mnJIzU.png', hoverImage: 'https://www.trendlyai.space/avatars/fernanda.gif', description: 'Fernanda domina o nicho de beleza e maquiagem, trazendo elegância e autoridade.' },
    { id: 'av3', name: 'Carla', role: 'Fashion Specialist', image: 'https://i.imgur.com/gu8PLki.png', hoverImage: 'https://www.trendlyai.space/avatars/carla.gif', description: 'Carla é expert em moda e tendências, ideal para provadores e looks do dia.' },
    { id: 'av4', name: 'Juliana', role: 'Home & Decor', image: 'https://i.imgur.com/gPcVAPz.png', hoverImage: 'https://www.trendlyai.space/avatars/juliana.gif', description: 'Juliana foca em organização e decoração de casa, ideal para utilidades domésticas.' },
    { id: 'av5', name: 'Laura', role: 'Health & Wellness', image: 'https://i.imgur.com/rhvUP8G.png', hoverImage: 'https://www.trendlyai.space/avatars/laura.gif', description: 'Laura traz dicas de saúde e bem-estar, perfeita para produtos naturais e fitness.' },
    { id: 'av6', name: 'Maria', role: 'Daily Vlog', image: 'https://i.imgur.com/6vg7fRq.png', hoverImage: 'https://www.trendlyai.space/avatars/maria.gif', description: 'Maria compartilha sua rotina diária, gerando forte conexão e confiança com o público.' },
    { id: 'av7', name: 'Fábio', role: 'Tech Reviewer', image: 'https://i.imgur.com/5ymF1nv.png', hoverImage: 'https://www.trendlyai.space/avatars/fabio.gif', description: 'Fábio é especialista em reviews de tecnologia e gadgets, com visual moderno e técnico.' },
    { id: 'av8', name: 'Henrique', role: 'Gadget Enthusiast', image: 'https://i.imgur.com/WDsko8P.png', hoverImage: 'https://www.trendlyai.space/avatars/henrique.gif', description: 'Henrique adora testar novidades tecnológicas com um visual despojado e autêntico.' },
    { id: 'av9', name: 'Marcos', role: 'Fitness Coach', image: 'https://i.imgur.com/2NxpAmW.png', hoverImage: 'https://www.trendlyai.space/avatars/marcos.gif', description: 'Marcos é o avatar ideal para suplementos e equipamentos esportivos, transmitindo energia.' },
    { id: 'av10', name: 'Matheus', role: 'Business & Finance', image: 'https://i.imgur.com/8LQB3BC.png', hoverImage: 'https://www.trendlyai.space/avatars/matheus.gif', description: 'Com visual executivo, Matheus é perfeito para cursos, ferramentas SaaS e consultorias.' },
    { id: 'av11', name: 'Miguel', role: 'Cook & Foodie', image: 'https://i.imgur.com/loBeA7L.png', hoverImage: 'https://www.trendlyai.space/avatars/miguel.gif', description: 'Miguel traz autoridade e sabor para reviews de produtos de cozinha e alimentação.' },
    { id: 'av12', name: 'Pedro', role: 'Lifestyle & Travel', image: 'https://i.imgur.com/Bziwg0O.png', hoverImage: 'https://www.trendlyai.space/avatars/pedro.gif', description: 'Pedro foca em lifestyle e viagens, ideal para produtos de uso externo e aventura.' },
  ];

  return (
    <main className="max-w-[1500px] mx-auto px-6 py-12 md:py-16 relative">
      {/* RADICAL ASYMMETRIC HEADER - REFINED SPACING */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-16 relative z-10 bg-[#0B0B0E]/20 backdrop-blur-sm p-8 rounded-[48px] border border-white/5 shadow-2xl">

        {/* LEFT: TYPOGRAPHY SCULPTURE & PULSE */}
        <div className="flex flex-col gap-6 flex-1 min-w-0 lg:min-w-[400px]">
          <div className="relative group">
            {/* ARCHITECTURAL STATUS LINE */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 justify-center lg:justify-start">
              <div className="hidden sm:block h-[1px] w-8 bg-gradient-to-r from-[#3B82F6] to-transparent"></div>
              <span className="text-[9px] font-black text-[#3B82F6] tracking-[0.4em] uppercase">Neural Hub Active</span>
              <div className="flex gap-1 shrink-0">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-1 h-1 bg-[#3B82F6]/40 rounded-full animate-pulse" style={{ animationDelay: `${i * 200}ms` }}></div>
                ))}
              </div>
            </div>

            <div className="relative">
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] select-none text-center lg:text-left pl-1 lg:pl-0">
                <span className="block bg-gradient-to-b from-white to-white/20 bg-clip-text text-transparent">Galeria de</span>
                <span className="block bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#d946ef] bg-clip-text text-transparent">Avatares</span>
              </h1>
            </div>
          </div>

          <p className="text-[#8d8d99] text-sm md:text-base font-medium max-w-sm leading-relaxed border-l border-white/10 pl-4 lg:pl-6 text-center lg:text-left mx-auto lg:mx-0">
            Escolha um avatar profissional ou utilize nossa <span className="text-white">rede neural</span> para sintetizar sua própria identidade digital do zero.
          </p>
        </div>

        {/* RIGHT: ACTION CLUSTER */}
        <div className="flex flex-wrap items-center justify-center lg:justify-end gap-6 flex-[1.2]">
          <button
            onClick={onGoToMyAvatars}
            className="group relative h-16 px-8 rounded-full overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 shadow-2xl"
          >
            <div className="absolute inset-0 rounded-full bg-white/[0.03] backdrop-blur-3xl border border-white/10 transition-colors group-hover:bg-white/[0.08] group-hover:border-white/20"></div>
            <div className="relative z-10 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-[#3B82F6]/30 group-hover:bg-[#3B82F6]/10 transition-all shadow-inner">
                <User className="w-5 h-5 text-[#3B82F6]" />
              </div>
              <div className="flex flex-col items-start gap-0">
                <span className="text-[9px] font-black text-[#5b5b7b] uppercase tracking-[0.25em]">Coleção Privada</span>
                <span className="text-[13px] font-black text-white uppercase tracking-tighter">Meus Avatares</span>
              </div>
              <div className="ml-1 w-6 h-6 bg-[#3B82F6]/20 border border-[#3B82F6]/30 rounded-full flex items-center justify-center backdrop-blur-md">
                <span className="text-[9px] font-black text-[#3B82F6] tabular-nums tracking-tighter">1</span>
              </div>
            </div>
          </button>

          <button
            onClick={onCreateNew}
            className="group relative h-16 px-10 rounded-full overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 shadow-[0_20px_60px_rgba(59,130,246,0.15)]"
          >
            <div className="absolute inset-0 rounded-full bg-[#3B82F6]/10 backdrop-blur-3xl border border-[#3B82F6]/30 group-hover:bg-[#3B82F6]/20 transition-all"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[tech-shimmer_3s_infinite]"></div>

            <div className="relative z-10 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#3B82F6]/20 flex items-center justify-center backdrop-blur-sm border border-white/20 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col items-start gap-0">
                <span className="text-[9px] font-black text-[#3B82F6] uppercase tracking-[0.25em] opacity-80">Rede Neural</span>
                <span className="text-[13px] font-black text-white uppercase tracking-tighter">Criar do Zero</span>
              </div>
            </div>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {avatars.map((avatar) => (
          <div
            key={avatar.id}
            onClick={() => setSelectedAvatar(avatar)}
            onMouseEnter={() => setHoveredAvatarId(avatar.id)}
            onMouseLeave={() => setHoveredAvatarId(null)}
            className="relative aspect-[3/4] md:aspect-[3/4.5] rounded-[24px] md:rounded-[40px] overflow-hidden group cursor-pointer border border-white/5 bg-[#0B0B0E] hover:border-[#3B82F6]/60 transition-all duration-700 shadow-2xl"
          >
            {/* IMAGE CONTAINER WITH PARALLAX-ISH ZOOM */}
            <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-110">
              <img
                src={hoveredAvatarId === avatar.id && avatar.hoverImage ? avatar.hoverImage : avatar.image}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                alt={avatar.name}
              />
            </div>

            {/* SYNERGETIC OVERLAY GRADIENT */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0E] via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>

            {/* GLASS INFO POD */}
            <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6">
              <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-[20px] md:rounded-[30px] p-4 md:p-6 transform transition-all duration-500 group-hover:translate-y-[-10px] group-hover:bg-[#3B82F6]/10 group-hover:border-[#3B82F6]/30">
                <span className="text-xl md:text-2xl font-black text-white tracking-tighter block mb-0.5 md:mb-1 uppercase leading-none">
                  {avatar.name}
                </span>
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-1.5 h-1.5 bg-[#3B82F6] rounded-full animate-pulse shadow-[0_0_8px_#3B82F6]"></div>
                  <span className="text-[9px] md:text-[10px] font-black text-[#8d8d99] uppercase tracking-[0.2em] group-hover:text-white/60 transition-colors">
                    {avatar.role}
                  </span>
                </div>
              </div>
            </div>

            {/* ACTION FLOATING BUTTON */}
            <div className="absolute top-6 right-6 w-12 h-12 bg-white/5 backdrop-blur-xl rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all border border-white/10 translate-y-2 group-hover:translate-y-0 duration-500 group-hover:bg-[#3B82F6]">
              <Plus className="w-6 h-6 text-white" />
            </div>

            {/* SCANNING LINE EFFECT - SUBTLE */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#3B82F6]/20 via-transparent to-transparent h-[10%] w-full -translate-y-full group-hover:animate-[scanline_3s_linear_infinite] pointer-events-none"></div>
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
    <main className="max-w-[1500px] mx-auto px-6 py-12 md:py-16 relative">
      {/* RADICAL ASYMMETRIC HEADER - SYNCED WITH VIRAL SECTIONS */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-16 relative z-10 bg-[#0B0B0E]/30 backdrop-blur-3xl p-6 sm:p-8 md:p-10 rounded-[32px] md:rounded-[48px] border border-white/5 shadow-2xl overflow-hidden">

        {/* LEFT: TYPOGRAPHY SCULPTURE & PULSE */}
        <div className="flex flex-col gap-6 flex-1 min-w-0 lg:min-w-[400px]">
          <div className="relative group">
            {/* ARCHITECTURAL STATUS LINE */}
            <div className="flex items-center gap-4 mb-4">
              <div className="h-[1px] w-8 bg-gradient-to-r from-[#8B5CF6] to-transparent"></div>
              <span className="text-[9px] font-black text-[#8B5CF6] tracking-[0.4em] uppercase">Neural Synthesis Engine</span>
              <div className="flex gap-1">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-1 h-1 bg-[#8B5CF6]/40 rounded-full animate-pulse" style={{ animationDelay: `${i * 200}ms` }}></div>
                ))}
              </div>
            </div>

            <div className="relative">
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] select-none pl-1">
                <span className="block bg-gradient-to-b from-white to-white/20 bg-clip-text text-transparent">Galeria de</span>
                <span className="block bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#d946ef] bg-clip-text text-transparent">Prompts</span>
              </h1>
            </div>
          </div>

          <p className="text-[#8d8d99] text-sm md:text-base font-medium max-w-sm leading-relaxed border-l border-white/10 pl-6">
            Compilado técnico de <span className="text-white">prompts neurais</span> otimizados para materializar estéticas virais de alto impacto.
          </p>
        </div>

        {/* RIGHT: FILTER ACTION CLUSTER (CAPSULE STYLE) */}
        <div className="flex flex-wrap items-center justify-center lg:justify-end gap-4 flex-[0.8]">
          <button
            onClick={() => setActiveTab('todos')}
            className={`group relative h-14 min-w-[160px] px-8 rounded-full overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 shadow-2xl`}
          >
            <div className={`absolute inset-0 rounded-full transition-all duration-500 ${activeTab === 'todos' ? 'bg-[#8B5CF6] shadow-[0_0_30px_rgba(139,92,246,0.3)] border border-white/20' : 'bg-white/[0.03] backdrop-blur-3xl border border-white/10 group-hover:bg-white/[0.08]'}`}></div>
            <div className="relative z-10 flex items-center justify-center gap-3 w-full">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${activeTab === 'todos' ? 'bg-white/20' : 'bg-white/5 border border-white/5 group-hover:border-[#8B5CF6]/30'}`}>
                <Sparkles className={`w-4 h-4 ${activeTab === 'todos' ? 'text-white' : 'text-[#8B5CF6]'}`} />
              </div>
              <span className={`text-xs font-black uppercase tracking-widest ${activeTab === 'todos' ? 'text-white' : 'text-[#8d8d99] group-hover:text-white'}`}>
                Todos
              </span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('favoritos')}
            className={`group relative h-14 min-w-[160px] px-8 rounded-full overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 shadow-2xl`}
          >
            <div className={`absolute inset-0 rounded-full transition-all duration-500 ${activeTab === 'favoritos' ? 'bg-[#3B82F6] shadow-[0_0_30px_rgba(59,130,246,0.3)] border border-white/20' : 'bg-white/[0.03] backdrop-blur-3xl border border-white/10 group-hover:bg-white/[0.08]'}`}></div>
            <div className="relative z-10 flex items-center justify-center gap-3 w-full">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${activeTab === 'favoritos' ? 'bg-white/20' : 'bg-white/5 border border-white/5 group-hover:border-[#3B82F6]/30'}`}>
                <Heart className={`w-4 h-4 ${activeTab === 'favoritos' ? 'text-white' : 'text-[#3B82F6]'}`} />
              </div>
              <span className={`text-xs font-black uppercase tracking-widest ${activeTab === 'favoritos' ? 'text-white' : 'text-[#8d8d99] group-hover:text-white'}`}>
                Favoritos
              </span>
            </div>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {filteredPrompts.map((item) => (
          <div key={item.id} className="relative group bg-[#0B0B0E]/40 backdrop-blur-2xl border border-white/5 rounded-[24px] md:rounded-[40px] overflow-hidden flex flex-col transition-all duration-500 hover:border-[#3B82F6]/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
            <div className="relative aspect-[3/4] md:aspect-[3/4.5] overflow-hidden">
              {item.gif.endsWith('.mp4') ? (
                <video
                  src={item.gif}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              ) : (
                <img
                  src={item.gif}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  alt={item.title}
                />
              )}
              {/* SCAN LINE ANIMATION */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#3B82F6] to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[scan-line_2s_linear_infinite] z-20"></div>

              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0E] via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>

              <button
                onClick={() => toggleFavorite(item.id)}
                className="absolute top-6 right-6 w-12 h-12 bg-black/40 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/10 hover:bg-[#3B82F6] hover:border-[#3B82F6] transition-all duration-300 z-30"
              >
                <Heart className={`w-5 h-5 ${favorites.includes(item.id) ? 'fill-white text-white' : 'text-white'}`} />
              </button>

              <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 z-30">
                <div className="mb-3 md:mb-4">
                  <h3 className="text-lg md:text-xl font-black text-white tracking-tighter mb-0.5 md:mb-1 uppercase line-clamp-2 leading-none">{item.title}</h3>
                  <p className="text-[9px] md:text-[10px] font-black text-[#5b5b7b] uppercase tracking-[0.2em]">{item.description}</p>
                </div>

                <button
                  onClick={() => copyToClipboard(item.id, item.prompt)}
                  className="w-full h-12 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center gap-3 hover:bg-[#3B82F6] hover:border-[#3B82F6] transition-all group/btn shadow-xl"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span className="text-[10px] font-black text-white uppercase tracking-widest">Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[#3B82F6] group-hover/btn:text-white transition-colors" />
                      <span className="text-[10px] font-black text-white uppercase tracking-widest">Copiar Prompt</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="h-24"></div>
    </main>
  );
};

const MeusAvataresView: React.FC<{ avatars: CustomAvatar[]; onAddAvatar: (file: File) => Promise<CustomAvatar | null>; onDeleteAvatar: (id: string) => void; onBack: () => void; onCreateNew: () => void }> = ({ avatars, onAddAvatar, onDeleteAvatar, onBack, onCreateNew }) => {
  const uploadRef = React.useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      await onAddAvatar(file);
      setIsUploading(false);
    }
  };

  const handleDownload = (av: CustomAvatar) => {
    const a = document.createElement('a');
    a.href = av.image;
    a.download = `${av.name}.png`;
    a.click();
  };

  return (
    <main className="max-w-[1500px] mx-auto px-6 py-12 md:py-16 relative">
      <input type="file" ref={uploadRef} className="hidden" accept="image/*" onChange={handleUpload} />

      {/* ARCHITECTURAL HEADER — SYNCED WITH PROJECT PATTERN */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-8 relative z-10 bg-[#0B0B0E]/30 backdrop-blur-3xl p-10 rounded-[48px] border border-white/5 shadow-2xl">

        {/* LEFT: TYPOGRAPHY SCULPTURE */}
        <div className="flex flex-col gap-6 flex-1 min-w-[320px]">
          <div className="relative group">
            {/* STATUS LINE */}
            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-[#5b5b7b] hover:text-white transition-colors text-xs font-black uppercase tracking-widest w-fit group/back"
              >
                <div className="w-6 h-6 bg-white/5 border border-white/10 rounded-full flex items-center justify-center group-hover/back:bg-white/10 transition-all">
                  <ChevronLeft className="w-3 h-3" />
                </div>
                Voltar
              </button>
              <div className="h-[1px] w-6 bg-gradient-to-r from-[#8B5CF6] to-transparent"></div>
              <span className="text-[9px] font-black text-[#8B5CF6] tracking-[0.4em] uppercase">Neural Avatar Studio</span>
              <div className="flex gap-1">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-1 h-1 bg-[#8B5CF6]/40 rounded-full animate-pulse" style={{ animationDelay: `${i * 200}ms` }}></div>
                ))}
              </div>
            </div>

            <div className="relative">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] select-none">
                <span className="block bg-gradient-to-b from-white to-white/20 bg-clip-text text-transparent">Meus</span>
                <span className="block bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#d946ef] bg-clip-text text-transparent">Avatares</span>
              </h1>
            </div>
          </div>

          <p className="text-[#8d8d99] text-sm md:text-base font-medium max-w-sm leading-relaxed border-l border-white/10 pl-6">
            Avatares que você criou do <span className="text-white">zero com IA</span> e as fotos que você fez upload.
          </p>
        </div>

        {/* RIGHT: ACTION CLUSTER (CAPSULE STYLE) */}
        <div className="flex flex-wrap items-center justify-center lg:justify-end gap-4 flex-[0.7]">
          <button
            onClick={() => uploadRef.current?.click()}
            className="group relative h-14 min-w-[180px] px-8 rounded-full overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 shadow-2xl"
          >
            <div className="absolute inset-0 rounded-full transition-all duration-500 bg-white/[0.03] backdrop-blur-3xl border border-white/10 group-hover:bg-white/[0.08]"></div>
            <div className="relative z-10 flex items-center justify-center gap-3 w-full">
              <div className="w-8 h-8 rounded-full flex items-center justify-center transition-all bg-white/5 border border-white/5 group-hover:border-[#8B5CF6]/30">
                <Upload className="w-4 h-4 text-[#8B5CF6]" />
              </div>
              <span className="text-xs font-black uppercase tracking-widest text-[#8d8d99] group-hover:text-white transition-colors">
                Upload de Foto
              </span>
            </div>
          </button>

          <button
            onClick={onCreateNew}
            className="group relative h-14 min-w-[180px] px-8 rounded-full overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 shadow-2xl"
          >
            <div className="absolute inset-0 rounded-full transition-all duration-500 bg-[#3B82F6] shadow-[0_0_30px_rgba(59,130,246,0.3)] border border-white/20"></div>
            <div className="relative z-10 flex items-center justify-center gap-3 w-full">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/20">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs font-black uppercase tracking-widest text-white">
                Criar Novo
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* CONTENT */}
      {avatars.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {avatars.map((av) => (
            <div key={av.id} className="relative group/av bg-[#0B0B0E]/40 backdrop-blur-2xl border border-white/5 rounded-[24px] md:rounded-[40px] overflow-hidden flex flex-col transition-all duration-500 hover:border-[#3B82F6]/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
              <div className="relative aspect-[3/4] md:aspect-[3/4.5] overflow-hidden">
                <img src={av.image} className="w-full h-full object-cover transition-transform duration-700 group-hover/av:scale-110" alt={av.name} />

                {/* SCAN LINE ANIMATION */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#3B82F6] to-transparent opacity-0 group-hover/av:opacity-100 group-hover/av:animate-[scan-line_2s_linear_infinite] z-20"></div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0E] via-[#0B0B0E]/20 to-transparent opacity-80 group-hover/av:opacity-60 transition-opacity"></div>

                {/* ACTION BUTTONS ON HOVER */}
                <div className="absolute top-5 right-5 left-5 flex justify-between items-start opacity-0 group-hover/av:opacity-100 transition-all duration-300 z-30">
                  <button
                    onClick={() => handleDownload(av)}
                    className="w-10 h-10 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center hover:bg-[#3B82F6] hover:border-[#3B82F6] transition-all hover:scale-110 shadow-xl"
                    title="Baixar"
                  >
                    <Download className="w-4 h-4 text-white" />
                  </button>
                  <button
                    onClick={() => onDeleteAvatar(av.id)}
                    className="w-10 h-10 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center hover:bg-red-500 hover:border-red-500 transition-all hover:scale-110 shadow-xl"
                    title="Excluir"
                  >
                    <Trash2 className="w-4 h-4 text-white" />
                  </button>
                </div>

                {/* AVATAR NAME BADGE */}
                <div className="absolute bottom-6 left-5 right-5 z-30">
                  <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-3">
                    <h3 className="text-sm font-black text-white tracking-tighter uppercase truncate">{av.name}</h3>
                    <span className="text-[9px] font-black text-[#3B82F6] uppercase tracking-[0.2em]">Avatar IA</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* ── PREMIUM EMPTY STATE ── */
        <div className="flex flex-col items-center justify-center pt-0 pb-10">
          <div className="w-full max-w-3xl bg-[#0B0B0E]/30 backdrop-blur-3xl border border-white/5 rounded-[48px] p-12 md:p-20 flex flex-col items-center text-center shadow-2xl relative overflow-hidden">

            {/* BACKGROUND GLOW */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#3B82F6]/5 rounded-full blur-[80px]"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-[#8B5CF6]/8 rounded-full blur-[40px]"></div>
            </div>

            {/* ANIMATED ICON */}
            <div className="relative mb-10 z-10">
              <div className="w-36 h-36 rounded-full border border-[#3B82F6]/10 flex items-center justify-center animate-pulse" style={{ animationDuration: '3s' }}>
                <div className="w-24 h-24 rounded-full border border-[#8B5CF6]/20 flex items-center justify-center animate-pulse" style={{ animationDuration: '2s', animationDelay: '0.5s' }}>
                  <div className="w-16 h-16 bg-[#14151a] border border-[#1e1f26] rounded-full flex items-center justify-center shadow-2xl">
                    <User className="w-7 h-7 text-[#5b5b7b]" />
                  </div>
                </div>
              </div>
              <div className="absolute top-2 right-4 w-2 h-2 bg-[#3B82F6]/50 rounded-full animate-ping" style={{ animationDuration: '2s' }}></div>
              <div className="absolute bottom-4 left-3 w-1.5 h-1.5 bg-[#8B5CF6]/50 rounded-full animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.7s' }}></div>
            </div>

            {/* BADGE */}
            <div className="flex items-center gap-2 mb-6 z-10">
              <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#3B82F6]"></div>
              <span className="text-[9px] font-black text-[#3B82F6] tracking-[0.4em] uppercase px-3 py-1.5 rounded-full border border-[#3B82F6]/20 bg-[#3B82F6]/5">Neural Ready</span>
              <div className="h-[1px] w-8 bg-gradient-to-r from-[#3B82F6] to-transparent"></div>
            </div>

            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-4 z-10">
              Nenhum avatar ainda
            </h2>

            <p className="text-[#8d8d99] text-base font-medium mb-14 max-w-[380px] leading-relaxed z-10">
              Faça <span className="text-white font-black">upload de uma foto</span> sua ou gere um avatar <span className="text-[#3B82F6] font-black">hiper-realista com IA</span>.
            </p>

            {/* ACTION CARDS */}
            <div className="flex flex-col sm:flex-row items-stretch gap-6 w-full max-w-xl z-10">
              <button
                onClick={() => uploadRef.current?.click()}
                className="group flex-1 bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-white/20 rounded-[28px] p-8 flex flex-col items-center gap-4 transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] backdrop-blur-xl"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#14151a] border border-white/10 flex items-center justify-center group-hover:border-[#8B5CF6]/30 transition-all group-hover:shadow-[0_0_20px_rgba(139,92,246,0.1)]">
                  <Upload className="w-6 h-6 text-[#8B5CF6] group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-center">
                  <span className="block text-sm font-black text-white uppercase tracking-widest mb-1">Upload de Foto</span>
                  <span className="text-[10px] text-[#5b5b7b] font-medium">PNG, JPG, WEBP</span>
                </div>
              </button>

              <div className="flex sm:flex-col items-center justify-center gap-2 shrink-0">
                <div className="h-[1px] w-6 sm:h-6 sm:w-[1px] bg-white/10"></div>
                <span className="text-[10px] font-black text-[#5b5b7b] uppercase tracking-widest">ou</span>
                <div className="h-[1px] w-6 sm:h-6 sm:w-[1px] bg-white/10"></div>
              </div>

              <button
                onClick={onCreateNew}
                className="group flex-1 bg-[#3B82F6]/10 hover:bg-[#3B82F6]/15 border border-[#3B82F6]/20 hover:border-[#3B82F6]/40 rounded-[28px] p-8 flex flex-col items-center gap-4 transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] backdrop-blur-xl hover:shadow-[0_10px_40px_rgba(59,130,246,0.1)]"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#3B82F6]/20 border border-[#3B82F6]/30 flex items-center justify-center group-hover:shadow-[0_0_25px_rgba(59,130,246,0.25)] transition-all">
                  <Sparkles className="w-6 h-6 text-[#3B82F6] group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-center">
                  <span className="block text-sm font-black text-white uppercase tracking-widest mb-1">Criar com IA</span>
                  <span className="text-[10px] text-[#3B82F6]/70 font-medium">Hiper-realista</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

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
              <Sparkles className="w-6 h-6 md:w-7 md:h-7 text-[#3B82F6] fill-[#3B82F6]" />
              <h1 className="text-2xl md:text-[34px] font-black text-white tracking-tighter">Crie seu Avatar</h1>
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
              Nós criamos o prompt fotorrealista perfeito. Basta colar no Grok, gerar a imagem e trazer de volta para o Viralpulse.
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
