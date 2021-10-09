import { dbconfig } from "../config/dbconnect.ts";
import { Client, PoolClient, QueryResult, time } from "../deps.ts";

const client = new Client(dbconfig);
export default class Kpiminor {
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
  static async findOne(id: Date): Promise<Kpiminor | null> {
    var KpiminorList: any = new Object();
    await client.connect();
    try {
      KpiminorList = await client.queryObject({
        text: `SELECT datecurrent FROM kpiminor WHERE datecurrent =$1 ;`,
        args: [id],
      });
      if (KpiminorList.rows.toString() === "") {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      await client.end();
    }
    return KpiminorList.rows;
  }
  static async findAll(): Promise<Kpiminor[] | null> {
    await client.connect();
    var KpiminorList: any = new Array();
    try {
      KpiminorList = await client.queryObject({
        text: `SELECT * FROM kpiminor order by datecurrent`,
        args: [],
      });
      if (KpiminorList.rows.toString() === "") {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      await client.end();
    }
    return KpiminorList.rows;
  }
  async createkpimain() {
    await client.connect();
    try {
      const result: QueryResult = await client.queryObject({
        text: `INSERT INTO kpiminor (id,datecurrent,create_date,create_by)
          VALUES ($1, $2, $3, $4);`,
        args: [
          this.id,
          this.datecurrent,
          this.create_date,
          this.create_by,
        ],
      });
    } catch (error) {
      console.log(error);
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
    this.update_by = update_by;
    await client.connect();
    try {
      const result: QueryResult = await client.queryObject({
        text: `UPDATE kpiminor SET datecurrent=$2, update_date=$3, update_by=$4
          WHERE id=$1;`,
        args: [
          this.id,
          this.datecurrent,
          time().tz("asia/Jakarta").t,
          this.update_by,
        ],
      });
    } catch (error) {
      console.log(error);
    } finally {
      await client.end();
    }
    return this;
  }
}
