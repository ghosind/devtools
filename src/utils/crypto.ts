import CryptoJS from 'crypto-js';
import { base64ToBase64url } from './base64';
import { createHmac } from 'crypto';

export type Encoding = 'hex' | 'base64' | 'base64url';
export type HMacAlgorithm = 'sha1' | 'sha256' | 'sha384' | 'sha512';
export type HashAlgorithm = 'md5' | HMacAlgorithm;

const SupportedAlgorithms = new Map([
  ['md5', CryptoJS.MD5],
  ['sha1', CryptoJS.SHA1],
  ['sha256', CryptoJS.SHA256],
  ['sha384', CryptoJS.SHA384],
  ['sha512', CryptoJS.SHA512],
])

const EncodingMap = new Map([
  ['hex', CryptoJS.enc.Hex],
  ['base64', CryptoJS.enc.Base64],
  ['base64url', CryptoJS.enc.Base64url],
]);

export const hash = (algorithm: HashAlgorithm, input: string, encoding: Encoding): string => {
  let hashObj: CryptoJS.lib.WordArray;
  const algo = algorithm.toLowerCase();

  if (!SupportedAlgorithms.has(algo)) {
    throw new Error('Unsupported algorithm');
  }
  const algoFunc = SupportedAlgorithms.get(algo)!;
  hashObj = algoFunc(input);

  if (!EncodingMap.has(encoding)) {
    throw new Error('Unsupported encoding');
  }
  const enc = EncodingMap.get(encoding);
  return hashObj.toString(enc);
};

export const hmac = (algorithm: HMacAlgorithm, secret: string, input: string, encoding: Encoding) => {
  const hmac = createHmac(algorithm, secret).update(input);

  switch (encoding) {
    case 'hex':
      return hmac.digest('hex');
    case 'base64':
      return hmac.digest('base64');
    case 'base64url':
      const digest = hmac.digest('base64');
      return base64ToBase64url(digest);
  }
}

export const verifyHS256 = async (secret: string, input: string, signature: string) => {
  return hmac('sha256', secret, input, 'base64url') === signature;
}
