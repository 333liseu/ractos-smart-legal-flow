import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type {
  ZapConversation, ZapMessage, ZapAssignment, ZapMention,
  ZapAttachment, ZapFilterState, ZapConversationStatus,
} from '@/types/actus-zap';

// ── Conversations ──
export function useZapConversations(filters?: ZapFilterState) {
  return useQuery({
    queryKey: ['zap-conversations', filters],
    queryFn: async (): Promise<ZapConversation[]> => {
      let q = supabase.from('zap_conversations').select('*').order('last_message_at', { ascending: false, nullsFirst: false });

      if (filters?.status && filters.status !== 'all') q = q.eq('status', filters.status);
      if (filters?.responsible) q = q.eq('responsible_user_id', filters.responsible);
      if (filters?.aiEnabled !== undefined) q = q.eq('ai_enabled', filters.aiEnabled);
      if (filters?.search) q = q.or(`client_name.ilike.%${filters.search}%,client_phone.ilike.%${filters.search}%,subject.ilike.%${filters.search}%`);
      if (filters?.priority) q = q.eq('priority', filters.priority);

      const { data, error } = await q;
      if (error) throw error;
      return (data ?? []) as unknown as ZapConversation[];
    },
  });
}

export function useZapConversation(id?: string) {
  return useQuery({
    queryKey: ['zap-conversation', id],
    enabled: !!id,
    queryFn: async (): Promise<ZapConversation | null> => {
      const { data, error } = await supabase.from('zap_conversations').select('*').eq('id', id!).maybeSingle();
      if (error) throw error;
      return data as unknown as ZapConversation | null;
    },
  });
}

// ── Stats ──
export function useZapStats() {
  return useQuery({
    queryKey: ['zap-stats'],
    queryFn: async () => {
      const { data, error } = await supabase.from('zap_conversations').select('id, status, unread_count');
      if (error) throw error;
      const convs = (data ?? []) as unknown as { id: string; status: string; unread_count: number }[];
      return {
        total: convs.length,
        unread: convs.filter(c => c.unread_count > 0).length,
        inService: convs.filter(c => c.status === 'in_service').length,
      };
    },
  });
}

// ── Messages ──
export function useZapMessages(conversationId?: string) {
  return useQuery({
    queryKey: ['zap-messages', conversationId],
    enabled: !!conversationId,
    queryFn: async (): Promise<ZapMessage[]> => {
      const { data, error } = await supabase
        .from('zap_messages')
        .select('*')
        .eq('conversation_id', conversationId!)
        .order('created_at', { ascending: true });
      if (error) throw error;
      return (data ?? []) as unknown as ZapMessage[];
    },
  });
}

export function useSendZapMessage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (msg: { conversation_id: string; content: string; sender_type: string; sender_name?: string; content_type?: string }) => {
      const { error } = await supabase.from('zap_messages').insert({
        conversation_id: msg.conversation_id,
        content: msg.content,
        sender_type: msg.sender_type,
        sender_name: msg.sender_name ?? null,
        content_type: msg.content_type ?? 'text',
      });
      if (error) throw error;
      // Update last_message_at
      await supabase.from('zap_conversations').update({ last_message_at: new Date().toISOString(), updated_at: new Date().toISOString() } as any).eq('id', msg.conversation_id);
    },
    onSuccess: (_d, v) => {
      qc.invalidateQueries({ queryKey: ['zap-messages', v.conversation_id] });
      qc.invalidateQueries({ queryKey: ['zap-conversations'] });
      qc.invalidateQueries({ queryKey: ['zap-stats'] });
    },
  });
}

