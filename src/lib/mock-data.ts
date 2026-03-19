// Mock data for the Ractos One platform

export interface Client {
  id: string;
  name: string;
  document: string; // CPF or CNPJ
  type: 'PF' | 'PJ';
  email: string;
  phone: string;
  city: string;
  state: string;
  responsible: string;
  casesCount: number;
  createdAt: string;
}

export interface Case {
  id: string;
  number: string; // CNJ format
  title: string;
  court: string;
  instance: string;
  subject: string;
  client: string;
  clientId: string;
  lawyer: string;
  status: 'Em andamento' | 'Arquivado' | 'Suspenso' | 'Encerrado';
  phase: string;
  priority: 'Alta' | 'Média' | 'Baixa';
  riskLevel: 'Alto' | 'Médio' | 'Baixo';
  value: number;
  distributionDate: string;
  lastUpdate: string;
  area: string;
}

export interface Movement {
  id: string;
  caseId: string;
  caseNumber: string;
  date: string;
  title: string;
  originalText: string;
  aiSummary: string;
  impact: 'Alto' | 'Médio' | 'Baixo';
  suggestedAction: string;
  deadline?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  caseNumber?: string;
  client?: string;
  responsible: string;
  priority: 'Alta' | 'Média' | 'Baixa';
  status: 'Pendente' | 'Em andamento' | 'Concluída';
  dueDate: string;
  createdAt: string;
}

export const mockClients: Client[] = [
  { id: '1', name: 'Ana Beatriz Souza', document: '123.456.789-00', type: 'PF', email: 'ana@email.com', phone: '(11) 99999-0001', city: 'Ribeirão Preto', state: 'SP', responsible: 'Dr. Carlos', casesCount: 3, createdAt: '2024-01-15' },
  { id: '2', name: 'Consórcio Nacional Ltda.', document: '12.345.678/0001-90', type: 'PJ', email: 'juridico@consorcio.com', phone: '(11) 3333-4444', city: 'São Paulo', state: 'SP', responsible: 'Dra. Marina', casesCount: 5, createdAt: '2023-08-20' },
  { id: '3', name: 'Luís Fernando Silva', document: '987.654.321-00', type: 'PF', email: 'luis@email.com', phone: '(11) 98888-7777', city: 'Guarulhos', state: 'SP', responsible: 'Dr. Ricardo', casesCount: 2, createdAt: '2024-03-10' },
  { id: '4', name: 'Pedro Costa Ferreira', document: '456.789.123-00', type: 'PF', email: 'pedro@email.com', phone: '(13) 97777-6666', city: 'Santos', state: 'SP', responsible: 'Dr. Carlos', casesCount: 1, createdAt: '2024-05-22' },
  { id: '5', name: 'Financeira XYZ Ltda.', document: '98.765.432/0001-10', type: 'PJ', email: 'contato@xyz.com', phone: '(19) 3322-1100', city: 'Campinas', state: 'SP', responsible: 'Dra. Marina', casesCount: 4, createdAt: '2023-11-05' },
  { id: '6', name: 'Maria Oliveira Lima', document: '321.654.987-00', type: 'PF', email: 'maria@email.com', phone: '(21) 96666-5555', city: 'Rio de Janeiro', state: 'RJ', responsible: 'Dr. Ricardo', casesCount: 2, createdAt: '2024-02-18' },
  { id: '7', name: 'TechSolutions S.A.', document: '11.222.333/0001-44', type: 'PJ', email: 'legal@tech.com', phone: '(11) 2222-3333', city: 'São Paulo', state: 'SP', responsible: 'Dr. Carlos', casesCount: 7, createdAt: '2023-06-30' },
  { id: '8', name: 'Carlos Eduardo Mendes', document: '654.321.987-00', type: 'PF', email: 'carlos.m@email.com', phone: '(31) 95555-4444', city: 'Belo Horizonte', state: 'MG', responsible: 'Dra. Marina', casesCount: 1, createdAt: '2024-07-12' },
];

