import re

updates_text = """
Card 1: TRANSIÇÃO-MÃO NA CÂMERA Descrição: Transição dinâmica tapando a câmera com a mão para trocar de look de forma fluida.
Card 2: ANIMAÇÃO BASE NATURAL Descrição: Movimentos corporais calmos e poses naturais em plano médio para transmitir leveza.
Card 3: ANIMAÇÃO ESPONTANEA Descrição: Gestos e sorrisos espontâneos capturados de forma autêntica durante a gravação.
Card 4: DESTAQUE NOS DETALHES DA ROUPA Descrição: Close-up focado nas texturas, caimento e detalhes de costura e tecido da peça.
Card 5: SEQUÊNCIA DE POSSES Descrição: Cortes rápidos mostrando diferentes poses e ângulos do look de forma dinâmica.
Card 6: APROXIMAÇÃO DA CÂMERA Descrição: Movimento de aproximação focado na expressão facial ou detalhes superiores do visual.
Card 7: Modelo perto da câmera, por acaso, diversificando posses e mostrando detalhes da roupa Descrição: Enquadramento fechado e casual focando nas peças de roupa e nos movimentos casuais.
Card 8: MOVIMENTO SINCRONIZADO Descrição: Movimentos corporais compassados exatamente no ritmo e batida do áudio musical.
Card 9: Giro Lento de Lado com 360 Controlado Descrição: Giro completo em velocidade constante para mostrar todo o caimento da peça.
Card 10: MOVIMENTO LEVE + MÃO NA CINTURA (SEM GIRO) Descrição: Pose elegante de mãos na cintura com oscilação sutil de corpo em plano médio.
Card 11: MOVIMENTOS CONJUNTO Descrição: Sequência de gestos de mãos encadeados criando uma coreografia simples de transição.
Card 12: ENCOMENDA-CAIXA Descrição: Unboxing visual ou exibição criativa da embalagem e chegada do produto.
Card 13: ENOMENDA- LOJA TIKTOK Descrição: Apresentação de recebido com foco na facilidade de compra pela loja integrada.
Card 14: CTA 1 Descrição: Chamada para ação focada em engajamento de comentários ou link na bio.
Card 15: CTA 2 Descrição: Chamada para ação focada em salvamento do vídeo ou compartilhamento rápido.
Card 16: CTA 3- BEIJO Descrição: Finalização carismática mandando um beijo para engajamento caloroso.
Card 17: PROMPT CABELO 1 Descrição: Movimento clássico jogando o cabelo lateralmente para transmitir charme.
Card 18: PROMPT CABELO 2 Descrição: Ajuste de franja ou fios frontais olhando fixamente para atrair atenção.
Card 19: PROMPT AMARRANDO CABELO Descrição: Gesto estético e elegante de prender o cabelo na tela revelando o pescoço.
Card 20: PROMPT DE COSTA- MEXENDO NO CABELO Descrição: Plano traseiro com rotação parcial de cabeça e ajuste estético de fios.
Card 21: ELASTICIDADE PARTE SUPERIOR Descrição: Demonstração da elasticidade e flexibilidade da peça de roupa superior.
Card 22: ELASTICIDADE PARTE INFERIOR Descrição: Demonstração de flexibilidade e caimento da calça/saia em movimento.
Card 23: ELASTICIDADE Descrição: Demonstração geral de maleabilidade e recuperação rápida do tecido.
Card 24: GANCHO 1 Descrição: Gancho visual de início rápido para prender a atenção nos primeiros 3 segundos.
Card 25: GANCHO JOGAR ROUPA 1 Descrição: Efeito de transição de corte invisível jogando a peça em direção à lente.
Card 26: GANCHO JOGAR ROUPA 2 Descrição: Transição de impacto jogando a roupa para cima antes do corte.
Card 27: ESPELHO- MOSTRANDO DETALHES Descrição: Destaque e close-up nos detalhes da roupa através do reflexo de um espelho.
Card 28: ESPELHO- CTA Descrição: Chamada para ação criativa interagindo diretamente com o reflexo do espelho.
Card 29: ESPELHO- NATURAL 1 Descrição: Movimento espontâneo ajeitando o look em frente ao espelho com leveza.
Card 30: ESPELHO- NATURAL 2 Descrição: Pose e troca de olhares dinâmicos entre a câmera e o reflexo do espelho.
Card 31: ESPELHO- NATURAL 3 Descrição: Movimentos corporais fluidos e ajeitando o cabelo usando o espelho como guia.
Card 32: UNBOXING- SOMENTE O PRODUTO 1 Descrição: Destaque focado no desembalar e revelação do produto sem o criador em cena.
Card 33: UNBOXING- SOMENTE O PRODUTO 2 Descrição: Close-up detalhado do produto saindo da embalagem em plano fechado.
Card 34: UNBOXING- SOMENTE O PRODUTO 3 Descrição: Demonstração e teste de toque do produto com movimentos e detalhes.
Card 35: UNBOXING- SOMENTE O PRODUTO CTA Descrição: Chamada de ação final mostrando o produto e indicando a loja.
Card 36: GANCHO Descrição: Gancho rápido nos primeiros 3 segundos para reter o público.
Card 37: CABELO Descrição: Gesto clássico de ajeitar o cabelo para criar apelo visual e dinamismo.
Card 38: CTA 1 Descrição: Chamada para ação clara direcionando o público para a loja ou bio.
Card 39: CTA 2 Descrição: Incentivo visual para engajamento e comentários no conteúdo.
Card 40: CTA 3-BEIJO Descrição: Encerramento simpático e viral enviando um beijo para a lente.
Card 41: ANIMAÇÃO NATURAL BASE Descrição: Movimentos corporais leves e descontraídos focando no caimento.
Card 42: MOVIMENTO SINCRONIZADO Descrição: Coreografia e gestos curtos batendo no ritmo exato do áudio.
Card 43: GIRO LENTO DE LADO 360° Descrição: Giro controlado para exibir o design e flexibilidade da peça.
Card 44: MOVIMENTO LEVE + MÃO NA CINTURA Descrição: Pose estática e estilosa com mãos na cintura valorizando o corte.
Card 45: GANCHO AMARRANDO CABELO Descrição: Ação de prender os cabelos expondo o pescoço e acessórios.
Card 46: MODELO ESPONTÂNEA Descrição: Visual leve e risada casual gravada de forma descontraída.
Card 47: ELASTICIDADE SUPERIOR Descrição: Demonstração prática da flexibilidade do tecido na parte de cima.
Card 48: ELASTICIDADE INFERIOR Descrição: Demonstração de conforto e flexibilidade da calça ou saia.
Card 49: DESTAQUE NOS DETALHES DA ROUPA Descrição: Close-up nas texturas, zíperes ou estampas exclusivas.
Card 50: MODELO PERTO DA CÂMERA, ESPONTÂNEA, VARIAS POSSES Descrição: Cortes rápidos e dinâmicos em close-up trocando de poses.
Card 51: ENCOMENDA- TIKTOK SHOP Descrição: Unboxing e indicação visual de compra facilitada na sacola.
Card 52: ANIMAÇÃO- GIRO+MÃO NA CINTURA+CTA Descrição: Combinação clássica de giro rápido com pose e chamada de ação final.
Card 53: MODELO ESPONTÂNEA+POSE Descrição: Estilo casual com pose descontraída finalizando em sorriso.
Card 54: COMEÇO COM EFEITO DE TRANSIÇÃO Descrição: Efeito de entrada criativo cobrindo e revelando o look na transição.
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

with open('/Users/murilohenriquemoreiravaz/.gemini/antigravity/scratch/viralpulse-att/src/MovimentosView.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

for idx in range(1, 55):
    if idx in updates:
        title = updates[idx]['title'].replace('"', '\\"')
        desc = updates[idx]['desc'].replace('"', '\\"')
        
        # We find `id: {idx},` and the following `category: "Animações",`
        pattern = r'(id:\s*' + str(idx) + r',\s*category:\s*"Animações",)'
        replacement = r'\1\n    title: "' + title + r'",\n    desc: "' + desc + r'",'
        content = re.sub(pattern, replacement, content)

# Also update the render section
render_pattern = r'<h3 className="text-white font-black text-sm uppercase tracking-wide shadow-sm">\s*MOVIMENTO \{template\.id\}\s*</h3>\s*<p className="text-white/70 text-\[11px\] leading-relaxed line-clamp-2">\s*Movimento fluido e dinâmico, perfeito para prender a atenção no início do vídeo\.\s*</p>'
new_render = '''<h3 className="text-white font-black text-sm uppercase tracking-wide shadow-sm">
                {template.title || `MOVIMENTO ${template.id}`}
              </h3>
              <p className="text-white/70 text-[11px] leading-relaxed line-clamp-2" title={template.desc}>
                {template.desc || "Copie e aplique este movimento."}
              </p>'''

content = re.sub(render_pattern, new_render, content)

with open('/Users/murilohenriquemoreiravaz/.gemini/antigravity/scratch/viralpulse-att/src/MovimentosView.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated MovimentosView.tsx successfully.")
