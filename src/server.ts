import express, { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
import taskRoutes from "./routes/task.routes.js";
import logger from "./logger.js";

import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

app.use(
  cors({
    origin: [
      "http://localhost:55756",
      "http://127.0.0.1:53035",
      "http://localhost:3000",
      "http://127.0.0.1:3000",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  }),
);

app.use("/api/tasks", taskRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error("Unhandled Exception:", err);
  res.status(500).json({ error: "Something went wrong internally" });
});

app.listen(PORT, () => {
  logger.info(`Server is running at http://localhost:${PORT}`);
});
