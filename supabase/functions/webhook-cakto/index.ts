// @ts-nocheck
// Setup type definitions for built-in Supabase Runtime APIs
import "@supabase/functions-js/edge-runtime.d.ts";
import { withSupabase } from "@supabase/server";

// CORS headers to allow requests from anywhere (since Cakto will send the webhook)
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

export default {
  fetch: withSupabase({ auth: ["publishable", "secret", "none"] }, async (req, ctx) => {
    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
      return new Response('ok', { headers: corsHeaders });
    }

    try {
      // Pega o corpo da requisição do Webhook da Cakto
      const payload = await req.json();
      console.log("Cakto Webhook Payload:", JSON.stringify(payload, null, 2));

      // Extrai o e-mail do cliente (isso pode variar dependendo do formato exato da Cakto, então tentamos os caminhos mais comuns)
      const email = 
        payload?.customer?.email || 
        payload?.data?.customer?.email || 
        payload?.email ||
        payload?.client?.email;

      if (!email) {
        console.error("E-mail não encontrado no payload do webhook.");
        return new Response(JSON.stringify({ error: "E-mail não encontrado no payload." }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      console.log(`Tentando criar usuário com e-mail: ${email}`);

      // Senha padrão definida pelo usuário
      const defaultPassword = "viral2026k";

      // Usa a API Admin do Supabase para criar o usuário e confirmar o e-mail automaticamente
      const { data, error } = await ctx.supabaseAdmin.auth.admin.createUser({
        email: email,
        password: defaultPassword,
        email_confirm: true, // Já confirma o e-mail pra pessoa não precisar clicar em link
      });

      if (error) {
        // Se o usuário já existe, o Supabase retorna um erro. Vamos logar e retornar sucesso para a Cakto parar de tentar.
        if (error.message.includes("already registered") || error.message.includes("already exists")) {
          console.log(`Usuário ${email} já existe.`);
          return new Response(JSON.stringify({ message: "Usuário já existia.", user: email }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        
        console.error("Erro ao criar usuário no Supabase:", error);
        throw error;
      }

      console.log("Usuário criado com sucesso:", data.user?.id);

      return new Response(JSON.stringify({ 
        message: "Usuário criado com sucesso!",
        userId: data.user?.id 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });

    } catch (err) {
      console.error("Erro interno no Webhook:", err);
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  }),
};
