import { GoogleGenerativeAI } from "@google/generative-ai";

export const analyzeGarmentWithGemini = async (garmentBase64: string, influencerBase64: string, mode: string = 'full'): Promise<{fashnPrompt: string, fluxPrompt: string, faceBox: number[]}> => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) throw new Error("Chave da API do Gemini não configurada.");

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    generationConfig: { temperature: 0.1, topP: 0.1 }
  });

  let focus = "the entire outfit/dress/set";
  if (mode === 'upper' || mode === 'upper_body') focus = "ONLY the top/shirt part of the outfit, ignoring any pants or skirts";
  if (mode === 'lower' || mode === 'lower_body') focus = "ONLY the bottom/pants/skirt part of the outfit, ignoring any shirts";

const prompt = `You will receive two images: Image 1 is the Garment. Image 2 is the Influencer.
Analyze the clothing item (Image 1) carefully, and analyze the Influencer's body (Image 2).
You must return a strict JSON object with three fields: "fashnPrompt", "fluxPrompt", and "faceBox". Do NOT wrap in markdown blocks, return ONLY valid JSON.

1. "fashnPrompt": Describe the physical structure of the garment AND the exposed human anatomy. 
CRITICAL RULE: DO NOT use negative words. Use ONLY POSITIVE STATEMENTS.
- Describe the exact garment (fabric, color, neckline, sleeves, fit).
- MANDATORY: You MUST describe the exposed skin that will be visible.

2. "fluxPrompt": Provide a highly detailed description of the GARMENT MATERIAL and EXPOSED SKIN for photorealism.
- State exactly this: "ROLE: You are a RESTORER, not a generator. You will receive a finished photograph. Your function is NOT to create a new image. Preserve exactly: face, eyes, nose, mouth, hair, pose, hands, body, background, and clothing geometry. Do not alter seams, fit, fabric type, lighting, composition, or framing. Fix ONLY small photographic imperfections like artificial edges, skin/fabric transitions, skin texture (add pores and natural grain), fabric texture, and small shadow inconsistencies. The result must look like an unedited photograph shot on iPhone 16 Pro in natural light. It is STRICTLY FORBIDDEN to modify any element of the image. Just add photographic finish."
3. "faceBox": The bounding box of the person's face in Image 2 (to protect it). Array format [ymin, xmin, ymax, xmax] normalized between 0.0 and 1.0. If no face is found, return [0,0,0,0].

Example output:
{
  "fashnPrompt": "White halter top with deep V neck, draped fabric, on a woman with highly detailed exposed belly, deep navel, realistic human cleavage, visible skin pores, bare arms.",
  "fluxPrompt": "ROLE: You are a RESTORER, not a generator. You will receive a finished photograph. Your function is NOT to create a new image. Preserve exactly: face, eyes, nose, mouth, hair, pose, hands, body, background, and clothing geometry. Do not alter seams, fit, fabric type, lighting, composition, or framing. Fix ONLY small photographic imperfections like artificial edges, skin/fabric transitions, skin texture (add pores and natural grain), fabric texture, and small shadow inconsistencies. The result must look like an unedited photograph shot on iPhone 16 Pro in natural light. It is STRICTLY FORBIDDEN to modify any element of the image. Just add photographic finish.",
  "faceBox": [0.10, 0.40, 0.35, 0.60]
}`;

  try {
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: garmentBase64.split(',')[1],
          mimeType: garmentBase64.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)?.[1] || 'image/jpeg'
        }
      },
      {
        inlineData: {
          data: influencerBase64.split(',')[1],
          mimeType: influencerBase64.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)?.[1] || 'image/jpeg'
        }
      }
    ]);

    const responseText = result.response.text();
    // Parse the JSON safely (stripping any potential markdown formatting from Gemini)
    let cleanedText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleanedText);
    return {
      fashnPrompt: parsed.fashnPrompt || "",
      fluxPrompt: parsed.fluxPrompt || "",
      faceBox: parsed.faceBox || [0, 0, 0, 0]
    };
  } catch (error) {
    console.error("Erro no Gemini Vision:", error);
    // Fallback if parsing fails
    return { fashnPrompt: "Solid color fabric", fluxPrompt: "High quality garment, photorealistic, DSLR raw photo, highly detailed", faceBox: [0, 0, 0, 0] };
  }
};

export const analyzeImageForUpscale = async (imageBase64: string): Promise<{prompt: string, faceBox: number[]}> => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) throw new Error("Chave da API do Gemini não configurada.");

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    generationConfig: { temperature: 0.1, topP: 0.1 }
  });

