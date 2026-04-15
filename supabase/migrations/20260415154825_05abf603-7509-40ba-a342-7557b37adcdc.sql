
-- 1. zap_conversations
CREATE TABLE public.zap_conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  channel_type text NOT NULL DEFAULT 'whatsapp',
  external_conversation_id text,
  client_id uuid REFERENCES public.clientes(id) ON DELETE SET NULL,
  process_id uuid REFERENCES public.workspace_processes(id) ON DELETE SET NULL,
  subject text,
  status text NOT NULL DEFAULT 'open',
  responsible_user_id text,
  ai_enabled boolean NOT NULL DEFAULT true,
  unread_count integer NOT NULL DEFAULT 0,
  last_message_at timestamptz,
  priority text DEFAULT 'normal',
  tags text[] DEFAULT '{}',
  client_name text,
  client_phone text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.zap_conversations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all access to zap_conversations" ON public.zap_conversations FOR ALL USING (true) WITH CHECK (true);

-- 2. zap_messages
CREATE TABLE public.zap_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid NOT NULL REFERENCES public.zap_conversations(id) ON DELETE CASCADE,
  sender_type text NOT NULL DEFAULT 'client',
  sender_user_id text,
  sender_name text,
  external_message_id text,
  content text NOT NULL,
  content_type text NOT NULL DEFAULT 'text',
  metadata_json jsonb,
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.zap_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all access to zap_messages" ON public.zap_messages FOR ALL USING (true) WITH CHECK (true);

-- 3. zap_assignments
CREATE TABLE public.zap_assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid NOT NULL REFERENCES public.zap_conversations(id) ON DELETE CASCADE,
  assigned_to_user_id text NOT NULL,
  assigned_to_name text,
  assigned_by_user_id text,
  assigned_by_name text,
  assignment_type text NOT NULL DEFAULT 'assume',
  note text,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.zap_assignments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all access to zap_assignments" ON public.zap_assignments FOR ALL USING (true) WITH CHECK (true);

-- 4. zap_mentions
CREATE TABLE public.zap_mentions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid NOT NULL REFERENCES public.zap_conversations(id) ON DELETE CASCADE,
  message_id uuid REFERENCES public.zap_messages(id) ON DELETE SET NULL,
  mentioned_user_id text NOT NULL,
  mentioned_user_name text,
  matched_text text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.zap_mentions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all access to zap_mentions" ON public.zap_mentions FOR ALL USING (true) WITH CHECK (true);

-- 5. zap_ai_requests
CREATE TABLE public.zap_ai_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid REFERENCES public.zap_conversations(id) ON DELETE SET NULL,
  user_id text,
  request_type text NOT NULL DEFAULT 'analytics',
  prompt text NOT NULL,
  response_json jsonb,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.zap_ai_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all access to zap_ai_requests" ON public.zap_ai_requests FOR ALL USING (true) WITH CHECK (true);

-- 6. zap_attachments
CREATE TABLE public.zap_attachments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid REFERENCES public.zap_conversations(id) ON DELETE SET NULL,
  message_id uuid REFERENCES public.zap_messages(id) ON DELETE SET NULL,
  ai_request_id uuid REFERENCES public.zap_ai_requests(id) ON DELETE SET NULL,
  file_name text NOT NULL,
  file_type text,
  file_size integer,
  storage_path text NOT NULL,
  file_url text,
  extracted_text text,
  metadata_json jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.zap_attachments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all access to zap_attachments" ON public.zap_attachments FOR ALL USING (true) WITH CHECK (true);

-- 7. zap_executive_actions
CREATE TABLE public.zap_executive_actions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_channel text NOT NULL DEFAULT 'whatsapp_group',
  source_message_id text,
  requested_by_user_id text,
  requested_by_name text,
  action_type text NOT NULL,
  action_description text,
  parsed_payload_json jsonb,
  confirmation_status text NOT NULL DEFAULT 'pending',
  execution_status text NOT NULL DEFAULT 'pending',
  execution_result_json jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.zap_executive_actions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all access to zap_executive_actions" ON public.zap_executive_actions FOR ALL USING (true) WITH CHECK (true);

-- 8. zap_analytics_cache
CREATE TABLE public.zap_analytics_cache (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_key text NOT NULL,
  metric_scope_json jsonb,
  result_json jsonb NOT NULL,
  generated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.zap_analytics_cache ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all access to zap_analytics_cache" ON public.zap_analytics_cache FOR ALL USING (true) WITH CHECK (true);

-- Storage bucket for zap attachments
INSERT INTO storage.buckets (id, name, public) VALUES ('zap-attachments', 'zap-attachments', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Allow all access to zap-attachments" ON storage.objects FOR ALL USING (bucket_id = 'zap-attachments') WITH CHECK (bucket_id = 'zap-attachments');
