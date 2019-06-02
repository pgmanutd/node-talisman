import clogy from 'clogy';

const actualClogy = jest.requireActual('clogy');
const mockedClogy = jest.genMockFromModule<typeof clogy>('clogy');

mockedClogy.trace = jest.fn();
mockedClogy.log = jest.fn();

export default {
  ...mockedClogy,
  LEVELS: actualClogy.LEVELS,
};
