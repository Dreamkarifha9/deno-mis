import { RouterContext, v4 } from "../deps.ts";
import Machine from "../models/Machine.ts";
export class MachineController {
  async getAll(ctx: RouterContext) {
    console.log("getall");
    const machineall = await Machine.findAll();
    if (machineall) {
      ctx.response.status = 200;
      ctx.response.body = machineall;
    }
  }
  async getDivisionall(ctx: RouterContext) {
    const divisions = await Machine.findAll();
    if (divisions) {
      ctx.response.status = 200;
      ctx.response.body = divisions;
    }
  }
  async getFristpage(ctx: RouterContext) {
    const divisions = await Machine.findfristpage();
    if (divisions) {
      ctx.response.status = 200;
      ctx.response.body = divisions;
    }
  }

  async getMachinebyid(ctx: RouterContext) {
    const id: string = ctx.params.id!;
    const machinegroupid = await Machine.findAllidMachinegroupid(id);
    if (machinegroupid) {
      ctx.response.status = 200;
      ctx.response.body = machinegroupid;
    }
  }

  async getmachindivisionid(ctx: RouterContext) {
    const id: string = ctx.params.id!;

    const machineall = await Machine.findAllidDivision(id);

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
    try {
      const readfile = await Deno.open(
        "files/ไฟฟ้า รวม.csv",
      );

      // for await (const obj of readCSVObjects(readfile)) {
      //   arraylist.push(obj);
      // }
      // readfile.close();
      // const maparr = arraylist.map((item) => ({
      //   idmachine: item.idmachine.trim(),
      //   namethai: item.namemachine.trim(),
      //   nameeng: item.nameeng.trim(),
      //   sizemachine: item.sizemachine === undefined
      //     ? null
      //     : item.sizemachine === ""
      //     ? null
      //     : item.sizemachine,
      //   capacity: item.capacity === undefined ? null : item.capacity === ""
      //     ? null
      //     : item.capacity,
      //   power: item.power === undefined
      //     ? null
      //     : item.power === ""
      //     ? null
      //     : item.power,
      //   point: item.point,
      //   model: item.model,
      //   nummachine: item.nummachine,
      //   usejob: item.usejob,
      //   capability: item.capability,
      //   manufacturer: item.manufacturer,
      //   machineinclude: item.machineinclude,
      //   genration: item.genration,
      //   energy: item.energy,
      //   create_date: item.create_date,
      //   create_by: item.create_by,
      //   update_date: item.update_date,
      //   update_by: item.update_by,
      //   division: item.division === undefined
      //     ? null
      //     : item.division === ""
      //     ? null
      //     : item.division,
      //   fis_refcode: item.fis_refcode,
      //   machinegroupid: item.machinegroupid,
      // }));
      // for await (const item of maparr) {
      //   // const machine: Machine | null = await Machine.findOne(
      //   //   item.idmachine,
      //   // );
      //   // if (!machine) {

      //   // }
      //   console.log("item.idmachine", item.idmachine);
      //   const machine = new Machine(
      //     item.idmachine,
      //     item.namethai,
      //     item.nameeng,
      //     Number(item.sizemachine),
      //     Number(item.capacity),
      //     Number(item.power),
      //     item.division,
      //     item.point,
      //     item.model,
      //     item.nummachine,
      //     item.usejob,
      //     item.capability,
      //     item.manufacturer,
      //     item.machineinclude,
      //     item.genration,
      //     item.energy,
      //     item.machinegroupid,
      //     item.fis_refcode,
      //     create_date,
      //     "Admin",
      //     create_date,
      //     "Admin",
      //   );
      //   await machine.create();
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
    const idmachine = value.idmachine;
    const namethai = value.namethai;
    const nameeng = value.nameeng;
    const sizemachine = value.sizemachine;
    const capacity = value.capacity;
    const power = value.power;
    const division = value.division;
    const point = value.point;
    const model = value.model;
    const nummachine = value.nummachine;
    const usejob = value.usejob;
    const capability = value.capability;
    const manufacturer = value.manufacturer;
    const machineinclude = value.machineinclude;
    const genration = value.genration;
    const energy = value.energy;
    const create_date = new Date();
    const create_by = value.create_by;
    const machine = new Machine(
      idmachine,
      namethai,
      nameeng,
      sizemachine,
      capacity,
      power,
      division,
      point,
      model,
      nummachine,
      usejob,
      capability,
      manufacturer,
      machineinclude,
      genration,
      energy,
      0,
      "",
      create_date,
      create_by,
      null,
      "",
    );
    await machine.create();
    ctx.response.status = 201;
    ctx.response.body = machine;
  }

  async update(ctx: RouterContext) {
    try {
      const idmachine: string = ctx.params.idmachine!;
      const body = await ctx.request.body();
      const value = await body.value;
      const namethai = value.namethai;
      const nameeng = value.nameeng;
      const sizemachine = value.sizemachine;
      const capacity = value.capacity;
      const power = value.power;
      const division = value.division;
      const point = value.point;
      const model = value.model;
      const nummachine = value.nummachine;
      const usejob = value.usejob;
      const capability = value.capability;
      const manufacturer = value.manufacturer;
      const machineinclude = value.machineinclude;
      const genration = value.genration;
      const energy = value.energy;
      const update_date = new Date();
      const update_by = value.update_by;
      const machine: Machine | null = await Machine.findOne(idmachine);
      if (!machine) {
        ctx.response.status = 404;
        ctx.response.body = { message: "Invalid Customer ID" };
        return;
      }
      const result = await Machine.update(
        idmachine,
        namethai,
        nameeng,
        sizemachine,
        capacity,
        power,
        division,
        point,
        model,
        nummachine,
        usejob,
        capability,
        manufacturer,
        machineinclude,
        genration,
        energy,
        update_date,
        update_by,
      );
      ctx.response.status = 200;
    } catch (error) {
      console.log(error);
    }
  }
  async delete(ctx: RouterContext) {
    const id: string = ctx.params.idmachine!;
    const machine: Machine | null = await Machine.findOne(id);
    if (!machine) {
      ctx.response.status = 404;
      ctx.response.body = { message: "Invalid customer ID" };
      return;
    }
    await machine.delete();
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
export default new MachineController();
