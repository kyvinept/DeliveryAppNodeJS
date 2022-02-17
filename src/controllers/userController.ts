import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import ApiError from "../errors/ApiError";
import { User } from "../models/db_models";
import { generateJwt } from "../helpers/generateJwt";

class UserController {
  async registration(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest("Email or password isn't sent"));
    }

    const user = await User.findOne({ where: { email } });
    if (user) {
      return next(ApiError.badRequest("Such email is already in use"));
    }

    const hashPassword = await bcrypt.hash(password, 5);
    const newUser = await User.create({
      email,
      password: hashPassword,
    });

    const token = generateJwt(newUser.id, email, newUser.role);

    return res.json({ token });
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest("Email or password isn't sent"));
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(ApiError.badRequest("Such user is not exist"));
    }

    const comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.badRequest("Wrong password"));
    }

    const token = generateJwt(user.id, email, user.role);

    return res.json({ token });
  }

  async check(req: Request, res: Response) {
    return res.json({ message: "OK" });
  }
}

export default new UserController();
