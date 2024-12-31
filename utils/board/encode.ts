export const encodeMove = (from: string, to: string) => {
  const encodedMove = (encodeSquare(from) << 6) | encodeSquare(to);
  if (encodedMove > 0xffff) throw new Error(`Encoded move out of bounds: ${encodedMove}`);
  return encodedMove;
};

const fileMap = { a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7 };

const encodeSquare = (square: string) => {
  const fileKey = square[0];
  if (!(fileKey in fileMap)) {
    throw new Error(`Invalid file: ${fileKey}`);
  }
  const file = fileMap[fileKey as keyof typeof fileMap];
  const rank = parseInt(square[1], 10) - 1;
  const encoded = (rank << 3) | file;

  if (encoded < 0 || encoded > 63) throw new Error(`Invalid square: ${square}`);
  return encoded;
};
