import { RouterContext, v4 } from "../deps.ts";
import Machineactresult from "../models/Machineactresult.ts";
export class MachineactresultController {
  async getAll(ctx: RouterContext) {
    const _findmachineactresultall = await Machineactresult.findAll();
    if (_findmachineactresultall) {
      ctx.response.status = 200;
      ctx.response.body = _findmachineactresultall;
    }
  }
  async getOne(ctx: RouterContext) {
    const id: string = ctx.params.id!;
    const _findmachineresultOne = await Machineactresult.findOne(id);
    if (_findmachineresultOne) {
      ctx.response.status = 200;
      ctx.response.body = _findmachineresultOne;
    }
  }

  async getMactidAndDodate(ctx: RouterContext) {
    const mactid: string = ctx.params.mactid!;
    const do_date: string = ctx.params.dodate!;
    console.log("mactid", mactid);
    console.log("do_date", do_date);

    const _findmachineresultOne = await Machineactresult.findMactidAnddodate(
      mactid,
      do_date,
    );
    if (_findmachineresultOne) {
      ctx.response.status = 200;
      ctx.response.body = _findmachineresultOne;
    }
  }
}
export default new MachineactresultController();
