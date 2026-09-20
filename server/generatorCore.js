export const STACKS = {
  typescript: {
    id: 'typescript',
    name: 'Variante D — TypeScript',
    badge: 'NestJS + Next.js / React + Prisma',
    backend: 'NestJS / Node.js LTS',
    frontend: 'Next.js / React',
    database: 'PostgreSQL / MySQL',
    orm: 'Prisma ou TypeORM + Migrations',
    testRunner: 'Vitest / Jest + Playwright',
    guidelines: [
      'Strict mode sempre habilitado no TypeScript.',
      'Proibido o uso de any sem justificativa formal em comentário.',
      'DTOs com validação em tempo de execução usando class-validator ou Zod em todas as fronteiras.',
      'Injeção de dependência nativa do NestJS e isolamento de módulos.',
      'Componentes React funcionais com hooks customizados para regras de UI e Zod para formulários.',
    ]
  },
  python: {
    id: 'python',
    name: 'Variante B — Python',
    badge: 'FastAPI / Flask + React + SQLAlchemy',
    backend: 'FastAPI ou Flask / Python 3.12+',
    frontend: 'React / Vite ou Next.js',
    database: 'PostgreSQL / MySQL',
    orm: 'SQLAlchemy 2.0 + Alembic',
    testRunner: 'pytest + httpx + pytest-asyncio',
    guidelines: [
      'Type hints completos e verificados com mypy ou pyright.',
      'Schemas Pydantic v2 estritos para validação de entrada e saída.',
      'Sessões SQLAlchemy gerenciadas com context managers e transações atômicas.',
      'Async/await consciente para operações I/O bound no FastAPI.',
    ]
  },
  java: {
    id: 'java',
    name: 'Variante A — Java',
    badge: 'Spring Boot 3 / Java 21+ + React + JPA',
    backend: 'Spring Boot 3 / Java 21+ (Virtual Threads)',
    frontend: 'React / Vite ou Next.js',
    database: 'PostgreSQL / MySQL / SQL Server',
    orm: 'Spring Data JPA + Flyway / Liquibase',
    testRunner: 'JUnit 5 + Mockito + Testcontainers',
    guidelines: [
      'Java 21+ com Records para DTOs imutáveis e Pattern Matching.',
      'Spring Security 6 com OAuth2/JWT e stateless sessions.',
      'Separação estrita de Controllers REST, Services e Repositories.',
      'Migrations versionadas estritamente com Flyway ou Liquibase.',
    ]
  },
  dotnet: {
    id: 'dotnet',
    name: 'Variante C — .NET',
    badge: 'ASP.NET Core / C# + React + EF Core',
    backend: 'ASP.NET Core 8/9 / C#',
    frontend: 'React / Vite ou Next.js',
    database: 'SQL Server / PostgreSQL',
    orm: 'Entity Framework Core + Migrations',
    testRunner: 'xUnit + FluentAssertions + Moq',
    guidelines: [
      'C# moderno com records, nullable reference types ativados e pattern matching.',
      'Validação com FluentValidation integrada ao pipeline de requisição.',
      'EF Core com AsNoTracking para queries de leitura e transações explícitas.',
    ]
  }
};

