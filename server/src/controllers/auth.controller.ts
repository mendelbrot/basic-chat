import { Request, Response } from "express";
import User from "../models/users.model";

export async function signIn(req: Request, res: Response) {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });

    res.status(200).json('');
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Server error." });
  }
}