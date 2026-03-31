import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface ClienteRow {
  id: string;
  nome_razao_social: string;
  tipo_pessoa: string | null;
  cpf_cnpj: string | null;
  email: string | null;
  telefone: string | null;
  celular: string | null;
  status: string | null;
  tipo_contrato: string | null;
  responsavel_interno: string | null;
  endereco: string | null;
  cidade: string | null;
  estado: string | null;
  cep: string | null;
  observacoes: string | null;
  created_at: string;
  updated_at: string;
}

export interface ClienteDocumentoRow {
  id: string;
  cliente_id: string;
  nome_arquivo: string;
  categoria: string | null;
  caminho_storage: string;
  url_arquivo: string | null;
  created_at: string;
}

export function useClientes() {
  return useQuery({
    queryKey: ["clientes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("clientes")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as ClienteRow[];
    },
  });
}

export function useCliente(id: string | undefined) {
  return useQuery({
    queryKey: ["clientes", id],
    enabled: !!id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("clientes")
        .select("*")
        .eq("id", id!)
        .single();
      if (error) throw error;
      return data as ClienteRow;
    },
  });
}

export function useClienteDocumentos(clienteId: string | undefined) {
  return useQuery({
    queryKey: ["cliente_documentos", clienteId],
    enabled: !!clienteId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cliente_documentos")
        .select("*")
        .eq("cliente_id", clienteId!)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as ClienteDocumentoRow[];
    },
  });
}

export type ClienteInsert = Omit<ClienteRow, "id" | "created_at" | "updated_at">;

export function useCreateCliente() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (cliente: ClienteInsert) => {
      const { data, error } = await supabase
        .from("clientes")
        .insert(cliente)
        .select()
        .single();
      if (error) throw error;
      return data as ClienteRow;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clientes"] });
      toast.success("Cliente salvo com sucesso!");
    },
    onError: (err: Error) => {
      toast.error("Erro ao salvar cliente: " + err.message);
    },
  });
}

export function useUploadClienteDocumento() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      clienteId,
      file,
      categoria,
    }: {
      clienteId: string;
      file: File;
      categoria: string;
    }) => {
      const path = `${clienteId}/${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("clientes-documentos")
        .upload(path, file);
      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("clientes-documentos")
        .getPublicUrl(path);

      const { error: dbError } = await supabase
        .from("cliente_documentos")
        .insert({
          cliente_id: clienteId,
          nome_arquivo: file.name,
          categoria,
          caminho_storage: path,
          url_arquivo: urlData.publicUrl,
        });
      if (dbError) throw dbError;
    },
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: ["cliente_documentos", vars.clienteId] });
      toast.success("Documento enviado com sucesso!");
    },
    onError: (err: Error) => {
      toast.error("Erro ao enviar documento: " + err.message);
    },
  });
}
