#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { UNIVERSAL_AGENTS, STACKS, assembleProjectBundle } from '../server/generatorCore.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Parse args
const args = process.argv.slice(2);
let projectName = 'MeuProjetoAgente';
let domain = 'Gestao Operacional e Negocios';
let stack = 'typescript';
let outputDir = 'output-agents';

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--project' && args[i + 1]) projectName = args[++i];
  if (args[i] === '--domain' && args[i + 1]) domain = args[++i];
  if (args[i] === '--stack' && args[i + 1]) stack = args[++i];
  if (args[i] === '--out' && args[i + 1]) outputDir = args[++i];
}

console.log(`\n🤖 AgentMD Studio — Gerador Agêntico CLI`);
console.log(`========================================`);
console.log(`Projeto: ${projectName}`);
console.log(`Domínio: ${domain}`);
console.log(`Stack:   ${stack}`);
console.log(`Destino: ${outputDir}\n`);

const projectConfig = {
  projectName,
  domain,
  stack,
  database: 'PostgreSQL',
  entities: ['Usuario', 'Item', 'Relatorio'],
  features: ['Autenticacao', 'Gestao de Dados'],
  securityLevel: 'high',
  useGraphify: true,
  outputFormat: 'claude',
};

const resolvedTarget = path.resolve(rootDir, outputDir);
const bundleFiles = assembleProjectBundle(projectConfig, UNIVERSAL_AGENTS);

let count = 0;
for (const file of bundleFiles) {
  const fullPath = path.join(resolvedTarget, file.path);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(fullPath, file.content, 'utf-8');
  console.log(`  ✓ ${file.path}`);
  count++;
}

console.log(`\n🎉 Sucesso! ${count} arquivos gerados com conformidade total com o Guia Universal em:\n   ${resolvedTarget}\n`);
