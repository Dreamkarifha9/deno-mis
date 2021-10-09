import { resize, RouterContext, v4 } from "../deps.ts";
import Repairhistorymachine from "../models/Repairhistorymachine.ts";
import { Irepairhistorymachine } from "../entity/repairhistorymachine.ts";
export class MachineactresultController {
  async getAll(ctx: RouterContext) {
    const idmachine: string = ctx.params.idmachine!;
    const _findmachineactresultall = await Repairhistorymachine.findAll(
      idmachine,
    );
    if (_findmachineactresultall) {
      ctx.response.status = 200;
      ctx.response.body = _findmachineactresultall;
    }
  }
  async getOne(ctx: RouterContext) {
    const id: string = ctx.params.id!;
    const _findmachineresultOne = await Repairhistorymachine.findOne(id);
    if (_findmachineresultOne) {
      ctx.response.status = 200;
      ctx.response.body = _findmachineresultOne;
    }
  }

  async sendfileimage(ctx: RouterContext) {
    try {
      console.log("Innn");
      const imageFilePath = "uploadrepairhistorymachine";
      const id: string = ctx.params.id!;
      const fullfilepath = `${imageFilePath}/${id}`;
      console.log("fullfilepath", fullfilepath);
      const imageBuf = await Deno.readFile(fullfilepath);

      ctx.response.body = imageBuf;
      ctx.response.headers.set("Content-Type", "image/png");
      ctx.response.status = 200;
    } catch (error) {
      console.log(error);
    }
  }

  async delectmoreimage(ctx: RouterContext) {
    const id: string = ctx.params.id!;
    console.log("id", id);

    const findrepairhistory: any | null = await Repairhistorymachine.findOne(
      id,
    );
    console.log("findrepairhistory", findrepairhistory);
    if (!findrepairhistory) {
      ctx.response.status = 404;
      ctx.response.body = { message: "Invalid ID" };
      return;
    }
    try {
      const result = await Repairhistorymachine.updatemoreimg(id, null);
      if (!result) return;
      const imageFilePath = "uploadrepairhistorymachine";
      const fullfilepath = `${imageFilePath}/${findrepairhistory[0].moreimg}`;
      console.log("fullfilepath", fullfilepath);
      await Deno.remove(fullfilepath);
      ctx.response.status = 201;
    } catch (error) {
      console.log(error);
      ctx.response.status = 404;
    }
  }

  async delectdoucmentimage(ctx: RouterContext) {
    const id: string = ctx.params.id!;
    console.log("id", id);
    const findrepairhistory: any | null = await Repairhistorymachine.findOne(
      id,
    );
    if (!findrepairhistory) {
      ctx.response.status = 404;
      ctx.response.body = { message: "Invalid ID" };
      return;
    }
    try {
      const result = await Repairhistorymachine.updatedoucementimg(id, null);
      if (!result) return;
      const imageFilePath = "uploadrepairhistorymachine";
      const fullfilepath = `${imageFilePath}/${
        findrepairhistory[0].documentimg
      }`;
      console.log("fullfilepath", fullfilepath);
      await Deno.remove(fullfilepath);
      ctx.response.status = 201;
    } catch (error) {
      console.log(error);
      ctx.response.status = 404;
    }
  }

  async createPost(ctx: RouterContext) {
    const {
      request,
      response,
    } = ctx;

    try {
      const result = await request.body({ type: "form-data" });
      const formdata = await result.value.read({ maxSize: 5000000 });
      let list: any = [];
      console.log("formdata", formdata);

      formdata.files?.forEach((element) => {
        list.push(element.originalName);
      });

      const id = v4.generate();
      const create_date = new Date();
      /// ดึงจาก formdata ที่แนบมาด้วย Object ข้อมูล ที่จะบันทึก

      const data: Partial<Irepairhistorymachine> = {
        id: id,
        cause: formdata.fields.cause,
        detail: formdata.fields.detail,
        userid: formdata.fields.userid,
        pm: formdata.fields.pm === "true" ? true : false,
        breakdown: formdata.fields.breakdown === "true" ? true : false,
        documentimg: list[0] === undefined ? null : list[0],
        moreimg: list[1] === undefined ? null : list[1],
        remarks: formdata.fields.remarks,
        createat: create_date,
        createby: formdata.fields.createby,
        updateby: formdata.fields.createby,
        createrepair: new Date(formdata.fields.createrepair),
        idmachine: formdata.fields.idmachine,
        machinedetail: formdata.fields.machinedetail,
      };

      console.log("data", data);

      const _findrepairmachine = await Repairhistorymachine
        .findIdmachineAndCreaterepair(
          data.idmachine!,
          data.createrepair!,
        );
      console.log("_findrepairmachine", _findrepairmachine);
      if (_findrepairmachine == null) {
        console.log("Insave");
        const post = await Repairhistorymachine.insert({ ...data });
        formdata.files?.forEach(async (item) => {
          const arr = new Uint8Array(item.content as ArrayBuffer);

          Deno.writeFile(
            "uploadrepairhistorymachine/" + item.originalName,
            arr,
          );
        });
        response.status = 201;
        response.body = post;
      } else {
        console.log("Nosave");

        response.status = 404;
        response.body = { message: "วันที่นี้ถูกสร้างไปแล้ว" };
        return;
      }
    } catch (error) {
      throw error;
    }
  }

  async updatePost(ctx: RouterContext) {
    const {
      request,
      response,
    } = ctx;

    try {
      const result = await request.body({ type: "form-data" });
      const formdata = await result.value.read({ maxSize: 5000000 });
      let list: any = [];

      formdata.files?.forEach((element) => {
        list.push(element.originalName);
      });

      const create_date = new Date();

      const _findrepairmachine = await Repairhistorymachine
        .findIdmachineAndCreaterepair(
          formdata.fields.idmachine!,
          new Date(formdata.fields.createrepair!),
        );

      /// ดึงจาก formdata ที่แนบมาด้วย Object ข้อมูล ที่จะบันทึก
      const data: Partial<Irepairhistorymachine> = {
        id: formdata.fields.id,
        cause: formdata.fields.cause,
        detail: formdata.fields.detail,
        userid: formdata.fields.userid,
        pm: formdata.fields.pm === "true" ? true : false,
        breakdown: formdata.fields.breakdown === "true" ? true : false,
        documentimg: list[0] === undefined
          ? _findrepairmachine!.documentimg
          : list[0],
        moreimg: list[1] === undefined ? _findrepairmachine!.moreimg : list[1],
        remarks: formdata.fields.remarks,
        createat: create_date,
        createby: formdata.fields.createby,
        updateby: formdata.fields.createby,
        createrepair: new Date(formdata.fields.createrepair),
        idmachine: formdata.fields.idmachine,
        machinedetail: formdata.fields.machinedetail,
      };

      console.log("Insave");
      const post = await Repairhistorymachine.update({ ...data });
      formdata.files?.forEach(async (item) => {
        const arr = new Uint8Array(item.content as ArrayBuffer);

        Deno.writeFile(
          "uploadrepairhistorymachine/" + item.originalName,
          arr,
        );
      });
      response.status = 201;
      response.body = post;
    } catch (error) {
      throw error;
    }
  }
}
export default new MachineactresultController();
