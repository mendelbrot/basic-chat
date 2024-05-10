import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User, { publicUserFields } from "../models/users.model";
import * as bcrypt from "bcrypt";

const MIN_PASSWORD_LENGTH = 8;
const SALT_ROUNDS = 10;

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
      res.status(401).json({ message: "Missing authorization token" });
      return;
    }

    let payload: JwtPayload;
    try {
      payload = jwt.verify(token, process.env.SECRET as string) as JwtPayload;
    } catch (error) {
      res.status(401).json({ message: "Invalid authorization token" });
      return;
    }

    // this user info will be save to request for use by controllers so avoid retrieving the hashed password
    const user = await User.findOne({
      where: { id: payload.sub },
      attributes: publicUserFields, // publicUserFields avoids retrieving the user's hashed password
    });
    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    // update the user's activeAt field
    user.activeAt = new Date();
    await user.save();

    // save the user to the request to be used by controllers
    req.user = user;

    const newToken = signToken(user);
    res.header("authorization", `Bearer ${newToken}`);

    next();
  } catch (error) {
    console.log("authenticateToken error", error);
    res.status(500).json({ error: "Internal server error." });
  }
}

export function validatePasswordRequirements(password: string): {
  valid: boolean;
  message?: string;
} {
  if (password.length < MIN_PASSWORD_LENGTH) {
    return {
      valid: false,
      message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`,
    };
  }

  return { valid: true };
}

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, SALT_ROUNDS);
}
