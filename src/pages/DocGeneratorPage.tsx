import { AppLayout } from "@/components/AppLayout";
import { Sparkles, FileText, Upload, X, Plus, Download, Eye, ChevronRight, Search, Scale, Banknote, FileCheck, ScrollText, Gavel, AlertTriangle, Paperclip, User, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { useState, useRef, useCallback } from "react";
import { fadeUp } from '@/lib/animations';
import { useDocumentTemplates, useCreateGenerationRun } from "@/hooks/use-doc-generator";
import { useClientes } from "@/hooks/use-clientes";
import { toast } from "sonner";

const COMPLEX_KEYWORDS = [
  "petição inicial", "contestação", "mandado de segurança", "apelação",
  "agravo", "embargos", "recurso especial", "recurso extraordinário",
  "ação rescisória", "habeas corpus", "tutela provisória",
];

const CATEGORIES = [
  { key: "Representação", label: "Representação", icon: Scale, color: "text-primary" },
  { key: "Honorários e Comercial", label: "Honorários e Comercial", icon: Banknote, color: "text-success" },
  { key: "Financeiro e Custas", label: "Financeiro e Custas", icon: FileCheck, color: "text-warning" },
  { key: "Declarações", label: "Declarações", icon: ScrollText, color: "text-ai" },
  { key: "Petições Simples", label: "Petições Simples", icon: Gavel, color: "text-muted-foreground" },
];

export default function DocGeneratorPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [searchTemplate, setSearchTemplate] = useState("");
  const [aiPrompt, setAiPrompt] = useState("");
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [useCliente, setUseCliente] = useState(false);
  const [useProcesso, setUseProcesso] = useState(false);
  const [useAnexos, setUseAnexos] = useState(true);
  const [selectedClienteId, setSelectedClienteId] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: templates = [], isLoading: loadingTemplates } = useDocumentTemplates();
  const { data: clientes = [] } = useClientes();
  const createRun = useCreateGenerationRun();

  const filteredTemplates = templates.filter((t) => {
    const matchesCategory = !selectedCategory || t.categoria === selectedCategory;
    const matchesSearch = !searchTemplate ||
      t.nome.toLowerCase().includes(searchTemplate.toLowerCase()) ||
      t.categoria.toLowerCase().includes(searchTemplate.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const selectedTmpl = templates.find((t) => t.id === selectedTemplate);

  const handleFileDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    setAttachedFiles((prev) => [...prev, ...files]);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachedFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
  }, []);

  const removeFile = (index: number) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const isComplexPiece = (text: string) => {
    return COMPLEX_KEYWORDS.some((kw) => text.toLowerCase().includes(kw));
  };

  const handleGenerate = () => {
    if (!aiPrompt.trim() && !selectedTemplate) {
      toast.error("Descreva o documento ou selecione um modelo.");
      return;
    }
    if (isComplexPiece(aiPrompt)) {
      toast.error("Esse tipo de peça deve ser gerado no Workspace Jurídico / Redação.", {
        icon: <AlertTriangle className="h-4 w-4" />,
        duration: 5000,
      });
      return;
    }
    const prompt = selectedTmpl
      ? `Gerar documento: ${selectedTmpl.nome}. ${aiPrompt}`
      : aiPrompt;

    createRun.mutate({
      template_id: selectedTemplate || undefined,
      cliente_id: useCliente && selectedClienteId ? selectedClienteId : undefined,
      prompt,
      files: attachedFiles.length > 0 ? attachedFiles : undefined,
    });
  };

  const categoryCount = (key: string) => templates.filter((t) => t.categoria === key).length;

  return (
    <AppLayout>
      <div className="p-6 max-w-[1400px] mx-auto">
        <motion.div initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}>

          {/* Header */}
          <motion.div variants={fadeUp} className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-bold text-foreground tracking-tight flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" /> Gerar Documento
              </h1>
              <p className="text-sm text-muted-foreground">Fábrica de documentos simples, padronizados e operacionais</p>
            </div>
          </motion.div>

          {/* Categories */}
          <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(isActive ? null : cat.key)}
                  className={`bg-card rounded-xl border p-4 text-left transition-all group hover:shadow-elevated ${
                    isActive ? "border-primary shadow-elevated" : "border-border hover:border-primary/30"
                  }`}
                >
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <Icon className={`h-4.5 w-4.5 ${isActive ? "text-primary" : cat.color} transition-colors`} />
                    <span className="text-xs font-semibold text-foreground">{cat.label}</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground">{categoryCount(cat.key)} modelos</span>
                </button>
              );
            })}
          </motion.div>

          {/* AI Composer */}
          <motion.div variants={fadeUp} className="bg-card rounded-xl border border-ai/20 p-5 shadow-card mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-ai" />
              <h3 className="text-sm font-semibold text-foreground">Gerar com IA</h3>
            </div>

            {/* Chips */}
            <div className="flex flex-wrap gap-2 mb-3">
              <button
                onClick={() => setUseCliente(!useCliente)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  useCliente ? "bg-primary/20 text-primary border border-primary/30" : "bg-secondary text-muted-foreground border border-border hover:text-foreground"
                }`}
              >
                <User className="h-3 w-3" /> Usar cliente
              </button>
              <button
                onClick={() => setUseProcesso(!useProcesso)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  useProcesso ? "bg-primary/20 text-primary border border-primary/30" : "bg-secondary text-muted-foreground border border-border hover:text-foreground"
                }`}
              >
                <Briefcase className="h-3 w-3" /> Usar processo
              </button>
              <button
                onClick={() => setUseAnexos(!useAnexos)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  useAnexos ? "bg-primary/20 text-primary border border-primary/30" : "bg-secondary text-muted-foreground border border-border hover:text-foreground"
                }`}
              >
                <Paperclip className="h-3 w-3" /> Usar anexos
              </button>
            </div>

            {/* Client selector */}
            {useCliente && (
              <div className="mb-3">
                <select
                  value={selectedClienteId}
                  onChange={(e) => setSelectedClienteId(e.target.value)}
                  className="w-full md:w-80 h-9 rounded-lg border border-border bg-secondary px-3 text-xs text-foreground"
                >
                  <option value="">Selecione o cliente...</option>
                  {clientes.map((c) => (
                    <option key={c.id} value={c.id}>{c.nome_razao_social}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Selected template badge */}
            {selectedTmpl && (
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] bg-primary/15 text-primary rounded-md px-2 py-1 font-medium flex items-center gap-1">
                  <FileText className="h-3 w-3" /> {selectedTmpl.nome}
                </span>
                <button onClick={() => setSelectedTemplate(null)} className="text-muted-foreground hover:text-foreground">
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}

            {/* Textarea + drag-drop zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleFileDrop}
              className={`relative rounded-lg border transition-all ${
                isDragging ? "border-ai bg-ai/5" : "border-border"
              }`}
            >
              {isDragging && (
                <div className="absolute inset-0 flex items-center justify-center bg-ai/5 rounded-lg z-10 pointer-events-none">
                  <div className="flex flex-col items-center gap-1">
                    <Upload className="h-6 w-6 text-ai" />
                    <span className="text-xs text-ai font-medium">Solte os arquivos aqui</span>
                  </div>
                </div>
              )}
              <Textarea
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                className="min-h-[100px] bg-secondary border-0 resize-none text-sm"
                placeholder="Descreva o documento ou anexe arquivos. Ex.: Faça uma procuração desse cliente com base na CNH e no comprovante de endereço."
              />
            </div>

            {/* Attached files */}
            {attachedFiles.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {attachedFiles.map((file, i) => (
                  <div key={i} className="flex items-center gap-1.5 bg-secondary rounded-lg px-2.5 py-1.5 text-xs text-foreground border border-border">
                    <Paperclip className="h-3 w-3 text-muted-foreground" />
                    <span className="max-w-[150px] truncate">{file.name}</span>
                    <span className="text-[10px] text-muted-foreground">({(file.size / 1024).toFixed(0)}KB)</span>
                    <button onClick={() => removeFile(i)} className="text-muted-foreground hover:text-destructive ml-1">
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between mt-3">
              <div className="flex gap-2">
                <input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleFileSelect} />
                <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} className="gap-1.5 text-xs">
                  <Paperclip className="h-3.5 w-3.5" /> Anexar
                </Button>
              </div>
              <Button
                onClick={handleGenerate}
                disabled={createRun.isPending || (!aiPrompt.trim() && !selectedTemplate)}
                className="gap-1.5"
              >
                <Sparkles className="h-4 w-4" />
                {createRun.isPending ? "Gerando..." : "Gerar documento"}
              </Button>
            </div>
          </motion.div>

          {/* Template grid */}
          <motion.div variants={fadeUp}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-foreground">
                {selectedCategory || "Todos os modelos"}
                <span className="text-muted-foreground font-normal ml-2">({filteredTemplates.length})</span>
              </h3>
              <div className="relative w-56">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input
                  placeholder="Buscar modelo..."
                  value={searchTemplate}
                  onChange={(e) => setSearchTemplate(e.target.value)}
                  className="pl-8 h-8 text-xs bg-secondary"
                />
              </div>
            </div>

            {loadingTemplates ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-card rounded-xl border border-border p-4 animate-pulse">
                    <div className="h-4 bg-secondary rounded w-3/4 mb-2" />
                    <div className="h-3 bg-secondary rounded w-full" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {filteredTemplates.map((tmpl) => {
                  const catDef = CATEGORIES.find((c) => c.key === tmpl.categoria);
                  const Icon = catDef?.icon || FileText;
                  const isSelected = selectedTemplate === tmpl.id;
                  return (
                    <button
                      key={tmpl.id}
                      onClick={() => {
                        setSelectedTemplate(isSelected ? null : tmpl.id);
                      }}
                      className={`bg-card rounded-xl border p-4 text-left shadow-card hover:shadow-elevated transition-all group ${
                        isSelected ? "border-primary ring-1 ring-primary/20" : "border-border hover:border-primary/30"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`h-9 w-9 rounded-lg bg-secondary flex items-center justify-center shrink-0 ${isSelected ? "bg-primary/10" : ""}`}>
                          <Icon className={`h-4 w-4 ${isSelected ? "text-primary" : "text-muted-foreground"} group-hover:text-primary transition-colors`} />
                        </div>
                        <div className="min-w-0">
                          <p className={`text-sm font-medium ${isSelected ? "text-primary" : "text-foreground"} group-hover:text-primary transition-colors`}>
                            {tmpl.nome}
                          </p>
                          {tmpl.descricao && (
                            <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2">{tmpl.descricao}</p>
                          )}
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-[10px] bg-secondary text-muted-foreground rounded px-1.5 py-0.5">{tmpl.categoria}</span>
                            <span className="text-[10px] text-muted-foreground">{tmpl.usos} usos</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
