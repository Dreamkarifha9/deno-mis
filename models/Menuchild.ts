import { dbconfig } from "../config/dbconnect.ts";
import { Client, PoolClient, QueryResult, time } from "../deps.ts";

const client = new Client(dbconfig);

export default class Menuchild {
  constructor(
    public id: number,
    public menuid: number,
    public menuchildname: string,
    public menuchildeng: string,
  ) {
  }
  static async findAll(): Promise<Menuchild[] | null> {
    var menuchildlist: any = new Array();
    await client.connect();
    try {
      menuchildlist = await client.queryObject({
        text: `SELECT id,menuid,menuchildname,menuchildeng FROM menuchild ;`,
        args: [],
      });
      if (menuchildlist.rows.toString() === "") {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      await client.end();
    }
    return menuchildlist.rows;
  }
  // method for change return data
}
