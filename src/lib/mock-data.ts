// Seed data from Actus One real database


export interface ActusClient {
  id: string;
  tipo_pessoa: 'PF' | 'PJ';
  nome_razao_social: string;
  cpf_cnpj: string | null;
  data_nascimento: string | null;
  email: string | null;
  telefone: string | null;
  celular: string | null;
  endereco: string | null;
  cidade: string | null;
  estado: string | null;
  cep: string | null;
  profissao_nome_fantasia: string | null;
  status_cliente: 'Ativo' | 'Inativo' | 'Prospecto';
  tipo_contrato: 'Assessoria Jurídica' | 'Particular' | 'Pro Bono' | 'Convênio' | null;
  observacoes: string | null;
  responsavel_interno: string;
  processos_count: number;
}

export interface ActusProcess {
  id: string;
  numero_cnj: string;
  titulo: string;
  cliente_id: string;
  cliente_principal: string;
  contrario_principal: string;
  responsavel_principal: string;
  escritorio_responsavel: string;
  tipo_registro: string;
  acao: string | null;
  orgao: string | null;
  tribunal: string | null;
  area: string;
  vara_turma: string | null;
  data_distribuicao: string | null;
  data_distribuicao_iso: string | null;
  valor_causa: string | null;
  status: 'Ativo' | 'Arquivado' | 'Suspenso' | 'Baixado';
  pasta: string | null;
  posicao_cliente: string | null;
  classificacao_principal: string | null;
  classificacao_secundaria: string | null;
}

export interface ActusTask {
  id: string;
  tipo: string;
  inicio_em: string;
  termino_em: string;
  processo_cnj: string | null;
  descricao: string;
  subtipo: string | null;
  status: 'Pendente' | 'Cumprido' | 'Em andamento';
  prioridade: 'Alta' | 'Média' | 'Baixa';
  responsavel: string;
  processo_id: string | null;
  cliente_id: string | null;
}

export interface ActusMovement {
  id: string;
  processo_id: string;
  processo_cnj: string;
  data_movimentacao: string;
  resumo: string;
  classificacao: 'Exige ação' | 'Informativa' | 'Com prazo';
  responsavel: string;
  acao_necessaria: string | null;
  cliente: string;
}

export interface ActusIntimation {
  id: string;
  processo_id: string;
  processo_cnj: string;
  data_intimacao: string;
  prazo_em: string | null;
  resumo: string;
  classificacao: 'Urgente' | 'Normal' | 'Informativa';
  responsavel: string;
  tarefa_status: 'Sem tarefa' | 'Criar tarefa' | 'Tarefa criada';
  leitura_status: 'Não lida' | 'Lida';
  triagem_status: 'Não triada' | 'Triada';
  cliente: string;
}

export interface ActusDeadline {
  id: string;
  processo_id: string;
  processo_cnj: string;
  data_prazo: string;
  descricao: string;
  tarefa: string;
  situacao: 'Pendente' | 'Cumprido' | 'Vencido';
  urgencia: 'Alta' | 'Média' | 'Baixa';
  cliente: string;
  responsavel: string;
  tipo_acao: string;
}

export interface ActusDocument {
  id: string;
  nome_documento: string;
  tipo_documento: string;
  cliente_id: string | null;
  cliente_nome: string | null;
  processo_id: string | null;
  processo_cnj: string | null;
  responsavel: string;
  status_documento: 'Rascunho' | 'Finalizado' | 'Assinatura pendente';
  ultima_edicao_em: string;
  categoria: string;
}

