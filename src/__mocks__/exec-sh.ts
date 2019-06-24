import execSh from 'exec-sh';

declare module 'exec-sh' {
  interface ExecSh {
    __setError(error?: Error): void;
  }
}

interface MockedExecSh extends jest.Mock {
  __setError?: typeof execSh['__setError'];
}

let error: Error | undefined;
const __setError: typeof execSh['__setError'] = newError => {
  error = newError;
};

const mockedExecSh: MockedExecSh = jest.fn(([command], cb) =>
  error && command.includes(error.message) ? cb(error) : cb(),
);
mockedExecSh.__setError = __setError;

export default mockedExecSh;
