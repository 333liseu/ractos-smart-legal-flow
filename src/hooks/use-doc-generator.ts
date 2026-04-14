import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface DocumentTemplate {
  id: string;
  nome: string;
  categoria: string;
  descricao: string | null;
  conteudo_template: string | null;
  ativo: boolean;
  usos: number;
  created_at: string;
}

export interface GenerationRun {
  id: string;
  template_id: string | null;
  cliente_id: string | null;
  case_id: string | null;
  process_id: string | null;
  prompt: string | null;
  status: string;
  documento_final: string | null;
  documento_docx_path: string | null;
  campos_extraidos: any;
  created_at: string;
}

export function useDocumentTemplates() {
  return useQuery({
    queryKey: ["document-templates"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("document_templates")
        .select("*")
        .eq("ativo", true)
        .order("categoria", { ascending: true })
        .order("nome", { ascending: true });
      if (error) throw error;
      return data as DocumentTemplate[];
    },
  });
}

export function useGenerationRuns() {
  return useQuery({
    queryKey: ["generation-runs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("document_generation_runs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(20);
      if (error) throw error;
      return data as GenerationRun[];
    },
  });
}

export function useCreateGenerationRun() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      template_id?: string;
      cliente_id?: string;
      case_id?: string;
      process_id?: string;
      prompt: string;
      files?: File[];
    }) => {
      // Create the run
      const { data: run, error } = await supabase
        .from("document_generation_runs")
        .insert({
          template_id: params.template_id || null,
          cliente_id: params.cliente_id || null,
          case_id: params.case_id || null,
          process_id: params.process_id || null,
          prompt: params.prompt,
          status: "gerando",
        })
        .select()
        .single();
      if (error) throw error;

      // Upload files
      if (params.files && params.files.length > 0) {
        for (const file of params.files) {
          const path = `${run.id}/${Date.now()}-${file.name}`;
          const { error: uploadError } = await supabase.storage
            .from("doc-generation")
            .upload(path, file);
          if (uploadError) {
            console.error("Upload error:", uploadError);
            continue;
          }
          await supabase.from("document_generation_files").insert({
            run_id: run.id,
            nome_arquivo: file.name,
            caminho_storage: path,
            tipo_arquivo: file.type,
          });
        }
      }

      return run;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["generation-runs"] });
      toast.success("Geração iniciada com sucesso");
    },
    onError: (err: any) => {
      toast.error("Erro ao iniciar geração: " + err.message);
    },
  });
}
