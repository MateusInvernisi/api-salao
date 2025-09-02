let seq = 1;
const store = []; // armazenamento em memória

const list = (filters = {}, page = 1, size = 10) => {
  let data = [...store];
  if (filters.data)    data = data.filter(a => a.data === filters.data);
  if (filters.status)  data = data.filter(a => a.status === filters.status);
  if (filters.servico) data = data.filter(a => a.servico === filters.servico);
  const total = data.length;
  const start = (page - 1) * size;
  const pageData = data.slice(start, start + size);
  return { total, data: pageData };
};

const get = (id) => store.find(a => a.id === id) || null;

const create = (dto) => {
  const now = new Date().toISOString();
  const item = { id: seq++, created_at: now, updated_at: now, ...dto };
  store.push(item);
  return item;
};

const update = (id, patch) => {
  const idx = store.findIndex(a => a.id === id);
  if (idx < 0) return null;
  store[idx] = { ...store[idx], ...patch, updated_at: new Date().toISOString() };
  return store[idx];
};

const remove = (id) => {
  const idx = store.findIndex(a => a.id === id);
  if (idx < 0) return false;

  if (['em_atendimento','concluido'].includes(store[idx].status)) {
    const err = new Error('Não é permitido excluir neste status.');
    err.code = 'BUSINESS_RULE';
    throw err;
  }
  store.splice(idx, 1);
  return true;
};

module.exports = { list, get, create, update, remove };
