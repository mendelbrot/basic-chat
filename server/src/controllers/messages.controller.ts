import { Request, Response } from "express";
import Message from "../models/messages.model";

export async function getMessages(req: Request, res: Response) {
  try {
    const messages = await Message.findAll();
    res.status(200).json(messages);
  } catch (error) {
    console.log("getMessages error", error);
    res
      .status(500)
      .json({ error: "Internal server error." });
  }
}
