export const zeroPad = (num: number, length: number): string =>
  num.toString().padStart(length, "0");
