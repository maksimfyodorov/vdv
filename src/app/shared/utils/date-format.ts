export const getDateWithTimeOffset = (date: string): Date => {
  const offset = new Date().getTimezoneOffset();
  const hourWithoutOffset = new Date(date).getHours();
  const hourWithOffset = hourWithoutOffset - (offset / 60);
  const dateWithOffset = new Date(new Date(date).setHours(hourWithOffset));
  return dateWithOffset;
};