export const UNIVERSAL_AGENTS = [
  {
    id: 'security-reviewer',
    name: 'security-reviewer',
    roleTitle: 'Revisor de Segurança e Vulnerabilidades',
    description: 'Revisor de segurança estrito. Use antes de merge, em mudanças de autenticação, autorização, dados sensíveis, integrações externas, upload, banco, infraestrutura e dependências.',
    model: 'sonnet',
    tools: ['Read', 'Grep', 'Glob', 'Bash'],
    category: 'review',
    beforeCoding: [
      'Identificar todas as fronteiras de entrada de dados e endpoints afetados.',
      'Mapear dados sensíveis, credenciais, tokens e segredos envolvidos.',
      'Verificar permissões e políticas de controle de acesso (RBAC/ABAC).',
      'Consultar regras de segurança em .claude/rules/ e checklist OWASP.',
    ],
    principles: [
      'Zero confiança: nenhuma entrada externa é confiável.',
      'Princípio do menor privilégio em permissões e acessos ao banco.',
      'Defesa em profundidade: validação no frontend não substitui validação estrita no backend.',
      'Segredos e credenciais nunca podem transitar em logs, URLs ou commits.',
    ],
    checklists: [
      {
        category: 'Autenticação & Autorização',
        items: [
          'Autenticação correta e stateless implementada?',
          'Autorização por recurso validada no backend (anti-IDOR/BOLA)?',
          'Tokens JWT com tempo de expiração curto e assinatura criptograficamente segura?',
        ]
      },
      {
        category: 'Injeção & Sanitização',
        items: [
          'Entrada estritamente validada por schemas/DTOs?',
          'Saída devidamente escapada/encodada para o contexto?',
          'SQL/NoSQL/Shell/Template Injection prevenidos com queries parametrizadas?',
          'Uploads com validação de extensão, magic bytes e armazenamento isolado?',
        ]
      }
    ],
    inviolableRules: [
      'Nunca ler, imprimir ou versionar arquivos .env ou segredos reais.',
      'Nunca remover ou relaxar autenticação/autorização para contornar erros de teste ou build.',
      'Nunca permitir interpolação de strings em comandos de shell, queries SQL ou HTML dinâmico.',
      'Nunca expor stack traces ou dados sensíveis em respostas de erro da API.',
    ],
    dataStructureGuidelines: [
      'Garantir que estruturas em memória que guardam tokens sejam expurgadas com TTL.',
      'Evitar alocação de estruturas de dados ilimitadas a partir de parâmetros do usuário (prevenção de DoS).',
    ],
    outputFormatGuidelines: [
      '1. Riscos Críticos (bloqueantes para merge).',
      '2. Riscos Médios (necessitam correção a curto prazo).',
      '3. Riscos Baixos ou Recomendações.',
      '4. Arquivos afetados com linhas específicas.',
      '5. Sugestão de código corrigido.',
    ]
  },
  {
    id: 'code-reviewer',
    name: 'code-reviewer',
    roleTitle: 'Revisor de Qualidade, Clean Code & SOLID',
    description: 'Revisor de qualidade de código, princípios Clean Code, SOLID, manutenibilidade, duplicação e cobertura de testes.',
    model: 'sonnet',
    tools: ['Read', 'Grep', 'Glob', 'Bash'],
    category: 'quality',
    beforeCoding: [
      'Entender o propósito e especificação da funcionalidade.',
      'Mapear código existente para evitar reinvenção de roda ou padrões conflitantes.',
    ],
    principles: [
      'Simplicidade acima da engenharia prematura (KISS & YAGNI).',
      'Funções pequenas, com propósito único e sem efeitos colaterais ocultos.',
      'Nomes descritivos, autoexplicativos e alinhados à linguagem ubíqua do domínio.',
    ],
    checklists: [
      {
        category: 'Clean Code & SOLID',
        items: [
          'Princípio da Responsabilidade Única (SRP) respeitado?',
          'Há duplicação de lógica ou regras de negócio (DRY)?',
          'Testes unitários cobrem caminhos felizes e casos de borda?',
        ]
      }
    ],
    inviolableRules: [
      'Nunca aprovar PR com funções gigantes (> 30-50 linhas) sem divisão lógica.',
      'Nunca ignorar testes comentados ou asserções frouxas.',
    ],
    dataStructureGuidelines: [
      'Substituir buscas lineares repetidas O(n) por estruturas indexadas O(1).',
    ],
    outputFormatGuidelines: [
      'Pontos Fortes da Implementação.',
      'Oportunidades de Refatoração (Clean Code / SOLID).',
      'Análise de Testes e Cobertura.',
      'Veredito: Aprovado / Ajustes Necessários / Bloqueado.',
    ]
  },
  {
    id: 'backend',
    name: 'backend',
    roleTitle: 'Especialista Backend Full-Stack',
    description: 'Especialista no desenvolvimento da camada de backend da stack configurada. Constrói endpoints, use cases, services, DTOs, schemas, validações e testes unitários/integração.',
    model: 'sonnet',
    tools: ['Read', 'Edit', 'Write', 'Bash', 'Grep', 'Glob'],
    category: 'core',
    beforeCoding: [
      'Ler specs em docs/specs/ (main.md, architecture.md, domain.md, security.md).',
      'Consultar regras de backend da stack e convenções existentes no projeto.',
      'Definir plano de implementação RPI (Research -> Plan -> Implement) antes de tocar em arquivos.',
    ],
    principles: [
      'Controllers e rotas estritamente finos: apenas orquestram entrada, saída e status HTTP.',
      'Regras de negócio isoladas no domínio, services ou use cases.',
      'DTOs e Schemas estritos para validar 100% dos dados que cruzam a fronteira externa.',
      'Persistência encapsulada em Repositories, sem queries SQL espalhadas.',
    ],
    checklists: [
      {
        category: 'Arquitetura e Contratos',
        items: [
          'Request validado por schema rigoroso com tipagem estrita?',
          'Response padronizado seguindo o contrato REST/JSON do projeto?',
          'Tratamento global de exceções sem vazamento de stack trace?',
          'Testes unitários e de integração criados e passando?',
        ]
      }
    ],
    inviolableRules: [
      'Nunca colocar lógica de negócio ou queries de banco diretamente nos Controllers.',
      'Nunca devolver entidades de banco diretamente na API sem DTO.',
      'Nunca rodar queries não parametrizadas.',
    ],
    dataStructureGuidelines: [
      'Utilizar Hash Maps / Dictionaries para lookups rápidos em memória O(1).',
      'Implementar paginação por cursor ou offset indexado para evitar carregar tabelas inteiras.',
      'Prevenir o problema de N+1 queries utilizando eager loading / joins explícitos.',
    ],
    outputFormatGuidelines: [
      'Resumo da feature implementada.',
      'Lista de arquivos criados e modificados.',
      'Comandos de teste executados e seus resultados.',
      'Possíveis impactos ou dependências a sincronizar no frontend.',
    ]
  },
  {
    id: 'frontend',
    name: 'frontend',
    roleTitle: 'Especialista Frontend & UI/UX',
    description: 'Especialista na interface web. Desenvolve páginas, componentes reusáveis, hooks, formulários reativos, acessibilidade (a11y), integração com APIs e testes de componentes.',
    model: 'sonnet',
    tools: ['Read', 'Edit', 'Write', 'Bash', 'Grep', 'Glob'],
    category: 'core',
    beforeCoding: [
      'Ler specs em docs/specs/ e contratos em api-contracts.md.',
      'Verificar design system e componentes visuais existentes.',
      'Planejar estado local vs estado compartilhado.',
    ],
    principles: [
      'Componentes pequenos, focados e reutilizáveis com props tipadas explicitamente.',
      'Separação rigorosa entre apresentação visual e comunicação com API.',
      'Validação de formulários no cliente para feedback imediato.',
      'Nunca confiar na interface gráfica para segurança: backend é a autoridade final.',
    ],
    checklists: [
      {
        category: 'UI & Acessibilidade',
        items: [
          'Estados de loading, erro e empty state contemplados?',
          'Componentes acessíveis com tags semânticas e atributos ARIA?',
          'Prevenção de XSS: nenhuma renderização de HTML não sanitizado?',
        ]
      }
    ],
    inviolableRules: [
      'Nunca usar dangerouslySetInnerHTML sem sanitização comprovada via DOMPurify.',
      'Nunca ocultar dados confidenciais apenas com CSS.',
    ],
    dataStructureGuidelines: [
      'Normalizar listas de dados em dicionários id -> entidade para evitar buscas aninhadas O(n²).',
      'Virtualizar listas longas (> 100 itens).',
    ],
    outputFormatGuidelines: [
      'Resumo dos componentes e páginas criados/alterados.',
      'Checklist de validação de acessibilidade e estados da UI.',
      'Instruções de teste.',
    ]
  },
  {
    id: 'architect',
    name: 'architect',
    roleTitle: 'Arquiteto de Software & Engenharia de Sistemas',
    description: 'Guardião da arquitetura, padrões estruturais, limites entre módulos/pacotes, decisões arquiteturais (ADRs) e governança técnica.',
    model: 'sonnet',
    tools: ['Read', 'Grep', 'Glob', 'Bash', 'Edit'],
    category: 'core',
    beforeCoding: [
      'Revisar docs/specs/architecture.md e histórico de ADRs.',
      'Avaliar acoplamento e coesão dos componentes.',
    ],
    principles: [
      'Coesão alta, acoplamento fraco entre domínios e camadas.',
      'Toda decisão de alto impacto documentada em ADR.',
    ],
    checklists: [
      {
        category: 'Governança',
        items: [
          'Limites de contexto respeitados?',
          'Dependência aponta da infraestrutura para o domínio?',
        ]
      }
    ],
    inviolableRules: [
      'Nunca permitir dependências circulares entre módulos.',
    ],
    dataStructureGuidelines: [
      'Modelar domínio rico com Value Objects e Invariantes.',
    ],
    outputFormatGuidelines: [
      'Visão Geral da Decisão Arquitetural.',
      'Trade-offs analisados.',
      'ADR formalizado.',
    ]
  },
  {
    id: 'database',
    name: 'database',
    roleTitle: 'Especialista em Banco de Dados & Migrations',
    description: 'Especialista em modelagem relacional, migrations com zero-downtime, índices, otimização de queries e concorrência.',
    model: 'sonnet',
    tools: ['Read', 'Edit', 'Write', 'Bash', 'Grep'],
    category: 'specialist',
    beforeCoding: [
      'Analisar schema atual, chaves primárias, estrangeiras e índices existentes.',
      'Revisar plano de migração para zero-downtime (expand & contract).',
    ],
    principles: [
      'Toda alteração de schema deve ser idempotente e reversível.',
      'Zero downtime: nunca travar tabelas com operações bloqueantes.',
      'Índices cirúrgicos em chaves estrangeiras.',
    ],
    checklists: [
      {
        category: 'Migrations & Queries',
        items: [
          'Migration reversível com rollback testado?',
          'Chaves estrangeiras possuem índices para evitar table lock?',
          'Sem SELECT * desnecessário em tabelas largas?',
        ]
      }
    ],
    inviolableRules: [
      'Nunca executar DDL manual em produção fora da ferramenta de migration.',
      'Nunca adicionar colunas NOT NULL sem default value em tabelas existentes povoadas.',
    ],
    dataStructureGuidelines: [
      'B-Tree para range/ordenação; Hash para igualdade; GIN para JSON e texto.',
    ],
    outputFormatGuidelines: [
      'Arquivo de migration gerado.',
      'Plano de execução e impacto.',
      'Script de rollback.',
    ]
  },
  {
    id: 'researcher',
    name: 'researcher',
    roleTitle: 'Pesquisador de Contexto & Exploração de Código',
    description: 'Especialista na fase 1 do workflow RPI (RESEARCH). Explora o codebase, lê documentações, mapeia dependências e não altera código.',
    model: 'sonnet',
    tools: ['Read', 'Grep', 'Glob', 'Web'],
    category: 'core',
    beforeCoding: [
      'Mapear árvore de diretórios.',
      'Consultar o grafo de conhecimento (Graphify) se disponível.',
    ],
    principles: [
      'Modo estritamente leitura: nenhuma edição de código.',
      'Evidências baseadas em arquivos e linhas reais.',
    ],
    checklists: [
      {
        category: 'Mapeamento',
        items: [
          'Arquivos principais identificados?',
          'Padrões arquiteturais documentados?',
          'Riscos técnicos e de negócio sinalizados?',
        ]
      }
    ],
    inviolableRules: [
      'Nunca modificar arquivos durante a pesquisa.',
    ],
    dataStructureGuidelines: [
      'Mapear estruturas de dados atualmente trafegadas nas rotas envolvidas.',
    ],
    outputFormatGuidelines: [
      '1. Objetivo da tarefa.',
      '2. Arquivos analisados.',
      '3. Padrões identificados.',
      '4. Riscos técnicos.',
      '5. Recomendações para a fase PLAN.',
    ]
  },
  {
    id: 'test-engineer',
    name: 'test-engineer',
    roleTitle: 'Engenheiro de Testes & Garantia de Qualidade (QA)',
    description: 'Especialista em automação de testes, pirâmide de testes (unitários, integração, e2e, contrato) e cobertura de código.',
    model: 'sonnet',
    tools: ['Read', 'Edit', 'Write', 'Bash', 'Grep', 'Glob'],
    category: 'quality',
    beforeCoding: [
      'Identificar regras críticas e cenários de borda.',
      'Mapear fixtures e mocks necessários.',
    ],
    principles: [
      'Testes rápidos, determinísticos e independentes.',
      'Testar comportamento, não detalhes internos.',
    ],
    checklists: [
      {
        category: 'Cobertura',
        items: [
          'Caminho feliz coberto com asserções precisas?',
          'Cenários de erro e borda testados?',
        ]
      }
    ],
    inviolableRules: [
      'Nunca desativar testes quebrados sem justificativa.',
    ],
    dataStructureGuidelines: [
      'Testar o comportamento com coleções vazias e grandes volumes.',
    ],
    outputFormatGuidelines: [
      'Suíte de testes criada / atualizada.',
      'Cenários testados.',
      'Resultado dos comandos de teste.',
    ]
  },
  {
    id: 'devops',
    name: 'devops',
    roleTitle: 'Especialista em DevOps, CI/CD & Infraestrutura',
    description: 'Especialista em Docker, pipelines CI/CD, supply chain, variáveis de ambiente e infraestrutura como código.',
    model: 'sonnet',
    tools: ['Read', 'Edit', 'Write', 'Bash', 'Grep'],
    category: 'specialist',
    beforeCoding: [
      'Revisar builds, Dockerfiles e variáveis de ambiente.',
    ],
    principles: [
      'Infraestrutura como código versionada.',
      'Containers com usuário não-root.',
    ],
    checklists: [
      {
        category: 'Containers & CI',
        items: [
          'Multi-stage build configurado?',
          'Container roda com usuário não-root?',
          'Pipeline quebra se testes falharem?',
        ]
      }
    ],
    inviolableRules: [
      'Nunca deixar senhas em Dockerfiles ou pipelines.',
    ],
    dataStructureGuidelines: [
      'Configurar limites de memória compatíveis.',
    ],
    outputFormatGuidelines: [
      'Arquivos de pipeline/Dockerfile criados.',
      'Instruções de execução.',
    ]
  },
  {
    id: 'accessibility-reviewer',
    name: 'accessibility-reviewer',
    roleTitle: 'Revisor de Acessibilidade (a11y) & WCAG',
    description: 'Revisor de acessibilidade digital e conformidade com as diretrizes WCAG 2.1 nível AA e semântica HTML.',
    model: 'sonnet',
    tools: ['Read', 'Grep', 'Glob'],
    category: 'review',
    beforeCoding: [
      'Identificar telas, modais e formulários impactados.',
    ],
    principles: [
      'Navegação completa via teclado.',
      'Contraste de cores adequado (4.5:1).',
      'HTML semântico nativo.',
    ],
    checklists: [
      {
        category: 'WCAG 2.1 AA',
        items: [
          'Todos os botões e links focáveis via teclado?',
          'Indicador de foco visível preservado?',
          'Imagens possuem textos alternativos descritivos?',
        ]
      }
    ],
    inviolableRules: [
      'Nunca remover outline de foco sem substituto visual.',
    ],
    dataStructureGuidelines: [
      'Estruturar navegação em elementos semânticos nativos.',
    ],
    outputFormatGuidelines: [
      'Relatório de violações encontradas.',
      'Critério WCAG infringido.',
      'Código corrigido.',
    ]
  },
  {
    id: 'documentation-writer',
    name: 'documentation-writer',
    roleTitle: 'Redator de Documentação Técnica & Specs',
    description: 'Especialista em documentação técnica, especificações orientadas a requisitos (SDD), runbooks e contratos de API.',
    model: 'sonnet',
    tools: ['Read', 'Edit', 'Write', 'Grep', 'Glob'],
    category: 'specialist',
    beforeCoding: [
      'Ler especificações existentes em docs/specs/.',
    ],
    principles: [
      'Documentação viva e orientada a requisitos.',
      'Exemplos práticos de JSON e comandos shell testáveis.',
    ],
    checklists: [
      {
        category: 'Qualidade Técnica',
        items: [
          'Endpoints documentados com status, request e response?',
          'Instruções de setup claras?',
        ]
      }
    ],
    inviolableRules: [
      'Nunca documentar senhas ou segredos reais.',
    ],
    dataStructureGuidelines: [
      'Explicar estruturas de dados complexas com tabelas conceituais.',
    ],
    outputFormatGuidelines: [
      'Arquivos de documentação gerados.',
      'Sumário das atualizações.',
    ]
  },
  {
    id: 'data-structures-specialist',
    name: 'data-structures-specialist',
    roleTitle: 'Especialista em Estruturas de Dados, Big-O & Performance',
    description: 'Especialista baseado na Seção 19 do Guia Universal (Marcello La Rocca). Analisa complexidade temporal Big-O, consumo de memória e escolhas conscientes de coleções.',
    model: 'sonnet',
    tools: ['Read', 'Edit', 'Write', 'Grep', 'Glob', 'Bash'],
    category: 'specialist',
    beforeCoding: [
      'Identificar operação dominante: busca, inserção, remoção, ordenação ou travessia.',
      'Estimar volume de dados esperado.',
    ],
    principles: [
      'Nunca usar arrays/listas genericamente sem avaliar Big-O.',
      'Para lookups frequentes: Hash Maps O(1).',
      'Para deduplicação: Hash Sets O(1).',
      'Para filas prioritárias: Heaps O(log n).',
      'Prevenção de loops aninhados O(n²).',
    ],
    checklists: [
      {
        category: 'Análise Big-O & Eficiência',
        items: [
          'Operação dominante otimizada para O(1) ou O(log n)?',
          'Evitou loops aninhados O(n²)?',
          'Prevenção de memory leaks em coleções estáticas?',
        ]
      }
    ],
    inviolableRules: [
      'Nunca realizar buscas lineares repetidas O(n) dentro de loops (gerando O(n²)).',
      'Nunca carregar milhões de registros na memória sem paginação ou streaming.',
    ],
    dataStructureGuidelines: [
      'Array: indexação O(1); busca O(n).',
      'Hash Map: busca e inserção O(1).',
      'Hash Set: unicidade O(1).',
      'Tries: autocompletar e prefixos O(k).',
    ],
    outputFormatGuidelines: [
      'Tabela comparativa da estrutura anterior vs proposta.',
      'Análise de complexidade temporal Big-O.',
      'Análise de memória espacial.',
      'Código refatorado.',
    ]
  }
];

