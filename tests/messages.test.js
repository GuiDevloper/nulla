describe('messages', () => {
  function mockIntl(locale) {
    Intl.DateTimeFormat = () => ({
      resolvedOptions: () => ({ locale })
    });
  }

  test("messages is in english if english locale", () => {
    mockIntl('en-US');
    const message = require('../messages').version;
    expect(message).toBe('Hey, take a look at my version:');
  });

  test("messages default to english if unknown lang", () => {
    mockIntl('en-GB');
    const message = require('../messages').version;
    expect(message).toBe('Hey, take a look at my version:');
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.resetModules();
  });
});