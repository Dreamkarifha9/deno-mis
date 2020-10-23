import { dbconfig } from "../config/dbconnect.ts";
import { Client, QueryResult } from "../deps.ts";

const client = new Client(dbconfig);

export default class Division {
  constructor(
    public id: number,
    public divisionname: string,
  ) {
  }
  static async findAll(): Promise<Division[] | null> {
    const divisionlist: any = new Array();
    try {
      await client.connect();
      const result = await client.query({
        text: `SELECT * FROM division ORDER BY id ASC ;`,
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
          divisionlist.push(obj);
        });
      }
    } catch (error) {
      console.log(error.toString());
      return null;
    } finally {
      await client.end();
    }
    return divisionlist.map((mahine: any) => Division.prepare(mahine));
  }
  // method for change return data
  static prepare(data: any): Division {
    const division = new Division(
      data.id,
      data.divisionname,
    );
    return division;
  }
}
