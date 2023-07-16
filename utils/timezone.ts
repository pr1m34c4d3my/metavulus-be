export const timeZone = () => {
  const d = new Date();
  const offset = 7 * 60 * 60 * 1000; // 7 hours in milliseconds
  d.setTime(d.getTime() + offset);

  return d;
};
