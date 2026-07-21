// @ts-nocheck
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const FAL_API_KEY = "f98afc7c-a671-413a-ab90-abf8a46bd39e:188b2ca4044b9985e1af1544658282f3";
const REPLICATE_API_TOKEN = Deno.env.get("REPLICATE_API_TOKEN");

// O Prompt de realismo absoluto agora é gerado e injetado pelo Gemini no Frontend.

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    let action = url.searchParams.get('action');

    let body = null;
    if (req.method === 'POST') {
      try {
        body = await req.json();
        if (body && body.action) {
          action = body.action;
        }
      } catch (e) {
        // Ignora
      }
    }

    if (!action) action = 'stage1';

    // ==========================================
    // STAGE 1: GERAR IMAGEM (OU BYPASS SE O USER FIZER UPLOAD)
    // ==========================================
    if (req.method === 'POST' && action === 'stage1') {
      const userPayload = body?.payload || body;
      if (!userPayload) throw new Error("Missing payload in request body");

      const baseImageBase64 = userPayload.base_image_base64;
      const swapImageBase64 = userPayload.swap_image_base64;
      const uploadedBase64 = userPayload.image_base64; 

      // DECISÃO FINAL: Se enviou foto (apenas em modos casuais, não Clone), ANIMAR EXATAMENTE AQUELA FOTO. Bypass total.
      if (uploadedBase64 && uploadedBase64.includes("base64,") && !baseImageBase64) {
         return new Response(JSON.stringify({
            data: {
              status: "success",
              image_url: uploadedBase64,
              enhanced_prompt: "User Custom Upload (Bypassing Flux Generation for Absolute Realism Fidelity)"
            }
         }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }

      // Caso contrário, gera uma com Flux Pro Mestre
      // O frontend ou o fallback já cuidam do texto base, mas aplicamos um filtro RAW brutal para vídeos UGC
      let enhancedPrompt = userPayload.text || "Ultra realistic raw photo of a brazilian influencer, casual everyday lighting, highly detailed.";

      // Mestre constraint estáticos para eliminar falhas de motor (Anti-Plástico, Realismo)
      if (userPayload.view === 'cinematico') {
          const cinematicConstraint = "Cinematic 8k masterpiece photo, ARRI Alexa 65, dramatic studio lighting, ultra-photorealistic, highly detailed, perfect composition, depth of field, vivid colors. Natural human skin texture. ZERO VISUAL BUGS OR DEFORMATIONS. EXACT SCENE AND CONTEXT TO GENERATE: ";
          enhancedPrompt = cinematicConstraint + (userPayload.text || "");
      } else if (userPayload.view === 'influencer-ia' || userPayload.tipo === 'ugc') {
          const rawConstraint = "RAW candid photo, ultra-photorealistic, shot on iPhone 15 Pro, highly detailed, casual everyday lighting, natural imperfect human skin texture, visible micropores, no instagram filters, uncut, amateur photography aesthetics. DO NOT generate shiny plastic skin. EXACT SCENE AND CONTEXT TO GENERATE: ";
          enhancedPrompt = rawConstraint + (userPayload.text || "");
      }

      const fluxPayload: any = {
           prompt: enhancedPrompt,
           aspect_ratio: userPayload.aspect_ratio || "9:16",
           raw: true,
           safety_tolerance: "5"
      };

      // MODO CLONE IA: Roteamento Bifurcado (Face-Swap Geométrico vs Substituição de Personagem Pulid HD com MASTER PROMPT)
      if (baseImageBase64 && swapImageBase64) {
          
          if (userPayload.tipo === 'Clone (Celebridades)') {
              let mappedSize = "portrait_4_3";
              if (userPayload.aspect_ratio === "1:1") mappedSize = "square_hd";
              else if (userPayload.aspect_ratio === "16:9") mappedSize = "landscape_4_3";

              // ORDEM ESTRITA DO USUÁRIO NA ÍNTEGRA:
              const userCommandContext = "Crie uma imagem da celebridade usando o mesmo cenário e substituindo 100% a imagem da pessoa de imagem de base. ";
              const finalPrompt = userCommandContext + (userPayload.text || "Ultra-photorealistic 8k cinematic masterpiece.");

              const pulidReq = await fetch("https://fal.run/fal-ai/flux-pulid", {
                 method: "POST",
                 headers: {
                    "Authorization": `Key ${FAL_API_KEY}`,
                    "Content-Type": "application/json"
                 },
                 body: JSON.stringify({
                    prompt: finalPrompt,
                    reference_image_url: swapImageBase64,
                    image_url: baseImageBase64, // A API ENXERGA O CENÁRIO REAL DA BASE
                    strength: 0.75, // Força rebaixada para 0.75: obriga a máquina a "travar" 25% dos pixels do cenário, fundindo perfeitamente sem perder o fundo!
                    image_size: mappedSize,
                    num_inference_steps: 30, 
                    guidance_scale: 3.5, 
                    id_weight: 1.0 
                 })
              });
              const pulidRes = await pulidReq.json();
              
              let finalUrl = pulidRes.image?.url;
              if (!finalUrl && pulidRes.images && pulidRes.images[0]?.url) {
                  finalUrl = pulidRes.images[0].url;
              }
              if (!finalUrl) throw new Error("Falha no Modelo PuLID: " + JSON.stringify(pulidRes));
              
              return new Response(JSON.stringify({
                 data: {
                   status: "success",
                   image_url: finalUrl,
                   enhanced_prompt: "Mandated LVM Prompt + Negative Injection Applied"
                 }
              }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
          }

          // Rota: Influencer Clone -> Substituição Facial 1:1 Restrita
          const swapReq = await fetch("https://fal.run/fal-ai/face-swap", {
             method: "POST",
             headers: {
                "Authorization": `Key ${FAL_API_KEY}`,
                "Content-Type": "application/json"
             },
             body: JSON.stringify({
                base_image_url: baseImageBase64,
                swap_image_url: swapImageBase64
             })
          });
          const swapRes = await swapReq.json();
          if (!swapRes.image || !swapRes.image.url) {
              if (swapRes.images && swapRes.images[0] && swapRes.images[0].url) {
                  return new Response(JSON.stringify({
                     data: {
                       status: "success",
                       image_url: swapRes.images[0].url,
                       enhanced_prompt: enhancedPrompt
                     }
                  }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
              }
              throw new Error("Falha no Face Swap API: " + JSON.stringify(swapRes));
          }
          return new Response(JSON.stringify({
             data: {
               status: "success",
               image_url: swapRes.image.url,
               enhanced_prompt: enhancedPrompt
             }
          }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }

      // Rota Alternativa: POV (Mostrando Produto) -> FLUX Inpainting (Preenchimento Real do Produto)
      if (userPayload.tipo === 'POV (mostrando produto)' && userPayload.base_image_base64 && userPayload.mask_url) {
          const fillPayload = {
             prompt: enhancedPrompt,
             image_url: userPayload.base_image_base64,
             mask_url: userPayload.mask_url,
             output_format: "png",
             safety_tolerance: "5",
             prompt_upsampling: false, // TRAVA DE SEGURANÇA: Impede a IA de tentar "reescrever" nosso prompt perfeitamente arquitetado gerando resultados aleatórios.
             guidance_scale: 6.5,      // FORÇA BRUTA: Obriga o motor a respeitar a textura de pele e anatomia à risca em vez da criatividade da máquina.
             num_inference_steps: 40   // DETALHAMENTO MÁXIMO: Estabiliza a física de mãos e realismo das sombras do produto.
          };
          
          const fillReq = await fetch("https://fal.run/fal-ai/flux-pro/v1/fill", {
             method: "POST",
             headers: {
                "Authorization": `Key ${FAL_API_KEY}`,
                "Content-Type": "application/json"
             },
             body: JSON.stringify(fillPayload)
          });
          
          const fillRes = await fillReq.json();
          if (!fillRes.images || fillRes.images.length === 0) {
              throw new Error("Flux Pro Fill API falhou: " + JSON.stringify(fillRes));
          }
          
          return new Response(JSON.stringify({
             data: {
               status: "success",
               image_url: fillRes.images[0].url,
               enhanced_prompt: enhancedPrompt
             }
          }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }

      // Rota Padrão: Influencer UGC / Cenário Cinematográfico -> Flux Pro
      const fluxReq = await fetch("https://fal.run/fal-ai/flux-pro/v1.1-ultra", {
         method: "POST",
         headers: {
            "Authorization": `Key ${FAL_API_KEY}`,
            "Content-Type": "application/json"
         },
         body: JSON.stringify(fluxPayload)
      });
      
      const fluxRes = await fluxReq.json();
      if (!fluxRes.images || fluxRes.images.length === 0) {
          throw new Error("Flux API falhou ao gerar imagem nativa: " + JSON.stringify(fluxRes));
      }

      const falImageUrl = fluxRes.images[0].url;

      return new Response(JSON.stringify({
         data: {
           status: "success",
           image_url: falImageUrl,
           enhanced_prompt: enhancedPrompt
         }
      }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    // ==========================================
    // STAGE 2: GERAR VÍDEO DO MOVIMENTO (KLING 1.5 PRO)
    // ==========================================
    if (req.method === 'POST' && action === 'stage2') {
      const payload = body?.payload || body;
      if (!payload || !payload.image_url) throw new Error("Missing image_url for Stage 2");

      const rawText = payload.text || "Moving naturally";

      const silentConstraint = "The person MUST keep their mouth completely closed. Silent observation. Stable face. Do not morph the limbs.";
      
      let promptMotion = "";
      if (payload.view === 'cinematico') {
          promptMotion = `Extremely smooth, perfectly fluid cinematic camera movement, majestic 60fps. Hollywood high-end production, dramatic lighting, deep depth of field. High definition cinematic video.\n\n${silentConstraint}\n\nACTION TO ANIMATE EXACTLY: ${rawText}\n\nMaintain strict structural stability, perfect cinematic lighting, and perfect facial consistency. Seamless action. ZERO VISUAL BUGS. Flawless human anatomy, highly natural facial micro-expressions. Retain exact physical aesthetics of the provided image WITHOUT adding unstable AI deformations.`;
      } else {
          // Default: UGC Handheld Realism
          promptMotion = `UGC handheld smartphone camera aesthetics, natural organic motion, realistic real-world physics. Authentic everyday recording, slight natural hand shake. High definition raw footage, NOT cinematic, NOT artificially smooth 60fps.\n\n${silentConstraint}\n\nACTION TO ANIMATE EXACTLY: ${rawText}\n\nMaintain strict structural stability, imperfect natural lighting, and perfect facial consistency. Seamless organic action. ZERO VISUAL BUGS. Flawless human anatomy, highly natural facial micro-expressions. Retain exact physical aesthetics, clothing fabric textures, and skin micropores of the provided image WITHOUT adding plastic AI filters or sheen.`;
      }

      // Mapeamento de Duração: Kling 1.5 suporta 5s ou 10s nativamente. Mapeamos os selects do usuário (8, 15, 30) pro máximo possível:
      let finalDuration = "5";
      if (payload.duracao) {
          const dVal = parseInt(payload.duracao);
          if (dVal >= 8) finalDuration = "10";
      }

      const negativePrompt = "visual bugs, distorted body parts, morphed limbs, weird facial expressions, unnatural eye movements, extra fingers, bad anatomy, blur, watermark, text, AI deformations, plastic face, glitches, unstable background, tearing, warping, weird eyes, floating limbs, third arm";

      const videoReq = await fetch("https://queue.fal.run/fal-ai/kling-video/v1.5/pro/image-to-video", {
         method: "POST",
         headers: { "Authorization": `Key ${FAL_API_KEY}`, "Content-Type": "application/json" },
         body: JSON.stringify({ 
              image_url: payload.image_url, 
              prompt: promptMotion,
              negative_prompt: negativePrompt,
              duration: finalDuration,
              aspect_ratio: payload.aspect_ratio || "9:16"
         })
      });

      const videoRes = await videoReq.json();
      if (!videoRes.request_id) throw new Error("Falha ao iniciar Kling Pro na Fal.ai: " + JSON.stringify(videoRes));

      return new Response(JSON.stringify({
         data: {
           status: "processing",
           kling_request_id: videoRes.request_id // Mantido para Frontend
         }
      }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    // ==========================================
    // STAGE POV: GERAR VÍDEO MOSTRANDO PRODUTO
    // ==========================================
    if (req.method === 'POST' && action === 'generate_pov') {
      const payload = body?.payload || body;
      if (!payload || !payload.image_url) throw new Error("Missing image_url for POV generator.");

      const rawText = payload.text || "influencer with the product";
      // We instruct Kling that the image is a product, and the camera should pan out to reveal the influencer holding/interacting with it.
      const promptMotion = `Cinematic 4K dynamic commercial shot. The video starts focusing tightly on the EXACT provided product. The camera smoothly and realistically pulls back/zooms out to reveal a highly photorealistic ${rawText}. She is actively holding, wearing, or interacting with the product naturally. Professional studio lighting, seamless physics, extremely realistic human features and body movements. The product MUST remain matching the source image seamlessly.`;

      const videoReq = await fetch("https://queue.fal.run/fal-ai/kling-video/v1.5/pro/image-to-video", {
         method: "POST",
         headers: { "Authorization": `Key ${FAL_API_KEY}`, "Content-Type": "application/json" },
         body: JSON.stringify({ 
              image_url: payload.image_url, 
              prompt: promptMotion,
              duration: "5",
              aspect_ratio: payload.aspect_ratio || "9:16"
         })
      });

      const videoRes = await videoReq.json();
      if (!videoRes.request_id) throw new Error("Falha ao iniciar Kling Pro POV na Fal.ai: " + JSON.stringify(videoRes));

      return new Response(JSON.stringify({
         data: {
           status: "processing",
           kling_request_id: videoRes.request_id
         }
      }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    // ==========================================
    // POLLING: BUSCANDO O STATUS GERAL NA FAL
    // ==========================================
    if (req.method === 'GET' && action === 'status') {
      const requestId = url.searchParams.get('request_id');
      
      if (!requestId) throw new Error("request_id parameter is required");
      
      const baseEndpoint = "kling-video/requests";

      const authHeaders = { "Authorization": `Key ${FAL_API_KEY}` };
      
      const pollReq = await fetch(`https://queue.fal.run/fal-ai/${baseEndpoint}/${requestId}/status`, {
         method: "GET",
         headers: authHeaders
      });

      if (!pollReq.ok) {
         return new Response(JSON.stringify({ error: `Polling Fal.ai request rejected: ${pollReq.status} ${pollReq.statusText}` }), {
             status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
         });
      }

      const pollRes = await pollReq.json();
      
      let unifiedStatus = "processing";
      let finalUrl = null;

      if (pollRes.status === "COMPLETED") {
          const resultReq = await fetch(`https://queue.fal.run/fal-ai/${baseEndpoint}/${requestId}`, {
              method: "GET",
              headers: authHeaders
          });
          
          if (!resultReq.ok) {
              return new Response(JSON.stringify({ error: `Result Fal.ai request rejected: ${resultReq.status} ${resultReq.statusText}` }), {
                 status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
              });
          }

          const resultRes = await resultReq.json();
          
          if (resultRes.video && resultRes.video.url) {
              unifiedStatus = "completed";
              finalUrl = resultRes.video.url;
          } else if (resultRes.detail) {
              throw new Error("Fal.ai Erro de Renderização: " + JSON.stringify(resultRes.detail));
          } else {
              if (resultRes.url) { unifiedStatus = "completed"; finalUrl = resultRes.url; }
              else throw new Error("Fal.ai Erro Desconhecido ao extrair asset: " + JSON.stringify(resultRes));
          }
      } else if (pollRes.status === "ERROR" || pollRes.status === "REJECTED" || pollRes.status === "CANCELED") {
          throw new Error(`Fal.ai Queue Status Falhou: ${pollRes.status}`);
      }

      return new Response(JSON.stringify({
         data: { status: unifiedStatus, result_url: finalUrl, raw_status: pollRes.status }
      }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    // ==========================================
    // STAGE IMITAR: POSE TRANSFER (REPLICATE - MIMICMOTION)
    // ==========================================
    if (req.method === 'POST' && action === 'stage_imitar') {
      const payload = body?.payload || body;
      if (!payload || !payload.image_url || !payload.video_url) {
         throw new Error("Missing image_url or video_url for Imitar Movimentos.");
      }

      if (!REPLICATE_API_TOKEN) {
         throw new Error("⚠️ REPLICATE_API_TOKEN não está configurado nas variáveis de ambiente. Esta engine de Imitar Movimentos (MimicMotion) exige integração com a Replicate.com");
      }

      const repReq = await fetch("https://api.replicate.com/v1/predictions", {
         method: "POST",
         headers: {
            "Authorization": `Token ${REPLICATE_API_TOKEN}`,
            "Content-Type": "application/json"
         },
         body: JSON.stringify({
            version: "b3edd455f68ec4ccf045da8732be7db837cb8832d1a2459ef057ddcd3ff87dea",
            input: {
               appearance_image: payload.image_url,
               motion_video: payload.video_url
            }
         })
      });

      const repRes = await repReq.json();
      
      if (!repReq.ok) {
         throw new Error(`Falha ao iniciar inteligência Replicate: ${JSON.stringify(repRes)}`);
      }

      return new Response(JSON.stringify({
         data: {
           status: "processing",
           request_id: repRes.id
         }
      }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    // ==========================================
    // POLLING IMITAR: STATUS NA REPLICATE
    // ==========================================
    if (req.method === 'GET' && action === 'status_imitar') {
      const requestId = url.searchParams.get('request_id');
      if (!requestId) throw new Error("request_id parameter is required");

      const pollReq = await fetch(`https://api.replicate.com/v1/predictions/${requestId}`, {
         method: "GET",
         headers: {
            "Authorization": `Token ${REPLICATE_API_TOKEN}`,
            "Content-Type": "application/json"
         }
      });

      if (!pollReq.ok) {
         return new Response(JSON.stringify({ error: `Polling Replicate falhou: ${pollReq.status}` }), {
             status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
         });
      }

      const pollRes = await pollReq.json();
      
      let unifiedStatus = "processing";
      let finalUrl = null;

      if (pollRes.status === "succeeded") {
          unifiedStatus = "succeeded";
          finalUrl = pollRes.output; // url do .mp4 final gerado
      } else if (pollRes.status === "failed" || pollRes.status === "canceled") {
          throw new Error(`MimicMotion Falhou ou foi Cancelado: ${pollRes.error || pollRes.status}`);
      }

      return new Response(JSON.stringify({
         data: { status: unifiedStatus, output: finalUrl }
      }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    throw new Error("Ação não encontrada: " + action);

  } catch (error: any) {
    console.error(`Edge Function Error (${req.method}):`, error.message, error);
    return new Response(JSON.stringify({ error: error.message || error }), { 
      status: 400, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
