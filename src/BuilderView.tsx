import React, { useState } from 'react';
import { Search, Folder, Sparkles, Flame, Heart, Copy, Wand2, ArrowLeft, Loader2, Download } from 'lucide-react';
import { generateImageWithGemini } from './lib/gemini';

const categories = [
  "Todos", "Selfies", "Lifestyle", "Close-up"
];

// Placeholder images for the masonry grid
const templates = [
  {
    id: 1,
    category: "Selfies",
    likes: 101,
    image: "/assets/builder-01.jpg",
    promptText: `A medium close-up selfie of a young woman with long, straight, center-parted dark brown hair and olive skin. She has thick dark eyebrows, soft pink blush, and glossy dark brown lipstick, looking directly into the camera with a neutral, calm expression. She is wearing a fitted, ribbed olive green halter-neck crop top and a delicate silver necklace with a flower-shaped pendant. A dark brown leather shoulder bag strap is visible on her left shoulder. On her left upper arm, there is a tattoo of two butterflies, and a script tattoo is visible on her left forearm. She is wearing light-wash denim jeans. The background is a hotel room with a television mounted on the wall showing a streaming service interface, a black desk with a white landline phone, and a hallway door in the back. The lighting is soft and ambient, casting gentle shadows. The image has a sharp focus on the subject, photorealistic, high detail.`
  },
  {
    id: 2,
    category: "Selfies",
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
    category: "Selfies",
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
    category: "Selfies",
    likes: 104,
    image: "/assets/builder-04.webp",
    promptText: `EXTREME ultra close-up smartphone selfie, EXACT same camera angle and distance as the reference image. Camera is positioned VERY close to the face (approximately 15–18 cm), slightly BELOW eye level and tilted upward. The perspective exaggerates the nose and lips naturally, exactly like a real front-facing phone camera. The frame is tightly cropped: the top of the black fur hat is visible, eyebrows fully visible, eyes partially relaxed and half-open, nose centered and dominant, lips fully visible, and the chin partially cropped by the bottom edge of the frame. NO additional headroom. NO zooming out. NO reframing. The subject is resting her face on her LEFT hand. The palm presses into the cheek, slightly deforming the skin naturally. Fingers are vertical along the cheek. Fingernails are almond-shaped, medium length, painted glossy deep red. Lips are full, soft pink, slightly glossy, relaxed and closed. Lip shape and angle must remain neutral, no smile, no tension. Visible natural lip lines and moisture. Nose is close to the camera with visible nostrils due to the upward angle. Natural skin shine on the nose tip. Skin is COMPLETELY natural: visible pores, freckles across nose and cheeks, slight redness, uneven tone, no smoothing, no beauty filters, no retouching. Eyes are relaxed, looking slightly downward toward the camera. Eyelashes are natural, eyebrows thick and natural with visible individual hairs. Hair is straight blonde with darker roots, visible on both sides of the face, falling naturally. A dense black fur hat frames the forehead closely, touching near the eyebrows, with visible individual fur strands. Lighting is soft indoor ambient daylight, neutral temperature, coming from above and slightly to the side. No dramatic shadows, no studio lighting. Background is an indoor kitchen environment, softly out of focus. Light-colored wall texture, refrigerator visible on the right side. DO NOT beautify. DO NOT correct proportions. DO NOT adjust symmetry. No logos, no text, no watermarks, no UI icons.`
  },
  {
    id: 5,
    category: "Selfies",
    likes: 105,
    image: "/assets/builder-05.webp",
    promptText: `Selfie ultra realista de jovem adulta brasileira, 19 anos, sentada no interior de um veículo, orientação frontal para a câmera, capturada com câmera frontal de smartphone. Expressão neutra, lábios fechados levemente projetados, olhar direto para a lente, calma sem exagero expressivo. Tom de pele claro, textura real com poros visíveis, sardas distribuídas pelo nariz e bochechas, acabamento natural sem aparência plastificada. Cabelo loiro, longo, partição central, liso com leve ondulação natural, solto sem styling elaborado. Maquiagem leve: base ou corretivo suave com acabamento natural, máscara de cílios evidente, definição sutil nos olhos, blush discreto, lábios com produto nude ou gloss transparente. Vestindo regata branca de algodão canelado, estilo casual. Colar de corrente fina dourada com pingente pequeno e discreto. Ambiente: interior de veículo com encosto de banco, teto do carro e janela lateral visíveis, situação cotidiana sem preparação de cenário. Iluminação natural lateral/frontal suave, difusa, sombras leves e realistas na pele. Câmera frontal de smartphone, estilo UGC nativo, ângulo ligeiramente abaixo da linha dos olhos, enquadramento close-up do peito para cima, proporção vertical 9:16, nitidez alta no rosto sem desfoque artificial. Sem filtros, contraste natural, saturação equilibrada, tratamento mínimo preservando textura real. Alto nível de autenticidade UGC: imperfeições naturais visíveis, iluminação não controlada, ambiente cotidiano, ausência de pose publicitária.`
  },
  {
    id: 6,
    category: "Selfies",
    likes: 106,
    image: "/assets/builder-06.webp",
    promptText: `Mulher jovem realizando selfie casual ao ar livre em ambiente de praia, com o rosto apoiado sobre a mão, transmitindo estética espontânea e natural típica de UGC. Jovem adulta, expressão relaxada, leve sorriso neutro, olhos parcialmente semicerrados devido à incidência direta de luz solar. Cabelo castanho, longo, ondulado natural, com leve frizz e desorganização causada pela brisa marítima. Top de biquíni verde azulado, modelo simples, alças finas, sem estampas. Maquiagem mínima com acabamento natural, pele com brilho de luz solar, blush suave e lábios em tom neutro. Argolas pequenas em metal dourado, colar fino dourado, pulseira dourada com pequenos pingentes. Estética de câmera frontal de smartphone, ângulo levemente baixo, câmera próxima ao rosto. Close-up do tronco superior até a cabeça, enquadramento vertical 9:16 com sujeito levemente descentralizado. Foco nítido, luz natural intensa, textura de pele visível e realista, sem suavização excessiva. Ambiente de praia próximo à linha do mar, céu azul limpo, mar visível ao fundo, linha do horizonte natural. Dia ensolarado de verão, sensação de tranquilidade e informalidade. Iluminação natural direta do sol, com realces fortes e sombras suaves.`
  },
  {
    id: 7,
    category: "Selfies",
    likes: 107,
    image: "/assets/builder-07.webp",
    promptText: `9:16 Ultra-realistic, hand-taken vertical selfie of a 21-year-old blonde woman in a relaxed pose, captured in the authentic style of Instagram Stories. Slight motion blur, smooth texture and low resolution, warm indoor lighting. Close-up vertical selfie filling most of the Stories frame, camera very close to the face, imperfect angle of a hand-taken photo. She smiles with a relaxed and confident expression, direct eye contact with the camera. Instagram Stories realism - slight exposure variation, shallow depth of field, subtle grain, slightly softened iPhone edges, no cinematic polish. Natural, loose hair color or hairstyle. Minimal or optional makeup. Delicate gold rings on her fingers, shoulders framed by a green tank top in the colors of the Brazilian flag. Neutral inner background, softly blurred. No text on screen, no stickers, just the selfie in storyboard style.`
  },
  {
    id: 8,
    category: "Selfies",
    likes: 108,
    image: "/assets/builder-08.webp",
    promptText: `Ultra-realistic, hand-held vertical selfie of a 21-year-old blonde woman in a relaxed pose, in the authentic style of Instagram Stories. Slight motion blur, smooth texture and low resolution, natural lighting, daylight. Close-up vertical selfie filling most of the Stories frame, camera very close to the face, imperfect angle of a hand-taken photo. She smiles with a relaxed and confident expression, direct eye contact with the camera. Instagram Stories realism - slight variation in exposure, shallow depth of field, subtle grain, edges slightly softened by the iPhone, no cinematic retouching. Her face is slim and symmetrical, like a model's, her teeth are white and aligned, her skin is clear, youthful and attractive; Her hair is tied up in a bun. No makeup. The scene takes place in an open-air setting, like a typical Brazilian farm, a farm with banana trees, chickens, plenty of land, trees, and vegetation all around. Audio: The woman brings the camera close to her face and says in Brazilian Portuguese: \"É difícil de acreditar que eu não sou real né? Mas isso é porque eu sou linda, eu entendo!\". After the first sentence, the woman laughs naturally. After the laugh, the woman speaks again: \"O passo a passo pra gerar vídeos assim está no link, só clicar!\". Shoulders framed by a white tank top with thin straps. Neutral and slightly blurred background. No text on the screen, no stickers, just the selfie in storyboard style.`
  },
  {
    id: 9,
    category: "Close-up",
    likes: 109,
    image: "/assets/builder-09.webp",
    promptText: `Ultra-realistic close-up of a 20-year-old blonde influencer with slightly wavy blonde hair, 8K resolution, natural creator-style photography. Final hyper-realistic close-up scene, wearing a white Prada tank top, blue jeans, and a visible DJI lapel microphone. Same home environment with neutral light wall and warm cozy interior lighting. Camera at eye level, close-up of face and upper shoulders, vertical 9:16 framing. Her face fills most of the frame creating intimacy and trust. Warm and genuine smile, friendly eyes, relaxed facial muscles, confident yet approachable. She looks happy, calm, and trustworthy — not posing. Looking directly at the lens with a slight natural head tilt, minimal movement. Her expression clearly suggests \"trust me, come with me, click the link, follow me\" — the exact second before or after a call to action. Soft and even light on the face, natural skin highlights, no harsh shadows, visible realistic skin texture. No cinematic lighting, pure creator realism. Smartphone/creator aesthetic, everything in focus, no blur, no bokeh, no HDR. Looks like a real final frame from a TikTok or Reel. Final hook moment of trust, high conversion potential, ideal for last frame of video, thumbnail, CTA in Stories, or remarketing impression.`
  },
  {
    id: 10,
    category: "Selfies",
    likes: 110,
    image: "/assets/builder-10.webp",
    promptText: `Ultra-photorealistic 9:16 vertical iPhone 15 Pro Max front camera selfie of a young blonde woman sitting inside a car with brown leather seats. 8K resolution, natural iPhone camera realism with visible sensor noise, slight 24mm barrel distortion, iOS oversharpening artifacts. She has straight light blonde hair, loose, oval face shape, full lips, slim nose, smooth glowing skin with natural highlight on cheekbones, fine pores visible under the light, glossy lip texture, long almond-shaped nails painted in dark wine/burgundy polish. She wears a white ribbed cotton turtleneck tank top fitted to the body with a small silver metallic detail at the neckline, a dark brown leather jacket draped over her arms with visible metal zippers, dark oval sunglasses with slightly translucent tortoiseshell frame, thick gold hoop earrings. She holds a large clear plastic Dunkin' iced coffee cup with an orange straw near her face, lips slightly pursed around the straw. Neutral relaxed expression, eyes hidden behind sunglasses directed at the camera. Selfie taken from a slight low angle, medium-close shot from bust up. Left hand holding the phone out of frame. Car interior background with modern clean interior, sunroof/windows showing diffused daylight. Natural daylight entering through the front and top windows illuminating her face and chest softly. Medium contrast between illuminated skin and darker car interior background. No studio lighting, no ring light, no flash, no warm/orange tones. Lo-fi quality, not extremely sharp, looks like a real iPhone selfie posted online. Slight reflections of the car interior visible on the sunglasses lenses. Casual urban lifestyle aesthetic, 'that girl' vibe, trendy and confident.`
  },
  {
    id: 11,
    category: "Selfies",
    likes: 111,
    image: "/assets/builder-11.webp",
    promptText: `Ultra-photorealistic 9:16 vertical iPhone 15 Pro Max front camera mirror selfie of a Brazilian woman inside a metal elevator. 8K resolution, natural iPhone camera realism with visible sensor noise, slight 24mm barrel distortion, iOS oversharpening artifacts. Oval face with well-defined jawline, dark arched eyebrows, dark almond-shaped brown eyes, straight nose with thin tip, full lips with nude/rose gloss, light makeup. Long straight dark wet-looking hair slicked back falling over shoulders. Intensely tanned skin with visible bikini tan lines on the chest, natural moisture/sweat shine on skin, realistic irregular skin texture with fine visible pores on nose and cheeks, micro expression marks, small natural sun spots. Extensive tattoos covering right forearm and upper arm, small tattoos on stomach, tattoos on left hand and wrist. Small earrings, rings on both hands, multiple fabric and metal bracelets on left wrist, metallic bracelet on right wrist. Wearing a dark brown bandeau tube top stretched tight on the body with subtle fine ribbed texture, and a beige/cream low-waist cargo-style mini skirt with two large front pockets with buttoned flaps. Standing with relaxed posture, hip slightly shifted to the right, left leg slightly forward. Left hand raised holding iPhone with brown/caramel case partially covering lower left cheek, right hand relaxed by right leg. Looking directly at the phone screen reflected in the mirror, mouth closed with subtle smirk. Confident neutral expression. Elevator interior with reflective brushed steel walls, dark elevator control panel slightly visible on the right, white warning sign on the metal wall behind. Overhead fluorescent/LED white light creating strong highlights on chest, face and hard reflections on metal panels. Light bouncing off metal walls filling body shadows. Medium to high contrast emphasizing the tan and skin shine against metallic background. No studio lighting, no ring light, no flash. Lo-fi quality, not extremely sharp, looks like a real iPhone selfie posted online. Strong specular reflections blown out in metal areas, slight motion blur at edges.`
  },
  {
    id: 12,
    category: "Lifestyle",
    likes: 112,
    image: "/assets/builder-12.webp",
    promptText: `Possui cabelo loiro, longo, volume equilibrado e movimento suave, com fios visíveis, textura realista e brilho sutil refletindo a iluminação ambiente. Corpo atlético, slim e definido de forma elegante e proporcional. A maquiagem é glamourosa e bem acabada, com pele levemente bronzeada, contorno suave destacando as maçãs do rosto, cílios definidos, olhos com esfumado neutro sofisticado e lábios nude com brilho discreto. A expressão é confiante, segura e serena, transmitindo elegância e presença. Ela veste um vestido mini de um ombro só na cor laranja queimado profundo. O vestido possui caimento ajustado ao corpo, com drapeado assimétrico na região do busto e tecido acetinado de acabamento suave, que reflete a luz de forma sutil e elegante, sem brilho excessivo. As pernas estão à mostra, sem meia-calça. Os acessórios são minimalistas e refinados, incluindo argolas douradas finas e um colar dourado delicado, reforçando uma estética clean e sofisticada. A cena acontece no interior de um carro de luxo durante a noite, com a mulher sentada no banco do passageiro dianteiro. O interior apresenta estofamento em couro claro ou preto, com costuras visíveis no encosto de cabeça, iluminação ambiente suave e detalhes de acabamento premium. Pela janela lateral, luzes urbanas aparecem suavemente desfocadas, sem dominar a cena, mantendo o foco no interior elegante e reservado do veículo. A iluminação combina a luz ambiente interna do carro com um leve reflexo da iluminação urbana externa, criando realces delicados no rosto, no cabelo e no vestido, com sombras suaves e bem distribuídas. A atmosfera é sofisticada, noturna e exclusiva. A composição segue um estilo fashion editorial, capturada com câmera Canon EOS 5D Mark IV e lente 50mm, ISO 640, abertura f/1.8 e velocidade 1/125s. O enquadramento vai do meio das coxas até logo acima da cabeça, com a câmera posicionada levemente acima do nível dos olhos, inclinada suavemente para baixo. A mulher está sentada com um dos ombros levemente voltado para a câmera, postura relaxada e segura. O fundo permanece suavemente desfocado. A imagem apresenta alto nível de fidelidade visual, com textura realista do couro dos bancos, reflexos sutis da iluminação ambiente, caimento natural do tecido acetinado, textura natural da pele, proporções corporais corretas, foco limpo e ausência total de distorções, filtros ou estilizações artificiais.`
  },
  {
    id: 13,
    category: "Selfies",
    likes: 113,
    image: "/assets/builder-13.webp",
    promptText: `[STYLE: Casual selfie in the mirror, checking the outfit of the day, spontaneous home photography, smartphone realism], [POSE: Mirror reflection, standing, female figure, 20 years old, slightly leaning forward, holding smartphone with both hands at chest height, one hand interacting with the waistband of her pants, head tilted], [TEXTURES: White ribbed cotton tank top (stretched fabric at the chest), denim shorts, blonde hair in a bun, reflective mirror surface, cold polished marble floor], [SETTING: Interior of a spacious bathroom, arched doorway in the background, sink countertop in the foreground], [LIGHTING AND CAMERA: Warm tungsten lighting on the bathroom ceiling, soft shadows, mirror reflection photographed with a smartphone (iPhone Pro with a triple-lens setup), 24mm main lens, f/1.7, slight motion blur on the hand], [VISUAL EFFECTS: Dust particles on the mirror, slight lens flare due to light superior, natural color correction without editing].`
  },
  {
    id: 14,
    category: "Selfies",
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
    category: "Selfies",
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
    category: "Lifestyle",
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
    category: "Selfies",
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
    category: "Selfies",
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
    category: "Lifestyle",
    likes: 119,
    image: "/assets/builder-19.webp",
    promptText: `Ultra photorealistic 8K UHD iPhone 15 Pro Max style, 9:16 vertical format, 24mm wide angle lens. Young Brazilian woman with oval face, well-defined jawline, straight thin nose, glossy pink lips, white aligned teeth visible in a wide laugh, slightly arched filled eyebrows, pronounced highlighter makeup, almond-shaped eyes. Very long wavy voluminous light brown-auburn highlighted hair. Bronzed skin tone with body shimmer highlighter on chest area, realistic irregular skin texture on face with clearly visible pores under flash light, small natural marks and typical asymmetries of real human skin. Eyes closed squeezed shut from intense laughter looking down, mouth wide open in a big hearty laugh with lips stretched and teeth showing, extreme joy and fun expression. Torso slightly turned to the side, relaxed shoulders in a dancing celebrating movement, standing in the middle of a crowd. Right arm raised holding a transparent plastic cup with draft beer. Wearing a light blue tailored blazer style jacket worn closed with no top underneath, deep V neckline, fitted and structured, matte fabric with dark metallic center button and visible stitching. Thin gold necklace with square pendant containing letter C, multiple colorful VIP festival access wristbands on right wrist. Night party music show or festival setting with blurred people crowd in background, blue and purple stage lights with bokeh effect, dark energetic nightlife atmosphere. Intense direct flash from front and slightly above revealing real skin textures and pores, illuminating face chest and raised cup strongly, blue and purple ambient show lights filling dark background, high contrast between brightly lit subject and dark colorful background. Visible grainy noise in low light, not extremely sharp more lo-fi feel, background colors blown out by stage lights, hair edges slightly blending with background, slight 24mm barrel distortion stretching edges, iOS oversharpening artificial sharpness. Energetic festive euphoric nightlife atmosphere.`
  },
  {
    id: 20,
    category: "Lifestyle",
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
    category: "Lifestyle",
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
  },
  {
    id: 23,
    category: "Selfies",
    likes: 123,
    image: "/assets/builder-23.webp",
    promptText: `{\n  \"metadata\": {\n    \"id\": \"runner_ugc_009\",\n    \"category\": \"Influencer Corredora\",\n    \"tags\": [\n      \"running\",\n      \"outdoor\",\n      \"fitness\",\n      \"race\",\n      \"ugc\",\n      \"hydration vest\"\n    ],\n    \"gender\": \"female\",\n    \"ethnicity\": \"brazilian\",\n    \"age_range\": \"25-30\",\n    \"format\": \"9:16\"\n  },\n  \"prompt_structure\": {\n    \"quality_modifiers\": \"((ultra realistic)), 8k uhd, photorealistic, professional action sports photography, sharp focus, highly detailed\",\n    \"subject\": {\n      \"main_description\": \"athletic Brazilian female runner influencer during outdoor race\",\n      \"age\": \"28 years old\",\n      \"facial_features\": \"defined athletic face, strong cheekbones, natural lips\",\n      \"expression\": \"focused and determined, mid-run concentration\",\n      \"skin\": \"healthy athletic skin with sweat glow, natural texture, sunlit highlights\",\n      \"makeup\": \"minimal athletic makeup, natural look\"\n    },\n    \"hair\": {\n      \"style\": \"double braided pigtails\",\n      \"color\": \"dark brown\",\n      \"texture\": \"tight braids, slightly moving with motion\"\n    },\n    \"clothing\": {\n      \"description\": \"black sports bra and black running shorts\",\n      \"style\": \"performance running gear\",\n      \"accessories\": \"sport sunglasses, bone conduction headphones, hydration vest\"\n    },\n    \"hands_nails\": {\n      \"description\": \"((well-manicured hands with five fingers, natural anatomy)):1.3\",\n      \"nails\": \"short natural nails\",\n      \"pose\": \"arms in motion, natural running stride with slight motion blur\"\n    },\n    \"product\": {\n      \"type\": \"none\",\n      \"description\": \"focus on athlete and movement\",\n      \"positioning\": \"not applicable\"\n    },\n    \"pose_composition\": {\n      \"body_position\": \"dynamic running stride captured from elevated selfie angle\",\n      \"eye_direction\": \"looking forward toward path\",\n      \"overall_pose\": \"candid mid-run selfie, energetic and realistic race moment\"\n    },\n    \"camera_settings\": {\n      \"shot_type\": \"dynamic selfie action shot\",\n      \"aperture\": \"f/2.8\",\n      \"depth_of_field\": \"moderate depth with slight background blur\",\n      \"format\": \"vertical 9:16\"\n    },\n    \"lighting\": {\n      \"primary\": \"natural sunlight\",\n      \"quality\": \"bright and direct with defined shadows\",\n      \"direction\": \"top-side sunlight\",\n      \"temperature\": \"5600K daylight\"\n    },\n    \"background\": {\n      \"setting\": \"urban city street race\",\n      \"description\": \"asphalt road, runners around, buildings, trees, bright blue sky, slight motion blur in background\",\n      \"atmosphere\": \"energetic race environment, active outdoor scene\"\n    },\n    \"color_grading\": {\n      \"palette\": \"natural outdoor tones with warm highlights\",\n      \"mood\": \"energetic, competitive, active\",\n      \"saturation\": \"slightly vibrant for action feel\"\n    },\n    \"style_aesthetic\": {\n      \"photography_style\": \"authentic UGC running content\",\n      \"mood\": \"motivational, real, energetic\",\n      \"authenticity\": \"candid, dynamic, not staged\"\n    }\n  },\n  \"final_prompt\": \"((ultra realistic)), 8k uhd, photorealistic, professional action sports photography, sharp focus, highly detailed, athletic Brazilian female runner influencer during outdoor race, 28 years old, defined athletic face with strong cheekbones, focused determined expression mid-run, healthy athletic skin with sweat glow and natural texture, sunlit highlights, minimal athletic makeup, dark brown double braided pigtails moving with motion, black sports bra and black running shorts, performance running gear, sport sunglasses, bone conduction headphones, hydration vest visible, ((well-manicured hands with five fingers, natural anatomy)):1.3, short natural nails, arms in natural running motion with slight blur, dynamic running stride captured from elevated selfie angle, looking forward toward path, candid energetic mid-run selfie pose, dynamic selfie action shot, f/2.8 aperture, moderate depth of field with slight background blur, vertical 9:16 format, natural sunlight, bright direct lighting with defined shadows, 5600K daylight, urban city street race environment with asphalt road, runners around, buildings and trees, bright blue sky, slight motion blur background, energetic race atmosphere, natural outdoor tones with warm highlights, slightly vibrant saturation, authentic UGC running content style, motivational real energetic mood, candid dynamic feel\",\n  \"negative_prompt_compiled\": \"deformed hands, extra fingers, missing fingers, bad anatomy, static pose, standing still, low quality, blurry face, cartoon, anime, unrealistic, plastic skin, watermark, signature, studio background, indoor setting, harsh lighting, overexposed, underexposed, bad framing, cropped limbs, oversaturated, busy distracting background, forced smile, dead eyes, duplicate people, floating objects, disfigured body, bad running form, stiff pose, jpeg artifacts, 3D render, CGI, fake outdoor, unnatural motion, too much blur, wrong shadows, nighttime\",\n  \"api_parameters\": {\n    \"width\": 512,\n    \"height\": 912,\n    \"steps\": 45,\n    \"cfg_scale\": 7.5,\n    \"sampler\": \"DPM++ 2M Karras\",\n    \"seed\": -1\n  }\n}\n-----------------`
  },
  {
    id: 24,
    category: "Selfies",
    likes: 124,
    image: "/assets/builder-24.webp",
    promptText: `{\n  \"meta\": {\n    \"aspect_ratio\": \"9:16\",\n    \"quality\": \"ultra_photorealistic\",\n    \"resolution\": \"8k\",\n    \"camera\": \"câmera frontal do iPhone 15 Pro Max\",\n    \"lens\": \"24mm grande angular\",\n    \"style\": \"realismo de câmera de iPhone, não de estúdio, não profissional, textura natural visível\"\n  },\n  \"character_lock\": {\n    \"identity_source\": \"\",\n    \"face_identity\": [\n      \"Mulher sorridente com dentes brancos alinhados, maxilar bem delineado, formato de rosto oval, nariz reto, lábios finos e naturais em formato de sorriso largo, olhos ocultos por óculos de sol esportivos com lentes espelhadas vermelhas, proporções simétricas mantidas, aparência de pele real sem filtros exagerados\"\n    ],\n    \"regras_de_aparencia\": {\n      \"descricao_geral\": \"Cabelo loiro escuro ou castanho claro preso em uma trança embutida, tom de pele bronzeado, textura de pele úmida e natural com brilho de suor pós-corrida, leves marcas de expressão ao redor do sorriso\",\n      \"marcas_e_tatuagens\": \"Tatuagem grande estilo mandala e motivos florais cobrindo o braço esquerdo, tatuagem de pássaro com asas abertas no centro do abdômen superior, palavra 'Mãe' tatuada no antebraço direito, pequenas tatuagens nos dedos da mão esquerda. Piercing de argola na narina direita e piercing no umbigo.\"\n    }\n  },\n  \"cena\": {\n    \"local\": \"Rua urbana asfaltada durante um evento esportivo ou pós-treino\",\n    \"ambiente\": [\n      \"Edifícios urbanos, árvores de calçada e postes desfocados ao fundo\",\n      \"Asfalto escuro da rua e detalhes de calçamento urbano\",\n      \"Ambiente de cidade, céu aberto, leve movimentação de rua desfocada\"\n    ],\n    \"atmosfera\": \"Energética, esportiva, de conquista e celebração urbana\"\n  },\n  \"iluminacao\": {\n    \"tipo\": \"Luz natural diurna\",\n    \"luz_principal\": \"Luz do sol natural de manhã ou fim de tarde, iluminando a cena urbana\",\n    \"luz_de_preenchimento\": \"Luz ambiente refletida pelo asfalto e construções\",\n    \"contraste\": \"Contraste médio, sombras características de luz solar externa\",\n    \"evitar\": [\n      \"iluminação de estúdio\",\n      \"ring light artificial\",\n      \"aparência profissional\",\n      \"tons quentes/laranja\",\n      \"flash estourado\"\n    ]\n  },\n  \"perspectiva_da_camera\": {\n    \"pov\": \"Foto de retrato tirada por outra pessoa\",\n    \"angulo\": \"Frontal, na altura dos olhos\",\n    \"distancia\": \"Plano médio (da cintura para cima)\",\n    \"visibilidade_do_celular\": \"O celular não aparece na imagem, a foto foi tirada por um terceiro\"\n  },\n  \"assunto\": {\n    \"genero\": \"Feminino\",\n    \"idade\": \"adulto (21+)\",\n    \"vibe\": \"Atleta amadora, fitness, orgulhosa, aventureira\",\n    \"textura_pele\": \"Pele com brilho de suor natural e protetor solar, poros sutis e linhas de expressão naturais ativadas pelo sorriso\",\n    \"expressao\": {\n      \"olhos\": \"Ocultos pelos óculos reflexivos, que mostram reflexos do ambiente de rua urbano\",\n      \"boca\": \"Sorriso largo de felicidade com dentes totalmente visíveis\",\n      \"emocao\": \"Alegria extrema e sensação de dever cumprido\"\n    },\n    \"pose\": {\n      \"posicao\": \"De pé, tronco levemente rotacionado para a direita, ombros relaxados\",\n      \"apoio\": \"Apoiada em pé sobre a rua asfaltada\",\n      \"mao\": \"Mão direita levantada segurando a medalha da corrida perto do rosto; mão esquerda apoiada na cintura\"\n    },\n    \"roupa\": {\n      \"blusa\": {\n        \"tipo\": \"Top esportivo\",\n        \"caimento\": \"Justo e anatômico ao corpo\",\n        \"detalhes\": \"Cor preta lisa, zíper frontal fechado com a inscrição 'RUN MORE' em branco na vertical\"\n      },\n      \"extra\": [\n        \"Shorts ou calça legging esportiva preta\",\n        \"Casaco escuro amarrado na cintura com um nó\",\n        \"Óculos de sol estilo esportivo com armação preta e lente espelhada vermelho-alaranjada (estilo Oakley)\",\n        \"Medalha de bronze envelhecido da '14ª Meia Maratona das Cataratas 21km' com fita azul pendurada\",\n        \"Smartwatch com pulseira rosa clara no pulso esquerdo\"\n      ]\n    }\n  },\n  \"qualidade_da_imagem\": {\n    \"foco\": \"Foco cravado no rosto da mulher, nos óculos e na medalha, com fundo significativamente desfocado (efeito bokeh de profundidade de campo)\",\n    \"granulacao\": \"ruído visível em baixa luminosidade\",\n    \"nitidez\": \"NÃO extremamente nítida, mais lo-fi\",\n    \"realismo\": \"parece uma selfie real de iPhone postada online\",\n    \"artefatos_de_sensor\": \"Leve perda de detalhe nas áreas de sombra mais densas do fundo\",\n    \"distorcao_de_lente\": \"barrel distortion leve de 24mm, esticando levemente as bordas\",\n    \"pos_processamento\": \"nitidez artificial (oversharpening) típica de algoritmo iOS\"\n  }\n}\n-----------------`
  },
  {
    id: 25,
    category: "Selfies",
    likes: 125,
    image: "/assets/builder-25.webp",
    promptText: `{\n  \"meta\": {\n    \"aspect_ratio\": \"9:16\",\n    \"quality\": \"ultra_photorealistic\",\n    \"resolution\": \"8k\",\n    \"camera\": \"câmera frontal do iPhone 15 Pro Max\",\n    \"lens\": \"24mm grande angular\",\n    \"style\": \"realismo de câmera de iPhone, não de estúdio, não profissional, textura natural visível\"\n  },\n  \"character_lock\": {\n    \"identity_source\": \"\",\n    \"face_identity\": [\n      \"mulher de pele clara com sardas evidentes, formato de rosto oval, nariz com piercing de argola, lábios naturais sorrindo e mordendo uma medalha, dentes brancos e retos, usando óculos de sol grandes esportivos, assimetria natural mantida, sem alteração facial\"\n    ],\n    \"regras_de_aparencia\": {\n      \"descricao_geral\": \"cabelo claro preso para trás, tom de pele claro, textura de pele muito realista com suor leve, poros aparentes e grande concentração de sardas nas maçãs do rosto e nariz\",\n      \"marcas_e_acessorios\": \"piercing de argola no lado esquerdo do nariz, pequenos brincos de argola dourados nas orelhas\"\n    }\n  },\n  \"cena\": {\n    \"local\": \"rua ao ar livre, linha de chegada de uma maratona\",\n    \"ambiente\": [\n      \"multidão de pessoas desfocadas caminhando\",\n      \"árvores altas com folhas verdes ao fundo\",\n      \"movimentado, comemorativo e esportivo\"\n    ],\n    \"atmosfera\": \"vitoriosa, eufórica, alegre, energia de fim de corrida\"\n  },\n  \"iluminacao\": {\n    \"tipo\": \"luz natural diurna\",\n    \"luz_principal\": \"luz do sol difusa vinda de cima e levemente de frente, iluminando o rosto de forma uniforme\",\n    \"luz_de_preenchimento\": \"luz ambiente de um dia claro, sombras suaves no pescoço\",\n    \"contraste\": \"médio-alto, destacando o brilho dourado da medalha e o azul dos óculos e da fita\",\n    \"evitar\": [\n      \"iluminação de estúdio\",\n      \"ring light artificial\",\n      \"aparência profissional\",\n      \"tons quentes/laranja\",\n      \"flash estourado\"\n    ]\n  },\n  \"perspectiva_da_camera\": {\n    \"pov\": \"selfie de mão próxima ao rosto\",\n    \"angulo\": \"levemente de cima para baixo (high angle suave), na altura dos olhos\",\n    \"distancia\": \"close-up fechado capturando do peito para cima\",\n    \"visibilidade_do_celular\": \"celular não visível\"\n  },\n  \"assunto\": {\n    \"genero\": \"feminino\",\n    \"idade\": \"adulto (21+)\",\n    \"vibe\": \"atleta, corredora de maratona, orgulhosa, exaustão feliz\",\n    \"textura_pele\": \"poros visíveis, muitas sardas naturais, pele levemente suada e brilhante pelo esforço físico\",\n    \"expressao\": {\n      \"olhos\": \"ocultos por óculos de sol espelhados escuros\",\n      \"boca\": \"sorriso largo e aberto, mordendo firmemente a borda de uma medalha de ouro\",\n      \"emocao\": \"felicidade extrema, sensação de conquista e alívio\"\n    },\n    \"pose\": {\n      \"posicao\": \"tronco levemente inclinado para frente em direção à câmera\",\n      \"apoio\": \"em pé na rua asfaltada\",\n      \"mao\": \"mão direita erguida segurando a medalha junto à boca, unhas com francesinha\"\n    },\n    \"roupa\": {\n      \"blusa\": {\n        \"tipo\": \"top esportivo de alças\",\n        \"caimento\": \"justo ao corpo\",\n        \"detalhes\": \"tecido esportivo azul marinho com alças azuis claras e logo branco minimalista\"\n      },\n      \"extra\": [\n        \"óculos de sol grandes estilo ciclista com armação azul clara transparente\",\n        \"fita larga de medalha nas cores azul e preto com inscrições brancas\",\n        \"medalha de ouro grande e texturizada\"\n      ]\n    }\n  },\n  \"qualidade_da_imagem\": {\n    \"foco\": \"cravado perfeitamente no rosto, óculos, dentes e medalha; fundo com forte desfoque natural (bokeh)\",\n    \"granulacao\": \"ruído visível em baixa luminosidade\",\n    \"nitidez\": \"NÃO extremamente nítida, mais lo-fi\",\n    \"realismo\": \"parece uma selfie real de iPhone postada online\",\n    \"artefatos_de_sensor\": \"cores ricas e saturadas típicas de processamento HDR de celular\",\n    \"distorcao_de_lente\": \"barrel distortion leve de 24mm, esticando levemente as bordas\",\n    \"pos_processamento\": \"nitidez artificial (oversharpening) típica de algoritmo iOS\"\n  }\n}\n-----------------`
  },
  {
    id: 26,
    category: "Selfies",
    likes: 126,
    image: "/assets/builder-26.webp",
    promptText: `{\n  \"metadata\": {\n    \"id\": \"gym_female_002\",\n    \"category\": \"GYM Academia\",\n    \"tags\": [\n      \"fitness\",\n      \"gym\",\n      \"cardio\",\n      \"selfie\",\n      \"lifestyle\"\n    ],\n    \"gender\": \"female\",\n    \"ethnicity\": \"brazilian\",\n    \"age_range\": \"25-30\",\n    \"format\": \"9:16\"\n  },\n  \"prompt_structure\": {\n    \"quality_modifiers\": \"((ultra realistic)), 8k uhd, photorealistic, professional fitness photography, sharp focus, highly detailed\",\n    \"subject\": {\n      \"main_description\": \"athletic Brazilian female fitness influencer taking a gym selfie\",\n      \"age\": \"27 years old\",\n      \"facial_features\": \"symmetrical face, defined cheekbones, natural beauty\",\n      \"expression\": \"focused and calm, slight confident smile\",\n      \"skin\": \"natural texture, healthy glow, subtle workout sweat\",\n      \"makeup\": \"minimal gym makeup, natural look, light mascara\"\n    },\n    \"hair\": {\n      \"style\": \"long loose hair\",\n      \"color\": \"dark brown with subtle highlights\",\n      \"texture\": \"natural flow, slightly tousled from workout\"\n    },\n    \"clothing\": {\n      \"description\": \"light beige sports bra and high-waisted gray leggings\",\n      \"style\": \"fitness activewear, form-fitting, modern athletic look\",\n      \"accessories\": \"((rose gold wireless headphones):1.2), delicate bracelet on wrist\"\n    },\n    \"hands_nails\": {\n      \"description\": \"((well-manicured hands, five fingers, natural hand anatomy)):1.3\",\n      \"nails\": \"short nude polished nails\",\n      \"pose\": \"one hand holding camera/phone in selfie angle, other hand resting on cardio machine handle\"\n    },\n    \"product\": {\n      \"type\": \"cardio machine (elliptical trainer)\",\n      \"description\": \"modern black elliptical machine with digital display, realistic gym equipment\",\n      \"positioning\": \"foreground, user interacting naturally with handles\"\n    },\n    \"pose_composition\": {\n      \"body_position\": \"seated/engaged on elliptical machine, slight torso twist for selfie angle\",\n      \"eye_direction\": \"looking slightly downward toward phone\",\n      \"overall_pose\": \"natural candid gym selfie, relaxed and authentic posture\"\n    },\n    \"camera_settings\": {\n      \"shot_type\": \"overhead selfie medium shot\",\n      \"aperture\": \"f/2.8\",\n      \"depth_of_field\": \"shallow depth with soft background blur\",\n      \"format\": \"vertical 9:16\"\n    },\n    \"lighting\": {\n      \"primary\": \"natural window light mixed with gym ambient lighting\",\n      \"quality\": \"soft diffused\",\n      \"direction\": \"top-front angle\",\n      \"temperature\": \"5500K natural daylight\"\n    },\n    \"background\": {\n      \"setting\": \"modern spacious gym interior\",\n      \"description\": \"blurred gym equipment, weights and large windows with daylight\",\n      \"atmosphere\": \"clean, minimal, premium fitness environment\"\n    },\n    \"color_grading\": {\n      \"palette\": \"neutral tones with warm highlights\",\n      \"mood\": \"calm, focused, lifestyle fitness\",\n      \"saturation\": \"natural balanced tones\"\n    },\n    \"style_aesthetic\": {\n      \"photography_style\": \"authentic UGC fitness content\",\n      \"mood\": \"relatable, real workout moment\",\n      \"authenticity\": \"candid selfie, not staged, natural gym vibe\"\n    }\n  },\n  \"final_prompt\": \"((ultra realistic)), 8k uhd, photorealistic, professional fitness photography, sharp focus, highly detailed, athletic Brazilian female fitness influencer, 27 years old, symmetrical face, defined cheekbones, focused calm expression with slight confident smile, natural skin texture with healthy glow and subtle sweat, minimal gym makeup, long dark brown hair slightly tousled, light beige sports bra and high-waisted gray leggings, modern fitness activewear, ((rose gold wireless headphones):1.2), delicate bracelet, ((well-manicured hands, five fingers, natural hand anatomy)):1.3, one hand holding phone in selfie angle, other hand resting on elliptical handle, modern black elliptical machine in foreground, natural candid gym selfie pose, slight torso twist, looking downward toward phone, overhead selfie medium shot, vertical 9:16 format, f/2.8 aperture, shallow depth of field with soft background blur, natural window light mixed with gym lighting, soft diffused light, 5500K daylight, modern gym interior with blurred equipment and large windows, clean minimal environment, neutral color palette with warm tones, authentic UGC fitness style, relatable real workout moment\",\n  \"negative_prompt_compiled\": \"deformed hands, extra fingers, missing fingers, bad anatomy, blurry product, unreadable display, low quality, blurry, cartoon, anime, unrealistic, plastic skin, watermark, harsh lighting, bad framing, oversaturated, busy background, dead eyes, duplicate people, floating objects, 3D render, unnatural skin tones, wig-like hair, multiple faces\",\n  \"api_parameters\": {\n    \"width\": 512,\n    \"height\": 912,\n    \"steps\": 45,\n    \"cfg_scale\": 7.5,\n    \"sampler\": \"DPM++ 2M Karras\",\n    \"seed\": -1\n  }\n}\n-----------------`
  },
  {
    id: 27,
    category: "Selfies",
    likes: 127,
    image: "/assets/builder-27.webp",
    promptText: `{\n  \"metadata\": {\n    \"id\": \"gym_female_003\",\n    \"category\": \"GYM Academia\",\n    \"tags\": [\n      \"fitness\",\n      \"gym\",\n      \"selfie\",\n      \"workout\",\n      \"lifestyle\"\n    ],\n    \"gender\": \"female\",\n    \"ethnicity\": \"brazilian\",\n    \"age_range\": \"25-30\",\n    \"format\": \"9:16\"\n  },\n  \"prompt_structure\": {\n    \"quality_modifiers\": \"((ultra realistic)), 8k uhd, photorealistic, professional fitness photography, sharp focus, highly detailed\",\n    \"subject\": {\n      \"main_description\": \"beautiful athletic Brazilian female fitness influencer taking a gym selfie\",\n      \"age\": \"26 years old\",\n      \"facial_features\": \"symmetrical face, defined cheekbones, soft jawline, natural beauty\",\n      \"expression\": \"playful pout lips, confident and relaxed expression\",\n      \"skin\": \"natural skin texture, smooth healthy glow, slight workout warmth\",\n      \"makeup\": \"minimal natural makeup, soft matte finish, light mascara, nude lips\"\n    },\n    \"hair\": {\n      \"style\": \"low ponytail\",\n      \"color\": \"dark brown\",\n      \"texture\": \"sleek and smooth, neatly tied back\"\n    },\n    \"clothing\": {\n      \"description\": \"black fitted long sleeve athletic top with blue high-waisted leggings\",\n      \"style\": \"modern fitness activewear, sleek and form-fitting\",\n      \"accessories\": \"((light pink over-ear wireless headphones):1.2), small delicate necklace\"\n    },\n    \"hands_nails\": {\n      \"description\": \"((well-manicured hands, five fingers, natural hand anatomy)):1.3\",\n      \"nails\": \"short nude nails, clean and natural\",\n      \"pose\": \"one hand extended holding phone in selfie angle, other hand resting on thigh\"\n    },\n    \"product\": {\n      \"type\": \"gym equipment bench\",\n      \"description\": \"modern black workout bench with metallic frame, realistic gym equipment\",\n      \"positioning\": \"subject seated on bench, equipment partially visible in foreground\"\n    },\n    \"pose_composition\": {\n      \"body_position\": \"seated on gym bench with one leg slightly extended\",\n      \"eye_direction\": \"looking directly at phone camera\",\n      \"overall_pose\": \"overhead selfie angle, casual and confident gym pose\"\n    },\n    \"camera_settings\": {\n      \"shot_type\": \"high-angle selfie medium shot\",\n      \"aperture\": \"f/2.8\",\n      \"depth_of_field\": \"shallow depth of field with soft background blur\",\n      \"format\": \"vertical 9:16\"\n    },\n    \"lighting\": {\n      \"primary\": \"natural window light mixed with gym ambient lighting\",\n      \"quality\": \"soft diffused\",\n      \"direction\": \"top-down angle\",\n      \"temperature\": \"5500K natural daylight\"\n    },\n    \"background\": {\n      \"setting\": \"modern gym interior\",\n      \"description\": \"blurred gym machines, wooden flooring, workout equipment in background\",\n      \"atmosphere\": \"clean, organized, premium fitness environment\"\n    },\n    \"color_grading\": {\n      \"palette\": \"neutral tones with subtle warm highlights\",\n      \"mood\": \"calm, confident, lifestyle fitness\",\n      \"saturation\": \"natural balanced tones\"\n    },\n    \"style_aesthetic\": {\n      \"photography_style\": \"authentic UGC fitness content\",\n      \"mood\": \"relatable and casual gym moment\",\n      \"authenticity\": \"natural selfie, not overly staged, real workout vibe\"\n    }\n  },\n  \"final_prompt\": \"((ultra realistic)), 8k uhd, photorealistic, professional fitness photography, sharp focus, highly detailed, beautiful athletic Brazilian female fitness influencer, 26 years old, symmetrical face, defined cheekbones, playful pout lips, confident relaxed expression, natural skin texture with healthy glow and slight workout warmth, minimal natural makeup, sleek low ponytail dark brown hair, black fitted long sleeve athletic top with blue high-waisted leggings, modern form-fitting activewear, ((light pink over-ear wireless headphones):1.2), small delicate necklace, ((well-manicured hands, five fingers, natural hand anatomy)):1.3, one hand extended holding phone in selfie angle, other hand resting on thigh, seated on modern gym bench, overhead selfie angle, casual confident pose, looking directly at phone camera, high-angle selfie medium shot, vertical 9:16 format, f/2.8 aperture, shallow depth of field, soft background blur, natural window light mixed with gym lighting, soft diffused light, 5500K daylight, modern gym interior with blurred equipment and wooden flooring, clean organized fitness environment, neutral tones with warm highlights, authentic UGC fitness style, relatable casual gym moment\",\n  \"negative_prompt_compiled\": \"deformed hands, extra fingers, missing fingers, bad anatomy, blurry product, unreadable details, low quality, blurry, cartoon, anime, unrealistic, plastic skin, watermark, harsh lighting, bad framing, oversaturated, busy background, dead eyes, duplicate people, floating objects, 3D render, unnatural skin tones, wig-like hair, multiple faces\",\n  \"api_parameters\": {\n    \"width\": 512,\n    \"height\": 912,\n    \"steps\": 45,\n    \"cfg_scale\": 7.5,\n    \"sampler\": \"DPM++ 2M Karras\",\n    \"seed\": -1\n  }\n}\n-----------------`
  },
  {
    id: 28,
    category: "Selfies",
    likes: 128,
    image: "/assets/builder-28.webp",
    promptText: `{\n  \"subject\": {\n    \"description\": \"A young woman with a highly defined athletic hourglass morphology, capturing a mirror selfie in a fitness environment.\",\n    \"body\": {\n      \"physique\": \"Athletic hourglass silhouette with extreme gluteal hypertrophy and a pronounced waist-to-hip ratio.\",\n      \"details\": \"Narrow waistline transitioning into wide, muscular hips and voluminous gluteus maximus development. Strong, toned quadriceps and hamstrings. Slender upper torso with defined scapula and soft shoulder definition. Natural skin texture with visible pores and subtle muscle highlights.\",\n      \"face\": \"Side profile view, soft jawline, neutral expression, focused gaze toward the smartphone screen.\",\n      \"hair\": \"Long, thick hair with a mix of blonde highlights and brunette base, styled in a long, neat braid secured with a red scrunchie, two loose strands framing the face.\"\n    },\n    \"wardrobe\": {\n      \"top\": \"Minimalist beige sports bra with thin spaghetti straps, form-fitting ribbed fabric.\",\n      \"bottom\": \"High-waisted slate blue 'scrunch' gym shorts featuring side-tie drawstring details and a small white brand emblem on the rear waistband (text reads 'LOGO').\",\n      \"accessories\": \"Tan and gold over-ear premium headphones (text on earcups reads 'BEATS'). A smartphone in a silver glitter-encrusted protective case.\"\n    },\n    \"pose_action\": \"Mirror selfie pose; the subject is standing with her body angled in a three-quarter rear-view twist to emphasize the curvature of the lower body. One hand holds the phone steady at chest height while the other arm is out of frame. Weight is shifted to the front leg to accentuate the hip line.\"\n  },\n  \"scene\": {\n    \"location\": \"Modern gym locker room interior.\",\n    \"background\": \"Rows of white metal lockers to the left, a light wood grain bench in the foreground, and neutral-toned laminate flooring. A large full-length mirror with a thin silver frame reflects the room. Signage is visible on the wall and mirror (text reads 'Re-set' and 'Notice').\",\n    \"composition\": \"Vertical 9:16 aspect ratio, medium-full shot focusing on the subject's form and the reflective environment.\"\n  },\n  \"lighting\": {\n    \"type\": \"Diffused indoor overhead lighting typical of commercial fitness centers.\",\n    \"details\": \"Soft, even illumination creating gentle shadows that define muscle volume. Realistic specular highlights on the skin and the metallic surfaces of the lockers. No harsh direct glares.\"\n  },\n  \"camera\": {\n    \"technical\": \"Professional mobile photography aesthetic, high-resolution sensor, 24mm wide-angle lens equivalent to capture the full silhouette.\",\n    \"settings\": \"Deep depth of field ensuring both the subject and the background lockers remain in clear focus, sharp textures, zero motion blur, realistic color balance.\"\n  },\n  \"constraints\": {\n    \"negative_prompts\": [\n      \"no logos\",\n      \"no beautify smoothing\",\n      \"no extra limbs\",\n      \"no text\",\n      \"no watermark\",\n      \"distorted proportions\",\n      \"low resolution\"\n    ],\n    \"rules\": [\n      \"reflection integrity rules: ensure the mirror reflection aligns perfectly with the subject's pose and environment\",\n      \"anatomical accuracy in muscle attachment points\",\n      \"realistic fabric tension and wrinkles\"\n    ]\n  }\n}\n-----------------`
  },
  {
    id: 29,
    category: "Close-up",
    likes: 129,
    image: "/assets/builder-29.webp",
    promptText: `A young woman, possibly in her 20s, is the main subject, captured in a medium close-up, from the back and slightly to the side, inside what appears to be a gym or fitness center. She has fair skin, a warm smile, and her head is tilted back over her right shoulder, her chest tilted forward, looking directly at the viewer with a slight smile. Her hair is tied back, possibly in a messy bun or ponytail, with a few strands hanging loose. She is wearing athletic attire: a dark gray sports bra with an abstract Nike design and navy blue spandex shorts. The shorts have a white Nike logo graphic on the left cheek. The shorts fit snugly, emphasizing her buttocks. Her physique is toned and athletic. The background suggests a gym environment. The walls are predominantly a bright mustard yellow or ochre, contrasted by black or dark gray vertical elements, likely structural columns or equipment racks. On the left, a mirrored surface reflects part of the gym's interior, including exercise equipment and another individual. In the background, on the left side, another woman is partially visible, with her back to the camera. This woman is wearing a dark top, possibly a bra top, and long red pants or leggings. Her back is exposed. Behind the main subject and to the right, there are glimpses of exercise equipment, including what appear to be yellow and possibly dark green weight plates, stacked on shelves. The lighting is bright and typical of an indoor sports facility. The overall image has a slight contrast, possibly retouched or stylized.\n-----------------`
  },
  {
    id: 30,
    category: "Selfies",
    likes: 130,
    image: "/assets/builder-30.webp",
    promptText: `{\n  \"subject\": {\n    \"description\": \"Mulher jovem fazendo uma selfie na academia, enquadramento próximo, estética UGC realista captada com iPhone\",\n    \"age\": \"21 anos\",\n    \"expression\": \"expressão neutra a levemente confiante, lábios relaxados, olhar direto para a câmera\",\n    \"hair\": {\n      \"color\": \"loiro\",\n      \"style\": \"cabelo solto, liso a levemente ondulado, preso parcialmente para treino\"\n    },\n    \"eyes\": {\n      \"color\": \"claros\",\n      \"details\": \"olhos bem iluminados pela luz ambiente da academia\"\n    },\n    \"clothing\": {\n      \"top\": {\n        \"type\": \"top esportivo\",\n        \"color\": \"preto ou tons neutros\",\n        \"details\": \"modelo fitness simples, sem logotipos visíveis\"\n      },\n      \"bottom\": {\n        \"type\": \"legging esportiva\",\n        \"color\": \"preto ou cinza escuro\",\n        \"details\": \"ajuste justo, tecido fosco\"\n      }\n    },\n    \"face\": {\n      \"preserve_original\": true,\n      \"makeup\": \"maquiagem leve de treino, pele natural, leve brilho de suor\"\n    }\n  },\n  \"accessories\": {\n    \"headwear\": {\n      \"type\": \"\",\n      \"details\": \"\"\n    },\n    \"jewelry\": {\n      \"earrings\": \"pequenos brincos discretos\",\n      \"necklace\": \"\",\n      \"wrist\": \"relógio ou pulseira fitness\",\n      \"rings\": \"\"\n    },\n    \"device\": {\n      \"type\": \"smartphone\",\n      \"details\": \"selfie com câmera frontal do iPhone, segurado com uma mão\"\n    },\n    \"prop\": {\n      \"type\": \"\",\n      \"details\": \"\"\n    }\n  },\n  \"photography\": {\n    \"camera_style\": \"selfie com câmera frontal de smartphone, estética UGC autêntica\",\n    \"angle\": \"ângulo levemente inclinado, câmera próxima ao rosto\",\n    \"shot_type\": \"plano médio fechado, do busto para cima\",\n    \"aspect_ratio\": \"9:16 vertical\",\n    \"texture\": \"nitidez moderada, textura de pele natural, leve ruído típico de ambiente interno\"\n  },\n  \"background\": {\n    \"setting\": \"academia\",\n    \"wall_color\": \"tons neutros ou escuros\",\n    \"elements\": [\n      \"espelhos\",\n      \"equipamentos de musculação desfocados\",\n      \"iluminação artificial de teto\"\n    ],\n    \"atmosphere\": \"ambiente de treino ativo, cotidiano\",\n    \"lighting\": \"luz artificial branca, uniforme, sem efeito dramático\"\n  }\n}\n-----------------`
  },
  {
    id: 31,
    category: "Selfies",
    likes: 131,
    image: "/assets/builder-31.webp",
    promptText: `{\n  \"subject\": {\n    \"appearance\": {\n      \"gender\": \"Female\",\n      \"age_range\": \"Young adult (approx. 20s)\",\n      \"hair\": {\n        \"color\": \"Blonde with slightly darker roots\",\n        \"style\": \"Long, straight, layered, falling over shoulders\",\n        \"bangs\": \"Wispy curtain bangs framing the face\"\n      },\n      \"skin_tone\": \"Light/Fair\",\n      \"facial_features\": {\n        \"eyes\": \"Light blue or green\",\n        \"expression\": \"Neutral, soft, slightly gazing away from the lens to the left\",\n        \"makeup\": \"Natural/minimal, subtle blush, groomed brows\"\n      },\n      \"physique\": \"Athletic, toned, fit, curvaceous silhouette\"\n    },\n    \"pose\": {\n      \"type\": \"Mirror selfie\",\n      \"body_orientation\": \"Three-quarter turn to the left\",\n      \"posture\": \"Standing with weight shifted to one hip (popped hip), creating an S-curve\",\n      \"hands\": {\n        \"right_hand\": \"Holding a smartphone up to capture the reflection\",\n        \"left_hand\": \"Resting gently near the midriff/waist\"\n      }\n    },\n    \"clothing\": {\n      \"top\": {\n        \"type\": \"Sports bra\",\n        \"color\": \"Light heather grey/off-white\",\n        \"details\": \"Spaghetti straps, plunging neckline, ribbed texture\"\n      },\n      \"bottom\": {\n        \"type\": \"High-waisted leggings\",\n        \"color\": \"Light grey/blue and white\",\n        \"pattern\": \"Snakeskin or animal print\",\n        \"fit\": \"Tight, compression fit\"\n      },\n      \"accessories\": {\n        \"jewelry\": [\n          \"Thin silver or gold necklace\",\n          \"Multiple silver rings on fingers\",\n          \"Black and green thin wristbands/hair ties on left wrist\",\n          \"Small tattoo on left forearm\"\n        ],\n        \"nails\": \"Dark red/burgundy polish, medium length\"\n      }\n    }\n  },\n  \"environment\": {\n    \"setting\": \"Gym locker room or changing area\",\n    \"background_elements\": {\n      \"left\": \"Metal coat rack stand with a black puffer jacket and a black/green gym bag hanging (text FITNESS visible inverted)\",\n      \"floor\": \"Dark bench, light beige tiled flooring\",\n      \"walls\": \"White textured plaster walls\",\n      \"right\": \"Corner of a wall, glimpse of a doorway or hallway\"\n    }\n  },\n  \"lighting\": {\n    \"type\": \"Soft indoor ambient lighting\",\n    \"direction\": \"Frontal/Overhead\",\n    \"quality\": \"Diffused, creating soft highlights on the skin and hair, minimal harsh shadows\"\n  },\n  \"tech_specs\": {\n    \"camera_angle\": \"Eye-level (via mirror)\",\n    \"framing\": \"Medium shot (thighs up)\",\n    \"device_visible\": \"iPhone with a white case and MagSafe ring, grey lanyard strap hanging down\",\n    \"style\": \"Photorealistic, high-resolution social media aesthetic, candid lifestyle shot\"\n  }\n}\n-----------------`
  },
  {
    id: 32,
    category: "Selfies",
    likes: 132,
    image: "/assets/builder-32.webp",
    promptText: `{\n  \"meta\": {\n    \"aspect_ratio\": \"9:16\",\n    \"quality\": \"ultra_photorealistic\",\n    \"resolution\": \"8k\",\n    \"camera\": \"câmera frontal do iPhone 15 Pro Max\",\n    \"lens\": \"24mm grande angular\",\n    \"style\": \"realismo de câmera de iPhone, não de estúdio, não profissional, textura natural visível\"\n  },\n  \"character_lock\": {\n    \"face_identity\": [\n      \"rosto oval de mulher brasileira de 20 anos, pele clara a média com textura humana altamente realista, poros aparentes e dilatados na zona T, pequenas manchas solares naturais, micro marcas de expressão e leves irregularidades na pele, sobrancelhas bem desenhadas, nariz reto e proporcional, lábios cheios com leve brilho natural (gloss), olhos escuros, maçãs do rosto marcadas, maxilar definido, sorrindo levemente, assimetria natural mantida\"\n    ],\n    \"regras_de_aparencia\": {\n      \"descricao_geral\": \"cabelo castanho escuro longo amarrado para trás em meio rabo de cavalo, tom de pele médio/bronzeado típico brasileiro, textura de pele realista com imperfeições naturais, poros visíveis, pequenas manchas e desníveis reais de pele humana, brilho natural de suor\",\n      \"marcas_especificas\": \"tatuagem grande estilo floral/mandala no braço direito\"\n    }\n  },\n  \"cena\": {\n    \"local\": \"academia de ginástica\",\n    \"ambiente\": [\n      \"aparelhos de musculação metálicos tipo rack e barras\",\n      \"anilhas de peso empilhadas à esquerda\",\n      \"ambiente organizado com piso emborrachado preto, pessoa levemente desfocada ao fundo à direita\"\n    ],\n    \"atmosfera\": \"foco em treino, fitness, casual e diária\"\n  },\n  \"iluminacao\": {\n    \"tipo\": \"iluminação artificial de teto fluorescente/LED\",\n    \"luz_principal\": \"luz vinda de cima, destacando os ombros, rosto e centro do corpo\",\n    \"contraste\": \"médio-alto\"\n  },\n  \"perspectiva_da_camera\": {\n    \"pov\": \"selfie no espelho\",\n    \"angulo\": \"frontal, altura do peito/rosto\",\n    \"distancia\": \"plano médio, cortando no meio das coxas\",\n    \"visibilidade_do_celular\": \"celular iPhone escuro visível no reflexo, segurado pela mão esquerda na altura do peito\"\n  },\n  \"assunto\": {\n    \"genero\": \"feminino\",\n    \"idade\": \"20 anos\",\n    \"vibe\": \"fitness, garota brasileira de academia confiante\",\n    \"textura_pele\": \"poros dilatados e bem visíveis de perto, textura levemente irregular e crua, micro marcas naturais no rosto, pequenas manchas de sol e sardas sutis, brilho de suor natural de academia\",\n    \"expressao\": {\n      \"olhos\": \"olhando fixamente para a tela do celular através do reflexo no espelho\",\n      \"boca\": \"sorriso leve e fechado, lábios relaxados\",\n      \"emocao\": \"confiante, tranquila, satisfeita\"\n    },\n    \"pose\": {\n      \"posicao\": \"em pé, postura ereta, leve curva no quadril\",\n      \"mao\": \"mão esquerda segurando o celular, braço direito relaxado estendido ao longo do corpo\"\n    },\n    \"roupa\": {\n      \"blusa\": {\n        \"tipo\": \"top cropped esportivo de um ombro só\",\n        \"caimento\": \"justo ao corpo, modelagem firme e compressiva\",\n        \"detalhes\": \"tecido grosso e texturizado tipo canelado/waffle, cor cinza chumbo escuro\"\n      },\n      \"extra\": [\n        \"shorts de academia cintura alta bem justo, mesma cor cinza chumbo e textura do top\",\n        \"smartwatch com pulseira clara no pulso esquerdo\",\n        \"brincos pequenos\"\n      ]\n    }\n  }\n}\n-----------------`
  },
  {
    id: 33,
    category: "Selfies",
    likes: 133,
    image: "/assets/builder-33.webp",
    promptText: `Bia, a 23-year-old Brazilian fitness influencer, has lightly tanned skin with a warm golden undertone. Her face is oval and well-proportioned, with high cheekbones and smooth, radiant skin with a natural glow. Her eyes are almond-shaped and a vibrant brown, framed by long, curled lashes and light brown, well-arched eyebrows. Her nose is thin, with a slightly upturned tip. Her lips are full and defined, often enhanced with a rosy nude gloss. Her hair is long, straight, and brown with subtle natural highlights. She has a toned yet feminine body: defined abs, a slim waist, rounded shoulders, and slender but athletic arms and legs. Her silhouette is hourglass-shaped, with visible muscle tone, especially in her abdomen and upper body, but without excessive muscle—maintaining a delicate and attractive fitness model look. Her typical look includes form-fitting sportswear—usually tank tops or cropped tops with thin straps in vibrant neon colors like hot pink or black, high-waisted jeans or athletic pants, and small gold hoop earrings or understated accessories. Her makeup is minimalist yet radiant: blush, soft eyeshadow, light highlighter, and a confident half-smile. She speaks with a São Paulo accent and uses popular slang like \"meu\", \"chocada\", or \"tá passada?\" Her personality is confident, seductive, and magnetic—the archetype of a modern, alluring fitness muse. She has a bold and outgoing tone and likes to look directly at the camera in selfies or close-ups. She often appears in urban or neon-lit settings, podcast studios, luxury shops, or modern interiors with soft, cinematic lighting and steady handheld or slow-motion camera shots. The ideal framing for videos includes vertical close-ups or medium shots focusing on her face, torso, and expressive movements.\n-----------------`
  },
  {
    id: 34,
    category: "Selfies",
    likes: 134,
    image: "/assets/builder-34.webp",
    promptText: `{\n  \"meta\": {\n    \"aspect_ratio\": \"9:16\",\n    \"quality\": \"ultra_photorealistic\",\n    \"resolution\": \"8k\",\n    \"camera\": \"câmera frontal do iPhone 15 Pro Max\",\n    \"lens\": \"24mm grande angular\",\n    \"style\": \"realismo de câmera de iPhone, não de estúdio, não profissional, textura natural visível\"\n  },\n  \"character_lock\": {\n    \"face_identity\": [\n      \"Mulher branca, maxilar bem definido, nariz reto levemente empinado pelo ângulo, lábios carnudos com sorriso sutil e natural, olhos escuros focados no reflexo do espelho, rosto parcialmente ocultado pelo celular\"\n    ],\n    \"regras_de_aparencia\": {\n      \"caracteristicas\": \"Cabelo loiro claro, longo e ondulado caindo pelas costas, pele levemente bronzeada com brilho suave e aspecto hidratado, forte definição muscular nas coxas, panturrilhas e braços, pele lisa sem imperfeições marcantes\"\n    }\n  },\n  \"cena\": {\n    \"local\": \"Área de pesos livres em uma academia moderna\",\n    \"ambiente\": [\n      \"Piso de borracha preta e plataforma de levantamento de peso em madeira\",\n      \"Equipamentos de musculação pretos, racks e espelhos amplos\",\n      \"Ambiente movimentado com homens treinando desfocados ao fundo\"\n    ],\n    \"atmosfera\": \"Treino focado, gym selfie casual, estilo fitness contemporâneo\"\n  },\n  \"iluminacao\": {\n    \"tipo\": \"Luz artificial de academia mista\",\n    \"luz_principal\": \"Iluminação de teto direcional e suave que incide sobre a modelo, destacando o relevo muscular das pernas e braços com brilho sutil na pele\",\n    \"luz_de_preenchimento\": \"Luz ambiente rebatida pelo espelho e piso, criando sombras suaves e naturais na lateral do corpo\",\n    \"contraste\": \"Contraste médio, destacando bem os volumes do corpo sem sombras duras\"\n  },\n  \"perspectiva_da_camera\": {\n    \"pov\": \"Selfie no espelho (mirror selfie)\",\n    \"angulo\": \"Ângulo lateral em perfil 3/4, câmera posicionada na altura do queixo/rosto\",\n    \"distancia\": \"Plano americano estendido, cortando na altura dos tornozelos\",\n    \"visibilidade_do_celular\": \"Celular preto (iPhone com 3 lentes) claramente visível no espelho, segurado na vertical em frente ao rosto\"\n  },\n  \"assunto\": {\n    \"genero\": \"Feminino\",\n    \"idade\": \"adulto (21+)\",\n    \"vibe\": \"Atlética, estilosa, focada, estética lifestyle\",\n    \"textura_pele\": \"Pele do corpo lisa e tonificada, com reflexos sutis de luz evidenciando hidratação natural e contorno muscular\",\n    \"expressao\": {\n      \"olhos\": \"Olhando diretamente para a tela do celular através do reflexo do espelho\",\n      \"boca\": \"Lábios fechados, esboçando um sorriso muito leve e relaxado\",\n      \"emocao\": \"Confiante, casual, satisfeita com o treino\"\n    },\n    \"pose\": {\n      \"posicao\": \"De perfil para o espelho com o tronco levemente virado para a frente, perna direita ligeiramente à frente flexionada para realçar os glúteos e quadríceps\",\n      \"apoio\": \"Peso distribuído no pé esquerdo que está reto, com a ponta do pé direito tocando o chão suavemente\",\n      \"mao\": \"Mão direita segurando firmemente o celular na altura do rosto, mão esquerda repousando com os dedos relaxados sobre a lateral da coxa/glúteo\"\n    },\n    \"roupa\": {\n      \"blusa\": {\n        \"tipo\": \"Camiseta cropped branca de mangas curtas\",\n        \"caimento\": \"Solta e curta, terminando acima da linha da cintura, formato boxy\",\n        \"detalhes\": \"Tecido liso de algodão/sintético, cor branca sólida\"\n      },\n      \"extra\": [\n        \"Shorts esportivo tipo ciclista preto, curto, justo e de cintura alta\",\n        \"Boné aba curva bege claro\",\n        \"Fones de ouvido grandes pretos (over-ear) sobre o boné\",\n        \"Tênis esportivo branco\"\n      ]\n    }\n  },\n  \"qualidade_da_imagem\": {\n    \"foco\": \"Foco cravado no reflexo da modelo no espelho, mantendo o fundo do ambiente visivelmente fora de foco\",\n    \"granulacao\": \"ruído visível em baixa luminosidade\",\n    \"nitidez\": \"NÃO extremamente nítida, mais lo-fi\",\n    \"realismo\": \"parece uma selfie real de iPhone postada online\",\n    \"distorcao_de_lente\": \"barrel distortion leve de 24mm, esticando levemente as bordas\",\n    \"pos_processamento\": \"nitidez artificial (oversharpening) típica de algoritmo iOS\"\n  }\n}\n-----------------`
  },
  {
    id: 35,
    category: "Selfies",
    likes: 135,
    image: "/assets/builder-35.webp",
    promptText: `{\n  \"meta\": {\n    \"aspect_ratio\": \"9:16\",\n    \"quality\": \"ultra_photorealistic\",\n    \"resolution\": \"8k\",\n    \"camera\": \"câmera frontal do iPhone 15 Pro Max\",\n    \"lens\": \"24mm grande angular\",\n    \"style\": \"realismo de câmera de iPhone, não de estúdio, não profissional, textura natural visível\"\n  },\n  \"character_lock\": {\n    \"face_identity\": [\n      \"rosto oval, perfil lateral com maxilar definido, nariz de ponta fina, lábios cheios com batom ou gloss rosado, delineado gatinho escuro nos olhos, sobrancelhas escuras bem desenhadas, assimetria natural mantida\"\n    ],\n    \"regras_de_aparencia\": {\n      \"caracteristicas\": \"jovem brasileira de 19 anos, cabelo longo liso castanho escuro com franja lateral longa, pele clara com bronzeado suave, textura de pele com alta fidelidade orgânica, poros sutis no rosto sob a maquiagem, pele do corpo exibindo dobras naturais e levíssima textura realista na parte posterior da coxa\",\n      \"detalhes\": \"pequenas tatuagens finas nos dedos da mão direita, pequena tatuagem circular no antebraço direito, unhas pintadas de preto\"\n    }\n  },\n  \"cena\": {\n    \"local\": \"frente a um espelho em um vestiário ou corredor de academia\",\n    \"ambiente\": [\n      \"parede com textura cinza e uma pequena placa preta ao fundo\",\n      \"piso de cerâmica clara em primeiro plano e piso emborrachado quadriculado cinza e branco ao fundo\",\n      \"ambiente limpo, bem iluminado, organizado\"\n    ],\n    \"atmosfera\": \"vaidade, fitness, pós-treino, exibindo resultados corporais, casual\"\n  },\n  \"iluminacao\": {\n    \"tipo\": \"luz artificial fluorescente ou LED de teto\",\n    \"luz_principal\": \"iluminação de teto clara e difusa que rebate no espelho, criando brilho nos tecidos canelados e na pele\",\n    \"luz_de_preenchimento\": \"luz ambiente refletida nas paredes cinzas e chão claro, iluminando o rosto suavemente sem sombras duras\",\n    \"contraste\": \"médio, destacando bem os volumes corporais com luzes de recorte naturais\"\n  },\n  \"perspectiva_da_camera\": {\n    \"pov\": \"selfie no espelho (mirror selfie)\",\n    \"angulo\": \"ângulo na altura dos ombros, câmera levemente inclinada para pegar o reflexo do corpo inteiro/plano americano\",\n    \"distancia\": \"plano americano (corte um pouco abaixo dos joelhos)\",\n    \"visibilidade_do_celular\": \"o celular (iPhone azul claro com capinha transparente) aparece claramente no espelho, segurado pela mão direita da modelo perto do queixo/ombro\"\n  },\n  \"assunto\": {\n    \"genero\": \"feminino\",\n    \"idade\": \"19 anos\",\n    \"vibe\": \"jovem brasileira, fitness influencer, confiante, atraente\",\n    \"textura_pele\": \"pele do rosto com textura de maquiagem realista e poros finos visíveis; pele do corpo com brilho natural, textura de pele humana real e pequenas imperfeições orgânicas visíveis sob a luz\",\n    \"expressao\": {\n      \"olhos\": \"olhando por cima do ombro, de soslaio, diretamente para o reflexo do celular no espelho\",\n      \"boca\": \"leve sorriso de canto, confiante e relaxado\",\n      \"emocao\": \"confiança, flerte leve, satisfação com o físico\"\n    },\n    \"pose\": {\n      \"posicao\": \"em pé, de costas/lado para o espelho, tronco torcido para trás para olhar por cima do ombro, postura que empina os glúteos\",\n      \"apoio\": \"pernas ligeiramente afastadas, peso levemente transferido, pés no chão\",\n      \"mao\": \"mão direita segurando o celular na frente do corpo, mão esquerda relaxada encostada na lateral da coxa\"\n    },\n    \"roupa\": {\n      \"blusa\": {\n        \"tipo\": \"top esportivo curto com alças finas reguláveis\",\n        \"caimento\": \"justo ao corpo\",\n        \"detalhes\": \"tecido canelado (ribbed) em tom azul marinho escuro/azul meia-noite\"\n      },\n      \"extra\": [\n        \"short esportivo muito curto e de cintura alta do mesmo conjunto\",\n        \"short with textura canelada (ribbed) azul marinho escuro, estilo sem costura (seamless)\",\n        \"relógio digital tipo smartwatch preto no pulso direito\",\n        \"pulseira fina dourada no pulso esquerdo\",\n        \"anéis dourados nos dedos da mão esquerda\"\n      ]\n    }\n  },\n  \"qualidade_da_imagem\": {\n    \"foco\": \"foco no reflexo do espelho, rosto e corpo nítidos, fundo um pouco mais suave\",\n    \"granulacao\": \"ruído visível em baixa luminosidade\",\n    \"nitidez\": \"NÃO extremamente nítida, mais lo-fi\",\n    \"realismo\": \"parece uma selfie real de iPhone postada online\",\n    \"distorcao_de_lente\": \"barrel distortion leve de 24mm, esticando levemente as bordas\",\n    \"pos_processamento\": \"nitidez artificial (oversharpening) típica de algoritmo iOS\"\n  }\n}\n-----------------`
  },
  {
    id: 36,
    category: "Lifestyle",
    likes: 136,
    image: "/assets/builder-36.webp",
    promptText: `{\n  \"metadata\": {\n    \"id\": \"ugc_cosmetic_003\",\n    \"category\": \"Influencer + Produto\",\n    \"t\n<truncated 102468 bytes>\n\nNOTE: The output was truncated because it was too long. Use a more targeted query or a smaller range to get the information you need.`
  },
  {
    id: 36,
    category: "Selfies",
    likes: 136,
    image: "/assets/builder-36.webp",
    promptText: `{\n  \"metadata\": {\n    \"id\": \"ugc_cosmetic_003\",\n    \"category\": \"Influencer + Produto\",\n    \"tags\": [\n      \"ugc\",\n      \"skincare\",\n      \"bathroom\",\n      \"selfie\",\n      \"beauty\"\n    ],\n    \"gender\": \"female\",\n    \"ethnicity\": \"brazilian\",\n    \"age_range\": \"23-28\",\n    \"format\": \"9:16\"\n  },\n  \"final_prompt\": \"((ultra realistic)), 8k uhd, photorealistic, professional UGC content photography, sharp focus on face and product, highly detailed, beautiful Brazilian female beauty influencer, 25 years old, symmetrical face, soft natural features, neutral relaxed expression, fresh post-shower skin with natural glow, minimal or no makeup, dark brown hair wrapped in towel, white asymmetrical fitted lounge top, minimal homewear, simple ring accessory, ((well-manicured hands, five fingers, natural hand anatomy)):1.3, short natural nails, one hand holding smartphone for mirror selfie, other hand holding ((skincare cleanser tube)):1.3, ((blue cosmetic tube with white label)):1.3, ((product label clearly visible facing mirror)):1.25, standing in front of bathroom mirror, relaxed posture, looking at phone screen, authentic mirror selfie pose, medium shot, vertical 9:16 format, f/2.8 aperture, moderate depth of field, slight background blur, soft diffused bathroom lighting mixed with natural light, 5200K neutral tone, ((clean modern bathroom with mirror and sink)):1.1, neutral tiles, minimal organized environment, clean fresh color palette, authentic UGC skincare routine style, relatable everyday moment\",\n  \"negative_prompt_compiled\": \"deformed hands, extra fingers, missing fingers, bad anatomy, blurry product, unreadable label, low quality, blurry, cartoon, anime, unrealistic, plastic skin, watermark, harsh lighting, bad framing, oversaturated, messy bathroom, cluttered background, dead eyes, duplicate people, floating objects, 3D render, unnatural skin tones, multiple faces\",\n  \"api_parameters\": {\n    \"width\": 512,\n    \"height\": 912,\n    \"steps\": 50,\n    \"cfg_scale\": 7.5,\n    \"sampler\": \"DPM++ 2M Karras\",\n    \"seed\": -1\n  }\n}\n-----------------`
  },
  {
    id: 37,
    category: "Lifestyle",
    likes: 137,
    image: "/assets/builder-37.webp",
    promptText: `{\n  \"metadata\": {\n    \"id\": \"ugc_product_004\",\n    \"category\": \"UGC + Produto\",\n    \"tags\": [\n      \"ugc\",\n      \"fashion\",\n      \"unboxing\",\n      \"lifestyle\",\n      \"product\"\n    ],\n    \"gender\": \"female\",\n    \"ethnicity\": \"european\",\n    \"age_range\": \"23-28\",\n    \"format\": \"9:16\"\n  },\n  \"prompt_structure\": {\n    \"quality_modifiers\": \"((ultra realistic)), 8k uhd, photorealistic, professional UGC photography, sharp focus on subject and product, highly detailed\",\n    \"subject\": {\n      \"main_description\": \"beautiful female lifestyle influencer holding a sneaker box\",\n      \"age\": \"25 years old\",\n      \"facial_features\": \"symmetrical face, soft feminine features, defined brows, natural beauty\",\n      \"expression\": \"gentle confident smile, relaxed and friendly\",\n      \"skin\": \"natural skin texture, healthy glow\",\n      \"makeup\": \"natural everyday makeup, soft matte skin, light blush, nude lips\"\n    },\n    \"hair\": {\n      \"style\": \"long straight hair\",\n      \"color\": \"light brown\",\n      \"texture\": \"smooth and natural flow\"\n    },\n    \"clothing\": {\n      \"description\": \"black fitted sleeveless dress\",\n      \"style\": \"minimalist casual chic\",\n      \"accessories\": \"none, clean aesthetic\"\n    },\n    \"hands_nails\": {\n      \"description\": \"((well-manicured hands, five fingers, natural hand anatomy)):1.3\",\n      \"nails\": \"short nude polished nails\",\n      \"pose\": \"both hands holding a product box at chest level, natural grip\"\n    },\n    \"product\": {\n      \"type\": \"((red sneaker box)):1.3\",\n      \"description\": \"((bright red box with bold white logo text)):1.25, premium athletic shoe packaging\",\n      \"positioning\": \"((box centered and facing camera clearly)):1.25, held at chest height, label fully visible\"\n    },\n    \"pose_composition\": {\n      \"body_position\": \"standing upright, slightly angled body\",\n      \"eye_direction\": \"looking directly at camera\",\n      \"overall_pose\": \"casual UGC presentation pose, holding product naturally\"\n    },\n    \"camera_settings\": {\n      \"shot_type\": \"medium shot from waist to head\",\n      \"aperture\": \"f/2.8\",\n      \"depth_of_field\": \"shallow depth with soft background blur\",\n      \"format\": \"vertical 9:16\"\n    },\n    \"lighting\": {\n      \"primary\": \"natural indoor window light\",\n      \"quality\": \"soft diffused\",\n      \"direction\": \"front-left angle\",\n      \"temperature\": \"5200K natural daylight\"\n    },\n    \"background\": {\n      \"setting\": \"minimal home interior\",\n      \"description\": \"((plain wall with subtle shadows and doorway)):1.1, clean and uncluttered\",\n      \"atmosphere\": \"simple, neutral lifestyle environment\"\n    },\n    \"color_grading\": {\n      \"palette\": \"neutral tones with vibrant red contrast\",\n      \"mood\": \"clean, modern, lifestyle\",\n      \"saturation\": \"natural with slightly enhanced product color\"\n    },\n    \"style_aesthetic\": {\n      \"photography_style\": \"authentic UGC influencer content\",\n      \"mood\": \"casual, relatable, product showcase\",\n      \"authenticity\": \"natural home setting, not overly staged\"\n    }\n  },\n  \"final_prompt\": \"((ultra realistic)), 8k uhd, photorealistic, professional UGC photography, sharp focus on subject and product, highly detailed, beautiful female lifestyle influencer, 25 years old, symmetrical face, soft feminine features, gentle confident smile, natural skin texture with healthy glow, natural everyday makeup, long straight light brown hair, black fitted sleeveless dress, minimalist casual chic style, ((well-manicured hands, five fingers, natural hand anatomy)):1.3, short nude polished nails, both hands holding ((red sneaker box)):1.3, ((bright red box with bold white logo text)):1.25, ((box centered and facing camera clearly)):1.25, held at chest height, standing upright slightly angled, looking directly at camera, medium shot from waist to head, vertical 9:16 format, f/2.8 aperture, shallow depth of field, soft blurred background, natural indoor window light, soft diffused lighting, 5200K daylight, minimal home interior with plain wall and doorway, clean uncluttered background, neutral tones with vibrant red contrast, authentic UGC influencer style, casual relatable product showcase\",\n  \"negative_prompt_compiled\": \"deformed hands, extra fingers, missing fingers, bad anatomy, blurry product, unreadable logo, low quality, blurry, cartoon, anime, unrealistic, plastic skin, watermark, harsh lighting, bad framing, oversaturated, messy background, clutter, dead eyes, duplicate people, floating objects, 3D render, unnatural skin tones, wig-like hair, multiple faces\",\n  \"api_parameters\": {\n    \"width\": 512,\n    \"height\": 912,\n    \"steps\": 45,\n    \"cfg_scale\": 7.5,\n    \"sampler\": \"DPM++ 2M Karras\",\n    \"seed\": -1\n  }\n}\n-----------------`
  },
  {
    id: 38,
    category: "Selfies",
    likes: 138,
    image: "/assets/builder-38.webp",
    promptText: `Ultra-photorealistic 9:16 vertical iPhone 15 Pro Max front camera selfie of a young woman with voluminous curly red hair, clear skin with visible freckles and natural imperfections. 8K resolution, natural iPhone selfie realism with slight 24mm barrel distortion and iOS oversharpening. She holds a dark amber cosmetics bottle with a pump near her right cheek, smiling broadly with teeth showing, looking directly at the camera with expressive relaxed eyes. Black painted nails, white pearl bracelet on right wrist. Wearing a fitted black tank top. Residential bedroom or closet background with gray wardrobe and exposed wooden ceiling. Natural daylight from a window to the front-right illuminating face and product label, soft natural shadows on the left side of face and neck. Medium-high contrast highlighting curls and hair volume. No ring light, no flash, no studio lighting, no warm/orange tones. Close-up framing shoulders face and hand with product. Casual beauty routine UGC content creator vibe, cheerful confident and natural. iPhone selfie POV at eye level slightly angled toward face. Slight natural grain in shadow areas of background.\n-----------------`
  },
  {
    id: 39,
    category: "Selfies",
    likes: 139,
    image: "/assets/builder-39.webp",
    promptText: `Ultra-photorealistic 9:16 vertical iPhone 15 selfie of a young Latina woman aged 20-25 outdoors under clear blue sky. Shot with 24mm f/1.6 main lens. She has warm-toned tanned skin with visible pores on nose and inner cheeks, oily shine on T-zone, slight redness around nose and cheeks from sun exposure, small freckles scattered on cheeks, subtle old acne mark on right cheek, fine lines at eye corners. Dark brown wavy 2B hair in a messy bun with loose front strands, flyaway hairs on top and around forehead, slightly oily roots with frizz. Eyes closed in relaxed expression, mouth slightly open, head tilted back. Holding a facial cream tube with beige and gold label near her face with one hand, product label partially visible. Wearing a yellow thin-strap tank top with smooth slightly shiny fabric. Layered thin gold necklace and gold ring. Direct lateral sunlight from upper right creating harsh defined shadows under nose, lower lip and chin, hand shadow projected on side of face. Strong highlights on skin and product reflections. Warm color temperature predominant. Tight framing with slight crop at top of hair. Casual posed photo with product near face, attempting advertising aesthetic but captured as casual iPhone photo. Clean uniform blue sky background with no distractions.\n-----------------`
  },
  {
    id: 40,
    category: "Selfies",
    likes: 140,
    image: "/assets/builder-40.webp",
    promptText: `Ultra realistic 8K UHD photorealistic iPhone 15 selfie captured in a bathroom, 9:16 vertical format, f/1.6 aperture, 24mm equivalent lens. Young European woman aged 20-25 with oval face, fair warm-toned skin with visible oiliness and shine across the T-zone especially forehead and nose, pores visible on nose and central cheeks under direct light, slight redness on cheeks and around nose, small blackheads on nose, light texture irregularities on cheeks, subtle dark circles with faint purple undertone. Blue-green eyes with almond shape and slight asymmetry, one eye slightly more closed from squinting in bright light, medium-thickness eyebrows with slight gaps and misaligned hairs. Thin straight nose with slightly rounded tip and intense shine on the bridge. Medium lips with fuller lower lip, natural rosy pink color, slightly dry with visible fine lines. Soft jawline without sharp definition, rounded chin, slight asymmetric smile with one side higher. Dark brown straight hair hidden under a gray bathroom towel wrap with a few baby hairs escaping at the hairline. Wearing a fitted beige ribbed square-neck top pressing slightly into the skin, thin necklace with dark pendant, ring on right hand. Right arm raised holding a small round glass skincare jar with white lid near her face at cheek level, well-manicured natural nails. Relaxed shoulders, direct eye contact with camera, casual selfie pose. Indoor bathroom setting with light-colored tile walls, shower visible in background. Strong lateral sunlight from the left creating harsh shadow line splitting face and body vertically, warm dominant color temperature with cooler shadows, overexposed areas on forehead and nose, high contrast between lit and shadow sides, hard shadow under nose and chin. Natural iPhone processing with slight oversharpening, subtle lens barrel distortion at edges, authentic casual selfie aesthetic, not professionally staged.\n-----------------`
  },
  {
    id: 41,
    category: "Selfies",
    likes: 141,
    image: "/assets/builder-41.webp",
    promptText: `Ultra realistic 8K UHD photorealistic iPhone 15 selfie, 9:16 vertical format, f/1.6 aperture, 24mm equivalent lens. Young European woman aged 20-25 with oval face, fair warm-toned skin with visible pores on inner cheeks and around nose, light shine on forehead and nose tip, slight redness on nose and cheeks, subtle dark circles with faint purple undertone and fine lines. Light brown almond-shaped eyes partially closed in a relaxed expression, thin slightly arched eyebrows with subtle gaps and misaligned hairs, fine peach fuzz above upper lip. Small delicate nose with rounded tip and slight redness. Full lips with soft contour, medium pink color with lip product shine and natural fine lines visible. Soft jawline with little definition, small rounded chin, gentle smile slightly higher on the right side. Long straight light blonde hair with lighter highlights and slightly darker roots, loose with side part, healthy appearance with light frizz and some dry ends, flyaway hairs around top and sides of face. Wearing a chunky knit burnt orange sweater with visible texture, slightly loose comfortable fit with natural fabric deformation, thin ring on right hand. Head tilted to the right, hand holding a small white skincare serum bottle with minimalist label near chin level, well-manicured natural short nails. Relaxed shoulders, eyes closed, peaceful self-care moment. Indoor residential setting with blurred warm neutral background, indistinct furniture shapes. Soft diffused natural light from front-left, warm overall tone, gentle shadows below nose and chin, slight overexposure on brightest face areas. Authentic casual iPhone selfie aesthetic with subtle oversharpening and slight barrel distortion at edges, not professionally staged.\n-----------------`
  },
  {
    id: 42,
    category: "Selfies",
    likes: 142,
    image: "/assets/builder-42.webp",
    promptText: `Ultra realistic 8K UHD photorealistic professional UGC lifestyle photography, sharp focus on face and product. Beautiful 26-year-old European female lifestyle influencer with symmetrical face, defined cheekbones, natural freckles scattered across nose and cheeks, sharp well-groomed eyebrows. Soft confident expression with subtle pout while sipping from straw, direct eye contact with camera. Natural skin texture with soft matte glow, light freckles clearly visible, natural glam makeup with warm blush, nude lips, and defined curled lashes. Sleek half-up hairstyle with medium brown straight smooth hair pulled back neatly with natural shine. Wearing a white fitted crew-neck t-shirt, minimal chic lifestyle outfit. Gold chunky hoop earrings as statement accessory. Well-manicured hands with natural anatomy, short almond nails with nude polish. Holding a large matte beige insulated tumbler cup with metallic silver rim and metal straw, subtle embossed logo on cup surface, tumbler held close to mouth while sipping through straw, angled slightly toward camera showing full cup shape. Selfie-style upper body angle slightly tilted, casual relaxed pose, medium close-up shot. Vertical 9:16 format, f/2.8 aperture, shallow depth of field with blurred background. Natural window light from front-right, soft diffused lighting, 5500K daylight. Modern minimalist living room interior with blurred sofa, wardrobe, curtains, wooden floor, neutral warm tones. Clean cozy everyday lifestyle atmosphere. Neutral beige and white color palette, calm minimal aesthetic mood, natural soft saturation. Authentic UGC selfie content, relatable casual lifestyle moment, genuine and not overly staged.\n-----------------`
  },
  {
    id: 43,
    category: "Selfies",
    likes: 143,
    image: "/assets/builder-43.webp",
    promptText: `Ultra realistic 8K UHD photorealistic iPhone 15 Pro Max selfie style, 9:16 vertical format, 24mm wide angle lens. Young 19-year-old Brazilian woman with clean girl aesthetic, standing facing camera in front of a pure white infinite studio background. Playful happy expression with wide smile showing teeth, tongue slightly out resting on lower teeth, left eye winking and right eye open, looking directly at camera. Natural skin texture with visible pores, realistic complexion, no heavy makeup, fresh clean face. Straight medium brown hair falling loosely over shoulders. Wearing a simple white cotton crew-neck t-shirt, fitted to body. Right hand raised holding a bright yellow cylindrical toothpaste tube with bold black text branding near face at cheek level, product label clearly visible and readable. Bright uniform studio lighting, soft frontal fill light eliminating harsh shadows, medium-low contrast, vibrant colors on product. Round catchlights in eyes from studio lights. Clean minimal commercial vibe, cheerful and vibrant atmosphere. Slight iPhone barrel distortion at edges, subtle oversharpening typical of iOS processing. Authentic casual selfie feel, not overly staged.\n-----------------`
  },
  {
    id: 44,
    category: "Lifestyle",
    likes: 144,
    image: "/assets/builder-44.webp",
    promptText: `Ultra-realistic cinematic beauty UGC portrait of a young woman sitting on a soft beige sofa in a bright modern apartment living room, holding a pink lipstick in her hand and presenting it toward the camera in a natural influencer product-demo pose. Framed from the waist up, facing forward, making direct eye contact with a calm confident slightly conversational expression as if speaking to her audience. Hair is wet and slicked back naturally with realistic strands clumping together and subtle shine from moisture. Skin shows true-to-life texture including pores, faint freckles, slight redness, and natural glow with no heavy makeup and no airbrushing. Lips have a soft natural sheen and realistic texture. Wearing a simple black strapless top with visible fabric tension and folds, minimal gold jewelry including hoop earrings and rings catching light with soft metallic reflections. Lipstick held delicately between fingers with other hand posed underneath in a classic beauty-influencer product framing gesture, showing natural fingernails, skin creases, and subtle hand imperfections. Warm cozy high-end apartment living room with cream-colored cushions, textured fabric throws, and large windows behind. Soft natural daylight streaming through windows creating gentle highlights on face, realistic shadow falloff, and warm ambient bounce light. Background slightly out of focus with shallow depth of field producing natural bokeh and strong subject separation. Shot as if on a real full-frame camera with 35mm lens at wide aperture, authentic optical depth, slight edge softness, crisp focus on eyes and lipstick. Neutral photographic color grading with warm daylight tones, realistic skin colors, no artificial HDR or oversaturation. Fine film grain and subtle sensor noise in shadows for organic cinematic feel. Vertical 9:16 format.\n-----------------`
  },
  {
    id: 45,
    category: "Selfies",
    likes: 145,
    image: "/assets/builder-45.webp",
    promptText: `((ultra realistic)), 8k uhd, photorealistic, professional UGC content photography, sharp focus on face and product, highly detailed, beautiful Brazilian female tech influencer, 27 years old, symmetrical face, bright eyes, defined eyebrows, natural beauty, genuine excited smile, joyful surprised expression, natural skin texture, healthy glow, natural makeup with glossy lips, straight blonde hair with subtle highlights, smooth texture tucked behind ear, cozy red knit sweater with textured fabric, casual lifestyle outfit, small hoop earrings, ((well-manicured hands, five fingers, natural hand anatomy)):1.3, light pink glossy nails, ((hand holding product box close to face)):1.3, ((wireless earbuds retail box)):1.3, ((product box with earbuds image clearly visible)):1.25, clean modern packaging, ((held beside face at cheek level, slightly angled toward camera)):1.2, upper body slightly angled, relaxed posture, looking at camera, natural selfie-style influencer pose, medium close-up shot, f/2.8 aperture, shallow depth of field, vertical 9:16 format, natural window light, soft diffused lighting, 45-degree angle, 5500K natural daylight, blurred tiled indoor background with bokeh, clean casual environment, warm tones with vibrant red contrast, energetic inviting mood, authentic UGC influencer content, relatable and genuine product discovery moment\n-----------------`
  },
  {
    id: 46,
    category: "Lifestyle",
    likes: 146,
    image: "/assets/builder-46.webp",
    promptText: `Ultra photorealistic 8K UHD iPhone 15 Pro Max style, 9:16 vertical format, 24mm wide angle lens. Young Brazilian woman with symmetrical face, well-defined contoured jawline, thin slightly upturned nose, full plump lips with pink nude gloss, light blue-green eyes, arched filled eyebrows, soft contour makeup with highlight on high points of face, natural asymmetry maintained. Long brown hair with subtle lighter highlights, wavy and loose in layers. Slightly bronzed skin with natural human texture, visible pores, slight skin irregularity, small natural marks on face, realistic oiliness and natural shine on cheekbones and nose tip. Podcast or videocast recording studio setting with black dynamic microphone mounted on articulated boom arm to the left, background wall with vertical wooden slat panel and warm horizontal LED strip light, ornamental green ficus plant in large light textured vase to the right, light beige fabric sofa or armchair, clean aesthetic professional modern environment. Professional soft diffused frontal lighting illuminating face evenly, warm ambient light from background LED and possible bounce fill in shadows creating very soft contrast, low-medium contrast with very soft shadows under chin and jawline. Eyes looking to the left slightly off-camera lens focused on interviewer, lips slightly parted appearing about to speak or listening attentively, neutral attentive focused engaged expression. Seated with upright relaxed posture supported by beige sofa cushions, hands not visible resting out of frame. Wearing long-sleeve V-neck top in antique pink mauve color, tight and body-hugging, smooth plain fabric. Gold necklace with multiple four-leaf clover white pearlescent pendants Van Cleef style, matching white clover stud earrings. Sharp focus on face capturing pores and skin texture perfectly with intentionally soft blurred background. Visible grain noise in low light, not extremely sharp more lo-fi feel, realistic capture of organic micro-textures and minimal imperfections, slight 24mm barrel distortion stretching edges, iOS oversharpening artificial sharpness enhancing pores. Professional warm modern communication-focused atmosphere.\n-----------------`
  },
  {
    id: 47,
    category: "Lifestyle",
    likes: 147,
    image: "/assets/builder-47.webp",
    promptText: `Ultra photorealistic 8K UHD iPhone 15 Pro Max style, 9:16 vertical format, 24mm wide angle lens. White Brazilian woman with symmetrical facial features, well-defined jawline, prominent cheekbones, straight bridge nose with subtly rounded tip, natural proportion lips with nude gloss, almond-shaped blue eyes under arched filled eyebrows, natural asymmetry maintained. Brown straight hair parted in the middle and firmly slicked back. Light skin tone with extremely realistic imperfect human skin texture, well visible dilated pores especially in T-zone, slightly irregular texture with small expression marks and facial peach fuzz, sophisticated neutral makeup, tiny freckles or sun spots barely perceptible, micro texture marks on cheeks and forehead. Professional aesthetic podcast recording studio with dark wood bookshelf in background filled with various books small succulent plants and stylized art objects figurines, black over-ear studio headphones hanging on hook on bookshelf side, intimate cozy content-focused studio atmosphere. Dramatic mixed content creator lighting with very soft wide key light from large diffuser positioned slightly right of camera illuminating face and revealing raw skin texture, deep blue and purple LED ambient lights on background walls and bookshelf contrasting with warm yellow practical light from desk lamp in background, high dramatic contrast separating well-lit foreground figure from dark colorful background. Direct penetrating focused gaze looking straight into the lens, mouth closed relaxed and slightly moistened by gloss, confidence seriousness and presence expression. Seated upright with aligned shoulders, torso leaning slightly forward with arms resting on desk gesturing gently, left hand adorned with bracelets and ring resting gracefully under chin, right hand gesturing in symmetry. Structured shouldered black tailored blazer with black solid top underneath, slightly satin black blazer fabric with dark cuff buttons, gold hoop earrings, mix of delicate gold bracelets on left wrist, gold ring. Sharp focus perfectly locked on eyes and facial skin texture with soft bokeh on microphone bookshelf and background. Black robust directional microphone Shure SM7B style on articulated black boom arm from right side of frame positioned subtly in front and beside face without covering mouth. Light wood desk with only black over-ear headphones and edge of THE GLOW UP PODCAST nameplate visible. Visible grainy noise in low light, not extremely sharp more lo-fi feel, total focus on realistic raw human skin texture without beauty filters, slight 24mm barrel distortion stretching edges, iOS oversharpening artificial sharpness enhancing pores and skin marks. Professional intimate cultured modern podcast atmosphere.\n-----------------`
  },
  {
    id: 48,
    category: "Close-up",
    likes: 148,
    image: "/assets/builder-48.webp",
    promptText: `A high-resolution, close-up portrait photograph of a beautiful 20-year-old Brazilian woman with long, straight blonde hair, captured smiling genuinely with her teeth visible in an eclectic podcast studio. She is seated at a rustic wooden desk, with her hands elegantly clasped, holding a clear plastic water bottle. She wears a vibrant pink ribbed knit crop top and light blue denim jeans. A large black professional broadcast microphone is positioned in front of her. The background is softly blurred with a shallow depth of field, revealing dark shelves filled with fascinating artifacts: an aged, detailed brass skull mask, a book with a prominent, ornamental cross, glowing Edison bulbs, and curated items. The far wall is covered in diagonal yellow and black warning tapes with text like 'ATENÇÃO'. The lighting is soft cinematic studio lighting, with warm volumetric light from the Edison bulbs and subtle rim light. The image features high-resolution skin texture, visible pores, realistic fabric folds, and visible wood grain. Shot on ARRI Alexa, RAW film style, soft film grain, shallow depth of field, cinematic composition. The scene has an engaging noir curiosity shop feel.\n-----------------`
  },
  {
    id: 49,
    category: "Lifestyle",
    likes: 149,
    image: "/assets/builder-49.webp",
    promptText: `Ultra photorealistic 8K UHD iPhone 15 Pro Max style, 9:16 vertical format, 24mm wide angle lens. Young 20-year-old Brazilian woman with oval face shape, fair skin, soft jawline, straight nose, medium thickness lips with slight pink gloss, expressive brown eyes, natural asymmetry maintained. Long blonde straight hair with soft waves at the ends parted in the middle. Fair skin tone with highly realistic skin texture, visible pores, irregular texture, natural skin marks and blemishes, small freckles and unfiltered micro imperfections. Bright living room possibly home office or podcast recording studio, tall olive-style plant with classic framed floor mirror behind to the left, white wall with two brown decorative leather or ceramic ornaments hanging and white door to the right, clean bright organized minimalist cozy aesthetic environment. Soft diffused natural light mixed with frontal fill lighting revealing raw natural skin textures, light bounced off white walls minimizing harsh shadows, low contrast with pastel whites and light tones dominating the scene. Eyes looking directly at camera lens with attentive serene expression, gentle closed slight smile, sympathy calm receptive emotion. Seated comfortably with right leg crossed over left leg, sitting in a round white boucle fuzzy upholstered armchair, hands resting relaxed subtly crossed on lap. Wearing oversized loose white American football jersey style shirt with black and gold striped V-neck collar and large red number 72 on center, soft cotton or fine knit fabric with natural folds marking relaxed silhouette, classic light wash blue denim jeans, thin gold necklace with small letter S pendant. Black podcast microphone on articulated boom arm crossing frame to the left. Sharp focus locked on face highlighting pores and natural imperfections and on foreground microphone with background in slight blur. Visible grainy noise in low light, not extremely sharp more lo-fi feel enhancing raw skin texture, slight chromatic noise perceptible without software smoothing, slight 24mm barrel distortion stretching edges, iOS oversharpening artificial sharpness enhancing micro details and pores. Comfortable casual inviting authentic podcast atmosphere.\n-----------------`
  },
  {
    id: 50,
    category: "Lifestyle",
    likes: 150,
    image: "/assets/builder-50.webp",
    promptText: `Ultra photorealistic 8K UHD iPhone 15 Pro Max style, 9:16 vertical format, 24mm wide angle lens. Same person from reference image, same facial proportions jawline and bone structure, same nose lips eyes and facial features, natural asymmetry maintained, no face alteration, no face swap errors, no generic AI face. Hair skin tone skin texture facial imperfections and overall appearance from reference image only. Podcast recording studio with dark textured background wall, large tropical plants and illuminated foliage including monstera and ferns, organized subject-focused setting. Professional content creation intimate focused vibe. Directional studio lighting with soft frontal light on face combined with strong warm orange rim light hitting hair from both sides, soft shadows projected under chin and cheekbones, intentionally darkened background, high contrast between illuminated model and dark background. Frontal view exactly at eye level like a viewer watching the podcast, medium shot capturing from light wood desk upward. Direct focused fixed gaze at camera lens, closed lips relaxed neutral posture, neutral attentive serene expression. Seated with upright centered posture behind a flat light wood desk, hands not visible resting out of frame. Wearing very tight fitted white ribbed texture short sleeve crop top with prominent bust marking the fabric, small gold hoop earrings, layered thin gold necklaces, black sporty bottom. Black Shure SM7B microphone on articulated boom arm crossing front of frame. Sharp focus locked on face and foreground microphone with slight blur on background plants. Low visual noise, sharp clothing and skin texture, slight 24mm barrel distortion stretching edges, iOS oversharpening artificial sharpness. Professional intimate podcast content creator atmosphere.\n-----------------`
  },
  {
    id: 51,
    category: "Lifestyle",
    likes: 151,
    image: "/assets/builder-51.jpg",
    promptText: `A medium-length photograph, captured at eye level, with an elegant, vacation-like, and serene aesthetic, set on a floating deck or beachfront restaurant. The female figure is seated on a high bench or stool, with one leg folded over the other and her hands relaxed on her legs. The body is turned slightly to the side, but the head is turned toward the camera, looking with a wide, joyful, and genuine smile. The composition focuses on the figure with the waterscape in the background. The female figure displays a curvaceous and toned physique, with a soft, feminine silhouette. Her breasts are medium-sized, slightly visible under the white top and beach cover-up. The waist is defined but not extremely thin, creating a gentle curve. The hips are wide and rounded, transitioning smoothly into the thighs. The legs are thick and toned, especially the thighs, which are prominent and highly defined, highlighted by the pose. The buttocks are medium to large, subtly outlined by the shorts. Her skin has a soft, even tan with a healthy glow. She wears an elegant, boho-chic summer outfit, all in white. A long, sheer, lightweight beach cover-up with long, loose sleeves (bell bottoms) and ruffled or tie-front details create a V-neckline. Beneath the cover-up, a white bikini top and tight white shorts are visible. On her feet, she wears discreet flat sandals (possibly thong sandals or thin-strap sandals). Accessories include dark sunglasses with round or oval frames, a thin gold necklace with an \"A\" or \"V\" pendant, and multiple rings on her fingers, including a large, eye-catching one. A small straw or wicker bag with brown leather handles and a designer logo (Celine) sits on the counter beside her. Her nails are manicured and painted white or nude. Her hair is very long, voluminous, and wavy, dark brown or black. It is draped to the left side, falling generously over the shoulder and chest, framing the face. The makeup is visible and well-done, with dark, well-defined eyebrows and lips plumped with vibrant pink lipstick, contrasting with the white look. The background is a stunning seaside or lakeside setting. The figure is seated on a brown wooden deck. Behind her, a body of emerald green or turquoise water stretches out, with dense tropical vegetation (trees and dark foliage) on the opposite shore, creating a lush natural setting. The sky, partially visible, is a light blue. The lighting is natural and abundant, likely sunny daylight from the front or slightly to the side. This light enhances the radiance of the skin and the lightness of the white fabric, creating a soft contrast with the water and vegetation. Soft shadows are cast, shaping the figure. The overall atmosphere is one of relaxation, understated luxury, and holiday cheer. Camera Settings: Captured with a prime portrait lens (e.g., 85mm f/1.8 or 50mm f/1.4) on a full-frame camera for a sharp, medium-length portrait with soft bokeh. Aperture set between f/2.0 and f/2.8 to isolate the subject from the water background and vegetation. ISO 100-200 for abundant natural light. Shutter speed 1/250s to 1/500s. Soft, natural lighting, possibly with a reflector to fill in shadows. Instructions for the \"nano banana\": \"Please use the user's reference image to capture and apply all of their facial features, face structure, eye color, skin tone (soft tan), hair style and color (very long, thick, wavy, dark brown/black), as well as the described body shape (curvy and toned, bustline). medium-sized, defined waist, wide hips, thick/toned legs, medium/large butt) with maximum fidelity. The goal is to create a version of the user in this vacation scenario. The clothing (white cover-up, white bikini, white shorts, sunglasses, necklace, rings, straw bag), the sitting pose, the cheerful smile, the natural lighting, and the background of water and tropical vegetation should be generated as described, creating a perfect fusion between the user's identity and the aesthetics of the image.\"\n-----------------`
  },
  {
    id: 52,
    category: "Lifestyle",
    likes: 152,
    image: "/assets/builder-52.jpg",
    promptText: `Crie uma imagem realista com o MEU ROSTO e a MINHA APARÊNCIA exatamente como na foto que enviei — não mude absolutamente nenhuma das minhas características físicas (rosto, traços, formato dos olhos, nariz, boca, pele, cabelo, corpo etc). Apenas replique o estilo e a composição da imagem abaixo com fidelidade. A pessoa deve estar com os braços erguidos atrás da cabeça, em uma pose confiante e sensual. A iluminação deve vir de uma janela, projetando faixas de luz e sombra no rosto e no corpo, criando um contraste dramático e artístico. A luz deve destacar principalmente os olhos e o brilho natural da pele. O fundo deve ser simples e neutro, em tom claro, para manter o foco no rosto. O clima geral da imagem precisa ser intimista, elegante e cinematográfico, com um toque de mistério e intensidade no olhar. A maquiagem deve ser natural e iluminada, com pele glow e lábios com leve brilho. Os cabelos devem estar soltos, com aparência natural e volume suave. A roupa deve ser uma blusa preta com alças, deixando os ombros à mostra. Importante: mantenha 100% das minhas características reais — não altere o formato do rosto, olhos, nariz, boca, cor da pele, cabelo ou qualquer traço físico meu. Apenas insira minha aparência nessa mesma pose, iluminação e estilo descritos.\n-----------------`
  },
  {
    id: 53,
    category: "Lifestyle",
    likes: 153,
    image: "/assets/builder-53.webp",
    promptText: `Extreme macro photography of the model's [mouth] in the image. Photorealistic details with visible textures, such as pores, fine hairs, wrinkles, and fibers. Natural imperfections, including subtle imperfections such as uneven tone and small blemishes. Realistic surface variation with natural oily shine and dryness in different areas. No makeup, no retouching. The surrounding skin has authentic texture with visible pores, micro-details, and natural asymmetry. Real skin translucency, without idealized smoothness. The lighting is soft yet directional, falling on the surface at a shallow angle to reveal texture and depth. Neutral white balance, true-to-life colors, cinematic contrast. No saturated blacks, no blown-out highlights. Extremely shallow depth of field with precise focus on the surface and smooth fading towards the edges. Shot with a high-quality macro lens, equivalent to 100mm. The feeling of macro photography done with a DSLR or smartphone. Documentary realism, unretouched, raw and authentic. It's not CGI.\n-----------------`
  },
  {
    id: 54,
    category: "Lifestyle",
    likes: 154,
    image: "/assets/builder-54.webp",
    promptText: `Extreme macro photography of the model's [eye] in the image. Photorealistic details with visible textures, such as pores, fine hairs, wrinkles, and fibers. Natural imperfections, including subtle imperfections such as uneven tone and small blemishes. Realistic surface variation with natural oily shine and dryness in different areas. No makeup, no retouching. The surrounding skin has authentic texture with visible pores, micro-details, and natural asymmetry. Real skin translucency, without idealized smoothness. The lighting is soft yet directional, falling on the surface at a shallow angle to reveal texture and depth. Neutral white balance, true-to-life colors, cinematic contrast. No saturated blacks, no blown-out highlights. Extremely shallow depth of field with precise focus on the surface and smooth fading towards the edges. Shot with a high-quality macro lens, equivalent to 100mm. The feeling of macro photography done with a DSLR or smartphone. Documentary realism, unretouched, raw and authentic. It's not CGI.\n-----------------`
  },
  {
    id: 55,
    category: "Lifestyle",
    likes: 155,
    image: "/assets/builder-55.webp",
    promptText: `Extreme macro photography of the model's [nose] in the image. Photorealistic details with visible textures, such as pores, fine hairs, wrinkles, and fibers. Natural imperfections, including subtle imperfections such as uneven tone and small blemishes. Realistic surface variation with natural oily shine and dryness in different areas. No makeup, no retouching. The surrounding skin has authentic texture with visible pores, micro-details, and natural asymmetry. Real skin translucency, without idealized smoothness. The lighting is soft yet directional, falling on the surface at a shallow angle to reveal texture and depth. Neutral white balance, true-to-life colors, cinematic contrast. No saturated blacks, no blown-out highlights. Extremely shallow depth of field with precise focus on the surface and smooth fading towards the edges. Shot with a high-quality macro lens, equivalent to 100mm. The feeling of macro photography done with a DSLR or smartphone. Documentary realism, unretouched, raw and authentic. It's not CGI.\n-----------------`
  },
  {
    id: 56,
    category: "Selfies",
    likes: 156,
    image: "/assets/selfie.jpg",
    promptText: `[IDENTITY LOCK]\n\nUse the uploaded image as the single source of truth for identity preservation.\n\nMaintain with maximum accuracy:\n- facial structure\n- face shape\n- eyes\n- eyebrows\n- nose\n- lips\n- jawline\n- skin tone\n- skin texture\n- facial proportions\n- unique facial characteristics\n\nDo not modify identity.\nDo not beautify.\nDo not change age.\nDo not change ethnicity.\nDo not generate a different person.\n\n[SCENE]\n\nNatural smartphone selfie.\n\nThe subject is holding the phone and taking their own photo.\n\nCamera positioned at arm's length.\n\nDirect eye contact with the lens.\n\nRelaxed posture.\n\nAuthentic and spontaneous expression.\n\nSoft natural smile.\n\nReal-world social media profile picture.\n\n[COMPOSITION]\n\nHead and shoulders framing.\n\nPortrait orientation.\n\nCentered composition.\n\nNatural selfie perspective.\n\nNo extreme angles.\n\nNo exaggerated poses.\n\nProfessional yet casual appearance.\n\n[LIGHTING]\n\nNatural daylight.\n\nSoft light.\n\nBalanced exposure.\n\nRealistic shadows.\n\nNatural skin rendering.\n\nNo studio flash look.\n\n[CAMERA]\n\nPremium smartphone camera.\n\nUltra realistic photography.\n\nHigh detail.\n\nSharp eyes.\n\nNatural depth of field.\n\nPhotographic realism.\n\nProfessional mobile photography.\n\n[BACKGROUND]\n\nClean.\n\nMinimal.\n\nSlightly blurred.\n\nNon-distracting.\n\nReal environment.\n\n[QUALITY]\n\nPhotorealistic.\n\nHyper realistic.\n\nAuthentic human appearance.\n\nNatural skin pores.\n\nReal facial texture.\n\nSocial media ready.\n\nProfile picture quality.\n\nLooks like a real photograph captured by a person.\n\n[NEGATIVE]\n\ndifferent person,\nidentity drift,\nface alteration,\nbeautification,\nplastic skin,\nAI look,\nCGI,\n3D render,\ncartoon,\nanime,\nillustration,\nlow quality,\nblurry,\ndeformed face,\nasymmetrical eyes,\nunrealistic proportions,\noverprocessed skin,\nheavy makeup,\nfashion editorial style,\nstudio glamour,\nfake lighting,\nuncanny valley\n\n[OUTPUT]\n\nUltra realistic selfie photograph with perfect identity preservation, natural smartphone perspective, direct eye contact, authentic expression, and professional social media profile photo quality.\n-----------------`
  },
  {
    id: 57,
    category: "Selfies",
    likes: 157,
    image: "/assets/foto-espelho.jpg",
    promptText: `[IDENTITY LOCK]\n\nUse the uploaded image as the single source of truth for identity preservation.\n\nMaintain with maximum accuracy:\n- facial structure\n- face shape\n- eyes\n- eyebrows\n- nose\n- lips\n- jawline\n- skin tone\n- skin texture\n- facial proportions\n- unique facial characteristics\n\nDo not modify identity.\nDo not beautify.\nDo not change age.\nDo not change ethnicity.\nDo not generate a different person.\n\n[SCENE]\n\nNatural mirror selfie.\n\nThe subject is standing in front of a mirror taking a photo of herself using the rear camera of her smartphone.\n\nThe smartphone is visible in one hand.\n\nThe subject is looking naturally at her reflection in the mirror.\n\nRelaxed posture.\n\nNatural body language.\n\nAuthentic everyday moment.\n\nThe image should feel like a real photo casually taken for Instagram stories, WhatsApp profile, or social media.\n\nBrazilian lifestyle aesthetic.\n\nNo luxury environment.\n\nNo influencer studio setup.\n\nNo exaggerated poses.\n\n[COMPOSITION]\n\nVertical photo.\n\nMirror occupies most of the frame.\n\nSubject centered naturally.\n\nFull upper body visible.\n\nNatural mirror perspective.\n\nSmartphone partially covering a small portion of the face as happens in real mirror selfies.\n\nRealistic framing.\n\nNo professional photoshoot composition.\n\n[ENVIRONMENT]\n\nSimple Brazilian bedroom, bathroom, apartment, or dressing area.\n\nClean but lived-in environment.\n\nRealistic Brazilian home details.\n\nNeutral colors.\n\nEveryday atmosphere.\n\nNatural objects in the background.\n\nNothing extravagant.\n\nNothing luxurious.\n\nAuthentic Brazilian indoor setting.\n\n[EXPRESSION]\n\nSoft natural smile or neutral expression.\n\nConfident but casual.\n\nComfortable.\n\nSpontaneous.\n\nNo modeling expression.\n\nNo exaggerated facial emotions.\n\n[LIGHTING]\n\nNatural daylight coming through a window.\n\nSoft indoor lighting.\n\nBalanced exposure.\n\nRealistic shadows.\n\nNatural skin rendering.\n\nNo flash.\n\nNo studio lighting.\n\n[CAMERA]\n\nPremium smartphone camera.\n\nRear camera mirror selfie.\n\nUltra realistic photography.\n\nRealistic smartphone image quality.\n\nNatural lens characteristics.\n\nSharp focus.\n\nHigh detail.\n\nRealistic reflections.\n\n[QUALITY]\n\nPhotorealistic.\n\nHyper realistic.\n\nAuthentic human appearance.\n\nNatural skin pores.\n\nNatural imperfections preserved.\n\nLooks like a genuine photo taken by a real Brazilian influencer.\n\nSocial media quality.\n\nExtremely believable.\n\n[NEGATIVE]\n\ndifferent person,\nidentity drift,\nface alteration,\nbeautification,\nplastic skin,\nAI look,\nCGI,\n3D render,\ncartoon,\nanime,\nillustration,\nluxury mansion,\nluxury penthouse,\nprofessional photoshoot,\nfashion campaign,\nstudio setup,\nunrealistic reflection,\nperfect skin,\nheavy makeup,\nfake lighting,\ndeformed hands,\nextra fingers,\ndistorted mirror,\nblurry image,\nlow quality,\nuncanny valley\n\n[OUTPUT]\n\nUltra realistic Brazilian mirror selfie with perfect identity preservation, natural smartphone reflection, authentic indoor environment, realistic lighting, casual posture, and genuine social media photo appearance.\n-----------------`
  },
  {
    id: 58,
    category: "Lifestyle",
    likes: 158,
    image: "/assets/rosto-influencer.jpg",
    promptText: `Crie uma imagem ultrarrealista de uma influenciadora digital brasileira de IA, usando duas imagens de referência enviadas pelo usuário.\nUse a Imagem 1 como referência principal do rosto. Analise cuidadosamente formato facial, proporções, tom de pele, textura da pele, sobrancelhas, olhos, nariz, boca, queixo, expressão, cabelo visível, ângulo facial e identidade visual geral.\nUse a Imagem 2 apenas como apoio para coerência corporal, tom geral, estilo e presença visual, sem perder o foco principal no rosto.\nCrie uma foto de rosto estilo retrato 3x4 profissional, com a influenciadora olhando diretamente para a câmera, rosto mais próximo da câmera, enquadramento do topo da cabeça até a parte superior dos ombros. A imagem deve priorizar máximo detalhamento facial, naturalidade e realismo.\nA influenciadora deve parecer uma pessoa real, brasileira, com aparência humana autêntica, sem estética artificial. A pele deve ter poros visíveis, textura natural, pequenas variações de tom, leves imperfeições humanas, expressão confiante, simpática e espontânea.\nAmbiente:\nCenário natural, simples e realista, com fundo neutro ou quarto brasileiro discreto levemente desfocado. Nada artificial, nada futurista, nada com aparência de estúdio falso.\nIluminação:\nLuz natural suave, realista, vindo de uma janela, com sombras delicadas no rosto, brilho natural nos olhos e alta definição nos detalhes faciais.\nRegras obrigatórias:\n* Criar uma influenciadora digital brasileira de IA\n* Usar a Imagem 1 como referência principal do rosto\n* Usar a Imagem 2 como apoio de coerência visual\n* Foto de rosto próxima da câmera\n* Estilo retrato 3x4 realista\n* Olhando diretamente para a câmera\n* Alta nitidez no rosto e nos olhos\n* Aparência natural, humana e brasileira\n* Olhos somente castanhos ou pretos\n* Proibido olhos azuis, verdes ou cinzas\n* Não adicionar texto, logo ou marca d’água\nInstruções negativas:\nNão criar rosto genérico de IA. Não criar pele plástica. Não suavizar demais a pele. Não criar aparência de boneca. Não criar estética 3D, CGI, anime, cartoon ou ilustração. Não distorcer olhos, boca, nariz, rosto ou cabelo. Não criar fundo artificial. Não usar filtros exagerados.\nResultado final:\nUma foto de rosto ultrarrealista, estilo 3x4 profissional, de uma influenciadora digital brasileira de IA, com forte semelhança ao rosto da Imagem 1, olhando para a câmera, em cenário natural e com qualidade fotográfica premium\n-----------------`
  },
  {
    id: 59,
    category: "Lifestyle",
    likes: 159,
    image: "/assets/corpo-influencer.jpg",
    promptText: `Crie uma fotografia ultrarrealista vertical 9:16 de uma influenciadora digital brasileira de IA em corpo inteiro, dos pés à cabeça, usando duas imagens de referência enviadas pelo usuário.\nA Imagem 1 é a referência principal e obrigatória do rosto da influenciadora. Analise e preserve com máxima fidelidade o rosto da Imagem 1: formato facial, identidade visual, proporções, tom de pele, textura da pele, olhos, sobrancelhas, nariz, boca, queixo, cabelo, expressão, idade aparente e aparência geral. Não altere o rosto principal. Não recrie outro rosto. Não suavize demais. Não deixe genérico.\nA Imagem 2 é a referência principal do corpo, pose e proporções físicas. Analise o tipo corporal, altura aparente, silhueta, postura, ombros, cintura, quadril, braços, pernas, mãos, pés, posição do corpo, roupa e linguagem corporal. Use a Imagem 2 como base para criar um corpo natural, proporcional e realista para a influenciadora.\nCombine a identidade facial da Imagem 1 com o corpo, pose e proporções da Imagem 2 de forma profissional, natural e fotográfica. A fusão precisa parecer uma única pessoa real, sem montagem, sem recorte visível, sem diferença artificial entre rosto, pescoço, corpo, pele, cabelo e iluminação.\nA influenciadora deve parecer em pé, olhando diretamente para a câmera, corpo inteiro visível dos pés à cabeça, sem cortar cabeça, cabelo, braços, mãos, pernas ou pés. O rosto deve continuar nítido, fiel e reconhecível, mesmo em corpo inteiro.\nCenário obrigatório:\nQuarto fechado, simples, natural e realista, com aparência brasileira. Fundo limpo e discreto, parede neutra, cama simples, cortina, guarda-roupa ou poucos elementos reais de quarto. O cenário deve ser interno e controlado. \n<truncated 52184 bytes>\n\nNOTE: The output was truncated because it was too long. Use a more targeted query or a smaller range to get the information you need.`
  }
];

