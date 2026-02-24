# 🏥 Health Data Insights – Epidemiological Dashboard

O **Health Data Insights (HDI)** é uma plataforma de análise epidemiológica focada em **visualização, exploração e monitoramento de dados de saúde pública**, com ênfase em doenças de notificação como **Dengue, Chikungunya, Zika, Rotavírus e Coqueluche**.

O projeto integra dados do **DATASUS** (em múltiplos formatos: CSV, JSON, Parquet e XML), normaliza essas informações em um **banco MySQL** e disponibiliza os resultados por meio de uma **API REST em Flask**, consumida por um **frontend em Next.js (React)** para geração de dashboards interativos.

> 🎯 Objetivo principal: eliminar dados hardcoded e permitir análises reais, reprodutíveis e escaláveis sobre dados epidemiológicos brasileiros.

---

## ✨ Principais Funcionalidades

* 📊 Dashboard interativo com:

  * Indicadores (KPIs)
  * Séries temporais
  * Distribuições por idade, sexo, região
  * Mapas e rankings geográficos
* 🦠 Suporte a múltiplas doenças:

  * Dengue
  * Chikungunya
  * Zika
  * Rotavírus
  * Coqueluche
* 📂 Ingestão de dados do DATASUS em:

  * CSV
  * JSON
  * Parquet
  * XML
* 🗄️ Persistência em MySQL com modelo canônico unificado
* 🔌 API REST com filtros por:

  * Doença
  * Período
  * Região
  * Sexo, idade, status, gravidade
* ⚡ Endpoints agregados para gráficos (alta performance)
* 🧩 Extensível para novas doenças e novos layouts de dados

---

## 🏗️ Arquitetura

```
.
├── frontend/        # Next.js (React) - Dashboard
├── backend/         # Flask + SQLAlchemy - API REST
├── ingestion/       # Scripts de ingestão DATASUS (CSV/JSON/Parquet/XML)
├── docker-compose.yml
└── README.md
```

### Stack Tecnológica

**Frontend**

* Next.js (React)
* TypeScript
* Fetch / React Query (ou similar)

**Backend**

* Python 3.10+
* Flask
* Flask-SQLAlchemy
* Flask-Migrate (Alembic)
* Flask-CORS

**Banco de Dados**

* MySQL 8+

**Ingestão de Dados**

* Pandas
* PyArrow (Parquet)
* xmltodict / lxml (XML)

---

## 🗄️ Modelo de Dados (Resumo)

O sistema usa um **modelo híbrido**:

* `diseases` → catálogo de doenças
* `geos` → hierarquia geográfica (país, estado, município, etc.)
* `cases` → registros individuais normalizados (com coluna `extras` em JSON)
* `metrics_daily` → métricas agregadas por dia/doença/região (para gráficos rápidos)

Isso permite:

* Consultas detalhadas (tabela de casos)
* Dashboards rápidos (usando métricas agregadas)
* Flexibilidade para diferentes layouts do DATASUS via `extras`

---

## 🚀 Como Rodar o Projeto (Desenvolvimento)

### Pré-requisitos

* Docker e Docker Compose
  **ou**
* Node.js 18+
* Python 3.10+
* MySQL 8+

---

### 🔧 Subindo com Docker (recomendado)

```bash
docker-compose up --build
```

Serviços:

* Frontend: [http://localhost:3000](http://localhost:3000)
* Backend (API): [http://localhost:5000](http://localhost:5000)
* MySQL: localhost:3306

---

### 🐍 Backend (Flask)

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # ou .venv\Scripts\activate no Windows
pip install -r requirements.txt

export DATABASE_URL="mysql+pymysql://user:pass@localhost:3306/hdi"
flask db upgrade
flask run
```

---

### ⚛️ Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

Configure a variável de ambiente:

```bash
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

## 📥 Ingestão de Dados do DATASUS

Os dados do DATASUS podem ser fornecidos em:

* CSV
* JSON
* Parquet
* XML

Existe um script de ingestão que:

1. Lê o arquivo (independente do formato)
2. Normaliza os campos para o modelo canônico
3. Insere/atualiza a tabela `cases`
4. Atualiza a tabela `metrics_daily`

Exemplo:

```bash
python ingestion/ingest.py \
  --disease dengue \
  --source datasus_sinan \
  --file dados_dengue_2025.csv
```

---

## 🔌 API REST (Exemplos)

### Listar doenças

```
GET /api/diseases
```

### Detalhe de uma doença

```
GET /api/diseases/dengue
```

### Listar casos com filtros

```
GET /api/cases?disease=dengue&date_from=2025-01-01&date_to=2025-03-31&geo=120020
```

### Métricas para gráficos

```
GET /api/metrics/cases-over-time?disease=dengue&geo=120020
```

---

## 🧠 Filosofia do Projeto

* ❌ Sem dados hardcoded no frontend
* ✅ Toda informação vem da API
* 📈 Métricas agregadas para performance
* 🧩 Extensível para novas doenças e novos layouts
* 🔍 Transparência e reprodutibilidade dos dados

---

## 🛡️ Aviso Importante

Este projeto é para **análise epidemiológica e pesquisa**.
Dados sensíveis devem ser:

* Anonimizados
* Tratados conforme LGPD
* Usados apenas em ambientes autorizados

---

## 📌 Roadmap

* [x] Remover hardcode do frontend
* [x] API REST unificada
* [x] Ingestão multi-formato (CSV/JSON/Parquet/XML)
* [ ] Dashboard com mapas interativos
* [ ] Cache de métricas agregadas
* [ ] Autenticação e controle de acesso
* [ ] Pipeline automatizado de atualização de dados

---

## 🤝 Contribuição

Contribuições são bem-vindas!
Abra uma issue ou envie um pull request com:

* Correções
* Melhorias de performance
* Novas visualizações
* Novos conectores de dados

---

## 📄 Licença

Defina aqui a licença do projeto (ex: MIT, Apache 2.0, GPL, etc).

---

Se você quiser, no próximo passo eu já sigo com:

* 📁 Estrutura inicial do `backend/`
* 🗄️ Models SQLAlchemy + migrations
* 🌱 Seeds das doenças
* 🔁 Script de ingestão para seus arquivos DATASUS
