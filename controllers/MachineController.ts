import { RouterContext, v4 } from "../deps.ts";
import Machine from "../models/Machine.ts";
export class MachineController {
  async getAll(ctx: RouterContext) {
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
      await machine.update(
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
      ctx.response.body = machine;
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
