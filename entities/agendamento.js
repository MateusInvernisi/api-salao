const { z } = require('zod');

const ServicoEnum = z.enum(['manicure','pedicure','unhas_gel','fibra_vidro','blindagem','spa_pes']);
const StatusEnum  = z.enum(['agendado','confirmado','em_atendimento','concluido','cancelado']);

const telefoneBR = z.string().regex(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, 'Telefone inválido');
const horaHHMM   = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Hora deve ser HH:MM');
const dataISO    = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Data deve ser YYYY-MM-DD');

const AgendamentoCreateSchema = z.object({
  cliente_nome: z.string().min(2).max(60),
  cliente_telefone: telefoneBR,
  servico: ServicoEnum,
  data: dataISO,
  hora_inicio: horaHHMM,
  duracao_min: z.number().int().min(15),
  preco: z.number().nonnegative().optional(),
  status: StatusEnum,
  observacoes: z.string().optional()
});

const AgendamentoUpdateSchema = AgendamentoCreateSchema.partial();

module.exports = {
  ServicoEnum, StatusEnum,
  AgendamentoCreateSchema, AgendamentoUpdateSchema
};
