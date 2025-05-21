import { defineConfig } from "drizzle-kit";
import path from "node:path";
import fs from 'fs';

const getLocalD1 = () => {
    try {
        const basePath = path.resolve('.wrangler');
        const dbFile = fs
            .readdirSync(basePath, { encoding: 'utf-8', recursive: true })
            .find((f) => f.endsWith('.sqlite'));

        if (!dbFile) {
            throw new Error(`.sqlite file not found in ${basePath}`);
        }

        const url = path.resolve(basePath, dbFile);
        return url;
    } catch (err) {
        console.log(`Error  ${err}`);
    }
}

export default defineConfig({
  // implementa path
  out: path.resolve(__dirname, "./src/db/migrations"),
  schema: path.resolve(__dirname, "./src/db/schema.ts"),
  dialect: "sqlite",
  dbCredentials: {
    url: path.resolve(__dirname, `.wrangler/state/v3/d1/miniflare-D1DatabaseObject/${getLocalD1()}.sqlite`),
  },
});
