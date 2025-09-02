const { Router } = require('express');
const ctrl = require('../controllers/agendamentosController');

const r = Router();
r.get('/',    ctrl.list);
r.get('/:id', ctrl.get);
r.post('/',   ctrl.create);
r.put('/:id', ctrl.update);
r.delete('/:id', ctrl.remove);

module.exports = r;
