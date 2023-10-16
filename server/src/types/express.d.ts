import { Request } from "express";
import User from "../models/users.model";

declare module "express" {
  interface Request {
    user?: User
  }
}
