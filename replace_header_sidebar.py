with open('App.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Replace the top right element
start_top_right = text.find('<div className="flex items-center gap-4">')
if start_top_right != -1:
    # Find matching closing div for this block.
    # It contains the PT and User elements. We can just cut everything up to </div>\n           </div>
    end_top_right = text.find('</div>\n           </div>', start_top_right)
    if end_top_right != -1:
        # Actually it's inside `<div className="hidden lg:flex items-center justify-between px-10 pt-8 pb-4">`
        # We should just replace the `<div className="flex items-center gap-4">...</div>` with nothing.
        # Let's do a substring replacement manually.
        
        # We can extract the block exactly
        block_to_remove = text[start_top_right:end_top_right+6] # include the closing </div>
        text = text.replace(block_to_remove, '')
        
# 2. Replace the Indique Amigos block
indique_block = """           {/* INDIQUE AMIGOS */}
           <div className="p-4 mx-4 mb-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between cursor-pointer hover:bg-white/10 transition-colors group">
              <div>
                <p className="text-xs font-bold text-white group-hover:text-[#2DD4BF] transition-colors">Indique amigos</p>
                <p className="text-[10px] text-[#8d8d99] mt-0.5">Lucre ou presenteie amigos</p>
              </div>
              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-[#2DD4BF]/20 transition-colors">
                <Gift className="w-4 h-4 text-white group-hover:text-[#2DD4BF]" />
              </div>
           </div>"""

new_user_block = """           {/* USER PROFILE IN SIDEBAR */}
           <div onClick={() => setCurrentPage('configuracoes')} className="p-4 mx-4 mb-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between cursor-pointer hover:bg-white/10 transition-colors group">
              <div>
                <p className="text-xs font-bold text-white group-hover:text-[#2DD4BF] transition-colors uppercase">{t('usuario')}</p>
                <p className="text-[10px] text-[#8d8d99] mt-0.5">Meu Perfil</p>
              </div>
              <div className="w-8 h-8 bg-[#D946EF] rounded-full flex items-center justify-center text-xs font-black text-white shadow-lg shadow-[#D946EF]/30 overflow-hidden group-hover:shadow-[0_0_15px_rgba(217,70,239,0.5)] transition-shadow">
                {userProfileImage ? <img src={userProfileImage} alt="User" className="w-full h-full object-cover" /> : "U"}
              </div>
           </div>"""

text = text.replace(indique_block, new_user_block)

with open('App.tsx', 'w', encoding='utf-8') as f:
    f.write(text)

print("Updated App.tsx successfully.")
