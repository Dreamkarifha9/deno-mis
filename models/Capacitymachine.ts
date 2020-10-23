import { dbconfig } from "../config/dbconnect.ts";
import { Client, QueryResult } from "../deps.ts";

const client = new Client(dbconfig);

export default class Capacitymachine {
  constructor(
    public id: number,
    public capacityname: string,
  ) {
  }
  static async findAll(): Promise<Capacitymachine[] | null> {
    const capacitynamelist: any = new Array();
    try {
      await client.connect();
      const result = await client.query({
        text: `SELECT id,capacityname FROM capacity ORDER BY id ASC ;`,
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
          capacitynamelist.push(obj);
        });
      }
    } catch (error) {
      console.log(error.toString());
      return null;
    } finally {
      await client.end();
    }
    return capacitynamelist.map((mahine: any) =>
      Capacitymachine.prepare(mahine)
    );
  }
  // method for change return data
  static prepare(data: any): Capacitymachine {
    const capacitymachine = new Capacitymachine(
      data.id,
      data.capacityname,
    );
    return capacitymachine;
  }
}
