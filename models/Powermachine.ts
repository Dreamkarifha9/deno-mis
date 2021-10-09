import { dbconfig } from "../config/dbconnect.ts";
import { Client, PoolClient, QueryResult, time } from "../deps.ts";

const client = new Client(dbconfig);

export default class Powermachine {
  constructor(
    public id: number,
    public powername: string,
  ) {
  }
  static async findAll(): Promise<Powermachine[] | null> {
    var powernamelist: any = new Array();
    await client.connect();
    try {
      powernamelist = await client.queryObject({
        text: `SELECT id,powername FROM power ORDER BY id ASC ;`,
        args: [],
      });
      if (powernamelist.rows.toString() === "") {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      await client.end();
    }
    return powernamelist.rows;
  }
}
