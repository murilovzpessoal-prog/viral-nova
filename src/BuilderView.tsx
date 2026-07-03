import React, { useState } from 'react';
import { Search, Folder, Sparkles, Flame, Heart, Copy, Wand2, ArrowLeft, Loader2, Download } from 'lucide-react';

const categories = [
  "Builder", "Influenciadoras", "Ambientes", "Trocas", "Todos", "UGC", "Lifestyle", "Estúdio", "Closeup", "Outdoor",
  "Flat Lay", "Beleza", "Moda", "Tecnologia", "Alimentos",
  "Fitness", "Casa", "Pet", "Editorial", "Cinematográfico"
];

// Placeholder images for the masonry grid
const templates = [
  {
    id: 1,
    category: "Builder",
    likes: 101,
    image: "/assets/builder-01.jpg",
    promptText: `A medium close-up selfie of a young woman with long, straight, center-parted dark brown hair and olive skin. She has thick dark eyebrows, soft pink blush, and glossy dark brown lipstick, looking directly into the camera with a neutral, calm expression. She is wearing a fitted, ribbed olive green halter-neck crop top and a delicate silver necklace with a flower-shaped pendant. A dark brown leather shoulder bag strap is visible on her left shoulder. On her left upper arm, there is a tattoo of two butterflies, and a script tattoo is visible on her left forearm. She is wearing light-wash denim jeans. The background is a hotel room with a television mounted on the wall showing a streaming service interface, a black desk with a white landline phone, and a hallway door in the back. The lighting is soft and ambient, casting gentle shadows. The image has a sharp focus on the subject, photorealistic, high detail.`
  },
  {
    id: 2,
    category: "Builder",
    likes: 102,
    image: "/assets/builder-02.jpg",
    promptText: `{
  \"meta\": {
    \"aspect_ratio\": \"9:16\",
    \"quality\": \"ultra_photorealistic\",
    \"resolution\": \"8k\",
    \"camera\": \"câmera frontal do iPhone 15 Pro Max\",
    \"lens\": \"24mm grande angular\",
    \"style\": \"realismo de câmera de iPhone, não de estúdio, não profissional, textura natural visível\"
  },
  \"character_lock\": {
    \"identity_source\": \"\",
    \"face_identity\": [
      \"rosto oval, maxilar bem definido e contornado, nariz reto com ponta levemente empinada, lábios cheios e bem delineados com gloss natural, olhos castanhos amendoados com delineado gatinho escuro, sobrancelhas arqueadas e preenchidas, olhar sedutor e confiante\"
    ],
    \"regras_de_aparencia\": {
      \"descricao_geral\": \"cabelo longo liso castanho escuro com mechas frontais loiras (money piece) contornando o rosto, pele com tom bronzeado natural, marcas de biquíni de bronzeamento bem evidentes no colo, textura de pele suave com leve oleosidade natural na zona T\",
      \"detalhes_extras\": \"piercing de argola fino no lado inferior direito do lábio, tatuagens escuras complexas visíveis no antebraço direito\"
    }
  },
  \"cena\": {
    \"local\": \"quarto ou closet com espelho de parede\",
    \"ambiente\": [
      \"porta ou lateral de armário branco à esquerda\",
      \"monitor de computador emitindo luz azul ao fundo à direita\",
      \"ambiente organizado e com pouca luz ambiente\"
    ],
    \"atmosfera\": \"casual, vaidosa, estética de rede social (TikTok/Instagram)\"
  },
  \"iluminacao\": {
    \"tipo\": \"iluminação artificial de ambiente interno\",
    \"luz_principal\": \"luz frontal difusa vindo possivelmente do teto ou frente do espelho, iluminando o rosto e destacando o colo\",
    \"luz_de_preenchimento\": \"sombras marcadas abaixo do maxilar e nas laterais do corpo\",
    \"contraste\": \"contraste médio-alto\",
    \"evitar\": [
      \"iluminação de estúdio\",
      \"ring light artificial\",
      \"aparência profissional\",
      \"tons quentes/laranja\",
      \"flash estourado\"
    ]
  },
  \"perspectiva_da_camera\": {
    \"pov\": \"selfie no espelho (mirror selfie)\",
    \"angulo\": \"frontal reto, altura do peito\",
    \"distancia\": \"plano médio, cortando na altura da cintura\",
    \"visibilidade_do_celular\": \"celular visível, segurado pela mão direita no nível do ombro, com capinha branca decorada com desenhos florais pretos e detalhes em rosa\"
  },
  \"assunto\": {
    \"genero\": \"feminino\",
    \"idade\": \"adulto (21+)\",
    \"vibe\": \"influenciadora tropical, estilosa, urbana\",
    \"textura_pele\": \"pele maquiada mas com textura realista, leve brilho natural de oleosidade nas bochechas e nariz\",
    \"expressao\": {
      \"olhos\": \"olhando fixamente para o reflexo da tela do celular\",
      \"boca\": \"fechada, relaxada\",
      \"emocao\": \"neutra, focada na pose\"
    },
    \"pose\": {
      \"posicao\": \"em pé, tronco de frente para o espelho\",
      \"apoio\": \"sem apoio visível, postura ereta\",
      \"mao\": \"mão direita segurando o celular mostrando unhas amendoadas com esmalte escuro e vários anéis prateados, braço esquerdo abaixado e parcialmente fora do quadro\"
    },
    \"roupa\": {
      \"blusa\": {
        \"tipo\": \"vestido ou blusa tipo corset com alças finas\",
        \"caimento\": \"justo ao corpo, decote coração\",
        \"detalhes\": \"tecido liso e acetinado de cor verde vibrante com estampa tropical contendo bananas amarelas, folhas e uma arara verde e roxa\"
      },
      \"extra\": [
        \"duas correntes prateadas finas no pescoço (uma com pingente de coração, outra com medalha redonda)\",
        \"relógio prateado e pulseiras finas no pulso esquerdo\",
        \"bolsa preta com alça de corrente pendurada no ombro esquerdo\"
      ]
    }
  },
  \"qualidade_da_imagem\": {
    \"foco\": \"foco cravado no rosto da modelo e no celular\",
    \"granulacao\": \"ruído visível em baixa luminosidade\",
    \"nitidez\": \"NÃO extremamente nítida, mais lo-fi\",
    \"realismo\": \"parece uma selfie real de iPhone postada online\",
    \"artefatos_de_sensor\": \"leve perda de definição nas áreas escuras do fundo\",
    \"distorcao_de_lente\": \"barrel distortion leve de 24mm, esticando levemente as bordas\",
    \"pos_processamento\": \"nitidez artificial (oversharpening) típica de algoritmo iOS\"
  }
}`
  },
  {
    id: 3,
    category: "Builder",
    likes: 103,
    image: "/assets/builder-03.webp",
    promptText: `{
  \"meta\": {
    \"aspect_ratio\": \"9:16\",
    \"quality\": \"ultra_photorealistic\",
    \"resolution\": \"8k\",
    \"camera\": \"câmera frontal do iPhone 15 Pro Max\",
    \"lens\": \"24mm grande angular\",
    \"style\": \"realismo de selfie do iPhone, não de estúdio, não profissional, textura natural visível\"
  },
  \"cena\": {
    \"local\": \"Banheiro moderno com revestimento bege\",
    \"ambiente\": [
      \"Box de vidro com chuveiro de teto ao fundo\",
      \"Frascos de amenities fixados na parede à esquerda\",
      \"Vaso sanitário branco com tampa aberta visível no canto inferior direito\",
      \"Limpo e organizado\"
    ],
    \"atmosfera\": \"Casual, selfie cotidiana em ambiente doméstico ou hotel\"
  },
  \"iluminação\": {
    \"tipo\": \"Luz artificial de teto de banheiro\",
    \"luz principal\": \"Luz zenital criando sombras suaves sob o queixo e clavícula\",
    \"luz de preenchimento\": \"Reflexo difuso nas paredes bege, luz suave sem flash direto\",
    \"contraste\": \"Médio, realçando a profundidade do cabelo preto\"
  },
  \"perspectiva_da_câmera\": {
    \"pov\": \"Selfie no espelho (Mirror Selfie)\",
    \"ângulo\": \"Altura do peito, levemente inclinado\",
    \"distância\": \"Plano médio (do quadril para cima)\",
    \"visibilidade_do_celular\": \"iPhone preto com capa de corações vermelhos segurado pela mão esquerda\"
  },
  \"assunto\": {
    \"gênero\": \"Feminino\",
    \"idade\": \"adulto (21+)\",
    \"vibe\": \"Urbana, casual, jovem\",
    \"expressão\": {
      \"olhos\": \"Olhando diretamente para o próprio reflexo/tela do celular\",
      \"boca\": \"Fazendo biquinho (duckface) leve\",
      \"emoção\": \"Descontraída, confiante\"
    },
    \"pose\": {
      \"position\": \"Em pé, corpo levemente inclinado para frente\",
      \"mão\": \"Mão esquerda segurando o celular\"
    },
    \"roupa\": {
      \"blusa\": {
        \"tipo\": \"Top sem alças (tubinho)\",
        \"caimento\": \"Ajustado ao corpo\",
        \"detalhes\": \"Tecido preto fosco liso\"
      },
      \"extra\": [
        \"Calça jeans cinza estonada com botão metálico visível\",
        \"Colar fino com pingente delicado\",
        \"Piercing pequeno no nariz\"
      ]
    }
  },
  \"qualidade_da_imagem\": {
    \"foco\": \"Foco cravado no plano do espelho\",
    \"granulação\": \"ruído visível em baixa luminosidade\",
    \"realismo\": \"parece uma selfie real de iPhone postada online\",
    \"artefatos_de_sensor\": \"Leve reflexo de luz no topo do espelho vindo da lâmpada\",
    \"distorcao_de_lente\": \"barrel distortion leve de 24mm\"
  }
}`
  },
  {
    id: 4,
    category: "Builder",
    likes: 104,
    image: "/assets/builder-04.webp",
    promptText: `EXTREME ultra close-up smartphone selfie, EXACT same camera angle and distance as the reference image. Camera is positioned VERY close to the face (approximately 15–18 cm), slightly BELOW eye level and tilted upward. The perspective exaggerates the nose and lips naturally, exactly like a real front-facing phone camera. The frame is tightly cropped: the top of the black fur hat is visible, eyebrows fully visible, eyes partially relaxed and half-open, nose centered and dominant, lips fully visible, and the chin partially cropped by the bottom edge of the frame. NO additional headroom. NO zooming out. NO reframing. The subject is resting her face on her LEFT hand. The palm presses into the cheek, slightly deforming the skin naturally. Fingers are vertical along the cheek. Fingernails are almond-shaped, medium length, painted glossy deep red. Lips are full, soft pink, slightly glossy, relaxed and closed. Lip shape and angle must remain neutral, no smile, no tension. Visible natural lip lines and moisture. Nose is close to the camera with visible nostrils due to the upward angle. Natural skin shine on the nose tip. Skin is COMPLETELY natural: visible pores, freckles across nose and cheeks, slight redness, uneven tone, no smoothing, no beauty filters, no retouching. Eyes are relaxed, looking slightly downward toward the camera. Eyelashes are natural, eyebrows thick and natural with visible individual hairs. Hair is straight blonde with darker roots, visible on both sides of the face, falling naturally. A dense black fur hat frames the forehead closely, touching near the eyebrows, with visible individual fur strands. Lighting is soft indoor ambient daylight, neutral temperature, coming from above and slightly to the side. No dramatic shadows, no studio lighting. Background is an indoor kitchen environment, softly out of focus. Light-colored wall texture, refrigerator visible on the right side. DO NOT beautify. DO NOT correct proportions. DO NOT adjust symmetry. No logos, no text, no watermarks, no UI icons.`
  },
  {
    id: 5,
    category: "Builder",
    likes: 105,
    image: "/assets/builder-05.webp",
    promptText: `Selfie ultra realista de jovem adulta brasileira, 19 anos, sentada no interior de um veículo, orientação frontal para a câmera, capturada com câmera frontal de smartphone. Expressão neutra, lábios fechados levemente projetados, olhar direto para a lente, calma sem exagero expressivo. Tom de pele claro, textura real com poros visíveis, sardas distribuídas pelo nariz e bochechas, acabamento natural sem aparência plastificada. Cabelo loiro, longo, partição central, liso com leve ondulação natural, solto sem styling elaborado. Maquiagem leve: base ou corretivo suave com acabamento natural, máscara de cílios evidente, definição sutil nos olhos, blush discreto, lábios com produto nude ou gloss transparente. Vestindo regata branca de algodão canelado, estilo casual. Colar de corrente fina dourada com pingente pequeno e discreto. Ambiente: interior de veículo com encosto de banco, teto do carro e janela lateral visíveis, situação cotidiana sem preparação de cenário. Iluminação natural lateral/frontal suave, difusa, sombras leves e realistas na pele. Câmera frontal de smartphone, estilo UGC nativo, ângulo ligeiramente abaixo da linha dos olhos, enquadramento close-up do peito para cima, proporção vertical 9:16, nitidez alta no rosto sem desfoque artificial. Sem filtros, contraste natural, saturação equilibrada, tratamento mínimo preservando textura real. Alto nível de autenticidade UGC: imperfeições naturais visíveis, iluminação não controlada, ambiente cotidiano, ausência de pose publicitária.`
  },
  {
    id: 6,
    category: "Builder",
    likes: 106,
    image: "/assets/builder-06.webp",
    promptText: `Mulher jovem realizando selfie casual ao ar livre em ambiente de praia, com o rosto apoiado sobre a mão, transmitindo estética espontânea e natural típica de UGC. Jovem adulta, expressão relaxada, leve sorriso neutro, olhos parcialmente semicerrados devido à incidência direta de luz solar. Cabelo castanho, longo, ondulado natural, com leve frizz e desorganização causada pela brisa marítima. Top de biquíni verde azulado, modelo simples, alças finas, sem estampas. Maquiagem mínima com acabamento natural, pele com brilho de luz solar, blush suave e lábios em tom neutro. Argolas pequenas em metal dourado, colar fino dourado, pulseira dourada com pequenos pingentes. Estética de câmera frontal de smartphone, ângulo levemente baixo, câmera próxima ao rosto. Close-up do tronco superior até a cabeça, enquadramento vertical 9:16 com sujeito levemente descentralizado. Foco nítido, luz natural intensa, textura de pele visível e realista, sem suavização excessiva. Ambiente de praia próximo à linha do mar, céu azul limpo, mar visível ao fundo, linha do horizonte natural. Dia ensolarado de verão, sensação de tranquilidade e informalidade. Iluminação natural direta do sol, com realces fortes e sombras suaves.`
  },
  {
    id: 7,
    category: "Builder",
    likes: 107,
    image: "/assets/builder-07.webp",
    promptText: `9:16 Ultra-realistic, hand-taken vertical selfie of a 21-year-old blonde woman in a relaxed pose, captured in the authentic style of Instagram Stories. Slight motion blur, smooth texture and low resolution, warm indoor lighting. Close-up vertical selfie filling most of the Stories frame, camera very close to the face, imperfect angle of a hand-taken photo. She smiles with a relaxed and confident expression, direct eye contact with the camera. Instagram Stories realism - slight exposure variation, shallow depth of field, subtle grain, slightly softened iPhone edges, no cinematic polish. Natural, loose hair color or hairstyle. Minimal or optional makeup. Delicate gold rings on her fingers, shoulders framed by a green tank top in the colors of the Brazilian flag. Neutral inner background, softly blurred. No text on screen, no stickers, just the selfie in storyboard style.`
  },
  {
    id: 8,
    category: "Builder",
    likes: 108,
    image: "/assets/builder-08.webp",
    promptText: `Ultra-realistic, hand-held vertical selfie of a 21-year-old blonde woman in a relaxed pose, in the authentic style of Instagram Stories. Slight motion blur, smooth texture and low resolution, natural lighting, daylight. Close-up vertical selfie filling most of the Stories frame, camera very close to the face, imperfect angle of a hand-taken photo. She smiles with a relaxed and confident expression, direct eye contact with the camera. Instagram Stories realism - slight variation in exposure, shallow depth of field, subtle grain, edges slightly softened by the iPhone, no cinematic retouching. Her face is slim and symmetrical, like a model's, her teeth are white and aligned, her skin is clear, youthful and attractive; Her hair is tied up in a bun. No makeup. The scene takes place in an open-air setting, like a typical Brazilian farm, a farm with banana trees, chickens, plenty of land, trees, and vegetation all around. Audio: The woman brings the camera close to her face and says in Brazilian Portuguese: \"É difícil de acreditar que eu não sou real né? Mas isso é porque eu sou linda, eu entendo!\". After the first sentence, the woman laughs naturally. After the laugh, the woman speaks again: \"O passo a passo pra gerar vídeos assim está no link, só clicar!\". Shoulders framed by a white tank top with thin straps. Neutral and slightly blurred background. No text on the screen, no stickers, just the selfie in storyboard style.`
  },
  {
    id: 9,
    category: "Builder",
    likes: 109,
    image: "/assets/builder-09.webp",
    promptText: `Ultra-realistic close-up of a 20-year-old blonde influencer with slightly wavy blonde hair, 8K resolution, natural creator-style photography. Final hyper-realistic close-up scene, wearing a white Prada tank top, blue jeans, and a visible DJI lapel microphone. Same home environment with neutral light wall and warm cozy interior lighting. Camera at eye level, close-up of face and upper shoulders, vertical 9:16 framing. Her face fills most of the frame creating intimacy and trust. Warm and genuine smile, friendly eyes, relaxed facial muscles, confident yet approachable. She looks happy, calm, and trustworthy — not posing. Looking directly at the lens with a slight natural head tilt, minimal movement. Her expression clearly suggests \"trust me, come with me, click the link, follow me\" — the exact second before or after a call to action. Soft and even light on the face, natural skin highlights, no harsh shadows, visible realistic skin texture. No cinematic lighting, pure creator realism. Smartphone/creator aesthetic, everything in focus, no blur, no bokeh, no HDR. Looks like a real final frame from a TikTok or Reel. Final hook moment of trust, high conversion potential, ideal for last frame of video, thumbnail, CTA in Stories, or remarketing impression.`
  },
  {
    id: 10,
    category: "Builder",
    likes: 110,
    image: "/assets/builder-10.webp",
    promptText: `Ultra-photorealistic 9:16 vertical iPhone 15 Pro Max front camera selfie of a young blonde woman sitting inside a car with brown leather seats. 8K resolution, natural iPhone camera realism with visible sensor noise, slight 24mm barrel distortion, iOS oversharpening artifacts. She has straight light blonde hair, loose, oval face shape, full lips, slim nose, smooth glowing skin with natural highlight on cheekbones, fine pores visible under the light, glossy lip texture, long almond-shaped nails painted in dark wine/burgundy polish. She wears a white ribbed cotton turtleneck tank top fitted to the body with a small silver metallic detail at the neckline, a dark brown leather jacket draped over her arms with visible metal zippers, dark oval sunglasses with slightly translucent tortoiseshell frame, thick gold hoop earrings. She holds a large clear plastic Dunkin' iced coffee cup with an orange straw near her face, lips slightly pursed around the straw. Neutral relaxed expression, eyes hidden behind sunglasses directed at the camera. Selfie taken from a slight low angle, medium-close shot from bust up. Left hand holding the phone out of frame. Car interior background with modern clean interior, sunroof/windows showing diffused daylight. Natural daylight entering through the front and top windows illuminating her face and chest softly. Medium contrast between illuminated skin and darker car interior background. No studio lighting, no ring light, no flash, no warm/orange tones. Lo-fi quality, not extremely sharp, looks like a real iPhone selfie posted online. Slight reflections of the car interior visible on the sunglasses lenses. Casual urban lifestyle aesthetic, 'that girl' vibe, trendy and confident.`
  },
  {
    id: 11,
    category: "Builder",
    likes: 111,
    image: "/assets/builder-11.webp",
    promptText: `Ultra-photorealistic 9:16 vertical iPhone 15 Pro Max front camera mirror selfie of a Brazilian woman inside a metal elevator. 8K resolution, natural iPhone camera realism with visible sensor noise, slight 24mm barrel distortion, iOS oversharpening artifacts. Oval face with well-defined jawline, dark arched eyebrows, dark almond-shaped brown eyes, straight nose with thin tip, full lips with nude/rose gloss, light makeup. Long straight dark wet-looking hair slicked back falling over shoulders. Intensely tanned skin with visible bikini tan lines on the chest, natural moisture/sweat shine on skin, realistic irregular skin texture with fine visible pores on nose and cheeks, micro expression marks, small natural sun spots. Extensive tattoos covering right forearm and upper arm, small tattoos on stomach, tattoos on left hand and wrist. Small earrings, rings on both hands, multiple fabric and metal bracelets on left wrist, metallic bracelet on right wrist. Wearing a dark brown bandeau tube top stretched tight on the body with subtle fine ribbed texture, and a beige/cream low-waist cargo-style mini skirt with two large front pockets with buttoned flaps. Standing with relaxed posture, hip slightly shifted to the right, left leg slightly forward. Left hand raised holding iPhone with brown/caramel case partially covering lower left cheek, right hand relaxed by right leg. Looking directly at the phone screen reflected in the mirror, mouth closed with subtle smirk. Confident neutral expression. Elevator interior with reflective brushed steel walls, dark elevator control panel slightly visible on the right, white warning sign on the metal wall behind. Overhead fluorescent/LED white light creating strong highlights on chest, face and hard reflections on metal panels. Light bouncing off metal walls filling body shadows. Medium to high contrast emphasizing the tan and skin shine against metallic background. No studio lighting, no ring light, no flash. Lo-fi quality, not extremely sharp, looks like a real iPhone selfie posted online. Strong specular reflections blown out in metal areas, slight motion blur at edges.`
  },
  {
    id: 12,
    category: "Builder",
    likes: 112,
    image: "/assets/builder-12.webp",
    promptText: `Possui cabelo loiro, longo, volume equilibrado e movimento suave, com fios visíveis, textura realista e brilho sutil refletindo a iluminação ambiente. Corpo atlético, slim e definido de forma elegante e proporcional. A maquiagem é glamourosa e bem acabada, com pele levemente bronzeada, contorno suave destacando as maçãs do rosto, cílios definidos, olhos com esfumado neutro sofisticado e lábios nude com brilho discreto. A expressão é confiante, segura e serena, transmitindo elegância e presença. Ela veste um vestido mini de um ombro só na cor laranja queimado profundo. O vestido possui caimento ajustado ao corpo, com drapeado assimétrico na região do busto e tecido acetinado de acabamento suave, que reflete a luz de forma sutil e elegante, sem brilho excessivo. As pernas estão à mostra, sem meia-calça. Os acessórios são minimalistas e refinados, incluindo argolas douradas finas e um colar dourado delicado, reforçando uma estética clean e sofisticada. A cena acontece no interior de um carro de luxo durante a noite, com a mulher sentada no banco do passageiro dianteiro. O interior apresenta estofamento em couro claro ou preto, com costuras visíveis no encosto de cabeça, iluminação ambiente suave e detalhes de acabamento premium. Pela janela lateral, luzes urbanas aparecem suavemente desfocadas, sem dominar a cena, mantendo o foco no interior elegante e reservado do veículo. A iluminação combina a luz ambiente interna do carro com um leve reflexo da iluminação urbana externa, criando realces delicados no rosto, no cabelo e no vestido, com sombras suaves e bem distribuídas. A atmosfera é sofisticada, noturna e exclusiva. A composição segue um estilo fashion editorial, capturada com câmera Canon EOS 5D Mark IV e lente 50mm, ISO 640, abertura f/1.8 e velocidade 1/125s. O enquadramento vai do meio das coxas até logo acima da cabeça, com a câmera posicionada levemente acima do nível dos olhos, inclinada suavemente para baixo. A mulher está sentada com um dos ombros levemente voltado para a câmera, postura relaxada e segura. O fundo permanece suavemente desfocado. A imagem apresenta alto nível de fidelidade visual, com textura realista do couro dos bancos, reflexos sutis da iluminação ambiente, caimento natural do tecido acetinado, textura natural da pele, proporções corporais corretas, foco limpo e ausência total de distorções, filtros ou estilizações artificiais.`
  },
  {
    id: 13,
    category: "Builder",
    likes: 113,
    image: "/assets/builder-13.webp",
    promptText: `[STYLE: Casual selfie in the mirror, checking the outfit of the day, spontaneous home photography, smartphone realism], [POSE: Mirror reflection, standing, female figure, 20 years old, slightly leaning forward, holding smartphone with both hands at chest height, one hand interacting with the waistband of her pants, head tilted], [TEXTURES: White ribbed cotton tank top (stretched fabric at the chest), denim shorts, blonde hair in a bun, reflective mirror surface, cold polished marble floor], [SETTING: Interior of a spacious bathroom, arched doorway in the background, sink countertop in the foreground], [LIGHTING AND CAMERA: Warm tungsten lighting on the bathroom ceiling, soft shadows, mirror reflection photographed with a smartphone (iPhone Pro with a triple-lens setup), 24mm main lens, f/1.7, slight motion blur on the hand], [VISUAL EFFECTS: Dust particles on the mirror, slight lens flare due to light superior, natural color correction without editing].`
  },
  {
    id: 14,
    category: "Builder",
    likes: 114,
    image: "/assets/builder-14.webp",
    promptText: `{
  \"prompt_type\": \"photorealistic mirror selfie\",
  \"subject\": {
    \"character\": \"same as reference image\",
    \"description\": \"Thin, slender Gen Z woman with a penetrating, playful gaze.\",
    \"action_and_expression\": {
      \"pose\": \"Squatting wide in front of a full-length mirror in a bedroom.\",
      \"hands\": \"Holding a smartphone with both hands, taking a selfie of her reflection.\",
      \"expression\": \"Playful expression with a pout, pink-plum lips, looking directly at the phone.\"
    }
  },
  \"clothing\": {
    \"top\": \"Off-the-shoulder top\",
    \"bottom\": \"Short skirt\",
    \"footwear\": \"High-heeled sandals, emphasized by the squatting position\"
  },
  \"environment_and_background\": {
    \"room_style\": \"Modern bedroom, slightly messy but inviting\",
    \"floor\": \"Soft gray rug\",
    \"walls\": \"White walls decorated with minimalist line art above the bed\"
  },
  \"lighting_and_style\": {
    \"lighting\": \"Soft, natural daylight typical of a well-lit room during the day\",
    \"camera_style\": \"Candid photo taken with a high-end mobile phone\",
    \"focus\": \"Sharp focus on subject with slight natural blur on distant bedroom elements\"
  },
  \"image_quality\": {
    \"realism\": \"Photorealistic\",
    \"aesthetic\": \"Casual, unposed, social-media style\"
  },
  \"critical_requirements\": {
    \"IDENTITY\": \"facial features, hair, eye color, and skin tone must exactly match the reference image\",
    \"POSE\": \"wide squat mirror selfie holding phone with both hands\",
    \"EXPRESSION\": \"playful pout while looking directly at the phone\",
    \"SETTING\": \"modern bedroom with gray rug and minimalist wall art\",
    \"LIGHTING\": \"soft natural daylight\"
  }
}`
  },
  {
    id: 15,
    category: "Builder",
    likes: 115,
    image: "/assets/builder-15.webp",
    promptText: `{
  \"meta\": {
    \"aspect_ratio\": \"9:16\",
    \"quality\": \"ultra_photorealistic\",
    \"resolution\": \"8k\",
    \"camera\": \"câmera frontal do iPhone 15 Pro Max\",
    \"lens\": \"24mm grande angular\",
    \"style\": \"realismo de câmera de iPhone, não de estúdio, não profissional, textura natural visível\"
  },
  \"character_lock\": {
    \"identity_source\": \"\",
    \"face_identity\": [
      \"Jovem mulher brasileira com rosto oval, maxilar bem definido, nariz reto, lábios carnudos naturais com gloss transparente, pele clara, sobrancelhas arqueadas e naturais, assimetria natural mantida, sem alteração facial, sem erros de troca de rosto, sem rosto genérico de IA\"
    ],
    \"regras_de_aparencia\": {
      \"cabelo_e_pele\": \"cabelo loiro liso, comprimento médio, dividido ao meio com mechas frontais levemente bagunçadas sobre o rosto; tom de pele claro, textura de pele extremamente realista e irregular, com poros dilatados visíveis na zona T e bochechas, pequenas sardas, sinais e pequenas marcas naturais no rosto, leve oleosidade/brilho no nariz e testa devido ao flash\",
      \"tatuagens_e_marcas\": \"pequena tatuagem escura de um símbolo na parte interna do antebraço direito\"
    }
  },
  \"cena\": {
    \"local\": \"festa noturna, balada ou evento escuro\",
    \"ambiente\": [
      \"fundo muito escuro\",
      \"pessoas borradas e silhuetas escuras ao fundo\",
      \"estado do ambiente agitado e lotado\"
    ],
    \"atmosfera\": \"vibe de festa, energia caótica, diversão noturna candid\"
  },
  \"iluminacao\": {
    \"tipo\": \"flash direto de celular\",
    \"luz_principal\": \"flash duro e frontal vindo diretamente da direção da câmera, iluminando fortemente o rosto e o peito\",
    \"luz_de_preenchimento\": \"sombras duras projetadas logo atrás da modelo, fundo subexposto\",
    \"contraste\": \"contraste muito alto entre a modelo superiluminada e o fundo escuro\",
    \"evitar\": [
      \"iluminação de estúdio\",
      \"ring light artificial\",
      \"aparência profissional\",
      \"tons quentes/laranja\",
      \"flash estourado\"
    ]
  },
  \"perspectiva_da_camera\": {
    \"pov\": \"foto tirada por um amigo muito próximo ou selfie com braço completamente fora de quadro\",
    \"angulo\": \"frontal, levemente de cima para baixo (câmera um pouco acima da linha dos olhos)\",
    \"distancia\": \"corte do peito para cima (close-up médio)\",
    \"visibilidade_do_celular\": \"não visível\"
  },
  \"assunto\": {
    \"genero\": \"feminino\",
    \"idade\": \"20 anos\",
    \"vibe\": \"party girl, descontraída, confiante\",
    \"textura_pele\": \"textura irregular humana autêntica, poros proeminentes sob luz dura, micro marcas e pintas naturais, brilho de suor real e oleosidade na zona T, micro linhas de expressão ao redor do olho que está piscando\",
    \"expressao\": {
      \"olhos\": \"olho direito levemente semicerrado pela luz, olho esquerdo piscando forte\",
      \"boca\": \"boca aberta em sorriso com a língua esticada para fora\",
      \"emocao\": \"euforia, brincadeira, rebeldia\"
    },
    \"pose\": {
      \"posicao\": \"em pé, ombros levemente levantados em tom de brincadeira\",
      \"apoio\": \"sem apoio visível\",
      \"mao\": \"mão direita erguida acima do ombro segurando a haste e a base do bojo de uma grande taça de gin/coquetel cheia de gelo e limão/hortelã; unhas compridas amendoadas pintadas de branco\"
    },
    \"roupa\": {
      \"blusa\": {
        \"tipo\": \"top estilo frente única (halter top) com amarração fina no pescoço\",
        \"caimento\": \"justo no busto\",
        \"detalhes\": \"tecido brilhante em tom de bronze/dourado escuro com textura de paetês ou malha de metal refletindo pontualmente a luz do flash\"
      },
      \"extra\": [
        \"colar fino de ouro com um pingente numérico ('422')\",
        \"vários braceletes largos e rígidos em tons de ouro e preto no pulso direito\",
        \"anéis finos nos dedos indicador e anelar da mão direita\"
      ]
    }
  },
  \"qualidade_da_imagem\": {
    \"foco\": \"foco principal cravado no rosto e na taça em primeiro plano, fundo completamente fora de foco\",
    \"granulacao\": \"ruído visível em baixa luminosidade\",
    \"nitidez\": \"NÃO extremamente nítida, mais lo-fi\",
    \"realismo\": \"parece uma selfie real de iPhone postada online\",
    \"artefatos_de_sensor\": \"pequenos pontos estourados de luz no vidro da taça e nas lantejoulas da roupa\",
    \"distorcao_de_lente\": \"barrel distortion leve de 24mm, esticando levemente as bordas\",
    \"pos_processamento\": \"nitidez artificial (oversharpening) típica de algoritmo iOS\"
  }
}`
  },
  {
    id: 16,
    category: "Builder",
    likes: 116,
    image: "/assets/builder-16.webp",
    promptText: `{
  \"metadata\": {
    \"id\": \"nightlife_female_001\",
    \"category\": \"Rolê Noite\",
    \"tags\": [
      \"nightlife\",
      \"party\",
      \"club\",
      \"neon\",
      \"fun\"
    ],
    \"gender\": \"female\",
    \"ethnicity\": \"brazilian\",
    \"age_range\": \"20-25\",
    \"format\": \"9:16\"
  },
  \"final_prompt\": \"((ultra realistic)), 8k uhd, photorealistic, professional nightlife photography, sharp focus, highly detailed, young Brazilian female nightlife influencer, 22 years old, youthful expressive face, playful features, energetic open mouth smile, wild party expression, natural skin texture with club lighting glow, party makeup with glossy lips and shimmer, long straight dark brown hair slightly messy, black fitted crop top and black mini skirt, nightlife outfit, neon futuristic sunglasses, small shoulder bag, wristband, ((well-manicured hands with five fingers, natural hand anatomy)):1.3, colorful glossy nails, one hand making playful gesture, other holding ((transparent glass with dark beverage)):1.2 with ice cubes, held at chest level angled toward camera, standing leaning forward in dynamic party stance, looking directly at camera through sunglasses, expressive candid nightclub pose, medium full body shot, vertical 9:16, f/2.0 aperture, shallow depth of field, heavy club bokeh, direct flash lighting with neon ambient lights, high contrast, mixed cool and warm tones, crowded nightclub dance floor background, blurred dancing crowd, neon lights and lasers, dark environment with colorful highlights, high energy party atmosphere, neon color palette with blues purples greens, wild energetic mood, slightly high saturation, authentic nightlife snapshot style, spontaneous chaotic fun, real party moment\",
  \"negative_prompt_compiled\": \"deformed hands, extra fingers, missing fingers, bad anatomy, blurry face, low quality, cartoon, anime, unrealistic, plastic skin, watermark, harsh lighting, bad framing, oversaturated, clean studio background, empty club, dead eyes, duplicate people, floating objects, 3D render, unnatural skin tones, wig-like hair, multiple faces\",
  \"api_parameters\": {
    \"width\": 512,
    \"height\": 912,
    \"steps\": 45,
    \"cfg_scale\": 7.5,
    \"sampler\": \"DPM++ 2M Karras\",
    \"seed\": -1
  }
}`
  },
  {
    id: 17,
    category: "Builder",
    likes: 117,
    image: "/assets/builder-17.webp",
    promptText: `{
  \"metadata\": {
    \"id\": \"ugc_mirror_fashion_004\",
    \"category\": \"UGC + Produto\",
    \"tags\": [
      \"mirror selfie\",
      \"fashion\",
      \"outfit\",
      \"lifestyle\",
      \"mobile\"
    ],
    \"gender\": \"female\",
    \"ethnicity\": \"mixed\",
    \"age_range\": \"23-28\",
    \"format\": \"9:16\"
  },
  \"final_prompt\": \"((ultra realistic)), 8k uhd, photorealistic, professional smartphone photography, sharp focus, highly detailed, beautiful female fashion influencer taking mirror selfie in bedroom, 25 years old, symmetrical face, full lips, defined cheekbones, confident expression with slightly open lips, smooth natural glowing skin with realistic pores, soft glam makeup with winged eyeliner and nude glossy lips, long dark brown hair in loose voluminous waves, green textured long sleeve crop top with front tie detail, white fitted mini skirt, layered gold necklaces, ((well-manicured hands, five fingers, natural anatomy)):1.3, long nude glossy nails, one hand holding ((modern smartphone with visible rear cameras)):1.3, ((graphic case clearly visible)):1.25, other hand raised making peace sign, standing in front of mirror with slight hip tilt, looking at phone reflection, confident mirror selfie pose, medium shot from mid-thigh to head, vertical 9:16 format, f/2.8 aperture, moderate depth of field, soft diffused natural indoor lighting, 5200K daylight, bedroom interior with bed and mirror reflection slightly blurred, neutral tones with green and white accents, stylish trendy mood, authentic UGC mirror selfie aesthetic, relatable confident vibe\",
  \"negative_prompt_compiled\": \"deformed hands, extra fingers, missing fingers, bad anatomy, blurry phone, unreadable details, low quality, blurry, cartoon, anime, unrealistic, plastic skin, watermark, signature, harsh lighting, overexposed, bad framing, oversaturated, busy background, forced smile, dead eyes, duplicate people, floating objects, disfigured face, extra limbs, jpeg artifacts, 3D render, fake looking, unnatural lighting, wrong colors, unnatural skin tones, distracting background, wig-like hair, multiple faces\",
  \"api_parameters\": {
    \"width\": 512,
    \"height\": 912,
    \"steps\": 45,
    \"cfg_scale\": 7.5,
    \"sampler\": \"DPM++ 2M Karras\",
    \"seed\": -1
  }
}`
  },
  {
    id: 18,
    category: "Builder",
    likes: 118,
    image: "/assets/builder-18.webp",
    promptText: `{
  \"subject\": {
    \"description\": \"Young attractive woman taking a selfie with the front camera of her iPhone, phone held just outside the frame so only her face and upper chest are visible, looking straight at the lens with a sensual, confident vibe\",
    \"age\": \"mid 20s\",
    \"expression\": \"seductive, relaxed, intense eye contact, slightly parted lips, subtle half-smile\",
    \"hair\": {
      \"color\": \"Blonde\",
      \"style\": \"long slightly wavy hair, loose strands framing her face, a few flyaways\"
    },
    \"clothing\": {
      \"top\": {
        \"type\": \"tight fitted tank top\",
        \"color\": \"black\",
        \"details\": \"thin straps, low but tasteful neckline, showing shoulders and collarbones\"
      },
      \"bottom\": {
        \"type\": \"not visible\",
        \"color\": \"\",
        \"details\": \"\"
      }
    },
    \"face\": {
      \"preserve_original\": true,
      \"makeup\": \"soft glam, defined brows, eyeliner, volumized lashes, warm bronzer and blush, nude lips, very realistic skin texture with visible pores, slight blemishes, tiny imperfections, natural shine on nose and forehead\"
    }
  },
  \"accessories\": {
    \"headwear\": {
      \"type\": \"none\",
      \"details\": \"\"
    },
    \"jewelry\": {
      \"earrings\": \"small gold hoops\",
      \"necklace\": \"thin gold chain on collarbones\",
      \"wrist\": \"simple bracelet\",
      \"rings\": \"minimalist gold rings, fingers barely at the edge of frame\"
    },
    \"device\": {
      \"type\": \"smartphone front camera selfie\",
      \"details\": \"iPhone selfie look, phone off-frame\"
    },
    \"prop\": {
      \"type\": \"none\",
      \"details\": \"\"
    }
  },
  \"photography\": {
    \"camera_style\": \"iPhone front camera, realistic selfie\",
    \"angle\": \"slightly high angle, camera tilted a bit downward\",
    \"shot_type\": \"tight close-up from chest up, slightly off-center\",
    \"aspect_ratio\": \"9:16 vertical\",
    \"texture\": \"hyper-realistic skin, visible pores and fine hair, subtle under-eye shadows, natural grain, sharp focus on eyes, social media realism\"
  },
  \"background\": {
    \"setting\": \"casual bedroom\",
    \"wall_color\": \"soft beige or light warm gray\",
    \"elements\": [
      \"unmade bed with slightly wrinkled white duvet\",
      \"small bedside table with a glass of water\",
      \"charger cable loosely visible\",
      \"tote bag hanging on door in soft blur\"
    ],
    \"atmosphere\": \"intimate, relaxed, slightly provocative but natural\",
    \"lighting\": \"soft natural daylight from side window, gentle warm tone, light shadows enhancing cheekbones\"
  }
}`
  },
  {
    id: 19,
    category: "Builder",
    likes: 119,
    image: "/assets/builder-19.webp",
    promptText: `Ultra photorealistic 8K UHD iPhone 15 Pro Max style, 9:16 vertical format, 24mm wide angle lens. Young Brazilian woman with oval face, well-defined jawline, straight thin nose, glossy pink lips, white aligned teeth visible in a wide laugh, slightly arched filled eyebrows, pronounced highlighter makeup, almond-shaped eyes. Very long wavy voluminous light brown-auburn highlighted hair. Bronzed skin tone with body shimmer highlighter on chest area, realistic irregular skin texture on face with clearly visible pores under flash light, small natural marks and typical asymmetries of real human skin. Eyes closed squeezed shut from intense laughter looking down, mouth wide open in a big hearty laugh with lips stretched and teeth showing, extreme joy and fun expression. Torso slightly turned to the side, relaxed shoulders in a dancing celebrating movement, standing in the middle of a crowd. Right arm raised holding a transparent plastic cup with draft beer. Wearing a light blue tailored blazer style jacket worn closed with no top underneath, deep V neckline, fitted and structured, matte fabric with dark metallic center button and visible stitching. Thin gold necklace with square pendant containing letter C, multiple colorful VIP festival access wristbands on right wrist. Night party music show or festival setting with blurred people crowd in background, blue and purple stage lights with bokeh effect, dark energetic nightlife atmosphere. Intense direct flash from front and slightly above revealing real skin textures and pores, illuminating face chest and raised cup strongly, blue and purple ambient show lights filling dark background, high contrast between brightly lit subject and dark colorful background. Visible grainy noise in low light, not extremely sharp more lo-fi feel, background colors blown out by stage lights, hair edges slightly blending with background, slight 24mm barrel distortion stretching edges, iOS oversharpening artificial sharpness. Energetic festive euphoric nightlife atmosphere.`
  },
  {
    id: 20,
    category: "Builder",
    likes: 120,
    image: "/assets/builder-20.webp",
    promptText: `{
  \"metadata\": {
    \"id\": \"runner_female_002\",
    \"category\": \"Influencer Corredora\",
    \"tags\": [
      \"running\",
      \"sports\",
      \"outdoor\",
      \"action\",
      \"race\"
    ],
    \"gender\": \"female\",
    \"ethnicity\": \"european\",
    \"age_range\": \"25-30\",
    \"format\": \"9:16\"
  },
  \"prompt_structure\": {
    \"quality_modifiers\": \"((ultra realistic)), 8k uhd, photorealistic, professional action sports photography, high resolution, sharp focus\",
    \"subject\": {
      \"main_description\": \"athletic young female runner during road race event\",
      \"age\": \"27 years old\",
      \"facial_features\": \"symmetrical face, defined cheekbones, athletic natural beauty\",
      \"expression\": \"joyful energetic smile, authentic happiness\",
      \"skin\": \"natural skin texture, healthy glow, slight perspiration\",
      \"makeup\": \"minimal athletic makeup, natural look\"
    },
    \"hair\": {
      \"style\": \"short tied back with loose strands\",
      \"color\": \"blonde\",
      \"texture\": \"natural movement with strands flying due to motion\"
    },
    \"clothing\": {
      \"description\": \"black textured sports bra and high-waisted black running shorts\",
      \"style\": \"athletic performance running outfit\",
      \"accessories\": \"wireless in-ear earbuds, mirrored wraparound visor sunglasses, race bib\"
    },
    \"hands_nails\": {
      \"description\": \"((natural hands with five fingers clearly visible, correct anatomy)):1.3\",
      \"nails\": \"short natural nails\",
      \"pose\": \"one hand holding smartphone, other raised in playful gesture\"
    },
    \"product\": {
      \"type\": \"none\",
      \"description\": \"N/A\",
      \"positioning\": \"N/A\"
    },
    \"pose_composition\": {
      \"body_position\": \"mid-run dynamic stride, forward motion\",
      \"eye_direction\": \"looking forward\",
      \"overall_pose\": \"energetic running pose captured mid-motion\"
    },
    \"camera_settings\": {
      \"shot_type\": \"medium action shot from front\",
      \"aperture\": \"f/2.8\",
      \"depth_of_field\": \"shallow depth with background blur\",
      \"format\": \"vertical 9:16\"
    },
    \"lighting\": {
      \"primary\": \"natural daylight\",
      \"quality\": \"bright and even\",
      \"direction\": \"frontal natural light\",
      \"temperature\": \"5500K natural daylight\"
    },
    \"background\": {
      \"setting\": \"outdoor road race event\",
      \"description\": \"blurred runners behind, paved street, greenery\",
      \"atmosphere\": \"lively athletic event with motion blur\"
    },
    \"color_grading\": {
      \"palette\": \"neutral blacks with natural skin tones and colorful reflections\",
      \"mood\": \"energetic and vibrant\",
      \"saturation\": \"natural balanced tones\"
    },
    \"style_aesthetic\": {
      \"photography_style\": \"professional sports action photography\",
      \"mood\": \"dynamic, joyful, energetic\",
      \"authenticity\": \"genuine race moment, not staged\"
    }
  },
  \"final_prompt\": \"((ultra realistic)), 8k uhd, photorealistic, professional action sports photography, high resolution, sharp focus, athletic young female runner, 27 years old, joyful energetic smile, symmetrical face, natural beauty, healthy glowing skin with slight perspiration, minimal athletic makeup, short blonde hair tied back with loose strands flying in motion, wearing mirrored wraparound rainbow visor sunglasses, black textured sports bra, high-waisted black running shorts, wireless earbuds, race bib with visible text ((128 Amanda)):1.25, holding smartphone in one hand, other hand raised playfully, small upper arm tattoo visible, ((natural hands with five fingers clearly visible, correct anatomy)):1.3, dynamic mid-run stride, forward motion, front-facing medium action shot, shallow depth of field, blurred runners behind, outdoor road race environment with paved street and greenery, bright natural daylight, even lighting, vibrant reflections in sunglasses, motion clarity, HDR, DSLR quality, 85mm telephoto lens, fast shutter speed, f/2.8 aperture, low ISO, energetic athletic atmosphere\",
  \"negative_prompt_compiled\": \"deformed hands, extra fingers, missing fingers, bad anatomy, blurry product, unreadable label, low quality, blurry, cartoon, anime, unrealistic, plastic skin, watermark, signature, harsh lighting, overexposed, bad framing, oversaturated, busy background, forced smile, dead eyes, duplicate people, floating objects, disfigured face, extra limbs, jpeg artifacts, 3D render, fake looking, unnatural lighting, wrong colors, unnatural skin tones, distracting background, wig-like hair, multiple faces\",
  \"api_parameters\": {
    \"width\": 512,
    \"height\": 912,
    \"steps\": 45,
    \"cfg_scale\": 7.5,
    \"sampler\": \"DPM++ 2M Karras\",
    \"seed\": -1
  }
}`
  },
  {
    id: 21,
    category: "Builder",
    likes: 121,
    image: "/assets/builder-21.webp",
    promptText: `{
  \"metadata\": {
    \"id\": \"runner_female_004\",
    \"category\": \"Influencer Corredora\",
    \"tags\": [
      \"running\",
      \"race\",
      \"marathon\",
      \"fitness\",
      \"outdoor\"
    ],
    \"gender\": \"female\",
    \"ethnicity\": \"brazilian\",
    \"age_range\": \"25-30\",
    \"format\": \"9:16\"
  },
  \"prompt_structure\": {
    \"quality_modifiers\": \"((ultra realistic)), 8k uhd, photorealistic, professional action sports photography, sharp focus, highly detailed\",
    \"subject\": {
      \"main_description\": \"athletic Brazilian female runner influencer participating in a street race\",
      \"age\": \"26 years old\",
      \"facial_features\": \"defined cheekbones, athletic face, bright smile, symmetrical features\",
      \"expression\": \"joyful energetic smile, excited race energy\",
      \"skin\": \"healthy athletic skin, natural glow with sweat\",
      \"makeup\": \"minimal athletic makeup, natural look\"
    },
    \"hair\": {
      \"style\": \"high ponytail\",
      \"color\": \"blonde with natural highlights\",
      \"texture\": \"slightly messy from running motion\"
    },
    \"clothing\": {
      \"description\": \"black sports bra and black running shorts with race bib\",
      \"style\": \"performance race outfit, fitted athletic wear\",
      \"accessories\": \"((reflective sports sunglasses)):1.2, race bib number pinned to shorts, running shoes\"
    },
    \"hands_nails\": {
      \"description\": \"((athletic hands, five fingers, natural hand anatomy)):1.3\",
      \"nails\": \"short natural nails\",
      \"pose\": \"one hand holding smartphone, other hand making peace sign gesture while running\"
    },
    \"product\": {
      \"type\": \"((smartphone)):1.3\",
      \"description\": \"((black smartphone with screen facing inward)):1.2\",
      \"positioning\": \"held in hand at chest level, visible while running\"
    },
    \"pose_composition\": {
      \"body_position\": \"mid-run stride with dynamic forward motion\",
      \"eye_direction\": \"looking toward camera\",
      \"overall_pose\": \"captured in action during race, energetic and lively movement\"
    },
    \"camera_settings\": {
      \"shot_type\": \"dynamic medium full-body action shot\",
      \"aperture\": \"f/2.8\",
      \"depth_of_field\": \"shallow depth with background runners slightly blurred\",
      \"format\": \"vertical 9:16\"
    },
    \"lighting\": {
      \"primary\": \"natural outdoor daylight\",
     
<truncated 158469 bytes>

NOTE: The output was truncated because it was too long. Use a more targeted query or a smaller range to get the information you need.`
  },
  {
    id: 201,
    category: "Influenciadoras",
    likes: 151,
    image: "/assets/influencer-01.jpg",
    promptText: ""
  },
  {
    id: 202,
    category: "Influenciadoras",
    likes: 152,
    image: "/assets/influencer-02.jpg",
    promptText: ""
  },
  {
    id: 203,
    category: "Influenciadoras",
    likes: 153,
    image: "/assets/influencer-03.jpg",
    promptText: ""
  },
  {
    id: 204,
    category: "Influenciadoras",
    likes: 154,
    image: "/assets/influencer-04.jpg",
    promptText: ""
  },
  {
    id: 205,
    category: "Influenciadoras",
    likes: 155,
    image: "/assets/influencer-05.jpg",
    promptText: ""
  },
  {
    id: 206,
    category: "Influenciadoras",
    likes: 156,
    image: "/assets/influencer-06.jpg",
    promptText: ""
  },
  {
    id: 207,
    category: "Influenciadoras",
    likes: 157,
    image: "/assets/influencer-07.jpg",
    promptText: ""
  },
  {
    id: 208,
    category: "Influenciadoras",
    likes: 158,
    image: "/assets/influencer-08.jpg",
    promptText: ""
  },
  {
    id: 209,
    category: "Influenciadoras",
    likes: 159,
    image: "/assets/influencer-09.jpg",
    promptText: ""
  },
  {
    id: 210,
    category: "Influenciadoras",
    likes: 160,
    image: "/assets/influencer-10.jpg",
    promptText: ""
  },
  {
    id: 211,
    category: "Influenciadoras",
    likes: 161,
    image: "/assets/influencer-11.jpg",
    promptText: ""
  },
  {
    id: 212,
    category: "Influenciadoras",
    likes: 162,
    image: "/assets/influencer-12.jpg",
    promptText: ""
  },
  {
    id: 213,
    category: "Influenciadoras",
    likes: 163,
    image: "/assets/influencer-13.jpg",
    promptText: ""
  },
  {
    id: 214,
    category: "Influenciadoras",
    likes: 164,
    image: "/assets/influencer-14.jpg",
    promptText: ""
  },
  {
    id: 215,
    category: "Influenciadoras",
    likes: 165,
    image: "/assets/influencer-15.jpg",
    promptText: ""
  },
  {
    id: 216,
    category: "Influenciadoras",
    likes: 166,
    image: "/assets/influencer-16.jpg",
    promptText: ""
  },
  {
    id: 217,
    category: "Influenciadoras",
    likes: 167,
    image: "/assets/influencer-17.jpg",
    promptText: ""
  },
  {
    id: 218,
    category: "Influenciadoras",
    likes: 168,
    image: "/assets/influencer-18.jpg",
    promptText: ""
  },
  {
    id: 219,
    category: "Influenciadoras",
    likes: 169,
    image: "/assets/influencer-19.jpg",
    promptText: ""
  },
  {
    id: 220,
    category: "Influenciadoras",
    likes: 170,
    image: "/assets/influencer-20.jpg",
    promptText: ""
  },
  {
    id: 301,
    category: "Ambientes",
    likes: 251,
    image: "/assets/ambiente-01.jpg",
    promptText: ""
  },
  {
    id: 302,
    category: "Ambientes",
    likes: 252,
    image: "/assets/ambiente-02.jpg",
    promptText: ""
  },
  {
    id: 303,
    category: "Ambientes",
    likes: 253,
    image: "/assets/ambiente-03.jpg",
    promptText: ""
  },
  {
    id: 304,
    category: "Ambientes",
    likes: 254,
    image: "/assets/ambiente-04.jpg",
    promptText: ""
  },
  {
    id: 305,
    category: "Ambientes",
    likes: 255,
    image: "/assets/ambiente-05.jpg",
    promptText: ""
  },
  {
    id: 306,
    category: "Ambientes",
    likes: 256,
    image: "/assets/ambiente-06.jpg",
    promptText: ""
  },
  {
    id: 307,
    category: "Ambientes",
    likes: 257,
    image: "/assets/ambiente-07.jpg",
    promptText: ""
  },
  {
    id: 308,
    category: "Ambientes",
    likes: 258,
    image: "/assets/ambiente-08.jpg",
    promptText: ""
  },
  {
    id: 309,
    category: "Ambientes",
    likes: 259,
    image: "/assets/ambiente-09.jpg",
    promptText: ""
  },
  {
    id: 310,
    category: "Ambientes",
    likes: 260,
    image: "/assets/ambiente-10.jpg",
    promptText: ""
  },
  {
    id: 311,
    category: "Ambientes",
    likes: 261,
    image: "/assets/ambiente-11.jpg",
    promptText: ""
  },
  {
    id: 312,
    category: "Ambientes",
    likes: 262,
    image: "/assets/ambiente-12.jpg",
    promptText: ""
  },
  {
    id: 313,
    category: "Ambientes",
    likes: 263,
    image: "/assets/ambiente-13.jpg",
    promptText: ""
  },
  {
    id: 314,
    category: "Ambientes",
    likes: 264,
    image: "/assets/ambiente-14.jpg",
    promptText: ""
  },
  {
    id: 315,
    category: "Ambientes",
    likes: 265,
    image: "/assets/ambiente-15.jpg",
    promptText: ""
  },
  {
    id: 316,
    category: "Ambientes",
    likes: 266,
    image: "/assets/ambiente-16.jpg",
    promptText: ""
  },
  {
    id: 317,
    category: "Ambientes",
    likes: 267,
    image: "/assets/ambiente-17.jpg",
    promptText: ""
  },
  {
    id: 318,
    category: "Ambientes",
    likes: 268,
    image: "/assets/ambiente-18.jpg",
    promptText: ""
  },
  {
    id: 319,
    category: "Ambientes",
    likes: 269,
    image: "/assets/ambiente-19.jpg",
    promptText: ""
  },
  {
    id: 320,
    category: "Ambientes",
    likes: 270,
    image: "/assets/ambiente-20.jpg",
    promptText: ""
  },
  {
    id: 400,
    category: "Trocas",
    likes: 300,
    image: "/assets/troca-roupa-inferior.jpg",
    promptText: "Parte inferior"
  },
  {
    id: 401,
    category: "Trocas",
    likes: 301,
    image: "/assets/troca-roupa-superior.jpg",
    promptText: "Parte superior"
  },
  {
    id: 402,
    category: "Trocas",
    likes: 302,
    image: "/assets/troca-roupa-completa.jpg",
    promptText: "Troca completa"
  },
  {
    id: 403,
    category: "Trocas",
    likes: 303,
    image: "/assets/troca-roupa-cenario.jpg",
    promptText: "Troca com cenário"
  }
];

