import React, { useState } from 'react';
import { Copy, Check, Download, HardDrive, FileCode, CheckCircle, Eye, Code } from 'lucide-react';
import { downloadTextFile } from '../services/bundleExporter';
import { ComplianceCheck } from '../types/agent';
import { ComplianceReport } from './ComplianceReport';

interface MarkdownPreviewProps {
  content: string;
  filename: string;
  filePath?: string;
  complianceChecks: ComplianceCheck[];
  onSaveToDisk?: () => Promise<boolean>;
}

export const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({
  content,
  filename,
  filePath,
  complianceChecks,
  onSaveToDisk,
}) => {
  const [copied, setCopied] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<'raw' | 'rendered'>('raw');

  const lines = content.split('\n').length;
  const chars = content.length;
  const estimatedTokens = Math.ceil(chars / 4);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveDisk = async () => {
    if (!onSaveToDisk) return;
    setIsSaving(true);
    setSaveMessage(null);
    try {
      const ok = await onSaveToDisk();
      if (ok) {
        setSaveMessage('Arquivo salvo com sucesso!');
        setTimeout(() => setSaveMessage(null), 3000);
      } else {
        setSaveMessage('Erro ao salvar no disco local.');
      }
    } catch {
      setSaveMessage('Falha na comunicação com o servidor.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col h-full shadow-2xl">
      
      {/* Header Bar */}
      <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          <FileCode className="h-4 w-4 text-brand-400" />
          <span className="font-mono text-xs text-white font-bold tracking-tight truncate">
            {filePath || filename}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-1.5">
          {/* Mode Switch */}
          <div className="flex bg-slate-900 border border-slate-800 rounded-lg p-0.5 mr-2">
            <button
              onClick={() => setPreviewMode('raw')}
              className={`px-2 py-1 rounded text-[11px] font-semibold flex items-center space-x-1 transition ${
                previewMode === 'raw' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code className="h-3 w-3" />
              <span>Raw</span>
            </button>
            <button
              onClick={() => setPreviewMode('rendered')}
              className={`px-2 py-1 rounded text-[11px] font-semibold flex items-center space-x-1 transition ${
                previewMode === 'rendered' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="h-3 w-3" />
              <span>Formatado</span>
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition flex items-center space-x-1 text-xs"
            title="Copiar Markdown"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            <span className="hidden sm:inline">{copied ? 'Copiado!' : 'Copiar'}</span>
          </button>

          <button
            onClick={() => downloadTextFile(content, filename)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition flex items-center space-x-1 text-xs"
            title="Baixar arquivo .md"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Baixar</span>
          </button>

          {onSaveToDisk && (
            <button
              onClick={handleSaveDisk}
              disabled={isSaving}
              className="p-1.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-semibold transition flex items-center space-x-1 text-xs shadow-md shadow-brand-500/20"
              title="Salvar no diretório do projeto"
            >
              <HardDrive className="h-4 w-4" />
              <span className="hidden sm:inline">{isSaving ? 'Salvando...' : 'Salvar no Projeto'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Save Notification */}
      {saveMessage && (
        <div className="bg-brand-950/80 border-b border-brand-800/60 px-4 py-2 text-xs text-brand-200 flex items-center justify-between">
          <span>{saveMessage}</span>
          <button onClick={() => setSaveMessage(null)} className="text-brand-400 hover:text-white text-xs">✕</button>
        </div>
      )}

      {/* Stats Bar */}
      <div className="bg-slate-900/90 border-b border-slate-800 px-4 py-2 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center space-x-4">
          <span>Linhas: <strong className="text-slate-200">{lines}</strong></span>
          <span>Caracteres: <strong className="text-slate-200">{chars}</strong></span>
          <span>Tokens estimados: <strong className="text-brand-400">~{estimatedTokens}</strong></span>
        </div>
        <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
          Especificação Agêntica v1.0
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-slate-950/80 font-mono text-xs leading-relaxed text-slate-300">
        {previewMode === 'raw' ? (
          <pre className="whitespace-pre-wrap break-words">{content}</pre>
        ) : (
          <div className="prose prose-invert max-w-none prose-headings:text-slate-100 prose-a:text-brand-400 prose-code:text-brand-300">
            {content.split('\n\n').map((block, idx) => {
              if (block.startsWith('# ')) return <h1 key={idx} className="text-xl font-bold border-b border-slate-800 pb-2 mb-3 mt-4 text-white">{block.replace('# ', '')}</h1>;
              if (block.startsWith('## ')) return <h2 key={idx} className="text-base font-bold text-brand-300 mt-4 mb-2">{block.replace('## ', '')}</h2>;
              if (block.startsWith('### ')) return <h3 key={idx} className="text-sm font-semibold text-slate-200 mt-3 mb-1">{block.replace('### ', '')}</h3>;
              if (block.startsWith('---')) return <hr key={idx} className="border-slate-800 my-4" />;
              if (block.startsWith('- ')) {
                const items = block.split('\n');
                return (
                  <ul key={idx} className="list-disc pl-5 space-y-1 my-2">
                    {items.map((it, iIdx) => <li key={iIdx}>{it.replace(/^- (\[ \])?/, '').trim()}</li>)}
                  </ul>
                );
              }
              return <p key={idx} className="my-2 leading-relaxed text-slate-300 font-sans">{block}</p>;
            })}
          </div>
        )}
      </div>

      {/* Compliance Audit Footer */}
      <div className="p-3 bg-slate-900 border-t border-slate-800">
        <ComplianceReport checks={complianceChecks} />
      </div>

    </div>
  );
};
