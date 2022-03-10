import ApiError from 'errors/ApiError';
import {IUser} from 'models/database/user';
import TokenService from './tokenService';
import {compareStrings, hash} from 'helpers/hash';
import strings from 'strings';
import {injectable} from 'tsyringe';
import UserRepository from 'repositories/userRepository';
import EmailService from './emailService';

@injectable()
class UserService {
  constructor(
    private tokenService: TokenService,
    private userRepository: UserRepository,
    private emailService: EmailService,
  ) {}

  registration = async (email: string, password: string, role: string) => {
    const user = await this.userRepository.findOneByCondition({email});
    if (user) {
      throw ApiError.unprocessableEntity(strings.user.emailAlreadyInUse);
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
    const user = await this.userRepository.findOneByCondition({email});

    if (!user) {
      throw ApiError.notFound(strings.user.isNotRegistered);
    }

    const comparePassword = compareStrings(password, user.password);
    if (!comparePassword) {
      throw ApiError.unprocessableEntity(strings.user.wrongPassword);
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

  forgetPassword = async (baseLink: string, email: string) => {
    const token = this.tokenService.generateForgetPasswordToken(email);
    const link = `${baseLink}?reset_token=${token}`;
    this.emailService.sendForgetPasswordMail(email, link);
    const user = await this.userRepository.findOneByCondition({email});
    if (user) {
      user.forget_password_token = token;
      await this.userRepository.update(user);
    }
  };

  recoverPassword = async (token: string, newPassword: string) => {
    const decodedToken = this.tokenService.validateForgetPasswordToken(token);
    if (!decodedToken) {
      throw ApiError.unprocessableEntity(strings.user.tokenWasExpired);
    }

    const email = decodedToken.email;
    const user = await this.userRepository.findOneByCondition({
      forget_password_token: token,
      email,
    });

    if (!user) {
      throw ApiError.unprocessableEntity(strings.user.tokenWasExpired);
    }

    user.password = await hash(newPassword);
    user.forget_password_token = null;
    await this.userRepository.update(user);
  };
}

export default UserService;
