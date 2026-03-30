import { AppLayout } from "@/components/AppLayout";
import { Sparkles, FileText, Plus, Download, Eye, Save, ChevronRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useState } from "react";
import { fadeUp } from '@/lib/animations';
import { mockActusClients, mockActusProcesses } from "@/lib/mock-data";

const templates = [
  { id: '1', name: 'Petição Inicial', description: 'Modelo padrão de petição inicial cível', category: 'Cível', uses: 45 },
  { id: '2', name: 'Recurso de Apelação', description: 'Modelo de apelação com fundamentação', category: 'Recursal', uses: 23 },
  { id: '3', name: 'Contestação', description: 'Modelo de contestação com preliminares', category: 'Cível', uses: 38 },
  { id: '4', name: 'Mandado de Segurança', description: 'Modelo de MS com pedido liminar', category: 'Administrativo', uses: 12 },
  { id: '5', name: 'Contrato de Honorários', description: 'Modelo de contrato de prestação de serviços', category: 'Administrativo', uses: 67 },
  { id: '6', name: 'Notificação Extrajudicial', description: 'Modelo de notificação para cobrança', category: 'Cobrança', uses: 31 },
  { id: '7', name: 'Procuração Ad Judicia', description: 'Modelo de procuração judicial', category: 'Mandato', uses: 89 },
  { id: '8', name: 'Substabelecimento', description: 'Modelo de substabelecimento com reservas', category: 'Mandato', uses: 54 },
];

type Step = 'select' | 'configure' | 'preview';

