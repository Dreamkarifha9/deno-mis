import { RouterContext, v4 } from "../deps.ts";
import Permission from "../models/Permission.ts";
import Menuchild from "../models/Menuchild.ts";
import Menu from "../models/Menu.ts";

export class PermissionController {
  async getpermissionAll(ctx: RouterContext) {
    const id: string = ctx.params.id!;
    const registeractall = await Permission.findpermissionAll(id);
    if (registeractall) {
      ctx.response.status = 200;
      ctx.response.body = registeractall;
    }
  }
  async getAll(ctx: RouterContext) {
    const registeractall = await Permission.findAll();
    if (registeractall) {
      ctx.response.status = 200;
      ctx.response.body = registeractall;
    }
  }
  async getmenuAll(ctx: RouterContext) {
    const registeractall = await Menu.findAll();
    if (registeractall) {
      ctx.response.status = 200;
      ctx.response.body = registeractall;
    }
  }
  async getmenuchildAll(ctx: RouterContext) {
    const registeractall = await Menuchild.findAll();
    if (registeractall) {
      ctx.response.status = 200;
      ctx.response.body = registeractall;
    }
  }
  async create(ctx: RouterContext) {
    const body = await ctx.request.body();
    const value = await body.value;

    const data = value.listpermission;

    for (let item of data) {
      const checkmachineact = await Permission.findOnedupicateact(
        item.userid,
        item.idmenu,
        item.idmenuchild,
      );
      if (checkmachineact) {
        continue;
      }

      const idmenu = item.idmenu;
      const idmenuchild = item.idmenuchild;
      const view_read = item.view_read;
      const view_create = item.view_create;
      const view_edit = item.view_edit;
      const view_delete = item.view_delete;
      const permission = item.permission;

      const userid = item.userid;
      const machineact = new Permission(
        idmenu,
        idmenuchild,
        view_read,
        view_create,
        view_edit,
        view_delete,
        permission,
        userid,
      );
      try {
        await machineact.create(); //*บันทึกเอาแค่อันที่ไม่ซ้ำอันที่ซ้ำให้ Try catch ทำงานไป
      } catch (error) {
      }
    }
    ctx.response.status = 201;
  }

  async update(ctx: RouterContext) {
    const body = await ctx.request.body();
    const value = await body.value;

    const data = value.listpermission;
    console.log("data", data);
    for (let item of data) {
      const checkpermission: Permission | null = await Permission.findOne(
        item.id,
      );

      if (!checkpermission) {
        ctx.response.status = 404;
        ctx.response.body = { message: "Invalid Customer ID" };
        return;
      }
      const id = item.id;
      const view_read = item.view_read;
      const view_create = item.view_create;
      const view_edit = item.view_edit;
      const view_delete = item.view_delete;
      const permission = item.permission;
      const userid = item.userid;

      try {
        const result = await Permission.update(
          id,
          view_read,
          view_create,
          view_edit,
          view_delete,
          permission,
          userid,
        );
      } catch (error) {
        console.log("error", error);
      }
    }
    ctx.response.status = 201;
  }

  // async getPointall(ctx: RouterContext) {
  //   const pointall = await Machine.findpointall();
  //   if (pointall) {
  //     ctx.response.status = 200;
  //     ctx.response.body = pointall;
  //   }
  // }
}
export default new PermissionController();
