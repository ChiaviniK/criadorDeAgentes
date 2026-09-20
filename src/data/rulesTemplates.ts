export interface RuleTemplate {
  filename: string;
  title: string;
  description: string;
  content: string;
}

export const UNIVERSAL_RULES: RuleTemplate[] = [
  {
    filename: 'agent-security.md',
    title: 'Regra Universal de Segurança do Agente',
    description: 'Princípios inegociáveis de operação do agente no ambiente',
    content: `# Rule: Segurança do Agente de IA

- O agente deve respeitar o princípio do menor privilégio em comandos executados no terminal.
- Nunca ler arquivos de credenciais (.env, .pem, .key, id_rsa, credentials.json).
- Nunca executar comandos destrutivos (rm -rf, DROP DATABASE, git reset --hard) sem autorização humana expressa.
- Antes de qualquer alteração, executar o ciclo RESEARCH -> PLAN -> IMPLEMENT -> VERIFY -> REVIEW.
- O agente não deve gerar código com bypass de autenticação, testes comentados ou desativação de linters.
`
  },
  {
    filename: 'input-validation.md',
    title: 'Regra Universal de Validação de Entrada',
    description: 'Validação rigorosa nas bordas da aplicação',
    content: `# Rule: Validação Rigorosa de Entrada

- NUNCA confiar em entrada vinda do cliente, mesmo após validação no frontend.
- Validar tipo, tamanho, formato, regex e intervalo de todos os parâmetros em tempo de execução usando DTOs/Schemas.
- Rejeitar payloads com campos extras não reconhecidos (strict schemas / whitelist).
- Sanitizar inputs contra caracteres perigosos antes de qualquer processamento interno.
`
  },
  {
    filename: 'no-injection.md',
    title: 'Prevenção de Injeções (SQL, Command, XSS)',
    description: 'Diretrizes contra todas as formas de injeção',
    content: `# Rule: Prevenção Estrita de Injeções

- SQL Injection: Usar exclusivamente ORM ou queries preparadas/parametrizadas com placeholders (?, :param). Proibida qualquer concatenação de strings em SQL.
- Command Injection: Nunca passar parâmetros do usuário para subprocessos de shell (exec, spawn, system, Process.Start). Usar APIs de linguagem seguras.
- XSS (Cross-Site Scripting): Escapar todas as saídas no frontend. Jamais injetar HTML bruto sem sanitização prévia rigorosa com biblioteca confiável (DOMPurify).
`
  },
  {
    filename: 'clean-code.md',
    title: 'Regras de Clean Code & Legibilidade',
    description: 'Padrões de nomes, funções pequenas e simplicidade',
    content: `# Rule: Clean Code e Legibilidade

- Funções pequenas e focadas em uma única tarefa (máximo sugerido: 20 a 30 linhas).
- Nomes reveladores de intenção para variáveis, funções, classes e métodos, sem abreviações misteriosas.
- Evitar comentários que explicam o que o código faz; o código deve ser autoexplicativo. Use comentários apenas para "porquês" de negócio complexos.
- Eliminar duplicação (DRY) respeitando a separação de conceitos de domínios diferentes.
`
  },
  {
    filename: 'solid.md',
    title: 'Princípios SOLID de Design de Software',
    description: 'Diretrizes para arquitetura sustentável e desacoplada',
    content: `# Rule: Princípios SOLID

- SRP (Single Responsibility): Cada módulo ou classe deve ter uma única razão para mudar.
- OCP (Open/Closed): Entidades de software devem estar abertas para extensão, mas fechadas para modificação.
- LSP (Liskov Substitution): Subclasses devem poder substituir suas superclasses sem quebrar o comportamento do sistema.
- ISP (Interface Segregation): Muitas interfaces específicas são melhores que uma interface geral inflada.
- DIP (Dependency Inversion): Depender de abstrações (interfaces/contratos), nunca de implementações concretas de baixo nível.
`
  },
  {
    filename: 'data-structures-performance.md',
    title: 'Regra de Estruturas de Dados e Análise Big-O (Seção 19)',
    description: 'Escolha consciente de estruturas baseada em complexidade algorítmica',
    content: `# Rule: Estruturas de Dados, Big-O e Eficiência

- Escolha a estrutura com base na operação dominante:
  * Busca por chave frequente: Hash Map / Dict O(1).
  * Checagem de existência / deduplicação: Hash Set O(1).
  * Acesso posicional rápido: Array indexado O(1).
  * Inserção/remoção frequente nas pontas: Deque / Fila O(1).
- PROIBIDO o uso de buscas lineares repetidas O(n) dentro de loops que resultem em complexidade quadrática O(n²).
- Proibido carregar conjuntos ilimitados de dados na memória do servidor sem paginação ou streaming.
- Prevenir vazamento de memória expurgando caches e ouvintes de eventos.
`
  },
  {
    filename: 'task-report.md',
    title: 'Relatório Obrigatório ao Fim de Cada Task',
    description: 'Documentação do trabalho realizado e auditoria de métricas',
    content: `# Rule: Relatório de Task Obrigatório

Ao concluir qualquer tarefa ou feature, o agente deve obrigatoriamente criar ou atualizar o arquivo de relatório em:
\`docs/tasks/YYYY-MM-DD-[feature].md\`

O relatório deve conter:
1. Resumo do que foi implementado.
2. Arquivos criados e alterados com justificativa.
3. Testes executados e status de aprovação.
4. Riscos técnicos remanescentes.
5. Métricas de eficiência e asserts do grafo de conhecimento quando aplicável.
`
  }
];
