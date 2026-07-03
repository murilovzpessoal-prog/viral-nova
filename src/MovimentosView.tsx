import React, { useState } from 'react';
import { Search, Folder, Sparkles, Flame, Heart, Copy } from 'lucide-react';

const categories = [
  "Animações", "YouTube Create", "Flow", "Grok"
];

// Placeholder images for the masonry grid
const templates = [
  {
    id: 1,
    category: "Animações",
    likes: 101,
    image: "/assets/movimento-01.jpg",
    video: "/assets/movimento-01.mp4",
    promptText: `START OF ANIMATION: The subject starts standing naturally at a comfortable distance from the camera. She calmly takes two small natural steps forward toward the camera with relaxed posture, soft feminine body sway and realistic timing. While approaching: she lightly touches or adjusts a visible clothing detail naturally and casually. The movement must feel spontaneous and realistic. No exaggerated posing. No runway behavior. No robotic timing. As she gets closer to the camera: the subject softly smiles and naturally raises one hand toward the lens. The hand slowly moves closer until it softly covers the entire camera view for a smooth transition effect. IMPORTANT: – The hand movement must feel calm and natural – No aggressive motion – No fast movement – No hard impact on the lens – Smooth realistic pacing only After covering the camera briefly: the subject naturally steps backward again to a comfortable distance with relaxed body flow. As she returns backward: one hand gradually moves to the waist naturally. At the final position: the subject slightly shifts her hip, softly lifts one leg forward in a feminine relaxed pose, keeps one hand on the waist, and gives a warm natural smile. GENERAL MOTION: Natural fluid movement. Continuous body micro-adjustments. Relaxed shoulders. Gentle hip sway. Real human timing. No stiff motion. FACIAL EXPRESSION: Soft neutral expression most of the time. Subtle natural smiles. No frozen smile. No exaggerated facial tension. BODY LANGUAGE: Natural posture. Soft feminine energy. No dancing. No exaggerated influencer posing. CAMERA: Stable casual phone-style recording. Very subtle handheld micro-movement only. No zoom. No camera shake. Chest-height framing. REALISM: Preserve original identity. Natural skin texture. Natural hair movement. Natural fabric physics. No beauty filters. No smoothing. No stylization. RESTRICTIONS: No talking. No text. No UI. No effects. No exaggerated movement. No robotic motion. FINAL RESULT: A hyper-realistic casual fashion transition video where the subject naturally walks toward the camera, softly covers the lens with one hand for a transition, then steps back into a relaxed feminine final pose.`
  },
  {
    id: 2,
    category: "Animações",
    likes: 102,
    image: "/assets/movimento-02.jpg",
    video: "/assets/movimento-02.mp4",
    promptText: `{  \"animation_style\": \"realistic_fashion_presentation\",  \"camera\": {    \"fixed\": true,    \"no_zoom\": true,    \"no_reframe\": true  },  \"motion\": {    \"type\": \"continuous\",    \"speed\": \"natural_slightly_fast\",    \"no_pause\": true,    \"no_freeze\": true  },  \"position\": {    \"stay_near_same_spot\": true,    \"small_natural_steps\": true,    \"no_large_movement\": true  },  \"sequence\": {    \"start\": \"facing_camera\",    \"action\": {      \"type\": \"natural_flow\",      \"description\": \"subject keeps moving naturally all the time\"    },    \"fabric\": {      \"type\": \"light_touch\",      \"area\": \"clothing\",      \"no_pull\": true    },    \"movement\": {      \"type\": \"small_side_shift\",      \"max_angle\": \"10_degrees\",      \"no_turn\": true,      \"no_spin\": true,      \"no_360\": true    }  },  \"body\": {    \"hip\": \"subtle_continuous\",    \"weight\": \"always_shifting\",    x\"no_static\": true  },  \"face\": {    \"expression\": \"natural\",    \"smile\": \"brief_subtle\",    \"no_constant\": true  },  \"rules\": {    \"no_rotation\": true,    \"no_360\": true,    \"no_freeze\": true,    \"no_exaggeration\": true  },  \"final\": \"natural continuous movement, no rotation, no freeze\"}`
  },
  {
    id: 3,
    category: "Animações",
    likes: 103,
    image: "/assets/movimento-03.jpg",
    video: "/assets/movimento-03.mp4",
    promptText: `Animate the influencer as a naturally happy and confident fashion model genuinely enjoying the outfit she is wearing.\nThe character must remain the EXACT same person from the original image.\nPreserve 100%:\n– face\n– body\n– hair\n– makeup\n– outfit\n– camera angle\n– lighting\n– background\n– framing\n– environment\nDO NOT modify the clothing design, colors, proportions, or fit.\nDO NOT change the original scenario or create new elements.\nANIMATION:\nThe influencer performs subtle, spontaneous, and natural movements while happily presenting the outfit.\nShe smiles naturally, showing authentic enjoyment and confidence with the clothing.\nHer movements should feel effortless and realistic, like a real influencer casually recording content for social media or a fashion brand campaign.\nInclude:\n– subtle body sway\n– relaxed posture adjustments\n– soft hand movements interacting naturally with the outfit\n– small playful movements\n– natural blinking\n– realistic breathing\n– genuine happy facial expressions\n– subtle hair movement\n– light shoulder and hip motion\nThe animation must feel:\n– spontaneous\n– elegant\n– feminine\n– confident\n– premium\n– socially natural\nAvoid exaggerated dancing, overacting, or unrealistic movements.\nAvoid dramatic posing.\nEverything should feel organic, smooth, and believable.\nMaintain realistic fabric physics and natural cloth movement during all body motion.\nUltra realistic motion, cinematic fashion commercial quality, premium influencer aesthetic, smooth natural movement, authentic happy energy, realistic human behavior.`
  },
  {
    id: 4,
    category: "Animações",
    likes: 104,
    image: "/assets/movimento-04.jpg",
    video: "/assets/movimento-04.mp4",
    promptText: `Ultra-realistic fashion showcase video focused on clothing details. The woman starts standing naturally while the camera captures a full-body view of the entire outfit. She then slowly walks toward the camera with smooth, confident, and natural movement, allowing the clothing to become increasingly visible.\nAs she approaches, the camera gradually reveals detailed views of the outfit, including the fabric texture, stitching, seams, buttons, zippers, patterns, sleeves, collar, pockets, waist fit, and overall construction. The woman occasionally makes subtle movements such as lightly touching the fabric, adjusting a sleeve, smoothing the clothing with her hand, or slightly turning her body to reveal different angles of the outfit.\nThe camera behaves like a professional fashion videographer, carefully highlighting the quality, texture, fit, and craftsmanship of the clothing. The outfit remains the primary focus throughout the video. The fabric responds naturally to movement, showing realistic folds, draping, and material behavior.\nNatural human motion, realistic anatomy, authentic facial expressions, realistic skin texture, highly detailed clothing textures, luxury fashion campaign quality, cinematic camera work, soft natural lighting, shallow depth of field, professional fashion advertisement style, ultra-photorealistic, premium social media fashion content. No robotic movement, no exaggerated gestures, no fast motion.`
  },
  {
    id: 5,
    category: "Animações",
    likes: 105,
    image: "/assets/movimento-05.jpg",
    video: "/assets/movimento-05.mp4",
    promptText: `Ultra-realistic fashion showcase video. The woman remains standing in the same position while smoothly transitioning through a series of elegant fashion poses. She begins with a relaxed stance, then gently places one hand on her waist. After a brief pause, she subtly shifts her weight onto one leg, creating a natural and flattering silhouette. She then softly runs her hand through her hair, turns slightly to reveal her side profile, glances over her shoulder, and finally faces the camera with a confident, natural expression.\nEach pose transition is slow, fluid, and realistic, with no abrupt movements or unnatural body positions. The sequence should feel like a professional fashion photoshoot coming to life. Every pose is designed to highlight different angles of the outfit, including the front, side, and silhouette of the clothing.\nThe fabric responds naturally to every movement, showing realistic folds, draping, texture, and motion. Hair movement follows realistic physics. Maintain natural human anatomy, authentic facial expressions, and subtle body language. No robotic behavior, no exaggerated model poses, and no sudden gestures.\nThe camera remains steady in a full-body shot throughout the entire sequence, ensuring the complete outfit stays visible at all times. Professional fashion campaign quality, realistic skin texture, authentic facial details, soft natural lighting, cinematic depth of field, ultra-detailed clothing textures, luxury lifestyle aesthetic, highly photorealistic, premium social media fashion content, smooth and elegant movement.`
  },
  {
    id: 6,
    category: "Animações",
    likes: 106,
    image: "/assets/movimento-06.jpg",
    video: "/assets/movimento-06.mp4",
    promptText: `Ultra-realistic fashion showcase video. The woman stands confidently in a relaxed and natural pose while the camera begins at a distance, capturing her full body and entire outfit. A slow, smooth cinematic push-in gradually brings the camera closer, creating an elegant and premium fashion campaign effect.\nAs the camera moves forward, she performs subtle and realistic pose adjustments. She gently shifts her weight from one leg to the other, lightly places a hand on her waist, softly adjusts her hair, and makes small natural changes in posture. Every movement is refined, effortless, and realistic, designed to showcase the outfit without distracting from it.\nThe outfit remains the center of attention throughout the sequence. The fabric reacts naturally to movement, displaying realistic folds, texture, draping, and weight. Hair movement follows realistic physics. Maintain authentic facial expressions, realistic anatomy, and smooth human motion. No robotic behavior, no exaggerated gestures, and no sudden movements.\nThe camera movement is extremely smooth and professional, maintaining focus on the outfit while preserving a luxurious fashion-shoot aesthetic. Full-body framing at the beginning, gradually transitioning to a slightly closer view while keeping most of the outfit visible. Soft natural lighting, realistic skin texture, cinematic depth of field, ultra-detailed clothing textures, luxury lifestyle aesthetic, highly photorealistic, premium social media fashion content, fashion advertisement quality, natural motion blur, realistic camera operation.`
  },
  {
    id: 7,
    category: "Animações",
    likes: 107,
    image: "/assets/movimento-07.jpg",
    video: "/assets/movimento-07.mp4",
    promptText: `Ultra-realistic vertical smartphone selfie video recorded indoors in a bedroom or bathroom environment with indoor home lighting and a visible realistic shadow on the wall behind the person.\nThe camera is static, front camera perspective, vertical 9:16, medium close-up framing (head to waist), like a real Instagram Story or TikTok selfie video.\nThe camera does not move at any moment. Only the person moves.\nThe person starts standing a few steps away from the camera, looking at the camera with a natural and charismatic expression.\nThe person makes small natural movements such as blinking, breathing, and subtle posture adjustments.\nThen the person slowly walks towards the camera with natural steps.\nHair and clothing move naturally according to body movement.\nWhen the person gets closer to the camera, the person gently pulls one clothing strap slightly to the side using one hand.\nThe movement must be subtle and natural, showing the elasticity and movement of the fabric.\nThe fabric stretches slightly and then naturally returns to the body when released.\nAfter releasing the strap, the person smiles naturally and shifts body weight to one side and places one hand on the waist, making a confident and natural pose like a social media outfit video.\nThe person slightly tilts the head and holds the pose for a moment.\nThen the person relaxes the pose and naturally walks back to the original position, returning to the starting spot.\nThe lighting remains constant and realistic, and the shadow on the wall behind moves naturally according to the body movement.\nAll movements must be smooth, natural, casual, and realistic.\nThe movement must not look robotic, exaggerated, or artificial.\nSmartphone video look, Instagram Story style, TikTok selfie video style, natural indoor lighting, realistic shadows, realistic skin texture, realistic fabric texture, realistic fabric physics, photorealistic video, no cinematic effects, no filters, no studio lighting, must look like a real influencer selfie video recorded at home.`
  },
  {
    id: 8,
    category: "Animações",
    likes: 108,
    image: "/assets/movimento-08.jpg",
    video: "/assets/movimento-08.mp4",
    promptText: `{\"version\": \"3.1\",\"aspectRatio\": \"9:16\",\"durationSeconds\": 8,\"seed\": 12345,\"subjectRef\": \"usar a imagem enviada como âncora de identidade, mantendo exatamente as mesmas feições, tom de pele\"referenceStyle\": \"realismo cinematográfico natural, apresentação de moda com movimento corporal suave\",\"negativePrompt\": \"sem falas, sem áudio vocal, sem movimento labial, sem texto na tela, sem logos, sem marcas d’ág\"safety\": {\"allowMinorViolence\": false,\"allowNudity\": false},\"shots\": [{\"scene\": \"ambiente interno residencial com moldura de madeira e iluminação quente natural\",\"action\": \"ela permanece no mesmo lugar e inicia uma rotação corporal lenta e natural. Primeiro vira levemente\"camera\": \"fixa; 50mm; 24fps; sem movimento de câmera; foco contínuo; profundidade de campo leve\",\"lighting\": \"luz quente lateral suave com preenchimento frontal; iluminação constante sem variação\",\"environment\": \"fundo levemente desfocado; movimento natural do cabelo acompanhando o giro; sem distorções; se}],\"motionControl\": {\"rotation_speed\": \"slow\",\"rotation_style\": \"segmented_smooth_turn\",\"no_fast_spin\": true,\"no_instant_360\": true},\"rules\": {\"stay_in_same_position\": true,\"no_forward_movement\": true,\"no_backward_movement\": true,\"no_fast_rotation\": true,\"must_be_slow_turn\": true,\"preserve_identity\": true`
  },
  {
    id: 9,
    category: "Animações",
    likes: 109,
    image: "/assets/movimento-09.jpg",
    video: "/assets/movimento-09.mp4",
    promptText: `{\n\"version\": \"3.1\",\n\"aspectRatio\": \"9:16\",\n\"durationSeconds\": 8,\n\"seed\": 12345,\n\"subjectRef\": \"usar a imagem enviada como âncora de identidade, mantendo exatamente as mesmas feições, tom de pele\n\"referenceStyle\": \"realismo cinematográfico natural, apresentação de moda com movimento corporal suave\",\n\"negativePrompt\": \"sem falas, sem áudio vocal, sem movimento labial, sem texto na tela, sem logos, sem marcas d’ág\n\"safety\": {\n\"allowMinorViolence\": false,\n\"allowNudity\": false\n},\n\"shots\": [\n{\n\"scene\": \"ambiente interno residencial com moldura de madeira e iluminação quente natural\",\n\"action\": \"ela permanece no mesmo lugar e inicia uma rotação corporal lenta e natural. Primeiro vira levemente\n\"camera\": \"fixa; 50mm; 24fps; sem movimento de câmera; foco contínuo; profundidade de campo leve\",\n\"lighting\": \"luz quente lateral suave com preenchimento frontal; iluminação constante sem variação\",\n\"environment\": \"fundo levemente desfocado; movimento natural do cabelo acompanhando o giro; sem distorções; se\n}\n],\n\"motionControl\": {\n\"rotation_speed\": \"slow\",\n\"rotation_style\": \"segmented_smooth_turn\",\n\"no_fast_spin\": true,\n\"no_instant_360\": true\n},\n\"rules\": {\n\"stay_in_same_position\": true,\n\"no_forward_movement\": true,\n\"no_backward_movement\": true,\n\"no_fast_rotation\": true,\n\"must_be_slow_turn\": true,\n\"preserve_identity\": true`
  },
  {
    id: 10,
    category: "Animações",
    likes: 110,
    image: "/assets/movimento-10.jpg",
    video: "/assets/movimento-10.mp4",
    promptText: `{\n\"animation_style\": \"realistic_fashion_presentation\",\n\"camera\": {\n\"fixed\": true,\n\"no_zoom\": true,\n\"no_reframe\": true\n},\n\"motion\": {\n\"type\": \"continuous_natural_flow\",\n\"speed\": \"natural_slightly_fast\",\n\"no_pause\": true,\n\"no_freeze\": true,\n\"avoid_robotic_timing\": true,\n\"keep_body_alive\": true\n},\n\"position\": {\n\"stay_near_same_spot\": true,\n\"small_natural_steps\": true,\n\"short_forward_shift\": true,\n\"short_side_shift\": true,\n\"no_large_movement\": true\n},\n\"sequence\": {\n\"start\": \"facing_camera\",\n\"action_1\": {\n\"type\": \"active_natural_body_flow\",\n\"description\": \"subject moves naturally all the time with visible but controlled body movement, not slow, not stiff\"\n},\n\"action_2\": {\n\"type\": \"hand_to_waist\",\n\"style\": \"relaxed\",\n\"hand\": \"one_hand_on_hip\",\n\"details\": \"hand naturally goes to waist without posing too hard\"\n},\n\"action_3\": {\n\"type\": \"small_side_shift\",\n\"intensity\": \"medium_light\",\n\"details\": \"noticeable natural shift to one side without turning the body\"\n},\n\"action_4\": {\n\"type\": \"small_forward_shift\",\n\"intensity\": \"medium_light\",\n\"details\": \"small natural movement slightly forward, visible but not exaggerated\"\n},\n\"action_5\": {\n\"type\": \"hip_weight_shift\",\n\"style\": \"natural_active\",\n\"details\": \"natural hip and weight shift with more energy, not dancing, no repeated rhythm\"\n},\n\"action_6\": {\n\"type\": \"single_shoulder_lift\",\n\"style\": \"soft_natural_active\",\n\"details\": \"one shoulder lifts and relaxes naturally with slightly more energy\"\n},\n\"fabric\": {\n\"type\": \"light_touch\",\n\"area\": \"clothing\",\n\"no_pull\": true\n},\n\"movement\": {\n\"type\": \"continuous_natural_adjustments\",\n\"max_angle\": \"10_degrees\",\n\"no_turn\": true,\n\"no_spin\": true,\n\"no_360\": true\n}\n},\n\"body\": {\n\"hip\": \"active_subtle_continuous\",\n\"weight\": \"always_shifting_naturally\",\n\"posture\": \"relaxed_confident\",\n\"no_static\": true,\n\"no_dance\": true,\n\"no_stiff_pose\": true\n},\n\"face\": {\n\"expression\": \"natural\",\n\"smile\": \"brief_subtle\",\n\"no_constant\": true\n},\n\"rules\": {\n\"no_rotation\": true,\n\"no_360\": true,\n\"no_spin\": true,\n\"no_freeze\": true,\n\"no_exaggeration\": true,\n\"no_robotic_motion\": true,\n\"no_slow_motion\": true\n},\n\"final\": \"active natural movement, slightly faster body flow, visible small side and forward shifts, subtle hip and shoulder motion, no rotation, no dance, no freeze\"\n}`
  },
  {
    id: 11,
    category: "Animações",
    likes: 111,
    image: "/assets/movimento-11.jpg",
    video: "/assets/movimento-11.mp4",
    promptText: `Animate the subject as a REAL person presenting clothing in a POV-style video.\n⸻\n🔥 START OF ANIMATION (HOOK + HAIR + CTA FLOW):\n– The subject starts at a natural distance from the camera\n– She calmly takes two small natural steps forward toward the camera\n– While approaching, she gently touches and lightly holds a small fabric detail on the outfit\n– The gesture is delicate, subtle and realistic, like naturally showing the clothing quality\n– No emphasis\n– No exaggerated posing\n– No dramatic movement\n– After briefly touching the fabric:\n• She naturally releases it\n• Keeps her body moving subtly and continuously\n• Small natural torso adjustments\n• Gentle hip movement\n• Relaxed confident posture\n⸻\n💫 NATURAL HAIR MOVEMENT:\n– While her body continues moving naturally:\n• She raises one hand toward the hair\n• Runs her fingers softly through the hair\n• Light natural hair toss\n• Movement lasts around one second\n• Hair movement and body movement happen together continuously\n• No freezing between actions\n• No robotic timing\n• No exaggerated influencer behavior\n– After touching the hair:\n• Her hand naturally lowers again\n• She maintains subtle relaxed body movement\n⸻\n🔥 FINAL CTA ACTION:\n– At the end of the video:\n• The subject naturally walks slightly closer toward the camera\n• She gives a warm genuine smile\n• Slight natural head tilt to one side\n• She casually raises one hand\n• Makes a brief downward pointing gesture with the index finger\n• Gesture feels spontaneous and human\n• No frozen pose\n• No aggressive CTA movement\n– The smile appears strongest ONLY during the pointing moment\n– Natural cheek movement\n– Soft confident eye contact\n– After pointing:\n• The smile relaxes naturally\n⸻\nGENERAL MOTION STYLE:\n– Natural\n– Fluid\n– Relaxed\n– Real human timing\n– Slightly active body motion\n– No static posing\n– No robotic movement\n– No exaggerated dancing\n⸻\nBODY MOVEMENTS:\n– One hand naturally near the waist during idle moments\n– Gentle subtle hip sway\n– Natural posture\n– Relaxed shoulders\n– Slight weight shifting between legs\n– Small natural torso rotations to show fabric movement\n⸻\nFACIAL EXPRESSIONS:\n– Expressions change naturally during the video\n– Neutral expression during most moments\n– Brief soft smiles appearing naturally\n– No constant grin\n– No frozen smile\n– No exaggerated facial tension\n⸻\nCAMERA & POV:\n– POV smartphone perspective\n– Subtle handheld micro movement\n– Stable framing\n– No zoom\n– No sudden camera shake\n– Camera remains at chest/face height\n⸻\nREALISM RULES:\n– Preserve original facial identity\n– Preserve natural skin texture\n– Natural hair physics\n– Natural fabric physics\n– Realistic lighting and shadows\n– No beauty filters\n– No smoothing\n– No CGI look\n– No stylization\n⸻\nRESTRICTIONS:\n– No talking\n– No text\n– No UI\n– No effects\n– No exaggerated posing\n– No dance choreography\n– No influencer clichés\n⸻\nFINAL RESULT:\nA hyper-realistic POV fashion video where the subject naturally presents the outfit, softly touches the fabric, casually moves the hair while continuously moving her body, and finishes with a warm smile while pointing downward naturally — fully human, subtle and indistinguishable from a real TikTok recording.`
  },
  {
    id: 12,
    category: "Animações",
    likes: 112,
    image: "/assets/movimento-12.jpg",
    video: "/assets/movimento-12.mp4",
    promptText: `A realistic female influencer stands indoors holding a small shipping package with both hands. The entire video is completely silent. She never speaks, never opens her mouth to talk, and makes no narration. Natural neutral facial expression throughout the scene.\nThe video starts with the package very close to the camera lens. She slowly moves it away from the camera, revealing herself while keeping the package as the main focus. She carefully rotates the package, showing the front, back, sides, corners, shipping label and texture. She brings the package close to the lens multiple times to display details.\nAfter presenting the package, she begins a slow and realistic unboxing process. Natural hand movements, realistic finger interaction, authentic body language, subtle posture adjustments, relaxed breathing motion. No exaggerated reactions. No pointing at the camera. No speaking. No lip movement. No presentation gestures.\nHandheld smartphone camera aesthetic, slight camera shake, realistic autofocus adjustments, subtle motion blur, compression artifacts, light camera grain, natural lighting, soft shadows, visible skin texture, pores, loose hair strands, realistic imperfections, organic colors, documentary-style realism.\nUser-generated content (UGC), casual creator footage, authentic social media unboxing, cinematic realism, vertical 9:16 format, realistic depth of field, highly detailed, natural movement, no AI artifacts, no robotic behavior, no hyper-perfect rendering.\nThe package remains visible and receives continuous attention during the entire sequence. Focus on authentic silent unboxing behavior.`
  },
  {
    id: 13,
    category: "Animações",
    likes: 113,
    image: "/assets/movimento-13.jpg",
    video: "/assets/movimento-13.mp4",
    promptText: `A realistic female influencer stands indoors holding a sealed plastic shipping mailer package (polymailer) with both hands. The package looks like a typical TikTok Shop, Shopee, Temu or online shopping delivery bag. The entire video is completely silent. No speaking, no narration, no lip movement.\nThe video begins with the plastic package very close to the camera lens. She slowly pulls it back, revealing herself while keeping the package as the main focus. She naturally squeezes the package to show its texture, rotates it slowly, displays the front, back, shipping label, corners and details.\nShe carefully tears open the plastic packaging using her hands, creating realistic movements and natural anticipation. She gradually removes the product from inside the mailer while keeping it visible to the camera. The product reveal feels authentic and unforced.\nNatural hand movements, realistic finger interaction, subtle breathing motion, relaxed posture, neutral facial expression, organic body language. Handheld smartphone camera aesthetic, slight camera shake, realistic autofocus shifts, light motion blur, compression artifacts, visible skin texture, pores, loose hair strands, natural lighting, soft shadows, documentary-style realism.\nUGC content, social media creator footage, casual home environment, authentic online shopping unboxing, vertical 9:16 format, realistic depth of field, cinematic realism, highly detailed, no AI artifacts, no robotic motion, no exaggerated reactions, no hyper-perfect rendering.\nFocus on the package opening process, the texture of the plastic mailer, and the realistic product reveal. Silent unboxing only.`
  },
  {
    id: 14,
    category: "Animações",
    likes: 114,
    image: "/assets/movimento-14.jpg",
    video: "/assets/movimento-14.mp4",
    promptText: `Animate the subject as a REAL person presenting clothing in a POV-style video.\n⸻\n🔥 START OF ANIMATION (UPDATED FOR THIS OUTFIT):\n– The subject starts very close to the camera\n– She makes a small, natural adjustment to the outfit:\n• A subtle touch near the waistline or skirt area\n• OR a light adjustment on the side of the top\n– The gesture is casual and realistic, like preparing before recording\n– No chest pulling\n– No emphasis\n– No posing\n– After this quick adjustment, she naturally steps back into a comfortable position\n– Smooth transition into the rest of the animation\n⸻\nGENERAL MOTION STYLE:\n– Natural, confident, fluid movements\n– Not static\n– Not exaggerated\n– Not robotic\n– Real human timing\n⸻\nBODY MOVEMENTS:\n– One hand naturally rests on the waist\n– Gentle hip movement (side-to-side, very subtle)\n– One foot slightly forward, highlighting the skirt slit\n– The other foot relaxed behind\n– Natural posture, relaxed shoulders\n⸻\nCLOTHING PRESENTATION (TOP + SKIRT):\n– Small, natural movements to highlight the outfit\n– Subtle leg positioning to show the skirt slit naturally\n– Slight torso rotation to show fit and fabric\n– No aggressive posing\n– No runway-style movement\n– Movements feel spontaneous and casual\n⸻\nFACIAL EXPRESSION (VERY IMPORTANT – CTA TIMING):\n– The subject does NOT smile continuously\n– Facial expression changes naturally throughout the video\n– During most of the presentation:\n• Neutral, relaxed expression\n• Lips softly closed\n• Calm, confident face\n• Natural eye contact\n• No smile held for long periods\n– Occasionally:\n• A very brief, subtle smile appears\n• Smile is soft and quickly fades\n• No exaggerated cheek movement\n• No frozen smile\n⸻\nFINAL NATURAL ACTION (END OF VIDEO):\n– At the very end of the video\n– The subject walks normally toward the camera\n– Movement feels casual, like approaching to stop recording\n– No rush\n– No posing\n– As she gets close to the camera:\n• She casually raises one hand\n• Makes a simple, brief downward pointing gesture with the index finger\n• The gesture is relaxed and natural\n• No holding the pose\n– EXACT SMILE TIMING:\n• The smile opens ONLY at this moment\n• A warm, genuine smile appears\n• She slightly turns her face to one side while smiling\n• Natural cheek movement\n• Smile feels spontaneous and human\n• After the gesture, the smile naturally relaxes\n⸻\nPERSONALITY:\n– Sympathetic\n– Approachable\n– Comfortable\n– Feels like a real person casually recording a video at home\n⸻\nCAMERA & POV:\n– POV perspective, as if the phone is held or placed naturally\n– Very subtle handheld micro-movements\n– No camera shake\n– No zoom\n– Camera remains at chest/face height\n⸻\nTIMING:\n– Movements are continuous\n– No freezing\n– No looping poses\n– Smooth transitions between gestures\n⸻\nREALISM RULES:\n– Preserve original facial identity\n– Preserve skin texture\n– Preserve hair movement (slight natural motion)\n– Natural fabric physics for both top and skirt\n– No beauty filters\n– No smoothing\n– No stylization\n⸻\nRESTRICTIONS:\n– No talking\n– No text\n– No UI\n– No effects\n– No exaggerated dance\n– No influencer posing clichés\n⸻\nFINAL RESULT:\nA hyper-realistic POV fashion video with natural facial expression changes, neutral moments throughout, and a genuine smile appearing only at the final moment while approaching the camera and pointing downward — subtle, human and indistinguishable from a real TikTok recording.`
  },
  {
    id: 15,
    category: "Animações",
    likes: 115,
    image: "/assets/movimento-15.jpg",
    video: "/assets/movimento-15.mp4",
    promptText: `{  \"version\": \"3.1\",  \"aspectRatio\": \"9:16\",  \"durationSeconds\": 8,  \"seed\": 12345,  \"subjectRef\": \"usar a imagem enviada como âncora de identidade, mantendo exatamente as mesmas feições, tom de pele, cor de cabelo, mesma cor, mesma textura, mesmo volume e mesmo comprimento durante TODO o vídeo, sem qualquer alteração em nenhum momento\",  \"referenceStyle\": \"realismo cinematográfico natural, interação direta com a câmera estilo gravação em celular\",  \"negativePrompt\": \"sem falas, sem áudio vocal, sem movimento labial articulando palavras, sem legendas, sem texto na tela, sem logos, sem marcas d’água, sem deformações corporais, sem dedos extras, sem distorção de mãos, sem artefatos de IA, sem mudança de cor do cabelo, sem mudança de textura do cabelo, sem mudança de estilo do cabelo, sem alteração de iluminação que modifique a cor do cabelo\",  \"safety\": {     \"allowMinorViolence\": false,     \"allowNudity\": false   },  \"shots\": [    {      \"scene\": \"ambiente interno residencial com moldura de madeira e iluminação quente natural\",      \"action\": \"ela dá um passo natural para frente, inclina o tronco entre 30 e 40 graus em direção à câmera, mantém contato visual constante com um sorriso cativante e vendedor durante toda a cena. Sem falar absolutamente nada e sem articular palavras com os lábios. Ela levanta a mão direita e posiciona o dedo indicador claramente apontado para baixo (direção inferior da tela, não para a lente). O gesto é intencional e expressivo, realizando um leve movimento repetido de cima para baixo com o dedo indicador, como uma chamada visual para ação. O sorriso permanece natural, envolvente e confiante do início ao fim. O cabelo permanece visualmente idêntico durante toda a ação, sem qualquer alteração de cor, brilho, forma ou volume.\",      \"camera\": \"dolly-in sutil acompanhando o passo; 50mm; 24fps; 1/120; foco contínuo no rosto; profundidade de campo rasa mantendo o fundo levemente desfocado\",      \"lighting\": \"luz quente lateral suave com leve preenchimento frontal; iluminação estável e constante, sem variação de temperatura de cor ao longo do vídeo\",      \"environment\": \"fundo levemente desfocado; movimento natural dos cabelos ao inclinar; leve sensação de profundidade realista sem distorção de mãos; manter consistência total de aparência do cabelo do início ao fim\"    }  ]}`
  },
  {
    id: 16,
    category: "Animações",
    likes: 116,
    image: "/assets/movimento-16.jpg",
    video: "/assets/movimento-16.mp4",
    promptText: `{\n\"version\": \"3.1\",\n\"aspectRatio\": \"9:16\",\n\"durationSeconds\": 8,\n\"seed\": 12345,\n\"subjectRef\": \"usar a imagem enviada como âncora de identidade, mantendo exatamente as mesmas feições, tom de pele, cor de cabelo, mesma textura, mesmo volume e mesmo comprimento durante TODO o vídeo, sem qualquer alteração em nenhum momento\",\n\"referenceStyle\": \"realismo cinematográfico natural, interação direta com a câmera estilo gravação em celular\",\n\"negativePrompt\": \"sem falas, sem áudio vocal, sem movimento labial articulando palavras, sem legendas, sem texto na tela, sem logos, sem marcas d’água, sem deformações corporais, sem dedos extras, sem distorção de mãos, sem artefatos de IA, sem mudança de cor do cabelo, sem mudança de textura do cabelo, sem mudança de estilo do cabelo, sem alteração de iluminação que modifique a cor do cabelo, sem movimentos exagerados, sem câmera lenta, sem sorriso travado, sem movimentos robóticos\",\n\"safety\": {\n\"allowMinorViolence\": false,\n\"allowNudity\": false\n},\n\"shots\": [\n\"scene\": \"ambiente interno residencial com moldura de madeira e iluminação quente natural\",\n\"action\": \"ela dá um passo natural para frente e inclina levemente o tronco entre 30 e 40 graus em direção à câmera. Mantém contato visual constante com um sorriso suave, simpático e vendedor. Sem falar absolutamente nada e sem articular palavras com os lábios. Logo após se inclinar, ela leva uma mão naturalmente até a boca e faz um gesto delicado de mandar um beijo para a câmera, soltando a mão suavemente para frente de forma feminina e natural. O gesto do beijo é rápido, elegante e casual, sem exagero e sem teatralidade. Após o beijo, ela naturalmente abaixa a mão e aponta claramente o dedo indicador para baixo, direção inferior da tela, realizando um pequeno movimento visual de chamada para ação. O sorriso permanece natural e envolvente durante toda a cena. O cabelo permanece visualmente idêntico durante toda a ação, sem qualquer alteração de cor, brilho, forma ou volume.\",\n\"camera\": \"dolly-in sutil acompanhando o passo; 50mm; 24fps; 1/120; foco contínuo no rosto; profundidade de campo rasa mantendo o fundo levemente desfocado\",\n\"lighting\": \"luz quente lateral suave com leve preenchimento frontal; iluminação estável e constante, sem variação de temperatura de cor ao longo do vídeo\",\n\"environment\": \"fundo levemente desfocado; movimento natural dos cabelos ao inclinar; leve sensação de profundidade realista; mãos anatomicamente corretas; sem distorção dos dedos; manter consistência total da aparência do cabelo do início ao fim\"\n}\n]\n}`
  },
  {
    id: 17,
    category: "Animações",
    likes: 117,
    image: "/assets/movimento-17.jpg",
    video: "/assets/movimento-17.mp4",
    promptText: `Animate the subject as a REAL person presenting clothing in a POV-style video.\n⸻\n🔥 START OF ANIMATION (UPDATED):\n– The subject starts at a natural distance from the camera\n– She calmly takes two small, natural steps forward toward the camera\n– While approaching, she gently touches and lightly holds the bow/lace detail on the chest area\n– The gesture is delicate, subtle and realistic, like naturally showing a clothing detail\n– No emphasis, no posing, no exaggeration\n– The movement feels spontaneous and casual\n– After briefly touching the bow, she naturally releases it\n– She takes a small step back to her original position\n– Smooth transition into the rest of the animation\n⸻\nGENERAL MOTION STYLE:\n– Natural, confident, fluid movements\n– Not static\n– Not exaggerated\n– Not robotic\n– Real human timing\n⸻\nBODY MOVEMENTS:\n– One hand naturally rests on the waist\n– Gentle hip movement (side-to-side, very subtle)\n– One foot forward, the other relaxed behind\n– Natural posture, relaxed shoulders\n⸻\nCLOTHING PRESENTATION:\n– Small, natural movements to highlight the outfit\n– Slight torso rotation to show fit and fabric\n– No aggressive posing\n– No fashion runway exaggeration\n– Movements feel spontaneous and casual\n⸻\nADDITIONAL NATURAL GESTURE (VERY SUBTLE):\n– After the main body movement sequence:\n• The subject briefly raises one hand\n• Lightly brushes her hair backward near the side of the head\n• The gesture lasts approximately one second\n• The motion is casual and unintentional, like a natural self-adjustment\n• No emphasis, no posing\n• The hand immediately returns to a relaxed neutral position\n⸻\nFACIAL EXPRESSION (VERY IMPORTANT – REAL HUMAN TIMING):\n– The subject does NOT smile continuously\n– Facial expression alternates naturally throughout the video\n– While approaching the camera:\n• Neutral, relaxed expression\n• Lips softly closed\n• Calm, confident look\n– During the bow/lace touch:\n• A brief, subtle smile appears\n• Smile is soft and natural, not exaggerated\n• Slight cheek movement only\n– After releasing the bow:\n• Expression returns to neutral\n• Relaxed face, natural breathing\n– Later in the animation:\n• She gently turns her head slightly to one side\n• A short, warm smile appears again\n• Smile lasts briefly, then fades naturally\n– Smile behavior:\n• Appears and disappears naturally\n• No frozen smile\n• No constant grin\n• No exaggerated facial tension\n⸻\nPERSONALITY:\n– Sympathetic\n– Approachable\n– Comfortable\n– Feels like a real person casually recording a video\n⸻\nCAMERA & POV:\n– POV perspective, as if the phone is held by a person\n– Very subtle handheld micro-movements\n– No camera shake\n– No zoom\n– Camera remains at chest/face height\n⸻\nTIMING:\n– Movements are continuous\n– No freezing\n– No looping poses\n– Smooth transitions between gestures\n⸻\nREALISM RULES:\n– Preserve original facial identity\n– Preserve skin texture\n– Preserve hair movement (slight natural motion)\n– Natural fabric physics\n– No beauty filters\n– No smoothing\n– No stylization\nx⸻\nRESTRICTIONS:\n– No talking\n– No text\nxa– No UI\n– No effects\n– No exaggerated dance\n– No influencer posing clichés\n⸻\nxFINAL RESULT:\nA hyper-realistic POV fashion video where the subject feels alive and human, with natural facial expression changes, occasional soft smiles, neutral moments in between, and subtle head turns — indistinguishable from a real casual phone recording.`
  },
  {
    id: 18,
    category: "Animações",
    likes: 118,
    image: "/assets/movimento-18.jpg",
    video: "/assets/movimento-18.mp4",
    promptText: `Animate the subject as a REAL person presenting clothing in a POV-style video.The subject remains in the same position and starts moving immediately.From the beginning, she moves her hair and body at the SAME TIME.She brings one hand into her hair and runs her fingers  through it quickly and naturally, then lightly tosses it.While touching her hair, her body is continuously moving:she shifts her weight between legs,moves her hips slightly side to side,keeps a natural rhythm in her torso,and makes small natural posture adjustments.Her body MUST NOT stop while touching the hair.Hair movement and body movement happen together as one continuous action.The motion should feel alive, fluid and human, never paused, never separated, never robotic.Her expression starts neutral, then a soft natural smile appears briefly during the movement and fades.After finishing the hair movement, she continues with subtle natural body motion without freezing.Movement speed is natural and slightly quick, not slow motion and not exaggerated.Camera remains stable, no zoom, no major movement.åPreserve identity, natural hair physics, natural fabric behavior, no stylization.Final result should feel like a real person casually moving her hair while naturally shifting her body, fully synchronized and lifelike`
  },
  {
    id: 19,
    category: "Animações",
    likes: 119,
    image: "/assets/movimento-19.jpg",
    video: "/assets/movimento-19.mp4",
    promptText: `Animate the subject as a REAL person in a soft ultra-realistic diagonal back-view fashion video.⸻MAIN ACTION (BOTH HANDS TYING HAIR):– The subject uses BOTH hands together during the entire motion– She naturally raises both hands toward the back of the head– Both hands gather the hair softly near the upper back/head area– The motion should feel like she is casually pretending to tie her hair into a ponytail– Natural feminine gesture only– Soft realistic movement– No exaggerated styling motion⸻HAIR TYING MOTION DETAILS:– Hair starts naturally loose– Both hands slide upward through the hair together– Fingers naturally collect the hair backward– Elbows lift softly and naturally– The subject gently holds the gathered hair briefly behind the head– She lightly twists or adjusts the hair as if preparing to tie it– The motion is subtle and relaxed– The hair should NOT become perfectly tied– It should feel like a casual “fixing the hair” moment– After briefly holding the hair, she softly relaxes the hands slightly⸻REALISTIC HAIR PHYSICS (CRITICAL):– Hair movement must come ONLY from both-hand contact and natural head motion– Hair must have realistic weight and gravity– No floating hair– No wind effect– No exaggerated bounce– No zero-gravity movement– Hair tension must feel realistic while being gathered– Loose strands remain natural around the neck and shoulders– Hair should naturally loosen slightly after the motion⸻IMPORTANT ANTI-BUG RULES:– Keep the subject ALWAYS in the same diagonal back-facing angle– Do NOT allow the subject to look at the camera– Do NOT rotate body toward camera– No front-facing frames– No sudden head turns– No camera shake– No zoom– No reframing– Camera remains completely fixed– Prevent hand and finger deformation– Prevent hair clipping through arms/body– Prevent arms from bending unnaturally⸻BODY MOVEMENT STYLE:– Minimal torso movement– Slight natural shoulder lift while gathering the hair– Very subtle hip balance shift– Calm feminine movement– No exaggerated posing– No dance movement– Maintain the same diagonal body angle tikthroughout the clip⸻HAND & ARM MOVEMENT:– Both arms move softly and naturally together– Elbows remain relaxed and feminine– Fingers softly compress and hold the hair realistically– No robotic synchronized motion– No stiff elbows– Natural real-time movement only⸻CAMERA:– Fixed tripod camera– No camera movement– No zoom– No perspective changes– Maintain exact original framing and crop⸻REALISM RULES:– Ultra realistic real-time motion– Natural arm weight and physics– Realistic shoulder mechanics– Realistic fabric response– Preserve skin texture– Preserve identity– Preserve realistic indoor lighting– No beauty filter– No CGI look– No smoothing– No stylization⸻TIMING:– Soft continuous pacing– Slightly slowed realistic motion– No sudden acceleration– No freezing– No looping– Smooth transitions between gestures⸻RESTRICTIONS:– No talking– No text– No UI– No effects– No influencer posing clichés– No direct eye contact– No front-facing pose– No aggressive motion– No floating hair physics⸻FINAL RESULT:A hyper-realistic diagonal back-view fashion animation where the subject softly raises BOTH hands, naturally gathers the hair behind the head as if casually tying a ponytail, briefly adjusts the hair with realistic feminine movement, and maintains stable framing, realistic weighted hair physics, and calm natural body motion throughout the entire clip.`
  },
  {
    id: 20,
    category: "Animações",
    likes: 120,
    image: "/assets/movimento-20.jpg",
    video: "/assets/movimento-20.mp4",
    promptText: `Animate the subject as a REAL person in a soft ultra-realistic diagonal back-view fashion video.⸻CRITICAL HAIR ACTION (BOTH HANDS REQUIRED):– The subject MUST use BOTH hands together during the hair motion– Both hands rise naturally from the waist area toward the hair at the same time– Hands move symmetrically and softly– Fingers gently pass through both sides of the hair simultaneously– The motion should feel like naturally fixing or adjusting the hair with both hands– NOT a single-hand hair grab– NOT a dramatic hair flip⸻HAIR MOVEMENT DIRECTION (VERY IMPORTANT):– The subject starts with the hair partially positioned forward over one shoulder– As BOTH hands pass through the hair, they softly guide the hair upward and across– The hair travels briefly across the upper back area– Then the hair naturally falls toward the FRONT over the opposite shoulder– The back clothing print/design must remain mostly visible– Hair should NOT fully cover the back⸻REALISTIC HAIR PHYSICS (CRITICAL):– Hair movement must come ONLY from both-hand contact and slight natural head movement– Hair must have realistic weight and gravity– No floating hair– No wind effect– No exaggerated bounce– No zero-gravity movement– Hair settles naturally over the front shoulder after the motion– Hair movement stays controlled and soft⸻HAND & ARM MOVEMENT:– Both elbows remain relaxed and feminine– Arms move smoothly and naturally– No stiff arm motion– No robotic synchronization– Fingers softly comb through the hair realistically– Hands briefly meet near the upper scalp/hair area before guiding the hair across⸻IMPORTANT ANTI-BUG RULES:– Keep the subject ALWAYS in the same diagonal back-facing angle– Do NOT allow the subject to look at the camera– Do NOT rotate body toward camera– No front-facing frames– No sudden head turns– No camera shake– No zoom– No reframing– Camera remains completely fixed– Prevent hand and finger deformation– Prevent hair clipping through arms/body⸻BODY MOVEMENT STYLE:– Minimal torso movement– Slight natural shoulder motion only– Very subtle hip balance shift– Calm feminine movement– No exaggerated posing– No dance movement– Maintain the same diagonal body angle throughout the entire clip⸻CAMERA:– Fixed tripod camera– No camera movement– No zoom– No perspective changes– Maintain exact original framing and crop⸻REALISM RULES:– Ultra realistic real-time motion– Natural arm weight and physics– Realistic shoulder mechanics– Realistic fabric response– Preserve skin texture– Preserve identity– Preserve realistic indoor lighting– No beauty filter– No CGI look– No smoothing– No stylization⸻TIMING:– Soft continuous pacing– Slightly slowed realistic motion– No sudden acceleration– No freezing– No looping– Smooth transitions between gestures⸻RESTRICTIONS:– No talking– No text– No UI– No effects– No influencer posing clichés– No direct eye contact– No front-facing pose– No aggressive motion– No floating hair physics– Do NOT cover the shirt design with hair⸻FINAL RESULT:A hyper-realistic diagonal back-view fashion animation where the subject softly raises BOTH hands together into the hair, naturally combs through it with realistic finger movement, gently guides the hair across the upper back, and lets it fall naturally over the opposite front shoulder — while keeping the back clothing design visible, maintaining realistic weighted hair physics, stable framing, and calm feminine motion throughout the entire clip.`
  },
  {
    id: 21,
    category: "Animações",
    likes: 121,
    image: "/assets/movimento-21.jpg",
    video: "/assets/movimento-21.mp4",
    promptText: `Animate the influencer naturally while showcasing the elasticity and stretchiness of the upper clothing fabric she is wearing.\nThe character must remain the EXACT same person from the original image.\nPreserve 100%:\n– face\n– body\n– hair\n– makeup\n– outfit\n– camera angle\n– lighting\n– background\n– framing\n– environment\nDO NOT change the clothing design or fit.\nDO NOT create new movements outside the requested action.\nANIMATION:\nThe influencer uses both hands to gently grab the upper fabric area of the clothing (top, cropped, blouse, tank top, hoodie, etc.) near the chest, waist, or shoulder area.\nShe naturally stretches the fabric outward to demonstrate elasticity, then smoothly releases it back into place.\nThe movement must:\n– look realistic\n– feel soft and natural\n– show visible fabric tension and recovery\n– preserve realistic cloth physics\n– avoid exaggerated pulling\n– avoid comedic or dramatic motion\nShe repeats the stretch-and-release movement 2–3 times in a subtle and professional way, similar to a real clothing model demonstrating fabric flexibility for social media or e-commerce.\nHer body posture remains relaxed and natural during the animation.\nMaintain realistic micro movements, breathing, blinking, and subtle hand motion.\nCinematic realism, premium fashion commercial quality, smooth motion, realistic fabric simulation, natural influencer behavior.`
  },
  {
    id: 22,
    category: "Animações",
    likes: 122,
    image: "/assets/movimento-22.jpg",
    video: "/assets/movimento-22.mp4",
    promptText: `Animate the influencer naturally while showcasing the elasticity and stretchiness of the lower clothing fabric she is wearing.\nThe character must remain the EXACT same person from the original image.\nPreserve 100%:\n– face\n– body\n– hair\n– makeup\n– outfit\n– camera angle\n– lighting\n– background\n– framing\n– environment\nDO NOT modify the clothing style, shape, or proportions.\nDO NOT change the pose drastically.\nANIMATION:\nThe influencer naturally places one or both hands on the lower clothing area (leggings, pants, shorts, jeans, activewear, etc.) around the thigh, hip, or waist area.\nShe gently stretches the fabric outward to demonstrate elasticity, then smoothly releases it back into place.\nThe stretch must:\n– feel realistic\n– show visible fabric flexibility\n– maintain natural cloth behavior\n– avoid excessive pulling\n– avoid deformation of the body\n– preserve realistic tension and rebound\nShe repeats the stretch-and-release motion 2–3 times in a subtle, elegant, and professional way, like a fashion influencer demonstrating fabric comfort and flexibility.\nInclude subtle natural body movement, breathing, blinking, and realistic hand interaction with the clothing.\nUltra realistic motion, cinematic quality, smooth fabric physics, premium commercial fashion animation, realistic influencer behavior.`
  },
  {
    id: 23,
    category: "Animações",
    likes: 123,
    image: "/assets/movimento-23.jpg",
    video: "/assets/movimento-23.mp4",
    promptText: `Ultra-realistic vertical smartphone video recorded indoors in a bedroom environment with a wardrobe behind, a doorway on the side, wooden floor, neutral walls, and direct frontal indoor lighting creating a realistic visible shadow on the wall behind the person.\nThe camera is completely static and does not move at any moment.\nThe camera stays fixed in the same position the entire time.\nNo zoom, no pan, no camera movement. Only the person moves.\nThe framing is vertical 9:16, smartphone camera style, slightly low angle, like a real influencer video recorded \n<truncated 36392 bytes>\n\nNOTE: The output was truncated because it was too long. Use a more targeted query or a smaller range to get the information you need.`
  }
];

