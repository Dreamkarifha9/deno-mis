import { RouterContext, v4 } from "../deps.ts";
import Capacitymachine from "../models/Capacitymachine.ts";
export class CapacitychineController {
  async getAll(ctx: RouterContext) {
    const capacityname = await Capacitymachine.findAll();
    if (capacityname) {
      ctx.response.status = 200;
      ctx.response.body = capacityname;
    }
  }
}
export default new CapacitychineController();
