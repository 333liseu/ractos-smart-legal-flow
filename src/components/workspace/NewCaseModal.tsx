import { useState, useRef } from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Paperclip, X, Loader2, Info, FolderOpen } from "lucide-react";
import { useCreateWorkspaceCase, useUploadWorkspaceFile } from "@/hooks/use-workspace";
import { useNavigate } from "react-router-dom";

interface NewCaseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated?: (caseId: string) => void;
}

const areasJuridicas = [
  "Trabalhista", "Cível", "Criminal", "Tributário", "Administrativo",
  "Empresarial", "Ambiental", "Família", "Consumidor", "Previdenciário",
];

export function NewCaseModal({ open, onOpenChange, onCreated }: NewCaseModalProps) {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const createCase = useCreateWorkspaceCase();
  const uploadFile = useUploadWorkspaceFile();

  const [nome, setNome] = useState("");
  const [cliente, setCliente] = useState("");
  const [area, setArea] = useState("");
  const [relato, setRelato] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canSubmit = nome.trim().length > 0 && !isSubmitting;

  const handleFilesAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFiles(prev => [...prev, ...Array.from(e.target.files!)]);
  };

  const removeFile = (idx: number) => setFiles(prev => prev.filter((_, i) => i !== idx));

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setIsSubmitting(true);
    try {
      const newCase = await createCase.mutateAsync({
        nome: nome.trim(),
        cliente: cliente.trim() || undefined,
        area_juridica: area || undefined,
        relato: relato.trim() || undefined,
      });

      // Upload files in parallel
      if (files.length > 0) {
        await Promise.all(
          files.map(file =>
            uploadFile.mutateAsync({ file, caseId: newCase.id, categoria: "Anexo inicial" })
          )
        );
      }

      resetForm();
      onOpenChange(false);
      if (onCreated) {
        onCreated(newCase.id);
      } else {
        navigate(`/workspace/${newCase.id}`);
      }
    } catch {
      // errors handled by hooks
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setNome(""); setCliente(""); setArea(""); setRelato(""); setFiles([]);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!isSubmitting) { onOpenChange(v); if (!v) resetForm(); } }}>
      <DialogContent className="sm:max-w-[560px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
            <FolderOpen className="h-5 w-5 text-primary" />
            Criar novo caso
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-xs">
            Um caso organiza todas as conversas, documentos e análises de uma demanda jurídica.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Nome do caso */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-foreground">Nome do caso *</Label>
            <Input
              placeholder="Ex: Recurso Trabalhista — João da Silva"
              value={nome}
              onChange={e => setNome(e.target.value)}
              className="bg-secondary border-border text-sm"
            />
          </div>

          {/* Cliente */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-foreground">Cliente</Label>
            <Input
              placeholder="Nome do cliente"
              value={cliente}
              onChange={e => setCliente(e.target.value)}
              className="bg-secondary border-border text-sm"
            />
          </div>

          {/* Área jurídica */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-foreground">Área jurídica</Label>
            <Select value={area} onValueChange={setArea}>
              <SelectTrigger className="bg-secondary border-border text-sm">
                <SelectValue placeholder="Selecione a área" />
              </SelectTrigger>
              <SelectContent>
                {areasJuridicas.map(a => (
                  <SelectItem key={a} value={a}>{a}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Relato */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-foreground">Relato do caso</Label>
            <Textarea
              placeholder="Descreva brevemente os fatos, contexto e objetivo..."
              value={relato}
              onChange={e => setRelato(e.target.value)}
              className="bg-secondary border-border text-sm min-h-[80px] resize-none"
            />
          </div>

          {/* Upload */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-foreground">Arquivos iniciais</Label>
            <input
              ref={fileRef}
              type="file"
              multiple
              className="hidden"
              onChange={handleFilesAdd}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="gap-1.5 text-xs h-8"
              onClick={() => fileRef.current?.click()}
            >
              <Paperclip className="h-3.5 w-3.5" /> Anexar arquivos
            </Button>
            {files.length > 0 && (
              <div className="space-y-1 mt-2">
                {files.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 bg-secondary/60 rounded px-2.5 py-1.5">
                    <Paperclip className="h-3 w-3 text-muted-foreground shrink-0" />
                    <span className="text-xs text-foreground truncate flex-1">{f.name}</span>
                    <button onClick={() => removeFile(i)} className="text-muted-foreground hover:text-foreground">
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info box */}
          <div className="rounded-lg border border-border bg-secondary/30 p-3 flex items-start gap-2.5">
            <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Um <strong className="text-foreground">caso</strong> é o centro de trabalho do Actus Workspace.
              Ele reúne conversas com agentes de IA, documentos, análises e outputs gerados — tudo
              vinculado a uma demanda específica.
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button size="sm" onClick={handleSubmit} disabled={!canSubmit} className="gap-1.5">
            {isSubmitting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            Criar caso
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
