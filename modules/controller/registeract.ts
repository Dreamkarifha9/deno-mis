import registerService from "../service/registeract.service.ts";
import { RouterContext, v4 } from "../../deps.ts";
class RegisterController {
  async getAll(ctx: any): Promise<any> {
    ctx.response.status = 200;
    ctx.response.body = await registerService.findAll();
  }

  async getFristpage(ctx: RouterContext): Promise<any> {
    ctx.response.status = 200;
    ctx.response.body = await registerService.findFristpage();
  }

  async getOne(ctx: RouterContext): Promise<any> {
    ctx.response.status = 200;
    ctx.response.body = await registerService.findById(ctx);
  }

  async getMachinegroupid(ctx: RouterContext): Promise<any> {
    ctx.response.status = 200;
    ctx.response.body = await registerService.findmachinegroupid(ctx);
  }

  async create(ctx: RouterContext): Promise<any> {
    await registerService.create(ctx);

    ctx.response.status = 201;
    ctx.response.body = {
      meta: {
        code: 201,
        status: "Created",
      },
    };
  }

  async update(ctx: RouterContext): Promise<any> {
    await registerService.update(ctx);

    ctx.response.status = 200;
    ctx.response.body = {
      meta: {
        code: 200,
        status: "Ok",
      },
    };
  }

  async delete(ctx: RouterContext): Promise<any> {
    const id: string = ctx.params.id!;
    await registerService.delete(Number(id));

    ctx.response.status = 200;
    ctx.response.body = {
      meta: {
        code: 200,
        status: "Ok",
      },
    };
  }
}

export default new RegisterController();
