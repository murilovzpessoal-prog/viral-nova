
# 1) ANÁLISE TÉCNICA COMPLETA

1.  **Estrutura da Página:** Layout de uma única página (SPA) com um cabeçalho fixo (Header) e um corpo centralizado com largura máxima (Max-width container). Não há sidebar visível, apenas navegação superior.
2.  **Componentes:**
    *   Header: Logo, links de navegação com estado ativo (underline), botões de ação (Baixar App, Localização, Dark Mode, Perfil).
    *   Banner "Novo no Trendfy?": Container horizontal com gradiente sutil, ícones decorativos nas extremidades e CTA proeminente.
    *   Barra de Pesquisa: Input largo com cantos arredondados e botão de busca ícone-apenas (magenta).
    *   Card "Dica do Dia": Layout complexo com cabeçalho (ícone + título + badge "AI Insights"), texto descritivo e uma seção interna destacada ("Ação Recomendada") com borda e fundo diferenciados.
    *   Grid de Funcionalidades: Grid de 2 colunas com cards compactos contendo ícone à esquerda e texto (Título + Descrição) à direita.
    *   Seção "Top Produtos": Cabeçalho com ícone de fogo e link "Mais". Grid de 4 colunas com cards de produto contendo imagem, badge de ranking (#N), título, receita estimada e range de preço.
3.  **Layout Estrutural:** Flexbox no Header e Banner. CSS Grid para o Grid de Funcionalidades (2 colunas) e Grid de Produtos (4 colunas).
4.  **Cores (HEX):**
    *   Background Principal: `#09090b`
    *   Cards/Containers: `#111111`
    *   Acento (Magenta/Pink): `#e91e63`
    *   Texto Primário: `#ffffff`
    *   Texto Secundário/Muted: `#94a3b8` (Slate-400)
    *   Bordas: `#27272a` (Zinc-800)
    *   Banner Background: `#1a0f12` (Dark Maroon)
5.  **Tipografia:** Sans-serif moderna (Inter/System stack). Títulos em Semi-bold (600), textos de apoio em Regular (400).
6.  **Espaçamentos:** Gaps de grid consistentes (16px a 24px). Padding interno dos cards ~20px.
7.  **Bordas:** `border-radius: 12px` para cards grandes, `border-radius: 8px` para botões e badges.
8.  **Sombras:** Sombras sutis ou ausentes devido ao tema escuro; o contraste é feito por bordas e variações leves de cor de fundo.
9.  **Hierarquia:** Títulos de seção grandes, receita em destaque (magenta), badges de ranking visíveis.
10. **Responsividade:** O layout deve colapsar de 4 para 2 ou 1 coluna em dispositivos móveis.

# 2) MAPA DE CORES (HEX)

- Background: `#09090b`
- Card Background: `#111111`
- Accent Pink: `#e91e63`
- Border Color: `#27272a`
- Banner BG: `#1a0f12`
- Text Gray: `#94a3b8`

# 3) ESTRUTURA DE COMPONENTES

- `Navbar`: Links superiores e controles de usuário.
- `HeroBanner`: Chamada para "Creator Academy".
- `SearchBar`: Input de pesquisa central.
- `DailyTip`: Card de insights de IA.
- `FeatureGrid`: Cards de ferramentas (Tendência, Influencer, etc).
- `ProductGrid`: Lista de cards de produtos de sucesso.

# 4) INSTRUÇÕES DE EXECUÇÃO

O código utiliza React 18, Tailwind CSS para estilização e Lucide React para ícones. Basta rodar o ambiente React padrão para visualizar.
