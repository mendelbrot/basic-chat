import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../models/users.model";

export interface RequestWithUserInfo extends Request {
  user: User
}

export async function authenticateJWT(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Authorization error: Missing Authorization token" });
  }

  let payload: JwtPayload;
  try {
    payload = jwt.verify(token, process.env.SECRET as string) as JwtPayload;

    if (!payload.id) {
      throw new Error('no user id');
    }
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Authorization error: Invalid Authorization token" });
  }

  let user: User | null;
  try {
    user = await User.findOne({ where: { id: payload.id } });

    if (!user) {
      throw new Error('user not found');
    }
  } catch (error) {
    return res.status(500).json({ message: "Authorization error: user not found" });
  }

  (req as RequestWithUserInfo).user = user;
  next();
}
