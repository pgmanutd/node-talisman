import isDevEnv from '../isDevEnv';

describe('#isDevEnv', () => {
  it('should return false for no development environment', () => {
    expect(isDevEnv()).toBeFalsy();
  });

  it('should return true for development environment', () => {
    process.env.NODE_ENV = 'development';

    expect(isDevEnv()).toBeTruthy();

    delete process.env.NODE_ENV;
  });
});
