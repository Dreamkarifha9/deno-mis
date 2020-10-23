import { RouterContext, v4 } from "../deps.ts";
import Powermachine from "../models/Powermachine.ts";

export class PowermachineController {
  async getAll(ctx: RouterContext) {
    const powermachine = await Powermachine.findAll();
    if (powermachine) {
      ctx.response.status = 200;
      ctx.response.body = powermachine;
    }
  }
}
export default new PowermachineController();
