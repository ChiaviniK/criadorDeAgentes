import JSZip from 'jszip';
import { AgentDefinition, GeneratedFile, ProjectConfig } from '../types/agent';
import { generateAgentMarkdown } from './agentGenerator';
import { UNIVERSAL_RULES } from '../data/rulesTemplates';
import { UNIVERSAL_SKILLS } from '../data/skillsTemplates';
import { generateArchitectureMd, generateClaudeMd, generateDomainMd, generateMainMd } from '../data/specTemplates';

export function assembleProjectBundle(
  project: ProjectConfig,
  agents: AgentDefinition[]
): GeneratedFile[] {
  const files: GeneratedFile[] = [];

  // 1. Root CLAUDE.md
  files.push({
    path: 'CLAUDE.md',
    filename: 'CLAUDE.md',
    content: generateClaudeMd(project),
    category: 'root',
    description: 'Instruções centrais e regras invioláveis do projeto para agentes'
  });

  // 2. docs/specs/
  files.push({
    path: 'docs/specs/main.md',
    filename: 'main.md',
    content: generateMainMd(project),
    category: 'spec',
    description: 'Visão do produto, problemas resolvidos, usuários e métricas'
  });

  files.push({
    path: 'docs/specs/architecture.md',
    filename: 'architecture.md',
    content: generateArchitectureMd(project),
    category: 'spec',
    description: 'Topologia dos containers, Clean Architecture e ADRs'
  });

  files.push({
    path: 'docs/specs/domain.md',
    filename: 'domain.md',
    content: generateDomainMd(project),
    category: 'spec',
    description: 'Linguagem ubíqua, entidades, agregados e invariantes'
  });

  // 3. .claude/agents/*.md
  for (const agent of agents) {
    const md = generateAgentMarkdown(agent, project);
    files.push({
      path: `.claude/agents/${agent.name}.md`,
      filename: `${agent.name}.md`,
      content: md,
      category: 'agent',
      description: `Especialista: ${agent.roleTitle}`
    });
  }

  // 4. .claude/rules/*.md
  for (const rule of UNIVERSAL_RULES) {
    files.push({
      path: `.claude/rules/${rule.filename}`,
      filename: rule.filename,
      content: rule.content,
      category: 'rule',
      description: rule.title
    });
  }

  // 5. .claude/skills/*/SKILL.md
  for (const skill of UNIVERSAL_SKILLS) {
    files.push({
      path: `.claude/skills/${skill.folderName}/SKILL.md`,
      filename: 'SKILL.md',
      content: skill.content,
      category: 'skill',
      description: skill.description
    });
  }

  return files;
}

export async function generateZipBundle(files: GeneratedFile[]): Promise<Blob> {
  const zip = new JSZip();

  for (const file of files) {
    zip.file(file.path, file.content);
  }

  return await zip.generateAsync({ type: 'blob' });
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function downloadTextFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
  downloadBlob(blob, filename);
}
