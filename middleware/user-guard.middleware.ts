import { httpErrors, Router, RouterContext, upload } from "../deps.ts";
import {
  Context,
  GetRoleCreate,
  GetRoleRead,
  GetRoleUpdate,
  GetRoleDelete,
} from "./../types.ts";
import {
  hasUserRoleCreate,
  hasUserRoleUpdate,
  hasUserRoleRead,
  hasUserRoleDelete,
} from "../helpers/roles.ts";

/**
 * has user role middleware 
 * checks authorization for context user, user roles
 */
const GuardCreate = () => {
  return async (ctx: Context, next: () => Promise<void>) => {
    // if auth user not found, throw error
    const header = ctx.request.headers;
    const listroles = header.get("user");
    if (listroles) {
      const role = JSON.parse(listroles);
      const roles = await GetRoleCreate();
      console.log(roles);
      //if roles specified, then check auth user's roles
      if (roles != undefined) {
        const isRoleMatched = hasUserRoleCreate(role, roles);

        //if no role mached throw forbidden error
        if (!isRoleMatched) {
          ctx.response.status = 403;
          ctx.response.body = {
            msgrole: false,
            success: false,
            error: "Access denied Role",
          };
          return;
        }
      }
    }

    await next();
  };
};
const GuardUpdater = () => {
  return async (ctx: Context, next: () => Promise<void>) => {
    // if auth user not found, throw error

    const header = ctx.request.headers;
    const listroles = header.get("user");
    if (listroles) {
      const role = JSON.parse(listroles);
      const roles = await GetRoleUpdate();
      //if roles specified, then check auth user's roles
      if (roles != undefined) {
        const isRoleMatched = hasUserRoleUpdate(role, roles);

        //if no role mached throw forbidden error
        if (!isRoleMatched) {
          ctx.response.status = 403;
          ctx.response.body = {
            msgrole: false,
            success: false,
            error: "Access denied Role",
          };
          return;
        }
      }
    }
    await next();
  };
};
const GuardRead = () => {
  return async (ctx: Context, next: () => Promise<void>) => {
    // if auth user not found, throw error

    const header = ctx.request.headers;
    const listroles = header.get("user");
    if (listroles) {
      const role = JSON.parse(listroles);
      const roles = await GetRoleRead();
      //if roles specified, then check auth user's roles
      if (roles != undefined) {
        const isRoleMatched = hasUserRoleRead(role, roles);

        //if no role mached throw forbidden error
        if (!isRoleMatched) {
          ctx.response.status = 403;
          ctx.response.body = {
            msgrole: false,
            success: false,
            error: "Access denied Role",
          };
          return;
        }
      }
    }
    await next();
  };
};
const GuardDelete = () => {
  return async (ctx: Context, next: () => Promise<void>) => {
    // if auth user not found, throw error

    const header = ctx.request.headers;
    const listroles = header.get("user");
    if (listroles) {
      const role = JSON.parse(listroles);
      const roles = await GetRoleDelete();
      //if roles specified, then check auth user's roles
      if (roles != undefined) {
        const isRoleMatched = hasUserRoleDelete(role, roles);

        //if no role mached throw forbidden error
        if (!isRoleMatched) {
          ctx.response.status = 403;
          ctx.response.body = {
            msgrole: false,
            success: false,
            error: "Access denied Role",
          };
          return;
        }
      }
    }
    await next();
  };
};

export { GuardCreate, GuardUpdater, GuardRead, GuardDelete };
