import request from 'request';

declare module 'request' {
  interface RequestAPI<
    TRequest extends Request,
    TOptions extends CoreOptions,
    TUriUrlOptions
  > {
    __setResponse(...newParams: typeof params): void;
  }
}

interface MockedRequest extends jest.Mock {
  __setResponse?: typeof request['__setResponse'];
}

let params: any[];
const __setResponse: typeof request['__setResponse'] = (...newParams) => {
  params = newParams;
};

const mockedRequest: MockedRequest = jest.fn((_, cb) => cb(...params));
mockedRequest.__setResponse = __setResponse;

export default mockedRequest;