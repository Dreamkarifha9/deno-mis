import { dbconfig } from "../config/dbconnect.ts";
import { Client, PoolClient, QueryResult, time } from "../deps.ts";

const client = new Client(dbconfig);

export default class Sizemachine {
  constructor(
    public id: number,
    public sizename: string,
  ) {
  }
  static async findAll(): Promise<Sizemachine[] | null> {
    var Sizenamelist: any = new Array();
    await client.connect();
    try {
      Sizenamelist = await client.queryObject({
        text: `SELECT id,sizename FROM size ORDER BY id ASC ;`,
        args: [],
      });
      if (Sizenamelist.rows.toString() === "") {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      await client.end();
    }
    return Sizenamelist.rows;
  }
}