const prompt = `You are an expert AI prompt engineer and image restorer. You will receive an image of a person that was generated by AI and may contain physical bugs, anatomical errors, or plastic-looking skin/clothing.
Your job is to analyze the image and return a JSON object with two fields:
1. "prompt": A highly detailed prompt that will be passed to an image-to-image AI (Flux) to ENHANCE the quality and inject realism.
   - Describe the exact appearance of the person and clothing.
   - CRITICAL RULE: "DO NOT CREATE WHAT DOES NOT EXIST. DO NOT ADD NEW DETAILS. STRICTLY PRESERVE THE ORIGINAL GEOMETRY AND DESIGN."
   - "Fix minor artifacts or glitches, but DO NOT hallucinate new objects, new folds, or new accessories."
   - Add rules for photorealism: "ROLE: High-end commercial beauty retoucher. Transform into an unedited RAW DSLR photograph. Focus intensely on raw human skin realism: visible deep pores, fine peach fuzz on arms, natural skin grain, matte finish. COMPLETELY REMOVE any luminous, glowing, smooth, plastic, or CGI look from the skin. DO NOT ADD FRECKLES, MOLES, OR SPOTS."
2. "face_box": The bounding box of the person's face (to protect it). Array format [ymin, xmin, ymax, xmax] normalized between 0.0 and 1.0. If no face is found, return [0,0,0,0].

Return ONLY the raw JSON string without markdown blocks.`;

  try {
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: imageBase64.split(',')[1],
          mimeType: imageBase64.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)?.[1] || 'image/jpeg'
        }
      }
    ]);

    const responseText = result.response.text();
    let cleanedText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleanedText);
    return {
      prompt: parsed.prompt || "RAW DSLR photograph, extremely realistic",
      faceBox: parsed.face_box || [0,0,0,0]
    };
  } catch (error) {
    console.error("Erro no Gemini Vision Upscale:", error);
    return {
      prompt: "EXTREME MACRO SHOT, unedited RAW DSLR photography. Focus intensely on raw human skin realism: visible deep pores, fine peach fuzz on arms, natural skin grain, matte finish. COMPLETELY REMOVE any luminous, glowing, smooth, plastic, or CGI look from the skin. DO NOT CREATE WHAT DOES NOT EXIST. DO NOT ADD NEW DETAILS. STRICTLY PRESERVE THE ORIGINAL GEOMETRY AND DESIGN. professional studio lighting, 8k uhd, photorealistic. DO NOT ADD FRECKLES OR MOLES.",
      faceBox: [0,0,0,0]
    };
  }
};

export const analyzeSkinForRefinement = async (imageBase64: string): Promise<{skinBoxes: number[][]}> => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) throw new Error("Chave da API do Gemini não configurada.");

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    generationConfig: { temperature: 0.1, topP: 0.1 }
  });

const prompt = `You are a medical and anatomical AI specialized in computer vision. Analyze this image of a person.
Your task is to find ALL regions of EXPOSED HUMAN SKIN belonging to the body (arms, hands, belly, chest, cleavage, neck, legs, shoulders, back).
CRITICAL RULES:
1. DO NOT include the face or head.
2. DO NOT include clothing, fabric, or accessories.
3. DO NOT include the background.
4. Return a JSON object with a single field "skinBoxes" which is an array of bounding boxes.
Each bounding box must be in the format [ymin, xmin, ymax, xmax] normalized between 0.0 and 1.0.
If no exposed body skin is found (e.g. wearing long sleeves and pants), return an empty array [].

Return ONLY valid JSON without markdown blocks.
Example: { "skinBoxes": [[0.3, 0.2, 0.6, 0.4], [0.4, 0.6, 0.7, 0.8]] }`;

  try {
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: imageBase64.split(',')[1],
          mimeType: imageBase64.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)?.[1] || 'image/jpeg'
        }
      }
    ]);

    const responseText = result.response.text();
    let cleanedText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleanedText);
    return {
      skinBoxes: parsed.skinBoxes || []
    };
  } catch (error) {
    console.error("Erro no Gemini Vision Skin Analysis:", error);
    return { skinBoxes: [] };
  }
};

export const analyzeImageForGlobalRefinement = async (originalBase64: string, vtonBase64: string): Promise<string> => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) throw new Error("Chave da API do Gemini não configurada.");

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    generationConfig: { temperature: 0.1, topP: 0.1 }
  });

const prompt = `You are an elite RESTORER and Prompt Engineer. 
You will receive TWO images:
Image 1 is the Original Photo of the influencer.
Image 2 is the AI-generated Virtual Try-On (VTON) result with a new outfit but potentially plastic-looking skin.

Your task is to write a highly detailed but RESTRICTIVE prompt for an Image-to-Image inpainting model.
CRITICAL MANDATE:
"Use Image 1 as the mandatory reference for skin texture, tone, lighting, and epidermal details. Preserve the clothing generated in Image 2. Do not alter face, hair, pose, background, or clothing geometry. Correct ONLY the skin texture so it matches Image 1."
Describe the exact microtexture, pores, small imperfections, natural reflections, and tonal variations seen in Image 1's skin. DO NOT ask for 'realism'. Ask for 'photographic microtexture, pores, natural reflections'. 
Your output prompt MUST start with: "You are a RESTORER. Preserve exactly: face, hair, pose, background, clothing geometry. Copy the exact skin microtexture, pores, and natural reflections from the original reference..."
Return ONLY the prompt string.`;

  try {
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: originalBase64.split(',')[1],
          mimeType: originalBase64.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)?.[1] || 'image/jpeg'
        }
      },
      {
        inlineData: {
          data: vtonBase64.split(',')[1],
          mimeType: vtonBase64.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)?.[1] || 'image/jpeg'
        }
      }
    ]);
    return result.response.text().trim();
  } catch (error) {
    console.error("Erro no Gemini Vision Global Refinement:", error);
    return "You are a RESTORER. Preserve exactly: face, hair, pose, background, clothing geometry. Restore skin microtexture, pores, natural reflections, epidermal grain. Do not alter seams, fit, or lighting.";
  }
};
