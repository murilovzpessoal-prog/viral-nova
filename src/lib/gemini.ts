import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateImageWithGemini = async (prompt: string, apiKey: string, subjectImageBase64?: string, referenceImageBase64?: string): Promise<string> => {
  let finalPrompt = prompt;

  if (subjectImageBase64 && referenceImageBase64) {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" });
    
    const parts: any[] = [
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
      const response = await result.response;
      if (response.text()) {
        finalPrompt = response.text().trim();
        console.log("🧬 DNA Visual Extraído (Gemini Vision):", finalPrompt);
      }
    } catch (e) {
      console.warn("Falha no Cortex de Visão", e);
    }
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:predict?key=${apiKey}`;
  
  let lastError: any = null;
  const maxRetries = 3;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          instances: [{ prompt: finalPrompt }],
          parameters: { sampleCount: 1 }
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Gemini Image API Error (Tentativa ${attempt}):`, errorText);
        throw new Error(`Falha na API do Gemini: ${response.status} ${response.statusText}. Detalhes: ${errorText}`);
      }

      const data = await response.json();
      if (data.predictions && data.predictions[0] && data.predictions[0].bytesBase64Encoded) {
        return `data:image/png;base64,${data.predictions[0].bytesBase64Encoded}`;
      } else {
        console.error(`Resposta inesperada da API (Tentativa ${attempt}):`, data);
        lastError = data;
        // Não lançar erro imediatamente, deixar o loop tentar novamente
      }
    } catch (e) {
      console.error(`Erro na tentativa ${attempt}:`, e);
      lastError = e;
    }
    
    // Pequeno delay antes de tentar novamente
    if (attempt < maxRetries) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  throw new Error(`A API do Gemini não retornou a imagem base64 esperada após ${maxRetries} tentativas. Último erro: ${JSON.stringify(lastError)}`);
};

export const analyzeImageForHeadline = async (imageBase64: string, apiKey: string): Promise<string> => {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" });
  
  const b64Data = imageBase64.includes(',') ? imageBase64.split(',')[1] : imageBase64;
  let mimeType = 'image/jpeg';
  if (imageBase64.startsWith('data:')) {
    mimeType = imageBase64.split(';')[0].split(':')[1];
  }

  const promptText = `Você é um especialista em marketing viral para TikTok e Reels. 
  
TAREFA: Analise cuidadosamente o contexto visual da imagem para descobrir qual é o produto sendo divulgado, e então crie 5 headlines (textos curtos) magnéticas.

REGRAS DE DETECÇÃO DO PRODUTO:
1. Se a pessoa na foto estiver com AS MÃOS VAZIAS (não segura nenhum objeto com destaque): O produto sendo divulgado é a ROUPA que ela está vestindo (ex: o pijama, vestido, conjunto, etc).
2. Se a pessoa estiver SEGURANDO UM PRODUTO (ex: caixa de sapato, garrafa, creme, celular): O foco da divulgação é estritamente o OBJETO NAS MÃOS dela.

REGRAS DE ESCRITA (HEADLINES):
- Gere exatamente 5 opções.
- TODAS as headlines devem obrigatoriamente começar com "POV: " (ex: "POV: você achou o pijama mais confortável da internet").
- Estilo: Linguagem nativa de TikTok, instigante, que prenda a atenção nos primeiros 3 segundos.
- Retorne APENAS as headlines, uma por linha. NÃO coloque números antes, nem hífens, nem introduções. Apenas as frases puras.`;

  try {
    const result = await model.generateContent([
      promptText,
      {
        inlineData: {
          data: b64Data,
          mimeType
        }
      }
    ]);
    
    const response = await result.response;
    const text = response.text();
    
    if (!text) {
      throw new Error("Gemini não conseguiu gerar as headlines.");
    }
    
    return text;
  } catch (error: any) {
    console.error("Erro no SDK do Gemini:", error);
    throw new Error(error.message || "Erro ao analisar imagem com Gemini.");
  }
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
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" });

  let lengthConstraint = "";
  if (aiEngine === 'YouTube Create') {
    lengthConstraint = "\nMUITO IMPORTANTE: A soma de caracteres de TODOS os takes gerados JUNTOS deve ter OBRIGATORIAMENTE no MÁXIMO 900 caracteres. Seja breve e direto ao ponto.\n";
  }

  let takeSizeInstruction = "";
  if (numTakes === 1) {
    takeSizeInstruction = `O vídeo terá APENAS 1 take de 8 SEGUNDOS. A fala deve ser curta o suficiente para ser dita confortavelmente nesse tempo. Use o seguinte tamanho de texto como a base EXATA para o tamanho da sua resposta: "Gente, eu testei esse Depilador Facial Sem Fio e o resultado é surreal. Faz toda a diferença no dia a dia. Clica no link aqui embaixo pra garantir o seu antes que acabe o estoque!"`;
  } else {
    takeSizeInstruction = `O vídeo terá ${numTakes} takes. A fala pode ser um pouco mais desenvolvida e maior, dividida organicamente entre os takes.`;
  }

  const promptText = `Você é um especialista em Copywriting de conversão e vídeos virais (UGC - User Generated Content).
A sua tarefa é criar um roteiro extremamente natural, humano e altamente persuasivo dividido em takes curtos.

PARÂMETROS:
- Produto: ${product}
- Cenário: ${scenario}
- Tom da voz: ${tone}
- Formato/Modelo do vídeo: ${videoModel}
- Influenciador(a) da IA: ${influencer}
- Quantidade de Takes: ${numTakes}${lengthConstraint}
- Tamanho/Duração: ${takeSizeInstruction}

INSTRUÇÕES:
1. A fala deve ser 100% focada neste produto específico. NÃO seja genérico.
2. Crie uma linha de raciocínio natural e inteligente (Gatilho forte no início, desenvolvimento que gera desejo, CTA no final).
3. A fala tem que soar como uma cliente/influenciadora brasileira real gravando um vídeo caseiro de indicação. Ela NÃO é uma "vendedora". Ao falar do produto, NÃO use o nome técnico ou longo completo (ex: não fale "Body Splash My Sweet Delight", fale apenas "esse body splash" ou "esse creme"). Use termos casuais para soar 100% natural.
4. Você DEVE retornar EXATAMENTE um Array JSON de strings com os ${numTakes} takes. Sem markdown ao redor (sem \`\`\`json), APENAS o array literal.
Exemplo: ["fala do take 1", "fala do take 2"]
`;

  try {
    const result = await model.generateContent(promptText);
    const text = result.response.text().trim();
    
    // Remove markdown code blocks if the model insists on adding them
    const cleanedText = text.replace(/^```json\s*/, '').replace(/^```\s*/, '').replace(/\s*```$/, '').trim();
    
    const parsed = JSON.parse(cleanedText);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return ["Erro ao gerar roteiro. Tente novamente."];
  } catch (error: any) {
    console.error("Erro ao gerar script UGC:", error);
    return ["Erro na comunicação com a inteligência artificial para o roteiro."];
  }
};
