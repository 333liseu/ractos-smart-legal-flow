export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      cliente_documentos: {
        Row: {
          caminho_storage: string
          categoria: string | null
          cliente_id: string
          created_at: string
          id: string
          nome_arquivo: string
          url_arquivo: string | null
        }
        Insert: {
          caminho_storage: string
          categoria?: string | null
          cliente_id: string
          created_at?: string
          id?: string
          nome_arquivo: string
          url_arquivo?: string | null
        }
        Update: {
          caminho_storage?: string
          categoria?: string | null
          cliente_id?: string
          created_at?: string
          id?: string
          nome_arquivo?: string
          url_arquivo?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cliente_documentos_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
        ]
      }
      clientes: {
        Row: {
          celular: string | null
          cep: string | null
          cidade: string | null
          cpf_cnpj: string | null
          created_at: string
          email: string | null
          endereco: string | null
          estado: string | null
          id: string
          nome_razao_social: string
          observacoes: string | null
          responsavel_interno: string | null
          status: string | null
          telefone: string | null
          tipo_contrato: string | null
          tipo_pessoa: string | null
          updated_at: string
        }
        Insert: {
          celular?: string | null
          cep?: string | null
          cidade?: string | null
          cpf_cnpj?: string | null
          created_at?: string
          email?: string | null
          endereco?: string | null
          estado?: string | null
          id?: string
          nome_razao_social: string
          observacoes?: string | null
          responsavel_interno?: string | null
          status?: string | null
          telefone?: string | null
          tipo_contrato?: string | null
          tipo_pessoa?: string | null
          updated_at?: string
        }
        Update: {
          celular?: string | null
          cep?: string | null
          cidade?: string | null
          cpf_cnpj?: string | null
          created_at?: string
          email?: string | null
          endereco?: string | null
          estado?: string | null
          id?: string
          nome_razao_social?: string
          observacoes?: string | null
          responsavel_interno?: string | null
          status?: string | null
          telefone?: string | null
          tipo_contrato?: string | null
          tipo_pessoa?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      document_generation_files: {
        Row: {
          caminho_storage: string
          campos_extraidos: Json | null
          created_at: string
          id: string
          nome_arquivo: string
          run_id: string
          tipo_arquivo: string | null
        }
        Insert: {
          caminho_storage: string
          campos_extraidos?: Json | null
          created_at?: string
          id?: string
          nome_arquivo: string
          run_id: string
          tipo_arquivo?: string | null
        }
        Update: {
          caminho_storage?: string
          campos_extraidos?: Json | null
          created_at?: string
          id?: string
          nome_arquivo?: string
          run_id?: string
          tipo_arquivo?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "document_generation_files_run_id_fkey"
            columns: ["run_id"]
            isOneToOne: false
            referencedRelation: "document_generation_runs"
            referencedColumns: ["id"]
          },
        ]
      }
      document_generation_runs: {
        Row: {
          campos_extraidos: Json | null
          case_id: string | null
          cliente_id: string | null
          created_at: string
          documento_docx_path: string | null
          documento_final: string | null
          id: string
          process_id: string | null
          prompt: string | null
          status: string
          template_id: string | null
          updated_at: string
        }
        Insert: {
          campos_extraidos?: Json | null
          case_id?: string | null
          cliente_id?: string | null
          created_at?: string
          documento_docx_path?: string | null
          documento_final?: string | null
          id?: string
          process_id?: string | null
          prompt?: string | null
          status?: string
          template_id?: string | null
          updated_at?: string
        }
        Update: {
          campos_extraidos?: Json | null
          case_id?: string | null
          cliente_id?: string | null
          created_at?: string
          documento_docx_path?: string | null
          documento_final?: string | null
          id?: string
          process_id?: string | null
          prompt?: string | null
          status?: string
          template_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "document_generation_runs_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "workspace_cases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "document_generation_runs_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "document_generation_runs_process_id_fkey"
            columns: ["process_id"]
            isOneToOne: false
            referencedRelation: "workspace_processes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "document_generation_runs_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "document_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      document_templates: {
        Row: {
          ativo: boolean
          categoria: string
          conteudo_template: string | null
          created_at: string
          descricao: string | null
          id: string
          nome: string
          updated_at: string
          usos: number
        }
        Insert: {
          ativo?: boolean
          categoria: string
          conteudo_template?: string | null
          created_at?: string
          descricao?: string | null
          id?: string
          nome: string
          updated_at?: string
          usos?: number
        }
        Update: {
          ativo?: boolean
          categoria?: string
          conteudo_template?: string | null
          created_at?: string
          descricao?: string | null
          id?: string
          nome?: string
          updated_at?: string
          usos?: number
        }
        Relationships: []
      }
      workspace_cases: {
        Row: {
          area_juridica: string | null
          cliente: string | null
          created_at: string
          id: string
          nome: string
          relato: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          area_juridica?: string | null
          cliente?: string | null
          created_at?: string
          id?: string
          nome: string
          relato?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          area_juridica?: string | null
          cliente?: string | null
          created_at?: string
          id?: string
          nome?: string
          relato?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      workspace_conversation_moves: {
        Row: {
          conversation_id: string
          from_case_id: string | null
          from_context_type: string | null
          from_process_id: string | null
          id: string
          moved_at: string
          moved_by: string | null
          reason: string | null
          to_case_id: string | null
          to_context_type: string
          to_process_id: string | null
        }
        Insert: {
          conversation_id: string
          from_case_id?: string | null
          from_context_type?: string | null
          from_process_id?: string | null
          id?: string
          moved_at?: string
          moved_by?: string | null
          reason?: string | null
          to_case_id?: string | null
          to_context_type: string
          to_process_id?: string | null
        }
        Update: {
          conversation_id?: string
          from_case_id?: string | null
          from_context_type?: string | null
          from_process_id?: string | null
          id?: string
          moved_at?: string
          moved_by?: string | null
          reason?: string | null
          to_case_id?: string | null
          to_context_type?: string
          to_process_id?: string | null
        }
        Relationships: []
      }
      workspace_conversations: {
        Row: {
          agente: string
          case_id: string | null
          context_type: string
          created_at: string
          id: string
          moved_at: string | null
          moved_by: string | null
          process_id: string | null
          titulo: string
          updated_at: string
        }
        Insert: {
          agente?: string
          case_id?: string | null
          context_type?: string
          created_at?: string
          id?: string
          moved_at?: string | null
          moved_by?: string | null
          process_id?: string | null
          titulo: string
          updated_at?: string
        }
        Update: {
          agente?: string
          case_id?: string | null
          context_type?: string
          created_at?: string
          id?: string
          moved_at?: string | null
          moved_by?: string | null
          process_id?: string | null
          titulo?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "workspace_conversations_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "workspace_cases"
            referencedColumns: ["id"]
          },
        ]
      }
      workspace_files: {
        Row: {
          caminho_storage: string
          case_id: string | null
          categoria: string | null
          created_at: string
          id: string
          nome_arquivo: string
          process_id: string | null
          url_arquivo: string | null
        }
        Insert: {
          caminho_storage: string
          case_id?: string | null
          categoria?: string | null
          created_at?: string
          id?: string
          nome_arquivo: string
          process_id?: string | null
          url_arquivo?: string | null
        }
        Update: {
          caminho_storage?: string
          case_id?: string | null
          categoria?: string | null
          created_at?: string
          id?: string
          nome_arquivo?: string
          process_id?: string | null
          url_arquivo?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "workspace_files_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "workspace_cases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workspace_files_process_id_fkey"
            columns: ["process_id"]
            isOneToOne: false
            referencedRelation: "workspace_processes"
            referencedColumns: ["id"]
          },
        ]
      }
      workspace_memory: {
        Row: {
          case_id: string
          chave: string
          created_at: string
          id: string
          tipo: string | null
          updated_at: string
          valor: string
        }
        Insert: {
          case_id: string
          chave: string
          created_at?: string
          id?: string
          tipo?: string | null
          updated_at?: string
          valor: string
        }
        Update: {
          case_id?: string
          chave?: string
          created_at?: string
          id?: string
          tipo?: string | null
          updated_at?: string
          valor?: string
        }
        Relationships: [
          {
            foreignKeyName: "workspace_memory_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "workspace_cases"
            referencedColumns: ["id"]
          },
        ]
      }
      workspace_messages: {
        Row: {
          agente: string | null
          content: string
          conversation_id: string
          created_at: string
          id: string
          role: string
        }
        Insert: {
          agente?: string | null
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          role?: string
        }
        Update: {
          agente?: string | null
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "workspace_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "workspace_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      workspace_outputs: {
        Row: {
          case_id: string | null
          conteudo: string
          conversation_id: string | null
          created_at: string
          id: string
          tipo: string
          titulo: string
        }
        Insert: {
          case_id?: string | null
          conteudo: string
          conversation_id?: string | null
          created_at?: string
          id?: string
          tipo: string
          titulo: string
        }
        Update: {
          case_id?: string | null
          conteudo?: string
          conversation_id?: string | null
          created_at?: string
          id?: string
          tipo?: string
          titulo?: string
        }
        Relationships: [
          {
            foreignKeyName: "workspace_outputs_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "workspace_cases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workspace_outputs_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "workspace_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      workspace_processes: {
        Row: {
          case_id: string | null
          classe_acao: string | null
          cliente: string | null
          created_at: string
          id: string
          nome: string | null
          numero_cnj: string | null
          orgao_julgador: string | null
          relato: string | null
          status: string | null
          tribunal: string | null
          updated_at: string
        }
        Insert: {
          case_id?: string | null
          classe_acao?: string | null
          cliente?: string | null
          created_at?: string
          id?: string
          nome?: string | null
          numero_cnj?: string | null
          orgao_julgador?: string | null
          relato?: string | null
          status?: string | null
          tribunal?: string | null
          updated_at?: string
        }
        Update: {
          case_id?: string | null
          classe_acao?: string | null
          cliente?: string | null
          created_at?: string
          id?: string
          nome?: string | null
          numero_cnj?: string | null
          orgao_julgador?: string | null
          relato?: string | null
          status?: string | null
          tribunal?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "workspace_processes_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "workspace_cases"
            referencedColumns: ["id"]
          },
        ]
      }
      zap_ai_requests: {
        Row: {
          conversation_id: string | null
          created_at: string
          id: string
          prompt: string
          request_type: string
          response_json: Json | null
          status: string
          user_id: string | null
        }
        Insert: {
          conversation_id?: string | null
          created_at?: string
          id?: string
          prompt: string
          request_type?: string
          response_json?: Json | null
          status?: string
          user_id?: string | null
        }
        Update: {
          conversation_id?: string | null
          created_at?: string
          id?: string
          prompt?: string
          request_type?: string
          response_json?: Json | null
          status?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "zap_ai_requests_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "zap_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      zap_analytics_cache: {
        Row: {
          generated_at: string
          id: string
          metric_key: string
          metric_scope_json: Json | null
          result_json: Json
        }
        Insert: {
          generated_at?: string
          id?: string
          metric_key: string
          metric_scope_json?: Json | null
          result_json: Json
        }
        Update: {
          generated_at?: string
          id?: string
          metric_key?: string
          metric_scope_json?: Json | null
          result_json?: Json
        }
        Relationships: []
      }
      zap_assignments: {
        Row: {
          assigned_by_name: string | null
          assigned_by_user_id: string | null
          assigned_to_name: string | null
          assigned_to_user_id: string
          assignment_type: string
          conversation_id: string
          created_at: string
          id: string
          note: string | null
        }
        Insert: {
          assigned_by_name?: string | null
          assigned_by_user_id?: string | null
          assigned_to_name?: string | null
          assigned_to_user_id: string
          assignment_type?: string
          conversation_id: string
          created_at?: string
          id?: string
          note?: string | null
        }
        Update: {
          assigned_by_name?: string | null
          assigned_by_user_id?: string | null
          assigned_to_name?: string | null
          assigned_to_user_id?: string
          assignment_type?: string
          conversation_id?: string
          created_at?: string
          id?: string
          note?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "zap_assignments_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "zap_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      zap_attachments: {
        Row: {
          ai_request_id: string | null
          conversation_id: string | null
          created_at: string
          extracted_text: string | null
          file_name: string
          file_size: number | null
          file_type: string | null
          file_url: string | null
          id: string
          message_id: string | null
          metadata_json: Json | null
          storage_path: string
        }
        Insert: {
          ai_request_id?: string | null
          conversation_id?: string | null
          created_at?: string
          extracted_text?: string | null
          file_name: string
          file_size?: number | null
          file_type?: string | null
          file_url?: string | null
          id?: string
          message_id?: string | null
          metadata_json?: Json | null
          storage_path: string
        }
        Update: {
          ai_request_id?: string | null
          conversation_id?: string | null
          created_at?: string
          extracted_text?: string | null
          file_name?: string
          file_size?: number | null
          file_type?: string | null
          file_url?: string | null
          id?: string
          message_id?: string | null
          metadata_json?: Json | null
          storage_path?: string
        }
        Relationships: [
          {
            foreignKeyName: "zap_attachments_ai_request_id_fkey"
            columns: ["ai_request_id"]
            isOneToOne: false
            referencedRelation: "zap_ai_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "zap_attachments_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "zap_conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "zap_attachments_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "zap_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      zap_conversations: {
        Row: {
          ai_enabled: boolean
          channel_type: string
          client_id: string | null
          client_name: string | null
          client_phone: string | null
          created_at: string
          external_conversation_id: string | null
          id: string
          last_message_at: string | null
          priority: string | null
          process_id: string | null
          responsible_user_id: string | null
          status: string
          subject: string | null
          tags: string[] | null
          unread_count: number
          updated_at: string
        }
        Insert: {
          ai_enabled?: boolean
          channel_type?: string
          client_id?: string | null
          client_name?: string | null
          client_phone?: string | null
          created_at?: string
          external_conversation_id?: string | null
          id?: string
          last_message_at?: string | null
          priority?: string | null
          process_id?: string | null
          responsible_user_id?: string | null
          status?: string
          subject?: string | null
          tags?: string[] | null
          unread_count?: number
          updated_at?: string
        }
        Update: {
          ai_enabled?: boolean
          channel_type?: string
          client_id?: string | null
          client_name?: string | null
          client_phone?: string | null
          created_at?: string
          external_conversation_id?: string | null
          id?: string
          last_message_at?: string | null
          priority?: string | null
          process_id?: string | null
          responsible_user_id?: string | null
          status?: string
          subject?: string | null
          tags?: string[] | null
          unread_count?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "zap_conversations_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "zap_conversations_process_id_fkey"
            columns: ["process_id"]
            isOneToOne: false
            referencedRelation: "workspace_processes"
            referencedColumns: ["id"]
          },
        ]
      }
      zap_executive_actions: {
        Row: {
          action_description: string | null
          action_type: string
          confirmation_status: string
          created_at: string
          execution_result_json: Json | null
          execution_status: string
          id: string
          parsed_payload_json: Json | null
          requested_by_name: string | null
          requested_by_user_id: string | null
          source_channel: string
          source_message_id: string | null
        }
        Insert: {
          action_description?: string | null
          action_type: string
          confirmation_status?: string
          created_at?: string
          execution_result_json?: Json | null
          execution_status?: string
          id?: string
          parsed_payload_json?: Json | null
          requested_by_name?: string | null
          requested_by_user_id?: string | null
          source_channel?: string
          source_message_id?: string | null
        }
        Update: {
          action_description?: string | null
          action_type?: string
          confirmation_status?: string
          created_at?: string
          execution_result_json?: Json | null
          execution_status?: string
          id?: string
          parsed_payload_json?: Json | null
          requested_by_name?: string | null
          requested_by_user_id?: string | null
          source_channel?: string
          source_message_id?: string | null
        }
        Relationships: []
      }
      zap_mentions: {
        Row: {
          conversation_id: string
          created_at: string
          id: string
          matched_text: string
          mentioned_user_id: string
          mentioned_user_name: string | null
          message_id: string | null
          status: string
        }
        Insert: {
          conversation_id: string
          created_at?: string
          id?: string
          matched_text: string
          mentioned_user_id: string
          mentioned_user_name?: string | null
          message_id?: string | null
          status?: string
        }
        Update: {
          conversation_id?: string
          created_at?: string
          id?: string
          matched_text?: string
          mentioned_user_id?: string
          mentioned_user_name?: string | null
          message_id?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "zap_mentions_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "zap_conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "zap_mentions_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "zap_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      zap_messages: {
        Row: {
          content: string
          content_type: string
          conversation_id: string
          created_at: string
          external_message_id: string | null
          id: string
          is_read: boolean
          metadata_json: Json | null
          sender_name: string | null
          sender_type: string
          sender_user_id: string | null
        }
        Insert: {
          content: string
          content_type?: string
          conversation_id: string
          created_at?: string
          external_message_id?: string | null
          id?: string
          is_read?: boolean
          metadata_json?: Json | null
          sender_name?: string | null
          sender_type?: string
          sender_user_id?: string | null
        }
        Update: {
          content?: string
          content_type?: string
          conversation_id?: string
          created_at?: string
          external_message_id?: string | null
          id?: string
          is_read?: boolean
          metadata_json?: Json | null
          sender_name?: string | null
          sender_type?: string
          sender_user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "zap_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "zap_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
