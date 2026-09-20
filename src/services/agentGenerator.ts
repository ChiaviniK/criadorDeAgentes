import { AgentDefinition, ProjectConfig } from '../types/agent';
import { STACKS } from '../data/stacks';

export function generateAgentMarkdown(agent: AgentDefinition, project: ProjectConfig): string {
  const stack = STACKS[project.stack];
  const toolsList = agent.tools.join(', ');

  // Frontmatter YAML
  const frontmatter = `---
name: ${agent.name}
description: ${agent.description.replace(/\n/g, ' ')}
tools: ${toolsList}
model: ${agent.model}
---`;

  // Content body
  const sections: string[] = [
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
