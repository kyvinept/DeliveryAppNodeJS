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

    const tokens = await this.tokenService.generateTokensAndSave({
      email,
      id: newUser.id,
      role: newUser.role,
    });

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

    const tokens = await this.tokenService.generateTokensAndSave({
      email,
      id: user.id,
      role: user.role,
    });

    return tokens;
  };

  logout = async (user: IUser) => {
    return await this.tokenService.deleteToken(user.id);
  };

  refresh = async (refreshToken: string) => {
    const data = await this.tokenService.refresh(refreshToken);
    return data;
  };
}

export default UserService;
