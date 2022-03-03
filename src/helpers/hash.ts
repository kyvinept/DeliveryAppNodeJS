import crypto from 'crypto';

export const hash = (string: string): string => {
  const hash = crypto
    .pbkdf2Sync(string, process.env.SALT_VALUE, 1000, 64, 'sha512')
    .toString('hex');
  return hash;
};

export const compareStrings = (string1: string, string2: string) => {
  const hashedString = hash(string1);
  return hashedString == string2;
};
