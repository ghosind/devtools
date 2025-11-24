import { base64ToBase64url } from './base64';
import { createHmac } from 'crypto';

export const signHmac = (algorithm: 'sha256', secret: string, input: string) => {
  const hmac = createHmac(algorithm, secret).update(input).digest('base64');
  return base64ToBase64url(hmac);
}

export const verifyHS256 = async (secret: string, input: string, signature: string) => {
  return signHmac('sha256', secret, input) === signature;
}
