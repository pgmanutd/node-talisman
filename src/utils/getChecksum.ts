import crypto from 'crypto';

const getChecksum = (
  data: BinaryType,
  algorithm = 'sha256',
  encoding: crypto.HexBase64Latin1Encoding = 'hex',
) => crypto.createHash(algorithm).update(data).digest(encoding);

export default getChecksum;
