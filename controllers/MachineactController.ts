import { RouterContext, v4 } from "../deps.ts";
import Machineact from "../models/machineact.ts";
export class MachineactController {
  async getAll(ctx: RouterContext) {
    const registeractall = await Machineact.findAll();

    if (registeractall) {
      ctx.response.status = 200;
      ctx.response.body = registeractall;
    }
  }
  async getOne(ctx: RouterContext) {
    const id: string = ctx.params.id!;
    const registeractall = await Machineact.findOne(id);
    if (registeractall) {
      ctx.response.status = 200;
      ctx.response.body = registeractall;
    }
  }

  /*** REPORT MACHINE ACT BY DIVISION ALL */
  async getdivision_allmachineact(ctx: RouterContext) {
    const seasonid_: string = ctx.params.seasonid!;
    const divisionid_: string = ctx.params.divisionid!;
    const year: string = ctx.params.year!;
    const month: string = ctx.params.month!;
    console.log("seasonid_>", seasonid_);
    console.log("divisionid_>", divisionid_);
    console.log("year>", year);
    console.log("month>", month);

    const machineactResult_ = await Machineact.findbydivision_allmachineact(
      seasonid_,
      divisionid_,
      year,
      month,
    );

    const result: any = machineactResult_?.filter((m) =>
      m.idmachine === "KI1-VP-CVP-0001"
    );
    console.log("result", result);
    if (machineactResult_) {
      ctx.response.status = 200;
      ctx.response.body = machineactResult_;
    }
  }

  async getActseason1(ctx: RouterContext) {
    const id: string = ctx.params.id!;
    const year: string = ctx.params.year!;

    const registeractall = await Machineact.findbyacttivityseason1(id, year);
    console.log("registeractall", registeractall);
    if (registeractall) {
      ctx.response.status = 200;
      ctx.response.body = registeractall;
    }
  }
  async getActseason2(ctx: RouterContext) {
    const id: string = ctx.params.id!;
    const year: string = ctx.params.year!;

    const registeractall = await Machineact.findbyacttivityseason2(id, year);
    if (registeractall) {
      ctx.response.status = 200;
      ctx.response.body = registeractall;
    }
  }

  async getActseasonbymonth1(ctx: RouterContext) {
    const id: string = ctx.params.id!;
    const year: string = ctx.params.year!;
    const month: string = ctx.params.month!;

    const registeractall = await Machineact.findbyacttivityseasonbymonth1(
      id,
      year,
      month,
    );

    if (registeractall) {
      ctx.response.status = 200;
      ctx.response.body = registeractall;
    }
  }
  async getActseasonbymonth2(ctx: RouterContext) {
    const id: string = ctx.params.id!;
    const year: string = ctx.params.year!;
    const month: string = ctx.params.month!;

    const registeractall = await Machineact.findbyacttivityseasonbymonth2(
      id,
      year,
      month,
    );

    if (registeractall) {
      ctx.response.status = 200;
      ctx.response.body = registeractall;
    }
  }

  async create(ctx: RouterContext) {
    const body = await ctx.request.body();
    const value = await body.value;

    const data = value.listmachineact;
    console.log("data >>>>>", data.length);

    for (let item of data) {
      const checkmachineact = await Machineact.findOnedupicateact(
        item.actid,
        item.actyear,
        item.actmonth,
        item.idmachine,
        item.season_id,
      );
      if (checkmachineact) {
        continue;
      }

      const id = v4.generate();
      const actid = item.actid;
      const actyear = item.actyear;
      const actmonth = item.actmonth;
      console.log("data Insert >>>>>", id);
      console.log("data Insert >>>>>", item.actmonth);
      console.log("data Insert >>>>>", item.actid);
      console.log("data Insert >>>>>", item.idmachine);

      const d1 = item.d1;
      const d2 = item.d2;
      const d3 = item.d3;
      const d4 = item.d4;
      const d5 = item.d5;
      const d6 = item.d6;
      const d7 = item.d7;
      const d8 = item.d8;
      const d9 = item.d9;
      const d10 = item.d10;
      const d11 = item.d11;
      const d12 = item.d12;
      const d13 = item.d13;
      const d14 = item.d14;
      const d15 = item.d15;
      const d16 = item.d16;
      const d17 = item.d17;
      const d18 = item.d18;
      const d19 = item.d19;
      const d20 = item.d20;
      const d21 = item.d21;
      const d22 = item.d22;
      const d23 = item.d23;
      const d24 = item.d24;
      const d25 = item.d25;
      const d26 = item.d26;
      const d27 = item.d27;
      const d28 = item.d28;
      const d29 = item.d29;
      const d30 = item.d30;
      const d31 = item.d31;
      const update_date = new Date();
      const update_by = item.update_by;
      const idmachine = item.idmachine;
      const machineact = new Machineact(
        id,
        actid,
        actyear,
        actmonth,
        d1,
        d2,
        d3,
        d4,
        d5,
        d6,
        d7,
        d8,
        d9,
        d10,
        d11,
        d12,
        d13,
        d14,
        d15,
        d16,
        d17,
        d18,
        d19,
        d20,
        d21,
        d22,
        d23,
        d24,
        d25,
        d26,
        d27,
        d28,
        d29,
        d30,
        d31,
        idmachine,
        update_date,
        update_by,
      );

      await machineact.create();
    }
    ctx.response.status = 201;
  }

  async delete(ctx: RouterContext) {
    const id: string = ctx.params.id!;
    const registeract: Machineact | null = await Machineact.findOne(id);
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
export default new MachineactController();
