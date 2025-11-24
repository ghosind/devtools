export const encodeBase64 = (input: string): string => {
  try {
    return Buffer.from(input, 'utf8').toString('base64');
  } catch (e) {
    throw e;
  }
}

export const decodeBase64 = (input: string): string => {
  try {
    if (checkBase64Type(input) === 'base64url') {
      input = base64urlToBase64(input);
    }

    return Buffer.from(input, 'base64').toString('utf8');
  } catch (e) {
    throw e;
  }
}

export const base64ToBase64url = (input: string): string => {
  return input
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export const base64urlToBase64 = (input: string): string => {
  return input
    .replace(/-/g, '+')
    .replace(/_/g, '/')
    .padEnd(input.length + (4 - (input.length % 4)) % 4, '=');
}

export const checkBase64Type = (input: string): 'base64' | 'base64url' => {
  return /[+/=]/.test(input) ? 'base64' : 'base64url';
}