export const BuilderView = () => {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultImg, setResultImg] = useState<string | null>(null);
  
  const handleCopyPrompt = (template: any) => {
    if (template.promptText) {
      navigator.clipboard.writeText(template.promptText);
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) throw new Error("API Key do Gemini não configurada.");
      
      // Injeção de bloqueio Anti-CGI e Anti-Maquiagem (Regra Absoluta do Projeto - Otimizado para Gemini/Imagen)
      const rigorosoAntiCGI = `
      
IMPORTANT: NO MAKEUP. ZERO MAKEUP. Bare face, natural lips without lipstick, no foundation, no mascara. The subject MUST have a hyper-realistic, raw human skin texture. Visibly detailed pores, natural skin imperfections, subtle freckles, uneven skin tone. ABSOLUTELY NO airbrushing, no smooth plastic skin, no CGI aesthetic, no doll-like appearance. The face must look like an unretouched, raw, natural photograph of a real human being. Cara lavada, sem maquiagem.`;
      
      const finalPrompt = selectedTemplate.promptText + rigorosoAntiCGI;
      
      const b64Generated = await generateImageWithGemini(finalPrompt, apiKey);
      setResultImg(b64Generated);
    } catch (error: any) {
      console.error(error);
      alert('Erro ao gerar influenciadora (Gemini): ' + (error.message || 'Erro desconhecido.'));
    } finally {
      setIsGenerating(false);
    }
  };

  const handleBack = () => {
    setSelectedTemplate(null);
    setResultImg(null);
    setIsGenerating(false);
  };

  // --- TELA DE GERAÇÃO (Quando um template é selecionado) ---
  if (selectedTemplate) {
    return (
      <div className="flex-1 w-full flex flex-col p-6 md:p-8 pt-16 md:pt-20 overflow-y-auto bg-transparent relative">
        <button 
          onClick={handleBack}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm font-medium text-white transition-all w-max mb-8 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para Galeria
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto w-full">
          {/* LADO ESQUERDO: REFERÊNCIA */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#7B00FF]" />
              Imagem de Referência
            </h2>
            <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden bg-white/[0.02] border border-white/10 backdrop-blur-[30px] shadow-2xl hover:border-[#00F0FF]/40 hover:shadow-[0_0_30px_rgba(0,240,255,0.2)] transition-all duration-300">
              <img 
                src={selectedTemplate.image} 
                alt="Referência" 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full border border-white/10 text-xs font-bold text-white uppercase tracking-widest">
                Referência Original
              </div>
            </div>
          </div>

          {/* LADO DIREITO: AÇÃO E RESULTADO */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <Wand2 className="w-5 h-5 text-[#00F0FF]" />
              Sua Nova Influenciadora
            </h2>

            <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden bg-white/[0.02] border border-white/10 backdrop-blur-[30px] flex flex-col items-center justify-center shadow-2xl p-6 hover:border-[#00F0FF]/40 hover:shadow-[0_0_30px_rgba(0,240,255,0.2)] transition-all duration-300">
              
              {!isGenerating && !resultImg && (
                <div className="text-center flex flex-col items-center max-w-sm">
                  <div className="w-20 h-20 rounded-full bg-[#7B00FF]/10 flex items-center justify-center mb-6">
                    <Sparkles className="w-10 h-10 text-[#7B00FF]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Pronto para Gerar</h3>
                  <p className="text-[#8d8d99] text-sm mb-8">
                    Nossa IA vai analisar o prompt vinculado a esta imagem e gerar a sua influenciadora de forma ultra-realista.
                  </p>
                  <button 
                    onClick={handleGenerate}
                    className="w-full py-4 bg-gradient-to-r from-[#FF007F] to-[#FF007F] hover:from-[#FF007F] hover:to-[#FF007F] text-white rounded-xl font-black text-lg shadow-[0_0_30px_rgba(123,0,255,0.3)] transition-all transform hover:scale-[1.02] active:scale-95"
                  >
                    ✨ Gerar Influenciadora
                  </button>
                </div>
              )}

              {isGenerating && (
                <div className="flex flex-col items-center gap-6">
                  <Loader2 className="w-12 h-12 text-[#7B00FF] animate-spin" />
                  <div className="text-center">
                    <p className="text-white font-bold text-lg mb-1">Processando Imagem...</p>
                    <p className="text-[#7B00FF] text-sm animate-pulse">Enviando prompt para a API e gerando...</p>
                  </div>
                </div>
              )}

              {resultImg && !isGenerating && (
                <div className="absolute inset-0 w-full h-full">
                  <img src={resultImg} alt="Resultado" className="w-full h-full object-cover" />
                  
                  {/* Botões Overlay no Resultado */}
                  <div className="absolute bottom-6 left-0 w-full px-6 flex items-center gap-3">
                    <button 
                      onClick={async () => {
                        const { forceDownloadImage } = await import('./lib/download');
                        forceDownloadImage(resultImg, 'influenciadora.png');
                      }}
                      className="flex-1 py-3 bg-white text-black rounded-xl font-black text-sm flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors shadow-xl"
                    >
                      <Download className="w-4 h-4" />
                      Baixar Imagem
                    </button>
                    <button 
                      onClick={handleGenerate}
                      className="px-6 py-3 bg-black/50 backdrop-blur-md border border-white/20 text-white rounded-xl font-bold text-sm hover:bg-black/70 transition-colors shadow-xl"
                    >
                      Gerar Outra
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    );
  }

  // --- GRID PRINCIPAL (Galeria) ---
  return (
    <div className="flex-1 w-full flex flex-col p-6 md:p-8 pt-16 md:pt-20 overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-light text-white mb-2 leading-tight">
            Gere <span className="font-medium bg-gradient-to-r from-[#00F0FF] to-[#FF007F] text-transparent bg-clip-text">imagens incríveis</span> com seu avatar e produto
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
                ? 'bg-[#7B00FF]/10 border border-[#7B00FF] text-white shadow-[0_0_15px_rgba(123,0,255,0.2)]'
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
                {['Builder', 'Trocas', 'Selfies', 'Lifestyle', 'Close-up'].includes(template.category) ? 'Use este card para gerar imagens baseando-se no prompt em anexo.' : `Explore e baixe este template de ${template.category.toLowerCase()}.`}
              </p>
              
              {['Builder', 'Trocas', 'Selfies', 'Lifestyle', 'Close-up'].includes(template.category) ? (
                <button 
                  onClick={() => setSelectedTemplate(template)}
                  className="mt-2 flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-[#FF007F] to-[#FF007F] hover:from-[#FF007F] hover:to-[#FF007F] backdrop-blur-md border border-white/10 rounded-xl text-white text-[11px] font-bold uppercase tracking-wider transition-colors shadow-lg group-hover:shadow-[0_0_20px_rgba(255,0,127,0.3)]"
                >
                  <Wand2 className="w-4 h-4" />
                  Inspire-se
                </button>
              ) : (
                <button
                  onClick={async (e) => {
                    e.stopPropagation();
                    const { forceDownloadImage } = await import('./lib/download');
                    forceDownloadImage(template.image, `imagem-${template.id}.jpg`);
                  }}
                  className="mt-2 flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-[#00F0FF]/80 to-[#00F0FF]/80 hover:from-[#00F0FF] hover:to-[#00F0FF] backdrop-blur-md border border-white/10 rounded-xl text-white text-[11px] font-bold uppercase tracking-wider transition-colors shadow-lg group-hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]"
                >
                  <Download className="w-4 h-4" />
                  Baixar Imagem
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

