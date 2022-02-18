import ApiError from "../errors/ApiError";
import { DecodedUser, User } from "../models/database/user";
import { TokenService } from ".";
import { comparePasswords, hashPassword } from "../helpers/hashPassword";

class UserService {
  private tokenService = new TokenService();

  registration = async (email: string, password: string) => {
    const user = await User.query().findOne({ email });
    if (user) {
      throw ApiError.badRequest("Such email is already in use");
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await User.query().insert({
      email,
      password: hashedPassword,
    });

    console.log(newUser);

    const tokens = this.tokenService.generateTokens({
      id: newUser.id,
      email,
      role: newUser.role,
    });

    await this.tokenService.saveToken(newUser.id, tokens.refreshToken);

    return tokens;
  };

  login = async (email: string, password: string) => {
    const user = await User.query().findOne({ email });
    if (!user) {
      throw ApiError.badRequest("Such user hasn't been registered.");
    }

    const comparePassword = comparePasswords(password, user.password);
    if (!comparePassword) {
      throw ApiError.badRequest("Wrong password");
    }

    const tokens = this.tokenService.generateTokens({
      id: user.id,
      email,
      role: user.role,
    });

    await this.tokenService.saveToken(user.id, tokens.refreshToken);

    return tokens;
  };

  logout = async (user: DecodedUser) => {
    // const token = await Token.findOne({ where: { userId: user.id } });
    // if (token) {
    //   return await this.tokenService.deleteToken(token.refreshToken);
    // }
  };
}

export default UserService;
