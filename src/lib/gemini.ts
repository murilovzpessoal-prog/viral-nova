export const generateImageWithGemini = async (prompt: string, apiKey: string, subjectImageBase64?: string, referenceImageBase64?: string): Promise<string> => {
  const response = await fetch('/api/gemini', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action: 'generateImage',
      payload: { prompt, subjectImageBase64, referenceImageBase64 }
    })
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`Erro ao gerar imagem: ${errorData.error || response.statusText}`);
  }
  
  const data = await response.json();
  return data.base64;
};

export const analyzeImageForHeadline = async (imageBase64: string, apiKey: string): Promise<string> => {
  const response = await fetch('/api/gemini', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action: 'analyzeHeadline',
      payload: { imageBase64 }
    })
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`Erro ao analisar headline: ${errorData.error || response.statusText}`);
  }
  
  const data = await response.json();
  return data.text;
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
  const response = await fetch('/api/gemini', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action: 'generateScript',
      payload: { influencer, product, scenario, videoModel, tone, aiEngine, numTakes }
    })
  });
  
  if (!response.ok) {
    console.error("Erro na comunicação com o backend (Gemini API).");
    return ["Erro na comunicação com a inteligência artificial para o roteiro."];
  }
  
  const data = await response.json();
  return data.takes || ["Erro ao gerar roteiro. Tente novamente."];
};
