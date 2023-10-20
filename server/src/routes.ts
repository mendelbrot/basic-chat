import express, { Router } from "express";
import { getMessages, createMessage } from "./controllers/messages.controller";
import { signIn } from "./controllers/auth.controller";
import { authenticateToken } from "./lib/auth";
import { createUser } from "./controllers/admin.controller";

const router: Router = express.Router();
const api: Router = express.Router();
const admin: Router = express.Router();
const auth: Router = express.Router();

api.use(authenticateToken);
admin.use(authenticateToken);

router.use("/api", api);
router.use("/admin", admin);
router.use("/auth", auth);

api.get("/messages", getMessages);
api.post("/messages", createMessage);

auth.post("/sign-in", signIn);

admin.post("/users", createUser)

export default router;
