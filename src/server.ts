import express, { type Request, type Response } from "express";
import { db } from "./db/index"
import { sql } from "drizzle-orm";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


app.listen(PORT, () => {
  console.log(`Server-ku wuxuu ka kiciyey: http://localhost:${PORT}`);
});
