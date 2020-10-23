import { RouterContext, v4 } from "../deps.ts";
import History from "../models/History.ts";

export class HistoryController {
  async create(ctx: RouterContext) {
    const result = await ctx.request.body({ type: "form-data" });
    const formdata = await result.value.read({ maxSize: 5000000 });
    let list: any = [];
    formdata.files?.forEach((element) => {
      list.push(element.originalName);
    });

    formdata.files?.forEach(async (item) => {
      const arr = await new Uint8Array(item.content as ArrayBuffer);
      Deno.writeFile("uploadhistory/" + item.originalName, arr);
    });

    for (let item of list) {
      const id = v4.generate();
      const idmachine = formdata.fields.idmachine;
      const pathimages = item;
      const create_date = new Date();
      const create_by = formdata.fields.create_by;
      const update_date = new Date();
      const history = new History(
        id,
        idmachine,
        pathimages,
        create_date,
        create_by,
        null,
        "",
      );
      const historyimg: History | null = await History.findOne(
        idmachine,
        pathimages,
      );
      if (!historyimg) {
        //ไม่เจอให้ insert และ เพิ่มรูป
        formdata.files?.forEach((item) => {
          const arr = new Uint8Array(item.content as ArrayBuffer);
          Deno.writeFile("uploadhistory/" + item.originalName, arr);
        });
        await history.create();
      } else {
        // await history.update(
        //   historyimg.id,
        //   idmachine,
        //   pathimages,
        //   update_date,
        //   create_by,
        // );
        //เจอให้update path และลบรูปเก่า และเพิ่มรูป
        formdata.files?.forEach((item) => {
          const arr = new Uint8Array(item.content as ArrayBuffer);
          Deno.writeFile("uploadhistory/" + item.originalName, arr);
        });
      }
      //รอให้เซฟได้ก่อนค่อยสร้าง images ขึ้นมา
    }

    ctx.response.status = 201;
  }
  async uploadimages(ctx: RouterContext) {
    // const id: string = ctx.params.id!;
    // const result = await ctx.request.body({ type: "form-data" });
    // const formdata = await result.value.read({ maxSize: 5000000 });

    // const image: Planning | null = await Planning.findOne(
    //   formdata.fields.id,
    // );
    // if (!image) {
    //   //ไม่เจอให้ insert และ เพิ่มรูป
    //   formdata.files?.forEach((item) => {
    //     const arr = new Uint8Array(item.content as ArrayBuffer);
    //     Deno.writeFile("uploadplan/" + item.originalName, arr);
    //   });
    // } else {
    //   //เจอให้update path และลบรูปเก่า และเพิ่มรูป
    // }
  }
  async sendfileimage(ctx: RouterContext) {
    try {
      const imageFilePath = "uploadhistory";
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

    const imageallinone = await History.findAllbyid(id);
    if (imageallinone) {
      ctx.response.status = 200;
      ctx.response.body = imageallinone;
    }
  }
  async delectimage(ctx: RouterContext) {
    const id: string = ctx.params.id!;
    const history: History | null = await History.findOneid(id);
    if (!history) {
      ctx.response.status = 404;
      ctx.response.body = { message: "Invalid ID" };
      return;
    }
    await history.delete();
    const imageFilePath = "uploadhistory";
    const fullfilepath = `${imageFilePath}/${history.pathimage}`;
    await Deno.remove(fullfilepath);
    ctx.response.status = 200;
  }
}

export default new HistoryController();