export const mockActusClients: ActusClient[] = [
  { id: "1", tipo_pessoa: "PJ", nome_razao_social: "RUBEN BATISTA DA SILVA", cpf_cnpj: "28.456.981/0001-03", data_nascimento: null, email: null, telefone: null, celular: null, endereco: null, cidade: "Goiânia", estado: "GO", cep: null, profissao_nome_fantasia: "SUSPENSAO", status_cliente: "Ativo", tipo_contrato: "Assessoria Jurídica", observacoes: null, responsavel_interno: "Eliseu Pena", processos_count: 1 },
  { id: "2", tipo_pessoa: "PJ", nome_razao_social: "EDGAR DE ASSIS PORTO JUNIOR", cpf_cnpj: "33.066.637/0001-30", data_nascimento: null, email: null, telefone: null, celular: null, endereco: null, cidade: "Goiânia", estado: "GO", cep: null, profissao_nome_fantasia: "EDCAR AUTO PECAS", status_cliente: "Ativo", tipo_contrato: "Particular", observacoes: null, responsavel_interno: "Bruno Aurélio", processos_count: 2 },
  { id: "3", tipo_pessoa: "PJ", nome_razao_social: "MATEUS DE SOUZA SANTOS", cpf_cnpj: "45.848.034/0001-79", data_nascimento: null, email: null, telefone: null, celular: null, endereco: null, cidade: "Goiânia", estado: "GO", cep: null, profissao_nome_fantasia: "JS CENTRO AUTOMOTIVO PICK-UP EXTREMO", status_cliente: "Ativo", tipo_contrato: "Pro Bono", observacoes: null, responsavel_interno: "Tatianne Pena Braga", processos_count: 3 },
  { id: "4", tipo_pessoa: "PJ", nome_razao_social: "LEVI KENIS DE CARVALHO BUENO", cpf_cnpj: "50.852.723/0001-97", data_nascimento: null, email: null, telefone: null, celular: null, endereco: null, cidade: "Goiânia", estado: "GO", cep: null, profissao_nome_fantasia: "AUTO PECAS E ACESSORIOS VIRA LATAS", status_cliente: "Ativo", tipo_contrato: "Convênio", observacoes: null, responsavel_interno: "Iara Cristina", processos_count: 4 },
  { id: "5", tipo_pessoa: "PJ", nome_razao_social: "AB COMERCIO DE VIDROS E ACESSORIOS LTDA", cpf_cnpj: "24.542.457/0001-96", data_nascimento: null, email: null, telefone: null, celular: null, endereco: null, cidade: "Goiânia", estado: "GO", cep: null, profissao_nome_fantasia: "AB VIDROS", status_cliente: "Ativo", tipo_contrato: "Assessoria Jurídica", observacoes: null, responsavel_interno: "Wilson Corpel", processos_count: 5 },
  { id: "6", tipo_pessoa: "PF", nome_razao_social: "Acrislene Da Silva Santos", cpf_cnpj: "026.364.951-26", data_nascimento: "11/03/1985", email: null, telefone: null, celular: null, endereco: null, cidade: "Goiânia", estado: "GO", cep: null, profissao_nome_fantasia: null, status_cliente: "Ativo", tipo_contrato: "Particular", observacoes: null, responsavel_interno: "Marcelo", processos_count: 6 },
  { id: "7", tipo_pessoa: "PF", nome_razao_social: "Adann Braynther Inácio e Silva", cpf_cnpj: "901.535.611-49", data_nascimento: "10/11/1978", email: "braynther@hotmail.com", telefone: "62999003939", celular: null, endereco: null, cidade: "Goiânia", estado: "GO", cep: null, profissao_nome_fantasia: "Escriv\u00e3o da Pol\u00edcia Civil", status_cliente: "Ativo", tipo_contrato: "Pro Bono", observacoes: null, responsavel_interno: "Eliseu Pena", processos_count: 7 },
  { id: "8", tipo_pessoa: "PF", nome_razao_social: "Adão Rodrigues Jardim", cpf_cnpj: "916.149.961-72", data_nascimento: "30/10/1980", email: "tecn.kla@gmail.com", telefone: "62993755004", celular: null, endereco: null, cidade: "Goiânia", estado: "GO", cep: null, profissao_nome_fantasia: "Operador de M\u00e1quinas Pesadas", status_cliente: "Ativo", tipo_contrato: "Convênio", observacoes: null, responsavel_interno: "Bruno Aurélio", processos_count: 1 },
  { id: "9", tipo_pessoa: "PF", nome_razao_social: "Adarcino Campos Vieira", cpf_cnpj: "341.198.251-91", data_nascimento: null, email: "adarcinocampos@gmail.com", telefone: "6299672998", celular: null, endereco: null, cidade: "Goiânia", estado: "GO", cep: null, profissao_nome_fantasia: "Agente Auxiliar Policial - Aposentado", status_cliente: "Ativo", tipo_contrato: "Assessoria Jurídica", observacoes: null, responsavel_interno: "Tatianne Pena Braga", processos_count: 2 },
  { id: "10", tipo_pessoa: "PF", nome_razao_social: "Adauto Tavares Leite", cpf_cnpj: "100.880.364-21", data_nascimento: "08/06/1993", email: null, telefone: null, celular: null, endereco: null, cidade: "Goiânia", estado: "GO", cep: null, profissao_nome_fantasia: "Gerente Administrativo", status_cliente: "Ativo", tipo_contrato: "Particular", observacoes: null, responsavel_interno: "Iara Cristina", processos_count: 3 },
  { id: "11", tipo_pessoa: "PF", nome_razao_social: "Adeir Olimpio De Souza", cpf_cnpj: "588.351.481-20", data_nascimento: null, email: null, telefone: null, celular: null, endereco: null, cidade: "Goiânia", estado: "GO", cep: null, profissao_nome_fantasia: "Aut\u00f4nomo", status_cliente: "Ativo", tipo_contrato: "Pro Bono", observacoes: null, responsavel_interno: "Wilson Corpel", processos_count: 4 },
  { id: "12", tipo_pessoa: "PF", nome_razao_social: "Adejaime de Sousa Branco", cpf_cnpj: "314.738.571-04", data_nascimento: "19/09/1963", email: "adejaime50@mail.com", telefone: "62994478565", celular: null, endereco: null, cidade: "Goiânia", estado: "GO", cep: null, profissao_nome_fantasia: "Aposentado", status_cliente: "Ativo", tipo_contrato: "Convênio", observacoes: null, responsavel_interno: "Marcelo", processos_count: 5 },
  { id: "13", tipo_pessoa: "PF", nome_razao_social: "Adeline Miranda Silva", cpf_cnpj: "951.122.191-49", data_nascimento: "06/01/1983", email: "adelinemiranda@hotmail.comadelmotex@hotmail.com", telefone: "629824091576299287457", celular: null, endereco: null, cidade: "Goiânia", estado: "GO", cep: null, profissao_nome_fantasia: "Agente de Pol\u00edcia Civil M\u00e9dico Legista", status_cliente: "Ativo", tipo_contrato: "Assessoria Jurídica", observacoes: null, responsavel_interno: "Eliseu Pena", processos_count: 6 },
  { id: "14", tipo_pessoa: "PF", nome_razao_social: "Adelmo Feitosa de Santana", cpf_cnpj: "201.425.105-30", data_nascimento: null, email: null, telefone: null, celular: null, endereco: null, cidade: "Goiânia", estado: "GO", cep: null, profissao_nome_fantasia: "Deputado Estadual", status_cliente: "Ativo", tipo_contrato: "Particular", observacoes: null, responsavel_interno: "Bruno Aurélio", processos_count: 7 },
  { id: "15", tipo_pessoa: "PF", nome_razao_social: "Adelmo Pires Moreira", cpf_cnpj: "131.208.401-49", data_nascimento: "24/05/1944", email: null, telefone: "62996110328", celular: null, endereco: null, cidade: "Goiânia", estado: "GO", cep: null, profissao_nome_fantasia: "Datiloscopista - Aposentado", status_cliente: "Ativo", tipo_contrato: "Pro Bono", observacoes: null, responsavel_interno: "Tatianne Pena Braga", processos_count: 1 },
  { id: "16", tipo_pessoa: "PF", nome_razao_social: "Ademar Luiz de Oliveira", cpf_cnpj: "231.519.351-68", data_nascimento: null, email: "ademarluizoliveira@yahoo.com.br", telefone: "6292057381", celular: null, endereco: null, cidade: "Goiânia", estado: "GO", cep: null, profissao_nome_fantasia: "Agente de Pol\u00edcia Civil", status_cliente: "Ativo", tipo_contrato: "Convênio", observacoes: null, responsavel_interno: "Iara Cristina", processos_count: 2 },
  { id: "17", tipo_pessoa: "PF", nome_razao_social: "Ademar Macedo de Oliveira Junior", cpf_cnpj: "948.109.231-34", data_nascimento: "20/06/1980", email: "ademarmoj@gmail.com", telefone: "62984921754", celular: null, endereco: null, cidade: "Goiânia", estado: "GO", cep: null, profissao_nome_fantasia: "Agente de Pol\u00edcia Civil", status_cliente: "Ativo", tipo_contrato: "Assessoria Jurídica", observacoes: null, responsavel_interno: "Wilson Corpel", processos_count: 3 },
  { id: "18", tipo_pessoa: "PF", nome_razao_social: "Ademilson Botelho Pimentel", cpf_cnpj: "762.355.561-87", data_nascimento: "13/05/1975", email: null, telefone: "62991691138", celular: null, endereco: null, cidade: "Goiânia", estado: "GO", cep: null, profissao_nome_fantasia: "Do lar Deputado Federal", status_cliente: "Ativo", tipo_contrato: "Particular", observacoes: null, responsavel_interno: "Marcelo", processos_count: 4 },
  { id: "19", tipo_pessoa: "PF", nome_razao_social: "Adenildes Gonçalves De Moraes", cpf_cnpj: "858.366.801-91", data_nascimento: null, email: "adenildesgoncalves@yahoo.com.br", telefone: "64999732773", celular: null, endereco: null, cidade: "Goiânia", estado: "GO", cep: null, profissao_nome_fantasia: "Escriv\u00e3o da Pol\u00edcia Civil", status_cliente: "Ativo", tipo_contrato: "Pro Bono", observacoes: null, responsavel_interno: "Eliseu Pena", processos_count: 5 },
  { id: "20", tipo_pessoa: "PF", nome_razao_social: "Adineci Rodrigues Vasques", cpf_cnpj: "127.773.311-20", data_nascimento: "24/11/1947", email: null, telefone: "17992067440", celular: null, endereco: null, cidade: "Goiânia", estado: "GO", cep: null, profissao_nome_fantasia: "Datiloscopista", status_cliente: "Ativo", tipo_contrato: "Convênio", observacoes: null, responsavel_interno: "Bruno Aurélio", processos_count: 6 },
  { id: "21", tipo_pessoa: "PF", nome_razao_social: "Adivaldo Martins Peixoto", cpf_cnpj: "160.983.581-68", data_nascimento: "01/07/1957", email: null, telefone: "6232410803", celular: null, endereco: null, cidade: "Goiânia", estado: "GO", cep: null, profissao_nome_fantasia: "Aposentado", status_cliente: "Ativo", tipo_contrato: "Assessoria Jurídica", observacoes: null, responsavel_interno: "Tatianne Pena Braga", processos_count: 7 },
  { id: "22", tipo_pessoa: "PF", nome_razao_social: "Adolpho Roberto Souza Von Lohrman", cpf_cnpj: "177.183.682-20", data_nascimento: "10/05/1962", email: null, telefone: null, celular: null, endereco: null, cidade: "Goiânia", estado: "GO", cep: null, profissao_nome_fantasia: null, status_cliente: "Ativo", tipo_contrato: "Particular", observacoes: null, responsavel_interno: "Iara Cristina", processos_count: 1 },
  { id: "23", tipo_pessoa: "PF", nome_razao_social: "Adonildo Borges do Lago", cpf_cnpj: "925.280.151-00", data_nascimento: "15/08/1972", email: "drikaceres@gmail.com", telefone: "996774689", celular: null, endereco: null, cidade: "Goiânia", estado: "GO", cep: null, profissao_nome_fantasia: "Escriv\u00e3o da Pol\u00edcia", status_cliente: "Ativo", tipo_contrato: "Pro Bono", observacoes: null, responsavel_interno: "Wilson Corpel", processos_count: 2 },
  { id: "24", tipo_pessoa: "PF", nome_razao_social: "Adriana Borges Daher Dijkstra", cpf_cnpj: "624.298.411-34", data_nascimento: null, email: null, telefone: null, celular: null, endereco: null, cidade: "Goiânia", estado: "GO", cep: null, profissao_nome_fantasia: "Civil", status_cliente: "Ativo", tipo_contrato: "Convênio", observacoes: null, responsavel_interno: "Marcelo", processos_count: 3 },
  { id: "25", tipo_pessoa: "PF", nome_razao_social: "Adriana Lima Camilo", cpf_cnpj: "781.935.321-04", data_nascimento: null, email: "dridridf@hotmail.com", telefone: "61982473737", celular: null, endereco: null, cidade: "Goiânia", estado: "GO", cep: null, profissao_nome_fantasia: "Agente de Pol\u00edcia Civil", status_cliente: "Ativo", tipo_contrato: "Assessoria Jurídica", observacoes: null, responsavel_interno: "Eliseu Pena", processos_count: 4 },
  { id: "26", tipo_pessoa: "PF", nome_razao_social: "Adriana Lourenço das Candeias", cpf_cnpj: "385.580.841-49", data_nascimento: null, email: "dricalou7@gmail.com", telefone: "61983473175", celular: null, endereco: null, cidade: "Goiânia", estado: "GO", cep: null, profissao_nome_fantasia: "Do lar", status_cliente: "Ativo", tipo_contrato: "Particular", observacoes: null, responsavel_interno: "Bruno Aurélio", processos_count: 5 },
  { id: "27", tipo_pessoa: "PF", nome_razao_social: "Adriana Natalia Silva Sales", cpf_cnpj: "034.746.201-42", data_nascimento: "07/04/1991", email: "adriananataliass@hotmail.com", telefone: "62985481185", celular: null, endereco: null, cidade: "Goiânia", estado: "GO", cep: null, profissao_nome_fantasia: "Escriv\u00e3o da Pol\u00edcia Civil", status_cliente: "Ativo", tipo_contrato: "Pro Bono", observacoes: null, responsavel_interno: "Tatianne Pena Braga", processos_count: 6 },
  { id: "28", tipo_pessoa: "PF", nome_razao_social: "Adriana Oliveira dos Santos de Sousa", cpf_cnpj: "180.472.738-50", data_nascimento: null, email: null, telefone: null, celular: null, endereco: null, cidade: "Goiânia", estado: "GO", cep: null, profissao_nome_fantasia: "Deputada Estadual", status_cliente: "Ativo", tipo_contrato: "Convênio", observacoes: null, responsavel_interno: "Iara Cristina", processos_count: 7 },
  { id: "29", tipo_pessoa: "PF", nome_razao_social: "Adriano Dos Santos Brandao", cpf_cnpj: "811.655.281-34", data_nascimento: "22/01/1997", email: "ticobrandao2006@yahoo.com", telefone: "61985598775", celular: null, endereco: null, cidade: "Goiânia", estado: "GO", cep: null, profissao_nome_fantasia: "Agente de Pol\u00edcia Civil", status_cliente: "Ativo", tipo_contrato: "Assessoria Jurídica", observacoes: null, responsavel_interno: "Wilson Corpel", processos_count: 1 },
  { id: "30", tipo_pessoa: "PF", nome_razao_social: "Adriano Gonçalves de Castro", cpf_cnpj: "479.066.931-91", data_nascimento: null, email: null, telefone: null, celular: null, endereco: null, cidade: "Goiânia", estado: "GO", cep: null, profissao_nome_fantasia: "Deputado Federal", status_cliente: "Ativo", tipo_contrato: "Particular", observacoes: null, responsavel_interno: "Marcelo", processos_count: 2 },
  { id: "31", tipo_pessoa: "PF", nome_razao_social: "Afif Hussein Sarhan", cpf_cnpj: null, data_nascimento: null, email: "agathadourado@gmail.com", telefone: "64992415392", celular: null, endereco: null, cidade: "Goiânia", estado: "GO", cep: null, profissao_nome_fantasia: "Escriv\u00e3o da Pol\u00edcia", status_cliente: "Ativo", tipo_contrato: "Pro Bono", observacoes: null, responsavel_interno: "Eliseu Pena", processos_count: 3 },
  { id: "32", tipo_pessoa: "PF", nome_razao_social: "Alexandre Iunes Machado", cpf_cnpj: null, data_nascimento: null, email: null, telefone: "6239463300", celular: null, endereco: null, cidade: "Goiânia", estado: "GO", cep: null, profissao_nome_fantasia: "Advogado", status_cliente: "Ativo", tipo_contrato: "Convênio", observacoes: null, responsavel_interno: "Bruno Aurélio", processos_count: 4 },
  { id: "33", tipo_pessoa: "PF", nome_razao_social: "Algar", cpf_cnpj: null, data_nascimento: "13/12/1971", email: "ecile1971@gmail.com", telefone: "62985213323", celular: null, endereco: null, cidade: "Goiânia", estado: "GO", cep: null, profissao_nome_fantasia: "Agente de Pol\u00edcia Civil", status_cliente: "Ativo", tipo_contrato: "Assessoria Jurídica", observacoes: null, responsavel_interno: "Tatianne Pena Braga", processos_count: 5 },
  { id: "34", tipo_pessoa: "PF", nome_razao_social: "Aline de Sousa Lôbo", cpf_cnpj: null, data_nascimento: "03/05/1985", email: "aline.g.galvao@hotmail.com", telefone: "6281484323", celular: null, endereco: null, cidade: "Goiânia", estado: "GO", cep: null, profissao_nome_fantasia: "Agente de Pol\u00edcia Civil", status_cliente: "Ativo", tipo_contrato: "Particular", observacoes: null, responsavel_interno: "Iara Cristina", processos_count: 6 },
  { id: "35", tipo_pessoa: "PF", nome_razao_social: "Anderson Soares Teodoro", cpf_cnpj: null, data_nascimento: "12/06/1982", email: "andre.menezes@gmai.com", telefone: "6285067660", celular: null, endereco: null, cidade: "Goiânia", estado: "GO", cep: null, profissao_nome_fantasia: "Agente de Pol\u00edcia Civil", status_cliente: "Ativo", tipo_contrato: "Pro Bono", observacoes: null, responsavel_interno: "Wilson Corpel", processos_count: 7 },
  { id: "36", tipo_pessoa: "PF", nome_razao_social: "Arthur Antunes Longo", cpf_cnpj: null, data_nascimento: "10/10/2006", email: null, telefone: null, celular: null, endereco: null, cidade: "Goiânia", estado: "GO", cep: null, profissao_nome_fantasia: "Menor Imp\u00fabere", status_cliente: "Ativo", tipo_contrato: "Convênio", observacoes: null, responsavel_interno: "Marcelo", processos_count: 1 },
  { id: "37", tipo_pessoa: "PJ", nome_razao_social: "Câmara Municipal de Padre Bernardo", cpf_cnpj: null, data_nascimento: null, email: "diretoria@camarasad.go.gov.br", telefone: "6137732855", celular: null, endereco: null, cidade: "Goiânia", estado: "GO", cep: null, profissao_nome_fantasia: null, status_cliente: "Ativo", tipo_contrato: "Assessoria Jurídica", observacoes: null, responsavel_interno: "Eliseu Pena", processos_count: 2 },
  { id: "38", tipo_pessoa: "PF", nome_razao_social: "Charles Bento Evangelista", cpf_cnpj: null, data_nascimento: "04/03/1977", email: "tcharlesgyn@gmail.com", telefone: "62982620475", celular: null, endereco: null, cidade: "Goiânia", estado: "GO", cep: null, profissao_nome_fantasia: "Agente de Pol\u00edcia Civil", status_cliente: "Ativo", tipo_contrato: "Particular", observacoes: null, responsavel_interno: "Bruno Aurélio", processos_count: 3 },
  { id: "39", tipo_pessoa: "PF", nome_razao_social: "Cleidson Nunes", cpf_cnpj: null, data_nascimento: null, email: null, telefone: "64999710527", celular: null, endereco: null, cidade: "Goiânia", estado: "GO", cep: null, profissao_nome_fantasia: "Agente de Pol\u00edcia Civil", status_cliente: "Ativo", tipo_contrato: "Pro Bono", observacoes: null, responsavel_interno: "Tatianne Pena Braga", processos_count: 4 },
  { id: "40", tipo_pessoa: "PF", nome_razao_social: "Dandara Ribeiro dos Santos", cpf_cnpj: null, data_nascimento: null, email: "ribeirofreitas.advocacia@gmail.com", telefone: "62985072876", celular: null, endereco: null, cidade: "Goiânia", estado: "GO", cep: null, profissao_nome_fantasia: "Advogada", status_cliente: "Ativo", tipo_contrato: "Convênio", observacoes: null, responsavel_interno: "Iara Cristina", processos_count: 5 },
];

