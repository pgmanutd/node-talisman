// TODO: Please fix this rule
/* eslint-disable @typescript-eslint/no-unused-vars */
import request from 'request';

declare module 'request' {
  interface RequestAPI<
    TRequest extends Request,
    TOptions extends CoreOptions,
    TUriUrlOptions
  > {
    __setResponse(...newParams: any[]): void;
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