export function generateAgentMarkdown(agent, project) {
  const stack = STACKS[project.stack];
  const toolsList = agent.tools.join(', ');

  const frontmatter = `---
name: ${agent.name}
description: ${agent.description.replace(/\n/g, ' ')}
tools: ${toolsList}
model: ${agent.model}
---`;

  const sections = [
    frontmatter,
    '',
    `# Agente Especialista: ${agent.roleTitle} (${agent.name})`,
    '',
    `Você atua como **${agent.roleTitle}** no projeto **${project.projectName}** (Domínio: *${project.domain}*).`,
    `A stack técnica oficial deste projeto é **${stack?.name || project.stack}** (Backend: ${stack?.backend || 'Padrão'}, Frontend: ${stack?.frontend || 'Padrão'}, Banco: ${project.database || stack?.database || 'Padrão'}, ORM: ${stack?.orm || 'Padrão'}).`,
    '',
    '## 1. Diretrizes Prévias (Antes de Codar ou Executar Ações)',
    '',
    ...agent.beforeCoding.map(item => `- ${item}`),
    ...(project.useGraphify ? ['- Consultar o Grafo de Conhecimento (Graphify) via `/graphify query` antes de ler múltiplos arquivos isolados.'] : []),
    '',
    '## 2. Princípios Centrais de Atuação',
    '',
    ...agent.principles.map(item => `- ${item}`),
    '',
    '## 3. Diretrizes Específicas da Stack (' + (stack?.name || project.stack) + ')',
    '',
    ...(stack?.guidelines.map(g => `- ${g}`) || ['- Respeitar as convenções idiomáticas da stack.']),
    '',
    '## 4. Checklists Obrigatórios de Validação',
    '',
    ...agent.checklists.flatMap(cat => [
      `### ${cat.category}`,
      '',
      ...cat.items.map(item => `- [ ] ${item}`),
      ''
    ]),
    '## 5. Regras Invioláveis de Segurança e Qualidade',
    '',
    ...agent.inviolableRules.map(item => `- **PROIBIÇÃO:** ${item}`),
    '',
    '## 6. Eficiência, Estruturas de Dados e Análise Big-O (Seção 19 do Guia)',
    '',
    ...agent.dataStructureGuidelines.map(item => `- ${item}`),
    '',
    '## 7. Formato Obrigatório de Saída / Resposta',
    '',
    'Toda resposta ou relatório entregue por este agente deve seguir rigorosamente a estrutura:',
    '',
    ...agent.outputFormatGuidelines.map(item => `- ${item}`),
  ];

  if (agent.customInstructions && agent.customInstructions.trim().length > 0) {
    sections.push(
      '',
      '## 8. Instruções Específicas Customizadas',
      '',
      agent.customInstructions.trim()
    );
  }

  return sections.join('\n');
}

