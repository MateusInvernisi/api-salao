const { AgendamentoCreateSchema, AgendamentoUpdateSchema } = require('../entities/agendamento');
const service = require('../useCases/agendamentosUseCases');

const ok  = (res, data, status=200) => res.status(status).json(data);
const err = (res, e) => {
  const code = e.code || 'SERVER_ERROR';
  const status = code === 'NOT_FOUND' ? 404 :
                 code === 'VALIDATION_ERROR' ? 400 :
                 code === 'BUSINESS_RULE' ? 400 : 500;
  return res.status(status).json({ code, message: e.message || 'Erro interno', details: e.details });
};

const list = (req, res) => {
  try {
    const { data, status, servico, page='1', size='10' } = req.query;
    const p = Math.max(parseInt(page,10)||1,1);
    const s = Math.min(Math.max(parseInt(size,10)||10,1),100);
    const resp = service.list({ data, status, servico }, p, s);
    return ok(res, { page: p, size: s, total: resp.total, data: resp.data });
  } catch (e) { return err(res, e); }
};

const get = (req, res) => {
  try {
    const id = Number(req.params.id);
    const found = service.get(id);
    if (!found) { const e = new Error('Agendamento não encontrado'); e.code='NOT_FOUND'; throw e; }
    return ok(res, found);
  } catch (e) { return err(res, e); }
};

const create = (req, res) => {
  try {
    const parsed = AgendamentoCreateSchema.safeParse(req.body);
    if (!parsed.success) {
      const e = new Error('Erro de validação'); e.code='VALIDATION_ERROR';
      e.details = parsed.error.issues.map(i => i.message); throw e;
    }
    return ok(res, service.create(parsed.data), 201);
  } catch (e) { return err(res, e); }
};

const update = (req, res) => {
  try {
    const parsed = AgendamentoUpdateSchema.safeParse(req.body);
    if (!parsed.success) {
      const e = new Error('Erro de validação'); e.code='VALIDATION_ERROR';
      e.details = parsed.error.issues.map(i => i.message); throw e;
    }
    const id = Number(req.params.id);
    const updated = service.update(id, parsed.data);
    if (!updated) { const e = new Error('Agendamento não encontrado'); e.code='NOT_FOUND'; throw e; }
    return ok(res, updated);
  } catch (e) { return err(res, e); }
};

const remove = (req, res) => {
  try {
    const id = Number(req.params.id);
    const okRemove = service.remove(id);
    if (!okRemove) { const e = new Error('Agendamento não encontrado'); e.code='NOT_FOUND'; throw e; }
    return res.status(200).json({ code:'OK', message:'Agendamento excluído com sucesso', id });
  } catch (e) { return err(res, e); }
};



module.exports = { list, get, create, update, remove };
