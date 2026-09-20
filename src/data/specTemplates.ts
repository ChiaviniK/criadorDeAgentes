import { ProjectConfig } from '../types/agent';
import { STACKS } from './stacks';

export function generateMainMd(project: ProjectConfig): string {
  return `# ${project.projectName} — main.md

## Visão

Plataforma inteligente desenvolvida para atender às demandas de ${project.domain}, oferecendo alta confiabilidade, segurança e arquitetura orientada a agentes.

## Problema

Resolver a complexidade operacional e a fragmentação no domínio de ${project.domain}, fornecendo uma experiência integrada, segura e performática para os usuários.

## Usuários Principais

- Usuários Operacionais: operam as funcionalidades centrais do sistema no dia a dia.
- Administradores: gerenciam permissões, configurações globais e auditoria.
- Desenvolvedores / Agentes: mantêm a integridade do código, testes e infraestrutura.

## Métricas de Sucesso

- Disponibilidade: 99.9%
- Tempo de resposta p95: < 300 ms em endpoints transacionais
- Taxa de erro: < 0.5%
- Cobertura mínima de testes: 80% em regras de negócio
- Zero vulnerabilidades críticas ou altas no pipeline de CI/CD

## Escopo Inicial

${project.features.length > 0 ? project.features.map(f => `- ${f}`).join('\n') : '- Módulo de Autenticação e Gestão de Usuários\n- Módulo de Entidades Centrais\n- Dashboard Operacional e Relatórios'}

## Não-Escopo Inicial

- Suporte a multi-regiões ativas simultâneas (fase 2)
- Aplicativo mobile nativo (acesso via PWA responsivo no lançamento)

## Restrições

- Conformidade com a LGPD e privacidade de dados por design.
- Segurança de informação e criptografia de ponta a ponta em dados em repouso e trânsito.
- Acessibilidade digital em conformidade com WCAG 2.1 nível AA.
`;
}

export function generateArchitectureMd(project: ProjectConfig): string {
  const stack = STACKS[project.stack];
  return `# ${project.projectName} — architecture.md

## Visão Arquitetural

Arquitetura em Camadas (Clean Architecture / Hexagonal) com separação estrita de responsabilidades, facilitando testes, manutenibilidade e desenvolvimento agêntico disciplinado.

## Containers Principais

- \`apps/api\`: Backend da aplicação desenvolvido em ${stack?.backend || 'Backend Moderno'}
- \`apps/web\`: Frontend da aplicação desenvolvido em ${stack?.frontend || 'React Moderno'}
- \`packages/shared\`: Tipos, contratos, schemas e utilitários compartilhados
- \`packages/ui\`: Componentes de interface do usuário reutilizáveis e acessíveis
- Banco de Dados Principal: ${project.database || stack?.database || 'PostgreSQL'}
- ORM / Camada de Acesso a Dados: ${stack?.orm || 'ORM Padrão'}
- Runner de Testes: ${stack?.testRunner || 'Runner Padrão'}

## Padrões Arquiteturais Adotados

1. **Separação de Camadas:** Controllers finos -> Use Cases / Services de Domínio -> Repositories e Gateways.
2. **DTOs e Validação nas Fronteiras:** Toda entrada e saída externa deve possuir schema estrito.
3. **Tratamento Centralizado de Erros:** Erros de domínio mapeados para respostas HTTP previsíveis sem vazamento de detalhes internos.
4. **Idempotência:** Operações críticas de mutação devem suportar chaves de idempotência.
5. **Observabilidade:** Logs estruturados em formato JSON, métricas e tracing distribuído.

## Decisões Arquiteturais Registradas (ADRs)

- ADR-001: Escolha da stack principal (${stack?.name || project.stack})
- ADR-002: Modelo de dados relacional e estratégia de migrations com zero downtime
- ADR-003: Autenticação stateless via JWT com rotação de refresh tokens
- ADR-004: Adopção de grafo de conhecimento para desenvolvimento agêntico
`;
}

