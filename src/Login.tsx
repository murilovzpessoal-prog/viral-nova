import React, { useState } from 'react';
import { supabase } from './lib/supabase';
import { Mail, Lock, ArrowRight, Loader2, Sparkles } from 'lucide-react';

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
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro ao tentar fazer login.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] relative flex flex-col items-center justify-center font-sans select-none overflow-hidden selection:bg-[#00F0FF]/30">
      
      {/* Animated Ambient Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#7B00FF]/20 blur-[120px] rounded-full mix-blend-screen opacity-50 animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-[#00F0FF]/20 blur-[120px] rounded-full mix-blend-screen opacity-50 animate-pulse" style={{ animationDuration: '12s' }} />
        <div className="absolute top-[40%] left-[40%] w-[30vw] h-[30vw] bg-[#FF007F]/10 blur-[100px] rounded-full mix-blend-screen opacity-30" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[420px] px-6 flex flex-col items-center">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="mb-6 relative group">
            <div className="absolute inset-0 bg-[#00F0FF] blur-[30px] opacity-20 group-hover:opacity-40 transition-opacity duration-500 rounded-full" />
            <img src="/logo.png" alt="Viralpulse Logo" className="w-[84px] h-[84px] object-contain relative drop-shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-transform duration-500 group-hover:scale-105" />
          </div>
          <div className="text-center space-y-3">
            <h1 className="text-[32px] font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/60 tracking-tight">Viralpulse</h1>
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-[#00F0FF]" />
              <p className="text-[#A1A1AA] text-[15px] font-medium tracking-wide">Faça login para continuar</p>
            </div>
          </div>
        </div>

        {/* Premium Glass Login Card */}
        <div className="w-full bg-[#09090B]/60 border border-white/10 backdrop-blur-2xl rounded-[32px] p-8 md:p-10 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative animate-in fade-in zoom-in-95 duration-500 delay-150 fill-mode-both before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/10 before:to-transparent before:rounded-[32px] before:pointer-events-none group/card hover:border-[#00F0FF]/30 transition-colors duration-500">
          
          <form onSubmit={handleLogin} className="space-y-6 relative z-10">
            
            {/* Error Display */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-4 rounded-2xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 animate-pulse shrink-0"></div>
                <p className="font-medium leading-snug">{error}</p>
              </div>
            )}

            <div className="space-y-5">
              <div className="space-y-2 group">
                <label className="text-[11px] font-bold text-[#A1A1AA] uppercase tracking-[0.15em] ml-1">E-mail</label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-4 w-5 h-5 text-[#52525B] group-focus-within:text-[#00F0FF] transition-colors z-10" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-[15px] text-[#F4F4F5] placeholder:text-[#52525B] focus:outline-none focus:border-[#00F0FF]/50 focus:ring-1 focus:ring-[#00F0FF]/50 transition-all font-medium relative z-0 shadow-inner"
                  />
                </div>
              </div>

              <div className="space-y-2 group">
                <div className="flex items-center justify-between ml-1">
                  <label className="text-[11px] font-bold text-[#A1A1AA] uppercase tracking-[0.15em]">Senha</label>
                  <a href="#" className="flex hover:underline text-[12px] font-bold text-[#00F0FF] hover:text-white transition-colors">Esqueceu?</a>
                </div>
                <div className="relative flex items-center">
                  <Lock className="absolute left-4 w-5 h-5 text-[#52525B] group-focus-within:text-[#00F0FF] transition-colors z-10" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-[15px] text-[#F4F4F5] placeholder:text-[#52525B] focus:outline-none focus:border-[#00F0FF]/50 focus:ring-1 focus:ring-[#00F0FF]/50 transition-all font-medium relative font-mono tracking-widest z-0 shadow-inner"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full relative group mt-8 flex items-center justify-center gap-2 bg-gradient-to-r from-[#00F0FF] to-[#7B00FF] hover:opacity-90 text-white py-[18px] rounded-2xl font-black text-[13px] uppercase tracking-[0.15em] transition-all active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none overflow-hidden shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)]"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin relative z-10" />
                  <span className="relative z-10">Conectando...</span>
                </>
              ) : (
                <>
                  <span className="relative z-10">Entrar na Plataforma</span>
                  <ArrowRight className="w-[18px] h-[18px] relative z-10 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

        </div>

        {/* Footer info */}
        <div className="mt-8 text-center animate-in fade-in duration-700 delay-300 fill-mode-both">
          <p className="text-[13px] text-[#52525B] font-medium">
            Acesso restrito. <a href="#" className="text-[#A1A1AA] hover:text-white font-bold transition-colors">Fale com o suporte.</a>
          </p>
        </div>
      </div>
    </div>
  );
};
