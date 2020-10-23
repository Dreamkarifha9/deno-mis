import { RouterContext, v4 } from "../deps.ts";
import Sizemachine from "../models/Sizemachine.ts";
export class SizemachineController {
  async getAll(ctx: RouterContext) {
    const sizename = await Sizemachine.findAll();
    if (sizename) {
      ctx.response.status = 200;
      ctx.response.body = sizename;
    }
  }
}
export default new SizemachineController();
