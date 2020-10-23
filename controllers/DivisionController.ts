import { RouterContext, v4 } from "../deps.ts";
import Division from "../models/Division.ts";

export class DivisionController {
  async getAll(ctx: RouterContext) {
    const powermachine = await Division.findAll();
    if (powermachine) {
      ctx.response.status = 200;
      ctx.response.body = powermachine;
    }
  }
}

export default new DivisionController();
