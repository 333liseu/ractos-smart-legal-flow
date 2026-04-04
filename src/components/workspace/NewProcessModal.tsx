import { useState, useRef } from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Paperclip, X, Loader2, Scale, ChevronRight, ArrowLeft } from "lucide-react";
import { useCreateWorkspaceCase, useCreateWorkspaceProcess, useUploadWorkspaceFile } from "@/hooks/use-workspace";
import { useNavigate } from "react-router-dom";

interface NewProcessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const tribunais = [
  "TRT-1 (RJ)", "TRT-2 (SP)", "TRT-3 (MG)", "TRT-4 (RS)", "TRT-5 (BA)",
  "TRT-15 (Campinas)", "TST", "STF", "STJ",
  "TJSP", "TJRJ", "TJMG", "TJRS", "TJBA", "TJPR", "TJSC",
  "TRF-1", "TRF-2", "TRF-3", "TRF-4", "TRF-5",
];

const statusList = ["Em andamento", "Suspenso", "Arquivado", "Recurso pendente", "Aguardando sentença"];

export function NewProcessModal({ open, onOpenChange }: NewProcessModalProps) {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const createCase = useCreateWorkspaceCase();
  const createProcess = useCreateWorkspaceProcess();
  const uploadFile = useUploadWorkspaceFile();

  const [step, setStep] = useState<1 | 2>(1);
  const [cnj, setCnj] = useState("");
  const [naoDistribuido, setNaoDistribuido] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  // Step 2 fields
  const [nome, setNome] = useState("");
  const [cliente, setCliente] = useState("");
  const [relato, setRelato] = useState("");
  const [tribunal, setTribunal] = useState("");
  const [orgao, setOrgao] = useState("");
  const [classe, setClasse] = useState("");
  const [status, setStatus] = useState("Em andamento");
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canValidate = cnj.trim().length > 0 || naoDistribuido;
  const canSubmit = nome.trim().length > 0 && !isSubmitting;

  const handleValidate = async () => {
    setIsValidating(true);
    // Simulate CNJ validation delay
    await new Promise(r => setTimeout(r, 800));
    setIsValidating(false);
    setStep(2);
  };

  const handleFilesAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFiles(prev => [...prev, ...Array.from(e.target.files!)]);
  };

  const removeFile = (idx: number) => setFiles(prev => prev.filter((_, i) => i !== idx));

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setIsSubmitting(true);
    try {
      // Create a case first, then attach the process
      const newCase = await createCase.mutateAsync({
        nome: nome.trim(),
        cliente: cliente.trim() || undefined,
        relato: relato.trim() || undefined,
      });

      await createProcess.mutateAsync({
        case_id: newCase.id,
        numero_cnj: naoDistribuido ? null : cnj.trim() || undefined,
        nome: nome.trim(),
        cliente: cliente.trim() || undefined,
        relato: relato.trim() || undefined,
        tribunal: tribunal || undefined,
        orgao_julgador: orgao.trim() || undefined,
        classe_acao: classe.trim() || undefined,
        status: status,
      } as any);

      if (files.length > 0) {
        await Promise.all(
          files.map(file =>
            uploadFile.mutateAsync({ file, caseId: newCase.id, categoria: "Autos" })
          )
        );
      }

      resetForm();
      onOpenChange(false);
      navigate(`/workspace/${newCase.id}`);
    } catch {
      // errors handled by hooks
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setStep(1); setCnj(""); setNaoDistribuido(false);
    setNome(""); setCliente(""); setRelato(""); setTribunal("");
    setOrgao(""); setClasse(""); setStatus("Em andamento"); setFiles([]);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!isSubmitting) { onOpenChange(v); if (!v) resetForm(); } }}>
      <DialogContent className="sm:max-w-[560px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Scale className="h-5 w-5 text-primary" />
            Novo processo
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-xs">
            {step === 1
              ? "Informe o número do processo para iniciar."
              : "Complete as informações do processo."}
          </DialogDescription>
        </DialogHeader>

        {/* ── Step indicator ── */}
        <div className="flex items-center gap-2 pb-1">
          <div className={`h-1.5 flex-1 rounded-full ${step >= 1 ? 'bg-primary' : 'bg-secondary'}`} />
          <div className={`h-1.5 flex-1 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-secondary'}`} />
        </div>

        {step === 1 ? (
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-foreground">Número CNJ</Label>
              <Input
                placeholder="0000000-00.0000.0.00.0000"
                value={cnj}
                onChange={e => setCnj(e.target.value)}
                className="bg-secondary border-border text-sm font-mono"
                disabled={naoDistribuido}
              />
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="nao-distribuido"
                checked={naoDistribuido}
                onCheckedChange={(v) => setNaoDistribuido(!!v)}
              />
              <label htmlFor="nao-distribuido" className="text-xs text-muted-foreground cursor-pointer">
                Este processo não foi distribuído
              </label>
            </div>

            <DialogFooter className="gap-2 pt-2">
              <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button size="sm" onClick={handleValidate} disabled={!canValidate} className="gap-1.5">
                {isValidating ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <ChevronRight className="h-3.5 w-3.5" />
                )}
                Validar
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <div className="space-y-3 py-2 max-h-[60vh] overflow-y-auto pr-1">
            {/* Nome do caso */}
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-foreground">Nome do caso *</Label>
              <Input
                placeholder="Ex: Ação Trabalhista — Empresa X"
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

            {/* Relato */}
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-foreground">Relato do caso</Label>
              <Textarea
                placeholder="Descreva o contexto..."
                value={relato}
                onChange={e => setRelato(e.target.value)}
                className="bg-secondary border-border text-sm min-h-[60px] resize-none"
              />
            </div>

            {/* CNJ display */}
            {!naoDistribuido && cnj && (
              <div className="rounded bg-secondary/50 px-3 py-2">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">CNJ</span>
                <p className="text-xs font-mono text-primary mt-0.5">{cnj}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              {/* Tribunal */}
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-foreground">Tribunal</Label>
                <Select value={tribunal} onValueChange={setTribunal}>
                  <SelectTrigger className="bg-secondary border-border text-xs">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {tribunais.map(t => (
                      <SelectItem key={t} value={t} className="text-xs">{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Status */}
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-foreground">Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="bg-secondary border-border text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusList.map(s => (
                      <SelectItem key={s} value={s} className="text-xs">{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Órgão julgador */}
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-foreground">Órgão julgador</Label>
              <Input
                placeholder="Ex: 1ª Vara do Trabalho"
                value={orgao}
                onChange={e => setOrgao(e.target.value)}
                className="bg-secondary border-border text-sm"
              />
            </div>

            {/* Classe / ação */}
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-foreground">Classe / Ação</Label>
              <Input
                placeholder="Ex: Reclamação Trabalhista"
                value={classe}
                onChange={e => setClasse(e.target.value)}
                className="bg-secondary border-border text-sm"
              />
            </div>

            {/* Upload autos */}
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-foreground">Upload dos autos</Label>
              <input ref={fileRef} type="file" multiple className="hidden" onChange={handleFilesAdd} />
              <Button
                type="button" variant="outline" size="sm"
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

            <DialogFooter className="gap-2 pt-2">
              <Button variant="ghost" size="sm" onClick={() => setStep(1)} disabled={isSubmitting} className="gap-1">
                <ArrowLeft className="h-3.5 w-3.5" /> Voltar
              </Button>
              <Button size="sm" onClick={handleSubmit} disabled={!canSubmit} className="gap-1.5">
                {isSubmitting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                Criar processo
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
