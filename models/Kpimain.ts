import { dbconfig } from "../config/dbconnect.ts";
import { Client, QueryResult } from "../deps.ts";

const client = new Client(dbconfig);
export default class Kpimain {
  public index: number = 0;
  constructor(
    public id: string,
    public datecurrent: Date,
    public create_date: Date | null,
    public create_by: string,
    public update_date: Date | null,
    public update_by: string,
  ) {
  }
  static async findOne(id: Date): Promise<Kpimain | null> {
    const KpimainList: any = new Object();
    try {
      await client.connect();
      const result = await client.query({
        text: `SELECT datecurrent FROM kpimain WHERE datecurrent =$1 ;`,
        args: [id],
      });
      if (result.rows.toString() === "") {
        return null;
      } else {
        result.rows.map((p) => {
          // let obj: any = new Object()
          result.rowDescription.columns.map((el, i) => {
            KpimainList[el.name] = p[i];
          });
          // customerList.push(obj);
        });
      }
    } catch (error) {
      console.log(error.toString());
      return null;
    } finally {
      await client.end();
    }
    return Kpimain.prepare(KpimainList);
  }
  static async findAll(): Promise<Kpimain[] | null> {
    const KpimainList: any = new Array();
    try {
      await client.connect();
      const result = await client.query({
        text: `SELECT * FROM kpimain`,
        args: [],
      });
      if (result.rows.toString() === "") {
        return null;
      } else {
        result.rows.map((p: any, j: any) => {
          let obj: any = new Object();
          result.rowDescription.columns.map((el: any, i: any) => {
            obj.index = j + 1;
            obj[el.name] = p[i];
          });
          KpimainList.push(obj);
        });
      }
    } catch (error) {
      console.log(error.toString());
      return null;
    } finally {
      await client.end();
    }
    return KpimainList.map((mahine: any) => Kpimain.prepare(mahine));
  }
  async createkpimain() {
    try {
      await client.connect();
      const result: QueryResult = await client.query({
        text: `INSERT INTO kpimain (id,datecurrent,create_date,create_by)
          VALUES ($1, $2, $3, $4);`,
        args: [
          this.id,
          this.datecurrent,
          this.create_date,
          this.create_by,
        ],
      });
    } catch (error) {
      console.log(error.toString());
    } finally {
      await client.end();
    }
    return this;
  }
  async updatekpimain(
    id: string,
    datecurrent: Date,
    update_date: Date,
    update_by: string,
  ) {
    this.id = id;
    this.datecurrent = datecurrent;
    this.update_date = update_date;
    this.update_by = update_by;
    try {
      await client.connect();
      const result: QueryResult = await client.query({
        text: `UPDATE kpimain SET datecurrent=$2, update_date=$3, update_by=$4
          WHERE id=$1;`,
        args: [
          this.id,
          this.datecurrent,
          this.update_date,
          this.update_by,
        ],
      });
    } catch (error) {
      console.log(error.toString());
    } finally {
      await client.end();
    }
    return this;
  }
  static prepare(data: any): Kpimain {
    const kpimain = new Kpimain(
      data.id,
      data.datecurrent,
      data.create_date,
      data.create_by,
      data.update_date,
      data.update_by,
    );
    kpimain.index = data.index;
    return kpimain;
  }
}
