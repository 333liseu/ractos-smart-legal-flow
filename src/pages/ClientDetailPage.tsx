import { AppLayout } from "@/components/AppLayout";
import { mockActusClients, mockActusProcesses } from "@/lib/mock-data";
import { StatusBadge } from "@/components/StatusBadge";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Edit, FileText, Plus, Loader2, Download, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { fadeUp } from '@/lib/animations';
import { useCliente, useClienteDocumentos, useUploadClienteDocumento } from "@/hooks/use-clientes";
import { useRef } from "react";

export default function ClientDetailPage() {
  const { id } = useParams();
  const { data: dbClient, isLoading: loadingClient } = useCliente(id);
  const { data: documentos, isLoading: loadingDocs } = useClienteDocumentos(id);
  const uploadDoc = useUploadClienteDocumento();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Try DB first, fall back to mock
  const mockClient = mockActusClients.find(c => c.id === id);
  const isDbClient = !!dbClient;

  const client = dbClient ? {
    nome_razao_social: dbClient.nome_razao_social,
    tipo_pessoa: (dbClient.tipo_pessoa || 'PF') as 'PF' | 'PJ',
    cpf_cnpj: dbClient.cpf_cnpj,
    email: dbClient.email,
    telefone: dbClient.telefone,
    cidade: dbClient.cidade,
    estado: dbClient.estado,
    tipo_contrato: dbClient.tipo_contrato,
    responsavel_interno: dbClient.responsavel_interno || '-',
    status_cliente: dbClient.status || 'Ativo',
    processos_count: 0,
    profissao_nome_fantasia: null as string | null,
  } : mockClient;

  if (!loadingClient && !client) {
    return <AppLayout><div className="p-6 text-muted-foreground">Cliente não encontrado</div></AppLayout>;
  }

  if (loadingClient && !mockClient) {
    return <AppLayout><div className="p-6 flex items-center gap-2 text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" />Carregando...</div></AppLayout>;
  }

  if (!client) return <AppLayout><div className="p-6 text-muted-foreground">Cliente não encontrado</div></AppLayout>;

  const clientProcesses = mockActusProcesses.filter(p => p.cliente_id === id);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !id) return;
    for (const file of Array.from(e.target.files)) {
      await uploadDoc.mutateAsync({ clienteId: id, file, categoria: "Outros" });
    }
    e.target.value = "";
  };

  return (
    <AppLayout>
      <div className="p-6 max-w-[1400px] mx-auto">
        <motion.div initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}>
          <motion.div variants={fadeUp}>
            <Link to="/clients" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
              <ArrowLeft className="h-4 w-4" /> Voltar aos Clientes
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-secondary flex items-center justify-center">
                <span className="text-lg font-bold text-foreground">{client.nome_razao_social.split(' ').map(w => w[0]).slice(0, 2).join('')}</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground tracking-tight">{client.nome_razao_social}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground bg-secondary rounded px-1.5 py-0.5">{client.tipo_pessoa}</span>
                  {client.cpf_cnpj && <span className="text-xs font-mono text-muted-foreground">{client.cpf_cnpj}</span>}
                  <span className="text-[10px] text-success font-medium">{client.status_cliente}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">Responsável: {client.responsavel_interno} · {client.processos_count} Processos Vinculados</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1.5"><Edit className="h-3.5 w-3.5" /> Editar Cadastro</Button>
              <Button variant="outline" size="sm" className="gap-1.5" onClick={() => fileInputRef.current?.click()}>
                <Upload className="h-3.5 w-3.5" /> Adicionar Documento
              </Button>
              <input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleFileUpload} />
              <Button size="sm" className="gap-1.5"><Plus className="h-3.5 w-3.5" /> Novo Processo</Button>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-card rounded-lg border border-border p-5 shadow-card">
                <h2 className="text-sm font-semibold text-foreground mb-4">Dados Cadastrais</h2>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Nome / Razão Social', value: client.nome_razao_social },
                    { label: 'Tipo de Pessoa', value: client.tipo_pessoa === 'PF' ? 'Pessoa Física' : 'Pessoa Jurídica' },
                    { label: 'CPF/CNPJ', value: client.cpf_cnpj || '-' },
                    { label: 'E-mail', value: client.email || '-' },
                    { label: 'Telefone', value: client.telefone || '-' },
                    { label: 'Cidade/Estado', value: `${client.cidade || '-'}/${client.estado || '-'}` },
                    { label: 'Tipo de Contrato', value: client.tipo_contrato || '-' },
                    { label: 'Responsável', value: client.responsavel_interno },
                  ].map(d => (
                    <div key={d.label}>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{d.label}</p>
                      <p className="text-xs text-foreground font-medium mt-0.5">{d.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card rounded-lg border border-border p-5 shadow-card">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-semibold text-foreground">Processos Vinculados</h2>
                  <span className="text-[10px] text-muted-foreground">{clientProcesses.length} processos</span>
                </div>
                {clientProcesses.length > 0 ? (
                  <div className="space-y-2">
                    {clientProcesses.map(p => (
                      <Link key={p.id} to={`/cases/${p.id}`} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-secondary/50 transition-colors border border-border">
                        <div>
                          <p className="text-xs font-medium text-foreground hover:text-primary">{p.titulo}</p>
                          <p className="text-[10px] font-mono text-muted-foreground tabular-nums">{p.numero_cnj}</p>
                        </div>
                        <StatusBadge status={p.status} />
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground text-center py-4">Nenhum processo vinculado</p>
                )}
              </div>

              <div className="bg-card rounded-lg border border-border p-5 shadow-card">
                <h2 className="text-sm font-semibold text-foreground mb-4">Pagamentos do Cliente para Escritório</h2>
                <div className="text-xs text-muted-foreground text-center py-4">Nenhum pagamento registrado</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-card rounded-lg border border-border p-5 shadow-card">
                <h2 className="text-sm font-semibold text-foreground mb-3">Resumo do Cliente</h2>
                <div className="space-y-2">
                  <div className="flex justify-between"><span className="text-xs text-muted-foreground">Processos Vinculados</span><span className="text-xs font-medium text-foreground">{client.processos_count}</span></div>
                  <div className="flex justify-between"><span className="text-xs text-muted-foreground">Status</span><span className="text-xs font-medium text-success">{client.status_cliente}</span></div>
                  <div className="flex justify-between"><span className="text-xs text-muted-foreground">Tipo de Contrato</span><span className="text-xs font-medium text-foreground">{client.tipo_contrato || '-'}</span></div>
                  {client.profissao_nome_fantasia && <div className="flex justify-between"><span className="text-xs text-muted-foreground">Profissão/Fantasia</span><span className="text-xs font-medium text-foreground">{client.profissao_nome_fantasia}</span></div>}
                </div>
              </div>

              <div className="bg-card rounded-lg border border-border p-5 shadow-card">
                <h2 className="text-sm font-semibold text-foreground mb-3">Documentos do Cliente</h2>
                {loadingDocs ? (
                  <div className="flex justify-center py-4"><Loader2 className="h-4 w-4 animate-spin text-muted-foreground" /></div>
                ) : isDbClient && documentos && documentos.length > 0 ? (
                  <div className="space-y-2">
                    {documentos.map(doc => (
                      <div key={doc.id} className="flex items-center gap-2 py-1.5 border-b border-border last:border-0">
                        <FileText className="h-3.5 w-3.5 text-primary shrink-0" />
                        <div className="flex-1 min-w-0">
                          <a href={doc.url_arquivo || '#'} target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-primary truncate block">
                            {doc.nome_arquivo}
                          </a>
                          <span className="text-[10px] text-muted-foreground/60">{doc.categoria}</span>
                        </div>
                        {doc.url_arquivo && (
                          <a href={doc.url_arquivo} target="_blank" rel="noopener noreferrer">
                            <Download className="h-3 w-3 text-muted-foreground hover:text-primary" />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {['Contrato de Honorários', 'Procuração', 'Documentos Pessoais'].map(doc => (
                      <div key={doc} className="flex items-center gap-2 py-1.5 border-b border-border last:border-0">
                        <FileText className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span className="text-xs text-muted-foreground">{doc}</span>
                      </div>
                    ))}
                  </div>
                )}
                <Button variant="outline" size="sm" className="w-full mt-3 text-xs" onClick={() => fileInputRef.current?.click()}>
                  {uploadDoc.isPending ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : null}
                  Adicionar Documento
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
