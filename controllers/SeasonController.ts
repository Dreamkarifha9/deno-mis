import { RouterContext, v4 } from "../deps.ts";
import Season from "../models/Season.ts";
export class SeasonController {
  async getAll(ctx: RouterContext) {
    const seasonname = await Season.findAll();
    console.log(seasonname);
    if (seasonname) {
      ctx.response.status = 200;
      ctx.response.body = seasonname;
    }
  }
}
export default new SeasonController();
