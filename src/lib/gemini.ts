import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateImageWithGemini = async (prompt: string, apiKey: string, subjectImageBase64?: string, referenceImageBase64?: string): Promise<string> => {
  if (!apiKey) throw new Error("Chave da API do Gemini não configurada.");
  let finalPrompt = prompt;

  if (subjectImageBase64 || referenceImageBase64) {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const parts: any[] = [
      { text: `You are an elite AI Prompt Engineer. The user wants to generate a new image matching the subject identity, style, pose, and details from the provided reference image(s).
      
      User request/prompt: "${prompt}".
      
      Analyze the face, hair, eyes, nose, expression, clothing, and setting of the person in the reference image(s).
      Write an EXHAUSTIVELY DETAILED textual description of the person so the image generator can recreate their EXACT face, identity, and style.
      Combine everything into a single, cohesive, highly photorealistic prompt. 
      DO NOT mention "Image 1" or "reference image". Just output the vivid prompt starting with "A hyper-realistic 8k portrait of..."` }
    ];

    if (subjectImageBase64) {
      parts.push({
        inlineData: {
          mimeType: 'image/jpeg',
          data: subjectImageBase64.includes(',') ? subjectImageBase64.split(',')[1] : subjectImageBase64
        }
      });
    }

    if (referenceImageBase64) {
      parts.push({
        inlineData: {
          mimeType: 'image/jpeg',
          data: referenceImageBase64.includes(',') ? referenceImageBase64.split(',')[1] : referenceImageBase64
        }
      });
    }

    try {
      const result = await model.generateContent(parts);
      if (result.response.text()) finalPrompt = result.response.text().trim();
    } catch (e) {
      console.warn("Falha no Cortex de Visão Gemini", e);
    }
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${apiKey}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ instances: [{ prompt: finalPrompt }], parameters: { sampleCount: 1 } })
  });

  if (!response.ok) {
    const errText = await response.text();
    console.warn(`Erro no Gemini/Imagen: ${errText}. Tentando fallback para Fal AI (Flux)...`);
    try {
      const { generateImageWithFal } = await import("./fal");
      return await generateImageWithFal(finalPrompt);
    } catch (falErr) {
      console.error("Falha no fallback da Fal AI:", falErr);
      let parsedErr = errText;
      try {
        const errObj = JSON.parse(errText);
        if (errObj.error && errObj.error.message) parsedErr = errObj.error.message;
      } catch (_) {}
      throw new Error(parsedErr);
    }
  }

  const data = await response.json();
  console.log("Gemini Imagen raw response:", data);
  if (data.predictions && data.predictions[0]) {
    const pred = data.predictions[0];
    if (pred.bytesBase64Encoded) {
      return `data:image/png;base64,${pred.bytesBase64Encoded}`;
    }
    if (pred.status && pred.status.message) {
      throw new Error(`Filtro de Segurança Google: ${pred.status.message}`);
    }
  }
  throw new Error(data.error && data.error.message ? data.error.message : "Resposta inválida da API do Gemini (Imagen)");
};

export const analyzeImageForHeadline = async (imageBase64: string, apiKey: string): Promise<string> => {
  const b64Data = imageBase64.includes(',') ? imageBase64.split(',')[1] : imageBase64;
  let mimeType = 'image/jpeg';
  if (imageBase64.startsWith('data:')) {
    mimeType = imageBase64.split(';')[0].split(':')[1];
  }

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

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const result = await model.generateContent([
    promptText,
    {
      inlineData: {
        data: b64Data,
        mimeType: mimeType
      }
    }
  ]);

  const text = result.response.text();
  if (text) return text;
  throw new Error("Resposta inválida do Gemini ao analisar headline");
};

export const generateUGCScript = async (
  influencer: string,
  product: string,
  scenario: string,
  videoModel: string,
  tone: string,
  aiEngine: string,
  numTakes: number,
  apiKey: string
): Promise<string[]> => {
  const fallbacks = [
    [
      `Gente, eu testei o ${product} e estou completamente apaixonada!`,
      `Sério, o resultado que isso dá é surreal, vocês precisam ver.`,
      `Eu não acreditava muito, mas agora virou meu favorito da vida.`,
      `Se você estava na dúvida, pode confiar que vale cada centavo.`,
      `Clica aqui embaixo para garantir o seu antes que esgote!`
    ]
  ];
  let fallbackTakes = fallbacks[0].slice(0, numTakes);
  while (fallbackTakes.length < numTakes) fallbackTakes.push("E é simplesmente perfeito!");

  try {
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

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(promptText);
    const text = result.response.text();
    if (text) {
      const cleanedText = text.trim().replace(/^```(?:json)?\s*/i, '').replace(/^```\s*/, '').replace(/\s*```$/, '').trim();
      const parsed = JSON.parse(cleanedText);
      if (Array.isArray(parsed) && parsed.length > 0) {
        let finalTakes = [...parsed];
        if (finalTakes.length > numTakes) {
          finalTakes = finalTakes.slice(0, numTakes);
        } else {
          while (finalTakes.length < numTakes) finalTakes.push("");
        }
        return finalTakes;
      }
    }
    return fallbackTakes;
  } catch (e) {
    console.error("Erro ao gerar roteiro na IA, retornando fallback:", e);
    return fallbackTakes;
  }
};

// Trigger build
