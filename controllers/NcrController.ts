import { RouterContext, v4 } from "../deps.ts";
import Ncr from "../models/Ncr.ts";
import Ncrimages from "../models/Ncrimages.ts";
import { Incr } from "../entity/ncr.ts";
import { Incrimages } from "../entity/ncrimages.ts";

export class NcrController {
  async getFristpage(ctx: RouterContext) {
    const idmachine: string = ctx.params.id!;
    console.log("idmachine", idmachine);
    const ncr = await Ncr.findFristpage(idmachine);
    console.log("ncr", ncr);

    if (ncr) {
      console.log("in");

      ctx.response.status = 200;
      ctx.response.body = ncr;
    } else {
      console.log("noin");
    }
  }
  async getOne(ctx: RouterContext) {
    const id: string = ctx.params.id!;
    const ncr = await Ncr.findOne(new Date(id));
    if (ncr) {
      ctx.response.status = 200;
      ctx.response.body = ncr;
    }
  }
  async getAll(ctx: RouterContext) {
    const ncr = await Ncr.findAll();
    if (ncr) {
      ctx.response.status = 200;
      ctx.response.body = ncr;
    }
  }
  async createncr(ctx: RouterContext) {
    const body = await ctx.request.body();
    const value = await body.value;
    const id: string = value.id;
    const datecurrent = value.datecurrent;
    const condatecurrent = new Date(datecurrent);
    const create_date = new Date();
    const create_by = value.create_by;
    const idmachine = value.idmachine;
    const detail = value.detail;

    const data: Partial<Incr> = {
      id: id,
      datecurrent: condatecurrent,
      create_date: create_date,
      create_by: create_by,
      update_date: create_date,
      update_by: create_by,
      idmachine: idmachine,
      detail: detail,
    };

    console.log("data", data);

    const _findrepairmachine = await Ncr
      .findOneidmachine(
        condatecurrent,
        idmachine,
      );
    console.log("_findrepairmachine", _findrepairmachine);

    if (_findrepairmachine == null) {
      const post = await Ncr.createncr({ ...data });
      console.log("post", post);
      ctx.response.status = 201;
      ctx.response.body = post;
    } else {
      ctx.response.status = 404;
      ctx.response.body = { message: "วันที่นี้ถูกสร้างไปแล้ว" };
      return;
    }
  }

  async createkncrimg(ctx: RouterContext) {
    const result = await ctx.request.body({ type: "form-data" });
    const formdata = await result.value.read({ maxSize: 5000000 });
    let list: any = [];
    formdata.files?.forEach((element) => {
      list.push(element.originalName);
    });

    formdata.files?.forEach(async (item) => {
      const arr = await new Uint8Array(item.content as ArrayBuffer);
      Deno.writeFile("uploadncr/" + item.originalName, arr);
    });
    for (let item of list) {
      const data: Partial<Incrimages> = {
        id: v4.generate(),
        ncr_id: formdata.fields.uuid,
        pathimg: item,
        create_date: new Date(),
        create_by: formdata.fields.create_by,
        update_date: new Date(),
        update_by: formdata.fields.create_by,
        filename: item,
        idmachine: formdata.fields.idmachine,
      };
      const _findrepairmachine = await Ncrimages
        .findOneid(
          data.filename!,
          data.ncr_id!,
        );

      if (_findrepairmachine == null) {
        //ไม่เจอให้ insert และ เพิ่มรูป
        formdata.files?.forEach((item) => {
          const arr = new Uint8Array(item.content as ArrayBuffer);
          Deno.writeFile("uploadncr/" + item.originalName, arr);
        });
        const post = await Ncrimages.create({ ...data });
      } else {
        //เจอให้update path และลบรูปเก่า และเพิ่มรูป
        formdata.files?.forEach((item) => {
          const arr = new Uint8Array(item.content as ArrayBuffer);
          Deno.writeFile("uploadncr/" + item.originalName, arr);
        });
      }
      //รอให้เซฟได้ก่อนค่อยสร้าง images ขึ้นมา
    }

    ctx.response.status = 201;
  }
  async sendfileimage(ctx: RouterContext) {
    try {
      const imageFilePath = "uploadncr";
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
    console.log("id", id);
    const imageallinone = await Ncrimages.findAllbyid(id);
    console.log("imageallinone", imageallinone);

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
    console.log("id", id);

    const ncrimg: any | null = await Ncrimages.findbyId(
      id,
    );
    console.log("ncrimg", ncrimg);
    if (ncrimg == null) {
      ctx.response.status = 404;
      ctx.response.body = { message: "Invalid ID" };
      return;
    }
    try {
      const result = await Ncrimages.delete(id);
      if (!result) return;
      const imageFilePath = "uploadncr";
      const fullfilepath = `${imageFilePath}/${ncrimg[0].patimg}`;
      console.log("fullfilepath", fullfilepath);
      await Deno.remove(fullfilepath);
      ctx.response.status = 200;
    } catch (error) {
      console.log(error);
      ctx.response.status = 404;
    }
  }
}

export default new NcrController();
