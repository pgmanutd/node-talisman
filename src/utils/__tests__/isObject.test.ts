import isObject from '../isObject';

describe('#isObject', () => {
  test.each`
    value            | output
    ${[1, 2]}        | ${true}
    ${null}          | ${false}
    ${undefined}     | ${false}
    ${() => {}}      | ${true}
    ${/ab+c/}        | ${true}
    ${new Number(0)} | ${true}
    ${' '}           | ${false}
  `('returns $output for passed $value', ({ value, output }) => {
    expect(isObject(value)).toEqual(output);
  });
});
