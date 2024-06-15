import express, { Router } from "express";
import { createMessage, getMessages } from "./controllers/messages.controller";
import { login, refreshToken } from "./controllers/auth.controller";
import { authenticateToken } from "./lib/auth";
import { getMe, getUsers, createUser } from "./controllers/users.controller";

const router: Router = express.Router();

router.post("/api/auth/login", login);
router.post("/api/auth/refresh-token", authenticateToken, refreshToken); // get a new access token

router.post("/api/messages", authenticateToken, createMessage);
router.get("/api/messages", authenticateToken, getMessages);

router.get("/api/users/me", authenticateToken, getMe); // get the currently signed in user
router.post("/api/users", authenticateToken, createUser);
router.get("/api/users", authenticateToken, getUsers);

export default router;
