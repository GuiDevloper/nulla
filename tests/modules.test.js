const Nulla = require('../src/modules');

describe('modules', () => {
  const realProcess = { ...process };

  test("showExit() shows message and exits process", () => {
    const log = jest.spyOn(console, 'log').mockImplementation();
    process.exit = jest.fn();

    const message = 'something wrong';
    Nulla.showExit(message);
    expect(log).toBeCalledWith(message);
    expect(process.exit).toBeCalledWith(0);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.resetModules();
    process = realProcess;
  });
});