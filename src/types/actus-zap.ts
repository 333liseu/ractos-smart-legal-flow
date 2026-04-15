// ── Actus Zap domain types ──

export type ZapConversationStatus = 'open' | 'waiting' | 'in_service' | 'closed';
export type ZapSenderType = 'client' | 'staff' | 'ai' | 'system';
export type ZapAssignmentType = 'assume' | 'transfer';
export type ZapMentionStatus = 'pending' | 'notified' | 'acknowledged' | 'assumed';
export type ZapAIRequestType = 'analytics' | 'draft_message' | 'classify' | 'summarize' | 'executive_action';
export type ZapExecConfirmation = 'pending' | 'confirmed' | 'rejected';
export type ZapExecExecution = 'pending' | 'running' | 'success' | 'error';
export type ZapPriority = 'low' | 'normal' | 'high' | 'urgent';

export interface ZapConversation {
  id: string;
  channel_type: string;
  external_conversation_id?: string | null;
  client_id?: string | null;
  process_id?: string | null;
  subject?: string | null;
  status: ZapConversationStatus;
  responsible_user_id?: string | null;
  ai_enabled: boolean;
  unread_count: number;
  last_message_at?: string | null;
  priority?: ZapPriority | null;
  tags?: string[];
  client_name?: string | null;
  client_phone?: string | null;
  created_at: string;
  updated_at: string;
}

export interface ZapMessage {
  id: string;
  conversation_id: string;
  sender_type: ZapSenderType;
  sender_user_id?: string | null;
  sender_name?: string | null;
  external_message_id?: string | null;
  content: string;
  content_type: string;
  metadata_json?: Record<string, unknown> | null;
  is_read: boolean;
  created_at: string;
}

export interface ZapAssignment {
  id: string;
  conversation_id: string;
  assigned_to_user_id: string;
  assigned_to_name?: string | null;
  assigned_by_user_id?: string | null;
  assigned_by_name?: string | null;
  assignment_type: ZapAssignmentType;
  note?: string | null;
  created_at: string;
}

export interface ZapMention {
  id: string;
  conversation_id: string;
  message_id?: string | null;
  mentioned_user_id: string;
  mentioned_user_name?: string | null;
  matched_text: string;
  status: ZapMentionStatus;
  created_at: string;
}

export interface ZapAIRequest {
  id: string;
  conversation_id?: string | null;
  user_id?: string | null;
  request_type: ZapAIRequestType;
  prompt: string;
  response_json?: Record<string, unknown> | null;
  status: string;
  created_at: string;
}

export interface ZapAttachment {
  id: string;
  conversation_id?: string | null;
  message_id?: string | null;
  ai_request_id?: string | null;
  file_name: string;
  file_type?: string | null;
  file_size?: number | null;
  storage_path: string;
  file_url?: string | null;
  extracted_text?: string | null;
  metadata_json?: Record<string, unknown> | null;
  created_at: string;
}

export interface ZapExecutiveAction {
  id: string;
  source_channel: string;
  source_message_id?: string | null;
  requested_by_user_id?: string | null;
  requested_by_name?: string | null;
  action_type: string;
  action_description?: string | null;
  parsed_payload_json?: Record<string, unknown> | null;
  confirmation_status: ZapExecConfirmation;
  execution_status: ZapExecExecution;
  execution_result_json?: Record<string, unknown> | null;
  created_at: string;
}

// ── Filter types ──
export interface ZapFilterState {
  status?: ZapConversationStatus | 'all';
  responsible?: string;
  hasProcess?: boolean;
  hasClient?: boolean;
  aiEnabled?: boolean;
  dateRange?: { from?: string; to?: string };
  priority?: ZapPriority;
  search?: string;
  hasMention?: boolean;
  hasAttachments?: boolean;
  tags?: string[];
}

// ── Staff member for mention matching ──
export interface StaffMember {
  id: string;
  fullName: string;
  shortName?: string;
  nickname?: string;
  role?: string;
}

// ── AI chat message ──
export interface ZapAIChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isDraft?: boolean;
  draftText?: string;
  created_at: string;
}
