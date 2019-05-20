import createDeepProxy from '../createDeepProxy';

describe('#createDeepProxy', () => {
  const setup = () => {
    const messages = {
      key1: {
        message1: 'some message 1',
      },
      key2: 'some message 2',
      key3: 'Hello {NAME}',
    };

    return createDeepProxy<typeof messages>(messages);
  };

  it('should return "some message 1" when #key1.message1 is accessed', () => {
    expect(setup().key1.message1.toString()).toBe('some message 1');
  });

  it('should return "some message 2" when #key2 is accessed', () => {
    expect(setup().key2.toString()).toBe('some message 2');
  });

  it('should return "Hello World" when #key3 is accessed', () => {
    expect(
      setup().key3({
        NAME: 'World',
      }),
    ).toBe('Hello World');
  });

  it('should return "key4" when non-existent #key4 is accessed', () => {
    expect(
      (setup() as ReturnType<typeof setup> & { key4: string }).key4.toString(),
    ).toBe('key4');
  });
});
