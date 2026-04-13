import { useState } from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FolderOpen, Scale, Search, Loader2, Plus, Check,
} from "lucide-react";
import { useWorkspaceCases, useWorkspaceProcesses, useMoveConversation, useCreateWorkspaceCase, useCreateWorkspaceProcess } from "@/hooks/use-workspace";
import { NewCaseModal } from "./NewCaseModal";
import { NewProcessModal } from "./NewProcessModal";

interface MoveConversationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  conversationId: string;
  currentContextType?: string;
  currentCaseId?: string | null;
  currentProcessId?: string | null;
}

export function MoveConversationDialog({
  open,
  onOpenChange,
  conversationId,
  currentContextType = "unassigned",
  currentCaseId = null,
  currentProcessId = null,
}: MoveConversationDialogProps) {
  const [tab, setTab] = useState("case");
  const [caseSearch, setCaseSearch] = useState("");
  const [processSearch, setProcessSearch] = useState("");
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  const [selectedProcessId, setSelectedProcessId] = useState<string | null>(null);
  const [showNewCase, setShowNewCase] = useState(false);
  const [showNewProcess, setShowNewProcess] = useState(false);

  const { data: cases } = useWorkspaceCases();
  const { data: processes } = useWorkspaceProcesses();
  const moveConversation = useMoveConversation();

  const filteredCases = (cases || []).filter(c =>
    c.nome.toLowerCase().includes(caseSearch.toLowerCase()) ||
    (c.cliente || "").toLowerCase().includes(caseSearch.toLowerCase())
  );

  const filteredProcesses = (processes || []).filter(p =>
    (p.nome || "").toLowerCase().includes(processSearch.toLowerCase()) ||
    (p.numero_cnj || "").toLowerCase().includes(processSearch.toLowerCase()) ||
    (p.cliente || "").toLowerCase().includes(processSearch.toLowerCase())
  );

  const handleMoveToCase = async () => {
    if (!selectedCaseId) return;
    await moveConversation.mutateAsync({
      conversationId,
      toContextType: "case",
      toCaseId: selectedCaseId,
      toProcessId: null,
      fromContextType: currentContextType,
      fromCaseId: currentCaseId,
      fromProcessId: currentProcessId,
    });
    onOpenChange(false);
    reset();
  };

  const handleMoveToProcess = async () => {
    if (!selectedProcessId) return;
    await moveConversation.mutateAsync({
      conversationId,
      toContextType: "process",
      toCaseId: null,
      toProcessId: selectedProcessId,
      fromContextType: currentContextType,
      fromCaseId: currentCaseId,
      fromProcessId: currentProcessId,
    });
    onOpenChange(false);
    reset();
  };

  const reset = () => {
    setCaseSearch("");
    setProcessSearch("");
    setSelectedCaseId(null);
    setSelectedProcessId(null);
  };

  const isMoving = moveConversation.isPending;

  return (
    <>
      <Dialog open={open && !showNewCase && !showNewProcess} onOpenChange={(v) => { if (!isMoving) { onOpenChange(v); if (!v) reset(); } }}>
        <DialogContent className="sm:max-w-[500px] bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-base font-semibold text-foreground">
              Mover conversa
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Vincule esta conversa a um caso ou processo existente, ou crie um novo.
            </DialogDescription>
          </DialogHeader>

          <Tabs value={tab} onValueChange={setTab} className="mt-1">
            <TabsList className="grid w-full grid-cols-2 h-9">
              <TabsTrigger value="case" className="text-xs gap-1.5">
                <FolderOpen className="h-3.5 w-3.5" /> Caso
              </TabsTrigger>
              <TabsTrigger value="process" className="text-xs gap-1.5">
                <Scale className="h-3.5 w-3.5" /> Processo
              </TabsTrigger>
            </TabsList>

            {/* ── Move to Case ── */}
            <TabsContent value="case" className="mt-3 space-y-3">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input
                  placeholder="Buscar caso por nome ou cliente..."
                  value={caseSearch}
                  onChange={e => setCaseSearch(e.target.value)}
                  className="pl-8 h-8 text-xs bg-secondary border-border"
                />
              </div>

              <div className="max-h-[220px] overflow-y-auto space-y-1 rounded-md border border-border p-1">
                {filteredCases.length === 0 ? (
                  <p className="text-xs text-muted-foreground text-center py-6">Nenhum caso encontrado</p>
                ) : (
                  filteredCases.map(c => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCaseId(c.id === selectedCaseId ? null : c.id)}
                      className={`w-full text-left rounded-md px-3 py-2.5 transition-colors ${
                        selectedCaseId === c.id
                          ? "bg-primary/10 border border-primary/30"
                          : "hover:bg-secondary/80 border border-transparent"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-medium text-foreground truncate">{c.nome}</p>
                        {selectedCaseId === c.id && <Check className="h-3.5 w-3.5 text-primary shrink-0" />}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        {c.cliente && <span className="text-[10px] text-muted-foreground">{c.cliente}</span>}
                        {c.area_juridica && (
                          <>
                            <span className="text-[10px] text-muted-foreground/50">·</span>
                            <span className="text-[10px] text-muted-foreground">{c.area_juridica}</span>
                          </>
                        )}
                      </div>
                    </button>
                  ))
                )}
              </div>

              <div className="flex items-center justify-between pt-1">
                <Button
                  variant="ghost" size="sm"
                  className="text-xs gap-1.5 text-primary h-7"
                  onClick={() => setShowNewCase(true)}
                >
                  <Plus className="h-3.5 w-3.5" /> Criar novo caso
                </Button>
                <Button
                  size="sm" className="h-8 text-xs gap-1.5"
                  disabled={!selectedCaseId || isMoving}
                  onClick={handleMoveToCase}
                >
                  {isMoving && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                  Confirmar
                </Button>
              </div>
            </TabsContent>

            {/* ── Move to Process ── */}
            <TabsContent value="process" className="mt-3 space-y-3">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome, CNJ ou cliente..."
                  value={processSearch}
                  onChange={e => setProcessSearch(e.target.value)}
                  className="pl-8 h-8 text-xs bg-secondary border-border"
                />
              </div>

              <div className="max-h-[220px] overflow-y-auto space-y-1 rounded-md border border-border p-1">
                {filteredProcesses.length === 0 ? (
                  <p className="text-xs text-muted-foreground text-center py-6">Nenhum processo encontrado</p>
                ) : (
                  filteredProcesses.map(p => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedProcessId(p.id === selectedProcessId ? null : p.id)}
                      className={`w-full text-left rounded-md px-3 py-2.5 transition-colors ${
                        selectedProcessId === p.id
                          ? "bg-primary/10 border border-primary/30"
                          : "hover:bg-secondary/80 border border-transparent"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-medium text-foreground truncate">{p.nome || "Sem nome"}</p>
                        {selectedProcessId === p.id && <Check className="h-3.5 w-3.5 text-primary shrink-0" />}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        {p.numero_cnj && (
                          <span className="text-[10px] font-mono text-primary">{p.numero_cnj}</span>
                        )}
                        {p.cliente && (
                          <>
                            <span className="text-[10px] text-muted-foreground/50">·</span>
                            <span className="text-[10px] text-muted-foreground">{p.cliente}</span>
                          </>
                        )}
                      </div>
                    </button>
                  ))
                )}
              </div>

              <div className="flex items-center justify-between pt-1">
                <Button
                  variant="ghost" size="sm"
                  className="text-xs gap-1.5 text-primary h-7"
                  onClick={() => setShowNewProcess(true)}
                >
                  <Plus className="h-3.5 w-3.5" /> Criar novo processo
                </Button>
                <Button
                  size="sm" className="h-8 text-xs gap-1.5"
                  disabled={!selectedProcessId || isMoving}
                  onClick={handleMoveToProcess}
                >
                  {isMoving && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                  Confirmar
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Nested modals for creating new case/process and auto-moving */}
      <NewCaseModal
        open={showNewCase}
        onOpenChange={(v) => {
          setShowNewCase(v);
          if (!v) onOpenChange(false);
        }}
        onCreated={async (newCaseId) => {
          await moveConversation.mutateAsync({
            conversationId,
            toContextType: "case",
            toCaseId: newCaseId,
            toProcessId: null,
            fromContextType: currentContextType,
            fromCaseId: currentCaseId,
            fromProcessId: currentProcessId,
          });
          setShowNewCase(false);
          onOpenChange(false);
          reset();
        }}
      />
      <NewProcessModal
        open={showNewProcess}
        onOpenChange={(v) => {
          setShowNewProcess(v);
          if (!v) onOpenChange(false);
        }}
        onCreated={async (newProcessId) => {
          await moveConversation.mutateAsync({
            conversationId,
            toContextType: "process",
            toCaseId: null,
            toProcessId: newProcessId,
            fromContextType: currentContextType,
            fromCaseId: currentCaseId,
            fromProcessId: currentProcessId,
          });
          setShowNewProcess(false);
          onOpenChange(false);
          reset();
        }}
      />
    </>
  );
}
