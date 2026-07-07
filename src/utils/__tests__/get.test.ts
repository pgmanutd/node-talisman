import http from 'http';
import https from 'https';

import get from '../get';

jest.mock('http');
jest.mock('https');

const mockedHttpRequest = http.request as jest.Mock;
const mockedHttpsRequest = https.request as jest.Mock;

interface FakeResponseOptions {
  statusCode?: number;
  headers?: Record<string, string>;
  chunks?: Buffer[];
}

const makeResponse = ({
  statusCode,
  headers = {},
  chunks = [],
}: FakeResponseOptions) => {
  const response: any = {
    statusCode,
    headers,
    setEncoding: jest.fn(),
  };

  response.on = jest.fn((event: string, handler: (chunk?: Buffer) => void) => {
    if (event === 'data') {
      chunks.forEach((chunk) => handler(chunk));
    }

    if (event === 'end') {
      handler();
    }

    return response;
  });

  return response;
};

const makeRequest = ({ requestError }: { requestError?: Error } = {}) => {
  const request: any = {
    end: jest.fn(),
  };

  request.on = jest.fn((event: string, handler: (error: Error) => void) => {
    if (event === 'error' && requestError) {
      handler(requestError);
    }

    return request;
  });

  return request;
};

describe('#get', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should resolve with a decoded string for a 200 response', () => {
    mockedHttpRequest.mockImplementationOnce((_url, _options, cb) => {
      cb(makeResponse({ statusCode: 200, chunks: [Buffer.from('payload')] }));
      return makeRequest();
    });

    const callback = jest.fn();
    get({ url: 'http://example.com/path', encoding: 'utf8' }, callback);

    expect(callback).toHaveBeenCalledWith(
      null,
      expect.objectContaining({ statusCode: 200 }),
      'payload',
    );
  });

  it('should resolve with a raw Buffer when encoding is null', () => {
    mockedHttpRequest.mockImplementationOnce((_url, _options, cb) => {
      cb(makeResponse({ statusCode: 200, chunks: [Buffer.from('binary')] }));
      return makeRequest();
    });

    const callback = jest.fn();
    get({ url: 'http://example.com', encoding: null }, callback);

    expect(callback).toHaveBeenCalledWith(
      null,
      expect.objectContaining({ statusCode: 200 }),
      Buffer.from('binary'),
    );
  });

  it('should use https.request for https urls', () => {
    mockedHttpsRequest.mockImplementationOnce((_url, _options, cb) => {
      cb(makeResponse({ statusCode: 200, chunks: [Buffer.from('secure')] }));
      return makeRequest();
    });

    const callback = jest.fn();
    get({ url: 'https://example.com', encoding: 'utf8' }, callback);

    expect(mockedHttpsRequest).toHaveBeenCalledTimes(1);
    expect(mockedHttpRequest).not.toHaveBeenCalled();
    expect(callback).toHaveBeenCalledWith(null, expect.anything(), 'secure');
  });

  it('should follow redirects', () => {
    mockedHttpRequest
      .mockImplementationOnce((_url, _options, cb) => {
        cb(
          makeResponse({
            statusCode: 301,
            headers: { location: 'http://example.com/final' },
          }),
        );
        return makeRequest();
      })
      .mockImplementationOnce((_url, _options, cb) => {
        cb(makeResponse({ statusCode: 200, chunks: [Buffer.from('final')] }));
        return makeRequest();
      });

    const callback = jest.fn();
    get({ url: 'http://example.com', encoding: 'utf8' }, callback);

    expect(mockedHttpRequest).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenCalledWith(
      null,
      expect.objectContaining({ statusCode: 200 }),
      'final',
    );
  });

  it('should error for a non-200 response', () => {
    mockedHttpRequest.mockImplementationOnce((_url, _options, cb) => {
      cb(makeResponse({ statusCode: 404 }));
      return makeRequest();
    });

    const callback = jest.fn();
    get({ url: 'http://example.com', encoding: 'utf8' }, callback);

    expect(callback).toHaveBeenCalledWith(new Error('404'), null, null);
  });

  it('should propagate request errors', () => {
    const networkError = new Error('network down');

    mockedHttpRequest.mockImplementationOnce(() =>
      makeRequest({ requestError: networkError }),
    );

    const callback = jest.fn();
    get({ url: 'http://example.com', encoding: 'utf8' }, callback);

    expect(callback).toHaveBeenCalledWith(networkError, null, null);
  });
});