export const mockCases: Case[] = [
  { id: '1', number: '4001234-56.2024.8.26.0400', title: 'Ana Beatriz Souza x Consórcio Nacional Ltda.', court: 'TJSP', instance: '1ª Instância', subject: 'Cobrança Contratual', client: 'Ana Beatriz Souza', clientId: '1', lawyer: 'Dr. Carlos', status: 'Em andamento', phase: 'Instrução', priority: 'Alta', riskLevel: 'Médio', value: 85000, distributionDate: '2024-02-15', lastUpdate: '2025-03-18', area: 'Cível' },
  { id: '2', number: '6001234-56.2024.8.26.0600', title: 'Luís Fernando Silva x Prefeitura Municipal de Guarulhos', court: 'TJSP', instance: '1ª Instância', subject: 'Ação Trabalhista', client: 'Luís Fernando Silva', clientId: '3', lawyer: 'Dr. Ricardo', status: 'Em andamento', phase: 'Conhecimento', priority: 'Média', riskLevel: 'Baixo', value: 45000, distributionDate: '2024-03-20', lastUpdate: '2025-03-15', area: 'Trabalhista' },
  { id: '3', number: '3001234-56.2024.8.26.0300', title: 'Pedro Costa Ferreira x Ana Santos Silva', court: 'TJSP', instance: '2ª Instância', subject: 'Indenização por Danos', client: 'Pedro Costa Ferreira', clientId: '4', lawyer: 'Dr. Carlos', status: 'Em andamento', phase: 'Recursal', priority: 'Alta', riskLevel: 'Alto', value: 150000, distributionDate: '2024-01-10', lastUpdate: '2025-03-17', area: 'Cível' },
  { id: '4', number: '2001234-56.2024.8.26.0200', title: 'Financeira XYZ Ltda. x Maria Oliveira Lima', court: 'TJSP', instance: '1ª Instância', subject: 'Execução Fiscal', client: 'Financeira XYZ Ltda.', clientId: '5', lawyer: 'Dra. Marina', status: 'Suspenso', phase: 'Execução', priority: 'Baixa', riskLevel: 'Baixo', value: 32000, distributionDate: '2024-04-05', lastUpdate: '2025-02-28', area: 'Tributário' },
  { id: '5', number: '5001234-56.2024.8.26.0500', title: 'Carlos Eduardo Mendes x Empresa de Telecomunicações S.A.', court: 'TJMG', instance: '1ª Instância', subject: 'Consumidor', client: 'Carlos Eduardo Mendes', clientId: '8', lawyer: 'Dra. Marina', status: 'Em andamento', phase: 'Sentença', priority: 'Média', riskLevel: 'Médio', value: 25000, distributionDate: '2024-05-18', lastUpdate: '2025-03-10', area: 'Consumidor' },
  { id: '6', number: '7001234-56.2024.8.26.0700', title: 'TechSolutions S.A. x Fazenda Nacional', court: 'TRF3', instance: '2ª Instância', subject: 'Mandado de Segurança', client: 'TechSolutions S.A.', clientId: '7', lawyer: 'Dr. Ricardo', status: 'Em andamento', phase: 'Recursal', priority: 'Alta', riskLevel: 'Alto', value: 520000, distributionDate: '2023-11-20', lastUpdate: '2025-03-19', area: 'Tributário' },
  { id: '7', number: '8001234-56.2023.8.26.0800', title: 'Consórcio Nacional Ltda. x Banco Alpha S.A.', court: 'TJSP', instance: '1ª Instância', subject: 'Revisão Contratual', client: 'Consórcio Nacional Ltda.', clientId: '2', lawyer: 'Dr. Carlos', status: 'Arquivado', phase: 'Trânsito em Julgado', priority: 'Baixa', riskLevel: 'Baixo', value: 180000, distributionDate: '2023-06-15', lastUpdate: '2025-01-20', area: 'Cível' },
  { id: '8', number: '9001234-56.2024.8.26.0900', title: 'Maria Oliveira Lima x Seguros Nacional Ltda.', court: 'TJRJ', instance: '1ª Instância', subject: 'Seguro', client: 'Maria Oliveira Lima', clientId: '6', lawyer: 'Dra. Marina', status: 'Em andamento', phase: 'Instrução', priority: 'Média', riskLevel: 'Médio', value: 95000, distributionDate: '2024-06-01', lastUpdate: '2025-03-16', area: 'Cível' },
];

