import jwt from "jsonwebtoken";

export const generateJwt = (id: number, email: string, role: string) => {
  const token = jwt.sign({ id, email, role }, process.env.JWT_SECRET_STRING, {
    expiresIn: "24h",
  });

  return token;
};
