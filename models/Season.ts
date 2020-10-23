import { dbconfig } from "../config/dbconnect.ts";
import { Client, QueryResult } from "../deps.ts";

const client = new Client(dbconfig);

export default class Season {
  constructor(
    public id: number,
    public name: string,
  ) {
  }
  static async findAll(): Promise<Season[] | null> {
    const Seasonlist: any = new Array();
    try {
      await client.connect();
      const result = await client.query({
        text: `SELECT id,name FROM season ;`,
        args: [],
      });
      if (result.rows.toString() === "") {
        return null;
      } else {
        result.rows.map((p: any) => {
          let obj: any = new Object();
          result.rowDescription.columns.map((el: any, i: any) => {
            obj[el.name] = p[i];
          });
          Seasonlist.push(obj);
        });
      }
    } catch (error) {
      console.log(error.toString());
      return null;
    } finally {
      await client.end();
    }
    return Seasonlist.map((mahine: any) => Season.prepare(mahine));
  }
  // method for change return data
  static prepare(data: any): Season {
    const seadson = new Season(
      data.id,
      data.name,
    );
    return seadson;
  }
}
