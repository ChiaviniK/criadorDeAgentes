export interface SkillTemplate {
  folderName: string;
  name: string;
  description: string;
  content: string;
}

export const UNIVERSAL_SKILLS: SkillTemplate[] = [
  {
    folderName: 'graphify-context',
    name: 'graphify-context',
    description: 'Use para obter contexto preciso do codebase com custo mínimo de tokens via grafo de conhecimento.',
    content: `---
name: graphify-context
description: Use para obter contexto preciso do codebase com custo mínimo de tokens. Consulta o grafo de conhecimento antes de ler arquivos individualmente.
---

## Quando usar

- Início de qualquer sessão de trabalho.
- Fase RESEARCH antes de implementar.
- Análise de impacto de uma mudança em múltiplos módulos.
- Onboarding em sessão nova.

## Passos

1. Verificar se \`graphify-out/graph.json\` existe. Se não, rodar \`/graphify .\`
2. \`/graphify query "[contexto da tarefa]"\` — BFS, contexto amplo e nós relacionados.
3. \`/graphify path "A" "B"\` — rastrear dependência entre dois componentes específicos.
4. \`/graphify explain "Componente"\` — entender um nó específico e suas interfaces.
5. Ler apenas os arquivos indicados pelo grafo de conhecimento.

## Após implementação

Execute para sincronizar o grafo:
\`\`\`bash
graphify . --update --no-viz
\`\`\`
`
  },
  {
    folderName: 'task-report',
    name: 'task-report',
    description: 'Gera o documento de relatório obrigatório ao fim de cada task.',
    content: `---
name: task-report
description: Gera o documento de relatório obrigatório ao fim de cada task. Registra arquivos alterados, testes, riscos e métricas de eficiência.
---

## Quando invocar

Ao concluir qualquer task — antes de considerar o trabalho pronto (Definition of Done).

## Passos

1. Coletar lista de arquivos criados e modificados.
2. Registrar resultado da execução de testes, linter e build.
3. Avaliar e pontuar riscos residuais (Alto, Médio, Baixo).
4. Criar ou atualizar o arquivo em \`docs/tasks/YYYY-MM-DD-[feature].md\`.

## Template Mínimo

| Seção | Conteúdo |
| --- | --- |
| Resumo | O que foi implementado e objetivo atendido |
| Arquivos | Criados e alterados com justificativa técnica |
| Testes | Resultado da execução de testes automatizados |
| Riscos | Riscos remanescentes e passos de mitigação |
`
  },
  {
    folderName: 'secure-feature-implementation',
    name: 'secure-feature-implementation',
    description: 'Workflow de implementação segura para qualquer feature full-stack.',
    content: `---
name: secure-feature-implementation
description: Use sempre que implementar uma nova feature com backend, frontend, banco de dados ou integração externa.
---

## Passos

1. Ler specs em \`docs/specs/\` e regras em \`.claude/rules/\`.
2. Mapear fluxos de dados sensíveis e credenciais.
3. Definir contrato de entrada e saída (DTOs / Schemas).
4. Definir e testar políticas de autorização por recurso.
5. Implementar validação estrita no backend.
6. Implementar feedback de UX e validação preventiva no frontend.
7. Criar testes unitários e de integração correspondentes.
8. Executar auto-revisão com checklist de segurança OWASP.
9. Atualizar documentação e gerar relatório de task.

## Checklist Final

- [ ] Entrada validada por Schema estrito
- [ ] Autorização por recurso validada (anti-IDOR)
- [ ] Erros e exceções padronizados sem stack traces expostos
- [ ] Logs seguros sem credenciais ou dados sensíveis
- [ ] Testes automatizados executados e passando
- [ ] Dependências novas justificadas
- [ ] Documentação e specs atualizadas
`
  },
  {
    folderName: 'db-migration-safe',
    name: 'db-migration-safe',
    description: 'Guia de execução segura de migrations de banco de dados com zero downtime.',
    content: `---
name: db-migration-safe
description: Use para criar ou alterar tabelas, colunas e índices no banco de dados com segurança e zero-downtime.
---

## Passos

1. Identificar se a alteração requer padrão Expand and Contract (duas etapas).
2. Escrever script de migração reversível (com rollback).
3. Criar índices em chaves estrangeiras para evitar lock de tabelas em cascata.
4. Para tabelas grandes, criar índices de forma concorrente (CONCURRENTLY quando suportado).
5. Nunca adicionar colunas NOT NULL sem valor DEFAULT em tabelas povoadas.
6. Testar migration e rollback localmente antes de submeter PR.
`
  }
];
