import { dbconfig } from "../config/dbconnect.ts";
import { Client, PoolClient, QueryResult, time } from "../deps.ts";

const client = new Client(dbconfig);

export default class Season {
  constructor(
    public id: number,
    public name: string,
  ) {
  }
  static async findAll(): Promise<Season[] | null> {
    var Seasonlist: any = new Array();
    await client.connect();
    try {
      Seasonlist = await client.queryObject({
        text: `SELECT id,name FROM season ;`,
        args: [],
      });
      if (Seasonlist.rows.toString() === "") {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      await client.end();
    }
    return Seasonlist.rows;
  }
}
