// Utility helpers for parsing and verifying JWTs in the browser
export function base64UrlToUint8Array(input: string): Uint8Array {
  let b64 = input.replace(/-/g, '+').replace(/_/g, '/');
  const pad = b64.length % 4;
  if (pad === 2) b64 += '==';
  else if (pad === 3) b64 += '=';
  else if (pad !== 0) b64 += '===='.slice(0, 4 - pad);
  const binary = atob(b64);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

export function uint8ArrayToBase64Url(bytes: ArrayBuffer | Uint8Array) {
  const u8 = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let str = '';
  for (let i = 0; i < u8.length; i++) str += String.fromCharCode(u8[i]);
  const b64 = btoa(str);
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function base64UrlDecodeToString(input: string) {
  const u8 = base64UrlToUint8Array(input);
  const dec = new TextDecoder();
  return dec.decode(u8);
}

export function parseJwt(token: string) {
  const parts = token.trim().split('.');
  if (parts.length < 2) throw new Error('INVALID_TOKEN');
  const headerB64 = parts[0];
  const payloadB64 = parts[1];
  const signatureB64 = parts[2] ?? '';
  const headerStr = base64UrlDecodeToString(headerB64);
  const payloadStr = base64UrlDecodeToString(payloadB64);
  let header: any = {};
  let payload: any = {};
  try { header = JSON.parse(headerStr); } catch (e) { throw new Error('INVALID_HEADER'); }
  try { payload = JSON.parse(payloadStr); } catch (e) { throw new Error('INVALID_PAYLOAD'); }
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

function pemToArrayBuffer(pem: string) {
  const b64 = pem.replace(/-----BEGIN [^-]+-----/g, '')
    .replace(/-----END [^-]+-----/g, '')
    .replace(/\s+/g, '');
  const bin = atob(b64);
  const len = bin.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) bytes[i] = bin.charCodeAt(i);
  return bytes.buffer;
}

export async function verifyHs256(secret: string, signingInput: string, signatureB64: string) {
  try {
    const keyData = new TextEncoder().encode(secret);
    const key = await crypto.subtle.importKey('raw', keyData, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
    const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(signingInput));
    const expected = uint8ArrayToBase64Url(sig);
    return { ok: expected === signatureB64, expected };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}

export async function verifyRs256(publicKeyPem: string, signingInput: string, signatureB64: string) {
  try {
    const spki = pemToArrayBuffer(publicKeyPem);
    const key = await crypto.subtle.importKey('spki', spki, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['verify']);
    const sig = base64UrlToUint8Array(signatureB64);
    const sigBuf = sig as unknown as BufferSource;
    const ok = await crypto.subtle.verify('RSASSA-PKCS1-v1_5', key, sigBuf, new TextEncoder().encode(signingInput));
    return { ok };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}
