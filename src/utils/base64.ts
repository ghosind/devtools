export function encodeBase64(input: string): string {
  try {
    return Buffer.from(input, 'utf8').toString('base64');
  } catch (e) {
    return String(e);
  }
}

export function decodeBase64(input: string): string {
  try {
    return Buffer.from(input, 'base64').toString('utf8');
  } catch (e) {
    return String(e);
  }
}
