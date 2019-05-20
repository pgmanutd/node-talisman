const actualClogy = jest.requireActual('clogy');

actualClogy.trace = jest.fn();
actualClogy.log = jest.fn();

export default actualClogy;
