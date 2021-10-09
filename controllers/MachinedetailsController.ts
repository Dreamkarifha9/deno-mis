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
  async getAllmachinebyid(ctx: RouterContext) {
    const body = await ctx.request.body();
    const value = await body.value;
    const data = value.listmachine;
    const machineall = await Machinedetails.findallbyid(data);
    if (machineall) {
      ctx.response.status = 200;
      ctx.response.body = machineall;
    }
  }
  async createexcel(ctx: RouterContext) {
    const body = await ctx.request.body();
    const value = await body.value;

    const create_date = new Date();
    const arraylist = new Array();
    //*************** ข้อควรระวัง อย่าไป ลบ ข้อมูล machinedetails id pk ออก เพราะมันเชื่อมกับ machineactivity กิจกรรมอยู่ เพิ่มได้อย่างเดียว อย่าลบ */
    try {
      const readfile = await Deno.open(
        "files/อะไหล่รวม part 4.csv",
      );

      // for await (const obj of readCSVObjects(readfile)) {
      //   arraylist.push(obj);
      // }
      // readfile.close();
      // const maparr = arraylist.map((item) => ({
      //   idmachine: item.idmachine.trim(),
      //   orders: item.orders.trim(),
      //   name: item.name.trim(),
      //   unit: item.unit.trim(),
      //   idproduct: item.idproduct.trim(),
      //   w3: item.w3,
      //   m1: item.m1,
      //   m3: item.m3,
      //   y1: item.y1,
      //   y2: item.y2,
      //   y3: item.y3,
      //   oh: item.oh,
      //   number: item.number,
      // }));
      // for await (const item of maparr) {
      //   // const machine: Machine | null = await Machine.findOne(
      //   //   item.idmachine,
      //   // );
      //   // if (!machine) {

      //   // }
      //   const run_id = v4.generate();
      //   console.log("run_id", run_id);
      //   const machinedetails = new Machinedetails(
      //     run_id,
      //     item.idmachine,
      //     item.orders,
      //     item.name,
      //     item.unit,
      //     item.idproduct,
      //     item.w3,
      //     item.m1,
      //     item.m3,
      //     item.y1,
      //     item.y2,
      //     item.y3,
      //     item.oh,
      //     item.number,
      //     create_date,
      //     "Admin",
      //     create_date,
      //     "Admin",
      //   );
      //   await machinedetails.create();
      // }
    } catch (error) {
      console.log(error);
    }

    ctx.response.status = 201;
    // ctx.response.body = point;
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
      const result = await Machinedetails.update(
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
    try {
      const result = await Machinedetails.delete(id);
      if (!result) return;
      ctx.response.status = 200;
    } catch (error) {
      ctx.response.status = 404;
    }
  }
}

export default new MachinedetailsController();
