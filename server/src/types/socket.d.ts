import { Socket } from "express";
import User from "../models/users.model";

declare module "socket.io" {
  interface Socket {
    user?: User;
  }
}