export const MovimentosView = () => {
  const [activeCategory, setActiveCategory] = useState("Animações");
  const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);

  const handleCopyPrompt = (template: any) => {
    if (template.promptText) {
      navigator.clipboard.writeText(template.promptText);
      alert('Movimento copiado para a área de transferência!');
    }
  };

  return (
    <div className="flex-1 w-full flex flex-col p-6 md:p-8 overflow-y-auto bg-transparent">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-light text-white mb-2 leading-tight">
            Copie <span className="font-medium bg-gradient-to-r from-purple-400 to-[#8B5CF6] text-transparent bg-clip-text">movimentos naturais</span>
          </h1>
          <p className="text-[#8d8d99] text-sm max-w-2xl">
            Inspire-se em movimentos reais e aplique na sua influenciadora para gerar vídeos ultra-realistas e engajadores.
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
        {templates.map((template) => (
          <div 
            key={template.id} 
            onMouseEnter={() => setHoveredCardId(template.id)}
            onMouseLeave={() => setHoveredCardId(null)}
            className="relative group aspect-[4/5] rounded-[24px] overflow-hidden bg-white/5 border border-white/5 flex flex-col justify-end p-5"
          >
            {/* Imagem de Fundo (Placeholder) */}
            <img
              src={template.image}
              alt="Template"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${hoveredCardId === template.id ? 'opacity-0' : 'opacity-100 group-hover:scale-105'}`}
            />

            {/* Video Autoplay on Hover */}
            {template.video && hoveredCardId === template.id && (
              <video
                src={template.video}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-100 transition-opacity duration-500"
                style={{ pointerEvents: 'none' }}
              />
            )}
            
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
                MOVIMENTO {template.id}
              </h3>
              <p className="text-white/70 text-[11px] leading-relaxed line-clamp-2">
                Movimento fluido e dinâmico, perfeito para prender a atenção no início do vídeo.
              </p>
              
              <button 
                onClick={() => handleCopyPrompt(template)}
                className="mt-2 flex items-center justify-center gap-2 w-full py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 rounded-xl text-white text-[11px] font-bold uppercase tracking-wider transition-colors shadow-lg"
              >
                <Copy className="w-4 h-4" />
                Copiar Movimento
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
