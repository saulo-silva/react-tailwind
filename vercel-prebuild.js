const fs = require('fs');
const path = require('path');

// Corrigir a referência de Layout
const appPath = path.join(__dirname, 'src/App.jsx');
let content = fs.readFileSync(appPath, 'utf8');
content = content.replace('./layouts/Layout.jsx', './layouts/layout.jsx');
fs.writeFileSync(appPath, content);

// Corrigir qualquer referência de App.jsx para app.jsx
const mainPath = path.join(__dirname, 'src/main.jsx');
let mainContent = fs.readFileSync(mainPath, 'utf8');
mainContent = mainContent.replace('./App.jsx', './app.jsx');
fs.writeFileSync(mainPath, mainContent);

console.log('✅ Referências de caminho corrigidas com sucesso');

// Adicione ao package.json:
// "prebuild": "node vercel-prebuild.js",