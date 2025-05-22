import { Env } from 'hono';

export type AppEnv = Env & {
  Bindings: {
    ASSETS: Fetcher;
    DB: D1Database;
    RESEND_API_KEY: string;
    ENV_TYPE: 'dev' | 'prod' | 'stage';
  };
};