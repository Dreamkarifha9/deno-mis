import { RouterContext, v4 } from "../deps.ts";
import Division from "../models/Division.ts";

export class DivisionController {
  async getAll(ctx: RouterContext) {
    const divisionmachine = await Division.findAll();
    if (divisionmachine) {
      ctx.response.status = 200;
      ctx.response.body = divisionmachine;
    }
  }
  async createdivision(ctx: RouterContext) {
    const body = await ctx.request.body();
    const value = await body.value;
    const divisionname = value.divisionname;

    const division = new Division(
      divisionname
    );
    const division_check: Division | null = await Division.findOneDivisionname(
      divisionname,
    );

    if (!division_check) {
      await division.create();
      ctx.response.status = 201;
      ctx.response.body = division_check;
    }
     
  }

  async updatedivision(ctx: RouterContext) {
    try {
      const id: string = ctx.params.id!;
      const body = await ctx.request.body();
      const value = await body.value;
      const divisionname = value.divisionname;

      const division_check: Division | null = await Division.findOneDivisionname(
        divisionname,
      );

      if (!division_check) {
        try {
          const result = await Division.update(
            Number(id),
            divisionname,
          );
          
          ctx.response.status = 200;
        } catch (error) {
          ctx.response.status = 404;
          ctx.response.body = error;
          console.log("error", error);
        }

      }
    } catch (error) {
      console.log(error);
    }
  }
}


export default new DivisionController();
