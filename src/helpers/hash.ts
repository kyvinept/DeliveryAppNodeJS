import crypto from 'crypto';

export const hash = (string: string): string => {
  console.log('process.env.SALT_VALUE', process.env.SALT_VALUE);
  const hash = crypto
    .pbkdf2Sync(string, process.env.SALT_VALUE, 1000, 64, 'sha512')
    .toString('hex');
  return hash;
};

export const compareStrings = (string1: string, string2: string) => {
  console.log(string1, string2);
  const hashedString = hash(string1);
  console.log(hashedString);
  return hashedString == string2;
};
