declare module 'exec-sh' {
  interface ExecSh {
    __setError(error?: Error): void;
  }
}

interface MockedExecSh extends jest.Mock {
  __setError?: (error?: Error) => void;
}

let error: Error | undefined;
const __setError: MockedExecSh['__setError'] = newError => {
  error = newError;
};

const mockedExecSh: MockedExecSh = jest.fn((_, cb) => cb(error));
mockedExecSh.__setError = __setError;

export default mockedExecSh;
