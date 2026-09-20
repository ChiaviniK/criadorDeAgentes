export type StackVariantId = 'java' | 'python' | 'dotnet' | 'typescript';

export interface StackConfig {
  id: StackVariantId;
  name: string;
  badge: string;
  backend: string;
  frontend: string;
  database: string;
  orm: string;
  testRunner: string;
  guidelines: string[];
  recommendedRules: string[];
}

export interface ProjectConfig {
  projectName: string;
  domain: string;
  stack: StackVariantId;
  database: string;
  entities: string[];
  features: string[];
  securityLevel: 'standard' | 'high' | 'critical';
  useGraphify: boolean;
  outputFormat: 'claude' | 'antigravity' | 'generic';
}

export type AgentModel = 'sonnet' | 'opus' | 'haiku' | 'inherit' | 'pro' | 'flash' | 'flash_lite';

export type AgentTool = 'Read' | 'Edit' | 'Write' | 'Bash' | 'Grep' | 'Glob' | 'Web';

export interface AgentChecklistCategory {
  category: string;
  items: string[];
}

export interface AgentDefinition {
  id: string;
  name: string;
  roleTitle: string;
  description: string;
  model: AgentModel;
  tools: AgentTool[];
  category: 'core' | 'review' | 'specialist' | 'quality' | 'medical' | 'custom';
  beforeCoding: string[];

  principles: string[];
  checklists: AgentChecklistCategory[];
  inviolableRules: string[];
  dataStructureGuidelines: string[];
  outputFormatGuidelines: string[];
  customInstructions?: string;
}

export interface ComplianceCheck {
  id: string;
  title: string;
  description: string;
  passed: boolean;
  severity: 'error' | 'warning' | 'info';
  recommendation?: string;
}

export interface GeneratedFile {
  path: string;
  filename: string;
  content: string;
  category: 'agent' | 'spec' | 'rule' | 'skill' | 'root';
  description?: string;
}
