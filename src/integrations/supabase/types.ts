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
