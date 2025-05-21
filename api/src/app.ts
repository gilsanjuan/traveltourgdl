import createApp from "./lib/create-app";
import quoteRouter from "./routes/quote";

const app = createApp();
app.route(
  "/api/quote",
  quoteRouter
);

export default app;