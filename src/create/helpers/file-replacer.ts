import path from 'path'
import fs from 'fs'
import Messages, { currentLang } from '../../messages'

const i18nTemplate: object = Messages.i18nTemplate

function contentReplacer(content, name, value, mainName?) {
  mainName = mainName || 'PROJECT';
  return content.replace(new RegExp(`{{${mainName}_${name}}}`, 'g'), value);
};

function replaceLangs(content) {
  const i18nReplacer = (name, value) => {
    content = contentReplacer(content, name, value, 'i18n');
  };

  Object.entries(i18nTemplate).forEach(v => {
    if (v[0] === 'links') {
      return v[1].forEach((link, i) => {
        i18nReplacer(`link${i}:0`, link[0]);
        i18nReplacer(`link${i}:1`, link[1]);
      });
    }
    if (v[0] === 'nulla') {
      i18nReplacer('nulla.link', v[1].link);
      i18nReplacer(`nulla.altImage`, v[1].altImage);
      return;
    }
    i18nReplacer(v[0], v[1]);
  });

  return content;
};

const files = [
  'package.json', 'README.md', '.env', '.env.example',
  'client.js', 'server.js',
  'client.ts', 'server.ts',
  'src/Application.jsx', 'src/Home.jsx',
  'src/Application.tsx', 'src/Home.tsx'
]

export default function({
  appPath,
  appName
}) {
  const srcFolder = 'vscode://file/' + appPath
  const projectName = appName
  for (const file of files) {
    try {
      let content = fs.readFileSync(
        path.join(appPath, file),
        'utf8'
      );
      content = contentReplacer(content, 'NAME', projectName);
      content = contentReplacer(content, 'SLUG', projectName);
      const target = path.join(appPath, file);
      content = contentReplacer(content, 'SRC', srcFolder);
      content = contentReplacer(content, 'LANG', currentLang);
      content = replaceLangs(content);
      fs.writeFileSync(target, content);
    } catch {}
  }
}