// ── Assignment (Assume / Transfer) ──
export function useZapAssign() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: {
      conversation_id: string;
      assigned_to_user_id: string;
      assigned_to_name: string;
      assigned_by_name?: string;
      assignment_type: 'assume' | 'transfer';
      note?: string;
    }) => {
      // Insert assignment record
      const { error: aErr } = await supabase.from('zap_assignments').insert({
        conversation_id: payload.conversation_id,
        assigned_to_user_id: payload.assigned_to_user_id,
        assigned_to_name: payload.assigned_to_name,
        assigned_by_name: payload.assigned_by_name ?? null,
        assignment_type: payload.assignment_type,
        note: payload.note ?? null,
      });
      if (aErr) throw aErr;

      // Update conversation
      await supabase.from('zap_conversations').update({
        responsible_user_id: payload.assigned_to_user_id,
        status: 'in_service' as any,
        updated_at: new Date().toISOString(),
      } as any).eq('id', payload.conversation_id);

      // System message
      const text = payload.assignment_type === 'assume'
        ? `${payload.assigned_to_name} assumiu o atendimento`
        : `Atendimento transferido para ${payload.assigned_to_name}${payload.note ? ` — ${payload.note}` : ''}`;
      await supabase.from('zap_messages').insert({
        conversation_id: payload.conversation_id,
        sender_type: 'system',
        content: text,
        content_type: 'event',
      });
    },
    onSuccess: (_d, v) => {
      qc.invalidateQueries({ queryKey: ['zap-conversations'] });
      qc.invalidateQueries({ queryKey: ['zap-conversation', v.conversation_id] });
      qc.invalidateQueries({ queryKey: ['zap-messages', v.conversation_id] });
      qc.invalidateQueries({ queryKey: ['zap-stats'] });
    },
  });
}

// ── Assignments history ──
export function useZapAssignments(conversationId?: string) {
  return useQuery({
    queryKey: ['zap-assignments', conversationId],
    enabled: !!conversationId,
    queryFn: async (): Promise<ZapAssignment[]> => {
      const { data, error } = await supabase.from('zap_assignments').select('*').eq('conversation_id', conversationId!).order('created_at', { ascending: false });
      if (error) throw error;
      return (data ?? []) as unknown as ZapAssignment[];
    },
  });
}

// ── Mentions ──
export function useZapMentions(conversationId?: string) {
  return useQuery({
    queryKey: ['zap-mentions', conversationId],
    enabled: !!conversationId,
    queryFn: async (): Promise<ZapMention[]> => {
      const { data, error } = await supabase.from('zap_mentions').select('*').eq('conversation_id', conversationId!).order('created_at', { ascending: false });
      if (error) throw error;
      return (data ?? []) as unknown as ZapMention[];
    },
  });
}

// ── File upload ──
export function useZapUploadFile() {
  return useMutation({
    mutationFn: async (payload: { file: File; conversationId?: string; messageId?: string }) => {
      const path = `${payload.conversationId ?? 'general'}/${Date.now()}-${payload.file.name}`;
      const { error: upErr } = await supabase.storage.from('zap-attachments').upload(path, payload.file);
      if (upErr) throw upErr;
      const { data: urlData } = supabase.storage.from('zap-attachments').getPublicUrl(path);
      const { error: dbErr } = await supabase.from('zap_attachments').insert({
        conversation_id: payload.conversationId ?? null,
        message_id: payload.messageId ?? null,
        file_name: payload.file.name,
        file_type: payload.file.type,
        file_size: payload.file.size,
        storage_path: path,
        file_url: urlData.publicUrl,
      });
      if (dbErr) throw dbErr;
      return { path, url: urlData.publicUrl, fileName: payload.file.name };
    },
  });
}

// ── Close conversation ──
export function useZapCloseConversation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (conversationId: string) => {
      await supabase.from('zap_conversations').update({ status: 'closed' as any, updated_at: new Date().toISOString() } as any).eq('id', conversationId);
      await supabase.from('zap_messages').insert({
        conversation_id: conversationId,
        sender_type: 'system',
        content: 'Atendimento encerrado',
        content_type: 'event',
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['zap-conversations'] });
      qc.invalidateQueries({ queryKey: ['zap-stats'] });
    },
  });
}
