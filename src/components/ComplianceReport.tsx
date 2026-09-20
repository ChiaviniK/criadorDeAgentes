import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Info, ShieldCheck } from 'lucide-react';
import { ComplianceCheck } from '../types/agent';

interface ComplianceReportProps {
  checks: ComplianceCheck[];
}

export const ComplianceReport: React.FC<ComplianceReportProps> = ({ checks }) => {
  const errorCount = checks.filter(c => !c.passed && c.severity === 'error').length;
  const warningCount = checks.filter(c => !c.passed && c.severity === 'warning').length;
  const passedCount = checks.filter(c => c.passed).length;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="h-4 w-4 text-brand-400" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
            Conformidade com o Guia Universal
          </h4>
        </div>
        <div className="flex items-center space-x-2 text-[11px] font-semibold">
          <span className="text-emerald-400 flex items-center space-x-1">
            <CheckCircle2 className="h-3 w-3" />
            <span>{passedCount}</span>
          </span>
          {warningCount > 0 && (
            <span className="text-amber-400 flex items-center space-x-1">
              <AlertTriangle className="h-3 w-3" />
              <span>{warningCount}</span>
            </span>
          )}
          {errorCount > 0 && (
            <span className="text-rose-400 flex items-center space-x-1">
              <XCircle className="h-3 w-3" />
              <span>{errorCount}</span>
            </span>
          )}
        </div>
      </div>

      {/* Checks list */}
      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
        {checks.map(check => {
          return (
            <div
              key={check.id}
              className={`p-2 rounded-lg border text-xs flex items-start space-x-2.5 transition ${
                check.passed
                  ? 'bg-slate-950/40 border-slate-800/80 text-slate-300'
                  : check.severity === 'error'
                  ? 'bg-rose-950/20 border-rose-900/40 text-rose-200'
                  : 'bg-amber-950/20 border-amber-900/40 text-amber-200'
              }`}
            >
              <div className="mt-0.5 flex-shrink-0">
                {check.passed ? (
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                ) : check.severity === 'error' ? (
                  <XCircle className="h-3.5 w-3.5 text-rose-400" />
                ) : (
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
                )}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-[11px]">{check.title}</div>
                <div className="text-[10px] text-slate-400 leading-tight mt-0.5">
                  {check.description}
                </div>
                {check.recommendation && (
                  <div className="text-[10px] text-brand-300 mt-1 font-medium bg-slate-950/60 p-1 rounded border border-slate-800">
                    💡 Dica: {check.recommendation}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
