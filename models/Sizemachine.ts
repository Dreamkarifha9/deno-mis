import { dbconfig } from "../config/dbconnect.ts";
import { Client, QueryResult } from "../deps.ts";

const client = new Client(dbconfig);

export default class Sizemachine {
  constructor(
    public id: number,
    public sizename: string,
  ) {
  }
  static async findAll(): Promise<Sizemachine[] | null> {
    const Sizenamelist: any = new Array();
    try {
      await client.connect();
      const result = await client.query({
        text: `SELECT id,sizename FROM size ORDER BY id ASC ;`,
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
          Sizenamelist.push(obj);
        });
      }
    } catch (error) {
      console.log(error.toString());
      return null;
    } finally {
      await client.end();
    }
    return Sizenamelist.map((mahine: any) => Sizemachine.prepare(mahine));
  }
  // method for change return data
  static prepare(data: any): Sizemachine {
    const sizemachine = new Sizemachine(
      data.id,
      data.sizename,
    );
    return sizemachine;
  }
}
