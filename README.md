    # API Salão – Agenda (v1)

API REST para gerenciar **agendamentos** de um salão de manicure/pedicure.

## 🎯 Objetivo
Gerenciar o ciclo de vida do agendamento: criar, listar (com filtros/paginação), detalhar, atualizar e excluir (com regra de negócio).

## 🧩 Arquitetura
Rotas versionadas em `/v1`, camadas:
- **routes** → **controllers** → **useCases (service)** → **entities (schemas)**
- Respostas **sempre em JSON**, erros no formato `{ code, message, details? }`.

## 🚀 Rodando
```bash
npm i
npm run dev   # se tiver nodemon
# ou
node index.js
