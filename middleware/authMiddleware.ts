import { RouterContext, validateJwt } from "../deps.ts";
import User from "../models/User.ts";
import key from "../config/key.ts";

export const authMiddleware = async (ctx: RouterContext, next: Function) => {
  const headers = ctx.request.headers;

  const authorization = headers.get("Authorization");
  if (!authorization) {
    ctx.response.status = 401;
    return;
  }

  const jwt = authorization.replace("Bearer ", "");
  if (jwt != null) {
    const data = await validateJwt({ jwt, key, algorithm: "HS256" });
    if (data.isValid) {
      await next();
      return;
    } else {
      ctx.response.status = 401;
      ctx.response.body = {
        success: false,
        error: "Token invalid",
      };
    }
  } else {
    ctx.response.status = 401;
    ctx.response.body = { success: false, error: "Token is null" };
  }
};
