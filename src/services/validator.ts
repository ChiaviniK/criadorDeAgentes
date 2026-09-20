import { AgentDefinition, ComplianceCheck } from '../types/agent';

export function validateAgentCompliance(agent: AgentDefinition): ComplianceCheck[] {
  const checks: ComplianceCheck[] = [];

  // 1. Princípio do Menor Privilégio nas Ferramentas (Princípio 3)
  const isReviewerOrResearcher = agent.category === 'review' || agent.id.includes('reviewer') || agent.id === 'researcher';
  const hasWriteTools = agent.tools.includes('Write') || agent.tools.includes('Edit');

  if (isReviewerOrResearcher && hasWriteTools) {
    checks.push({
      id: 'least-privilege-violation',
      title: 'Princípio do Menor Privilégio em Risco',
      description: `Agentes de perfil revisor ou pesquisador não devem ter ferramentas de escrita ('Write', 'Edit') para evitar edições acidentais no código durante revisões.`,
      passed: false,
      severity: 'warning',
      recommendation: 'Remova "Write" e "Edit" deste agente, mantendo apenas "Read", "Grep", "Glob" ou "Bash".'
    });
  } else {
    checks.push({
      id: 'least-privilege-ok',
      title: 'Princípio do Menor Privilégio Atendido',
      description: 'As ferramentas configuradas estão alinhadas à responsabilidade do agente.',
      passed: true,
      severity: 'info'
    });
  }

  // 2. Checklists Obrigatórios
  const totalChecklistItems = agent.checklists.reduce((acc, cat) => acc + cat.items.length, 0);
  if (totalChecklistItems < 2) {
    checks.push({
      id: 'missing-checklists',
      title: 'Checklists de Verificação Insuficientes',
      description: 'O Guia Universal exige que todo agente possua checklists explícitos de segurança, qualidade ou validação.',
      passed: false,
      severity: 'error',
      recommendation: 'Adicione pelo menos 2 itens de verificação na aba de Checklists.'
    });
  } else {
    checks.push({
      id: 'checklists-ok',
      title: 'Checklists de Verificação Definidos',
      description: `${totalChecklistItems} itens de verificação configurados em ${agent.checklists.length} categorias.`,
      passed: true,
      severity: 'info'
    });
  }

  // 3. Regras Invioláveis de Segurança
  if (!agent.inviolableRules || agent.inviolableRules.length === 0) {
    checks.push({
      id: 'missing-inviolable-rules',
      title: 'Falta de Regras Invioláveis de Segurança',
      description: 'O agente não possui guardrails ou regras inegociáveis registradas (ex: nunca expor segredos, nunca injetar SQL).',
      passed: false,
      severity: 'error',
      recommendation: 'Inclua pelo menos 1 regra inviolável de segurança ou proteção de dados.'
    });
  } else {
    checks.push({
      id: 'inviolable-rules-ok',
      title: 'Guardrails & Regras Invioláveis Ativas',
      description: `${agent.inviolableRules.length} proibições estritas configuradas.`,
      passed: true,
      severity: 'info'
    });
  }

  // 4. Estruturas de Dados e Big-O (Seção 19 do Guia)
  if (!agent.dataStructureGuidelines || agent.dataStructureGuidelines.length === 0) {
    checks.push({
      id: 'missing-big-o',
      title: 'Ausência de Diretrizes de Estruturas de Dados (Seção 19)',
      description: 'O Guia recomenda formalmente que agentes considerem eficiência algorítmica Big-O e escolhas conscientes de coleções.',
      passed: false,
      severity: 'warning',
      recommendation: 'Adicione orientações sobre complexidade temporal/espacial para o agente.'
    });
  } else {
    checks.push({
      id: 'big-o-ok',
      title: 'Conformidade com Análise Algorítmica (Seção 19)',
      description: 'Diretrizes de complexidade de tempo O(n) e escolha de coleções integradas.',
      passed: true,
      severity: 'info'
    });
  }

  // 5. Formato de Saída Estruturado
  if (!agent.outputFormatGuidelines || agent.outputFormatGuidelines.length === 0) {
    checks.push({
      id: 'missing-output-format',
      title: 'Falta de Estrutura de Resposta / Saída',
      description: 'O agente deve ter um formato previsível de entrega para que outros agentes ou desenvolvedores consumam suas respostas.',
      passed: false,
      severity: 'warning',
      recommendation: 'Defina as seções esperadas na resposta final do agente.'
    });
  } else {
    checks.push({
      id: 'output-format-ok',
      title: 'Formato de Entrega Estruturado',
      description: 'Saída padronizada definida.',
      passed: true,
      severity: 'info'
    });
  }

  // 6. Nomenclatura e Frontmatter
  const isValidName = /^[a-z0-9-_]+$/.test(agent.name);
  if (!isValidName) {
    checks.push({
      id: 'invalid-name-format',
      title: 'Nome do Agente Fora do Padrão',
      description: 'O identificador deve usar apenas letras minúsculas, números, hifens ou underscores (ex: "security-reviewer").',
      passed: false,
      severity: 'error',
      recommendation: 'Ajuste o nome para conter apenas caracteres alfanuméricos minúsculos e hifens.'
    });
  }

  return checks;
}
