import express from "express";
import { errorLogger, requestLogger } from "./middlewares/logger";
import mongoose from 'mongoose';
import cors from 'cors'
import path from "path";
import routers from './routes'
import { errors } from "celebrate";
import { errorHandler } from "./middlewares/errors";
import { PORT, DB_ADDRESS } from "./config";

const app = express();

app.use(requestLogger);
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(routers);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

const connectToDatabase = async (uri: string = DB_ADDRESS) => mongoose.connect(uri);

const startServer = async (port: number = PORT) => {
  await connectToDatabase();
  const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  return server;
};

export { app, connectToDatabase, startServer };
export default app;

if (require.main === module) {
  startServer().catch((error) => {
    console.error('Failed to start the server:', error);
    process.exit(1);
  });
}