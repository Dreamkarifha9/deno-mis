import RegisterRepository from "../../modules/repository/registeract.repository.ts";
import Register from "../../modules/dto/register.dto.ts";
class RegisterService {
  async findAll(): Promise<any> {
    const data = await RegisterRepository.findAll();
    if (data.rows.toString() === "") {
      return null;
    }
    return data.rows;
  }

  async findById(ctx: any): Promise<any> {
    const id: string = ctx.params.id!;
    const data = await RegisterRepository.findById(Number(id));
    if (data.rows.toString() === "") {
      return null;
    }
    return data.rows;
  }

  async findmachinegroupid(ctx: any): Promise<any> {
    const id: string = ctx.params.id!;
    const season_id: string = ctx.params.seasonid!;
    const data = await RegisterRepository.findmachinegroupid(id, season_id);
    if (data.rows.toString() === "") {
      return null;
    }
    return data.rows;
  }

  async findFristpage(): Promise<any> {
    const data = await RegisterRepository.findfristpage();
    if (data.rows.toString() === "") {
      return null;
    }
    return data.rows;
  }

  async create(ctx: any): Promise<any> {
    const body = await ctx.request.body();
    const value = await body.value;

    let register = new Register();
    register.actcode = value.actcode;
    register.description = value.description;
    register.standard = value.standard;
    register.duratypeid = value.actduratypeidcode;
    register.is_active = value.is_active;
    register.machinedetailsid = value.machinedetailsid;
    register.result_type = value.result_type;
    register.machinegroupid = value.machinegroupid;
    register.checkyear = value.checkyear;
    register.monthcurrent = value.monthcurrent;
    register.season_id = value.season_id;
    register.update_date = value.update_date;
    register.update_by = value.update_by;

    return await RegisterRepository.create(register);
  }

  async update(ctx: any): Promise<any> {
    const body = await ctx.request.body();
    const value = await body.value;
    let register = new Register();
    register.id = ctx.params.id!;
    register.standard = value.standard;
    register.description = value.description;
    register.update_by = value.update_by;
    const data = await RegisterRepository.findById(Number(register.id));
    if (!data) {
      ctx.response.status = 404;
      ctx.response.body = { message: "Invalid Customer ID" };
      return;
    }
    return await RegisterRepository.update(register);
  }

  async delete(id: number): Promise<any> {
    return await RegisterRepository.delete(id);
  }
}

export default new RegisterService();
