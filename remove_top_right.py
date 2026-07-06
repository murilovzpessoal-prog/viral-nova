import re

with open('App.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# We need to remove the top right user and language block.
# Let's search for the exact HTML structure of the top right section:
target_block = """              <div className="flex items-center gap-4">
                 <div
                   onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                   className="flex items-center gap-2 px-3 py-2 bg-white/5 backdrop-blur-2xl border-white/10 rounded-xl border cursor-pointer hover:bg-white/10 transition-all relative"
                 >
                   <img src="https://flagcdn.com/w20/br.png" width="16" alt="Brazil" className="rounded-[2px] w-4" />
                   <span className="text-[#8d8d99] text-xs font-bold">PT</span>
                   <ChevronRight className={`w-3 h-3 text-[#8d8d99] transition-transform ${isLangMenuOpen ? '-rotate-90' : 'rotate-90'}`} />
                 </div>
                 
                 <div className="flex items-center gap-3 bg-white/5 backdrop-blur-2xl border-white/10 pl-2 pr-4 py-2 rounded-full border cursor-pointer hover:bg-white/10 transition-all">
                    <div className="w-8 h-8 bg-[#D946EF] rounded-full flex items-center justify-center text-xs font-black text-white shadow-lg shadow-[#D946EF]/30">
                      {userProfileImage ? <img src={userProfileImage} alt="User" className="w-full h-full object-cover rounded-full" /> : "U"}
                    </div>
                    <span className="text-xs font-black text-white uppercase">{t('usuario')}</span>
                 </div>
              </div>"""

if target_block in text:
    text = text.replace(target_block, "")
    print("Top right block removed successfully.")
else:
    print("Could not find the exact top right block. Please check the content.")

with open('App.tsx', 'w', encoding='utf-8') as f:
    f.write(text)
