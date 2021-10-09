import { dbconfig } from "../config/dbconnect.ts";
import {
  Client,
  dateToString,
  PoolClient,
  QueryResult,
  time,
  v4,
} from "../deps.ts";
import { Irepairhistorymachine } from "../entity/repairhistorymachine.ts";
const client = new Client(dbconfig);

export default class Machineactresult {
  constructor() {
  }
  static async insert(
    data: Partial<Irepairhistorymachine>,
  ): Promise<any | null> {
    console.log("insert data", data);
    try {
      await client.connect();
      const text =
        `INSERT INTO repairhistorymachine (id,cause,detail,userid,pm,breakdown,documentimg,moreimg,remarks,createat,createby,updateat,updateby,createrepair,idmachine,machinedetail)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16);`;
      const result = await client.queryObject({
        text,
        args: [
          data.id,
          data.cause,
          data.detail,
          data.userid,
          data.pm,
          data.breakdown,
          data.documentimg,
          data.moreimg,
          data.remarks,
          time().tz("asia/Jakarta").t,
          data.createby,
          time().tz("asia/Jakarta").t,
          data.updateby,
          data.createrepair,
          data.idmachine,
          data.machinedetail,
        ],
      });
      await client.end();
      return result.rows;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async updatedoucementimg(
    id: string,
    documentimg: string | null,
  ): Promise<any | null> {
    try {
      await client.connect();
      const text = `UPDATE repairhistorymachine SET  documentimg=$2
      WHERE id=$1;`;
      const result = await client.queryObject({
        text,
        args: [
          id,
          documentimg,
        ],
      });
      await client.end();
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  static async updatemoreimg(
    id: string,
    moreimg: string | null,
  ): Promise<any | null> {
    try {
      await client.connect();
      const text = `UPDATE repairhistorymachine SET  moreimg=$2
      WHERE id=$1;`;
      const result = await client.queryObject({
        text,
        args: [
          id,
          moreimg,
        ],
      });
      await client.end();
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  static async update(
    data: Partial<Irepairhistorymachine>,
  ): Promise<any | null> {
    console.log("data", data);
    try {
      await client.connect();
      const text =
        `UPDATE repairhistorymachine SET cause=$2, detail=$3, userid=$4, pm=$5, breakdown=$6, documentimg=$7, moreimg=$8, remarks=$9, updateat=$10, updateby=$11, createrepair=$12, idmachine=$13, machinedetail=$14
      WHERE id=$1;`;
      const result = await client.queryObject({
        text,
        args: [
          data.id,
          data.cause,
          data.detail,
          data.userid,
          data.pm,
          data.breakdown,
          data.documentimg,
          data.moreimg,
          data.remarks,
          time().tz("asia/Jakarta").t,
          data.updateby,
          data.createrepair,
          data.idmachine,
          data.machinedetail,
        ],
      });
      await client.end();
      return result.rows;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }

  static async findOne(id: string): Promise<Irepairhistorymachine | null> {
    var _Result: any = new Object();
    await client.connect();
    try {
      _Result = await client.queryObject({
        text: `SELECT * FROM repairhistorymachine WHERE id =$1 ;`,
        args: [id],
      });
      if (_Result.rows.toString() === "") {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      await client.end();
    }
    return _Result.rows;
  }

  static async findIdmachineAndCreaterepair(
    idmachine: string,
    createrepair: Date,
  ): Promise<Irepairhistorymachine | null> {
    var _Result: any = {};
    console.log("idmachine", idmachine);
    console.log("createrepair", createrepair);

    await client.connect();
    try {
      _Result = await client.queryObject({
        text:
          `SELECT * FROM repairhistorymachine WHERE idmachine =$1 and  createrepair::DATE =$2
          ORDER BY id ASC ;`,
        args: [idmachine, dateToString("yyyy-MM-dd", createrepair)],
      });

      if (_Result.rows.toString() === "") {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      await client.end();
    }
    return _Result.rows;
  }

  static async findAll(
    idmachine: string,
  ): Promise<Irepairhistorymachine[] | null> {
    var _Result: any = new Array();
    await client.connect();
    try {
      _Result = await client.queryObject({
        text:
          `SELECT r.idmachine,u.name, r.id, r.cause, r.detail, r.userid, r.pm, r.breakdown, r.documentimg, r.moreimg, r.remarks, r.createrepair, r.machinedetail
        FROM repairhistorymachine as r left join users u on r.userid = u.user_id where r.idmachine = $1 ;`,
        args: [idmachine],
      });

      if (_Result.rows.toString() === "") {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      await client.end();
    }
    return _Result.rows;
  }
}
