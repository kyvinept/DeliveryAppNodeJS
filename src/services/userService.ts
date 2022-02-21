import ApiError from "errors/ApiError";
import { IUser } from "models/database/user";
import TokenService from "./tokenService";
import { compareStrings, hash } from "helpers/hash";
import strings from "strings";
import { injectable } from "tsyringe";
import UserRepository from "repositories/userRepository";

@injectable()
class UserService {
  constructor(
    private tokenService: TokenService,
    private userRepository: UserRepository
  ) {}

  registration = async (email: string, password: string, role: string) => {
    const user = await this.userRepository.findOneByCondition({ email });
    if (user) {
      throw ApiError.badRequest(strings.user.emailAlreadyInUse);
    }

    const hashedPassword = await hash(password);
    const newUser = await this.userRepository.create({
      email,
      password: hashedPassword,
      role,
    });

    const tokens = await this.tokenService.generateTokensAndSave({
      email,
      id: newUser.id,
      role,
    });

    return tokens;
  };

  login = async (email: string, password: string) => {
    const user = await this.userRepository.findOneByCondition({ email });

    if (!user) {
      throw ApiError.badRequest(strings.user.isNotRegistered);
    }

    const comparePassword = compareStrings(password, user.password);
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

  refresh = async (userId: number, refreshToken: string) => {
    const data = await this.tokenService.refresh(userId, refreshToken);
    return data;
  };
}

export default UserService;
