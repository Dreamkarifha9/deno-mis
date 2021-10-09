import { Client } from "./deps.ts";
import { config } from "./config/dbconnect.ts";
export const dbClient = new Client(config.dbConfigsetup);
