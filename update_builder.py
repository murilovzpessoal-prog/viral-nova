import re

updates_text = """
Card 1: SELFIE EM QUARTO DE HOTEL Descrição: Selfie realista de plano médio em quarto de hotel, vestindo top cropped halter verde-oliva com colar de flor.
Card 2: SELFIE NO ESPELHO - CORSET TROPICAL Descrição: Mirror selfie estilo TikTok/Instagram em quarto com corset verde tropical vibrante e capinha de flores.
Card 3: MIRROR SELFIE - BANHEIRO BEGE Descrição: Selfie casual de espelho em banheiro moderno, com biquinho leve, calça cinza e top sem alças.
Card 4: CLOSE-UP EXTREMO - TOUCA DE PELE Descrição: Selfie ultra aproximada de rosto apoiado na mão, usando touca preta de pele em cozinha residencial.
Card 5: SELFIE NO INTERIOR DO VEÍCULO Descrição: Selfie de close-up frontal em interior de carro com luz natural suave, vestindo regata branca canelada.
Card 6: SELFIE CASUAL NA PRAIA Descrição: Estética espontânea UGC na praia sob o sol de verão, cabelo ondulado ao vento e biquíni azul-turquesa.
Card 7: STORIES DE INSTAGRAM COM REGATA BRASIL Descrição: Selfie vertical realista estilo Stories de Instagram, com leve ruído, vestindo regata verde da bandeira nacional.
Card 8: STORIES CASUAL EM FAZENDA BRASILEIRA Descrição: Selfie autêntica ao ar livre em fazenda com coque no cabelo e regata de alça branca.
Card 9: CLOSE-UP INFLUENCER COM LAPELA DJI Descrição: Close-up super nítido de modelo loira vestindo regata Prada com microfone de lapela DJI.
Card 10: SELFIE NO CARRO - DUNKIN' ICED COFFEE Descrição: Selfie realista de close-up no carro com copo de café gelado Dunkin', jaqueta de couro e óculos de sol.
Card 11: MIRROR SELFIE NO ELEVADOR Descrição: Selfie de espelho no elevador com pele bronzeada, cabelo efeito molhado, corset marrom e minissaia cargo.
Card 12: FOTO NOTURNA EM CARRO DE LUXO Descrição: Estilo editorial noturno em banco do passageiro de carro de luxo, vestindo mini vestido laranja acetinado.
Card 13: MIRROR SELFIE BANHEIRO - LOOK DO DIA Descrição: Selfie casual em espelho de banheiro grande com regata branca canelada e shorts jeans.
Card 14: MIRROR SELFIE AGACHADA NO QUARTO Descrição: Selfie agachada no espelho do quarto com look casual de saia curta e biquinho divertido.
Card 15: PARTY GIRL - FLASH DIRETO Descrição: Foto descontraída em festa noturna com flash direto de smartphone, piscando o olho e segurando taça de gin.
Card 16: ROLÊ NOTURNO COM ÓCULOS NEON Descrição: Influenciadora em balada noturna com luzes neon coloridas, óculos futurista e copo de bebida.
Card 17: MIRROR SELFIE - CROPPED VERDE TEXTURIZADO Descrição: Selfie de espelho mostrando look moderno com cropped verde texturizado de manga longa e minissaia branca.
Card 18: SELFIE ÍNTIMA NO QUARTO - REGATA PRETA Descrição: Selfie aproximada de smartphone com olhar expressivo, vestindo regata preta básica em cenário de quarto casual.
Card 19: EUPHORIC FESTIVAL - HEARTY LAUGH Descrição: Foto espontânea em festival de música gargalhando com copo de cerveja e blazer azul.
Card 20: INFLUENCER CORREDORA - VISOR ARCO-ÍRIS Descrição: Foto de ação esportiva profissional com óculos espelhados coloridos, top e shorts esportivos pretos.
Card 21: CORREDORA CORRENDO - SINAL DE PAZ Descrição: Foto dinâmica de corredora fazendo sinal de paz e segurando smartphone durante corrida de rua.
Card 22: SELFIE EM MOVIMENTO - MARATONA URBANA Descrição: Selfie elevada em movimento mostrando jaqueta de corrida preta e calça legging rosa vibrante.
Card 23: SELFIE CORRIDA - COQUE/TRANÇA DUPLA Descrição: Foto de selfie esportiva com coletes de hidratação, óculos escuros e cabelo em trança embutida dupla.
Card 24: PÓS-CORRIDA - EXIBINDO A MEDALHA Descrição: Foto exibindo orgulhosamente a medalha pós Meia Maratona, com óculos espelhados vermelhos e top esportivo com zíper.
Card 25: SELFIE MORDENDO A MEDALHA DE OURO Descrição: Selfie de close-up no asfalto mordendo medalha de ouro pós-maratona, com óculos azuis de ciclismo e sardas marcadas.
Card 26: GYM SELFIE - ELÍPTICO Descrição: Selfie de academia realista no aparelho elíptico, com fones de ouvido rose gold, top bege e calça cinza.
Card 27: GYM SELFIE - BANCO DE MUSCULAÇÃO Descrição: Selfie de academia em ângulo alto sentada no banco de musculação, usando fones rosa claro e manga longa preta.
Card 28: MIRROR SELFIE - LOCKER ROOM Descrição: Selfie de perfil em vestiário de academia de frente para o espelho, com trança no cabelo e fone Beats.
Card 29: GYM BACK PERSPECTIVE - NIKE LOOK Descrição: Foto em perspectiva traseira olhando por cima do ombro com look esportivo Nike cinza e azul escuro.
Card 30: SELFIE ACADEMIA - IPHONE UGC Descrição: Selfie frontal estilo UGC com luz branca de academia, vestindo top e calça preta.
Card 31: MIRROR SELFIE - ANIMAL PRINT LEGGINGS Descrição: Selfie de espelho com calça de estampa animal e top cinza claro canelado em vestiário de academia.
Card 32: LOOK CINZA CHUMBO - UM OMBRO SÓ Descrição: Selfie de espelho com top de um ombro só cinza chumbo e shorts combinando, exibindo resultados de treino.
Card 33: BIA - FITNESS INFLUENCER BRASILEIRA Descrição: Prompt de âncora de identidade para a influenciadora fitness paulista Bia, destacando estética corporal atlética e confiante.
Card 34: MIRROR SELFIE EM PERFIL - DETALHES DE TREINO Descrição: Selfie de perfil 3/4 no espelho da área de pesos livres, com camiseta cropped branca, boné e shorts ciclista preto.
Card 35: MIRROR SELFIE DE COSTAS - CONJUNTO AZUL CANELADO Descrição: Selfie de costas olhando por cima do ombro em vestiário, exibindo conjunto esportivo canelado azul escuro.
Card 36: UGC SKINCARE - MIRROR SELFIE Descrição: Mirror selfie em banheiro promovendo produto de skincare (limpador azul) com cabelo envolto em toalha.
Card 37: UGC PRODUCT SHOWCASE - RED BOX Descrição: Foto estilo UGC segurando caixa vermelha de tênis Nike com logo centralizado e fundo clean.
Card 38: UGC BEAUTY - AMBER COSMETICS BOTTLE Descrição: Selfie close-up de criadora ruiva de cabelos cacheados promovendo frasco cosmético âmbar com pump.
Card 39: OUTDOOR UGC - COSMETIC TUBE Descrição: Foto ao ar livre de modelo latina segurando bisnaga de creme facial bege sob sol forte e céu azul.
Card 40: BATHROOM BEAUTY - SKINCARE JAR Descrição: Selfie realista em banheiro segurando pote de creme de vidro sob luz forte com toalha no cabelo.
Card 41: AUTOCUIDADO - SÉRUM FACIAL Descrição: Selfie realista estilo iPhone 15 com modelo segurando frasco de sérum facial sob luz difusa suave.
Card 42: UGC LIFESTYLE - BEGE TUMBLER Descrição: Influenciadora tomando bebida em copo térmico bege com canudo de metal em sala de estar moderna.
Card 43: CLEAN GIRL - CREME DENTAL Descrição: Selfie estilo iPhone 15 com garota piscando e segurando bisnaga de pasta de dente amarela em estúdio.
Card 44: PORTRAIT BEAUTY - BATOM ROSA Descrição: Retrato beleza de modelo com cabelo molhado segurando batom rosa em sofá de apartamento moderno.
Card 45: TECH INFLUENCER - EARBUDS BOX Descrição: Influenciadora segurando caixa de fone de ouvido sem fio ao lado do rosto com sorriso alegre.
Card 46: PODCAST INTIMATE - LOOK MAUVE Descrição: Gravação de videocast com modelo de blusa mauve e colar trevo olhando pensativa para lateral.
Card 47: PODCAST DRAMATIC - BLAZER PRETO Descrição: Estúdio com luz azul/roxa e modelo de blazer preto olhando diretamente para as lentes do iPhone.
Card 48: PODCAST STUDIO - TOP ROSA CANELADO Descrição: Modelo sorridente com top rosa canelado em mesa rústica com microfone e lâmpadas Edison.
Card 49: PODCAST HOME - JERSEY VERMELHA 72 Descrição: Modelo em poltrona boucle branca usando camiseta esportiva oversized de futebol americano 72.
Card 50: PODCAST STUDIO - WHITE CROPPED Descrição: Modelo em estúdio com plantas tropicais de fundo segurando microfone e iluminação laranja.
Card 51: DECK TROPICAL - LOOK BOHO Descrição: Visual de férias de modelo com cabelo ondulado longo vestindo saída de praia branca em deck de madeira.
Card 52: CINEMATIC WINDOW - LUZ E SOMBRA Descrição: Efeito de iluminação de janela projetando faixas de luz e sombra em pose de braços erguidos.
Card 53: MACRO PHOTOGRAPHY - BOCA Descrição: Macrofotografia extrema focada nos detalhes, poros e texturas reais dos lábios.
Card 54: MACRO PHOTOGRAPHY - OLHO Descrição: Macrofotografia extrema focada nas texturas realistas e detalhes do olho e pálpebra.
Card 55: MACRO PHOTOGRAPHY - NARIZ Descrição: Macrofotografia extrema da pele do nariz mostrando poros, brilho e imperfeições naturais.
"""