export const mockActusProcesses: ActusProcess[] = [
  { id: "1", numero_cnj: "5108610-26.2022.8.09.0051", titulo: "Progressão Fev/17 - Mai/17", cliente_id: "1", cliente_principal: "Marislene Ferreira de Azara Peixoto", contrario_principal: "Estado De Goiás", responsavel_principal: "Tatianne Pena Braga", escritorio_responsavel: "Bruno Pena & Advogados Associados", tipo_registro: "Processo", acao: "Declarat\u00f3ria", orgao: null, tribunal: "Tribunal de Justi\u00e7a do Estado de Goi\u00e1s", area: "Cível", vara_turma: null, data_distribuicao: "25/02/2022", data_distribuicao_iso: "2022-02-25", valor_causa: null, status: "Arquivado", pasta: "Pasta Proc - 0000001", posicao_cliente: "Autor", classificacao_principal: "C\u00edvel", classificacao_secundaria: null },
  { id: "2", numero_cnj: "5115602-41.2024.8.09.0145", titulo: "Resp - Anulação de Venda", cliente_id: "2", cliente_principal: "Mayte Yndila de Bortoli", contrario_principal: "Francisco Ferley", responsavel_principal: "Bruno Aurélio Rodrigues da Silva Pena", escritorio_responsavel: "Bruno Pena & Advogados Associados", tipo_registro: "Recurso", acao: null, orgao: null, tribunal: null, area: "Cível", vara_turma: null, data_distribuicao: "13/05/2025", data_distribuicao_iso: "2025-05-13", valor_causa: null, status: "Ativo", pasta: "Pasta Proc - 0000001/001", posicao_cliente: "Agravante", classificacao_principal: null, classificacao_secundaria: null },
  { id: "3", numero_cnj: "5712677-41.2022.8.09.0000", titulo: "Adicional Noturno - Execução", cliente_id: "3", cliente_principal: "Ana Paula Barbosa Moreira", contrario_principal: "Estado De Goiás", responsavel_principal: "Tatianne Pena Braga", escritorio_responsavel: "Bruno Pena & Advogados Associados", tipo_registro: "Processo", acao: "Execu\u00e7\u00e3o", orgao: "Goi\u00e2nia", tribunal: "Tribunal de Justi\u00e7a do Estado de Goi\u00e1s", area: "Fazenda Pública", vara_turma: "\u00aa Corte Especial", data_distribuicao: "21/11/2022", data_distribuicao_iso: "2022-11-21", valor_causa: null, status: "Arquivado", pasta: "Pasta Proc - 0000003", posicao_cliente: "Exequente", classificacao_principal: "Fazenda P\u00fablica", classificacao_secundaria: "Execu\u00e7\u00e3o" },
  { id: "4", numero_cnj: "0603814-44.2022.6.09.0000", titulo: "Propaganda Partidária 2023.1", cliente_id: "4", cliente_principal: "Partido Comunista do Brasil - Goiás", contrario_principal: "Ministério Público Eleitoral", responsavel_principal: "Iara Cristina de Almeida", escritorio_responsavel: "Bruno Pena & Advogados Associados", tipo_registro: "Processo", acao: "Propaganda Partid\u00e1ria Gratuita", orgao: "Goi\u00e2nia", tribunal: "Tribunal Regional Eleitoral do Estado de Goi\u00e1s", area: "Eleitoral", vara_turma: "3 - Tribunal Pleno", data_distribuicao: "11/11/2022", data_distribuicao_iso: "2022-11-11", valor_causa: "R$ 0,00", status: "Ativo", pasta: null, posicao_cliente: "Requerente", classificacao_principal: "Eleitoral", classificacao_secundaria: "Propaganda" },
  { id: "5", numero_cnj: "0603631-73.2022.6.09.0000", titulo: "Derrame de Santinhos - Eleições 2022", cliente_id: "5", cliente_principal: "Rafael Magalhães de Gouveia", contrario_principal: "Ministério Público Eleitoral", responsavel_principal: "Iara Cristina de Almeida", escritorio_responsavel: "Bruno Pena & Advogados Associados", tipo_registro: "Processo", acao: null, orgao: null, tribunal: null, area: "Eleitoral", vara_turma: null, data_distribuicao: "04/10/2022", data_distribuicao_iso: "2022-10-04", valor_causa: null, status: "Ativo", pasta: "Pasta Proc - 0000005", posicao_cliente: "Requerido", classificacao_principal: "Eleitoral", classificacao_secundaria: null },
  { id: "6", numero_cnj: "0603563-26.2022.6.09.0000", titulo: "Derrame de Santinhos - Eleições 2022", cliente_id: "6", cliente_principal: "Willian Rodrigues Figueiredo", contrario_principal: "Ministério Público Eleitoral", responsavel_principal: "Iara Cristina de Almeida", escritorio_responsavel: "Bruno Pena & Advogados Associados", tipo_registro: "Processo", acao: "Representa\u00e7\u00e3o", orgao: null, tribunal: "Tribunal Regional Eleitoral do Estado de Goi\u00e1s", area: "Eleitoral", vara_turma: "52 - Tribunal Pleno", data_distribuicao: "04/10/2022", data_distribuicao_iso: "2022-10-04", valor_causa: null, status: "Ativo", pasta: "Pasta Proc - 0000006", posicao_cliente: "Requerido", classificacao_principal: "Eleitoral", classificacao_secundaria: "Representa\u00e7\u00e3o" },
  { id: "7", numero_cnj: "0603552-94.2022.6.09.0000", titulo: "Derrame de Santinhos - Eleições 2022", cliente_id: "7", cliente_principal: "Elismar Carlos Costa", contrario_principal: "Ministério Público Eleitoral", responsavel_principal: "Iara Cristina de Almeida", escritorio_responsavel: "Bruno Pena & Advogados Associados", tipo_registro: "Processo", acao: "Representa\u00e7\u00e3o", orgao: null, tribunal: "Tribunal Regional Eleitoral do Estado de Goi\u00e1s", area: "Eleitoral", vara_turma: "1 - Tribunal Pleno", data_distribuicao: null, data_distribuicao_iso: null, valor_causa: "R$ 0,00", status: "Ativo", pasta: null, posicao_cliente: "Requerido", classificacao_principal: "Eleitoral", classificacao_secundaria: "Representa\u00e7\u00e3o" },
  { id: "8", numero_cnj: "0603336-36.2022.6.09.0000", titulo: "Impulsionamento Propagando Negativa (O Povo Clama! Fora Caiado!)", cliente_id: "8", cliente_principal: "Junio Alves Araújo", contrario_principal: "0603336-36.2022.6.09.0000", responsavel_principal: "Iara Cristina de Almeida", escritorio_responsavel: "Bruno Pena & Advogados Associados", tipo_registro: "Processo", acao: "Representa\u00e7\u00e3o", orgao: null, tribunal: null, area: "Eleitoral", vara_turma: null, data_distribuicao: "21/09/2022", data_distribuicao_iso: "2022-09-21", valor_causa: null, status: "Ativo", pasta: "Pasta Proc - 0000008", posicao_cliente: "Requerido", classificacao_principal: "Eleitoral", classificacao_secundaria: "Representa\u00e7\u00e3o" },
  { id: "9", numero_cnj: "0603337-21.2022.6.09.0000", titulo: "AREspE", cliente_id: "9", cliente_principal: "Junio Alves Araújo", contrario_principal: "Procurador Geral Eleitoral", responsavel_principal: "Iara Cristina de Almeida", escritorio_responsavel: "Bruno Pena & Advogados Associados", tipo_registro: "Recurso", acao: "Agravo em Recurso Especial", orgao: "Goi\u00e2nia", tribunal: "Tribunal Superior Eleitoral", area: "Eleitoral", vara_turma: null, data_distribuicao: "20/11/2022", data_distribuicao_iso: "2022-11-20", valor_causa: null, status: "Ativo", pasta: "Pasta Proc - 0000008/001", posicao_cliente: "Recorrente", classificacao_principal: "Eleitoral", classificacao_secundaria: "Recurso" },
  { id: "10", numero_cnj: "0603327-74.2022.6.09.0000", titulo: "Impulsionamento de Propaganda Negativa (Governador que Sacrifica o Contribuinte)", cliente_id: "10", cliente_principal: "Humberto Teófilo de Menezes Neto", contrario_principal: "0603327-74.2022.6.09.0000", responsavel_principal: "Iara Cristina de Almeida", escritorio_responsavel: "Bruno Pena & Advogados Associados", tipo_registro: "Processo", acao: "Representa\u00e7\u00e3o", orgao: "Goi\u00e2nia", tribunal: "Tribunal Regional Eleitoral do Estado de Goi\u00e1s", area: "Eleitoral", vara_turma: "19 - Tribunal Pleno", data_distribuicao: null, data_distribuicao_iso: null, valor_causa: "R$ 0,00", status: "Ativo", pasta: null, posicao_cliente: "Requerido", classificacao_principal: "Eleitoral", classificacao_secundaria: "Representa\u00e7\u00e3o" },
  { id: "11", numero_cnj: "0603326-89.2022.6.09.0000", titulo: "Impulsionamento de Propaganda Negativa - Eleições 2022 (Governador é da Esquerda)", cliente_id: "11", cliente_principal: "Humberto Teófilo de Menezes Neto", contrario_principal: "0603326-89.2022.6.09.0000", responsavel_principal: "Iara Cristina de Almeida", escritorio_responsavel: "Bruno Pena & Advogados Associados", tipo_registro: "Processo", acao: "Representa\u00e7\u00e3o", orgao: null, tribunal: null, area: "Eleitoral", vara_turma: null, data_distribuicao: "21/09/2022", data_distribuicao_iso: "2022-09-21", valor_causa: null, status: "Ativo", pasta: "Pasta Proc - 0000010", posicao_cliente: "Requerido", classificacao_principal: "Eleitoral", classificacao_secundaria: "Representa\u00e7\u00e3o" },
  { id: "12", numero_cnj: "0603317-30.2022.6.09.0000", titulo: "Impulsionamento de Propaganda - Eleições 2022 (Governador da Mentira)", cliente_id: "12", cliente_principal: "Humberto Teófilo de Menezes Neto", contrario_principal: "0603317-30.2022.6.09.0000", responsavel_principal: "Iara Cristina de Almeida", escritorio_responsavel: "Bruno Pena & Advogados Associados", tipo_registro: "Processo", acao: "Representa\u00e7\u00e3o", orgao: "Goi\u00e2nia", tribunal: "Tribunal Regional Eleitoral do Estado de Goi\u00e1s", area: "Eleitoral", vara_turma: "1 - Tribunal Pleno", data_distribuicao: "21/09/2022", data_distribuicao_iso: "2022-09-21", valor_causa: null, status: "Ativo", pasta: "Pasta Proc - 0000011", posicao_cliente: "Requerido", classificacao_principal: "Eleitoral", classificacao_secundaria: "Representa\u00e7\u00e3o" },
  { id: "13", numero_cnj: "0603314-75.2022.6.09.0000", titulo: "Impulsionamento de Propaganda - Eleições 2022 (Garoto Propaganda da Enel)", cliente_id: "13", cliente_principal: "Humberto Teófilo de Menezes Neto", contrario_principal: "0603314-75.2022.6.09.0000", responsavel_principal: "Iara Cristina de Almeida", escritorio_responsavel: "Bruno Pena & Advogados Associados", tipo_registro: "Processo", acao: "Representa\u00e7\u00e3o", orgao: null, tribunal: "Tribunal Regional Eleitoral do Estado de Goi\u00e1s", area: "Eleitoral", vara_turma: "76 - Tribunal Pleno", data_distribuicao: null, data_distribuicao_iso: null, valor_causa: "R$ 0,00", status: "Ativo", pasta: null, posicao_cliente: "Requerido", classificacao_principal: "Eleitoral", classificacao_secundaria: "Representa\u00e7\u00e3o" },
  { id: "14", numero_cnj: "0603313-90.2022.6.09.0000", titulo: "Impulsionamento de Propaganda - Eleições 2022 (Governador da Mentira II)", cliente_id: "14", cliente_principal: "Humberto Teófilo de Menezes Neto", contrario_principal: "0603313-90.2022.6.09.0000", responsavel_principal: "Iara Cristina de Almeida", escritorio_responsavel: "Bruno Pena & Advogados Associados", tipo_registro: "Processo", acao: "Representa\u00e7\u00e3o", orgao: null, tribunal: null, area: "Eleitoral", vara_turma: null, data_distribuicao: "21/09/2022", data_distribuicao_iso: "2022-09-21", valor_causa: null, status: "Ativo", pasta: "Pasta Proc - 0000013", posicao_cliente: "Requerido", classificacao_principal: "Eleitoral", classificacao_secundaria: "Representa\u00e7\u00e3o" },
  { id: "15", numero_cnj: "0603313-90.2022.6.09.0000", titulo: "AREspE", cliente_id: "15", cliente_principal: "Humberto Teófilo de Menezes Neto", contrario_principal: "Procurador Geral Eleitoral", responsavel_principal: "Iara Cristina de Almeida", escritorio_responsavel: "Bruno Pena & Advogados Associados", tipo_registro: "Recurso", acao: "Agravo em Recurso Especial", orgao: "Goi\u00e2nia", tribunal: "Tribunal Superior Eleitoral", area: "Eleitoral", vara_turma: "1 - Tribunal Pleno", data_distribuicao: "13/12/2022", data_distribuicao_iso: "2022-12-13", valor_causa: null, status: "Ativo", pasta: "Pasta Proc - 0000013/001", posicao_cliente: "Agravante", classificacao_principal: "Eleitoral", classificacao_secundaria: "Recurso" },
  { id: "16", numero_cnj: "0603313-90.2022.6.09.0000", titulo: "AREspE", cliente_id: "16", cliente_principal: "Humberto Teófilo de Menezes Neto", contrario_principal: "Procurador Geral Eleitoral", responsavel_principal: "Iara Cristina de Almeida", escritorio_responsavel: "Bruno Pena & Advogados Associados", tipo_registro: "Processo", acao: "Agravo em Recurso Especial", orgao: "Goi\u00e2nia", tribunal: "Tribunal Superior Eleitoral", area: "Eleitoral", vara_turma: "4 - Tribunal Pleno", data_distribuicao: null, data_distribuicao_iso: null, valor_causa: "R$ 0,00", status: "Ativo", pasta: null, posicao_cliente: "Agravante", classificacao_principal: "Eleitoral", classificacao_secundaria: "Recurso" },
  { id: "17", numero_cnj: "0600573-62.2022.6.09.0000", titulo: "PCA - 2021", cliente_id: "17", cliente_principal: "PDT - Goiás", contrario_principal: "0600573-62.2022.6.09.0000", responsavel_principal: "Iara Cristina de Almeida", escritorio_responsavel: "Bruno Pena & Advogados Associados", tipo_registro: "Processo", acao: "Presta\u00e7\u00e3o de Contas Anual", orgao: null, tribunal: "Tribunal Regional Eleitoral do Estado de Goi\u00e1s", area: "Eleitoral", vara_turma: null, data_distribuicao: "07/07/2022", data_distribuicao_iso: "2022-07-07", valor_causa: null, status: "Ativo", pasta: "Pasta Proc - 0000015", posicao_cliente: "Requerente", classificacao_principal: "Eleitoral", classificacao_secundaria: "Presta\u00e7\u00e3o de Contas" },
  { id: "18", numero_cnj: "0600572-77.2022.6.09.0000", titulo: "PCA - 2021", cliente_id: "18", cliente_principal: "Partido Comunista do Brasil - Goiás", contrario_principal: "0600572-77.2022.6.09.0000", responsavel_principal: "Iara Cristina de Almeida", escritorio_responsavel: "Bruno Pena & Advogados Associados", tipo_registro: "Processo", acao: "Presta\u00e7\u00e3o de Contas Anual", orgao: null, tribunal: "Tribunal Regional Eleitoral do Estado de Goi\u00e1s", area: "Eleitoral", vara_turma: "- Tribunal Pleno", data_distribuicao: "07/07/2022", data_distribuicao_iso: "2022-07-07", valor_causa: "R$ 0,00", status: "Ativo", pasta: "Pasta Proc - 0000016", posicao_cliente: "Requerente", classificacao_principal: "Eleitoral", classificacao_secundaria: "Presta\u00e7\u00e3o de Contas" },
  { id: "19", numero_cnj: "0600194-24.2022.6.09.0000", titulo: "Justificação de Desfiliação Partidária", cliente_id: "19", cliente_principal: "Sabrina Garcez Henrique Silva", contrario_principal: "PSD - Comissão Provisória", responsavel_principal: "Iara Cristina de Almeida", escritorio_responsavel: "Bruno Pena & Advogados Associados", tipo_registro: "Processo", acao: "Desfilia\u00e7\u00e3o Partid\u00e1ria", orgao: null, tribunal: "Tribunal Regional Eleitoral do Estado de Goi\u00e1s", area: "Eleitoral", vara_turma: "1 - Tribunal Pleno", data_distribuicao: null, data_distribuicao_iso: null, valor_causa: "R$ 0,00", status: "Ativo", pasta: null, posicao_cliente: "Requerente", classificacao_principal: "Eleitoral", classificacao_secundaria: null },
  { id: "20", numero_cnj: "0600480-36.2021.6.09.0000", titulo: "Regularização de PCA - 2012", cliente_id: "20", cliente_principal: "Partido Comunista do Brasil - Goiás", contrario_principal: "0600480-36.2021.6.09.0000", responsavel_principal: "Iara Cristina de Almeida", escritorio_responsavel: "Bruno Pena & Advogados Associados", tipo_registro: "Processo", acao: "Presta\u00e7\u00e3o de Contas Anual", orgao: null, tribunal: "Tribunal Regional Eleitoral do Estado de Goi\u00e1s", area: "Eleitoral", vara_turma: null, data_distribuicao: "13/12/2021", data_distribuicao_iso: "2021-12-13", valor_causa: null, status: "Ativo", pasta: "Pasta Proc - 0000018", posicao_cliente: "Requerente", classificacao_principal: "Eleitoral", classificacao_secundaria: "Presta\u00e7\u00e3o de Contas" },
  { id: "21", numero_cnj: "0600479-51.2021.6.09.0000", titulo: "Regularização de PCA - 2011", cliente_id: "21", cliente_principal: "Partido Comunista do Brasil - Goiás", contrario_principal: "0600479-51.2021.6.09.0000", responsavel_principal: "Iara Cristina de Almeida", escritorio_responsavel: "Bruno Pena & Advogados Associados", tipo_registro: "Processo", acao: "Presta\u00e7\u00e3o de Contas Anual", orgao: null, tribunal: "Tribunal Regional Eleitoral do Estado de Goi\u00e1s", area: "Eleitoral", vara_turma: "- Tribunal Pleno", data_distribuicao: "13/12/2021", data_distribuicao_iso: "2021-12-13", valor_causa: "R$ 0,00", status: "Ativo", pasta: "Pasta Proc - 0000019", posicao_cliente: "Requerente", classificacao_principal: "Eleitoral", classificacao_secundaria: "Presta\u00e7\u00e3o de Contas" },
  { id: "22", numero_cnj: "0600477-81.2021.6.09.0000", titulo: "Regularização de PCA - 2004", cliente_id: "22", cliente_principal: "Partido Comunista do Brasil - Goiás", contrario_principal: "0600477-81.2021.6.09.0000", responsavel_principal: "Iara Cristina de Almeida", escritorio_responsavel: "Bruno Pena & Advogados Associados", tipo_registro: "Processo", acao: "Presta\u00e7\u00e3o de Contas Anual", orgao: null, tribunal: "Tribunal Regional Eleitoral do Estado de Goi\u00e1s", area: "Eleitoral", vara_turma: "19 - Tribunal Pleno", data_distribuicao: null, data_distribuicao_iso: null, valor_causa: "R$ 0,00", status: "Ativo", pasta: null, posicao_cliente: "Requerente", classificacao_principal: "Eleitoral", classificacao_secundaria: "Presta\u00e7\u00e3o de Contas" },
  { id: "23", numero_cnj: "0600003-07.2021.6.09.0002", titulo: "AIME - Cota de Gênero", cliente_id: "23", cliente_principal: "Wilson Pereira da Silva", contrario_principal: "Fabricio Silva Rosa", responsavel_principal: "Iara Cristina de Almeida", escritorio_responsavel: "Bruno Pena & Advogados Associados", tipo_registro: "Processo", acao: "A\u00e7\u00e3o de Impugna\u00e7\u00e3o de Mandado Eletivo", orgao: null, tribunal: "Tribunal Regional Eleitoral do Estado de Goi\u00e1s", area: "Eleitoral", vara_turma: null, data_distribuicao: "11/02/2022", data_distribuicao_iso: "2022-02-11", valor_causa: null, status: "Ativo", pasta: "Pasta Proc - 0000021", posicao_cliente: "Requerido", classificacao_principal: "Eleitoral", classificacao_secundaria: "AIME" },
  { id: "24", numero_cnj: "0600003-07.2021.6.09.0002", titulo: "AREspE", cliente_id: "24", cliente_principal: "Edgar Duarte Gomes", contrario_principal: "Procurador Geral Eleitoral", responsavel_principal: "Iara Cristina de Almeida", escritorio_responsavel: "Bruno Pena & Advogados Associados", tipo_registro: "Recurso", acao: "Agravo em Recurso Especial", orgao: "Goi\u00e2nia", tribunal: "Tribunal Superior Eleitoral", area: "Eleitoral", vara_turma: "11 - Tribunal Pleno", data_distribuicao: "13/12/2022", data_distribuicao_iso: "2022-12-13", valor_causa: null, status: "Ativo", pasta: "Pasta Proc - 0000021/001", posicao_cliente: "Agravado", classificacao_principal: "Eleitoral", classificacao_secundaria: "Recurso" },
  { id: "25", numero_cnj: "0600003-07.2021.6.09.0002", titulo: "Cota de Genêro", cliente_id: "25", cliente_principal: "Wilson Pereira da Silva Cunha", contrario_principal: "Fabricio Silva Rosa", responsavel_principal: "Iara Cristina de Almeida", escritorio_responsavel: "Bruno Pena & Advogados Associados", tipo_registro: "Processo", acao: "Recurso Eleitoral", orgao: "Goi\u00e2nia", tribunal: "Tribunal Regional Eleitoral do Estado de Goi\u00e1s", area: "Eleitoral", vara_turma: "6 - Tribunal Pleno", data_distribuicao: null, data_distribuicao_iso: null, valor_causa: "R$ 0,00", status: "Ativo", pasta: null, posicao_cliente: "Recorrido", classificacao_principal: "Eleitoral", classificacao_secundaria: "Recurso" },
  { id: "26", numero_cnj: "0600055-35.2020.6.09.0132", titulo: "Capacitação ilícita de votos", cliente_id: "26", cliente_principal: "Helvecino Moura da Cunha", contrario_principal: "Ministério Público Eleitoral", responsavel_principal: "Iara Cristina de Almeida", escritorio_responsavel: "Bruno Pena & Advogados Associados", tipo_registro: "Processo", acao: "A\u00e7\u00e3o Criminal Eleitoral", orgao: null, tribunal: "Tribunal Regional Eleitoral do Estado de Goi\u00e1s", area: "Eleitoral", vara_turma: null, data_distribuicao: "27/07/2021", data_distribuicao_iso: "2021-07-27", valor_causa: null, status: "Ativo", pasta: "Pasta Proc - 0000026", posicao_cliente: "R\u00e9u", classificacao_principal: "Eleitoral", classificacao_secundaria: "A\u00e7\u00e3o Criminal" },
  { id: "27", numero_cnj: "0600055-35.2020.6.09.0132", titulo: "Compra de Votos - Eleições 2016", cliente_id: "27", cliente_principal: "Helvecino Moura da Cunha", contrario_principal: "Ministério Público Eleitoral", responsavel_principal: "Iara Cristina de Almeida", escritorio_responsavel: "Bruno Pena & Advogados Associados", tipo_registro: "Recurso", acao: "Recurso Criminal", orgao: null, tribunal: "Tribunal Regional Eleitoral do Estado de Goi\u00e1s", area: "Eleitoral", vara_turma: "11 - Tribunal Pleno", data_distribuicao: "27/07/2021", data_distribuicao_iso: "2021-07-27", valor_causa: "R$ 0,00", status: "Ativo", pasta: "Pasta Proc - 0000026/001", posicao_cliente: "Recorrente", classificacao_principal: "Eleitoral", classificacao_secundaria: "Recurso" },
  { id: "28", numero_cnj: "0602003-88.2018.6.09.0000", titulo: "Estudantes UEE", cliente_id: "28", cliente_principal: "Sofia Morais Barreto de Sousa", contrario_principal: "Ronaldo Ramos Caiado", responsavel_principal: "Iara Cristina de Almeida", escritorio_responsavel: "Bruno Pena & Advogados Associados", tipo_registro: "Processo", acao: "Representa\u00e7\u00e3o", orgao: null, tribunal: "Tribunal Regional Eleitoral do Estado de Goi\u00e1s", area: "Eleitoral", vara_turma: "3 - Tribunal Pleno", data_distribuicao: null, data_distribuicao_iso: null, valor_causa: "R$ 0,00", status: "Ativo", pasta: null, posicao_cliente: "Requerido", classificacao_principal: "Eleitoral", classificacao_secundaria: "Representa\u00e7\u00e3o" },
  { id: "29", numero_cnj: "0600441-39.2021.6.09.0000", titulo: "Embargos à Execução", cliente_id: "29", cliente_principal: "Wagner Sousa Lima", contrario_principal: "Procuradoria da União no Estado de Goiás", responsavel_principal: "Iara Cristina de Almeida", escritorio_responsavel: "Bruno Pena & Advogados Associados", tipo_registro: "Processo", acao: null, orgao: null, tribunal: "Tribunal Regional Eleitoral do Estado de Goi\u00e1s", area: "Eleitoral", vara_turma: null, data_distribuicao: "08/11/2021", data_distribuicao_iso: "2021-11-08", valor_causa: null, status: "Ativo", pasta: "Pasta Proc - 0000029", posicao_cliente: "Requerente", classificacao_principal: "Eleitoral", classificacao_secundaria: "Execu\u00e7\u00e3o" },
  { id: "30", numero_cnj: "0600339-17.2021.6.09.0000", titulo: "Não é nosso", cliente_id: "30", cliente_principal: "PROS - Goiás", contrario_principal: "0600339-17.2021.6.09.0000", responsavel_principal: "Iara Cristina de Almeida", escritorio_responsavel: "Bruno Pena & Advogados Associados", tipo_registro: "Processo", acao: "Presta\u00e7\u00e3o de Contas Anual", orgao: null, tribunal: "Tribunal Regional Eleitoral do Estado de Goi\u00e1s", area: "Eleitoral", vara_turma: "- Tribunal Pleno", data_distribuicao: "30/07/2021", data_distribuicao_iso: "2021-07-30", valor_causa: "R$ 0,00", status: "Arquivado", pasta: "Pasta Proc - 0000030", posicao_cliente: "Interessado", classificacao_principal: "Eleitoral", classificacao_secundaria: "Presta\u00e7\u00e3o de Contas" },
  { id: "31", numero_cnj: "0600187-66.2021.6.09.0000", titulo: "PCA - 2020", cliente_id: "31", cliente_principal: "PDT - Goiás", contrario_principal: "0600187-66.2021.6.09.0000", responsavel_principal: "Iara Cristina de Almeida", escritorio_responsavel: "Bruno Pena & Advogados Associados", tipo_registro: "Processo", acao: "Presta\u00e7\u00e3o de Contas Anual", orgao: null, tribunal: "Tribunal Regional Eleitoral do Estado de Goi\u00e1s", area: "Eleitoral", vara_turma: "2 - Tribunal Pleno", data_distribuicao: null, data_distribuicao_iso: null, valor_causa: "R$ 0,00", status: "Ativo", pasta: null, posicao_cliente: "Interessado", classificacao_principal: "Eleitoral", classificacao_secundaria: "Presta\u00e7\u00e3o de Contas" },
  { id: "32", numero_cnj: "0600178-07.2021.6.09.0000", titulo: "PCA - 2020", cliente_id: "32", cliente_principal: "Partido Comunista do Brasil - Goiás", contrario_principal: "0600178-07.2021.6.09.0000", responsavel_principal: "Iara Cristina de Almeida", escritorio_responsavel: "Bruno Pena & Advogados Associados", tipo_registro: "Processo", acao: "Presta\u00e7\u00e3o de Contas Anual", orgao: null, tribunal: "Tribunal Regional Eleitoral do Estado de Goi\u00e1s", area: "Eleitoral", vara_turma: null, data_distribuicao: "24/06/2021", data_distribuicao_iso: "2021-06-24", valor_causa: null, status: "Ativo", pasta: "Pasta Proc - 0000032", posicao_cliente: "Interessado", classificacao_principal: "Eleitoral", classificacao_secundaria: "Presta\u00e7\u00e3o de Contas" },
  { id: "33", numero_cnj: "0601090-26.2020.6.09.0004", titulo: "AIJE - Cota de Gênero", cliente_id: "33", cliente_principal: "PROS - Novo Gama", contrario_principal: "PSC- NOVO GAMA", responsavel_principal: "Iara Cristina de Almeida", escritorio_responsavel: "Bruno Pena & Advogados Associados", tipo_registro: "Processo", acao: "A\u00e7\u00e3o de Investiga\u00e7\u00e3o Judicial Eleitoral", orgao: null, tribunal: "Tribunal Regional Eleitoral do Estado de Goi\u00e1s", area: "Eleitoral", vara_turma: "- Tribunal Pleno", data_distribuicao: "02/09/2022", data_distribuicao_iso: "2022-09-02", valor_causa: "R$ 0,00", status: "Ativo", pasta: "Pasta Proc - 0000033", posicao_cliente: "Requerente", classificacao_principal: "Eleitoral", classificacao_secundaria: "AIJE" },
  { id: "34", numero_cnj: "0603726-45.2018.6.09.0000", titulo: "Captação e Gastos Ilícitos", cliente_id: "34", cliente_principal: "Elenira Tatiana Lemos Vieira Chadud", contrario_principal: "Ministério Público Eleitoral", responsavel_principal: "Iara Cristina de Almeida", escritorio_responsavel: "Bruno Pena & Advogados Associados", tipo_registro: "Processo", acao: "Representa\u00e7\u00e3o", orgao: null, tribunal: "Tribunal Regional Eleitoral do Estado de Goi\u00e1s", area: "Eleitoral", vara_turma: "2 - Tribunal Pleno", data_distribuicao: null, data_distribuicao_iso: null, valor_causa: null, status: "Ativo", pasta: null, posicao_cliente: "Requerido", classificacao_principal: "Eleitoral", classificacao_secundaria: "Representa\u00e7\u00e3o" },
  { id: "35", numero_cnj: "0603726-45.2018.6.09.0000", titulo: "ARE - Captação e Gastos Ilícitos", cliente_id: "35", cliente_principal: "Elenira Tatiana Lemos Vieira Chadud", contrario_principal: "Ministério Público Eleitoral", responsavel_principal: "Bruno Aurélio Rodrigues da Silva Pena", escritorio_responsavel: "Bruno Pena & Advogados Associados", tipo_registro: "Recurso", acao: "Recurso extraordin\u00e1rio", orgao: null, tribunal: "Supremo Tribunal Federal", area: "Eleitoral", vara_turma: null, data_distribuicao: "21/10/2021", data_distribuicao_iso: "2021-10-21", valor_causa: null, status: "Arquivado", pasta: "Pasta Proc - 0000034/001", posicao_cliente: "Recorrente", classificacao_principal: "Eleitoral", classificacao_secundaria: "Recurso" },
  { id: "36", numero_cnj: "0600279-49.2018.6.09.0000", titulo: "PCA - 2017", cliente_id: "36", cliente_principal: "Partido Comunista do Brasil - Goiás", contrario_principal: "Procuradoria da União no Estado de Goiás", responsavel_principal: "Iara Cristina de Almeida", escritorio_responsavel: "Bruno Pena & Advogados Associados", tipo_registro: "Processo", acao: "Presta\u00e7\u00e3o de Contas Anual", orgao: null, tribunal: "Tribunal Superior Eleitoral", area: "Eleitoral", vara_turma: "1 - Tribunal Pleno", data_distribuicao: "30/04/2018", data_distribuicao_iso: "2018-04-30", valor_causa: "R$ 0,00", status: "Ativo", pasta: "Pasta Proc - 0000036", posicao_cliente: "Executado", classificacao_principal: "Eleitoral", classificacao_secundaria: "Presta\u00e7\u00e3o de Contas" },
  { id: "37", numero_cnj: "0600203-59.2017.6.09.0000", titulo: "PCA - 2016", cliente_id: "37", cliente_principal: "Partido Comunista do Brasil - Goiás", contrario_principal: "Procuradoria da União no Estado de Goiás", responsavel_principal: "Iara Cristina de Almeida", escritorio_responsavel: "Bruno Pena & Advogados Associados", tipo_registro: "Processo", acao: "Presta\u00e7\u00e3o de Contas Anual", orgao: null, tribunal: "Tribunal Regional Eleitoral do Estado de Goi\u00e1s", area: "Eleitoral", vara_turma: "- Tribunal Pleno", data_distribuicao: null, data_distribuicao_iso: null, valor_causa: "R$ 0,00", status: "Ativo", pasta: null, posicao_cliente: "Executado", classificacao_principal: "Eleitoral", classificacao_secundaria: "Presta\u00e7\u00e3o de Contas" },
  { id: "38", numero_cnj: "0000619-71.2016.6.09.0013", titulo: "Captação Ilícita de Votos - Benefícios SMS", cliente_id: "38", cliente_principal: "Vireni Vila Verde Alvares", contrario_principal: "Ministério Público Eleitoral", responsavel_principal: "Iara Cristina de Almeida", escritorio_responsavel: "Bruno Pena & Advogados Associados", tipo_registro: "Processo", acao: "A\u00e7\u00e3o Criminal Eleitoral", orgao: null, tribunal: "Tribunal Regional Eleitoral do Estado de Goi\u00e1s", area: "Eleitoral", vara_turma: null, data_distribuicao: "01/03/2021", data_distribuicao_iso: "2021-03-01", valor_causa: null, status: "Ativo", pasta: "Pasta Proc - 0000038", posicao_cliente: "R\u00e9u", classificacao_principal: "Eleitoral", classificacao_secundaria: "A\u00e7\u00e3o Criminal" },
  { id: "39", numero_cnj: "0000619-71.2016.6.09.0013", titulo: "Recurso Criminal (S.M.S)", cliente_id: "39", cliente_principal: "Carlos André Vila Verde Alvares da Silva", contrario_principal: "Ministério Público Eleitoral", responsavel_principal: "Iara Cristina de Almeida", escritorio_responsavel: "Bruno Pena & Advogados Associados", tipo_registro: "Recurso", acao: "Recurso Criminal", orgao: null, tribunal: "Tribunal Regional Eleitoral do Estado de Goi\u00e1s", area: "Eleitoral", vara_turma: "5 - Tribunal Pleno", data_distribuicao: "01/03/2021", data_distribuicao_iso: "2021-03-01", valor_causa: "R$ 0,00", status: "Ativo", pasta: "Pasta Proc - 0000038/001", posicao_cliente: "Recorrente", classificacao_principal: "Eleitoral", classificacao_secundaria: "Recurso" },
  { id: "40", numero_cnj: "0000599-22.2016.6.09.0000", titulo: "PCA - 2016", cliente_id: "40", cliente_principal: "Partido Comunista do Brasil - Goiás", contrario_principal: "Procuradoria da União no Estado de Goiás", responsavel_principal: "Iara Cristina de Almeida", escritorio_responsavel: "Bruno Pena & Advogados Associados", tipo_registro: "Processo", acao: "Presta\u00e7\u00e3o de Contas Anual", orgao: null, tribunal: "Tribunal Regional Eleitoral do Estado de Goi\u00e1s", area: "Eleitoral", vara_turma: "- Tribunal Pleno", data_distribuicao: null, data_distribuicao_iso: null, valor_causa: "R$ 0,00", status: "Ativo", pasta: null, posicao_cliente: "Executado", classificacao_principal: "Eleitoral", classificacao_secundaria: "Presta\u00e7\u00e3o de Contas" },
  { id: "41", numero_cnj: "0000414-18.2015.6.09.0000", titulo: "PCA - 2014", cliente_id: "1", cliente_principal: "PC do B", contrario_principal: "Procuradoria da União no Estado de Goiás", responsavel_principal: "Iara Cristina de Almeida", escritorio_responsavel: "Bruno Pena & Advogados Associados", tipo_registro: "Processo", acao: "Presta\u00e7\u00e3o de Contas Anual", orgao: null, tribunal: "Tribunal Regional Eleitoral do Estado de Goi\u00e1s", area: "Eleitoral", vara_turma: null, data_distribuicao: "18/11/2020", data_distribuicao_iso: "2020-11-18", valor_causa: null, status: "Ativo", pasta: "Pasta Proc - 0000041", posicao_cliente: "Executado", classificacao_principal: "Eleitoral", classificacao_secundaria: "Presta\u00e7\u00e3o de Contas" },
  { id: "42", numero_cnj: "0000148-31.2015.6.09.0000", titulo: "PCA - 2014", cliente_id: "2", cliente_principal: "PDT - Goiás", contrario_principal: "Procuradoria da União no Estado de Goiás", responsavel_principal: "Iara Cristina de Almeida", escritorio_responsavel: "Bruno Pena & Advogados Associados", tipo_registro: "Processo", acao: "Presta\u00e7\u00e3o de Contas Anual", orgao: null, tribunal: "Tribunal Regional Eleitoral do Estado de Goi\u00e1s", area: "Eleitoral", vara_turma: "- Tribunal Pleno", data_distribuicao: "20/10/2020", data_distribuicao_iso: "2020-10-20", valor_causa: "R$ 0,00", status: "Ativo", pasta: "Pasta Proc - 0000042", posicao_cliente: "Executado", classificacao_principal: "Eleitoral", classificacao_secundaria: "Presta\u00e7\u00e3o de Contas" },
  { id: "43", numero_cnj: "0002241-98.2014.6.09.0000", titulo: "PCA - 2014", cliente_id: "3", cliente_principal: "Renato Carvalho Branquinho", contrario_principal: "Procuradoria da União no Estado de Goiás", responsavel_principal: "Iara Cristina de Almeida", escritorio_responsavel: "Bruno Pena & Advogados Associados", tipo_registro: "Processo", acao: "Presta\u00e7\u00e3o de Contas Anual", orgao: null, tribunal: "Tribunal Regional Eleitoral do Estado de Goi\u00e1s", area: "Eleitoral", vara_turma: "- Tribunal Pleno", data_distribuicao: null, data_distribuicao_iso: null, valor_causa: "R$ 0,00", status: "Ativo", pasta: null, posicao_cliente: "Executado", classificacao_principal: "Eleitoral", classificacao_secundaria: "Presta\u00e7\u00e3o de Contas" },
  { id: "44", numero_cnj: "0600140-71.2022.6.09.0028", titulo: "PCE - 2022", cliente_id: "4", cliente_principal: "Partido Comunista do Brasil - Goiás", contrario_principal: "0600140-71.2022.6.09.0028", responsavel_principal: "Iara Cristina de Almeida", escritorio_responsavel: "Bruno Pena & Advogados Associados", tipo_registro: "Processo", acao: "Presta\u00e7\u00e3o de Contas Eleitoral", orgao: null, tribunal: "Tribunal Superior Eleitoral", area: "Eleitoral", vara_turma: null, data_distribuicao: "27/10/2022", data_distribuicao_iso: "2022-10-27", valor_causa: null, status: "Ativo", pasta: "Pasta Proc - 0000044", posicao_cliente: "Requerente", classificacao_principal: "Eleitoral", classificacao_secundaria: "Presta\u00e7\u00e3o de Contas" },
  { id: "45", numero_cnj: "0600024-65.2022.6.09.0028", titulo: "PCA - 2021", cliente_id: "5", cliente_principal: "Partido Comunista do Brasil - Goiás", contrario_principal: "0600024-65.2022.6.09.0028", responsavel_principal: "Iara Cristina de Almeida", escritorio_responsavel: "Bruno Pena & Advogados Associados", tipo_registro: "Processo", acao: "Presta\u00e7\u00e3o de Contas Anual", orgao: null, tribunal: "Tribunal Superior Eleitoral", area: "Eleitoral", vara_turma: "28 \u00aa Zona Eleitoral", data_distribuicao: "27/06/2022", data_distribuicao_iso: "2022-06-27", valor_causa: "R$ 0,00", status: "Ativo", pasta: "Pasta Proc - 0000045", posicao_cliente: "Interessado", classificacao_principal: "Eleitoral", classificacao_secundaria: "Presta\u00e7\u00e3o de Contas" },
  { id: "46", numero_cnj: "0600011-66.2022.6.09.0028", titulo: "PCA - 2016", cliente_id: "6", cliente_principal: "Partido Pátria Livre", contrario_principal: "0600011-66.2022.6.09.0028", responsavel_principal: "Iara Cristina de Almeida", escritorio_responsavel: "Bruno Pena & Advogados Associados", tipo_registro: "Processo", acao: "Presta\u00e7\u00e3o de Contas Anual", orgao: null, tribunal: "Tribunal Superior Eleitoral", area: "Eleitoral", vara_turma: "28 \u00aa Zona Eleitoral", data_distribuicao: null, data_distribuicao_iso: null, valor_causa: "R$ 0,00", status: "Ativo", pasta: null, posicao_cliente: "Requerente", classificacao_principal: "Eleitoral", classificacao_secundaria: "Presta\u00e7\u00e3o de Contas" },
  { id: "47", numero_cnj: "0600036-16.2022.6.09.0049", titulo: "PCA - 2021", cliente_id: "7", cliente_principal: "Partido Comunista do Brasil - Goiás", contrario_principal: "0600036-16.2022.6.09.0049", responsavel_principal: "Iara Cristina de Almeida", escritorio_responsavel: "Bruno Pena & Advogados Associados", tipo_registro: "Processo", acao: "Presta\u00e7\u00e3o de Contas Anual", orgao: null, tribunal: "Tribunal Superior Eleitoral", area: "Eleitoral", vara_turma: null, data_distribuicao: "26/06/2022", data_distribuicao_iso: "2022-06-26", valor_causa: null, status: "Ativo", pasta: "Pasta Proc - 0000047", posicao_cliente: "Interessado", classificacao_principal: "Eleitoral", classificacao_secundaria: "Presta\u00e7\u00e3o de Contas" },
  { id: "48", numero_cnj: "0600851-81.2020.6.09.0049", titulo: "Falsidade Ideológica - Crachá Eleições 2020", cliente_id: "8", cliente_principal: "Diogo Reis Ludovico", contrario_principal: "Ministério Público Eleitoral", responsavel_principal: "Iara Cristina de Almeida", escritorio_responsavel: "Bruno Pena & Advogados Associados", tipo_registro: "Processo", acao: "A\u00e7\u00e3o Criminal Eleitoral", orgao: null, tribunal: "Tribunal Superior Eleitoral", area: "Eleitoral", vara_turma: "49 \u00aa Zona Eleitoral", data_distribuicao: "16/11/2020", data_distribuicao_iso: "2020-11-16", valor_causa: "R$ 0,00", status: "Ativo", pasta: "Pasta Proc - 0000048", posicao_cliente: "R\u00e9u", classificacao_principal: "Eleitoral", classificacao_secundaria: "A\u00e7\u00e3o Criminal" },
  { id: "49", numero_cnj: "0600490-64.2020.6.09.0049", titulo: "PCA - 2020", cliente_id: "9", cliente_principal: "Dineuvan Ramos de Oliveira", contrario_principal: "0600490-64.2020.6.09.0049", responsavel_principal: "Iara Cristina de Almeida", escritorio_responsavel: "Bruno Pena & Advogados Associados", tipo_registro: "Processo", acao: "Presta\u00e7\u00e3o de Contas Anual", orgao: null, tribunal: "Tribunal Superior Eleitoral", area: "Eleitoral", vara_turma: "49\u00ba \u00aa Zona Eleitoral", data_distribuicao: null, data_distribuicao_iso: null, valor_causa: "R$ 0,00", status: "Ativo", pasta: null, posicao_cliente: "Requerente", classificacao_principal: "Eleitoral", classificacao_secundaria: "Presta\u00e7\u00e3o de Contas" },
  { id: "50", numero_cnj: "0600072-09.2022.6.09.0033", titulo: "PCA - 2021", cliente_id: "10", cliente_principal: "PC do B - Valparaíso", contrario_principal: "0600072-09.2022.6.09.0033", responsavel_principal: "Iara Cristina de Almeida", escritorio_responsavel: "Bruno Pena & Advogados Associados", tipo_registro: "Processo", acao: "Presta\u00e7\u00e3o de Contas Anual", orgao: null, tribunal: "Tribunal Superior Eleitoral", area: "Eleitoral", vara_turma: null, data_distribuicao: "06/07/2022", data_distribuicao_iso: "2022-07-06", valor_causa: null, status: "Ativo", pasta: "Pasta Proc - 0000050", posicao_cliente: "Interessado", classificacao_principal: "Eleitoral", classificacao_secundaria: "Presta\u00e7\u00e3o de Contas" },
];

