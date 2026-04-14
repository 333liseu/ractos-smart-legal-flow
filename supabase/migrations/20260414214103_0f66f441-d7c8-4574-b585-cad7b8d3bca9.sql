
-- Templates de documentos simples
CREATE TABLE public.document_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  categoria text NOT NULL,
  descricao text,
  conteudo_template text,
  ativo boolean NOT NULL DEFAULT true,
  usos integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.document_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all access to document_templates"
  ON public.document_templates FOR ALL
  TO public USING (true) WITH CHECK (true);

CREATE TRIGGER update_document_templates_updated_at
  BEFORE UPDATE ON public.document_templates
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Runs de geração
CREATE TABLE public.document_generation_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id uuid REFERENCES public.document_templates(id),
  cliente_id uuid REFERENCES public.clientes(id),
  case_id uuid REFERENCES public.workspace_cases(id),
  process_id uuid REFERENCES public.workspace_processes(id),
  prompt text,
  status text NOT NULL DEFAULT 'pendente',
  documento_final text,
  documento_docx_path text,
  campos_extraidos jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.document_generation_runs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all access to document_generation_runs"
  ON public.document_generation_runs FOR ALL
  TO public USING (true) WITH CHECK (true);

CREATE TRIGGER update_document_generation_runs_updated_at
  BEFORE UPDATE ON public.document_generation_runs
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Arquivos anexados à geração
CREATE TABLE public.document_generation_files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  run_id uuid NOT NULL REFERENCES public.document_generation_runs(id) ON DELETE CASCADE,
  nome_arquivo text NOT NULL,
  caminho_storage text NOT NULL,
  tipo_arquivo text,
  campos_extraidos jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.document_generation_files ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all access to document_generation_files"
  ON public.document_generation_files FOR ALL
  TO public USING (true) WITH CHECK (true);

-- Bucket para arquivos de geração
INSERT INTO storage.buckets (id, name, public) VALUES ('doc-generation', 'doc-generation', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Allow all access to doc-generation bucket"
  ON storage.objects FOR ALL
  TO public USING (bucket_id = 'doc-generation') WITH CHECK (bucket_id = 'doc-generation');

-- Seed templates
INSERT INTO public.document_templates (nome, categoria, descricao) VALUES
  ('Procuração', 'Representação', 'Procuração ad judicia et extra'),
  ('Substabelecimento com reserva', 'Representação', 'Substabelecimento com reserva de poderes'),
  ('Substabelecimento sem reserva', 'Representação', 'Substabelecimento sem reserva de poderes'),
  ('Carta de preposição', 'Representação', 'Carta de preposição para audiência'),
  ('Autorização', 'Representação', 'Autorização genérica'),
  ('Proposta de Honorários', 'Honorários e Comercial', 'Proposta comercial de serviços jurídicos'),
  ('Contrato de Honorários', 'Honorários e Comercial', 'Contrato de prestação de serviços advocatícios'),
  ('Recibo', 'Honorários e Comercial', 'Recibo de pagamento de honorários'),
  ('Aditivo simples', 'Honorários e Comercial', 'Aditivo contratual simples'),
  ('Guia de Custas', 'Financeiro e Custas', 'Guia para recolhimento de custas processuais'),
  ('RPV', 'Financeiro e Custas', 'Requisição de Pequeno Valor'),
  ('Dados para NF', 'Financeiro e Custas', 'Dados para emissão de nota fiscal'),
  ('Declaração de hipossuficiência', 'Declarações', 'Declaração de hipossuficiência econômica'),
  ('Declaração de residência', 'Declarações', 'Declaração de residência'),
  ('Declaração de comparecimento', 'Declarações', 'Declaração de comparecimento em audiência'),
  ('Termo de ciência', 'Declarações', 'Termo de ciência e concordância'),
  ('Declaração de responsabilidade', 'Declarações', 'Declaração de responsabilidade'),
  ('Declaração livre assistida', 'Declarações', 'Declaração livre com assistência de IA'),
  ('Petição de juntada', 'Petições Simples', 'Petição para juntada de documentos'),
  ('Pedido de prioridade', 'Petições Simples', 'Pedido de tramitação prioritária'),
  ('Pedido de tramitação prioritária', 'Petições Simples', 'Pedido fundamentado de tramitação prioritária'),
  ('Petição simples de informação', 'Petições Simples', 'Petição simples para solicitar informações'),
  ('Requerimento simples', 'Petições Simples', 'Requerimento genérico ao juízo');
