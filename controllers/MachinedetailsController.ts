import { RouterContext, v4 } from "../deps.ts";
import Machinedetails from "../models/Machinedetails.ts";

export class MachinedetailsController {
  async getAll(ctx: RouterContext) {
    const id: string = ctx.params.id!;
    const machineall = await Machinedetails.findOne(id);
    if (machineall) {
      ctx.response.status = 200;
      ctx.response.body = machineall;
    }
  }
  async create(ctx: RouterContext) {
    const body = await ctx.request.body();
    const value = await body.value;
    const id = v4.generate();
    const idmachine = value.idmachine;
    const orders = value.orders;
    const name = value.name;
    const unit = value.unit;
    const idproduct = value.idproduct;
    const w3 = value.w3;
    const m1 = value.m1;
    const m3 = value.m3;
    const y1 = value.y1;
    const y2 = value.y2;
    const y3 = value.y3;
    const oh = value.oh;
    const number = value.number;
    const create_date = new Date();
    const create_by = value.create_by;
    const machinedetails = new Machinedetails(
      id,
      idmachine,
      orders,
      name,
      unit,
      idproduct,
      w3,
      m1,
      m3,
      y1,
      y2,
      y3,
      oh,
      number,
      create_date,
      create_by,
      null,
      "",
    );
    await machinedetails.create();
    ctx.response.status = 201;
    ctx.response.body = machinedetails;
  }
  async update(ctx: RouterContext) {
    try {
      const id: string = ctx.params.id!;
      const body = await ctx.request.body();
      const value = await body.value;
      const idmachine = value.idmachine;
      const orders = value.orders;
      const name = value.name;
      const unit = value.unit;
      const idproduct = value.idproduct;
      const w3 = value.w3;
      const m1 = value.m1;
      const m3 = value.m3;
      const y1 = value.y1;
      const y2 = value.y2;
      const y3 = value.y3;
      const oh = value.oh;
      const number = value.number;
      const update_date = new Date();
      const update_by = value.update_by;
      const machine: Machinedetails | null = await Machinedetails.findOneId(id);
      if (!machine) {
        ctx.response.status = 404;
        ctx.response.body = { message: "Invalid Customer ID" };
        return;
      }
      await machine.update(
        id,
        idmachine,
        orders,
        name,
        unit,
        idproduct,
        w3,
        m1,
        m3,
        y1,
        y2,
        y3,
        oh,
        number,
        update_date,
        update_by,
      );
      ctx.response.status = 200;
      ctx.response.body = machine;
    } catch (error) {
      console.log(error);
    }
  }
  async delete(ctx: RouterContext) {
    const id: string = ctx.params.id!;
    const machine: Machinedetails | null = await Machinedetails.findOneId(id);
    if (!machine) {
      ctx.response.status = 404;
      ctx.response.body = { message: "Invalid customer ID" };
      return;
    }
    await machine.delete();
    ctx.response.status = 200;
  }
}

export default new MachinedetailsController();
