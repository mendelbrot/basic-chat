import express, { Router } from "express";
import { createMessage, getMessages } from "./controllers/messages.controller";
import { login } from "./controllers/auth.controller";
import { authenticateToken } from "./lib/auth";
import { getMe, getUsers, createUser } from "./controllers/users.controller";

const router: Router = express.Router();
const auth: Router = express.Router();
const api: Router = express.Router();

api.use(authenticateToken);

router.use("/auth", auth);
router.use("/api", api);

auth.post("/login", login);

api.post("/messages", createMessage);
api.get("/messages", getMessages);

api.get("/users/me", getMe); // get the currently signed in user
api.post("/users", createUser);
api.get("/users", getUsers);

export default router;
