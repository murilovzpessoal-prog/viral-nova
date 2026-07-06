import re

with open('App.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# The entire ConfiguracoesView text to replace:
original_view = """const ConfiguracoesView: React.FC<ConfiguracoesViewProps> = ({ profileImage, userEmail, userName, onImageUpload, onLogout }) => {
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
          className="w-28 h-28 bg-gradient-to-br from-[#D946EF] to-[#d946ef] rounded-full flex items-center justify-center text-4xl font-black text-white shadow-[0_0_40px_rgba(139,92,246,0.3)] mb-8 relative group cursor-pointer overflow-hidden border-4 border-white/10 backdrop-blur-xl transition-all hover:scale-105 active:scale-95"
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
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#D946EF]/50 to-transparent"></div>
          <div className="flex items-center gap-4 mb-10">
            <div className="w-10 h-10 rounded-2xl bg-[#D946EF]/10 flex items-center justify-center">
              <User className="w-5 h-5 text-[#D946EF]" />
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
                    defaultValue={userName || ""}
                    className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-5 px-6 text-[15px] text-white focus:outline-none focus:border-[#D946EF]/40 focus:ring-4 focus:ring-[#8B5CF6]/10 transition-all font-medium"
                  />
                </div>
                <button className="px-8 py-5 bg-white/[0.03] border border-white/10 text-white rounded-2xl text-[13px] font-black uppercase tracking-widest hover:bg-[#D946EF] hover:border-[#D946EF] transition-all hover:shadow-[0_0_20px_rgba(139,92,246,0.2)] w-full sm:w-auto">
                  {t('editar')}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <label className="text-[11px] font-black text-[#8d8d99] uppercase tracking-widest leading-none ml-1">{t('email')}</label>
              <div className="relative">
                <input
                  type="email"
                  defaultValue={userEmail || ""}
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

            <button className="w-full bg-gradient-to-r from-[#D946EF] to-[#d946ef] hover:scale-[1.02] text-white py-5 rounded-2xl font-black text-[15px] uppercase tracking-widest transition-all shadow-[0_10px_30px_rgba(139,92,246,0.3)] active:scale-[0.98]">
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
};"""

new_view = """const ConfiguracoesView: React.FC<ConfiguracoesViewProps> = ({ profileImage, userEmail, userName, onImageUpload, onLogout }) => {
  const { t } = useTranslation();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [nameValue, setNameValue] = useState(userName || "");
  const [isSaving, setIsSaving] = useState(false);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      await onImageUpload(file);
      setIsUploading(false);
    }
  };

  const handleSaveName = async () => {
    if (!nameValue.trim() || nameValue === userName) return;
    setIsSaving(true);
    try {
      const { error } = await supabase.auth.updateUser({
        data: { full_name: nameValue, first_name: nameValue.split(' ')[0], name: nameValue }
      });
      if (error) throw error;
      alert("Nome atualizado com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar o nome.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="max-w-[800px] mx-auto px-6 py-10 md:py-16 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex flex-col items-center mb-12">
        <div
          onClick={() => !isUploading && fileInputRef.current?.click()}
          className="w-28 h-28 bg-gradient-to-br from-[#D946EF] to-[#d946ef] rounded-full flex items-center justify-center text-4xl font-black text-white shadow-[0_0_40px_rgba(139,92,246,0.3)] mb-8 relative group cursor-pointer overflow-hidden border-4 border-white/10 backdrop-blur-xl transition-all hover:scale-105 active:scale-95"
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
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#D946EF]/50 to-transparent"></div>
          <div className="flex items-center gap-4 mb-10">
            <div className="w-10 h-10 rounded-2xl bg-[#D946EF]/10 flex items-center justify-center">
              <User className="w-5 h-5 text-[#D946EF]" />
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
                    value={nameValue}
                    onChange={(e) => setNameValue(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-5 px-6 text-[15px] text-white focus:outline-none focus:border-[#D946EF]/40 focus:ring-4 focus:ring-[#8B5CF6]/10 transition-all font-medium"
                  />
                </div>
                <button 
                  onClick={handleSaveName}
                  disabled={isSaving || nameValue === userName || !nameValue.trim()}
                  className="px-8 py-5 bg-white/[0.03] border border-white/10 text-white rounded-2xl text-[13px] font-black uppercase tracking-widest hover:bg-[#D946EF] hover:border-[#D946EF] transition-all hover:shadow-[0_0_20px_rgba(139,92,246,0.2)] w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? "Salvando..." : "Salvar"}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <label className="text-[11px] font-black text-[#8d8d99] uppercase tracking-widest leading-none ml-1">{t('email')}</label>
              <div className="relative">
                <input
                  type="email"
                  value={userEmail || ""}
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

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="w-full bg-white/[0.02] border border-white/5 text-[#d946ef]/80 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:bg-[#d946ef]/5 hover:border-[#d946ef]/20 flex items-center justify-center gap-3 group/logout mt-4"
        >
          <LogOut className="w-5 h-5 group-hover/logout:-translate-x-1 transition-transform" />
          {t('sair')}
        </button>
      </div>

      <div className="h-24"></div>
    </main>
  );
};"""

if original_view in text:
    text = text.replace(original_view, new_view)
    with open('App.tsx', 'w', encoding='utf-8') as f:
        f.write(text)
    print("Updated ConfiguracoesView successfully!")
else:
    print("Failed to find exact text to replace. Will attempt regex matching.")
    # Fallback to a regex replacement for the entire component body
    match = re.search(r'(const ConfiguracoesView: React\.FC[^=]*=.*?^\};)', text, re.DOTALL | re.MULTILINE)
    if match:
        text = text.replace(match.group(1), new_view)
        with open('App.tsx', 'w', encoding='utf-8') as f:
            f.write(text)
        print("Updated ConfiguracoesView via regex successfully!")
    else:
        print("Regex match also failed.")

