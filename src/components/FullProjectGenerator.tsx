import React, { useState } from 'react';
import { 
  FolderArchive, Download, HardDrive, FileText, CheckCircle2, 
  Layers, Shield, Wrench, FileCode, Check, Eye, AlertCircle
} from 'lucide-react';
import { AgentDefinition, GeneratedFile, ProjectConfig } from '../types/agent';
import { assembleProjectBundle, downloadBlob, generateZipBundle } from '../services/bundleExporter';

interface FullProjectGeneratorProps {
  project: ProjectConfig;
  agents: AgentDefinition[];
  onSelectFileForPreview: (file: GeneratedFile) => void;
}

export const FullProjectGenerator: React.FC<FullProjectGeneratorProps> = ({
  project,
  agents,
  onSelectFileForPreview,
}) => {
  const [targetDir, setTargetDir] = useState<string>('output-agents');
  const [isExportingZip, setIsExportingZip] = useState<boolean>(false);
  const [isSavingLocal, setIsSavingLocal] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<{ success: boolean; message: string } | null>(null);

  const bundleFiles = assembleProjectBundle(project, agents);

  // Group files by directory category
  const agentFiles = bundleFiles.filter(f => f.category === 'agent');
  const ruleFiles = bundleFiles.filter(f => f.category === 'rule');
  const skillFiles = bundleFiles.filter(f => f.category === 'skill');
  const specFiles = bundleFiles.filter(f => f.category === 'spec');
  const rootFiles = bundleFiles.filter(f => f.category === 'root');

  const handleDownloadZip = async () => {
    setIsExportingZip(true);
    try {
      const zipBlob = await generateZipBundle(bundleFiles);
      const zipFilename = `${project.projectName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-agent-specs.zip`;
      downloadBlob(zipBlob, zipFilename);
    } catch (err) {
      console.error(err);
    } finally {
      setIsExportingZip(false);
    }
  };

  const handleSaveToWorkspace = async () => {
    setIsSavingLocal(true);
    setSaveStatus(null);
    try {
      const response = await fetch('/api/save-files', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetDir: targetDir.trim() || 'output-agents',
          files: bundleFiles.map(f => ({ path: f.path, content: f.content }))
        })
      });

      const data = await response.json();
      if (data.success) {
        setSaveStatus({
          success: true,
          message: `${data.savedCount} arquivos gravados com sucesso em ${data.targetDir}`
        });
      } else {
        setSaveStatus({
          success: false,
          message: data.error || 'Erro ao gravar arquivos localmente.'
        });
      }
    } catch (err: any) {
      setSaveStatus({
        success: false,
        message: 'Servidor local não respondeu. Utilize o download em .ZIP.'
      });
    } finally {
      setIsSavingLocal(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-brand-950/40 to-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="flex items-center space-x-2 text-brand-400 text-xs font-bold uppercase tracking-wider mb-2">
            <FolderArchive className="h-4 w-4" />
            <span>Ecossistema Agêntico Completo</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Gerador de Pacote Universal de Especificações
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
            Gera toda a estrutura de documentação agêntica definida na Seção 3 do Guia Universal:
            <strong className="text-white"> CLAUDE.md</strong>, 
            <strong className="text-white"> docs/specs/</strong>, 
            <strong className="text-white"> .claude/agents/</strong> ({agents.length} agentes), 
            <strong className="text-white"> .claude/rules/</strong> (7 regras) e 
            <strong className="text-white"> .claude/skills/</strong> (4 skills).
          </p>

          {/* Action Row */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={handleDownloadZip}
              disabled={isExportingZip}
              className="bg-brand-600 hover:bg-brand-500 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-lg shadow-brand-500/20 flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>{isExportingZip ? 'Compactando...' : 'Baixar Pacote .ZIP Completo'}</span>
            </button>

            <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-1">
              <input
                type="text"
                value={targetDir}
                onChange={e => setTargetDir(e.target.value)}
                placeholder="Diretório de destino (ex: output-agents)"
                className="bg-transparent px-3 py-1.5 text-xs text-white focus:outline-none w-48 font-mono"
              />
              <button
                onClick={handleSaveToWorkspace}
                disabled={isSavingLocal}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center space-x-1.5"
              >
                <HardDrive className="h-3.5 w-3.5 text-brand-400" />
                <span>{isSavingLocal ? 'Salvando...' : 'Gravar no Disco'}</span>
              </button>
            </div>

            <span className="text-xs text-slate-400 font-medium">
              Total: {bundleFiles.length} arquivos gerados
            </span>
          </div>

          {/* Status Message */}
          {saveStatus && (
            <div className={`mt-4 p-3 rounded-xl border text-xs flex items-center space-x-2 ${
              saveStatus.success
                ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-200'
                : 'bg-rose-950/40 border-rose-800/60 text-rose-200'
            }`}>
              {saveStatus.success ? <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" /> : <AlertCircle className="h-4 w-4 text-rose-400 flex-shrink-0" />}
              <span>{saveStatus.message}</span>
            </div>
          )}
        </div>
      </div>

      {/* Directory Structure Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: File Tree Breakdown */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Layers className="h-4 w-4 text-brand-400" />
              <span>Árvore de Arquivos do Ecossistema</span>
            </h3>
            <span className="text-xs text-slate-500 font-mono">
              Clique em qualquer item para inspecionar
            </span>
          </div>

          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
            
            {/* Root Config */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center space-x-1">
                <FileCode className="h-3.5 w-3.5 text-slate-400" />
                <span>Raiz do Projeto</span>
              </div>
              {rootFiles.map(f => (
                <div
                  key={f.path}
                  onClick={() => onSelectFileForPreview(f)}
                  className="p-2 rounded-lg bg-slate-950/50 border border-slate-800 hover:border-brand-500/50 flex items-center justify-between cursor-pointer transition group"
                >
                  <span className="text-xs font-mono text-brand-300 font-semibold">{f.path}</span>
                  <span className="text-[10px] text-slate-400">{f.description}</span>
                </div>
              ))}
            </div>

            {/* Docs Specs */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center space-x-1">
                <FileText className="h-3.5 w-3.5 text-slate-400" />
                <span>docs/specs/ (Especificações do Sistema)</span>
              </div>
              <div className="space-y-1">
                {specFiles.map(f => (
                  <div
                    key={f.path}
                    onClick={() => onSelectFileForPreview(f)}
                    className="p-2 rounded-lg bg-slate-950/50 border border-slate-800 hover:border-brand-500/50 flex items-center justify-between cursor-pointer transition group"
                  >
                    <span className="text-xs font-mono text-slate-200">{f.path}</span>
                    <span className="text-[10px] text-slate-400">{f.description}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sub-agents */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center space-x-1">
                <Shield className="h-3.5 w-3.5 text-slate-400" />
                <span>.claude/agents/ (Sub-agentes Especializados)</span>
              </div>
              <div className="space-y-1">
                {agentFiles.map(f => (
                  <div
                    key={f.path}
                    onClick={() => onSelectFileForPreview(f)}
                    className="p-2 rounded-lg bg-slate-950/50 border border-slate-800 hover:border-brand-500/50 flex items-center justify-between cursor-pointer transition group"
                  >
                    <span className="text-xs font-mono text-emerald-300">{f.path}</span>
                    <span className="text-[10px] text-slate-400">{f.description}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rules */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center space-x-1">
                <Shield className="h-3.5 w-3.5 text-slate-400" />
                <span>.claude/rules/ (Regras Invioláveis & Qualidade)</span>
              </div>
              <div className="space-y-1">
                {ruleFiles.map(f => (
                  <div
                    key={f.path}
                    onClick={() => onSelectFileForPreview(f)}
                    className="p-2 rounded-lg bg-slate-950/50 border border-slate-800 hover:border-brand-500/50 flex items-center justify-between cursor-pointer transition group"
                  >
                    <span className="text-xs font-mono text-amber-300">{f.path}</span>
                    <span className="text-[10px] text-slate-400">{f.description}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center space-x-1">
                <Wrench className="h-3.5 w-3.5 text-slate-400" />
                <span>.claude/skills/ (Habilidades Operacionais)</span>
              </div>
              <div className="space-y-1">
                {skillFiles.map(f => (
                  <div
                    key={f.path}
                    onClick={() => onSelectFileForPreview(f)}
                    className="p-2 rounded-lg bg-slate-950/50 border border-slate-800 hover:border-brand-500/50 flex items-center justify-between cursor-pointer transition group"
                  >
                    <span className="text-xs font-mono text-sky-300">{f.path}</span>
                    <span className="text-[10px] text-slate-400">{f.description}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Right: How to use guidance */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white mb-3 flex items-center space-x-2">
              <Check className="h-4 w-4 text-emerald-400" />
              <span>Como aplicar no seu projeto</span>
            </h3>

            <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-bold text-white">1. Descompacte na Raiz do Repositório</div>
                <p className="text-slate-400 text-[11px]">
                  Copie os diretórios <code className="text-brand-400">.claude/</code>, <code className="text-brand-400">docs/</code> e o arquivo <code className="text-brand-400">CLAUDE.md</code> diretamente para a raiz do seu projeto.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-bold text-white">2. Inicialize o Grafo de Conhecimento</div>
                <p className="text-slate-400 text-[11px]">
                  Se estiver usando Claude Code ou Antigravity com a skill de Graphify, rode <code className="text-brand-400">/graphify .</code> para indexar os arquivos e economizar até 70x tokens.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-bold text-white">3. Invoque os Agentes por Especialidade</div>
                <p className="text-slate-400 text-[11px]">
                  No Claude Code, invoque via sub-agents automáticos ou use os arquivos como personas guiadas para Antigravity ou Cursor.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>Baseado no Guia Universal de Desenvolvimento Agêntico</span>
            <span className="font-semibold text-brand-400">Multi-Stack</span>
          </div>
        </div>

      </div>

    </div>
  );
};
