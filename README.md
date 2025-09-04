# API Salão – Agenda (v1)

API REST para gerenciar **agendamentos** de um salão de manicure/pedicure.

## 📌 Cenário (motivação)

O salão de manicure/pedicure precisa centralizar os **agendamentos** em um backend único para sincronizar dados entre:

* o app interno de balcão (recepção),
* um site simples (consulta de horários),
* futuras integrações com WhatsApp (confirmação/lembrete).

Uma **API REST** padroniza esse acesso (HTTP + JSON) e permite múltiplos clientes consumirem os mesmos dados.

## 🎯 Objetivo da API

Gerenciar o **ciclo de vida dos agendamentos**: criar, listar com filtros/paginação, detalhar, atualizar (reagendar/precificar/status) e excluir (com regra de negócio).
Todas as respostas são **JSON**, inclusive erros.

---

## 🧩 Arquitetura & Padrões

* **Versionamento de rotas:** prefixo **`/v1`** (facilita evolução sem quebrar clientes antigos).

* **Persistência nesta etapa:** armazenamento **em memória** (foco na API e arquitetura).

---

## 🧱 Stack tecnológica

* **Node.js** + **Express**
* **Zod** para validação de entrada
* **morgan**/**cors** utilitários

---

## 🚀 Como rodar localmente

```bash
# 1) Instale dependências
npm i

# 2) Suba o servidor (com nodemon, se configurado)
npm run dev
# ou
node index.js
```
Servidor por padrão em: **[http://localhost:3000](http://localhost:3000)**
Healthcheck: **GET `/health`** → `{"status":"ok"}`

---

## 🔗 Endpoints (v1)

| Método | Caminho                 | Descrição                                                               |
| -----: | ----------------------- | ----------------------------------------------------------------------- |
|   POST | `/v1/agendamentos`      | Criar agendamento                                                       |
|    GET | `/v1/agendamentos`      | Listar (filtros: `data`, `status`, `servico`; paginação `page`, `size`) |
|    GET | `/v1/agendamentos/{id}` | Obter por ID                                                            |
|    PUT | `/v1/agendamentos/{id}` | Atualizar (parcial ou total)                                            |
| DELETE | `/v1/agendamentos/{id}` | Excluir (retorna JSON de confirmação)                                   |

### Esquema básico (Agendamento)

```json
{
  "id": 1,
  "cliente_nome": "Ana Souza",
  "cliente_telefone": "(54) 99999-1234",
  "servico": "manicure",
  "data": "2025-09-03",
  "hora_inicio": "14:00",
  "duracao_min": 60,
  "preco": 70,
  "status": "agendado",
  "observacoes": "Preferência por esmalte nude",
  "created_at": "2025-09-02T12:00:00Z",
  "updated_at": "2025-09-02T12:00:00Z"
}
```

## ⚠️ Validações importantes

* `cliente_telefone` deve casar com a regex brasileira (DDD + número).
* `data` no formato **YYYY-MM-DD**.
* `hora_inicio` no formato **HH\:MM** (24h).
* `duracao_min` **inteiro ≥ 15**.
* `status` ∈ `agendado|confirmado|em_atendimento|concluido|cancelado`.
* Em caso de erro: **400** com `{ code:"VALIDATION_ERROR", ... }`.

---

