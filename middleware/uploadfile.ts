import { RouterContext, validateJwt, upload } from "../deps.ts";
import User from "../models/User.ts";
import key from "../config/key.ts";

export const uploadMiddleware = async (ctx: RouterContext, next: Function) => {
  console.log("test");
  await next();
};