export const mockMovements: Movement[] = [
  { id: '1', caseId: '1', caseNumber: '4001234-56.2024.8.26.0400', date: '2025-03-18', title: 'Sentença Proferida', originalText: 'Vistos. Trata-se de ação de cobrança contratual movida por ANA BEATRIZ SOUZA em face de CONSÓRCIO NACIONAL LTDA. Considerando os documentos acostados e a prova pericial realizada, JULGO PARCIALMENTE PROCEDENTE o pedido para condenar a ré ao pagamento de R$ 85.000,00 (oitenta e cinco mil reais), corrigidos desde a data do vencimento...', aiSummary: 'Juiz decidiu parcialmente a favor da autora. Condenação de R$ 85 mil para a ré. Prazo de 15 dias para recurso da parte contrária.', impact: 'Alto', suggestedAction: 'Interpor Recurso de Apelação', deadline: '2025-04-02' },
  { id: '2', caseId: '3', caseNumber: '3001234-56.2024.8.26.0300', date: '2025-03-17', title: 'Juntada de Contestação', originalText: 'Certifico que foi juntada a contestação apresentada pela parte ré ANA SANTOS SILVA, com documentos de fls. 45/78, requerendo a improcedência total dos pedidos autorais...', aiSummary: 'A parte ré apresentou sua defesa com documentos. Pede que o juiz negue todos os pedidos do autor. Próximo passo: aguardar decisão do juiz sobre a defesa.', impact: 'Médio', suggestedAction: 'Preparar Réplica à Contestação', deadline: '2025-03-31' },
  { id: '3', caseId: '6', caseNumber: '7001234-56.2024.8.26.0700', date: '2025-03-19', title: 'Acórdão Publicado', originalText: 'ACÓRDÃO. Vistos, relatados e discutidos estes autos de Mandado de Segurança, acordam os Desembargadores da 3ª Turma do TRF da 3ª Região, por unanimidade, NEGAR PROVIMENTO ao recurso da impetrante...', aiSummary: 'O tribunal decidiu por unanimidade contra a empresa. O mandado de segurança foi negado. É possível recorrer ao STJ ou STF.', impact: 'Alto', suggestedAction: 'Avaliar Recurso Especial ao STJ', deadline: '2025-04-03' },
  { id: '4', caseId: '2', caseNumber: '6001234-56.2024.8.26.0600', date: '2025-03-15', title: 'Audiência Designada', originalText: 'Designo audiência de instrução e julgamento para o dia 15/04/2025, às 14h00, na sala de audiências 3 do Fórum de Guarulhos...', aiSummary: 'Audiência marcada para 15 de abril às 14h no Fórum de Guarulhos. Preparar testemunhas e documentos.', impact: 'Médio', suggestedAction: 'Preparar para Audiência', deadline: '2025-04-15' },
  { id: '5', caseId: '5', caseNumber: '5001234-56.2024.8.26.0500', date: '2025-03-10', title: 'Despacho Ordinatório', originalText: 'Intime-se a parte autora para manifestação sobre os documentos juntados pela ré no prazo de 15 (quinze) dias...', aiSummary: 'Juiz solicita que a parte autora se manifeste sobre documentos da ré em 15 dias.', impact: 'Baixo', suggestedAction: 'Preparar Manifestação', deadline: '2025-03-25' },
  { id: '6', caseId: '8', caseNumber: '9001234-56.2024.8.26.0900', date: '2025-03-16', title: 'Perícia Designada', originalText: 'Defiro a produção de prova pericial. Nomeio o perito Dr. João Batista Santos. Intimem-se as partes para apresentação de quesitos no prazo de 10 dias...', aiSummary: 'Perito nomeado para avaliar o caso. As partes têm 10 dias para enviar perguntas ao perito.', impact: 'Médio', suggestedAction: 'Elaborar Quesitos Periciais', deadline: '2025-03-26' },
];

