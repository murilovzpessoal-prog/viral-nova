import React, { useState } from 'react';
import { supabase } from './lib/supabase';
import { Mail, Lock, Sparkles, ArrowRight, Loader2 } from 'lucide-react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        if (authError.message === 'Invalid login credentials') {
          throw new Error('Email ou senha incorretos.');
        }
        throw authError;
      }
      // Reload is handled by the App wrapper which is listening to session state
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro ao tentar fazer login.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0E0E11] relative flex flex-col items-center justify-center font-sans select-none overflow-hidden">
      
      {/* Background radial soft glow behind the logo */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#B026FF]/[0.05] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[400px] px-6 flex flex-col items-center">
        
        {/* Logo & Header */}
        <div className="flex flex-col items-center mb-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="mb-4">
            <img src="/logo.png" alt="Viralpulse Logo" className="w-[72px] h-[72px] object-contain drop-shadow-[0_0_15px_rgba(176,38,255,0.3)]" />
          </div>
          <div className="text-center space-y-2">
            <h1 className="text-[28px] font-black text-[#F4F4F5] tracking-tight">Viralpulse</h1>
            <p className="text-[#A1A1AA] text-[15px] font-medium tracking-wide">Acesse sua conta para continuar</p>
          </div>
        </div>

        {/* Login Card */}
        <div className="w-full bg-[#121216] border border-[#27272A] rounded-[32px] p-8 md:p-10 shadow-2xl relative animate-in fade-in zoom-in-95 duration-500 delay-150 fill-mode-both">
          
          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-4 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"></div>
                <p className="font-medium">{error}</p>
              </div>
            )}

            <div className="space-y-5">
              <div className="space-y-2 group">
                <label className="text-[12px] font-bold text-[#A1A1AA] uppercase tracking-[0.1em] ml-1">E-mail</label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-4 w-5 h-5 text-[#52525B] group-focus-within:text-[#B026FF] transition-colors z-10" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    className="w-full bg-[#09090B] border border-[#27272A] rounded-2xl py-4 pl-12 pr-4 text-[15px] text-[#F4F4F5] placeholder:text-[#52525B] focus:outline-none focus:border-[#B026FF] focus:ring-1 focus:ring-[#B026FF] transition-all font-medium relative z-0"
                  />
                </div>
              </div>

              <div className="space-y-2 group">
                <div className="flex items-center justify-between ml-1">
                  <label className="text-[12px] font-bold text-[#A1A1AA] uppercase tracking-[0.1em]">Senha</label>
                  <a href="#" className="flex hover:underline text-[12px] font-bold text-[#A855F7] hover:text-[#C084FC] transition-colors">Esqueceu?</a>
                </div>
                <div className="relative flex items-center">
                  <Lock className="absolute left-4 w-5 h-5 text-[#52525B] group-focus-within:text-[#B026FF] transition-colors z-10" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#09090B] border border-[#27272A] rounded-2xl py-4 pl-12 pr-4 text-[15px] text-[#F4F4F5] placeholder:text-[#52525B] focus:outline-none focus:border-[#B026FF] focus:ring-1 focus:ring-[#B026FF] transition-all font-medium relative font-mono tracking-widest z-0"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full relative group mt-8 flex items-center justify-center gap-2 bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] hover:opacity-90 text-white py-[18px] rounded-2xl font-black text-[13px] uppercase tracking-[0.15em] transition-all active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none overflow-hidden"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Conectando...
                </>
              ) : (
                <>
                  Entrar na Plataforma
                  <ArrowRight className="w-[18px] h-[18px]" />
                </>
              )}
            </button>
          </form>

        </div>

        {/* Footer info */}
        <div className="mt-8 text-center animate-in fade-in duration-700 delay-300 fill-mode-both">
          <p className="text-[13px] text-[#5b5b7b] font-medium">
            Não tem uma conta? <a href="#" className="text-white hover:text-[#8B5CF6] font-bold transition-colors">Fale com o suporte.</a>
          </p>
        </div>
      </div>
    </div>
  );
};
