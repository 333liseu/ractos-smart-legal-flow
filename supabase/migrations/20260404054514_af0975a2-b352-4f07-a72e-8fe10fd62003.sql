
-- workspace_cases
CREATE TABLE public.workspace_cases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  cliente text,
  area_juridica text,
  relato text,
  status text DEFAULT 'Ativo',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.workspace_cases ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all access to workspace_cases" ON public.workspace_cases FOR ALL USING (true) WITH CHECK (true);
CREATE TRIGGER update_workspace_cases_updated_at BEFORE UPDATE ON public.workspace_cases FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- workspace_processes
CREATE TABLE public.workspace_processes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id uuid REFERENCES public.workspace_cases(id) ON DELETE CASCADE,
  numero_cnj text,
  nome text,
  cliente text,
  relato text,
  tribunal text,
  orgao_julgador text,
  classe_acao text,
  status text DEFAULT 'Em andamento',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.workspace_processes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all access to workspace_processes" ON public.workspace_processes FOR ALL USING (true) WITH CHECK (true);
CREATE TRIGGER update_workspace_processes_updated_at BEFORE UPDATE ON public.workspace_processes FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- workspace_conversations
CREATE TABLE public.workspace_conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id uuid REFERENCES public.workspace_cases(id) ON DELETE CASCADE,
  titulo text NOT NULL,
  agente text NOT NULL DEFAULT 'analise',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.workspace_conversations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all access to workspace_conversations" ON public.workspace_conversations FOR ALL USING (true) WITH CHECK (true);
CREATE TRIGGER update_workspace_conversations_updated_at BEFORE UPDATE ON public.workspace_conversations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- workspace_messages
CREATE TABLE public.workspace_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid REFERENCES public.workspace_conversations(id) ON DELETE CASCADE NOT NULL,
  role text NOT NULL DEFAULT 'user',
  content text NOT NULL,
  agente text,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.workspace_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all access to workspace_messages" ON public.workspace_messages FOR ALL USING (true) WITH CHECK (true);

-- workspace_files
CREATE TABLE public.workspace_files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id uuid REFERENCES public.workspace_cases(id) ON DELETE CASCADE,
  process_id uuid REFERENCES public.workspace_processes(id) ON DELETE SET NULL,
  nome_arquivo text NOT NULL,
  categoria text DEFAULT 'Outros',
  caminho_storage text NOT NULL,
  url_arquivo text,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.workspace_files ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all access to workspace_files" ON public.workspace_files FOR ALL USING (true) WITH CHECK (true);

-- workspace_memory
CREATE TABLE public.workspace_memory (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id uuid REFERENCES public.workspace_cases(id) ON DELETE CASCADE NOT NULL,
  chave text NOT NULL,
  valor text NOT NULL,
  tipo text DEFAULT 'contexto',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.workspace_memory ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all access to workspace_memory" ON public.workspace_memory FOR ALL USING (true) WITH CHECK (true);
CREATE TRIGGER update_workspace_memory_updated_at BEFORE UPDATE ON public.workspace_memory FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- workspace_outputs
CREATE TABLE public.workspace_outputs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id uuid REFERENCES public.workspace_cases(id) ON DELETE CASCADE,
  conversation_id uuid REFERENCES public.workspace_conversations(id) ON DELETE SET NULL,
  tipo text NOT NULL,
  titulo text NOT NULL,
  conteudo text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.workspace_outputs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all access to workspace_outputs" ON public.workspace_outputs FOR ALL USING (true) WITH CHECK (true);

-- Storage bucket for workspace files
INSERT INTO storage.buckets (id, name, public) VALUES ('workspace-files', 'workspace-files', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Allow all uploads to workspace-files" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'workspace-files');
CREATE POLICY "Allow all reads from workspace-files" ON storage.objects FOR SELECT USING (bucket_id = 'workspace-files');
CREATE POLICY "Allow all deletes from workspace-files" ON storage.objects FOR DELETE USING (bucket_id = 'workspace-files');