export const mockTasks: Task[] = [
  { id: '1', title: 'Interpor Recurso de Apelação', description: 'Preparar e protocolar recurso de apelação contra sentença parcialmente procedente', caseNumber: '4001234-56.2024.8.26.0400', client: 'Ana Beatriz Souza', responsible: 'Dr. Carlos', priority: 'Alta', status: 'Pendente', dueDate: '2025-04-02', createdAt: '2025-03-18' },
  { id: '2', title: 'Preparar Réplica à Contestação', description: 'Elaborar réplica com análise dos documentos apresentados pela ré', caseNumber: '3001234-56.2024.8.26.0300', client: 'Pedro Costa Ferreira', responsible: 'Dr. Carlos', priority: 'Alta', status: 'Em andamento', dueDate: '2025-03-31', createdAt: '2025-03-17' },
  { id: '3', title: 'Preparar para Audiência', description: 'Reunir documentos e preparar testemunhas para audiência de instrução', caseNumber: '6001234-56.2024.8.26.0600', client: 'Luís Fernando Silva', responsible: 'Dr. Ricardo', priority: 'Média', status: 'Pendente', dueDate: '2025-04-15', createdAt: '2025-03-15' },
  { id: '4', title: 'Avaliar Recurso Especial ao STJ', description: 'Analisar viabilidade de recurso especial após acórdão desfavorável', caseNumber: '7001234-56.2024.8.26.0700', client: 'TechSolutions S.A.', responsible: 'Dr. Ricardo', priority: 'Alta', status: 'Pendente', dueDate: '2025-04-03', createdAt: '2025-03-19' },
  { id: '5', title: 'Elaborar Quesitos Periciais', description: 'Preparar lista de quesitos para o perito nomeado', caseNumber: '9001234-56.2024.8.26.0900', client: 'Maria Oliveira Lima', responsible: 'Dra. Marina', priority: 'Média', status: 'Pendente', dueDate: '2025-03-26', createdAt: '2025-03-16' },
  { id: '6', title: 'Preparar Manifestação', description: 'Analisar documentos da ré e preparar manifestação', caseNumber: '5001234-56.2024.8.26.0500', client: 'Carlos Eduardo Mendes', responsible: 'Dra. Marina', priority: 'Baixa', status: 'Concluída', dueDate: '2025-03-25', createdAt: '2025-03-10' },
  { id: '7', title: 'Revisar contrato Financeira XYZ', description: 'Revisão completa do contrato de honorários', client: 'Financeira XYZ Ltda.', responsible: 'Dra. Marina', priority: 'Baixa', status: 'Concluída', dueDate: '2025-03-20', createdAt: '2025-03-05' },
  { id: '8', title: 'Contato com perito', description: 'Agendar reunião com perito nomeado', caseNumber: '9001234-56.2024.8.26.0900', client: 'Maria Oliveira Lima', responsible: 'Dra. Marina', priority: 'Média', status: 'Em andamento', dueDate: '2025-03-28', createdAt: '2025-03-18' },
];

export const dashboardStats = {
  activeCases: 6,
  totalClients: 8,
  pendingTasks: 5,
  overdueTasks: 1,
  totalRevenue: 1250000,
  pendingRevenue: 380000,
  casesByStatus: [
    { name: 'Em andamento', value: 5, color: 'hsl(217.2, 91.2%, 59.8%)' },
    { name: 'Suspenso', value: 1, color: 'hsl(38, 92%, 50%)' },
    { name: 'Arquivado', value: 1, color: 'hsl(240, 5%, 64.9%)' },
    { name: 'Encerrado', value: 1, color: 'hsl(142, 71%, 45%)' },
  ],
  casesByArea: [
    { name: 'Cível', value: 4 },
    { name: 'Trabalhista', value: 1 },
    { name: 'Tributário', value: 2 },
    { name: 'Consumidor', value: 1 },
  ],
};
