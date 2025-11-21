export const encodeBase64 = (input: string): string => {
  try {
    return Buffer.from(input, 'utf8').toString('base64');
  } catch (e) {
    throw e;
  }
}

export const decodeBase64 = (input: string): string => {
  try {
    return Buffer.from(input, 'base64').toString('utf8');
  } catch (e) {
    throw e;
  }
}