export function assembleProjectBundle(project, agents) {
  const files = [];

  // Root CLAUDE.md
  files.push({
    path: 'CLAUDE.md',
    filename: 'CLAUDE.md',
    content: `# ${project.projectName} — CLAUDE.md

## Idioma de Trabalho
- Responder e documentar preferencialmente em português do Brasil.
- Códigos e commits em inglês técnico padronizado.

## Antes de Qualquer Tarefa
1. Leia /docs/specs/main.md.
2. Leia /docs/specs/architecture.md.
3. Leia /docs/specs/domain.md.
4. Identifique regras ativas em .claude/rules/.

## Stack do Projeto
- Backend: ${STACKS[project.stack]?.backend || 'Padrão'}
- Frontend: ${STACKS[project.stack]?.frontend || 'Padrão'}
- Banco de Dados: ${project.database || 'PostgreSQL'}

## Workflow Obrigatório (RPI)
1. RESEARCH: Analisar contexto e dependências. NUNCA editar arquivos nesta fase.
2. PLAN: Estruturar plano detalhado com arquivos afetados e testes.
3. IMPLEMENT: Codificar em pequenos blocos consistentes.
4. VERIFY: Executar linters, testes e build.
5. REVIEW: Verificar checklist de segurança e métricas Big-O.

## Regras Invioláveis
- NUNCA ler, imprimir ou versionar senhas ou segredos (.env).
- NUNCA remover autenticação/autorização para contornar falhas de testes.
- NUNCA concatenar parâmetros do usuário em queries SQL, comandos shell ou HTML.
- NUNCA expor stack traces em respostas de erro ou logs.

## Critério de Pronto
- [ ] Código compila e faz build.
- [ ] Testes automatizados passando 100%.
- [ ] Relatório de task gerado em docs/tasks/.
`,
    category: 'root'
  });

  // docs/specs/
  files.push({
    path: 'docs/specs/main.md',
    filename: 'main.md',
    content: `# ${project.projectName} — main.md\n\n## Visão\nPlataforma inteligente desenvolvida para atender às demandas de ${project.domain}.\n`,
    category: 'spec'
  });

  files.push({
    path: 'docs/specs/architecture.md',
    filename: 'architecture.md',
    content: `# ${project.projectName} — architecture.md\n\n## Visão Arquitetural\nClean Architecture em camadas com backend em ${STACKS[project.stack]?.backend} e frontend em ${STACKS[project.stack]?.frontend}.\n`,
    category: 'spec'
  });

  files.push({
    path: 'docs/specs/domain.md',
    filename: 'domain.md',
    content: `# ${project.projectName} — domain.md\n\n## Entidades Principais\n${project.entities.map(e => `- **${e}**: Entidade de negócio central.`).join('\n')}\n`,
    category: 'spec'
  });

  // .claude/agents/*.md
  for (const agent of agents) {
    files.push({
      path: `.claude/agents/${agent.name}.md`,
      filename: `${agent.name}.md`,
      content: generateAgentMarkdown(agent, project),
      category: 'agent'
    });
  }

  // .claude/rules/*.md
  const rules = [
    { filename: 'agent-security.md', title: 'Segurança do Agente' },
    { filename: 'dependency-security.md', title: 'Segurança de Dependências' },
    { filename: 'information-security.md', title: 'Segurança da Informação' },
    { filename: 'authentication-security.md', title: 'Autenticação' },
    { filename: 'authorization-security.md', title: 'Autorização e Anti-IDOR' },
    { filename: 'input-validation.md', title: 'Validação de Entrada' },
    { filename: 'no-injection.md', title: 'Prevenção de Injeções' },
    { filename: 'clean-code.md', title: 'Clean Code' },
    { filename: 'solid.md', title: 'Princípios SOLID' },
    { filename: 'data-structures-performance.md', title: 'Estruturas de Dados e Big-O' },
    { filename: 'task-report.md', title: 'Relatório de Task Obrigatório' },
  ];

  for (const r of rules) {
    files.push({
      path: `.claude/rules/${r.filename}`,
      filename: r.filename,
      content: `# Rule: ${r.title}\n\nRegras universais de ${r.title} extraídas do Guia Universal.\n`,
      category: 'rule'
    });
  }

  // .claude/skills/*/SKILL.md
  const skills = [
    { folder: 'graphify-context', name: 'graphify-context' },
    { folder: 'task-report', name: 'task-report' },
    { folder: 'secure-feature-implementation', name: 'secure-feature-implementation' },
    { folder: 'db-migration-safe', name: 'db-migration-safe' },
  ];

  for (const s of skills) {
    files.push({
      path: `.claude/skills/${s.folder}/SKILL.md`,
      filename: 'SKILL.md',
      content: `---\nname: ${s.name}\n---\n\n## Skill: ${s.name}\n`,
      category: 'skill'
    });
  }

  return files;
}

