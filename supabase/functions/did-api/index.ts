import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const FAL_API_KEY = "f98afc7c-a671-413a-ab90-abf8a46bd39e:188b2ca4044b9985e1af1544658282f3";

const MASTERPIECE_PROMPT = `Award-winning portrait photography, 8k resolution masterpiece.
Ultra-realistic, pristine cinematic lighting, soft glowing sunlight.
Shallow depth of field, 85mm lens, beautiful bokeh background.
High fashion editorial quality, flawless skin texture, highly detailed face.
Authentic beauty, highly detailed eyes, natural elegant posture.
Absolutely zero CGI or plastic AI artifacts. Photorealistic human perfection.
The person MUST look like a real high-end fashion model influencer.`;

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

      const uploadedBase64 = userPayload.image_base64; 

      // DECISÃO FINAL: Se enviou foto, ANIMAR EXATAMENTE AQUELA FOTO. Bypass total na inteligência de Texto.
      if (uploadedBase64 && uploadedBase64.includes("base64,")) {
         return new Response(JSON.stringify({
            data: {
              status: "success",
              image_url: uploadedBase64,
              enhanced_prompt: "User Custom Upload (Bypassing Flux Generation for Absolute Realism Fidelity)"
            }
         }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }

      // Caso ele não mandou foto, gera uma com Flux Pro Mestre
      const rawText = userPayload.text || userPayload.tipo || "Influenciadora brasileira";
      const enhancedPrompt = `${MASTERPIECE_PROMPT}\n\nSCENE SETTING AND ACTION TO RENDER EXACTLY: ${rawText}`;

      const fluxReq = await fetch("https://fal.run/fal-ai/flux-pro/v1.1", {
         method: "POST",
         headers: {
            "Authorization": `Key ${FAL_API_KEY}`,
            "Content-Type": "application/json"
         },
         body: JSON.stringify({
           prompt: enhancedPrompt,
           aspect_ratio: "9:16",
           safety_tolerance: "5"
         })
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

      const rawText = payload.text || "Walking naturally";

      const silentConstraint = "The person MUST keep their mouth completely closed. Silent observation. Stable face. Do not morph the limbs.";
      const promptMotion = `Extremely smooth, perfectly fluid 60fps cinematic motion. No lag, no stuttering. Highly realistic dynamic movement.\n\n${silentConstraint}\n\nACTION TO ANIMATE EXACTLY: ${rawText}\n\nMaintain structural stability and perfect facial consistency. Seamless action without lagging. Retain exact physical aesthetics of the provided image.`;

      const videoReq = await fetch("https://queue.fal.run/fal-ai/kling-video/v1.5/pro/image-to-video", {
         method: "POST",
         headers: { "Authorization": `Key ${FAL_API_KEY}`, "Content-Type": "application/json" },
         body: JSON.stringify({ 
              image_url: payload.image_url, 
              prompt: promptMotion,
              duration: "5",
              aspect_ratio: "9:16"
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

    return new Response(JSON.stringify({ error: `Method or Action unknown: ${req.method} ${action}` }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 404,
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
