import { RouterContext, validateJwt } from "../deps.ts";
import User from "../models/User.ts";
import key from "../config/key.ts";

export const uploadMiddleware = async (ctx: RouterContext, next: Function) => {
  await next();
};
