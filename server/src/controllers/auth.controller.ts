import { Request, Response } from "express";
import User from "../models/users.model";
import { signToken } from "../lib/auth";
import * as bcrypt from "bcrypt";

export async function signIn(req: Request, res: Response) {
  try {
    const { email, username, password } = req.body;

    const user = await User.findOne({ where: { username: username } });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = signToken(user);

    res.header('Authorization', `Bearer ${token}`).status(200).send();

    res.status(200).json("");
  } catch (error) {
    console.log("signIn error", error);
    res.status(500).json({ error: "Internal server error." });
  }
}
