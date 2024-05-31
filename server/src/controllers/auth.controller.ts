import { Request, Response } from "express";
import User, { publicUserFields } from "../models/users.model";
import { signToken } from "../lib/auth";
import * as bcrypt from "bcrypt";

export async function login(req: Request, res: Response) {
  try {
    const { username, password } = req.body;

    // find the user and validate the password
    const user = await User.findOne({ where: { username: username } });

    if (!user) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    // update the user's activeAt field
    await user.update({ activeAt: new Date() });

    const token = signToken(user);

    // retrieve the user without password to return in the body
    const publicUser = await User.findOne({
      where: { id: user.id },
      attributes: publicUserFields,
    });

    res.set("authorization", `Bearer ${token}`).status(200).json(publicUser);
  } catch (error) {
    console.log("login error", error);
    res.status(500).json({ error: "Internal server error." });
  }
}

export async function refreshToken(req: Request, res: Response) {
  try {
    const newToken = signToken(req.user as User);
    res.header("authorization", `Bearer ${newToken}`);
    res.status(201).end();
  } catch (error) {
    console.log("refresh token error", error);
    res.status(500).json({ error: "Internal server error." });
  }
}
