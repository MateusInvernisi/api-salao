const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { PORT } = require('./config');

const agendamentosRoutes = require('./routes/agendamentosRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.use('/v1/agendamentos', require('./routes/agendamentosRoutes'));

// 404
app.use((_req, res) => res.status(404).json({ code: 'NOT_FOUND', message: 'Rota não encontrada' }));

// Error handler (simples)
app.use((err, _req, res, _next) => {
  console.error(err);
  return res.status(500).json({ code: 'SERVER_ERROR', message: 'Erro interno' });
});

app.listen(PORT, () => console.log(`API rodando em http://localhost:${PORT}`));
