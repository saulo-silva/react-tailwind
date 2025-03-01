// fix-paths.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Função para percorrer diretórios recursivamente
function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

// Criar cópias de arquivos com nomes em minúsculas
function createLowercaseFiles() {
  // Converter componentes/stepper/index.js
  try {
    if (fs.existsSync('temp/components/stepper/index.js')) {
      const content = fs.readFileSync('temp/components/stepper/index.js', 'utf8');
      const fixed = content.replace('./Stepper.jsx', './stepper.jsx');
      fs.writeFileSync('temp/components/stepper/index.js', fixed);
      console.log('✓ Corrigido: components/stepper/index.js');
    }
  } catch (err) {
    console.error('Erro ao corrigir stepper/index.js:', err);
  }

  // Procurar por todas as importações de Layout.jsx
  try {
    walkDir('temp', (filePath) => {
      if (filePath.endsWith('.jsx') || filePath.endsWith('.js')) {
        const content = fs.readFileSync(filePath, 'utf8');
        if (content.includes('./layouts/Layout.jsx')) {
          const fixed = content.replace('./layouts/Layout.jsx', './layouts/layout.jsx');
          fs.writeFileSync(filePath, fixed);
          console.log(`✓ Corrigido: ${filePath}`);
        }
      }
    });
  } catch (err) {
    console.error('Erro ao procurar importações de Layout.jsx:', err);
  }

  // Criar cópias em minúsculas de arquivos
  if (fs.existsSync('temp/layouts/Layout.jsx')) {
    fs.copyFileSync('temp/layouts/Layout.jsx', 'temp/layouts/layout.jsx');
    console.log('✓ Criado: layouts/layout.jsx');
  }

  if (fs.existsSync('temp/components/stepper/stepper.jsx')) {
    fs.copyFileSync('temp/components/stepper/stepper.jsx', 'temp/components/stepper/Stepper.jsx');
    console.log('✓ Criado: components/stepper/Stepper.jsx');
  }

  console.log('✓ Processo de correção de caminhos concluído');
}

// Executar as correções
createLowercaseFiles();