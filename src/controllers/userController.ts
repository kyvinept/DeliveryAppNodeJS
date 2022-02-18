import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import ApiError from "../errors/ApiError";
import { User } from "../models/database/user";
import { UserService } from "../services";
import { validationResult } from "express-validator";
class UserController {
  private userService = new UserService();

  registration = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.badRequest("Validation errors", errors.array()));
      }

      const { email, password } = req.body;
      const data = await this.userService.registration(email, password);
      return res.json(data);
    } catch (e) {
      next(e);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.badRequest("Validation errors", errors.array()));
      }

      const { email, password } = req.body;
      const data = await this.userService.login(email, password);
      return res.json(data);
    } catch (e) {
      next(e);
    }
  };

  logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      await this.userService.logout(user);
      return res.json();
    } catch (e) {
      next(e);
    }
  };
}

export default new UserController();
