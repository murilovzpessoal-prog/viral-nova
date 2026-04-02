import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { userDescription, tipoCriacao, refBase64, baseBase64 } = body;

    let parts: any[] = [];

    if (tipoCriacao === 'Clone (Celebridades)' || tipoCriacao === 'Clone (Influencer IA)') {
      parts.push({
        text: `Você é um mapeador visual avançado especializado em clonagem fotorealista.
Tarefa: Você precisa analisar DUAS imagens (A de Base e a de Referência) e gerar um único parágrafo em inglês fundindo o cenário/pose da primeira com a identidade física da segunda.

REGRA DE MISSÃO CRÍTICA:
Ao analisar a Imagem Base (Cenário), VOCÊ ESTÁ TERMINANTEMENTE PROIBIDO de descrever o sujeito original (roupa, gênero, etc). Se você disser "um homem no escritório", a IA vai desenhar um homem extra no fundo!
A Imagem Base DEVE SER VISTA COMO UM CENÁRIO VAZIO: Extraia APENAS o ambiente físico (teto, mesas, janela, iluminação) e a POSE ESTRUTURAL (em pé, sentado, mãos no bolso).

1. DA IMAGEM BASE: Descreva o cenário e a pose mecânica. (Ex: "sitting at a desk in a modern office with wooden ceiling and a window on the right"). NÃO MENCIONE QUEM ESTÁ LÁ.
2. DA IMAGEM DE REFERÊNCIA: Descreva a Celebridade (DNA). (Ex: "A beautiful blonde woman wearing an orange tank top and an FV gold necklace, highly detailed female skin texture").

Retorne APENAS um parágrafo perfeitamente concatenado em inglês. Exemplo obrigatório de formato:
"A highly detailed photograph of [SUJEITO DA REFERÊNCIA] in the exact pose of [POSE DA IMAGEM BASE] inside [CENÁRIO DA IMAGEM BASE]. [Adicione reforço sobre iluminação e textura]." Sem aspas iniciais ou explicações.`
      });

      if (baseBase64) {
        try {
           const b64Data = baseBase64.includes(',') ? baseBase64.split(',')[1] : baseBase64;
           let mime = 'image/jpeg';
           if (baseBase64.startsWith('data:')) mime = baseBase64.split(';')[0].split(':')[1];
           parts.push({ text: "Imagem de Base (Use APENAS para o Cenário e a Pose):" });
           parts.push({ inlineData: { data: b64Data, mimeType: mime } });
        } catch(e) {}
      }

      if (refBase64) {
        try {
           const b64Data = refBase64.includes(',') ? refBase64.split(',')[1] : refBase64;
           let mimeType = 'image/jpeg';
           if (refBase64.startsWith('data:')) mimeType = refBase64.split(';')[0].split(':')[1];
           parts.push({ text: "Imagem de Referência (Use APENAS para Gênero, Pele, Corpo e Roupa da Pessoa):" });
           parts.push({ inlineData: { data: b64Data, mimeType: mimeType } });
        } catch(e) {}
      }

    } else {
      let systemPrompt = "";

      if (tipoCriacao === 'POV (mostrando produto)') {
        systemPrompt = `Você é um excepcional fotógrafo de produtos e engenheiro de prompt.
O usuário anexou a foto do seu PRODUTO REAL (base) e enviou uma descrição de um(a) influenciador(a).
Sua missão é criar um único Parágrafo de Prompt Fotográfico em INGLÊS (Ultra-realista) instruindo um motor de IA (FLUX) a gerar esse(a) influenciador(a) em close-up SEGURANDO FIRMEMENTE e apresentando com orgulho o exato produto da imagem anexada.

REGRAS ESTritas:
1. Extraia e descreva visualmente TODOS os detalhes do produto da imagem anexada (cor, formato da garrafa/caixa, textura, tampa, rótulo).
2. O prompt DEVE iniciar com: "A highly detailed ultra-realistic portrait of an authentic [CARACTERÍSTICAS DA PESSOA] holding and showcasing a [DESCRIÇÃO DETALHADA DO PRODUTO] close to the camera."
3. Adicione reforços fotorrealistas: "visible micro pores, unedited skin, authentic everyday look, natural lighting, shot on 35mm lens, sharp focus on the product, raw photograph."
Retorne APENAS o texto do prompt final em INGLÊS. Sem explicações, sem introduções.`;
      } else if (tipoCriacao === 'Clone (Influencer IA)') {
        systemPrompt = `Você é o operador mestre de fundição fotorealista da IA AntiGravity.
Sua função é gerar o "Prompt Estratégico" para substituição de identidade facial (Clone), onde a Imagem Base (âncora contextual) recebe o rosto da Imagem de Referência (DNA facial), integrando-os com perfeição sem aspecto de "recorte" artificial.

Siga EXATAMENTE este bloco estrutural em inglês, injetando sua análise visual incrivelmente detalhada nos colchetes:
"High-definition professional portrait, merging the identity of the person in the reference image onto the body and context of the person in the base image. The face, eyes, bone structure, skin texture, and core facial identity must be an exact, unmistakable match to the reference image. Prioritize reference geometry over base geometry. Maintain all context from the base image without deviation: [INSERIR DESCRIÇÃO MEGA DETALHADA DA POSE, DA ROUPA ESPECÍFICA (EX: PINK BLAZER), E DO CENÁRIO DA BASE]. The lighting, color grading, and environmental shadows present in the base image must be applied seamlessly to the new face, ensuring perfect integration with no 'cut-out' look. Ensure the skin tones are matched. [INSERIR A DESCRIÇÃO DE COMO O CABELO ESPECÍFICO DA REFERÊNCIA SE INTEGRA NA CENA DA BASE]. Additional actions/instructions: [INSERIR DESCRIÇÃO DO USUÁRIO TRADUZIDA PARA INGLÊS]."

Retorne APENAS o prompt final montado. Sem aspas iniciais, sem introduções.`;
      } else if (tipoCriacao === 'Imitar Movimentos') {
        systemPrompt = `Você é o engenheiro mestre de Prompt Cinematográfico da IA AntiGravity.
O usuário quer gerar um vídeo ultra-realista de "Pose Transfer / Imitação de Movimento" no Luma Dream Machine ou Kling AI.
Você deve descrever PERFEITAMENTE a pessoa na Imagem Base para que a IA desenhe ela fielmente, e aplicar a instrução de imitação.

Siga EXATAMENTE este bloco estrutural em inglês, injetando a análise visual da Imagem Base nos colchetes:
"Ultra-realistic high-definition 4k video. Maintain absolute structural and visual consistency with the reference image: [INSERIR AQUI A DESCRIÇÃO MEGA DETALHADA E CIRÚRGICA DA ROUPA, ROSTO, CABELO, TOM DE PELE E CENÁRIO DA PESSOA DA IMAGEM ENVIADA]. The character is performing a smooth, fluid, and precise motion sequence, exactly matching the choreography, dance steps, and physical actions from the provided reference motion video. Ensure the physics of the clothing and hair react naturally to the complex movements. Cinematic lighting, raw unedited film style, 60fps smooth rendering. Additional details: [INSERIR A DESCRIÇÃO DO USUÁRIO TRADUZIDA PARA INGLÊS AQUI, SE HOUVER, SENÃO DEIXE EM BRANCO]."

Retorne APENAS o prompt final em inglês. Sem aspas iniciais, sem introduções.`;
      } else if (tipoCriacao === 'Dança em Trend') {
        systemPrompt = `Você é um Gerador Rápido de Prompts.
O usuário quer animar uma pessoa em uma imagem (usando ferramentas como Flow ou Kling). A imagem JÁ SERÁ fornecida pelo usuário na ferramenta externa.
Sua FUNÇÃO ÚNICA é formatar a ideia de dança dele dentro deste esqueleto exato, sem adicionar descrições físicas específicas da pessoa, apenas as diretrizes do que o Kling/Flow precisa respeitar:

"Animate the exact person in the attached reference image performing the following EXCLUSIVELY BRAZILIAN DANCE CHOREOGRAPHY: [TRADUZA AQUI A DESCRIÇÃO DE DANÇA DO USUÁRIO PARA INGLÊS, MAS ADICIONE OBRIGATORIAMENTE QUE É UMA 'BRAZILIAN TIKTOK TREND DANCE' OU 'BRAZILIAN FUNK'. DEIXE MUITO CLARO QUE A PERFORMANCE É ANIMADA E NO ESTILO VIRAL BRASILEIRO].

CRITICAL INSTRUCTIONS: 
1. The AI must generate fluid movements strictly synced to a Brazilian rhythm. DO NOT emulate English/American music styles.
2. The subject MUST NOT speak or sing. Keep the mouth closed or naturally smiling. 100% focus on the body dance and choreography.
3. PRESERVE 100% VISUAL FIDELITY. The face, facial features, body proportions, clothing, and the entire background environment/scenario MUST NOT change from the original photo. Lock the background and identity."

Retorne APENAS o bloco em inglês pronto para ser copiado. Sem aspas iniciais, sem introduções.`;
      } else {
        systemPrompt = `Você é um engenheiro de prompt. Sua única função é pegar a descrição básica que o usuário enviou e mesclar perfeitamente dentro DESTE ESQUELETO EXATO, mantendo TODAS as palavras em inglês do esqueleto e apenas substituindo a parte descritiva pela do usuário. 
    
    O esqueleto OBRIGATÓRIO que você deve retornar é este:
    "Ultra realistic candid photo of [INSERIR A DESCRIÇÃO DO USUÁRIO TRADUZIDA PARA INGLÊS AQUI]. Casual real life photo taken with a modern mobile phone camera. Natural raw lighting, realistic shadows, authentic colors. Clear background environment, no artificial blur. Extremely detailed unedited human skin texture with visible micro pores, subtle blemishes, realistic skin reflections, vellus hair, slight facial asymmetry and natural hair strands. Completely unretouched, zero makeup effect, authentic everyday photography style, looks exactly like a real person photographed casually in real life. 4K HDR raw photo, ultra detailed, realistic composition. Important: the image must NOT contain any camera interface, phone UI, screenshot frame, recording indicators, shutter buttons, plastic skin, CGI, or AI smoothing."
    
    PRESTE ATENÇÃO AO GÊNERO DO SUJEITO: 
    Se o usuário pedir uma MULHER (influenciadora, menina, etc), adicione OBRIGATORIAMENTE ao lado da descrição: "Ultra detailed RAW photography of an authentic everyday Brazilian woman, South American Latina. CRITICAL INSTRUCTIONS FOR FEMALE: 0% makeup, ABSOLUTELY NO AIRBRUSHING, extremely raw textured skin, heavily visible micro pores on nose and cheeks, peach fuzz, subtle real-life blemishes, authentic female facial asymmetry, hyper-realistic candid lighting. This must look like a real unfiltered everyday mundane iphone photo."
    Se o usuário pedir um HOMEM (influenciador, menino, etc), adicione OBRIGATORIAMENTE ao lado da descrição: "authentic brazilian man, typical latin american features, raw unedited skin".
    E independentemente do gênero, mantenha sempre características marcantes de uma PESSOA BRASILEIRA COMUM e AUTÊNTICA.
    
    Retorne APENAS o prompt final em inglês montado com esse esqueleto. Sem aspas iniciais, sem explicações.`;
      }

      parts = [{ text: `${systemPrompt}\n\nDescrição original do usuário: ${userDescription || ''}` }];
      
      if (baseBase64 && tipoCriacao === 'Clone (Influencer IA)') {
        try {
           const b64Data = baseBase64.includes(',') ? baseBase64.split(',')[1] : baseBase64;
           let mime = 'image/jpeg';
           if (baseBase64.startsWith('data:')) mime = baseBase64.split(';')[0].split(':')[1];
           parts.push({ inlineData: { data: b64Data, mimeType: mime } });
           parts[0].text += `\n\nA visual reference of the BASE IMAGE (Scene/Body/Pose) is attached FIRST. Analyze the background, lighting, and body pose structure in detail, and insert that into the [INSERT SCENE/BACKGROUND/POSE DESCRIPTION HERE] block.`;
        } catch(e) {}
      }

      if (baseBase64 && tipoCriacao === 'POV (mostrando produto)') {
        try {
           const b64Data = baseBase64.includes(',') ? baseBase64.split(',')[1] : baseBase64;
           let mime = 'image/jpeg';
           if (baseBase64.startsWith('data:')) mime = baseBase64.split(';')[0].split(':')[1];
           parts.push({ inlineData: { data: b64Data, mimeType: mime } });
           parts[0].text += `\n\nA visual reference of the EXACT PRODUCT is attached above. Analyze its shape, color, materials, and distinct visual features thoroughly. You must describe this exact product object in your prompt being held by the influencer.`;
        } catch(e) {}
      }

      if (baseBase64 && tipoCriacao === 'Imitar Movimentos') {
        try {
           const b64Data = baseBase64.includes(',') ? baseBase64.split(',')[1] : baseBase64;
           let mime = 'image/jpeg';
           if (baseBase64.startsWith('data:')) mime = baseBase64.split(';')[0].split(':')[1];
           parts.push({ inlineData: { data: b64Data, mimeType: mime } });
           parts[0].text += `\n\nA visual reference of the CHARACTER is attached above. Analyze her/his facial features, clothing, and background environment in extreme precision, and insert that visual description into your prompt block so the external AI completely recreates this person in the final video.`;
        } catch(e) {}
      }

      const videoBase64 = body.videoBase64;
      if (videoBase64 && tipoCriacao === 'Imitar Movimentos') {
        try {
           const b64Data = videoBase64.includes(',') ? videoBase64.split(',')[1] : videoBase64;
           let mime = 'video/mp4';
           if (videoBase64.startsWith('data:')) mime = videoBase64.split(';')[0].split(':')[1];
           parts.push({ inlineData: { data: b64Data, mimeType: mime } });
           parts[0].text += `\n\nA visual reference of the EXACT MOTION (Video) is attached above. Analyze the physics, dance choreography, rhythm, hand gestures, and body momentum exactly, and incorporate these highly detailed sequential actions into your text prompt.`;
        } catch(e) {}
      }

      if (refBase64) {
        try {
           const b64Data = refBase64.includes(',') ? refBase64.split(',')[1] : refBase64;
           let mimeType = 'image/jpeg';
           if (refBase64.startsWith('data:')) mimeType = refBase64.split(';')[0].split(':')[1];
           parts.push({ inlineData: { data: b64Data, mimeType } });
           parts[0].text += `\n\nA visual reference of the PERSON TO CLONE is attached LAST. Analyze her/his facial features, hair, and clothing in extreme visual detail, and insert that visual description into the [INSERT HIGHLY DETAILED PHYSICAL DESCRIPTION...] block of your response so the image generator can accurately recreate her/him.`;
        } catch(e) {}
      }
    }

    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');

    if (!GEMINI_API_KEY) {
      throw new Error("API Key do Gemini não configurada no Supabase.");
    }

    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts }]
      })
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error?.message || 'Erro ao comunicar com Gemini IA');
    }

    const enhancedPrompt = data.candidates[0].content.parts[0].text.trim();

    return new Response(JSON.stringify({ enhancedPrompt }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
