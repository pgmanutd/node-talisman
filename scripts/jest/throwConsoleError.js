/* eslint-disable no-console */

console.error = message => {
  throw new Error(message);
};
