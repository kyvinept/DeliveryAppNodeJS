import ApiError from "errors/ApiError";
import { IUser, User } from "models/database/user";
import { TokenService } from ".";
import { comparePasswords, hashPassword } from "helpers/hashPassword";
import strings from "strings";

class UserService {
  private tokenService = new TokenService();

  registration = async (email: string, password: string) => {
    const user = await User.query().findOne({ email });
    if (user) {
      throw ApiError.badRequest(strings.user.emailAlreadyInUse);
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await User.query().insert({
      email,
      password: hashedPassword,
    });

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
      throw ApiError.badRequest(strings.user.isNotRegistered);
    }

    const comparePassword = comparePasswords(password, user.password);
    if (!comparePassword) {
      throw ApiError.badRequest(strings.user.wrongPassword);
    }

    const tokens = this.tokenService.generateTokens({
      id: user.id,
      email,
      role: user.role,
    });

    await this.tokenService.saveToken(user.id, tokens.refreshToken);

    return tokens;
  };

  logout = async (user: IUser) => {
    return await this.tokenService.deleteToken(user.id);
  };
}

export default UserService;
