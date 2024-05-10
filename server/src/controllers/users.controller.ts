import { Request, Response } from "express";
import User, { publicUserFields } from "../models/users.model";
import { hashPassword, validatePasswordRequirements } from "../lib/auth";

export async function getMe(req: Request, res: Response) {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("getMe error", error);
    res.status(500).json({ error: "Internal server error." });
  }
}

export async function createUser(req: Request, res: Response) {
  try {
    const { username, password } = req.body;

    if (
      await User.findOne({
        where: { username: username },
        attributes: ["username"],
      })
    ) {
      res
        .status(409)
        .json({ message: `Username ${username} is already taken.` });
      return;
    }

    const passwordValidation = validatePasswordRequirements(password);

    if (!passwordValidation.valid) {
      res.status(400).json({
        message: `Password does not meet requirements: ${passwordValidation.message}`,
      });
      return;
    }

    const hash = await hashPassword(password);

    // create the user and then retrieve public user fields to return: don't want to return the hashed password...
    await User.create({ username: username, password: hash });

    const publicUser = await User.findOne({
      where: { username: username },
      attributes: publicUserFields,
    });

    res.status(201).json(publicUser);
  } catch (error) {
    console.log("createUser error", error);
    res.status(500).json({ error: "Internal server error." });
  }
}

export async function getUsers(req: Request, res: Response) {
  try {
    const users = await User.findAll({ attributes: publicUserFields });
    res.status(200).json(users);
  } catch (error) {
    console.log("getUsers error", error);
    res.status(500).json({ error: "Internal server error." });
  }
}
