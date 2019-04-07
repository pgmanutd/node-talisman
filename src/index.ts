import { runner } from './core';

export default (args: NodeJS.Process['argv']) =>
  runner(args).catch((error: Error) => {
    setImmediate(() => {
      throw error;
    });
  });
