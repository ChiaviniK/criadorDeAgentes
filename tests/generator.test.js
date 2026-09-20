import assert from 'assert';
import { UNIVERSAL_AGENTS, STACKS, generateAgentMarkdown, assembleProjectBundle, validateAgentCompliance } from '../server/generatorCore.js';


console.log('🧪 Iniciando Testes Automatizados do AgentMD Studio...\n');

const mockProject = {
  projectName: 'TestFinTech',
  domain: 'Banking & Pagamentos',
  stack: 'python',
  database: 'PostgreSQL',
  entities: ['Conta', 'Transacao'],
  features: ['PIX', 'Extrato'],
  securityLevel: 'critical',
  useGraphify: true,
  outputFormat: 'claude',
};

// Test 1: Verificar se os 12 agentes pré-configurados existem
console.log('1. Verificando catálogo de agentes universais...');
assert(UNIVERSAL_AGENTS.length >= 12, 'Deve haver pelo menos 12 agentes pré-configurados');
console.log(`   ✓ ${UNIVERSAL_AGENTS.length} agentes catalogados com sucesso.`);

// Test 2: Testar geração de Markdown para o agente backend
console.log('\n2. Testando geração de Markdown para backend.md...');
const backendAgent = UNIVERSAL_AGENTS.find(a => a.id === 'backend');
assert(backendAgent, 'Agente backend deve existir');
const backendMd = generateAgentMarkdown(backendAgent, mockProject);

assert(backendMd.includes('---'), 'Deve conter frontmatter delimitado por ---');
assert(backendMd.includes('name: backend'), 'Frontmatter deve conter name');
assert(backendMd.includes('tools: Read, Edit, Write, Bash, Grep, Glob'), 'Frontmatter deve conter tools');
assert(backendMd.includes('Variante B — Python'), 'Deve refletir a stack Python configurada');
assert(backendMd.includes('Checklists Obrigatórios de Validação'), 'Deve conter checklists');
assert(backendMd.includes('Eficiência, Estruturas de Dados e Análise Big-O'), 'Deve conter Seção 19');
console.log('   ✓ Markdown do agente backend gerado perfeitamente com metadados e regras.');

// Test 3: Testar validador de compliance (Princípio do Menor Privilégio)
console.log('\n3. Testando validador de conformidade agêntica...');
const reviewer = UNIVERSAL_AGENTS.find(a => a.id === 'security-reviewer');
assert(reviewer, 'security-reviewer deve existir');
let checks = validateAgentCompliance(reviewer);
assert(checks.every(c => c.passed || c.severity !== 'error'), 'security-reviewer original deve passar nas checagens críticas');

// Forçar violação de menor privilégio
const badReviewer = {
  ...reviewer,
  tools: [...reviewer.tools, 'Write'],
};
const badChecks = validateAgentCompliance(badReviewer);
const violation = badChecks.find(c => c.id === 'least-privilege-violation');
assert(violation, 'Deve acusar violação do menor privilégio ao adicionar Write a um revisor');
assert(!violation.passed, 'A checagem deve falhar');
console.log('   ✓ Validador de compliance interceptou violação de menor privilégio corretamente.');

// Test 4: Testar montagem do ecossistema completo (bundle)
console.log('\n4. Testando montagem do ecossistema completo de arquivos...');
const bundle = assembleProjectBundle(mockProject, UNIVERSAL_AGENTS);
assert(bundle.length >= 24, `Pacote deve conter mais de 24 arquivos (contém: ${bundle.length})`);

const hasClaudeMd = bundle.some(f => f.path === 'CLAUDE.md');
const hasMainMd = bundle.some(f => f.path === 'docs/specs/main.md');
const hasBackendMd = bundle.some(f => f.path === '.claude/agents/backend.md');
const hasBigORule = bundle.some(f => f.path === '.claude/rules/data-structures-performance.md');
const hasGraphifySkill = bundle.some(f => f.path === '.claude/skills/graphify-context/SKILL.md');

assert(hasClaudeMd, 'Deve incluir CLAUDE.md');
assert(hasMainMd, 'Deve incluir docs/specs/main.md');
assert(hasBackendMd, 'Deve incluir .claude/agents/backend.md');
assert(hasBigORule, 'Deve incluir regra de Big-O');
assert(hasGraphifySkill, 'Deve incluir skill de Graphify');

console.log(`   ✓ Pacote completo montado com ${bundle.length} arquivos.`);
console.log('\n✅ Todos os testes passaram com sucesso!\n');
