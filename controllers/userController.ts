import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import ApiError from "../error/ApiError";
import { User } from "../models/db_models";
import jwt from "jsonwebtoken";

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

    const token = jwt.sign(
      { id: 1, email },
      "RANDOM_KEY_SHOULD_BE_IN_ENV_FILE",
      { expiresIn: "24h" }
    );

    return res.json({ token });
  }

  async login(req: Request, res: Response) {}

  async auth(req: Request, res: Response) {}
}

export default new UserController();
