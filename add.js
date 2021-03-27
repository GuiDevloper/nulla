const { showExit, message } = require('./modules');

function add(args) {
  const fs = require('fs');
  const path = require('path');
  if (!args[1] || args[1].indexOf('able') === -1) {
    return showExit(message.unknown);
  }

  const indexPath = path.join(process.cwd(), "index.js");
  let content = fs.readFileSync(
    indexPath,
    'utf8'
  );

  if (content.indexOf(args[1]) > -1) {
    return showExit(message.alreadyInstalled);
  }

  const useIdx = content.indexOf('Nullstack.use');
  const ableTitle = args[1].replace('nullstack-', '');
  const importLine = `import ${ableTitle} from '${args[1]}';\n\nNullstack.use`;
  if (useIdx > -1) {
    content = content.replace(
      '\nNullstack.use',
      importLine
    );
    content = content.substring(0, useIdx) + (
      content.substring(useIdx).replace(');', `, ${ableTitle});`)
    );
  } else {
    content = content.replace(
      '\nNullstack.start',
      `\n${importLine}(${ableTitle});\n\nNullstack.start`
    );
  }
  fs.writeFileSync(indexPath, content);
}

module.exports = { add };