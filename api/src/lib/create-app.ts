import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";

import { BASE_PATH } from "./constants";
import createRouter from "./create-router";

export default function createApp() {
  const app = createRouter()
    .use("*", (c, next) => {
      if (c.req.path.startsWith(BASE_PATH)) {
        return next();
      }
      // SPA redirect to /index.html
      const requestUrl = new URL(c.req.raw.url);
      return c.env.ASSETS.fetch(new URL("/index.html", requestUrl.origin));
    })

  app.use("/*", cors());
  app.use(prettyJSON());

  return app;
}
