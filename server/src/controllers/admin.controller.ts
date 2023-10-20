import { Request, Response } from "express";
import User, { PublicUser, publicUserFields } from "../models/users.model";
import { signToken } from "../lib/auth";
import * as bcrypt from "bcrypt";

const MIN_PASSWORD_LENGTH = 8;
const SALT_ROUNDS = 10;

function validatePasswordRequirements(password: string): {
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

    const hash = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await User.create(
      { username: username, password: hash },
    );

    const publicUser = await User.findOne({
      where: { username: username },
      attributes: publicUserFields,
    })

    res.status(201).json(publicUser);
  } catch (error) {
    console.log("createUser error", error);
    res.status(500).json({ error: "Internal server error." });
  }
}
