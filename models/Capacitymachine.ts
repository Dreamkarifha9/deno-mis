import { dbconfig } from "../config/dbconnect.ts";
import { Client, PoolClient, QueryResult, time } from "../deps.ts";

const client = new Client(dbconfig);

export default class Capacitymachine {
  constructor(
    public id: number,
    public capacityname: string,
  ) {
  }
  static async findAll(): Promise<Capacitymachine[] | null> {
    var capacitynamelist: any = new Array();
    await client.connect();
    try {
      capacitynamelist = await client.queryObject({
        text: `SELECT id,capacityname FROM capacity ORDER BY id ASC ;`,
        args: [],
      });
      if (capacitynamelist.rows.toString() === "") {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      await client.end();
    }
    return capacitynamelist.rows;
  }
}
