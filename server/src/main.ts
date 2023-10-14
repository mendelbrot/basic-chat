import express, { Express, Request, Response } from "express";
import routes from './routes'

const port: number = Number(process.env.PORT) || 8000;
const app: Express = express();

app.use(express.json());
app.use('/api', routes);

app.listen(port, () => {
  console.log(`now listening on port ${port}`);
});

export default app;