import express, { Express } from "express";
import http from "http";
import { Server } from "socket.io";
import routes from "./routes";
import cors from "cors";
import { authenticateTokenWebsockets } from "./lib/auth";

const port: number = Number(process.env.PORT) || 8000;
const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(routes);

const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.use(authenticateTokenWebsockets);

server.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});

export default app;
