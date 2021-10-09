import { RouterContext, v4 } from "../deps.ts";
import Registeract from "../models/Registeract.ts";
export class RegisteractController {
  async getFristpage(ctx: RouterContext) {
    try {
      const registeractall = await Registeract.findfristpage();
      if (registeractall) {
        ctx.response.status = 200;
        ctx.response.body = registeractall;
      }
    } catch (error) {
      console.log("error", error);
    }
  }
  async getAll(ctx: RouterContext) {
    try {
      const registeractall = await Registeract.findAll();
      if (registeractall) {
        ctx.response.status = 200;
        ctx.response.body = registeractall;
      }
    } catch (error) {
      console.log("error", error);
    }
  }
  async getOffset(ctx: RouterContext) {
    const offset: string = ctx.params.offset!;
    const limit: string = ctx.params.limit!;
    console.log(offset)
    console.log(limit)

    try {
      const registeractall = await Registeract.findAllOffset(Number(offset),Number(limit));
      if (registeractall) {
        ctx.response.status = 200;
        ctx.response.body = registeractall;
      }
    } catch (error) {
      console.log("error", error);
    }
  }
  async getOne(ctx: RouterContext) {
    const id: string = ctx.params.id!;
    const registeractall = await Registeract.findOne(id);
    if (registeractall) {
      ctx.response.status = 200;
      ctx.response.body = registeractall;
    }
  }
  async getMachinegroupid(ctx: RouterContext) {
    const id: string = ctx.params.id!;
    const season_id: string = ctx.params.seasonid!;
    const registeractall = await Registeract.findmachinegroupid(id, season_id);
    if (registeractall) {
      ctx.response.status = 200;
      ctx.response.body = registeractall;
    }
  }
  async create(ctx: RouterContext) {
    const body = await ctx.request.body();
    const value = await body.value;

    const actcode = value.actcode;
    const description = value.description;
    const standard = value.standard;
    const duratypeid = value.duratypeid;
    const is_active = value.is_active;
    const machinedetailsid = value.machinedetailsid;
    const result_type = value.result_type;
    const machinegroupid = value.machinegroupid;
    const checkyear = value.checkyear;
    const monthcurrent = value.monthcurrent;
    const season_id = value.season_id;
    const update_date = new Date();
    const update_by = value.update_by;
    const registeract = new Registeract(
      actcode,
      description,
      standard,
      duratypeid,
      is_active,
      machinedetailsid,
      result_type,
      machinegroupid,
      checkyear,
      monthcurrent,
      season_id,
      update_date,
      update_by,
    );
    await registeract.create();
    ctx.response.status = 201;
    ctx.response.body = registeract;
  }

  async testcreate(ctx: RouterContext) {
    const body = await ctx.request.body();
    const value = await body.value;

    const list = value.listregister;
    ctx.response.status = 201;
    ctx.response.body = true;
  }

  async update(ctx: RouterContext) {
    try {
      const id: any = ctx.params.id!;
      const body = await ctx.request.body();
      const value = await body.value;
      const standard = value.standard;
      const description = value.description;
      const update_by = value.update_by;
      const registeract: Registeract | null = await Registeract.findOne(id);
      if (!registeract) {
        ctx.response.status = 404;
        ctx.response.body = { message: "Invalid Customer ID" };
        return;
      }
      const result: any = await Registeract.update(
        id,
        standard,
        description,
        update_by,
      );
      ctx.response.status = 200;
      ctx.response.body = result.rows;
    } catch (error) {
      console.log(error);
    }
  }
  async delete(ctx: RouterContext) {
    const id: string = ctx.params.id!;
    const registeract: Registeract | null = await Registeract.findOne(id);
    if (!registeract) {
      ctx.response.status = 404;
      ctx.response.body = { message: "Invalid customer ID" };
      return;
    }
    try {
      const result = await Registeract.delete(id);
      if (!result) return;
      ctx.response.status = 200;
    } catch (error) {
      ctx.response.status = 404;
    }
  }
  // async getPointall(ctx: RouterContext) {
  //   const pointall = await Machine.findpointall();
  //   if (pointall) {
  //     ctx.response.status = 200;
  //     ctx.response.body = pointall;
  //   }
  // }
}
export default new RegisteractController();
