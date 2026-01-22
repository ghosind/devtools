const pad2 = (n: number) => n.toString().padStart(2, '0');

const getDateParts = (d: Date, useUTC: boolean) => {
  const year = useUTC ? d.getUTCFullYear() : d.getFullYear();
  const month = (useUTC ? d.getUTCMonth() : d.getMonth()) + 1;
  const day = useUTC ? d.getUTCDate() : d.getDate();
  const hours = useUTC ? d.getUTCHours() : d.getHours();
  const minutes = useUTC ? d.getUTCMinutes() : d.getMinutes();
  const seconds = useUTC ? d.getUTCSeconds() : d.getSeconds();
  return { year, month, day, hours, minutes, seconds };
};

export const formatDate = (d: Date, useUTC = false) => {
  const { year, month, day, hours, minutes, seconds } = getDateParts(d, useUTC);
  return `${year}-${pad2(month)}-${pad2(day)} ${pad2(hours)}:${pad2(minutes)}:${pad2(seconds)}`;
};

export const timestampToHumanDatetime = (ts: string | number) => {
  const n = Number(ts);
  if (Number.isNaN(n)) {
    throw new Error('Invalid timestamp');
  }

  const date = new Date(n >= 1e12 ? n : n * 1000);
  const timezone = date.getTimezoneOffset() / -60;

  return {
    utc: formatDate(date, true),
    local: `${formatDate(date, false)} (GMT${timezone >= 0 ? '+' : ''}${timezone})`,
  };
};

export const humanDatetimeToTimestamp = (d: Date | null) => {
  if (!d) {
    throw new Error('Invalid date');
  }

  const ms = Date.UTC(
    d.getFullYear(),
    d.getMonth(),
    d.getDate(),
    d.getHours(),
    d.getMinutes(),
    d.getSeconds(),
    d.getMilliseconds()
  );
  return String(Math.floor(ms / 1000));
}

const getTimeZoneParts = (epochMs: number, tz: string) => {
  const fmt = new Intl.DateTimeFormat('en-CA', {
    timeZone: tz,
    hour12: false,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });
  const parts = fmt.formatToParts(new Date(epochMs));
  const map: Record<string, string> = {};
  for (const p of parts) {
    if (p.type !== 'literal') map[p.type] = p.value;
  }

  return {
    year: Number(map.year),
    month: Number(map.month),
    day: Number(map.day),
    hour: Number(map.hour),
    minute: Number(map.minute),
    second: Number(map.second),
  };
};

const compareParts = (a: any, b: any) => {
  if (a.year !== b.year) {
    return a.year - b.year;
  }
  if (a.month !== b.month) {
    return a.month - b.month;
  }
  if (a.day !== b.day) {
    return a.day - b.day;
  }
  if (a.hour !== b.hour) {
    return a.hour - b.hour;
  }
  if (a.minute !== b.minute) {
    return a.minute - b.minute;
  }
  return a.second - b.second;
};

export const findEpochForZonedWallClock = (
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  second: number,
  tz: string,
) => {
  const center = Date.UTC(year, month - 1, day, hour, minute, second);
  let low = center - 48 * 3600 * 1000;
  let high = center + 48 * 3600 * 1000;

  for (let i = 0; i < 64; i++) {
    const mid = Math.floor((low + high) / 2);
    const p = getTimeZoneParts(mid, tz);
    const cmp = compareParts(p, { year, month, day, hour, minute, second });
    if (cmp === 0) {
      return mid;
    } else if (cmp < 0) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  throw new Error('Unable to resolve zoned time for provided wall-clock and timezone');
};

export const formatEpochInTimeZone = (epochMs: number, tz: string) => {
  const p = getTimeZoneParts(epochMs, tz);
  const pad2 = (n: number) => String(n).padStart(2, '0');
  return `${p.year}-${pad2(p.month)}-${pad2(p.day)} ${pad2(p.hour)}:${pad2(p.minute)}:${pad2(p.second)} (${tz})`;
};
