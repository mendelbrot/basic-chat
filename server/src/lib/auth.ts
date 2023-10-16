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
    const token = req.header("Authorization")?.replace(/Bearer /, "");

    if (!token) {
      return res
        .status(401)
        .json({ message: "Authorization error: missing authorization token" });
    }

    let payload: JwtPayload;
    try {
      payload = jwt.verify(token, process.env.SECRET as string) as JwtPayload;
    } catch (error) {
      return res
        .status(401)
        .json({ message: "Authorization error: invalid authorization token" });
    }

    let user = await User.findOne({ where: { id: payload.sub } });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Authorization error: user not found" });
    }

    user.activeAt = new Date();
    await user.save();

    req.user = user;

    const newToken = signToken(user);
    res.header("Authorization", `Bearer ${newToken}`);

    next();
  } catch (error) {
    console.log("authenticateToken error", error);
    res.status(500).json({ error: "Internal server error." });
  }
}
