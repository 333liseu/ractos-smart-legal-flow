
-- Create clientes table
CREATE TABLE public.clientes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome_razao_social TEXT NOT NULL,
  tipo_pessoa TEXT DEFAULT 'PF',
  cpf_cnpj TEXT,
  email TEXT,
  telefone TEXT,
  celular TEXT,
  status TEXT DEFAULT 'Ativo',
  tipo_contrato TEXT,
  responsavel_interno TEXT,
  endereco TEXT,
  cidade TEXT,
  estado TEXT,
  cep TEXT,
  observacoes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.clientes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all access to clientes" ON public.clientes FOR ALL USING (true) WITH CHECK (true);

-- Create cliente_documentos table
CREATE TABLE public.cliente_documentos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  cliente_id UUID NOT NULL REFERENCES public.clientes(id) ON DELETE CASCADE,
  nome_arquivo TEXT NOT NULL,
  categoria TEXT DEFAULT 'Outros',
  caminho_storage TEXT NOT NULL,
  url_arquivo TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.cliente_documentos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all access to cliente_documentos" ON public.cliente_documentos FOR ALL USING (true) WITH CHECK (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_clientes_updated_at
  BEFORE UPDATE ON public.clientes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('clientes-documentos', 'clientes-documentos', true);

CREATE POLICY "Allow public read on clientes-documentos" ON storage.objects FOR SELECT USING (bucket_id = 'clientes-documentos');
CREATE POLICY "Allow public upload on clientes-documentos" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'clientes-documentos');
CREATE POLICY "Allow public delete on clientes-documentos" ON storage.objects FOR DELETE USING (bucket_id = 'clientes-documentos');
