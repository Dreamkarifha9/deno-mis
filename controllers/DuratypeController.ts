import { RouterContext, v4 } from "../deps.ts";
import Duratype from "../models/Duratype.ts";
export class DuratypeController {
  async getAll(ctx: RouterContext) {
    const duratypeall = await Duratype.findAll();
    if (duratypeall) {
      ctx.response.status = 200;
      ctx.response.body = duratypeall;
    }
  }
  async getOne(ctx: RouterContext) {
    const id: string = ctx.params.id!;
    const duratypeone = await Duratype.findOne(id);
    if (duratypeone) {
      ctx.response.status = 200;
      ctx.response.body = duratypeone;
    }
  }

  async create(ctx: RouterContext) {
    const body = await ctx.request.body();
    const value = await body.value;
    const description = value.description;
    const dura_day = value.dura_day;
    const duratype = new Duratype(
      description,
      dura_day,
    );
    await duratype.create();
    ctx.response.status = 201;
    ctx.response.body = duratype;
  }

  async update(ctx: RouterContext) {
    try {
      const id: any = ctx.params.id!;
      const body = await ctx.request.body();
      const value = await body.value;
      const description = value.description;
      const dura_type = value.dura_type;

      const duratype: Duratype | null = await Duratype.findOne(id);
      if (!duratype) {
        ctx.response.status = 404;
        ctx.response.body = { message: "Invalid Customer ID" };
        return;
      }
      await duratype.update(
        id,
        description,
        dura_type,
      );
      ctx.response.status = 200;
      ctx.response.body = duratype;
    } catch (error) {
      console.log(error);
    }
  }
  async delete(ctx: RouterContext) {
    const id: string = ctx.params.id!;
    const duratype: Duratype | null = await Duratype.findOne(id);
    if (!duratype) {
      ctx.response.status = 404;
      ctx.response.body = { message: "Invalid customer ID" };
      return;
    }
    await duratype.delete();
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
export default new DuratypeController();
