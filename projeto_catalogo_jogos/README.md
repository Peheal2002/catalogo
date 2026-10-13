# Catálogo de Jogos — Django REST + React

Projeto desenvolvido para a atividade de Desenvolvimento de Software para WEB.

## Tecnologias
- Backend: Python, Django, Django REST Framework, django-cors-headers, SQLite
- Frontend: ReactJS + Vite
- Comunicação: HTTP/JSON

## Requisitos atendidos

### API Django
- Model `Jogo` com 5 campos além do ID automático.
- `disponivel` é `BooleanField`.
- GET: `GET /api/jogos/`
- GET por ID: `GET /api/jogos/1/`
- POST: `POST /api/jogos/`
- DELETE: `DELETE /api/jogos/1/`
- Pesquisa: `GET /api/jogos/?nome=mario`
- Persistência em SQLite.

### React
- Componentes separados.
- `useState`.
- `useEffect`.
- `fetch`.
- `map` para renderizar a lista.
- Renderização condicional.
- Pesquisa.
- Cadastro.
- Exclusão com confirmação.
- Atualização do estado sem `window.location.reload()`.
- Contagem total de registros.
- Loading com `Carregando...`.
- Mensagem `Nenhum item cadastrado.`.
- Tratamento amigável de erro.
- Validação de campos obrigatórios.
- Ordenação por título e ano.

## Como executar

### 1. Backend

Entre na pasta:

```bash
cd backend
```

Crie e ative um ambiente virtual:

Linux/macOS:
```bash
python3 -m venv venv
source venv/bin/activate
```

Windows:
```bash
python -m venv venv
venv\Scripts\activate
```

Instale as dependências:

```bash
pip install -r requirements.txt
```

Aplique as migrações:

```bash
python manage.py migrate
```

Inicie a API:

```bash
python manage.py runserver
```

API:
`http://127.0.0.1:8000/api/jogos/`

### 2. Frontend

Abra outro terminal:

```bash
cd frontend
npm install
npm run dev
```

Abra o endereço mostrado pelo Vite, normalmente:
`http://localhost:5173`

## Teste rápido da API

GET:
```bash
curl http://127.0.0.1:8000/api/jogos/
```

Pesquisa:
```bash
curl "http://127.0.0.1:8000/api/jogos/?nome=mario"
```

POST:
```bash
curl -X POST http://127.0.0.1:8000/api/jogos/ \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Mario Kart 8 Deluxe","genero":"Corrida","plataforma":"Nintendo Switch","ano_lancamento":2017,"disponivel":true}'
```

DELETE:
```bash
curl -X DELETE http://127.0.0.1:8000/api/jogos/1/
```

## Estrutura

```text
projeto_catalogo_jogos/
├── backend/
│   ├── manage.py
│   ├── requirements.txt
│   ├── catalogo/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── asgi.py
│   │   └── wsgi.py
│   └── jogos/
│       ├── admin.py
│       ├── apps.py
│       ├── models.py
│       ├── serializers.py
│       ├── urls.py
│       ├── views.py
│       └── migrations/
└── frontend/
    ├── package.json
    ├── vite.config.js
    ├── index.html
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── App.css
        └── components/
            ├── BarraPesquisa.jsx
            ├── FormularioJogo.jsx
            ├── ListaJogos.jsx
            └── JogoCard.jsx
```

## Observação para a apresentação

Uma alteração rápida que pode ser feita em poucos minutos é adicionar um campo ou mudar o texto exibido em `JogoCard.jsx`. Outra alteração simples é trocar a ordenação para outro campo.

O projeto não usa `window.location.reload()`: depois de POST e DELETE, o React atualiza a lista por meio do estado.