export function generateDomainMd(project: ProjectConfig): string {
  return `# ${project.projectName} — domain.md

## Linguagem Ubíqua

- **${project.projectName}**: Sistema central para o domínio de ${project.domain}.
${project.entities.map(e => `- **${e}**: Entidade de negócio fundamental para o processamento de fluxos no domínio.`).join('\n')}

## Entidades e Agregados Principais

${project.entities.map(e => `### Entidade: ${e}

**Atributos Principais:**
- \`id\`: Identificador único (UUIDv7 ou chave primária segura)
- \`createdAt\`: Timestamp UTC de criação
- \`updatedAt\`: Timestamp UTC da última atualização
- \`status\`: Estado atual do ciclo de vida da entidade

**Invariantes de Negócio:**
- Toda criação de \`${e}\` deve possuir dados válidos e validados por schema.
- Mudanças de estado devem ocorrer exclusivamente através de métodos de domínio específicos.
`).join('\n\n')}

## Políticas de Dados e Concorrência

- Transações atômicas para alterações envolvendo múltiplos agregados.
- Bloqueio otimista (optimistic locking) via coluna de versão para prevenir sobreposição de edições concorrentes.
`;
}

export function generateClaudeMd(project: ProjectConfig): string {
  const stack = STACKS[project.stack];
  return `# ${project.projectName} — CLAUDE.md

## Idioma de Trabalho

- Responder, explicar e documentar preferencialmente em português do Brasil.
- Códigos, nomes de variáveis, classes e commits em inglês técnico padronizado.

## Antes de Qualquer Tarefa

1. Leia \`/docs/specs/main.md\`.
2. Leia \`/docs/specs/architecture.md\`.
3. Leia \`/docs/specs/domain.md\`.
4. Leia \`/docs/specs/security.md\`.
5. Leia \`/docs/specs/quality.md\`.
6. Identifique regras ativas em \`.claude/rules/\`.

## Stack do Projeto

- **Backend:** ${stack?.backend || 'Conforme projeto'}
- **Frontend:** ${stack?.frontend || 'Conforme projeto'}
- **Banco de Dados:** ${project.database || stack?.database || 'PostgreSQL'}
- **ORM / Migrations:** ${stack?.orm || 'Conforme projeto'}
- **Testes:** ${stack?.testRunner || 'Conforme projeto'}

## Workflow Obrigatório (RPI)

1. **RESEARCH:** Analisar contexto e dependências. NUNCA editar arquivos nesta fase.
2. **PLAN:** Estruturar plano detalhado com arquivos afetados, estratégia de testes e riscos.
3. **IMPLEMENT:** Codificar em pequenos blocos consistentes.
4. **VERIFY:** Executar linters, testes unitários e build.
5. **REVIEW:** Verificar checklist de segurança, Clean Code, SOLID e métricas Big-O.

## Regras Invioláveis

- NUNCA ler, imprimir ou versionar senhas, tokens ou arquivos de segredos (.env).
- NUNCA remover autenticação ou autorização para contornar falhas de testes.
- NUNCA concatenar parâmetros do usuário em queries SQL, comandos shell ou HTML (prevenção absoluta contra injeções).
- NUNCA rodar migration de banco de dados sem planejamento e script de rollback.
- NUNCA expor stack traces ou dados sensíveis em respostas de erro da API ou logs.
- NUNCA adicionar dependências externas sem justificativa técnica plausível.
- NUNCA ignorar ou desativar testes quebrados sem registrar issue justificada.

${project.useGraphify ? `## Grafo de Conhecimento (Graphify)

- Se \`graphify-out/graph.json\` existir, consulte o grafo com \`/graphify query\` antes de ler múltiplos arquivos individualmente.
- Ao concluir alterações relevantes no código, execute \`graphify . --update --no-viz\`.
` : ''}

## Critério Universal de Pronto (Definition of Done)

- [ ] Código compila e faz build sem erros.
- [ ] Testes automatizados executados e passando 100%.
- [ ] Linter e formatação executados sem warnings ou erros.
- [ ] Nenhum segredo ou credencial exposta.
- [ ] Relatório de task gerado em \`docs/tasks/YYYY-MM-DD-[feature].md\`.
`;
}
