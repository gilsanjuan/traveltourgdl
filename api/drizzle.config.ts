import path from "path";
import dotenv from 'dotenv';
import { defineConfig } from 'drizzle-kit';

dotenv.config();

export default defineConfig({
  out: path.resolve(__dirname, "./src/db/migrations"),
  schema: path.resolve(__dirname, "./src/db/schema.ts"),
  dialect: 'sqlite',
  driver: 'd1-http',
});