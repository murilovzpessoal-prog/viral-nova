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
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" });

      let lengthConstraint = aiEngine === 'YouTube Create' ? "\nMUITO IMPORTANTE: MÁXIMO 900 caracteres totais.\n" : "";
      let takeSizeInstruction = numTakes === 1 
        ? `Apenas 1 take de 8 SEGUNDOS. Muito curto.` 
        : `${numTakes} takes.`;

      const promptText = `Você é um especialista em Copywriting de conversão (UGC).
Produto: ${product}
Cenário: ${scenario}
Tom da voz: ${tone}
Formato: ${videoModel}
Influenciadora: ${influencer}
Takes: ${numTakes}${lengthConstraint}
Tamanho: ${takeSizeInstruction}

INSTRUÇÕES:
1. Focado no produto.
2. Raciocínio natural.
3. Soar 100% natural.
4. Retorne EXATAMENTE um Array JSON de strings com os ${numTakes} takes. Sem \`\`\`json.`;

      const result = await model.generateContent(promptText);
      const cleanedText = result.response.text().trim().replace(/^```json\s*/, '').replace(/^```\s*/, '').replace(/\s*```$/, '').trim();
      const parsed = JSON.parse(cleanedText);
      return res.status(200).json({ takes: parsed });
    }

    return res.status(400).json({ error: "Unknown action" });
  } catch (err) {
    console.error("Gemini API Error:", err);
    return res.status(500).json({ error: err.message || "Internal error" });
  }
}
