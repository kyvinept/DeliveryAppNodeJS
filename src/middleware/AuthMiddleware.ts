import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { DecodedUser } from "../models/database/user";

export default (req: Request, res: Response, next: NextFunction) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Not authorized" });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET
    ) as DecodedUser;
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ message: "Not authorized" });
  }
};
