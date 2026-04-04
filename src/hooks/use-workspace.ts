import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// ─── Case Service ───
export function useWorkspaceCases() {
  return useQuery({
    queryKey: ["workspace-cases"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("workspace_cases")
        .select("*")
        .order("updated_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}

export function useWorkspaceCase(id: string | undefined) {
  return useQuery({
    queryKey: ["workspace-case", id],
    enabled: !!id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("workspace_cases")
        .select("*")
        .eq("id", id!)
        .single();
      if (error) throw error;
      return data;
    },
  });
}

export function useCreateWorkspaceCase() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: {
      nome: string;
      cliente?: string;
      area_juridica?: string;
      relato?: string;
    }) => {
      const { data, error } = await supabase
        .from("workspace_cases")
        .insert(payload)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["workspace-cases"] });
      toast.success("Caso criado com sucesso");
    },
    onError: (err: Error) => toast.error(`Erro ao criar caso: ${err.message}`),
  });
}

// ─── Process Service ───
export function useCreateWorkspaceProcess() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: {
      case_id?: string;
      numero_cnj?: string;
      nome?: string;
      cliente?: string;
      relato?: string;
      tribunal?: string;
      orgao_julgador?: string;
      classe_acao?: string;
      status?: string;
    }) => {
      const { data, error } = await supabase
        .from("workspace_processes")
        .insert(payload)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["workspace-cases"] });
      toast.success("Processo criado com sucesso");
    },
    onError: (err: Error) => toast.error(`Erro ao criar processo: ${err.message}`),
  });
}

// ─── Conversation Service ───
export function useWorkspaceConversations(caseId: string | undefined) {
  return useQuery({
    queryKey: ["workspace-conversations", caseId],
    enabled: !!caseId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("workspace_conversations")
        .select("*")
        .eq("case_id", caseId!)
        .order("updated_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}

export function useCreateConversation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { case_id: string; titulo: string; agente: string }) => {
      const { data, error } = await supabase
        .from("workspace_conversations")
        .insert(payload)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["workspace-conversations", data.case_id] });
    },
  });
}

// ─── Message Service ───
export function useWorkspaceMessages(conversationId: string | undefined) {
  return useQuery({
    queryKey: ["workspace-messages", conversationId],
    enabled: !!conversationId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("workspace_messages")
        .select("*")
        .eq("conversation_id", conversationId!)
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data;
    },
  });
}

export function useSendMessage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: {
      conversation_id: string;
      role: string;
      content: string;
      agente?: string;
    }) => {
      const { data, error } = await supabase
        .from("workspace_messages")
        .insert(payload)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["workspace-messages", data.conversation_id] });
    },
  });
}

// ─── File Service ───
export function useWorkspaceFiles(caseId: string | undefined) {
  return useQuery({
    queryKey: ["workspace-files", caseId],
    enabled: !!caseId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("workspace_files")
        .select("*")
        .eq("case_id", caseId!)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}

export function useUploadWorkspaceFile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      file,
      caseId,
      processId,
      categoria,
    }: {
      file: File;
      caseId: string;
      processId?: string;
      categoria?: string;
    }) => {
      const path = `${caseId}/${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("workspace-files")
        .upload(path, file);
      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("workspace-files")
        .getPublicUrl(path);

      const { data, error } = await supabase
        .from("workspace_files")
        .insert({
          case_id: caseId,
          process_id: processId || null,
          nome_arquivo: file.name,
          categoria: categoria || "Outros",
          caminho_storage: path,
          url_arquivo: urlData.publicUrl,
        })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["workspace-files", data.case_id] });
      toast.success("Arquivo enviado com sucesso");
    },
    onError: (err: Error) => toast.error(`Erro no upload: ${err.message}`),
  });
}

// ─── Memory Service ───
export function useWorkspaceMemory(caseId: string | undefined) {
  return useQuery({
    queryKey: ["workspace-memory", caseId],
    enabled: !!caseId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("workspace_memory")
        .select("*")
        .eq("case_id", caseId!)
        .order("updated_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}

export function useSaveMemory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: {
      case_id: string;
      chave: string;
      valor: string;
      tipo?: string;
    }) => {
      const { data, error } = await supabase
        .from("workspace_memory")
        .insert(payload)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["workspace-memory", data.case_id] });
    },
  });
}

// ─── Output Service ───
export function useWorkspaceOutputs(caseId: string | undefined) {
  return useQuery({
    queryKey: ["workspace-outputs", caseId],
    enabled: !!caseId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("workspace_outputs")
        .select("*")
        .eq("case_id", caseId!)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}
