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
