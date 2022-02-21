import ApiError from "errors/ApiError";
import jwt from "jsonwebtoken";
import { Token } from "models/database";
import { IUser } from "models/database/user";
import { injectable } from "tsyringe";

@injectable()
class TokenService {
  private generateTokens = (data: IUser) => {
    const accessToken = jwt.sign(data, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "30m",
    });

    const refreshToken = jwt.sign(data, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });

    return { accessToken, refreshToken };
  };

  private saveToken = async (userId: number, refreshToken: string) => {
    const tokenData = await Token.query().findOne({ userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      await tokenData.$query().patch();
      return tokenData;
    }
    const newToken = await Token.query().insert({ userId, refreshToken });
    return newToken;
  };

  generateTokensAndSave = async (user: IUser) => {
    const tokens = this.generateTokens(user);
    await this.saveToken(user.id, tokens.refreshToken);
    return tokens;
  };

  validateRefreshToken = (token: string) => {
    try {
      const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return decoded;
    } catch (e) {
      return null;
    }
  };

  refresh = async (refreshToken: string) => {
    const tokenData = await Token.query().findOne({ refreshToken });

    if (tokenData) {
      const userData = this.validateRefreshToken(
        tokenData.refreshToken
      ) as IUser;
      if (userData) {
        const tokens = await this.generateTokensAndSave({
          email: userData.email,
          id: userData.id,
          role: userData.role,
        });
        return tokens;
      } else {
        throw ApiError.unauthorized();
      }
    } else {
      throw ApiError.unauthorized();
    }
  };

  deleteToken = async (userId: number) => {
    return await Token.query().delete().where("userId", userId);
  };
}

export default TokenService;
