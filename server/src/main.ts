import express, { Express } from "express";
import routes from "./routes";
import cors from "cors"

const port: number = Number(process.env.PORT) || 8000;
const app: Express = express();

app.use(cors({exposedHeaders: ['authorization']}))
app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});

export default app;
