import { RouterContext, Context, v4 } from "../deps.ts";
import Role from "../models/Role.ts";
import {
  Eventconnection,
  closeconnectionEvent,
  broadcastEventSingle,
} from "./../types.ts";

export class RoleController {
  async Createfile(ctx: RouterContext) {
    const role = await Role.CreatefileRole();
    ctx.response.status = 200;
  }
  async Updatefile(ctx: RouterContext) {
    const role = await Role.UpdatefileRole();
    ctx.response.status = 200;
  }
  async Readfile(ctx: RouterContext) {
    const role = await Role.ReadfileRole();
    ctx.response.status = 200;
  }
  async Deletefile(ctx: RouterContext) {
    const role = await Role.DeletefileRole();
    ctx.response.status = 200;
  }
  async testeventsource(ctx: RouterContext) {
    const userid: string = ctx.params.userid!;
    try {
      Eventconnection(ctx, userid, "connecttion");
      // const headers = new Headers([["access-control-allow-origin", "*"]]);
      // const target = ctx.sendEvents({ headers });
      // const totalprocess = 5;
      // for (let i = 0; i < totalprocess; i++) {
      //   target.dispatchMessage(
      //     { messages: "updateprocess", value: i + 1, total: 5 },
      //   );
      // }
    } catch (error) {
      console.log(error);
    }
  }
  async testsnd(ctx: Context) {
    let msgObj = new Object();
    msgObj = {
      msg: "อัพเดทRole",
    };
    await broadcastEventSingle(msgObj, "6bb221e8-12a2-4d6f-ad75-2f274f07b863");
    ctx.response.status = 201;
  }
  async closeconnect(ctx: Context) {
    // await closeconnectionEvent();
    ctx.response.status = 201;
  }
}
export default new RoleController();
