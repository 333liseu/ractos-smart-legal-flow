import type { ZapConversation, ZapMessage, StaffMember } from '@/types/actus-zap';

export const mockStaff: StaffMember[] = [
  { id: 'u1', fullName: 'Dr. Wilson Rocha', shortName: 'Wilson', nickname: 'Dr. Wilson', role: 'Sócio' },
  { id: 'u2', fullName: 'Dra. Camila Ferreira', shortName: 'Camila', nickname: 'Dra. Camila', role: 'Associada' },
  { id: 'u3', fullName: 'Marcos Vinícius', shortName: 'Marcos', role: 'Estagiário' },
  { id: 'u4', fullName: 'Juliana Santos', shortName: 'Juliana', role: 'Secretária' },
];

export const mockZapConversations: ZapConversation[] = [
  {
    id: 'zc1', channel_type: 'whatsapp', client_name: 'Ana Beatriz Souza', client_phone: '(11) 99876-5432',
    status: 'in_service', responsible_user_id: 'u1', ai_enabled: true, unread_count: 2,
    last_message_at: new Date().toISOString(), priority: 'high', tags: ['audiência'],
    subject: 'Audiência trabalhista', created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
  },
  {
    id: 'zc2', channel_type: 'whatsapp', client_name: 'Pedro Costa Ferreira', client_phone: '(21) 98765-4321',
    status: 'open', ai_enabled: true, unread_count: 0,
    last_message_at: new Date(Date.now() - 3600000).toISOString(), priority: 'normal', tags: [],
    created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
  },
  {
    id: 'zc3', channel_type: 'whatsapp', client_name: 'Maria Oliveira Lima', client_phone: '(31) 97654-3210',
    status: 'waiting', ai_enabled: false, unread_count: 1, responsible_user_id: 'u2',
    last_message_at: new Date(Date.now() - 7200000).toISOString(), priority: 'normal', tags: ['guia de custas'],
    subject: 'Guia de custas', created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
  },
  {
    id: 'zc4', channel_type: 'whatsapp', client_name: 'Carlos Eduardo Mendes', client_phone: '(41) 96543-2109',
    status: 'open', ai_enabled: true, unread_count: 3,
    last_message_at: new Date(Date.now() - 14400000).toISOString(), priority: 'urgent', tags: ['prazo'],
    subject: 'Prazo de contestação', created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
  },
  {
    id: 'zc5', channel_type: 'whatsapp', client_name: 'Fernanda Almeida', client_phone: '(51) 95432-1098',
    status: 'closed', ai_enabled: false, unread_count: 0,
    last_message_at: new Date(Date.now() - 86400000).toISOString(), priority: 'low', tags: [],
    created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
  },
];

export const mockZapMessages: Record<string, ZapMessage[]> = {
  zc1: [
    { id: 'm1', conversation_id: 'zc1', sender_type: 'system', content: 'Dr. Wilson assumiu o atendimento', content_type: 'event', is_read: true, created_at: new Date(Date.now() - 600000).toISOString() },
    { id: 'm2', conversation_id: 'zc1', sender_type: 'client', sender_name: 'Ana Beatriz', content: 'Olá! Qual o status do meu processo?', content_type: 'text', is_read: true, created_at: new Date(Date.now() - 500000).toISOString() },
    { id: 'm3', conversation_id: 'zc1', sender_type: 'ai', sender_name: 'Actus IA', content: 'Olá Ana! O processo nº 4001234-56.2024.8.26.0400 está na fase de instrução. A última movimentação foi **Sentença Proferida** em 18/03/2025, com decisão parcialmente favorável no valor de R$ 85.000,00.', content_type: 'text', is_read: true, created_at: new Date(Date.now() - 480000).toISOString() },
    { id: 'm4', conversation_id: 'zc1', sender_type: 'client', sender_name: 'Ana Beatriz', content: 'Isso é bom? O que acontece agora?', content_type: 'text', is_read: false, created_at: new Date(Date.now() - 300000).toISOString() },
    { id: 'm5', conversation_id: 'zc1', sender_type: 'client', sender_name: 'Ana Beatriz', content: 'Preciso falar com Dr. Wilson sobre isso', content_type: 'text', is_read: false, created_at: new Date(Date.now() - 120000).toISOString() },
    { id: 'm6', conversation_id: 'zc1', sender_type: 'system', content: 'Dr. Wilson foi mencionado e notificado', content_type: 'event', is_read: true, created_at: new Date(Date.now() - 60000).toISOString() },
  ],
  zc4: [
    { id: 'm10', conversation_id: 'zc4', sender_type: 'client', sender_name: 'Carlos Eduardo', content: 'Bom dia! Preciso saber sobre o prazo da contestação urgente.', content_type: 'text', is_read: false, created_at: new Date(Date.now() - 14400000).toISOString() },
    { id: 'm11', conversation_id: 'zc4', sender_type: 'ai', sender_name: 'Actus IA', content: 'Bom dia Carlos! Verifiquei e o prazo para contestação vence em **3 dias úteis** (18/04/2026). A Dra. Camila é a responsável pelo caso. Deseja que eu notifique ela?', content_type: 'text', is_read: false, created_at: new Date(Date.now() - 14300000).toISOString() },
    { id: 'm12', conversation_id: 'zc4', sender_type: 'client', sender_name: 'Carlos Eduardo', content: 'Sim, por favor notifique a Dra. Camila', content_type: 'text', is_read: false, created_at: new Date(Date.now() - 14200000).toISOString() },
  ],
};

export const aiSuggestions = [
  'Quantas conversas estão sem resposta há mais de 24h?',
  'Quais clientes mencionaram audiência esta semana?',
  'Mostre as conversas com prioridade urgente',
  'Quantos atendimentos foram assumidos hoje?',
  'Quais funcionários foram mais citados nas conversas?',
  'Resuma a situação desta conversa',
];
