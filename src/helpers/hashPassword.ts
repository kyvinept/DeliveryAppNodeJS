import bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 5);
};

export const comparePasswords = (password1: string, password2: string) => {
  return bcrypt.compareSync(password1, password2);
};
