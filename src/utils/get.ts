import http from 'http';
import https from 'https';

const get = (
  {
    url,
    encoding = 'utf8',
  }: {
    url: string;
    encoding?: BufferEncoding | null;
  },
  cb: (
    error: Error | null,
    response: http.IncomingMessage | null,
    data: any,
  ) => void,
) => {
  const { protocol, hostname, pathname, search } = new URL(url);

  const send = (protocol === 'https:' ? https : http).request;

  const body: Uint8Array[] = [];

  const req = send(
    url,
    {
      hostname,
      path: pathname + search,
      method: 'GET',
    },
    (res) => {
      if (encoding) {
        res.setEncoding(encoding);
      }

      if (
        res.statusCode &&
        res.statusCode >= 300 &&
        res.statusCode < 400 &&
        res.headers.location
      ) {
        return get({ url: res.headers.location, encoding }, cb);
      }

      res.on('data', (chunk) => {
        body.push(chunk);
      });

      return res.on('end', () => {
        if (res.statusCode !== 200) {
          cb(new Error(res.statusCode?.toString()), null, null);
        } else {
          const buffer = Buffer.concat(body);

          cb(null, res, encoding ? buffer.toString(encoding) : buffer);
        }
      });
    },
  );

  req.on('error', (e) => {
    cb(e, null, null);
  });

  req.end();
};

export default get;
