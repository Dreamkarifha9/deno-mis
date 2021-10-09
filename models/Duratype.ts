import { dbconfig } from "../config/dbconnect.ts";
import { Client, PoolClient, QueryResult, time } from "../deps.ts";

const client = new Client(dbconfig);
export default class Duratype {
  public id: number = 0;
  constructor(
    public description: string,
    public dura_day: string,
  ) {
  }
  static async findOne(id: string): Promise<Duratype | null> {
    var DuratypeList: any = new Object();
    await client.connect();
    try {
      DuratypeList = await client.queryObject({
        text: `SELECT * FROM duratype WHERE id =$1 ;`,
        args: [id],
      });
      if (DuratypeList.rows.toString() === "") {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      await client.end();
    }
    return DuratypeList.rows;
  }
  static async findAllidDivision(id: string): Promise<Duratype[] | null> {
    var DuratypeList: any = new Array();
    await client.connect();
    try {
      DuratypeList = await client.queryObject({
        text:
          `SELECT * FROM public.historymachine LEFT JOIN division on historymachine.division = division.id
          LEFT JOIN size on historymachine.sizemachine = size.id
          LEFT JOIN capacity on historymachine.capacity = capacity.id
          LEFT JOIN power on historymachine.power = power.id
          WHERE historymachine.division = $1
          ORDER BY idmachine ASC ;`,
        args: [id],
      });
      if (DuratypeList.rows.toString() === "") {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      await client.end();
    }
    return DuratypeList.rows;
  }
  static async findAll(): Promise<Duratype[] | null> {
    var DuratypeList: any = new Array();
    await client.connect();
    try {
      DuratypeList = await client.queryObject({
        text: `SELECT * FROM duratype ORDER BY id ASC ;`,
        args: [],
      });

      if (DuratypeList.rows.toString() === "") {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      await client.end();
    }
    return DuratypeList.rows;
    // return RegisterList.map((registeract: any) =>
    //   Registeract.prepare(registeract)
    // );
  }
  async create() {
    await client.connect();
    try {
      const result: QueryResult = await client.queryObject({
        text: `INSERT INTO duratype (description,dura_day)
          VALUES ($1, $2, $3);`,
        args: [
          this.description,
          this.dura_day,
        ],
      });
    } catch (error) {
      console.log(error);
    } finally {
      await client.end();
    }
    return this;
  }
  async update(
    id: number,
    description: string,
    dura_day: string,
  ) {
    this.id = id;
    this.description = description;
    this.dura_day = dura_day;
    await client.connect();
    try {
      const result: QueryResult = await client.queryObject({
        text: `UPDATE duratype SET description=$2, dura_day=$3
          WHERE id=$1;`,
        args: [
          this.id,
          this.description,
          this.dura_day,
        ],
      });
    } catch (error) {
      console.log(error);
    } finally {
      await client.end();
    }
    return this;
  }
  async delete() {
    await client.connect();
    try {
      const result: QueryResult = await client.queryObject({
        text: `DELETE FROM duratype WHERE id=$1;`,
        args: [this.id],
      });
    } catch (error) {
      console.log(error);
    } finally {
      await client.end();
    }
    return this;
  }
}
