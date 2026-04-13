
-- Add new columns to workspace_conversations
ALTER TABLE public.workspace_conversations
  ADD COLUMN IF NOT EXISTS process_id uuid,
  ADD COLUMN IF NOT EXISTS context_type text NOT NULL DEFAULT 'unassigned',
  ADD COLUMN IF NOT EXISTS moved_at timestamp with time zone,
  ADD COLUMN IF NOT EXISTS moved_by text;

-- Add constraint: case_id and process_id cannot both be set
ALTER TABLE public.workspace_conversations
  ADD CONSTRAINT chk_single_context CHECK (
    NOT (case_id IS NOT NULL AND process_id IS NOT NULL)
  );

-- Create audit table
CREATE TABLE public.workspace_conversation_moves (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id uuid NOT NULL,
  from_context_type text,
  from_case_id uuid,
  from_process_id uuid,
  to_context_type text NOT NULL,
  to_case_id uuid,
  to_process_id uuid,
  moved_by text,
  moved_at timestamp with time zone NOT NULL DEFAULT now(),
  reason text
);

ALTER TABLE public.workspace_conversation_moves ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all access to workspace_conversation_moves"
  ON public.workspace_conversation_moves
  FOR ALL
  USING (true)
  WITH CHECK (true);
