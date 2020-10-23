import { dbconfig } from "../config/dbconnect.ts";
import { Client, QueryResult } from "../deps.ts";

const client = new Client(dbconfig);

export default class Powermachine {
  constructor(
    public id: number,
    public powername: string,
  ) {
  }
  static async findAll(): Promise<Powermachine[] | null> {
    const powernamelist: any = new Array();
    try {
      await client.connect();
      const result = await client.query({
        text: `SELECT id,powername FROM power ORDER BY id ASC ;`,
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
          powernamelist.push(obj);
        });
      }
    } catch (error) {
      console.log(error.toString());
      return null;
    } finally {
      await client.end();
    }
    return powernamelist.map((mahine: any) => Powermachine.prepare(mahine));
  }
  // method for change return data
  static prepare(data: any): Powermachine {
    const powermachine = new Powermachine(
      data.id,
      data.powername,
    );
    return powermachine;
  }
}
