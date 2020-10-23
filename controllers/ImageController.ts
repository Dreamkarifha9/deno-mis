import { RouterContext, v4 } from "../deps.ts";
import Imagechine from "../models/machineimage.ts";

export class ImageController {
  async create(ctx: RouterContext) {
    const result = await ctx.request.body({ type: "form-data" });
    const formdata = await result.value.read({ maxSize: 5000000 });

    let list: any = [];
    formdata.files?.forEach((element) => {
      list.push(element.originalName);
    });

    formdata.files?.forEach(async (item) => {
      const arr = await new Uint8Array(item.content as ArrayBuffer);
      Deno.writeFile("uploads/" + item.originalName, arr);
    });

    for (let item of list) {
      const id = v4.generate();
      const idmachine = formdata.fields.idmachine;
      const pathimages = item;

      const create_date = new Date();
      const create_by = formdata.fields.create_by;
      const images = new Imagechine(
        id,
        idmachine,
        pathimages,
        create_date,
        create_by,
        null,
        "",
      );
      //รอให้เซฟได้ก่อนค่อยสร้าง images ขึ้นมา
      await images.create();
    }

    ctx.response.status = 201;
  }
  async uploadimages(ctx: RouterContext) {
    const id: string = ctx.params.id!;
    const result = await ctx.request.body({ type: "form-data" });
    const formdata = await result.value.read({ maxSize: 5000000 });

    const image: Imagechine | null = await Imagechine.findOne(
      formdata.fields.id,
    );
    if (!image) {
      //ไม่เจอให้ insert และ เพิ่มรูป
      formdata.files?.forEach((item) => {
        const arr = new Uint8Array(item.content as ArrayBuffer);
        Deno.writeFile("uploads/" + item.originalName, arr);
      });
    } else {
      //เจอให้update path และลบรูปเก่า และเพิ่มรูป
    }
  }
  async sendfileimage(ctx: RouterContext) {
    try {
      const imageFilePath = "uploads";
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

    const imageallinone = await Imagechine.findAllbyid(id);
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
    const machine: Imagechine | null = await Imagechine.findOneid(id);
    if (!machine) {
      ctx.response.status = 404;
      ctx.response.body = { message: "Invalid ID" };
      return;
    }
    await machine.delete();
    const imageFilePath = "uploads";
    const fullfilepath = `${imageFilePath}/${machine.pathimage}`;
    await Deno.remove(fullfilepath);
    ctx.response.status = 200;
  }
}

export default new ImageController();
