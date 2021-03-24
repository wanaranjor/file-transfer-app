export const dateTime = (date) => {
  const options = { month: "2-digit", day: "2-digit", year: "numeric" };
  const dateIntl = new Intl.DateTimeFormat("es-ES", options).format(date);
  return dateIntl;
};

export const dateTimeAmPm = (date) => {
  const newDate = new Date(date);
  const options = { month: "2-digit", day: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: true };
  const dateIntl = new Intl.DateTimeFormat("es-ES", options).format(newDate);
  return dateIntl;
};

export const dateTimeNowAmPm = () => {
  const date = new Date();
  const options = { month: "long", day: "numeric", year: "numeric" };
  const dateIntl = new Intl.DateTimeFormat("es-ES", options).format(date);
  return dateIntl;
};

export const dateTimeShort = (date) => {
  const newDate = new Date(date);
  const options = { month: "short", day: "numeric", year: "numeric" };
  const dateIntl = new Intl.DateTimeFormat("es-ES", options).format(newDate);
  return dateIntl;
};