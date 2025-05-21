import { Env } from 'hono';

export type AppEnv = Env & {
  Bindings: {
    ASSETS: Fetcher;
    DB: D1Database;
    ENV_TYPE: 'dev' | 'prod' | 'stage';
  };
};