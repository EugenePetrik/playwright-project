const NUMBERS = '0123456789';
const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const LETTERS_WITH_NUMBERS = LETTERS + NUMBERS;

export const randomNumber = (start = 500, end = 2000): number => Math.floor(Math.random() * (end - start + 1) + end);

export const randomString = (start = 10, end = 20, charSet: string = LETTERS_WITH_NUMBERS): string => {
  let randomString = '';

  for (let index = 0; index < randomNumber(start, end); index++) {
    const randomPoz = Math.floor(Math.random() * charSet.length);
    randomString += charSet.substring(randomPoz, randomPoz + 1);
  }

  return randomString;
};

export const randomListOfStrings = (start = 10, end = 20): string[] => {
  const range = randomNumber(start, end);
  return Array.from(Array(range).keys()).map(_ => randomString());
};
