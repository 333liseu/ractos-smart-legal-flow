import { AppLayout } from "@/components/AppLayout";
import { ArrowLeft, Loader2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeUp } from '@/lib/animations';
import { useState, useRef } from "react";
import { useCreateCliente, useUploadClienteDocumento } from "@/hooks/use-clientes";

export default function NewClientPage() {
  const navigate = useNavigate();
  const createCliente = useCreateCliente();
  const uploadDoc = useUploadClienteDocumento();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    nome_razao_social: "",
    tipo_pessoa: "PF",
    cpf_cnpj: "",
    email: "",
    telefone: "",
    celular: "",
    status: "Ativo",
    tipo_contrato: "",
    responsavel_interno: "",
    endereco: "",
    cidade: "",
    estado: "",
    cep: "",
    observacoes: "",
  });

  const [files, setFiles] = useState<{ file: File; categoria: string }[]>([]);
  const isSaving = createCliente.isPending || uploadDoc.isPending;

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleAddFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map(file => ({
        file,
        categoria: "Outros",
      }));
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleSave = async (continuar = false) => {
    if (!form.nome_razao_social.trim()) return;
    try {
      const cliente = await createCliente.mutateAsync({
        nome_razao_social: form.nome_razao_social,
        tipo_pessoa: form.tipo_pessoa || null,
        cpf_cnpj: form.cpf_cnpj || null,
        email: form.email || null,
        telefone: form.telefone || null,
        celular: form.celular || null,
        status: form.status || "Ativo",
        tipo_contrato: form.tipo_contrato || null,
        responsavel_interno: form.responsavel_interno || null,
        endereco: form.endereco || null,
        cidade: form.cidade || null,
        estado: form.estado || null,
        cep: form.cep || null,
        observacoes: form.observacoes || null,
      });

      // Upload documents
      for (const { file, categoria } of files) {
        await uploadDoc.mutateAsync({ clienteId: cliente.id, file, categoria });
      }

      if (continuar) {
        setForm({
          nome_razao_social: "", tipo_pessoa: "PF", cpf_cnpj: "", email: "",
          telefone: "", celular: "", status: "Ativo", tipo_contrato: "",
          responsavel_interno: "", endereco: "", cidade: "", estado: "", cep: "", observacoes: "",
        });
        setFiles([]);
      } else {
        navigate("/clients");
      }
    } catch {
      // error handled by mutation
    }
  };

  return (
    <AppLayout>
      <div className="p-6 max-w-[1000px] mx-auto">
        <motion.div initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}>
          <motion.div variants={fadeUp}>
            <Link to="/clients" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
              <ArrowLeft className="h-4 w-4" /> Voltar aos Clientes
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-bold text-foreground tracking-tight">Novo Cliente</h1>
              <p className="text-sm text-muted-foreground">Cadastre um novo cliente</p>
            </div>
            <div className="flex gap-2">
              <Link to="/clients"><Button variant="outline" disabled={isSaving}>Cancelar</Button></Link>
              <Button className="active-scale" onClick={() => handleSave(false)} disabled={isSaving}>
                {isSaving && <Loader2 className="h-4 w-4 animate-spin mr-2" />}Salvar
              </Button>
            </div>
          </motion.div>

          <div className="space-y-6">
            <motion.div variants={fadeUp} className="bg-card rounded-lg border border-border p-5 shadow-card">
              <h2 className="text-sm font-semibold text-foreground mb-4">Dados Principais</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="text-xs text-muted-foreground mb-1 block">Nome / Razão Social</label><Input value={form.nome_razao_social} onChange={set("nome_razao_social")} className="bg-secondary" /></div>
                <div><label className="text-xs text-muted-foreground mb-1 block">Tipo de Pessoa</label><Input value={form.tipo_pessoa} onChange={set("tipo_pessoa")} placeholder="PF / PJ" className="bg-secondary" /></div>
                <div><label className="text-xs text-muted-foreground mb-1 block">CPF ou CNPJ</label><Input value={form.cpf_cnpj} onChange={set("cpf_cnpj")} className="bg-secondary" /></div>
                <div><label className="text-xs text-muted-foreground mb-1 block">E-mail</label><Input type="email" value={form.email} onChange={set("email")} className="bg-secondary" /></div>
                <div><label className="text-xs text-muted-foreground mb-1 block">Telefone</label><Input value={form.telefone} onChange={set("telefone")} className="bg-secondary" /></div>
                <div><label className="text-xs text-muted-foreground mb-1 block">Celular</label><Input value={form.celular} onChange={set("celular")} className="bg-secondary" /></div>
                <div><label className="text-xs text-muted-foreground mb-1 block">Status</label><Input value={form.status} onChange={set("status")} placeholder="Ativo" className="bg-secondary" /></div>
                <div><label className="text-xs text-muted-foreground mb-1 block">Tipo de Contrato</label><Input value={form.tipo_contrato} onChange={set("tipo_contrato")} placeholder="Assessoria Jurídica" className="bg-secondary" /></div>
                <div className="md:col-span-2"><label className="text-xs text-muted-foreground mb-1 block">Responsável Interno</label><Input value={form.responsavel_interno} onChange={set("responsavel_interno")} className="bg-secondary" /></div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="bg-card rounded-lg border border-border p-5 shadow-card">
              <h2 className="text-sm font-semibold text-foreground mb-4">Endereço</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2"><label className="text-xs text-muted-foreground mb-1 block">Endereço</label><Input value={form.endereco} onChange={set("endereco")} className="bg-secondary" /></div>
                <div><label className="text-xs text-muted-foreground mb-1 block">CEP</label><Input value={form.cep} onChange={set("cep")} className="bg-secondary" /></div>
                <div><label className="text-xs text-muted-foreground mb-1 block">Cidade</label><Input value={form.cidade} onChange={set("cidade")} className="bg-secondary" /></div>
                <div><label className="text-xs text-muted-foreground mb-1 block">Estado</label><Input value={form.estado} onChange={set("estado")} className="bg-secondary" /></div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="bg-card rounded-lg border border-border p-5 shadow-card">
              <h2 className="text-sm font-semibold text-foreground mb-4">Observações</h2>
              <textarea value={form.observacoes} onChange={set("observacoes") as any} className="w-full h-20 rounded-md border border-border bg-secondary px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground resize-none" placeholder="Observações sobre o cliente..." />
            </motion.div>

            <motion.div variants={fadeUp} className="bg-card rounded-lg border border-border p-5 shadow-card">
              <h2 className="text-sm font-semibold text-foreground mb-4">Documentos</h2>
              <input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleAddFiles} />
              {files.length > 0 && (
                <div className="space-y-2 mb-4">
                  {files.map((f, i) => (
                    <div key={i} className="flex items-center justify-between py-2 px-3 rounded-lg border border-border bg-secondary/50">
                      <span className="text-xs text-foreground truncate">{f.file.name}</span>
                      <select
                        value={f.categoria}
                        onChange={e => setFiles(prev => prev.map((p, j) => j === i ? { ...p, categoria: e.target.value } : p))}
                        className="text-xs bg-secondary border border-border rounded px-2 py-1 text-foreground"
                      >
                        <option>Contrato de Honorários</option>
                        <option>Procuração</option>
                        <option>Documentos Pessoais</option>
                        <option>Comprovante de Endereço</option>
                        <option>Outros</option>
                      </select>
                      <Button variant="ghost" size="sm" onClick={() => setFiles(prev => prev.filter((_, j) => j !== i))} className="text-xs text-destructive h-6 px-2">Remover</Button>
                    </div>
                  ))}
                </div>
              )}
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <Upload className="h-5 w-5 text-muted-foreground mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">Arraste ou clique para upload</p>
                <Button variant="outline" size="sm" className="mt-3" onClick={() => fileInputRef.current?.click()}>Adicionar Documentos</Button>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="flex justify-end gap-2">
              <Link to="/clients"><Button variant="outline" disabled={isSaving}>Cancelar</Button></Link>
              <Button className="active-scale" onClick={() => handleSave(false)} disabled={isSaving}>
                {isSaving && <Loader2 className="h-4 w-4 animate-spin mr-2" />}Salvar
              </Button>
              <Button variant="secondary" onClick={() => handleSave(true)} disabled={isSaving}>Salvar e continuar</Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
