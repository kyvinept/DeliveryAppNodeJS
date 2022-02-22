import bcrypt from 'bcrypt';

export const hash = async (string: string) => {
  return await bcrypt.hash(string, 5);
};

export const compareStrings = (string1: string, string2: string) => {
  return bcrypt.compareSync(string1, string2);
};
