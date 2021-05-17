const Nulla = require('../src/modules');
const child = require('child_process');

describe('modules', () => {
  const realProcess = { ...process };

  const spawnEvents = {};
  function mockSpawn() {
    return jest.spyOn(child, 'spawn').mockImplementation(() => ({
      on: (evt, fn) => {
        spawnEvents[evt] = fn;
      }
    }));
  }

  function mockProcess(platform) {
    Nulla.args = ['add', 'vueable'];
    process = {
      platform: platform || 'mint',
      exit: jest.fn()
    };
  }

  test("showExit() shows message and exits process", () => {
    const log = jest.spyOn(console, 'log').mockImplementation();
    process.exit = jest.fn();

    const message = 'something wrong';
    Nulla.showExit(message);
    expect(log).toBeCalledWith(message);
    expect(process.exit).toBeCalledWith(0);
  });

  test("run() starts command using args", () => {
    const spawn = mockSpawn();
    mockProcess();
    Nulla.run();

    expect(spawn).toBeCalledWith(
      'npx',
      Nulla.commands().add.split(' '),
      { stdio: 'inherit' }
    );
  });

  test("run() starts command using npx.cmd if windows", () => {
    const spawn = mockSpawn();
    mockProcess('win32');
    Nulla.run();

    expect(spawn).toBeCalledWith(
      'npx.cmd',
      Nulla.commands().add.split(' '),
      { stdio: 'inherit' }
    );
  });
  
  test("run() installs with npm if -n is passed", () => {
    const spawn = mockSpawn();
    mockProcess();
    Nulla.run();
    expect(Nulla.commands().add.indexOf('yarn') > -1).toBeTruthy();
    
    Nulla.args[2] = '-n';
    Nulla.run();
    expect(Nulla.commands().add.indexOf('npm') > -1).toBeTruthy();
  });

  test("run() showExit on child_process error", () => {
    mockSpawn();
    mockProcess();
    Nulla.showExit = jest.fn();
    Nulla.run();

    const message = 'something wrong';
    spawnEvents.error(message);

    expect(Nulla.showExit).toBeCalledWith(message);
  });

  test("run() closes process on child_process close", () => {
    mockSpawn();
    mockProcess();
    Nulla.run();

    spawnEvents.close();

    expect(process.exit).toBeCalledWith(0);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.resetModules();
    process = realProcess;
  });
});