const movementTemplates = [
  { resumo: 'Juntada de petição', classificacao: 'Exige ação' as const, acao: 'Analisar petição' },
  { resumo: 'Despacho ordinatório', classificacao: 'Informativa' as const, acao: null },
  { resumo: 'Intimação para manifestação', classificacao: 'Com prazo' as const, acao: 'Preparar manifestação' },
  { resumo: 'Sentença proferida', classificacao: 'Exige ação' as const, acao: 'Avaliar recurso' },
  { resumo: 'Audiência designada', classificacao: 'Com prazo' as const, acao: 'Preparar para audiência' },
  { resumo: 'Publicação de acórdão', classificacao: 'Exige ação' as const, acao: 'Analisar acórdão' },
  { resumo: 'Certidão de intimação', classificacao: 'Informativa' as const, acao: null },
  { resumo: 'Decisão interlocutória', classificacao: 'Exige ação' as const, acao: 'Cumprir decisão' },
];

export const mockActusMovements: ActusMovement[] = mockActusProcesses.slice(0, 25).flatMap((p, pi) => 
  Array.from({ length: Math.min(3, pi % 4 + 1) }, (_, mi) => {
    const tmpl = movementTemplates[(pi + mi) % movementTemplates.length];
    const day = 28 - pi - mi;
    return {
      id: \`mv-\${pi}-\${mi}\`,
      processo_id: p.id,
      processo_cnj: p.numero_cnj,
      data_movimentacao: \`2026-03-\${String(Math.max(1, day)).padStart(2, '0')}\`,
      resumo: tmpl.resumo,
      classificacao: tmpl.classificacao,
      responsavel: p.responsavel_principal,
      acao_necessaria: tmpl.acao,
      cliente: p.cliente_principal,
    };
  })
);


const intimationTemplates = [
  { resumo: 'Intimação para manifestação sobre documentos', classificacao: 'Urgente' as const },
  { resumo: 'Intimação de sentença', classificacao: 'Urgente' as const },
  { resumo: 'Intimação para ciência de despacho', classificacao: 'Normal' as const },
  { resumo: 'Intimação de acórdão', classificacao: 'Urgente' as const },
  { resumo: 'Intimação para audiência', classificacao: 'Normal' as const },
  { resumo: 'Intimação eletrônica', classificacao: 'Informativa' as const },
];

export const mockActusIntimations: ActusIntimation[] = mockActusProcesses.slice(0, 20).map((p, i) => {
  const tmpl = intimationTemplates[i % intimationTemplates.length];
  const day = 28 - i;
  const prazoDay = day + 15;
  const lida = i < 5 ? 'Lida' as const : 'Não lida' as const;
  const triada = i < 3 ? 'Triada' as const : 'Não triada' as const;
  return {
    id: \`int-\${i}\`,
    processo_id: p.id,
    processo_cnj: p.numero_cnj,
    data_intimacao: \`2026-03-\${String(Math.max(1, day)).padStart(2, '0')}\`,
    prazo_em: prazoDay <= 31 ? \`2026-03-\${String(prazoDay).padStart(2, '0')}\` : \`2026-04-\${String(prazoDay - 31).padStart(2, '0')}\`,
    resumo: tmpl.resumo,
    classificacao: tmpl.classificacao,
    responsavel: p.responsavel_principal,
    tarefa_status: i < 4 ? 'Tarefa criada' as const : i < 10 ? 'Criar tarefa' as const : 'Sem tarefa' as const,
    leitura_status: lida,
    triagem_status: triada,
    cliente: p.cliente_principal,
  };
});


export const mockActusDeadlines: ActusDeadline[] = mockActusProcesses.slice(0, 15).map((p, i) => {
  const tarefas = ['Contestar', 'Protocolar petição', 'Preparar recurso', 'Formalizar pedido', 'Revisar documentos', 'Preparar manifestação'];
  const day = (i * 2) + 1;
  const urgencias: Array<'Alta' | 'Média' | 'Baixa'> = ['Alta', 'Média', 'Baixa'];
  return {
    id: \`dl-\${i}\`,
    processo_id: p.id,
    processo_cnj: p.numero_cnj,
    data_prazo: day <= 28 ? \`2026-03-\${String(day).padStart(2, '0')}\` : \`2026-04-\${String(day - 28).padStart(2, '0')}\`,
    descricao: \`Prazo para \${tarefas[i % tarefas.length].toLowerCase()}\`,
    tarefa: tarefas[i % tarefas.length],
    situacao: i < 3 ? 'Vencido' as const : i < 10 ? 'Pendente' as const : 'Cumprido' as const,
    urgencia: urgencias[i % 3],
    cliente: p.cliente_principal,
    responsavel: p.responsavel_principal,
    tipo_acao: p.acao || 'Ação Cível',
  };
});


const docTypes = ['Procuração', 'Substabelecimento', 'Contrato', 'Proposta de Honorários', 'RPV', 'Petição', 'Requerimento', 'Declaração'];
const docStatuses: Array<'Rascunho' | 'Finalizado' | 'Assinatura pendente'> = ['Rascunho', 'Finalizado', 'Assinatura pendente'];

export const mockActusDocuments: ActusDocument[] = mockActusProcesses.slice(0, 20).map((p, i) => ({
  id: \`doc-\${i}\`,
  nome_documento: \`\${docTypes[i % docTypes.length]} - \${p.cliente_principal.split(' ').slice(0, 2).join(' ')}\`,
  tipo_documento: docTypes[i % docTypes.length],
  cliente_id: p.cliente_id,
  cliente_nome: p.cliente_principal,
  processo_id: p.id,
  processo_cnj: p.numero_cnj,
  responsavel: p.responsavel_principal.split(' ').slice(0, 2).join(' '),
  status_documento: docStatuses[i % 3],
  ultima_edicao_em: \`2026-03-\${String(28 - i).padStart(2, '0')}\`,
  categoria: docTypes[i % docTypes.length],
}));


export const mockActusTasks: ActusTask[] = [
  { id: 'tk-1', tipo: 'Tarefa', inicio_em: '2026-03-27T15:00', termino_em: '2026-03-27T15:30', processo_cnj: '5156717-04.2022.8.09.0051', descricao: 'Agravo Interno - Resp DB', subtipo: 'Agravo Interno ou Regimental', status: 'Pendente', prioridade: 'Alta', responsavel: 'Bruno Aurélio', processo_id: null, cliente_id: null },
  { id: 'tk-2', tipo: 'Tarefa', inicio_em: '2026-03-26T16:00', termino_em: '2026-03-26T16:30', processo_cnj: '5143360-54.2022.8.09.0051', descricao: 'Agravo em Recurso Especial', subtipo: 'Agravo contra decisão', status: 'Pendente', prioridade: 'Alta', responsavel: 'Tatianne Pena Braga', processo_id: null, cliente_id: null },
  { id: 'tk-3', tipo: 'Tarefa', inicio_em: '2026-03-25T16:00', termino_em: '2026-03-25T16:30', processo_cnj: '5185711-42.2022.8.09.0051', descricao: 'CR AInt - Resp DB', subtipo: 'Contrarrazões', status: 'Em andamento', prioridade: 'Média', responsavel: 'Eliseu Pena', processo_id: null, cliente_id: null },
  { id: 'tk-4', tipo: 'Tarefa', inicio_em: '2026-03-24T16:00', termino_em: '2026-03-24T16:30', processo_cnj: '5264427-83.2022.8.09.0051', descricao: 'CR AInt - Resp DB', subtipo: 'Contrarrazões', status: 'Pendente', prioridade: 'Média', responsavel: 'Wilson Corpel', processo_id: null, cliente_id: null },
  { id: 'tk-5', tipo: 'Tarefa', inicio_em: '2026-03-23T16:00', termino_em: '2026-03-27T16:30', processo_cnj: '5137506-79.2022.8.09.0051', descricao: 'Impugnação à Contestação - Licença Maternidade', subtipo: 'Réplica', status: 'Pendente', prioridade: 'Alta', responsavel: 'Eliseu Pena', processo_id: null, cliente_id: null },
  { id: 'tk-6', tipo: 'Tarefa', inicio_em: '2026-03-22T12:00', termino_em: '2026-03-22T12:30', processo_cnj: '5731267-74.2022.8.09.0000', descricao: 'CR ao RI - ANC', subtipo: 'Recurso Inominado', status: 'Cumprido', prioridade: 'Baixa', responsavel: 'Iara Cristina', processo_id: null, cliente_id: null },
  { id: 'tk-7', tipo: 'Tarefa', inicio_em: '2026-03-21T11:00', termino_em: '2026-03-21T11:30', processo_cnj: '5143651-54.2022.8.09.0051', descricao: 'Agravo Interno - DB', subtipo: 'Agravo Interno', status: 'Cumprido', prioridade: 'Média', responsavel: 'Bruno Aurélio', processo_id: null, cliente_id: null },
  { id: 'tk-8', tipo: 'Tarefa', inicio_em: '2026-03-20T12:00', termino_em: '2026-03-20T12:30', processo_cnj: '5180108-85.2022.8.09.0051', descricao: 'Agravo Interno - DB', subtipo: 'Agravo Interno', status: 'Em andamento', prioridade: 'Alta', responsavel: 'Tatianne Pena Braga', processo_id: null, cliente_id: null },
  { id: 'tk-9', tipo: 'Prazo', inicio_em: '2026-03-28T09:00', termino_em: '2026-03-28T09:30', processo_cnj: '5156717-04.2022.8.09.0051', descricao: 'Prazo para contestação', subtipo: 'Contestação', status: 'Pendente', prioridade: 'Alta', responsavel: 'Eliseu Pena', processo_id: null, cliente_id: null },
  { id: 'tk-10', tipo: 'Prazo', inicio_em: '2026-03-29T09:00', termino_em: '2026-03-30T17:00', processo_cnj: '5108610-26.2022.8.09.0051', descricao: 'Prazo para recurso', subtipo: 'Recurso', status: 'Pendente', prioridade: 'Alta', responsavel: 'Bruno Aurélio', processo_id: null, cliente_id: null },
  { id: 'tk-11', tipo: 'Tarefa', inicio_em: '2026-04-01T14:00', termino_em: '2026-04-01T15:00', processo_cnj: null, descricao: 'Reunião com cliente - Banco Alpha', subtipo: 'Reunião', status: 'Pendente', prioridade: 'Média', responsavel: 'Eliseu Pena', processo_id: null, cliente_id: '1' },
  { id: 'tk-12', tipo: 'Tarefa', inicio_em: '2026-04-02T10:00', termino_em: '2026-04-02T11:00', processo_cnj: null, descricao: 'Revisão de contrato de honorários', subtipo: 'Revisão', status: 'Pendente', prioridade: 'Baixa', responsavel: 'Marcelo', processo_id: null, cliente_id: '2' },
];


export const actusStats = {
  processosAtivos: mockActusProcesses.filter(p => p.status === 'Ativo').length,
  totalClientes: mockActusClients.length,
  tarefasPendentes: mockActusTasks.filter(t => t.status === 'Pendente').length,
  tarefasUrgentes: mockActusTasks.filter(t => t.prioridade === 'Alta' && t.status === 'Pendente').length,
  receitaMes: 235960,
  processosArquivados: mockActusProcesses.filter(p => p.status === 'Arquivado').length,
  processosSuspensos: mockActusProcesses.filter(p => p.status === 'Suspenso').length,
  intimacoesNaoLidas: mockActusIntimations.filter(i => i.leitura_status === 'Não lida').length,
  processosPorArea: (() => {
    const map: Record<string, number> = {};
    mockActusProcesses.forEach(p => { map[p.area] = (map[p.area] || 0) + 1; });
    return Object.entries(map).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
  })(),
  processosPorStatus: [
    { name: 'Ativo', value: mockActusProcesses.filter(p => p.status === 'Ativo').length, color: 'hsl(217.2, 91.2%, 59.8%)' },
    { name: 'Arquivado', value: mockActusProcesses.filter(p => p.status === 'Arquivado').length, color: 'hsl(240, 5%, 50%)' },
    { name: 'Suspenso', value: mockActusProcesses.filter(p => p.status === 'Suspenso').length, color: 'hsl(38, 92%, 50%)' },
  ],
};
