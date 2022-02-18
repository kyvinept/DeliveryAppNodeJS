import jwt from "jsonwebtoken";
import { Token } from "../models/database";

class TokenService {
  generateTokens = (payload: Object) => {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "30m",
    });

    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });

    return { accessToken, refreshToken };
  };

  saveToken = async (userId: number, refreshToken: string) => {
    const tokenData = await Token.query().findOne({ userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      tokenData.$query().patch();
      return tokenData;
    }
    const newToken = await Token.query().insert({ userId, refreshToken });
    return newToken;
  };

  deleteToken = async (refreshToken: string) => {
    return await Token.query().delete().where("refreshToken", refreshToken);
  };
}

export default TokenService;
