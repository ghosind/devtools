import { decodeBase64 } from './base64';

export const parseJwt = (token: string) => {
  const parts = token.trim().split('.');
  if (parts.length < 2) {
    throw new Error('INVALID_TOKEN');
  }

  const headerB64 = parts[0];
  const payloadB64 = parts[1];
  const signatureB64 = parts[2] ?? '';
  const headerStr = decodeBase64(headerB64);
  const payloadStr = decodeBase64(payloadB64);
  let header: any = {};
  let payload: any = {};

  try {
    header = JSON.parse(headerStr);
  } catch (e) {
    throw new Error('INVALID_HEADER');
  }

  try {
    payload = JSON.parse(payloadStr);
  } catch (e) {
    throw new Error('INVALID_PAYLOAD');
  }

  return {
    header,
    payload,
    headerRaw: headerStr,
    payloadRaw: payloadStr,
    headerB64,
    payloadB64,
    signatureB64,
    signingInput: `${headerB64}.${payloadB64}`,
  };
}