export function validateAgentCompliance(agent) {
  const checks = [];

  const isReviewerOrResearcher = agent.category === 'review' || agent.id.includes('reviewer') || agent.id === 'researcher';
  const hasWriteTools = agent.tools.includes('Write') || agent.tools.includes('Edit');

  if (isReviewerOrResearcher && hasWriteTools) {
    checks.push({
      id: 'least-privilege-violation',
      title: 'Princípio do Menor Privilégio em Risco',
      description: "Agentes revisores não devem ter ferramentas de escrita ('Write', 'Edit').",
      passed: false,
      severity: 'warning'
    });
  } else {
    checks.push({
      id: 'least-privilege-ok',
      title: 'Princípio do Menor Privilégio Atendido',
      passed: true,
      severity: 'info'
    });
  }

  const totalChecklistItems = agent.checklists.reduce((acc, cat) => acc + cat.items.length, 0);
  if (totalChecklistItems < 2) {
    checks.push({
      id: 'missing-checklists',
      title: 'Checklists de Verificação Insuficientes',
      passed: false,
      severity: 'error'
    });
  } else {
    checks.push({
      id: 'checklists-ok',
      title: 'Checklists de Verificação Definidos',
      passed: true,
      severity: 'info'
    });
  }

  if (!agent.inviolableRules || agent.inviolableRules.length === 0) {
    checks.push({
      id: 'missing-inviolable-rules',
      title: 'Falta de Regras Invioláveis de Segurança',
      passed: false,
      severity: 'error'
    });
  } else {
    checks.push({
      id: 'inviolable-rules-ok',
      title: 'Guardrails & Regras Invioláveis Ativas',
      passed: true,
      severity: 'info'
    });
  }

  return checks;
}

