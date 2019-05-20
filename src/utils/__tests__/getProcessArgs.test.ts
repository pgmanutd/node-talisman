import getProcessArgs from '../getProcessArgs';

describe('#getProcessArgs', () => {
  test.each`
    value                                                                                                    | output
    ${[]}                                                                                                    | ${''}
    ${['node', 'example/parse.js', '-x', '3', '-y', '4', '-n5', '-abc', '--beep=boop', 'foo', 'bar', 'baz']} | ${'foo bar baz --x "3" --y "4" --n "5" --a "true" --b "true" --c "true" --beep "boop"'}
  `('returns $output for passed $value', ({ value, output }) => {
    expect(getProcessArgs(value)).toEqual(output);
  });
});
