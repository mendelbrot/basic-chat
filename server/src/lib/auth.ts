import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../models/users.model";

export interface RequestWithUserInfo extends Request {
  user: User;
}

export function signToken(user: User): string {
  return jwt.sign(
    { sub: user.id, username: user.username },
    process.env.SECRET as string,
    {
      expiresIn: "1h",
    }
  );
}

export async function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.header("authorization")?.replace(/Bearer /, "");

    if (!token) {
      res
        .status(401)
        .json({ message: "Missing authorization token" });
      return;
    }

    let payload: JwtPayload;
    try {
      payload = jwt.verify(token, process.env.SECRET as string) as JwtPayload;
    } catch (error) {
      res
        .status(401)
        .json({ message: "Invalid authorization token" });
      return;
    }

    let user = await User.findOne({ where: { id: payload.sub } });
    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    user.activeAt = new Date();
    await user.save();

    req.user = user;

    const newToken = signToken(user);
    res.header("authorization", `Bearer ${newToken}`);

    next();
  } catch (error) {
    console.log("authenticateToken error", error);
    res.status(500).json({ error: "Internal server error." });
  }
}
