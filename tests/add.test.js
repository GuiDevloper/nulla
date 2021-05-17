const { add } = require('../src/add');
const modules = require('../src/modules');
const message = require('../src/messages');
const fs = require('fs');
const path = require('path');

describe('add()', () => {
  function spyReadFile(returnValue) {
    jest.spyOn(fs, 'readFileSync').mockReturnValue(returnValue);
  }

  function spyPathJoin() {
    jest.spyOn(path, 'join').mockReturnValue('/');
  }

  test("exits if plugin doesn't contain 'able'", () => {
    modules.showExit = jest.fn();
    add(['add', 'nullstack-plugin']);
    expect(modules.showExit).toBeCalledWith(message.unknown);
  });

  test("exits if plugin was already installed", () => {
    spyReadFile("import vueable from 'nullstack-vueable';");

    modules.showExit = jest.fn();
    add(['add', 'nullstack-vueable']);
    expect(modules.showExit).toBeCalledWith(message.alreadyInstalled);
  });

  test("append plugin if already has Nullstack.use", () => {
    spyPathJoin();
    spyReadFile('\nNullstack.use(vueable);');

    fs.writeFileSync = jest.fn();
    add(['add', 'nullstack-polyable']);

    const updatedContent = `import polyable from 'nullstack-polyable';\n\nNullstack.use(vueable, polyable);`;
    expect(fs.writeFileSync).toBeCalledWith('/', updatedContent);
  });

  test("add plugin if there's not an Nullstack.use", () => {
    spyPathJoin();
    spyReadFile('\nNullstack.start();');

    fs.writeFileSync = jest.fn();
    add(['add', 'nullstack-polyable']);

    const updatedContent = `\nimport polyable from 'nullstack-polyable';\n\nNullstack.use(polyable);\n\nNullstack.start();`;
    expect(fs.writeFileSync).toBeCalledWith('/', updatedContent);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.resetModules();
  });
});