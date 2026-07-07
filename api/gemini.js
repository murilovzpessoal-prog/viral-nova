import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  
  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "Gemini API Key missing on server" });

  const { action, payload } = req.body;

  try {
    if (action === 'generateImage') {
      const { prompt, subjectImageBase64, referenceImageBase64 } = payload;
      let finalPrompt = prompt;

      if (subjectImageBase64 && referenceImageBase64) {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" });
        const parts = [
          { text: `You are an elite AI Prompt Engineer. The user wants to apply the clothing from Image 2 onto the person from Image 1. 
          Because the target image generator ONLY accepts text, you MUST write an EXHAUSTIVELY DETAILED textual description of the person in Image 1 so the generator can recreate her EXACT face. 
          Analyze her facial structure, jawline, eye shape, eye color, eyebrow arch, nose shape, lip fullness, skin tone, hair texture, hair color, and exact hairstyle. 
          Then, describe her wearing EXACTLY the garment from Image 2 (fabric, color, neckline, sleeves, fit).
          Combine this into a single, cohesive, highly photorealistic prompt. 
          DO NOT mention "Image 1" or "Image 2". Just output the vivid prompt starting with "A hyper-realistic 8k portrait of..."` }
        ];

        [subjectImageBase64, referenceImageBase64].forEach(b64 => {
          parts.push({
            inlineData: {
              mimeType: 'image/jpeg',
              data: b64.includes(',') ? b64.split(',')[1] : b64
            }
          });
        });

        try {
          const result = await model.generateContent(parts);
          if (result.response.text()) finalPrompt = result.response.text().trim();
        } catch (e) {
          console.warn("Falha no Cortex de Visão", e);
        }
      }

      const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${apiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ instances: [{ prompt: finalPrompt }], parameters: { sampleCount: 1 } })
      });

      if (!response.ok) throw new Error(await response.text());
      const data = await response.json();
      if (data.predictions && data.predictions[0] && data.predictions[0].bytesBase64Encoded) {
        return res.status(200).json({ base64: `data:image/png;base64,${data.predictions[0].bytesBase64Encoded}` });
      }
      throw new Error("Invalid response from Imagen");
    }

    if (action === 'analyzeHeadline') {
      const { imageBase64 } = payload;
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" });
      const b64Data = imageBase64.includes(',') ? imageBase64.split(',')[1] : imageBase64;
      let mimeType = 'image/jpeg';
      if (imageBase64.startsWith('data:')) mimeType = imageBase64.split(';')[0].split(':')[1];

      const promptText = `Você é um especialista em marketing viral para TikTok e Reels. 
TAREFA: Analise cuidadosamente o contexto visual da imagem para descobrir qual é o produto sendo divulgado, e então crie 5 headlines (textos curtos) magnéticas.

REGRAS DE DETECÇÃO DO PRODUTO:
1. Se a pessoa na foto estiver com AS MÃOS VAZIAS: O produto é a ROUPA que ela está vestindo.
2. Se a pessoa estiver SEGURANDO UM PRODUTO: O foco é estritamente o OBJETO NAS MÃOS dela.

REGRAS DE ESCRITA:
- Gere exatamente 5 opções.
- TODAS devem começar com "POV: "
- Estilo: Linguagem nativa de TikTok.
- Retorne APENAS as headlines, uma por linha.`;

      const result = await model.generateContent([
        promptText,
        { inlineData: { data: b64Data, mimeType } }
      ]);
      return res.status(200).json({ text: result.response.text() });
    }

    if (action === 'generateScript') {
      const { influencer, product, scenario, videoModel, tone, aiEngine, numTakes } = payload;
      
      const fallbacks = [
        [
          `Gente, eu testei o ${product} e estou completamente apaixonada!`,
          `Sério, o resultado que isso dá é surreal, vocês precisam ver.`,
          `Eu não acreditava muito, mas agora virou meu favorito da vida.`,
          `Se você estava na dúvida, pode confiar que vale cada centavo.`,
          `Clica aqui embaixo para garantir o seu antes que esgote!`
        ],
        [
          `Para tudo que você tá fazendo e olha esse ${product} que chegou.`,
          `Eu venho testando há dias e a diferença é simplesmente absurda.`,
          `É aquele tipo de achadinho que a gente quer indicar pra todo mundo.`,
          `E o melhor de tudo é como é prático de usar no dia a dia.`,
          `Vai por mim, aproveita o desconto e depois me agradece!`
        ],
        [
          `Vocês vivem me perguntando o meu segredo, e é esse ${product} aqui.`,
          `Faz toda a diferença, eu já não consigo mais ficar sem.`,
          `A qualidade me surpreendeu muito, não esperava tanto.`,
          `Super prático, rápido e entrega exatamente o que promete.`,
          `Corre pra pegar o seu porque o estoque sempre acaba rápido!`
        ]
      ];

      // Pega um fallback aleatório e corta para o número exato de takes solicitados
      let fallbackTakes = fallbacks[Math.floor(Math.random() * fallbacks.length)].slice(0, numTakes);
      while (fallbackTakes.length < numTakes) fallbackTakes.push("E é simplesmente perfeito!");

      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" });

        let lengthConstraint = aiEngine === 'YouTube Create' ? "\nMUITO IMPORTANTE: MÁXIMO 900 caracteres totais.\n" : "";
        let takeSizeInstruction = numTakes === 1 
          ? `Apenas 1 take de 8 SEGUNDOS. Muito curto.` 
          : `${numTakes} takes. Cada take tem cerca de 8 segundos.`;

        const promptText = `Você é um especialista em Copywriting de conversão (UGC).
Produto: ${product}
Cenário: ${scenario}
Tom da voz: ${tone}
Formato: ${videoModel}
Influenciadora: ${influencer}
Takes: ${numTakes}${lengthConstraint}
Tamanho: ${takeSizeInstruction}

INSTRUÇÕES CRÍTICAS E OBRIGATÓRIAS:
1. APENAS FALA (DIÁLOGO PURO): NÃO escreva ações, NÃO escreva direções de palco, NÃO use parênteses ou colchetes (ex: "sorrindo", "segurando o produto", "muda de câmera"). Escreva EXATAMENTE as palavras que sairão da boca da influenciadora e NADA mais.
2. PERSONALIZAÇÃO: Use de forma inteligente as características do cenário (${scenario}) e foque intensamente nos benefícios do ${product}.
3. NATURALIDADE: A linguagem deve ser 100% natural, nativa de TikTok/Reels, parecendo uma recomendação sincera de uma amiga e não uma propaganda engessada.
4. FORMATO DE SAÍDA: Retorne EXATAMENTE um Array JSON de strings, onde cada string é o texto falado do take correspondente. NÃO insira a palavra "json" no início nem formatações markdown. Apenas a lista no formato ["Fala do take 1...", "Fala do take 2..."].`;

        const result = await model.generateContent(promptText);
        const cleanedText = result.response.text().trim().replace(/^```(?:json)?\s*/i, '').replace(/^```\s*/, '').replace(/\s*```$/, '').trim();
        const parsed = JSON.parse(cleanedText);
        
        if (!Array.isArray(parsed) || parsed.length === 0) {
          throw new Error("Formato inválido retornado pela IA");
        }
        
        let finalTakes = [...parsed];
        if (finalTakes.length > numTakes) {
          finalTakes = finalTakes.slice(0, numTakes);
        } else while (finalTakes.length < numTakes) {
          finalTakes.push("");
        }

        return res.status(200).json({ takes: finalTakes });
      } catch (err) {
        console.error("Erro ao gerar roteiro na IA, retornando fallback seguro. Erro:", err);
        return res.status(200).json({ takes: fallbackTakes });
      }
    }

    return res.status(400).json({ error: "Unknown action" });
  } catch (err) {
    console.error("Gemini API Error:", err);
    return res.status(500).json({ error: err.message || "Internal error" });
  }
}
