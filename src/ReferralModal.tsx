import React, { useState } from 'react';
import { X, Sparkles, TrendingUp, Trophy, ArrowLeft, Zap, BadgePercent, Ticket, Crown, MessageSquare } from 'lucide-react';

type ReferralView = 'selection' | 'profit' | 'promo';

interface ReferralModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail?: string;
}

export function ReferralModal({ isOpen, onClose, userEmail }: ReferralModalProps) {
  const [view, setView] = useState<ReferralView>('selection');
  const [generatedCoupon, setGeneratedCoupon] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleClose = () => {
    setView('selection'); // reset view when closing
    setGeneratedCoupon(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={handleClose}
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-[#0b0c10] border border-white/10 rounded-[32px] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        
        {view === 'selection' && (
          <>
            {/* Top Gradient Area */}
            <div className="relative p-8 pb-10 bg-gradient-to-b from-[#FF007F]/20 to-transparent border-b border-white/5">
              {/* Close Button */}
              <button 
                onClick={handleClose}
                className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
                <Sparkles className="w-4 h-4 text-[#FF007F]" />
                <span className="text-xs font-medium text-white/90">Escolha como quer indicar</span>
              </div>

              {/* Title */}
              <h2 className="text-4xl text-white mb-2 tracking-tight">
                Indique <span className="font-bold">amigos</span>
              </h2>
              <p className="text-[#8d8d99] text-base">
                e escolha o que faz mais sentido para você
              </p>
            </div>

            {/* Options Area */}
            <div className="p-8">
              <h3 className="text-xs font-bold text-[#8d8d99] uppercase tracking-wider mb-4">
                Como você quer indicar?
              </h3>

              <div className="flex flex-col gap-4">
                {/* Option 1 */}
                <div 
                  onClick={() => setView('profit')}
                  className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#FF007F]/50 hover:bg-white/10 transition-all cursor-pointer overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FF007F]/0 via-[#FF007F]/0 to-[#FF007F]/0 group-hover:via-[#FF007F]/5 opacity-50 transition-all" />
                  <div className="relative flex items-start gap-5">
                    <div className="w-14 h-14 rounded-full bg-[#FF007F]/20 border border-[#FF007F]/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(255,0,127,0.2)] group-hover:shadow-[0_0_25px_rgba(255,0,127,0.4)]">
                      <TrendingUp className="w-6 h-6 text-[#FF007F]" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-1 group-hover:text-[#FF007F] transition-colors">
                        Quero lucrar com a indicação
                      </h4>
                      <p className="text-sm text-[#8d8d99] leading-relaxed">
                        Você recebe <strong className="text-white font-semibold">50% do valor da compra</strong> em comissão a cada venda realizada com o seu cupom.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Option 2 */}
                <div 
                  onClick={() => setView('promo')}
                  className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#00F0FF]/50 hover:bg-white/10 transition-all cursor-pointer overflow-hidden mt-2"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00F0FF]/0 via-[#00F0FF]/0 to-[#00F0FF]/0 group-hover:via-[#00F0FF]/5 opacity-50 transition-all" />
                  <div className="relative flex items-start gap-5">
                    <div className="w-14 h-14 rounded-full bg-[#00F0FF]/20 border border-[#00F0FF]/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(0,240,255,0.2)] group-hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] mt-4">
                      <Trophy className="w-6 h-6 text-[#00F0FF]" />
                    </div>
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/20 mb-3">
                        <span className="text-[10px] font-bold text-[#00F0FF] tracking-wider uppercase">🏆 Edição Copa</span>
                      </div>
                      <h4 className="text-lg font-bold text-white mb-1 group-hover:text-[#00F0FF] transition-colors">
                        Promoção Copa: presenteie um craque
                      </h4>
                      <p className="text-sm text-[#8d8d99] leading-relaxed">
                        Seu amigo recebe <strong className="text-white font-semibold">créditos infinitos</strong> dentro da ferramenta + <strong className="text-white font-semibold">50% de desconto</strong> na compra. Você abre mão da recompensa em favor dele.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {view === 'profit' && (
          <>
            {/* Top Gradient Area */}
            <div className="relative p-8 pb-10 bg-gradient-to-b from-[#FF007F]/20 to-transparent border-b border-white/5">
              {/* Close Button */}
              <button 
                onClick={handleClose}
                className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
                <Sparkles className="w-4 h-4 text-[#FF007F]" />
                <span className="text-xs font-medium text-white/90">Ganhe 50% por venda</span>
              </div>

              {/* Title */}
              <h2 className="text-4xl text-white mb-2 tracking-tight">
                Indique <span className="font-bold">amigos</span>
              </h2>
              <p className="text-[#8d8d99] text-base">
                e lucre com cada venda realizada
              </p>
            </div>

            <div className="p-8">
              {/* Back Button */}
              <button 
                onClick={() => setView('selection')}
                className="flex items-center gap-2 text-sm text-[#8d8d99] hover:text-white transition-colors mb-6 -mt-2 group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Trocar modo
              </button>

              <h3 className="text-xs font-bold text-[#8d8d99] uppercase tracking-wider mb-6">
                Como Funciona
              </h3>

              <div className="flex flex-col gap-6 mb-8">
                {/* Step 1 */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <Zap className="w-5 h-5 text-[#FF007F]" />
                  </div>
                  <p className="text-white text-base">
                    Compartilhe seu cupom de parceiro com quem quiser
                  </p>
                </div>
                
                {/* Step 2 */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <BadgePercent className="w-5 h-5 text-[#00F0FF]" />
                  </div>
                  <p className="text-white text-base leading-relaxed">
                    Seu amigo aplica o cupom no checkout e fecha a assinatura normalmente
                  </p>
                </div>

                {/* Step 3 */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-5 h-5 text-[#FF007F]" />
                  </div>
                  <p className="text-white text-base">
                    Você recebe <strong className="font-bold">50% do valor da compra</strong> em comissão
                  </p>
                </div>
              </div>

              {/* Coupon Info Card */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Ticket className="w-5 h-5 text-[#00F0FF]" />
                  <h4 className="text-white font-semibold text-lg">Seu cupom de parceiro</h4>
                </div>
                <p className="text-[#8d8d99] text-base leading-relaxed">
                  Seu cupom ainda não foi configurado. Acesse o painel de Parceiros para criar o seu.
                </p>
              </div>

            </div>
          </>
        )}

        {view === 'promo' && (
          <>
            {/* Top Gradient Area */}
            <div className="relative p-8 pb-10 bg-gradient-to-b from-[#00F0FF]/20 to-transparent border-b border-white/5">
              {/* Close Button */}
              <button 
                onClick={handleClose}
                className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
                <Sparkles className="w-4 h-4 text-[#00F0FF]" />
                <Trophy className="w-3.5 h-3.5 text-[#FF007F]" />
                <span className="text-xs font-medium text-white/90">Promoção da Copa</span>
              </div>

              {/* Title */}
              <h2 className="text-4xl text-white mb-2 tracking-tight">
                Indique <span className="font-bold">amigos</span>
              </h2>
              <p className="text-[#8d8d99] text-base">
                presenteie um craque com créditos infinitos
              </p>
            </div>

            <div className="p-8">
              {/* Back Button */}
              <button 
                onClick={() => setView('selection')}
                className="flex items-center gap-2 text-sm text-[#8d8d99] hover:text-white transition-colors mb-6 -mt-2 group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Trocar modo
              </button>

              <h3 className="text-xs font-bold text-[#8d8d99] uppercase tracking-wider mb-6">
                Como Funciona
              </h3>

              <div className="flex flex-col gap-6 mb-8">
                {/* Step 1 */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/20 flex items-center justify-center shrink-0">
                    <Crown className="w-5 h-5 text-[#00F0FF]" />
                  </div>
                  <p className="text-[#8d8d99] text-base leading-relaxed">
                    Seu amigo desbloqueia <strong className="font-bold text-white">créditos infinitos</strong> na ferramenta + <strong className="font-bold text-white">50% de desconto</strong> na compra
                  </p>
                </div>
                
                {/* Step 2 */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5 text-[#FF007F]" />
                  </div>
                  <p className="text-[#8d8d99] text-base leading-relaxed">
                    Você abre mão da recompensa — todos os benefícios vão para o novo usuário
                  </p>
                </div>
              </div>

              {/* Coupon Info Card */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Trophy className="w-5 h-5 text-[#00F0FF]" />
                  <h4 className="text-white font-semibold text-lg">Cupom presente da Copa</h4>
                </div>
                <p className="text-[#8d8d99] text-sm leading-relaxed mb-6">
                  Cada cupom dá ao seu amigo <strong className="text-white">créditos infinitos</strong> + <strong className="text-white">50% de desconto</strong>. {userEmail?.trim().toLowerCase() === 'tst@gmail.com' ? <span className="text-white">Gere seu cupom agora e compartilhe com até 10 pessoas, vagas limitadas.</span> : 'Escolha de 1 a 10 usos e gere o cupom abaixo.'}
                </p>

                {userEmail?.trim().toLowerCase() === 'tst@gmail.com' ? (
                  generatedCoupon ? (
                    <div className="bg-[#0b0c10]/50 border border-white/5 rounded-xl p-5 text-center flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300">
                      <p className="text-[#00F0FF] text-xs font-semibold uppercase tracking-wider mb-3">Seu cupom está pronto!</p>
                      <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-lg flex items-center gap-3 w-full max-w-[280px] justify-between">
                        <span className="text-white font-mono text-xl font-bold tracking-widest">{generatedCoupon}</span>
                        <button className="p-2 hover:bg-white/10 rounded-md transition-colors text-white/70 hover:text-white" title="Copiar">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-[#0b0c10]/50 border border-white/5 rounded-xl p-6 text-center flex flex-col items-center justify-center animate-in fade-in duration-300">
                      <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                        <Ticket className="w-6 h-6 text-white/70" />
                      </div>
                      <p className="text-white text-sm font-medium mb-1">Você ainda não tem um cupom presente.</p>
                      <p className="text-[#8d8d99] text-xs mb-5">Gere um agora para presentear seus amigos.</p>
                      <button 
                        onClick={() => setGeneratedCoupon(Math.random() > 0.5 ? 'COPA' : 'LIVE')}
                        className="bg-white text-black hover:bg-white/90 px-6 py-2.5 rounded-lg font-semibold text-sm transition-colors w-full max-w-[200px] flex items-center justify-center gap-2"
                      >
                        <Sparkles className="w-4 h-4" />
                        Gerar Cupom
                      </button>
                    </div>
                  )
                ) : (
                  <div className="bg-[#0b0c10]/50 border border-white/5 rounded-xl p-5 text-center">
                    <p className="text-white text-sm mb-1">Você ainda não tem um cupom presente configurado.</p>
                    <p className="text-[#8d8d99] text-xs">Acesse o painel de Parceiros para criar o seu, ou peça à equipe ViralPulse.</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
