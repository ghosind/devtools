export const isValidObjectId = (id: string) => {
  return /^(ObjectId\(\")?[0-9a-fA-F]{24}("\))?$/.test(id);
}

export const parseObjectIdToDate = (id: string) => {
  if (!isValidObjectId(id)) {
    throw { code: 'INVALID_OBJECTID' };
  }
  if (id.startsWith('ObjectId("') && id.endsWith('")')) {
    id = id.slice(10, -2);
  }

  const tsHex = id.slice(0, 8);
  const ts = parseInt(tsHex, 16) * 1000;

  return new Date(ts);
}

export const generateObjectIdFromDate = (d: Date) => {
  // timestamp (4 bytes) + 16 hex padding chars
  const seconds = Math.floor(Date.UTC(
    d.getFullYear(),
    d.getMonth(),
    d.getDate(),
    d.getHours(),
    d.getMinutes(),
    d.getSeconds(),
    d.getMilliseconds()
  ) / 1000);
  const tsHex = seconds.toString(16).padStart(8, '0');
  return (tsHex + '0000000000000000').toLowerCase();
}
