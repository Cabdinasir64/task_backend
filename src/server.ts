import express from "express";
import * as dotenv from "dotenv";
import taskRoutes from "./routes/task.routes.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors({
  origin: [
    "http://localhost:55756", 
    "http://127.0.0.1:53035",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
  ],
  methods: ["GET","POST","PUT","DELETE","OPTIONS"]
}));

app.use("/api/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
