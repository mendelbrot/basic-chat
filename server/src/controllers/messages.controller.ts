import { Request, Response } from "express";
import Message, { publicMessageFields } from "../models/messages.model";
import User from "../models/users.model";
import { io } from "../main";

export async function getMessages(req: Request, res: Response) {
  try {
    console.log('get')
    const messages = await Message.findAll({ attributes: publicMessageFields });
    res.status(200).json({ data: messages });
  } catch (error) {
    console.log("getMessages error: ", error);
    res.status(500).json({ error: "Internal server error." });
  }
}

export async function createMessage(req: Request, res: Response) {
  try {
    console.log('create')
    const { text } = req.body;
    const userId = (req.user as User).id;

    const message = await Message.create(
      {
        text,
        senderId: userId,
      },
      { fields: publicMessageFields }
    );

    io.emit("broadcast:message:create", JSON.stringify(message));

    res.status(201).json({ data: message });
  } catch (error) {
    console.log("createMessages error: ", error);
    res.status(500).json({ error: "Internal server error." });
  }
}
