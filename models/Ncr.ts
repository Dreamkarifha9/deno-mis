import { dbconfig } from "../config/dbconnect.ts";
import {
  Client,
  dateToString,
  PoolClient,
  QueryResult,
  time,
} from "../deps.ts";
import { Incr } from "../entity/ncr.ts";

const client = new Client(dbconfig);
export default class Ncr {
  public index: number = 0;
  constructor() {
  }
  static async findOne(id: Date): Promise<Incr | null> {
    var NcrList: any = new Object();
    await client.connect();
    try {
      NcrList = await client.queryObject({
        text: `SELECT datecurrent FROM ncr WHERE datecurrent =$1 ;`,
        args: [id],
      });
      if (NcrList.rows.toString() === "") {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      await client.end();
    }
    return NcrList.rows;
  }
  static async findOneidmachine(
    datecurrent: Date,
    idmachine: string,
  ): Promise<Incr | null> {
    var NcrList: any = new Object();
    await client.connect();
    try {
      NcrList = await client.queryObject({
        text:
          `SELECT datecurrent,idmachine FROM ncr WHERE datecurrent::DATE =$1 and idmachine=$2 ;`,
        args: [dateToString("yyyy-MM-dd", datecurrent), idmachine],
      });
      if (NcrList.rows.toString() === "") {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      await client.end();
    }
    return NcrList.rows;
  }
  static async findAll(): Promise<Incr[] | null> {
    var NcrList: any = new Array();
    await client.connect();
    try {
      NcrList = await client.queryObject({
        text: `SELECT * FROM ncr order by datecurrent`,
        args: [],
      });
      if (NcrList.rows.toString() === "") {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      await client.end();
    }
    return NcrList.rows;
  }
  static async findFristpage(idmachine: string): Promise<Incr[] | null> {
    var NcrList: any = new Array();
    await client.connect();
    try {
      NcrList = await client.queryObject({
        text: `SELECT * FROM ncr WHERE idmachine =$1 order by datecurrent`,
        args: [idmachine],
      });
      if (NcrList.rows.toString() === "") {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      await client.end();
    }
    return NcrList.rows;
  }
  static async createncr(data: Partial<Incr>): Promise<any | null> {
    await client.connect();
    try {
      const result = await client.queryObject({
        text:
          `INSERT INTO ncr (id,datecurrent,create_date,create_by,idmachine,detail)
          VALUES ($1, $2, $3, $4, $5, $6);`,
        args: [
          data.id,
          data.datecurrent,
          time().tz("asia/Jakarta").t,
          data.create_by,
          data.idmachine,
          data.detail,
        ],
      });
      return result.rows;
    } catch (error) {
      console.log(error);
    } finally {
      await client.end();
    }
  }
  static async updatencr(data: Partial<Incr>): Promise<any | null> {
    await client.connect();
    try {
      const result: QueryResult = await client.queryObject({
        text:
          `UPDATE ncr SET datecurrent=$2, update_date=$3, update_by=$4, idmachine=$5
          WHERE id=$1;`,
        args: [
          data.id,
          data.datecurrent,
          time().tz("asia/Jakarta").t,
          data.update_by,
        ],
      });
    } catch (error) {
      console.log(error);
    } finally {
      await client.end();
    }
    return this;
  }
}