export const BuilderView = () => {
  const [activeCategory, setActiveCategory] = useState("Builder");
  
  const handleCopyPrompt = (template: any) => {
    if (template.promptText) {
      navigator.clipboard.writeText(template.promptText);
      alert('Prompt copiado para a área de transferência!');
    }
  };






  // --- GRID PRINCIPAL (Galeria) ---
  return (
    <div className="flex-1 w-full flex flex-col p-6 md:p-8 overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-light text-white mb-2 leading-tight">
            Gere <span className="font-medium bg-gradient-to-r from-purple-400 to-[#8B5CF6] text-transparent bg-clip-text">imagens incríveis</span> com seu avatar e produto
          </h1>
          <p className="text-[#8d8d99] text-sm max-w-2xl">
            Escolha um template do feed para recriar exatamente o mesmo visual com o seu produto e avatar — ou comece do zero descrevendo sua ideia.
          </p>
        </div>
      </div>

      {/* Filter Categories */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-4 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-[13px] font-medium whitespace-nowrap transition-all duration-300 ${
              activeCategory === cat
                ? 'bg-[#8B5CF6]/10 border border-[#8B5CF6] text-white shadow-[0_0_15px_rgba(139,92,246,0.2)]'
                : 'bg-white/5 border border-white/5 text-[#8d8d99] hover:text-white hover:bg-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid Retangular */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
        {templates.filter(t => activeCategory === 'Todos' || t.category === activeCategory).map((template) => (
          <div key={template.id} className="relative group aspect-[4/5] rounded-[24px] overflow-hidden bg-white/5 border border-white/5 flex flex-col justify-end p-5">
            {/* Imagem de Fundo */}
            <img
              src={template.image}
              alt="Template"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Top Right - Heart */}
            <div className="absolute top-4 right-4 z-10">
              <div className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 text-white hover:bg-black/60 transition-colors cursor-pointer">
                <Heart className="w-4 h-4" />
              </div>
            </div>

            {/* Gradient Overlay na parte inferior para leitura */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-80 pointer-events-none" />

            {/* Conteúdo (Bottom) */}
            <div className="relative z-10 flex flex-col gap-2">
              <h3 className="text-white font-black text-sm uppercase tracking-wide shadow-sm">
                {template.category.toUpperCase()}
              </h3>
              <p className="text-white/70 text-[11px] leading-relaxed line-clamp-2">
                {['Builder', 'Trocas'].includes(template.category) ? 'Use este card para gerar imagens baseando-se no prompt em anexo.' : `Explore e baixe este template de ${template.category.toLowerCase()}.`}
              </p>
              
              {['Builder', 'Trocas'].includes(template.category) ? (
                <button 
                  onClick={() => handleCopyPrompt(template)}
                  className="mt-2 flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-[#8B5CF6] to-[#7c3aed] hover:from-[#7c3aed] hover:to-[#6d28d9] backdrop-blur-md border border-white/10 rounded-xl text-white text-[11px] font-bold uppercase tracking-wider transition-colors shadow-lg group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]"
                >
                  <Copy className="w-4 h-4" />
                  Copiar Prompt
                </button>
              ) : (
                <a
                  href={template.image}
                  download
                  target="_blank"
                  className="mt-2 flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 backdrop-blur-md border border-white/10 rounded-xl text-white text-[11px] font-bold uppercase tracking-wider transition-colors shadow-lg group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                >
                  <Download className="w-4 h-4" />
                  Baixar Imagem
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