export default function DocGeneratorPage() {
  const [step, setStep] = useState<Step>('select');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedProcess, setSelectedProcess] = useState('');
  const [searchTemplate, setSearchTemplate] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');

  const filteredTemplates = templates.filter(t =>
    t.name.toLowerCase().includes(searchTemplate.toLowerCase()) ||
    t.category.toLowerCase().includes(searchTemplate.toLowerCase())
  );

  const selectedTmpl = templates.find(t => t.id === selectedTemplate);

  return (
    <AppLayout>
      <div className="p-6 max-w-[1400px] mx-auto">
        <motion.div initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}>
          <motion.div variants={fadeUp} className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-bold text-foreground tracking-tight flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-ai" /> Gerador de Documentos
              </h1>
              <p className="text-sm text-muted-foreground">Crie documentos jurídicos com IA</p>
            </div>
            <Button className="active-scale gap-2"><Plus className="h-4 w-4" /> Novo Modelo</Button>
          </motion.div>

          {/* Steps Indicator */}
          <motion.div variants={fadeUp} className="flex items-center gap-2 mb-6">
            {[
              { key: 'select', label: '1. Escolher Tipo' },
              { key: 'configure', label: '2. Configurar' },
              { key: 'preview', label: '3. Prévia & Exportar' },
            ].map((s, i) => (
              <div key={s.key} className="flex items-center gap-2">
                {i > 0 && <ChevronRight className="h-4 w-4 text-muted-foreground/40" />}
                <button
                  onClick={() => {
                    if (s.key === 'select') setStep('select');
                    if (s.key === 'configure' && selectedTemplate) setStep('configure');
                    if (s.key === 'preview' && selectedTemplate && selectedClient) setStep('preview');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    step === s.key
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {s.label}
                </button>
              </div>
            ))}
          </motion.div>

          {/* AI Quick Generate */}
          <motion.div variants={fadeUp} className="bg-card rounded-lg border border-ai/20 p-5 shadow-card mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-ai" />
              <h3 className="text-sm font-semibold text-foreground">Gerar com IA</h3>
            </div>
            <p className="text-xs text-muted-foreground mb-3">Descreva o documento e a IA criará automaticamente com base nos dados do processo.</p>
            <div className="flex gap-2">
              <Input
                value={aiPrompt}
                onChange={e => setAiPrompt(e.target.value)}
                className="flex-1 bg-secondary border-border"
                placeholder="Ex: Gerar petição de apelação para o processo 4001234-56.2024.8.26.0400"
              />
              <Button className="gap-1.5 active-scale"><Sparkles className="h-4 w-4" /> Gerar</Button>
            </div>
          </motion.div>

          {/* Step 1: Select Template */}
          {step === 'select' && (
            <motion.div variants={fadeUp}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-foreground">Modelos Disponíveis</h3>
                <div className="relative w-60">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    placeholder="Buscar modelo..."
                    value={searchTemplate}
                    onChange={e => setSearchTemplate(e.target.value)}
                    className="pl-8 h-8 text-xs bg-secondary"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {filteredTemplates.map((tmpl) => (
                  <button
                    key={tmpl.id}
                    onClick={() => { setSelectedTemplate(tmpl.id); setStep('configure'); }}
                    className={`bg-card rounded-lg border p-4 text-left shadow-card hover:shadow-elevated transition-all group ${
                      selectedTemplate === tmpl.id ? 'border-primary' : 'border-border hover:border-primary/30'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                        <FileText className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{tmpl.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{tmpl.description}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-[10px] bg-secondary text-muted-foreground rounded px-1.5 py-0.5">{tmpl.category}</span>
                          <span className="text-[10px] text-muted-foreground">{tmpl.uses} usos</span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Configure */}
          {step === 'configure' && selectedTmpl && (
            <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-card rounded-lg border border-border p-5 shadow-card">
                  <h3 className="text-sm font-semibold text-foreground mb-4">Configuração do Documento</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Modelo selecionado</label>
                      <div className="bg-secondary rounded-lg px-3 py-2 text-sm text-foreground">{selectedTmpl.name}</div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Cliente</label>
                      <select
                        value={selectedClient}
                        onChange={e => setSelectedClient(e.target.value)}
                        className="w-full h-10 rounded-lg border border-border bg-secondary px-3 text-sm text-foreground"
                      >
                        <option value="">Selecione o cliente...</option>
                        {mockActusClients.slice(0, 20).map(c => (
                          <option key={c.id} value={c.id}>{c.nome_razao_social}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Processo (opcional)</label>
                      <select
                        value={selectedProcess}
                        onChange={e => setSelectedProcess(e.target.value)}
                        className="w-full h-10 rounded-lg border border-border bg-secondary px-3 text-sm text-foreground"
                      >
                        <option value="">Selecione o processo...</option>
                        {mockActusProcesses.slice(0, 20).map(p => (
                          <option key={p.id} value={p.id}>{p.numero_cnj} — {p.titulo}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Variables */}
                <div className="bg-card rounded-lg border border-border p-5 shadow-card">
                  <h3 className="text-sm font-semibold text-foreground mb-4">Variáveis do Modelo</h3>
                  <div className="space-y-3">
                    {['Comarca', 'Vara', 'Juiz', 'Valor da causa'].map((v) => (
                      <div key={v}>
                        <label className="text-xs font-medium text-muted-foreground mb-1.5 block">{v}</label>
                        <Input className="bg-secondary border-border" placeholder={`Preencher ${v.toLowerCase()}...`} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setStep('select')}>Voltar</Button>
                  <Button onClick={() => setStep('preview')} disabled={!selectedClient} className="gap-1.5">
                    <Eye className="h-4 w-4" /> Ver prévia
                  </Button>
                </div>
              </div>

              {/* Live preview placeholder */}
              <div className="bg-card rounded-lg border border-border shadow-card overflow-hidden">
                <div className="border-b border-border px-4 py-2.5 flex items-center justify-between">
                  <span className="text-xs font-semibold text-foreground">Prévia do Documento</span>
                  <span className="text-[10px] text-muted-foreground">Atualiza em tempo real</span>
                </div>
                <div className="p-6 min-h-[500px] bg-secondary/30">
                  <div className="bg-background rounded-lg p-8 shadow-sm border border-border max-w-lg mx-auto">
                    <div className="text-center mb-6">
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Excelentíssimo(a) Senhor(a) Juiz(a) de Direito</p>
                      <p className="text-[10px] text-muted-foreground mt-1">da ___ Vara do Trabalho de ___</p>
                    </div>
                    <div className="space-y-3">
                      <div className="h-3 bg-secondary rounded w-full" />
                      <div className="h-3 bg-secondary rounded w-5/6" />
                      <div className="h-3 bg-secondary rounded w-4/5" />
                      <div className="h-3 bg-secondary rounded w-full" />
                      <div className="h-3 bg-secondary rounded w-3/4" />
                    </div>
                    <div className="mt-6 pt-4 border-t border-border text-center">
                      <p className="text-[10px] text-muted-foreground">Nestes termos, pede deferimento.</p>
                      <p className="text-[10px] text-muted-foreground mt-2">___, ___ de ___ de 2025</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Preview & Export */}
          {step === 'preview' && (
            <motion.div variants={fadeUp} className="space-y-4">
              <div className="bg-card rounded-lg border border-border p-5 shadow-card">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{selectedTmpl?.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">Documento pronto para revisão e exportação</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setStep('configure')} size="sm">Voltar</Button>
                    <Button variant="outline" size="sm" className="gap-1.5">
                      <Save className="h-3.5 w-3.5" /> Salvar rascunho
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1.5">
                      <Download className="h-3.5 w-3.5" /> Exportar Word
                    </Button>
                    <Button size="sm" className="gap-1.5">
                      <Download className="h-3.5 w-3.5" /> Exportar PDF
                    </Button>
                  </div>
                </div>

                {/* Document Preview */}
                <div className="bg-secondary/30 rounded-lg p-8 min-h-[600px]">
                  <div className="bg-background rounded-lg p-10 shadow-sm border border-border max-w-2xl mx-auto">
                    <div className="text-center mb-8">
                      <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                        Excelentíssimo(a) Senhor(a) Juiz(a) de Direito
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">da ___ Vara do Trabalho de ___</p>
                    </div>
                    <div className="space-y-4 text-xs text-foreground leading-relaxed">
                      <p><strong>JOÃO DA SILVA</strong>, brasileiro, portador do CPF nº 000.000.000-00, residente e domiciliado na cidade de São Paulo/SP, vem, respeitosamente, à presença de Vossa Excelência, por intermédio de seus advogados que esta subscrevem, propor a presente</p>
                      <p className="text-center font-semibold text-sm tracking-wide text-foreground">
                        {selectedTmpl?.name?.toUpperCase()}
                      </p>
                      <p>em face de <strong>EMPRESA RÉ LTDA.</strong>, pessoa jurídica de direito privado, inscrita no CNPJ sob nº 00.000.000/0001-00, com sede na Rua Exemplo, nº 100, São Paulo/SP, pelos fatos e fundamentos a seguir expostos.</p>
                      <p className="font-semibold mt-4">I — DOS FATOS</p>
                      <p>O reclamante foi admitido pela reclamada em 01/01/2020, exercendo a função de analista, com salário mensal de R$ 5.000,00. Durante o contrato de trabalho, sofreu diversas irregularidades que configuram rescisão indireta do contrato de trabalho.</p>
                      <p className="font-semibold mt-4">II — DO DIREITO</p>
                      <p>Conforme disposto no artigo 483 da CLT, o empregado poderá considerar rescindido o contrato e pleitear a devida indenização quando...</p>
                    </div>
                    <div className="mt-10 pt-6 border-t border-border text-center text-xs text-muted-foreground">
                      <p>Nestes termos, pede deferimento.</p>
                      <p className="mt-3">São Paulo, 30 de março de 2025</p>
                      <p className="mt-4 font-medium text-foreground">_______________________________</p>
                      <p className="text-[10px]">OAB/SP nº 000.000</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AppLayout>
  );
}
