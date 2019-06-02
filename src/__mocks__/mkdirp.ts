import mkdirp from 'mkdirp';

const mockedMkdirp = jest.genMockFromModule<typeof mkdirp>('mkdirp');

mockedMkdirp.sync = jest.fn();

export default mockedMkdirp;
