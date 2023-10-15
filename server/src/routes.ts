import express, { Router } from "express";
import { getMessages } from "./controllers/messages.controller";
import { signIn } from "./controllers/auth.controller";
import { authenticateJWT } from "./lib/auth";

const router: Router = express.Router();
const api: Router = express.Router();
const admin: Router = express.Router();
const auth: Router = express.Router();

api.use(authenticateJWT);
admin.use(authenticateJWT);

router.use("/api", api);
router.use("/admin", admin);
router.use("/auth", auth);

api.get("/messages", getMessages);

auth.get("/sign-in", signIn);

export default router;
