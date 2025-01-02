export const decodeSquare = (encoded: number) => {
  const file = fileReverseMap[encoded & 0x7];
  const rank = ((encoded >> 3) & 0x7) + 1;
  const square = `${file}${rank}`;

  return square;
};

const fileReverseMap = ["a", "b", "c", "d", "e", "f", "g", "h"];
