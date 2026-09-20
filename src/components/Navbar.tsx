import React from 'react';
import { Bot, Settings, Download, FolderArchive, Layers, BookOpen, Sparkles } from 'lucide-react';
import { ProjectConfig } from '../types/agent';
import { STACKS } from '../data/stacks';

interface NavbarProps {
  project: ProjectConfig;
  onOpenProjectModal: () => void;
  onOpenBundleModal: () => void;
  activeTab: 'editor' | 'catalog' | 'bundle';
  setActiveTab: (tab: 'editor' | 'catalog' | 'bundle') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  project,
  onOpenProjectModal,
  onOpenBundleModal,
  activeTab,
  setActiveTab,
}) => {
  const currentStack = STACKS[project.stack];

  return (
    <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Branding */}
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-brand-500/20">
            <Bot className="h-6 w-6 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-brand-300 bg-clip-text text-transparent">
                AgentMD Studio
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20">
                Guia Universal
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Gerador de Especificações Agênticas Full-Stack
            </p>
          </div>
        </div>

        {/* Center: Tabs */}
        <div className="flex items-center space-x-1 bg-slate-950/60 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setActiveTab('editor')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center space-x-1.5 ${
              activeTab === 'editor'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Editor de Agente</span>
          </button>

          <button
            onClick={() => setActiveTab('catalog')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center space-x-1.5 ${
              activeTab === 'catalog'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>Catálogo (12 Agentes)</span>
          </button>

          <button
            onClick={() => setActiveTab('bundle')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center space-x-1.5 ${
              activeTab === 'bundle'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <FolderArchive className="h-3.5 w-3.5" />
            <span>Ecossistema Completo</span>
          </button>
        </div>

        {/* Right: Project Pill & Quick Actions */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenProjectModal}
            className="flex items-center space-x-2 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 rounded-lg px-3 py-1.5 transition text-left group"
          >
            <Settings className="h-4 w-4 text-slate-400 group-hover:text-brand-400 transition" />
            <div className="text-xs">
              <div className="font-semibold text-slate-200 leading-tight">
                {project.projectName}
              </div>
              <div className="text-[10px] text-brand-400 truncate max-w-[120px]">
                {currentStack?.name.replace('Variante ', '')}
              </div>
            </div>
          </button>

          <button
            onClick={onOpenBundleModal}
            className="hidden sm:flex items-center space-x-1.5 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white px-3.5 py-1.5 rounded-lg text-xs font-medium shadow-md shadow-brand-600/20 transition"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Exportar .ZIP</span>
          </button>
        </div>

      </div>
    </header>
  );
};