updates = {}
for line in updates_text.strip().split('\n'):
    if line.strip():
        # Match 'Card X: TITLE Descrição: DESC'
        match = re.search(r'Card (\d+):\s*(.*?)\s*Descrição:\s*(.*)', line)
        if match:
            idx = int(match.group(1))
            title = match.group(2).strip()
            desc = match.group(3).strip()
            updates[idx] = {'title': title, 'desc': desc}

with open('/Users/murilohenriquemoreiravaz/.gemini/antigravity/scratch/viralpulse-att/src/BuilderView.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

for idx in range(1, 56):
    if idx in updates:
        title = updates[idx]['title'].replace('"', '\\"')
        desc = updates[idx]['desc'].replace('"', '\\"')
        
        # In BuilderView, category might be "Builder", "Lifestyle", etc.
        # But looking at line 14 for id 1, category is "Builder".
        # Let's just find id: {idx}, and replace the next category line with title and desc added.
        pattern = r'(id:\s*' + str(idx) + r',\s*category:\s*"(?:[^"]+)",)'
        replacement = r'\1\n    title: "' + title + r'",\n    desc: "' + desc + r'",'
        content = re.sub(pattern, replacement, content)

# Now update the render section.
# Around line 1468:
# <h3 className="text-white font-black text-sm uppercase tracking-wide shadow-sm">
#   {template.category.toUpperCase()}
# </h3>
# <p className="text-white/70 text-[11px] leading-relaxed line-clamp-2">
#   {['Builder', 'Trocas'].includes(template.category) ? 'Use este card para gerar imagens baseando-se no prompt em anexo.' : `Explore e baixe este template de ${template.category.toLowerCase()}.`}
# </p>

render_pattern = r'<h3 className="text-white font-black text-sm uppercase tracking-wide shadow-sm">\s*\{template\.category\.toUpperCase\(\)\}\s*</h3>\s*<p className="text-white/70 text-\[11px\] leading-relaxed line-clamp-2">\s*\{\[\'Builder\', \'Trocas\'\]\.includes\(template\.category\) \? \'Use este card para gerar imagens baseando-se no prompt em anexo\.\' : `Explore e baixe este template de \$\{template\.category\.toLowerCase\(\)\}\.`\}\s*</p>'

new_render = '''<h3 className="text-white font-black text-sm uppercase tracking-wide shadow-sm">
                {template.title || template.category.toUpperCase()}
              </h3>
              <p className="text-white/70 text-[11px] leading-relaxed line-clamp-2" title={template.desc}>
                {template.desc || (['Builder', 'Trocas'].includes(template.category) ? 'Use este card para gerar imagens baseando-se no prompt em anexo.' : `Explore e baixe este template de ${template.category.toLowerCase()}.`)}
              </p>'''

content = re.sub(render_pattern, new_render, content)

with open('/Users/murilohenriquemoreiravaz/.gemini/antigravity/scratch/viralpulse-att/src/BuilderView.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated BuilderView.tsx successfully.")
