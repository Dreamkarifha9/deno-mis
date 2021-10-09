import { RouterContext, v4 } from "../deps.ts";
import Machinegroup from "../models/Machinegroup.ts";
export class MachinegroupController {
  async getAll(ctx: RouterContext) {
    const machinegroupall = await Machinegroup.findAll();
    if (machinegroupall) {
      ctx.response.status = 200;
      ctx.response.body = machinegroupall;
    }
  }
  async getOne(ctx: RouterContext) {
    const id: string = ctx.params.id!;
    const machinegroupone = await Machinegroup.findOne(id);
    if (machinegroupone) {
      ctx.response.status = 200;
      ctx.response.body = machinegroupone;
    }
  }

  async create(ctx: RouterContext) {
    const body = await ctx.request.body();
    const value = await body.value;
    const name = value.name;
    const create_by = value.update_by;
    const create_date = new Date();
    const registeract = new Machinegroup(
      name,
      create_by,
      create_date,
      null,
      "",
    );
    await registeract.create();
    ctx.response.status = 201;
    ctx.response.body = registeract;
  }

  async update(ctx: RouterContext) {
    try {
      const id: any = ctx.params.id!;
      const body = await ctx.request.body();
      const value = await body.value;
      const name = value.name;
      const update_by = value.update_by;
      const update_date = new Date();

      const registeract: Machinegroup | null = await Machinegroup.findOne(id);
      if (!registeract) {
        ctx.response.status = 404;
        ctx.response.body = { message: "Invalid Customer ID" };
        return;
      }
      await registeract.update(
        id,
        name,
        update_by,
        update_date,
      );
      ctx.response.status = 200;
      ctx.response.body = registeract;
    } catch (error) {
      console.log(error);
    }
  }
  async delete(ctx: RouterContext) {
    const id: string = ctx.params.id!;
    const registeract: Machinegroup | null = await Machinegroup.findOne(id);
    if (!registeract) {
      ctx.response.status = 404;
      ctx.response.body = { message: "Invalid customer ID" };
      return;
    }
    await registeract.delete();
    ctx.response.status = 200;
  }
  // async getPointall(ctx: RouterContext) {
  //   const pointall = await Machine.findpointall();
  //   if (pointall) {
  //     ctx.response.status = 200;
  //     ctx.response.body = pointall;
  //   }
  // }
}
export default new MachinegroupController();
