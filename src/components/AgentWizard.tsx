import React, { useState } from 'react';
import { 
  Bot, Wrench, Shield, CheckSquare, ListPlus, Trash2, Plus, 
  Cpu, Binary, Sparkles, RefreshCw, AlertCircle
} from 'lucide-react';
import { AgentDefinition, AgentModel, AgentTool } from '../types/agent';

interface AgentWizardProps {
  agent: AgentDefinition;
  onChange: (updated: AgentDefinition) => void;
  onResetPreset?: () => void;
}

export const AgentWizard: React.FC<AgentWizardProps> = ({
  agent,
  onChange,
  onResetPreset,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<
    'identity' | 'tools' | 'checklists' | 'rules' | 'bigO' | 'output' | 'custom'
  >('identity');

  // Helpers to update properties
  const updateField = <K extends keyof AgentDefinition>(field: K, value: AgentDefinition[K]) => {
    onChange({ ...agent, [field]: value });
  };

  const toggleTool = (tool: AgentTool) => {
    const current = [...agent.tools];
    const index = current.indexOf(tool);
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(tool);
    }
    updateField('tools', current);
  };

  // Checklist management
  const addChecklistItem = (catIndex: number, text: string) => {
    if (!text.trim()) return;
    const checklists = [...agent.checklists];
    checklists[catIndex].items.push(text.trim());
    updateField('checklists', checklists);
  };

  const removeChecklistItem = (catIndex: number, itemIndex: number) => {
    const checklists = [...agent.checklists];
    checklists[catIndex].items.splice(itemIndex, 1);
    updateField('checklists', checklists);
  };

  const addChecklistCategory = (categoryName: string) => {
    if (!categoryName.trim()) return;
    const checklists = [...agent.checklists, { category: categoryName.trim(), items: [] }];
    updateField('checklists', checklists);
  };

  // Inviolable rules management
  const addInviolableRule = (rule: string) => {
    if (!rule.trim()) return;
    updateField('inviolableRules', [...agent.inviolableRules, rule.trim()]);
  };

  const removeInviolableRule = (index: number) => {
    const rules = [...agent.inviolableRules];
    rules.splice(index, 1);
    updateField('inviolableRules', rules);
  };

  // Data structure guidelines
  const addBigOGuideline = (rule: string) => {
    if (!rule.trim()) return;
    updateField('dataStructureGuidelines', [...agent.dataStructureGuidelines, rule.trim()]);
  };

  const removeBigOGuideline = (index: number) => {
    const rules = [...agent.dataStructureGuidelines];
    rules.splice(index, 1);
    updateField('dataStructureGuidelines', rules);
  };

  const allAvailableTools: { id: AgentTool; label: string; desc: string }[] = [
    { id: 'Read', label: 'Read (Leitura)', desc: 'Leitura de arquivos do projeto' },
    { id: 'Grep', label: 'Grep (Busca Textual)', desc: 'Busca de padrões e regex no código' },
    { id: 'Glob', label: 'Glob (Busca de Arquivos)', desc: 'Listagem de diretórios por máscara' },
    { id: 'Edit', label: 'Edit (Edição Cirúrgica)', desc: 'Substituição de trechos de código' },
    { id: 'Write', label: 'Write (Criação/Sobrescrita)', desc: 'Criação de novos arquivos' },
    { id: 'Bash', label: 'Bash / Shell', desc: 'Execução de comandos de teste, linter e build' },
    { id: 'Web', label: 'Web (Navegação)', desc: 'Pesquisa em documentações externas' },
  ];

  const models: { id: AgentModel; label: string; desc: string }[] = [
    { id: 'sonnet', label: 'Claude 3.5 Sonnet / 3.7 Sonnet', desc: 'Recomendado para a maioria das tarefas agênticas' },
    { id: 'opus', label: 'Claude 3 Opus', desc: 'Máxima capacidade de raciocínio para arquitetura' },
    { id: 'haiku', label: 'Claude 3.5 Haiku', desc: 'Rápido e econômico para tarefas de pesquisa leve' },
    { id: 'pro', label: 'Gemini Pro / Flash', desc: 'Compatibilidade com Antigravity' },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl flex flex-col h-full shadow-2xl overflow-hidden">
      
      {/* Wizard Header */}
      <div className="px-5 py-3.5 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-brand-500/10 border border-brand-500/20">
            <Bot className="h-5 w-5 text-brand-400" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white flex items-center space-x-2">
              <span>{agent.roleTitle || 'Novo Agente'}</span>
              <span className="text-[11px] font-mono text-slate-400">({agent.name}.md)</span>
            </h3>
            <span className="text-[11px] text-slate-400">
              Personalize o comportamento, guardrails e ferramentas do agente
            </span>
          </div>
        </div>

        {onResetPreset && (
          <button
            onClick={onResetPreset}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition flex items-center space-x-1 text-xs"
            title="Restaurar padrão do Guia Universal"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Restaurar</span>
          </button>
        )}
      </div>

      {/* Subtabs Bar */}
      <div className="flex items-center space-x-1 px-4 py-2 bg-slate-900/90 border-b border-slate-800 overflow-x-auto">
        {[
          { id: 'identity', label: '1. Identidade & Modelo', icon: Bot },
          { id: 'tools', label: '2. Ferramentas', icon: Wrench },
          { id: 'checklists', label: '3. Checklists', icon: CheckSquare },
          { id: 'rules', label: '4. Regras Invioláveis', icon: Shield },
          { id: 'bigO', label: '5. Big-O & Coleções', icon: Binary },
          { id: 'output', label: '6. Formato de Saída', icon: ListPlus },
          { id: 'custom', label: '7. Prompt Extra', icon: Sparkles },
        ].map(tab => {
          const Icon = tab.icon;
          const isSelected = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition flex items-center space-x-1.5 ${
                isSelected
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        
        {/* TAB 1: IDENTIDADE */}
        {activeSubTab === 'identity' && (
          <div className="space-y-4 max-w-xl">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Nome do Arquivo / Identificador (sem extensão)
              </label>
              <input
                type="text"
                value={agent.name}
                onChange={e => updateField('name', e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, ''))}
                placeholder="ex: security-reviewer, backend, frontend"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white font-mono focus:border-brand-500 focus:outline-none"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                O arquivo será salvo como: <strong className="text-slate-300">.claude/agents/{agent.name}.md</strong>
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Título do Papel / Persona
              </label>
              <input
                type="text"
                value={agent.roleTitle}
                onChange={e => updateField('roleTitle', e.target.value)}
                placeholder="ex: Especialista Backend Full-Stack"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-brand-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Descrição da Responsabilidade (Frontmatter YAML)
              </label>
              <textarea
                rows={3}
                value={agent.description}
                onChange={e => updateField('description', e.target.value)}
                placeholder="Descreva quando este agente deve ser acionado e qual o seu escopo..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-brand-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Modelo LLM Alvo
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {models.map(m => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => updateField('model', m.id)}
                    className={`p-3 rounded-xl border text-left transition ${
                      agent.model === m.id
                        ? 'border-brand-500 bg-brand-500/10 ring-1 ring-brand-500/30'
                        : 'border-slate-800 bg-slate-950/40 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-xs font-bold text-white">{m.label}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{m.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: FERRAMENTAS & MENOR PRIVILÉGIO */}
        {activeSubTab === 'tools' && (
          <div className="space-y-4 max-w-2xl">
            <div className="p-3.5 rounded-xl bg-brand-950/20 border border-brand-800/40 flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-brand-400 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-slate-300 leading-relaxed">
                <strong>Princípio do Menor Privilégio (Guia Seção 2):</strong> Conceda apenas as ferramentas necessárias para o objetivo do agente. Agentes de revisão de segurança ou qualidade não devem ter ferramentas de escrita (`Write`, `Edit`) para impedir modificações no código sem supervisão.
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {allAvailableTools.map(tool => {
                const isSelected = agent.tools.includes(tool.id);
                return (
                  <div
                    key={tool.id}
                    onClick={() => toggleTool(tool.id)}
                    className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                      isSelected
                        ? 'border-brand-500 bg-brand-500/10 ring-1 ring-brand-500/30'
                        : 'border-slate-800 bg-slate-950/40 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {}} // handled by parent div
                        className="h-4 w-4 rounded border-slate-700 text-brand-500 focus:ring-brand-500 bg-slate-900 cursor-pointer"
                      />
                      <div>
                        <div className="text-xs font-bold text-white font-mono">{tool.label}</div>
                        <div className="text-[11px] text-slate-400">{tool.desc}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: CHECKLISTS DE VALIDAÇÃO */}
        {activeSubTab === 'checklists' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <p className="text-xs text-slate-400">
                Checklists que o agente deve obrigatoriamente validar antes de considerar a entrega pronta.
              </p>
            </div>

            {agent.checklists.map((cat, catIdx) => (
              <div key={catIdx} className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                  <h4 className="font-bold text-xs text-brand-300 uppercase tracking-wider">
                    {cat.category}
                  </h4>
                  <span className="text-[10px] text-slate-500">
                    {cat.items.length} verificações
                  </span>
                </div>

                <div className="space-y-1.5">
                  {cat.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-900/60 border border-slate-800 group">
                      <span className="text-slate-300 leading-relaxed pr-2">- [ ] {item}</span>
                      <button
                        onClick={() => removeChecklistItem(catIdx, itemIdx)}
                        className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-rose-400 transition p-1"
                        title="Remover item"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add new item input */}
                <div className="flex items-center space-x-2 pt-1">
                  <input
                    type="text"
                    placeholder="Adicionar novo item de checklist..."
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        addChecklistItem(catIdx, (e.target as HTMLInputElement).value);
                        (e.target as HTMLInputElement).value = '';
                      }
                    }}
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:border-brand-500 focus:outline-none"
                  />
                </div>
              </div>
            ))}

            {/* Add new category */}
            <div className="pt-2">
              <input
                type="text"
                placeholder="+ Criar nova categoria de checklist (ex: Testes de Carga, Compliance LGPD)..."
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    addChecklistCategory((e.target as HTMLInputElement).value);
                    (e.target as HTMLInputElement).value = '';
                  }
                }}
                className="w-full bg-slate-950 border border-dashed border-slate-800 hover:border-slate-700 rounded-xl px-4 py-2 text-xs text-slate-300 focus:border-brand-500 focus:outline-none transition"
              />
            </div>
          </div>
        )}

        {/* TAB 4: REGRAS INVIOLÁVEIS & GUARDRAILS */}
        {activeSubTab === 'rules' && (
          <div className="space-y-4 max-w-2xl">
            <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-900/40 text-xs text-rose-200">
              <strong>Regras Invioláveis:</strong> Ações expressamente proibidas que o agente NUNCA deve cometer sob nenhuma circunstância.
            </div>

            <div className="space-y-2">
              {agent.inviolableRules.map((rule, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800 group">
                  <span className="text-xs text-slate-200 font-medium leading-relaxed pr-3">
                    🚫 {rule}
                  </span>
                  <button
                    onClick={() => removeInviolableRule(idx)}
                    className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-rose-400 transition p-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <input
                type="text"
                placeholder="+ Adicionar proibição inegociável (ex: Nunca commitar segredos no git)..."
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    addInviolableRule((e.target as HTMLInputElement).value);
                    (e.target as HTMLInputElement).value = '';
                  }
                }}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:border-brand-500 focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* TAB 5: ESTRUTURAS DE DADOS & BIG-O */}
        {activeSubTab === 'bigO' && (
          <div className="space-y-4 max-w-2xl">
            <div className="p-3.5 rounded-xl bg-indigo-950/20 border border-indigo-900/40 text-xs text-indigo-200 leading-relaxed">
              <strong>Seção 19 do Guia Universal (Marcello La Rocca):</strong> Obriga o agente a avaliar a complexidade temporal Big-O e espacial da solução antes de codificar, evitando escolhas ingênuas de arrays ou loops quadráticos O(n²).
            </div>

            <div className="space-y-2">
              {agent.dataStructureGuidelines.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800 group">
                  <span className="text-xs text-slate-300 leading-relaxed pr-3">
                    ⚡ {item}
                  </span>
                  <button
                    onClick={() => removeBigOGuideline(idx)}
                    className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-rose-400 transition p-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <input
                type="text"
                placeholder="+ Adicionar diretriz Big-O (ex: Usar Hash Map para lookups O(1))..."
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    addBigOGuideline((e.target as HTMLInputElement).value);
                    (e.target as HTMLInputElement).value = '';
                  }
                }}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:border-brand-500 focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* TAB 6: FORMATO DE SAÍDA */}
        {activeSubTab === 'output' && (
          <div className="space-y-4 max-w-2xl">
            <p className="text-xs text-slate-400">
              Estrutura esperada na resposta final emitida por este agente:
            </p>

            <div className="space-y-2">
              {agent.outputFormatGuidelines.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800 group">
                  <span className="text-xs text-slate-200 font-mono">
                    {idx + 1}. {item}
                  </span>
                  <button
                    onClick={() => {
                      const list = [...agent.outputFormatGuidelines];
                      list.splice(idx, 1);
                      updateField('outputFormatGuidelines', list);
                    }}
                    className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-rose-400 transition p-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <input
                type="text"
                placeholder="+ Adicionar seção no formato de saída..."
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    const val = (e.target as HTMLInputElement).value.trim();
                    if (val) {
                      updateField('outputFormatGuidelines', [...agent.outputFormatGuidelines, val]);
                      (e.target as HTMLInputElement).value = '';
                    }
                  }
                }}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:border-brand-500 focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* TAB 7: INSTRUÇÕES CUSTOMIZADAS */}
        {activeSubTab === 'custom' && (
          <div className="space-y-3 max-w-2xl">
            <label className="block text-xs font-semibold text-slate-300">
              Instruções Específicas / Prompt Adicional (Markdown)
            </label>
            <textarea
              rows={8}
              value={agent.customInstructions || ''}
              onChange={e => updateField('customInstructions', e.target.value)}
              placeholder="Adicione diretrizes exclusivas deste agente, regras de negócio personalizadas, integrações de APIs específicas ou restrições especiais do time..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-mono text-white focus:border-brand-500 focus:outline-none leading-relaxed"
            />
          </div>
        )}

      </div>

    </div>
  );
};
