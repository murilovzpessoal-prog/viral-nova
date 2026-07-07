export const generateImageWithGemini = async (prompt: string, apiKey: string, subjectImageBase64?: string, referenceImageBase64?: string): Promise<string> => {
  try {
    const falKey = import.meta.env.VITE_FAL_API_KEY;
    if (!falKey) {
      throw new Error("Chave do fal.ai não configurada.");
    }
    
    // Using fal-ai/flux-schnell for fast image generation directly via REST
    const response = await fetch("https://fal.run/fal-ai/flux/schnell", {
      method: "POST",
      headers: {
        "Authorization": `Key ${falKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: prompt,
        image_size: "portrait_4_3"
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Erro API fal.ai: ${errorData.detail || response.statusText}`);
    }
    
    const result = await response.json();
    
    if (result && result.images && result.images.length > 0) {
      return result.images[0].url;
    }
    throw new Error("A API não retornou nenhuma imagem.");
  } catch (error: any) {
    console.error("Erro ao gerar imagem no fal.ai:", error);
    throw new Error(`Erro ao gerar imagem: ${error.message || 'Erro desconhecido'}`);
  }
};

export const analyzeImageForHeadline = async (imageBase64: string, apiKey: string): Promise<string> => {
  try {
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: "Você é um especialista em marketing. Analise esta imagem do produto e crie uma headline curta, direta e viral (máximo 50 caracteres) para um anúncio no TikTok/Instagram. Retorne APENAS a headline." },
            { inlineData: { mimeType: "image/jpeg", data: base64Data } }
          ]
        }]
      })
    });
    
    if (!response.ok) throw new Error("Erro na API Gemini");
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "Headline viral para seu produto!";
  } catch (error) {
    console.error("Erro ao analisar headline:", error);
    return "Headline incrível detectada!";
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
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: `Aja como um roteirista de TikTok focado em UGC. Crie um roteiro viral. Produto: ${product}. Influenciador: ${influencer}. Cenário: ${scenario}. Tom: ${tone}. Gere exatamente ${numTakes} frases de efeito curtas para o roteiro. Formato de resposta: APENAS um array JSON válido com as strings das falas. Nenhuma formatação markdown, sem \`\`\`json.` }]
        }]
      })
    });
    
    if (!response.ok) throw new Error("Erro na API Gemini");
    
    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "[]";
    const cleanedText = text.replace(/```json/gi, '').replace(/```/g, '').trim();
    
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("Erro na geração do roteiro:", error);
    return Array(numTakes).fill("Erro ao gerar roteiro. Tente novamente.");
  }
};
