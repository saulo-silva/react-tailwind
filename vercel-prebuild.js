// Versão ES Modules do script
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obter o diretório atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Corrigir a referência de Layout
try {
  const appPath = path.join(__dirname, 'src/App.jsx');
  let content = fs.readFileSync(appPath, 'utf8');
  content = content.replace('./layouts/Layout.jsx', './layouts/layout.jsx');
  fs.writeFileSync(appPath, content);
  console.log('✅ Referência para layout.jsx corrigida');
} catch (error) {
  console.error('❌ Erro ao corrigir referência para layout.jsx:', error.message);
}

// Corrigir a referência de stepper.jsx
try {
  const stepperIndexPath = path.join(__dirname, 'src/components/stepper/index.js');
  let stepperContent = fs.readFileSync(stepperIndexPath, 'utf8');
  stepperContent = stepperContent.replace('./Stepper.jsx', './stepper.jsx');
  fs.writeFileSync(stepperIndexPath, stepperContent);
  console.log('✅ Referência para stepper.jsx corrigida');
} catch (error) {
  console.error('❌ Erro ao corrigir referência para stepper.jsx:', error.message);
}

console.log('✅ Script de pré-build concluído');