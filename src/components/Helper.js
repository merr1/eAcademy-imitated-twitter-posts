export const range = (start, end) =>
  [...Array(end + 1).keys()].slice(start, end + 1);
