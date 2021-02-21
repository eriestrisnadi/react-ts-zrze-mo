export const take = <T = any[]>(arr: T[], size: number = arr.length) =>
  [...arr].slice(0, size);

export default take;
