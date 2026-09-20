import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Serve built frontend assets
app.use(express.static(path.join(rootDir, 'dist')));


// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Save multiple files directly to disk
app.post('/api/save-files', async (req, res) => {
  try {
    const { targetDir = 'output-agents', files = [] } = req.body;
    
    // Resolve absolute path safely within the workspace
    const resolvedTarget = path.resolve(rootDir, targetDir);

    let savedCount = 0;
    const savedFiles = [];

    for (const file of files) {
      if (!file.path || file.content === undefined) continue;
      
      const fullFilePath = path.join(resolvedTarget, file.path);
      const fileDir = path.dirname(fullFilePath);

      // Ensure directory exists
      if (!fs.existsSync(fileDir)) {
        fs.mkdirSync(fileDir, { recursive: true });
      }

      fs.writeFileSync(fullFilePath, file.content, 'utf-8');
      savedFiles.push(file.path);
      savedCount++;
    }

    res.json({
      success: true,
      targetDir: resolvedTarget,
      savedCount,
      files: savedFiles,
    });
  } catch (error) {
    console.error('Erro ao salvar arquivos:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// List files currently generated in the target directory
app.get('/api/list-output', (req, res) => {
  try {
    const targetDir = req.query.targetDir || 'output-agents';
    const resolvedTarget = path.resolve(rootDir, targetDir);

    if (!fs.existsSync(resolvedTarget)) {
      return res.json({ exists: false, files: [] });
    }

    function getAllFiles(dirPath, arrayOfFiles = []) {
      const entries = fs.readdirSync(dirPath, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);
        if (entry.isDirectory()) {
          getAllFiles(fullPath, arrayOfFiles);
        } else {
          arrayOfFiles.push(path.relative(resolvedTarget, fullPath).replace(/\\/g, '/'));
        }
      }
      return arrayOfFiles;
    }

    const files = getAllFiles(resolvedTarget);
    res.json({ exists: true, targetDir: resolvedTarget, files });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// SPA fallback
app.get('*', (req, res) => {
  const indexPath = path.join(rootDir, 'dist', 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.send('Frontend ainda não compilado. Execute npm run build.');
  }
});

app.listen(PORT, () => {

  console.log(`AgentMD Studio API Server executando na porta ${PORT}`);
});
