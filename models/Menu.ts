import { dbconfig } from "../config/dbconnect.ts";
import { Client, PoolClient, QueryResult, time } from "../deps.ts";

const client = new Client(dbconfig);

export default class Menu {
  constructor(
    public id: number,
    public menuname: string,
  ) {
  }
  static async findAll(): Promise<Menu[] | null> {
    var menulist: any = new Array();
    await client.connect();
    try {
      menulist = await client.queryObject({
        text: `SELECT id,menuname FROM menu ;`,
        args: [],
      });
      if (menulist.rows.toString() === "") {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      await client.end();
    }
    return menulist.rows;
  }
}
