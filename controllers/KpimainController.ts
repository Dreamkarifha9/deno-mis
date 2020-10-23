import { RouterContext, v4 } from "../deps.ts";
import Kpimain from "../models/Kpimain.ts";
import Kpimainimg from "../models/Kpimainimg.ts";

export class KpimainController {
  async getAll(ctx: RouterContext) {
    const kpimainall = await Kpimain.findAll();
    if (kpimainall) {
      ctx.response.status = 200;
      ctx.response.body = kpimainall;
    }
  }
  async createkpaimain(ctx: RouterContext) {
    const body = await ctx.request.body();
    const value = await body.value;
    const id: string = value.id;
    const datecurrent = value.datecurrent;
    const condatecurrent = new Date(datecurrent);
    const create_date = new Date();
    const create_by = value.create_by;
    const kpimain = new Kpimain(
      id,
      condatecurrent,
      create_date,
      create_by,
      null,
      "",
    );

    const kpimainall: Kpimain | null = await Kpimain.findOne(condatecurrent);
    if (!kpimainall) {
      await kpimain.createkpimain();

      ctx.response.status = 201;
      ctx.response.body = kpimain;
    } else {
      ctx.response.status = 404;
      ctx.response.body = { message: "วันที่นี้ถูกสร้างไปแล้ว" };
      return;
    }
  }

  async createkpimainimages(ctx: RouterContext) {
    const result = await ctx.request.body({ type: "form-data" });
    const formdata = await result.value.read({ maxSize: 5000000 });
    let list: any = [];
    formdata.files?.forEach((element) => {
      list.push(element.originalName);
    });

    formdata.files?.forEach(async (item) => {
      const arr = await new Uint8Array(item.content as ArrayBuffer);
      Deno.writeFile("Kpimain/" + item.originalName, arr);
    });
    for (let item of list) {
      const id = v4.generate();
      const fkid = formdata.fields.uuid;
      const pathimages = item;
      const create_date = new Date();
      const create_by = formdata.fields.create_by;
      const filename = item;
      const kpimainimg = new Kpimainimg(
        id,
        fkid,
        pathimages,
        create_date,
        create_by,
        null,
        "",
        filename,
      );
      const image: Kpimainimg | null = await Kpimainimg.findOneid(
        filename,
        fkid,
      );
      if (!image) {
        //ไม่เจอให้ insert และ เพิ่มรูป
        formdata.files?.forEach((item) => {
          const arr = new Uint8Array(item.content as ArrayBuffer);
          Deno.writeFile("Kpimain/" + item.originalName, arr);
        });
        await kpimainimg.create();
      } else {
        //เจอให้update path และลบรูปเก่า และเพิ่มรูป
        formdata.files?.forEach((item) => {
          const arr = new Uint8Array(item.content as ArrayBuffer);
          Deno.writeFile("Kpimain/" + item.originalName, arr);
        });
      }
      //รอให้เซฟได้ก่อนค่อยสร้าง images ขึ้นมา
    }

    ctx.response.status = 201;
  }
  async sendfileimage(ctx: RouterContext) {
    try {
      const imageFilePath = "Kpimain";
      const id: string = ctx.params.id!;
      const fullfilepath = `${imageFilePath}/${id}`;
      const imageBuf = await Deno.readFile(fullfilepath);
      ctx.response.body = imageBuf;
      ctx.response.headers.set("Content-Type", "image/png");
      ctx.response.status = 200;
    } catch (error) {
      console.log(error);
    }
  }
  async getimage(ctx: RouterContext) {
    const id: string = ctx.params.id!;

    const imageallinone = await Kpimainimg.findAllbyid(id);
    if (imageallinone) {
      ctx.response.status = 200;
      ctx.response.body = imageallinone;
    }
    // const imageBuf = await Deno.readFile("uploads/1.png");
    // let base64String = btoa(String.fromCharCode(...new Uint8Array(imageBuf)));
    // ctx.response.body = { data: base64String };
    // ctx.response.headers.set("Content-Type", "image/png");
  }

  async delectimage(ctx: RouterContext) {
    const id: string = ctx.params.id!;
    const kpimaininimg: Kpimainimg | null = await Kpimainimg.findbyId(id);
    if (!kpimaininimg) {
      ctx.response.status = 404;
      ctx.response.body = { message: "Invalid ID" };
      return;
    }
    await kpimaininimg.delete();
    const imageFilePath = "Kpimain";
    const fullfilepath = `${imageFilePath}/${kpimaininimg.pathimg}`;
    await Deno.remove(fullfilepath);
    ctx.response.status = 200;
  }

  async updatekpimain(ctx: RouterContext) {
    try {
      const body = await ctx.request.body();
      const value = await body.value;
      const id: string = value.id;
      const datecurrent = value.datecurrent;
      const condatecurrent = new Date(datecurrent);
      const update_date = new Date();
      const update_by = value.update_by;
      const kpimainupedit = new Kpimain(
        id,
        condatecurrent,
        update_date,
        update_by,
        null,
        "",
      );
      const kpimain: Kpimain | null = await Kpimain.findOne(condatecurrent);

      if (!kpimain) {
        kpimainupedit.updatekpimain(id, datecurrent, update_date, update_by);

        ctx.response.status = 201;
        ctx.response.body = kpimain;
      } else {
        ctx.response.status = 404;
        ctx.response.body = { message: "วันที่นี้มีอยู่ในระบบแล้ว" };
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default new KpimainController();
