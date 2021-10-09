import { RouterContext, v4 } from "../deps.ts";
import Dailyreport from "../models/Dailyreport.ts";
import Dailyreportimg from "../models/Dailyreportimg.ts";

export class DailyreportController {
  async getFristpage(ctx: RouterContext) {
    const dailyreport = await Dailyreport.findFristpage();
    if (dailyreport) {
      ctx.response.status = 200;
      ctx.response.body = dailyreport;
    }
  }
  async getOne(ctx: RouterContext) {
    const id: string = ctx.params.id!;
    const dailyreport = await Dailyreport.findOne(new Date(id));
    if (dailyreport) {
      ctx.response.status = 200;
      ctx.response.body = dailyreport;
    }
  }
  async getAll(ctx: RouterContext) {
    const dailyreport = await Dailyreport.findAll();
    if (dailyreport) {
      ctx.response.status = 200;
      ctx.response.body = dailyreport;
    }
  }
  async createdailyreport(ctx: RouterContext) {
    const body = await ctx.request.body();
    const value = await body.value;
    const id: string = value.id;
    const datecurrent = value.datecurrent;
    const condatecurrent = new Date(datecurrent);
    const create_date = new Date();
    const create_by = value.create_by;
    const kpimain = new Dailyreport(
      id,
      condatecurrent,
      create_date,
      create_by,
      null,
      "",
    );

    const kpimainall: Dailyreport | null = await Dailyreport.findOne(
      condatecurrent,
    );
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

  async createkdailyreportimg(ctx: RouterContext) {
    const result = await ctx.request.body({ type: "form-data" });
    const formdata = await result.value.read({ maxSize: 5000000 });
    let list: any = [];
    formdata.files?.forEach((element) => {
      list.push(element.originalName);
    });

    formdata.files?.forEach(async (item) => {
      const arr = await new Uint8Array(item.content as ArrayBuffer);
      Deno.writeFile("Dailyreport/" + item.originalName, arr);
    });
    for (let item of list) {
      const id = v4.generate();
      const dailyreport_id = formdata.fields.uuid;
      const pathimages = item;
      const create_date = new Date();
      const create_by = formdata.fields.create_by;
      const filename = item;
      const dailyreportimg = new Dailyreportimg(
        id,
        dailyreport_id,
        pathimages,
        create_date,
        create_by,
        null,
        "",
        filename,
      );
      const image: Dailyreportimg | null = await Dailyreportimg.findOneid(
        filename,
        dailyreport_id,
      );
      if (!image) {
        //ไม่เจอให้ insert และ เพิ่มรูป
        formdata.files?.forEach((item) => {
          const arr = new Uint8Array(item.content as ArrayBuffer);
          Deno.writeFile("Dailyreport/" + item.originalName, arr);
        });
        await dailyreportimg.create();
      } else {
        //เจอให้update path และลบรูปเก่า และเพิ่มรูป
        formdata.files?.forEach((item) => {
          const arr = new Uint8Array(item.content as ArrayBuffer);
          Deno.writeFile("Dailyreport/" + item.originalName, arr);
        });
      }
      //รอให้เซฟได้ก่อนค่อยสร้าง images ขึ้นมา
    }

    ctx.response.status = 201;
  }
  async sendfileimage(ctx: RouterContext) {
    try {
      const imageFilePath = "Dailyreport";
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

    const imageallinone = await Dailyreportimg.findAllbyid(id);
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
    const dailyreportimg: any | null = await Dailyreportimg.findbyId(
      id,
    );
    if (!dailyreportimg) {
      ctx.response.status = 404;
      ctx.response.body = { message: "Invalid ID" };
      return;
    }
    try {
      const result = await Dailyreportimg.delete(id);
      if (!result) return;
      const imageFilePath = "Dailyreport";
      const fullfilepath = `${imageFilePath}/${dailyreportimg[0].pathimg}`;
      await Deno.remove(fullfilepath);
      ctx.response.status = 200;
    } catch (error) {
      console.log(error);
      ctx.response.status = 404;
    }
  }
}

export default new DailyreportController();
