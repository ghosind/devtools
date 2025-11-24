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

  // Interpret the selected date as UTC (take its components and build a UTC timestamp)
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
