import React, { useState } from 'react';
import { 
  Shield, Code2, Database, Search, TestTube, Cpu, Eye, FileText, 
  Binary, Wrench, Sparkles, Copy, Download, ChevronRight, Filter,
  Stethoscope, HeartPulse, Activity, Calendar, Pill, FileCheck
} from 'lucide-react';
import { AgentDefinition, ProjectConfig } from '../types/agent';
import { generateAgentMarkdown } from '../services/agentGenerator';
import { downloadTextFile } from '../services/bundleExporter';

interface AgentCatalogProps {
  agents: AgentDefinition[];
  project: ProjectConfig;
  onSelectAgent: (agent: AgentDefinition) => void;
  onCloneAgent: (agent: AgentDefinition) => void;
  onNewCustomAgent: () => void;
}

export const AgentCatalog: React.FC<AgentCatalogProps> = ({
  agents,
  project,
  onSelectAgent,
  onCloneAgent,
  onNewCustomAgent,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredAgents = agents.filter(agent => {
    const matchesCategory = selectedCategory === 'all' || agent.category === selectedCategory;
    const matchesQuery = 
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.roleTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const getAgentIcon = (id: string) => {
    if (id.includes('medico-assistente')) return <Stethoscope className="h-5 w-5 text-rose-400" />;
    if (id.includes('triagem-protocolo')) return <Activity className="h-5 w-5 text-amber-400" />;
    if (id.includes('gestor-agenda')) return <Calendar className="h-5 w-5 text-sky-400" />;
    if (id.includes('faturamento-tiss')) return <FileCheck className="h-5 w-5 text-emerald-400" />;
    if (id.includes('seguranca-privacidade-pep')) return <Shield className="h-5 w-5 text-indigo-400" />;
    if (id.includes('interacao-medicamentosa')) return <Pill className="h-5 w-5 text-fuchsia-400" />;
    if (id.includes('security')) return <Shield className="h-5 w-5 text-rose-400" />;
    if (id.includes('code-reviewer')) return <Code2 className="h-5 w-5 text-emerald-400" />;
    if (id.includes('backend')) return <Cpu className="h-5 w-5 text-sky-400" />;
    if (id.includes('frontend')) return <Sparkles className="h-5 w-5 text-violet-400" />;
    if (id.includes('database')) return <Database className="h-5 w-5 text-amber-400" />;
    if (id.includes('researcher')) return <Search className="h-5 w-5 text-cyan-400" />;
    if (id.includes('test')) return <TestTube className="h-5 w-5 text-teal-400" />;
    if (id.includes('devops')) return <Wrench className="h-5 w-5 text-orange-400" />;
    if (id.includes('accessibility')) return <Eye className="h-5 w-5 text-fuchsia-400" />;
    if (id.includes('doc')) return <FileText className="h-5 w-5 text-lime-400" />;
    if (id.includes('data-structure')) return <Binary className="h-5 w-5 text-indigo-400" />;
    return <Cpu className="h-5 w-5 text-brand-400" />;
  };

  const categories = [
    { id: 'all', label: 'Todos os Agentes' },
    { id: 'medical', label: 'Médicos & Clínicas 🩺' },
    { id: 'core', label: 'Núcleo / Desenvolvimento' },
    { id: 'review', label: 'Revisão & Guardrails' },
    { id: 'quality', label: 'Qualidade & Testes' },
    { id: 'specialist', label: 'Especialistas & Big-O' },
  ];


  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-brand-950/40 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
        <div className="max-w-2xl relative z-10">
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Catálogo de Agentes Universais
          </h2>
          <p className="text-sm text-slate-400 mt-1.5">
            Modelos de sub-agentes extraídos diretamente do Guia Universal de Desenvolvimento Agêntico (Seção 11 e Seção 19). Cada agente é configurado com ferramentas mínimas necessárias, checklists rigorosos e guardrails inegociáveis.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={onNewCustomAgent}
              className="bg-brand-600 hover:bg-brand-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow-lg shadow-brand-500/20 flex items-center space-x-1.5"
            >
              <Sparkles className="h-4 w-4" />
              <span>Criar Novo Agente Personalizado</span>
            </button>
            <span className="text-xs text-slate-500">
              Total disponível: {agents.length} agentes pré-construídos
            </span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
        <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <Filter className="h-4 w-4 text-slate-500 mr-1 hidden sm:block" />
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat.id
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="h-4 w-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Buscar por nome ou papel..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-brand-500"
          />
        </div>
      </div>

      {/* Grid of Agents */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAgents.map(agent => {
          const totalChecks = agent.checklists.reduce((acc, c) => acc + c.items.length, 0);
          return (
            <div
              key={agent.id}
              className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-xl p-5 flex flex-col justify-between transition-all hover:shadow-xl hover:shadow-brand-500/5 group"
            >
              <div>
                {/* Card Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/60 group-hover:scale-105 transition">
                      {getAgentIcon(agent.id)}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-white group-hover:text-brand-300 transition">
                        {agent.roleTitle}
                      </h3>
                      <div className="text-[11px] font-mono text-brand-400">
                        .{agent.name}.md
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {agent.model}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-400 line-clamp-3 mb-4 leading-relaxed">
                  {agent.description}
                </p>

                {/* Tools Allowed */}
                <div className="mb-4">
                  <div className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 mb-1.5">
                    Ferramentas Permitidas:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {agent.tools.map(tool => (
                      <span
                        key={tool}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-950 text-slate-300 border border-slate-800"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-800/60 text-[11px] text-slate-400 mb-4">
                  <div>
                    <span className="text-slate-500">Checklists:</span>{' '}
                    <span className="font-semibold text-slate-200">{totalChecks} itens</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Proibições:</span>{' '}
                    <span className="font-semibold text-rose-300">{agent.inviolableRules.length} regras</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2 pt-2">
                <button
                  onClick={() => onSelectAgent(agent)}
                  className="flex-1 bg-brand-600/90 hover:bg-brand-500 text-white text-xs font-semibold py-2 px-3 rounded-lg transition flex items-center justify-center space-x-1"
                >
                  <span>Abrir & Editar</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>

                <button
                  onClick={() => onCloneAgent(agent)}
                  title="Clonar como novo agente"
                  className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition"
                >
                  <Copy className="h-4 w-4" />
                </button>

                <button
                  onClick={() => {
                    const md = generateAgentMarkdown(agent, project);
                    downloadTextFile(md, `${agent.name}.md`);
                  }}
                  title="Baixar arquivo .md"
                  className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition"
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
