import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { AgentWizard } from './components/AgentWizard';
import { MarkdownPreview } from './components/MarkdownPreview';
import { AgentCatalog } from './components/AgentCatalog';
import { FullProjectGenerator } from './components/FullProjectGenerator';
import { ProjectConfigModal } from './components/ProjectConfigModal';
import { AgentDefinition, GeneratedFile, ProjectConfig } from './types/agent';
import { UNIVERSAL_AGENTS } from './data/presets';
import { generateAgentMarkdown } from './services/agentGenerator';
import { validateAgentCompliance } from './services/validator';

export function App() {
  // Project state
  const [project, setProject] = useState<ProjectConfig>({
    projectName: 'SistemaCorporativo',
    domain: 'Gestão e Automação de Processos',
    stack: 'typescript',
    database: 'PostgreSQL',
    entities: ['Usuario', 'Processo', 'Documento', 'Auditoria'],
    features: [
      'Autenticação e Autorização RBAC',
      'Fluxo de Aprovação de Processos',
      'Dashboard de Métricas e Relatórios',
      'Webhooks de Integração'
    ],
    securityLevel: 'high',
    useGraphify: true,
    outputFormat: 'claude',
  });

  // Agents state
  const [agents, setAgents] = useState<AgentDefinition[]>(UNIVERSAL_AGENTS);
  const [selectedAgentId, setSelectedAgentId] = useState<string>(UNIVERSAL_AGENTS[2].id); // defaults to 'backend'
  const [activeTab, setActiveTab] = useState<'editor' | 'catalog' | 'bundle'>('editor');
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [previewCustomFile, setPreviewCustomFile] = useState<GeneratedFile | null>(null);

  const currentAgent = agents.find(a => a.id === selectedAgentId) || agents[0];

  // Markdown content generation
  const generatedMarkdown = previewCustomFile
    ? previewCustomFile.content
    : generateAgentMarkdown(currentAgent, project);

  const currentFilename = previewCustomFile
    ? previewCustomFile.filename
    : `${currentAgent.name}.md`;

  const currentFilePath = previewCustomFile
    ? previewCustomFile.path
    : `.claude/agents/${currentAgent.name}.md`;

  // Real-time compliance check
  const complianceChecks = validateAgentCompliance(currentAgent);

  // Handlers
  const handleUpdateAgent = (updated: AgentDefinition) => {
    setAgents(prev => prev.map(a => a.id === updated.id ? updated : a));
  };

  const handleSelectAgent = (agent: AgentDefinition) => {
    setSelectedAgentId(agent.id);
    setPreviewCustomFile(null);
    setActiveTab('editor');
  };

  const handleCloneAgent = (agent: AgentDefinition) => {
    const newId = `${agent.id}-custom-${Date.now().toString().slice(-4)}`;
    const cloned: AgentDefinition = {
      ...agent,
      id: newId,
      name: newId,
      roleTitle: `${agent.roleTitle} (Custom)`,
      category: 'custom',
    };
    setAgents(prev => [...prev, cloned]);
    setSelectedAgentId(cloned.id);
    setPreviewCustomFile(null);
    setActiveTab('editor');
  };

  const handleNewCustomAgent = () => {
    const newId = `agente-custom-${Date.now().toString().slice(-4)}`;
    const newAgent: AgentDefinition = {
      id: newId,
      name: newId,
      roleTitle: 'Novo Agente Especialista',
      description: 'Especialista customizado criado para atender demandas específicas do projeto.',
      model: 'sonnet',
      tools: ['Read', 'Grep', 'Glob'],
      category: 'custom',
      beforeCoding: [
        'Ler especificações em docs/specs/main.md e architecture.md.',
        'Mapear arquivos relacionados à tarefa.',
      ],
      principles: [
        'Princípio da responsabilidade única.',
        'Segurança e qualidade em primeiro lugar.',
      ],
      checklists: [
        {
          category: 'Verificações Gerais',
          items: [
            'Requisitos atendidos sem regressão?',
            'Testes automatizados passando?',
          ]
        }
      ],
      inviolableRules: [
        'Nunca ler nem expor senhas ou tokens em código ou logs.',
      ],
      dataStructureGuidelines: [
        'Avaliar a complexidade temporal Big-O antes de escolher coleções de dados.',
      ],
      outputFormatGuidelines: [
        'Resumo da alteração efetuada.',
        'Arquivos afetados.',
        'Instruções de validação.',
      ]
    };
    setAgents(prev => [...prev, newAgent]);
    setSelectedAgentId(newAgent.id);
    setPreviewCustomFile(null);
    setActiveTab('editor');
  };

  const handleResetPreset = () => {
    const original = UNIVERSAL_AGENTS.find(a => a.id === currentAgent.id);
    if (original) {
      handleUpdateAgent(original);
    }
  };

  const handleSaveCurrentToDisk = async (): Promise<boolean> => {
    try {
      const response = await fetch('/api/save-files', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetDir: 'output-agents',
          files: [
            {
              path: currentFilePath,
              content: generatedMarkdown,
            }
          ]
        })
      });
      const data = await response.json();
      return data.success;
    } catch {
      return false;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-brand-500 selection:text-white">
      
      {/* Top Navigation */}
      <Navbar
        project={project}
        onOpenProjectModal={() => setIsProjectModalOpen(true)}
        onOpenBundleModal={() => setActiveTab('bundle')}
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab !== 'bundle') setPreviewCustomFile(null);
        }}
      />

      {/* Main Workspace Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        
        {/* TAB 1: EDITOR (SPLIT VIEW) */}
        {activeTab === 'editor' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-135px)] min-h-[600px]">
            {/* Left: Agent Wizard (7 columns) */}
            <div className="lg:col-span-7 h-full">
              <AgentWizard
                agent={currentAgent}
                onChange={handleUpdateAgent}
                onResetPreset={handleResetPreset}
              />
            </div>

            {/* Right: Markdown Live Preview (5 columns) */}
            <div className="lg:col-span-5 h-full">
              <MarkdownPreview
                content={generatedMarkdown}
                filename={currentFilename}
                filePath={currentFilePath}
                complianceChecks={complianceChecks}
                onSaveToDisk={handleSaveCurrentToDisk}
              />
            </div>
          </div>
        )}

        {/* TAB 2: CATALOG */}
        {activeTab === 'catalog' && (
          <AgentCatalog
            agents={agents}
            project={project}
            onSelectAgent={handleSelectAgent}
            onCloneAgent={handleCloneAgent}
            onNewCustomAgent={handleNewCustomAgent}
          />
        )}

        {/* TAB 3: BUNDLE / FULL PROJECT */}
        {activeTab === 'bundle' && (
          <div>
            {previewCustomFile ? (
              <div className="space-y-4">
                <button
                  onClick={() => setPreviewCustomFile(null)}
                  className="text-xs font-semibold text-brand-400 hover:text-brand-300 flex items-center space-x-1"
                >
                  <span>← Voltar à lista de arquivos do ecossistema</span>
                </button>
                <div className="h-[calc(100vh-200px)] min-h-[500px]">
                  <MarkdownPreview
                    content={previewCustomFile.content}
                    filename={previewCustomFile.filename}
                    filePath={previewCustomFile.path}
                    complianceChecks={complianceChecks}
                    onSaveToDisk={handleSaveCurrentToDisk}
                  />
                </div>
              </div>
            ) : (
              <FullProjectGenerator
                project={project}
                agents={agents}
                onSelectFileForPreview={(file) => setPreviewCustomFile(file)}
              />
            )}
          </div>
        )}

      </main>

      {/* Project Configuration Modal */}
      <ProjectConfigModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        project={project}
        onSave={(updated) => setProject(updated)}
      />

    </div>
  );
}

export default App;
