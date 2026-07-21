// @ts-nocheck
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': '*' } });
  }

  try {
    const payload = await req.json();
    console.log("Cakto Webhook Payload received:", JSON.stringify(payload));
    
    // ======== VALIDAÇÃO DE SEGURANÇA (BLINDADA) ========
    const urlToken = new URL(req.url).searchParams.get('token');
    const authHeader = req.headers.get('authorization') || req.headers.get('x-api-key') || req.headers.get('x-cakto-signature');
    const CAKTO_SECRET = Deno.env.get('CAKTO_CLIENT_SECRET');

    if (!CAKTO_SECRET) {
      console.error("ERRO GRAVE: CAKTO_CLIENT_SECRET não encontrado no Edge Config.");
      return new Response("Server Misconfigured", { status: 500 });
    }

    if (urlToken !== CAKTO_SECRET && !(authHeader || '').includes(CAKTO_SECRET)) {
       console.error("⚠️ TENTATIVA DE INVASÃO BLOQUEADA: Credenciais Inválidas ou Ausentes!");
       return new Response("Unauthorized", { status: 401 });
    }
    // ===================================================
    
    const event = payload?.event || payload?.type;
    const status = payload?.data?.status || payload?.status;
    
    // Aceita variações de status dependendo do Gateway Cakto
    const isApproved = 
      event === 'charge.succeeded' || 
      event === 'payment.approved' || 
      event === 'invoice.paid' ||
      status === 'approved' || 
      status === 'paid' || 
      status === 'authorized';

    const isRefunded = 
      event === 'charge.refunded' ||
      event === 'payment.refunded' ||
      event === 'purchase_refunded' ||
      status === 'refunded' || 
      status === 'chargeback' || 
      status === 'canceled' ||
      status === 'disputed';

    if (!isApproved && !isRefunded) {
       console.log(`Evento ignorado. Event: ${event}, Status: ${status}`);
       return new Response("Ignorado, não é um evento de aprovação de pagamento nem reembolso", { status: 200 });
    }

    const email = payload?.data?.customer?.email || payload?.customer?.email || payload?.data?.email;
    const productName = (payload?.data?.product?.name || payload?.product?.name || payload?.data?.plan?.name || '').toLowerCase();
    
    if (!email) {
      console.error("Erro: Nenhum email encontrado no payload do Cakto.");
      return new Response("Nenhum email localizado no payload", { status: 400 });
    }

    let creditsToAdd = 0;
    
    // Mapeamento baseado nos links Cakto enviados pelo usuário
    if (productName.includes('450')) creditsToAdd = 450;
    else if (productName.includes('900')) creditsToAdd = 900;
    else if (productName.includes('1000')) creditsToAdd = 1000;
    else if (productName.includes('1850')) creditsToAdd = 1850;
    else if (productName.includes('2000')) creditsToAdd = 2000;
    else if (productName.includes('5000')) creditsToAdd = 5000;
    else if (productName.includes('10000')) creditsToAdd = 10000;
    else if (productName.includes('starter')) creditsToAdd = 500;
    else if (productName.includes('creator')) creditsToAdd = 1000;
    else if (productName.includes('pro')) creditsToAdd = 2500;
    else if (productName.includes('business')) creditsToAdd = 6000;
    else {
      // Tenta pegar de metadata
      const customCredits = parseInt(payload?.data?.metadata?.credits || payload?.metadata?.credits || '0', 10);
      if (customCredits > 0) creditsToAdd = customCredits;
    }

    if (creditsToAdd <= 0) {
      console.warn(`Produto não mapeado ou créditos zero. Produto: ${productName}`);
      return new Response(`Sem créditos mapeados para ${productName}`, { status: 200 });
    }

    // Inicializa Supabase Client Bypassing RLS with SERVICE_ROLE_KEY
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // ==========================================
    // FLUXO DE REEMBOLSO (DELEÇÃO DE USUÁRIO)
    // ==========================================
    if (isRefunded) {
      console.log(`💳 REEMBOLSO DETECTADO para: ${email}. O apagador de contas foi ativado.`);
      const { data, error } = await supabaseClient.rpc('delete_user_by_email', { target_email: email });
      if (error) {
         console.error("Erro Fatal no Delete User RPC:", error);
         throw error;
      }
      console.log(`✅ Conta banida! O usuário ${email} foi DELETADO com sucesso da tabela Authentication e Profiles.`);
      return new Response(JSON.stringify({ success: true, email, action: 'deleted_due_to_refund' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      });
    }
    // ==========================================

    console.log(`Iniciando RPC increment_credits_by_email para: ${email} (+${creditsToAdd})`);

    const { data, error } = await supabaseClient.rpc('increment_credits_by_email', {
      user_email: email,
      amount: creditsToAdd
    });

    if (error) {
       console.error("Erro Supabase RPC:", error);
       throw error;
    }

    console.log(`✅ Sucesso Absoluto: ${creditsToAdd} creditos injetados na conta de ${email}`);

    return new Response(JSON.stringify({ success: true, email, added: creditsToAdd }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (err: any) {
    console.error("❌ Webhook falhou catastroficamente:", err.message);
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
