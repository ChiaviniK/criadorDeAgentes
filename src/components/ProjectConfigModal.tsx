import React, { useState } from 'react';
import { X, Check, Server, Shield, Database, Cpu, Network } from 'lucide-react';
import { ProjectConfig, StackVariantId } from '../types/agent';
import { STACKS } from '../data/stacks';

interface ProjectConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectConfig;
  onSave: (updated: ProjectConfig) => void;
}

export const ProjectConfigModal: React.FC<ProjectConfigModalProps> = ({
  isOpen,
  onClose,
  project,
  onSave,
}) => {
  const [formData, setFormData] = useState<ProjectConfig>({ ...project });
  const [entitiesText, setEntitiesText] = useState(project.entities.join(', '));
  const [featuresText, setFeaturesText] = useState(project.features.join(', '));

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const entities = entitiesText.split(',').map(s => s.trim()).filter(Boolean);
    const features = featuresText.split(',').map(s => s.trim()).filter(Boolean);
    onSave({
      ...formData,
      entities: entities.length > 0 ? entities : ['Usuario', 'Item'],
      features: features.length > 0 ? features : ['Autenticação', 'Dashboard'],
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center space-x-2">
            <Cpu className="h-5 w-5 text-brand-400" />
            <h2 className="text-lg font-bold text-white">Configurações do Projeto & Stack</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 flex-1">
          
          {/* Nome e Domínio */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Nome do Projeto
              </label>
              <input
                type="text"
                value={formData.projectName}
                onChange={e => setFormData({ ...formData, projectName: e.target.value })}
                placeholder="Ex: PlataformaAgentes, SaaSFinanceiro"
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Domínio de Negócio
              </label>
              <input
                type="text"
                value={formData.domain}
                onChange={e => setFormData({ ...formData, domain: e.target.value })}
                placeholder="Ex: Gestão de Contratos e Faturas"
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition"
              />
            </div>
          </div>

          {/* Stack Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Stack Tecnológica Oficial (Guia Seção 1 & 9)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {(Object.keys(STACKS) as StackVariantId[]).map(stackKey => {
                const stack = STACKS[stackKey];
                const isSelected = formData.stack === stackKey;
                return (
                  <button
                    key={stackKey}
                    type="button"
                    onClick={() => setFormData({ ...formData, stack: stackKey, database: stack.database.split('/')[0].trim() })}
                    className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                      isSelected
                        ? 'border-brand-500 bg-brand-500/10 ring-1 ring-brand-500/30'
                        : 'border-slate-800 bg-slate-950/40 hover:border-slate-700 hover:bg-slate-800/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-white">{stack.name}</span>
                      {isSelected && <Check className="h-4 w-4 text-brand-400" />}
                    </div>
                    <span className="text-[11px] text-slate-400 line-clamp-1">{stack.badge}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Banco e Entidades */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center space-x-1.5">
                <Database className="h-3.5 w-3.5 text-brand-400" />
                <span>Banco de Dados Principal</span>
              </label>
              <input
                type="text"
                value={formData.database}
                onChange={e => setFormData({ ...formData, database: e.target.value })}
                placeholder="Ex: PostgreSQL, MySQL, SQL Server"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center space-x-1.5">
                <Shield className="h-3.5 w-3.5 text-brand-400" />
                <span>Nível de Segurança / Criticidade</span>
              </label>
              <select
                value={formData.securityLevel}
                onChange={e => setFormData({ ...formData, securityLevel: e.target.value as any })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition"
              >
                <option value="standard">Padrão (OWASP Top 10 + Clean Code)</option>
                <option value="high">Alto (Financeiro / Saúde / LGPD Rigorosa)</option>
                <option value="critical">Crítico (PCI-DSS / Dados Ultrassensíveis)</option>
              </select>
            </div>
          </div>

          {/* Entidades Principais */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Entidades Centrais do Domínio (separadas por vírgula)
            </label>
            <input
              type="text"
              value={entitiesText}
              onChange={e => setEntitiesText(e.target.value)}
              placeholder="Ex: Usuario, Conta, Pagamento, Assinatura, Fatura"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition"
            />
            <span className="text-[11px] text-slate-500 mt-1 block">
              Usadas para gerar os arquivos de modelo em docs/specs/domain.md
            </span>
          </div>

          {/* Funcionalidades Iniciais */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Funcionalidades de Escopo Inicial (separadas por vírgula)
            </label>
            <input
              type="text"
              value={featuresText}
              onChange={e => setFeaturesText(e.target.value)}
              placeholder="Ex: Autenticação JWT, Checkout com cartão, Relatório analítico"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition"
            />
          </div>

          {/* Graphify Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-800 bg-slate-950/60">
            <div className="flex items-center space-x-3">
              <Network className="h-5 w-5 text-indigo-400" />
              <div>
                <div className="text-xs font-bold text-white">Habilitar Memória Persistente com Graphify</div>
                <div className="text-[11px] text-slate-400">
                  Instrui os agentes a consultar o grafo de conhecimento antes de ler arquivos (reduz tokens em até 70x).
                </div>
              </div>
            </div>
            <input
              type="checkbox"
              checked={formData.useGraphify}
              onChange={e => setFormData({ ...formData, useGraphify: e.target.checked })}
              className="h-4 w-4 rounded border-slate-700 text-brand-500 focus:ring-brand-500 bg-slate-900 cursor-pointer"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-500 text-white shadow-lg shadow-brand-500/20 transition flex items-center space-x-1.5"
            >
              <Check className="h-4 w-4" />
              <span>Salvar Configuração</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
