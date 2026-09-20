# 🤖 AgentMD Studio — Criador de Agentes Agênticos Full-Stack

Plataforma completa para geração, customização, auditoria e exportação de especificações Markdown (`.md`) para novos agentes e ecossistemas agênticos.

Desenvolvida com base rigorosa nas diretrizes do [Guia Universal de Desenvolvimento Agêntico Full-Stack Multi-Stack](file:///c:/Users/lenovo/Desktop/projetoscopilot/criadorDeAgentes/Guia_Universal_Desenvolvimento_Agentico_FullStack_Estruturas_Dados.md).

---

## 🚀 Como Executar

### 1. Iniciar a Interface Web Completa (Recomendado)
A plataforma possui uma interface gráfica moderna (React + Tailwind CSS + Lucide Icons) com editor interativo, catálogo de agentes, relatório de compliance em tempo real e visualizador de Markdown com cálculo de tokens.

```bash
# Iniciar o servidor integrado (serve o frontend e a API de salvamento direto)
npm start
```
Acesse no seu navegador: **http://localhost:3001**

Ou, se preferir o ambiente de desenvolvimento Vite com hot-reload:
```bash
npm run dev
```
Acesse: **http://localhost:5173**

---

### 2. Geração via Linha de Comando (CLI)
Você também pode gerar toda a estrutura de especificações diretamente pelo terminal sem abrir o navegador:

```bash
npm run generate -- --project "SaaSFinanceiro" --domain "Banking & Pagamentos" --stack "python" --out "output-agents"
```

Parâmetros suportados:
- `--project`: Nome do projeto (ex: `MeuApp`)
- `--domain`: Domínio de negócio (ex: `Logística e Entregas`)
- `--stack`: Stack técnica (`typescript`, `python`, `java`, `dotnet`)
- `--out`: Diretório de destino (padrão: `output-agents`)

---

### 3. Rodar os Testes Automatizados
```bash
npm test
```
Verifica a integridade dos templates, a geração de frontmatter YAML, os guardrails de menor privilégio e a montagem completa dos 31 arquivos do ecossistema.

---

## 🧩 O que a Plataforma Gera

Ao gerar o ecossistema para um projeto, a plataforma cria a seguinte estrutura pronta para uso:

```txt
[SEU_PROJETO]/
├── CLAUDE.md                             ← Instruções raiz, regras invioláveis e DoD
├── docs/
│   └── specs/
│       ├── main.md                       ← Visão, problema, escopo e métricas
│       ├── architecture.md               ← Clean Architecture e containers da stack
│       └── domain.md                     ← Linguagem ubíqua, entidades e invariantes
├── .claude/
│   ├── agents/                           ← 12 Sub-agentes com ferramentas e checklists
│   │   ├── backend.md                    ← Especialista backend adaptado à stack
│   │   ├── frontend.md                   ← Especialista frontend UI/UX e a11y
│   │   ├── security-reviewer.md          ← Revisor de vulnerabilidades e OWASP
│   │   ├── code-reviewer.md              ← Revisor de Clean Code e SOLID
│   │   ├── architect.md                  ← Arquiteto de sistemas e governança
│   │   ├── database.md                   ← Especialista em migrations e índices
│   │   ├── researcher.md                 ← Pesquisador de contexto (fase RESEARCH)
│   │   ├── test-engineer.md              ← Especialista em QA e pirâmide de testes
│   │   ├── devops.md                     ← Especialista em Docker, CI/CD e secrets
│   │   ├── accessibility-reviewer.md     ← Revisor WCAG 2.1 AA
│   │   ├── documentation-writer.md       ← Redator técnico de specs e SDD
│   │   └── data-structures-specialist.md ← Big-O, complexidade e coleções (Seção 19)
│   ├── rules/                            ← 11 Regras invioláveis versionadas
│   │   ├── agent-security.md
│   │   ├── dependency-security.md
│   │   ├── information-security.md
│   │   ├── authentication-security.md
│   │   ├── authorization-security.md
│   │   ├── input-validation.md
│   │   ├── no-injection.md
│   │   ├── clean-code.md
│   │   ├── solid.md
│   │   ├── data-structures-performance.md
│   │   └── task-report.md
│   └── skills/                           ← 4 Skills operacionais
│       ├── graphify-context/SKILL.md     ← Consulta ao grafo de conhecimento
│       ├── task-report/SKILL.md          ← Relatório de conclusão de task
│       ├── secure-feature-implementation/SKILL.md
│       └── db-migration-safe/SKILL.md
```

---

## 🛡️ Alinhamento com o Guia Universal

1. **Princípio do Menor Privilégio (Seção 2):** O validador integrado alerta caso um agente revisor possua ferramentas de escrita (`Write`, `Edit`).
2. **Workflow RPI (Seção 4):** Todo agente gerado tem fases explícitas de Research, Plan e Implement.
3. **Multi-Stack Suportada (Seção 1 & 9):**
   - **Variante A (Java):** Spring Boot 3, JPA, Flyway, Records, Virtual Threads.
   - **Variante B (Python):** FastAPI/Flask, SQLAlchemy 2.0, Pydantic v2, Alembic.
   - **Variante C (.NET):** ASP.NET Core, EF Core, Records, C# moderno.
   - **Variante D (TypeScript):** NestJS, Next.js, Prisma/TypeORM, Zod.
4. **Análise Algorítmica e Big-O (Seção 19):** Inclui o especialista dedicado e diretrizes obrigatórias de escolha de coleções (Marcello La Rocca).
5. **Memória Persistente com Graphify (Seção 20):** Instruções nativas para inicialização e atualização do grafo de conhecimento.
