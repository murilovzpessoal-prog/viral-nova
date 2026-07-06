-- Criação das tabelas para persistência de longo prazo no Supabase

-- 1. Rascunhos (Validade de 7 dias)
CREATE TABLE IF NOT EXISTS public.drafts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  media jsonb NOT NULL DEFAULT '[]'::jsonb,
  timeline_videos jsonb NOT NULL DEFAULT '[]'::jsonb,
  timeline_texts jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.drafts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own drafts" ON public.drafts
  FOR ALL USING (auth.uid() = user_id);

-- 2. Avatares Manuais (Permanentes)
CREATE TABLE IF NOT EXISTS public.custom_avatars (
  id text PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  image text NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.custom_avatars ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own avatars" ON public.custom_avatars
  FOR ALL USING (auth.uid() = user_id);

-- 3. Produtos Manuais (Permanentes)
CREATE TABLE IF NOT EXISTS public.custom_products (
  id text PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  image text NOT NULL,
  price text NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.custom_products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own products" ON public.custom_products
  FOR ALL USING (auth.uid() = user_id);

-- 4. Função e Trigger para atualizar o updated_at dos rascunhos automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = now();
   RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_drafts_updated_at ON public.drafts;
CREATE TRIGGER update_drafts_updated_at
BEFORE UPDATE ON public.drafts
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- 5. Função de Limpeza Automática de Rascunhos com mais de 7 dias
-- Esta função pode ser chamada automaticamente (Lazy Cleanup) toda vez que um rascunho for inserido,
-- garantindo que o banco de dados se limpe periodicamente sem depender do pg_cron.
CREATE OR REPLACE FUNCTION cleanup_old_drafts()
RETURNS TRIGGER AS $$
BEGIN
  DELETE FROM public.drafts WHERE created_at < now() - interval '7 days';
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS trigger_cleanup_drafts ON public.drafts;
CREATE TRIGGER trigger_cleanup_drafts
AFTER INSERT ON public.drafts
FOR EACH ROW
EXECUTE FUNCTION cleanup_old_drafts();
