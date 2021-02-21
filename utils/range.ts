export const range = (size: number = 0) => [
  ...Array(size)
    .fill(0)
    .map((_v, i) => i + 1)
];

export default range;
