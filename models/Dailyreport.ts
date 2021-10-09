import { dbconfig } from "../config/dbconnect.ts";
import { Client, PoolClient, QueryResult, time } from "../deps.ts";

const client = new Client(dbconfig);
export default class Dailyreport {
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
  static async findOne(id: Date): Promise<Dailyreport | null> {
    var DailyreportList: any = new Object();
    await client.connect();
    try {
      DailyreportList = await client.queryObject({
        text: `SELECT * FROM dailyreport WHERE datecurrent =$1 ;`,
        args: [id],
      });
      if (DailyreportList.rows.toString() === "") {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      await client.end();
    }
    return DailyreportList.rows;
  }
  static async findAll(): Promise<Dailyreport[] | null> {
    var DailyreportList: any = new Array();
    await client.connect();
    try {
      DailyreportList = await client.queryObject({
        text: `SELECT * FROM dailyreport order by datecurrent`,
        args: [],
      });
      if (DailyreportList.rows.toString() === "") {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      await client.end();
    }
    return DailyreportList.rows;
  }
  static async findFristpage(): Promise<Dailyreport[] | null> {
    var DailyreportList: any = new Array();
    await client.connect();
    try {
      DailyreportList = await client.queryObject({
        text: `SELECT * FROM dailyreport order by datecurrent LIMIT 15`,
        args: [],
      });
      if (DailyreportList.rows.toString() === "") {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      await client.end();
    }
    console.log("DailyreportList", DailyreportList);
    return DailyreportList.rows;
  }
  async createkpimain() {
    await client.connect();
    try {
      const result: QueryResult = await client.queryObject({
        text: `INSERT INTO dailyreport (id,datecurrent,create_date,create_by)
          VALUES ($1, $2, $3, $4);`,
        args: [
          this.id,
          this.datecurrent,
          time().tz("asia/Jakarta").t,
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
        text:
          `UPDATE dailyreport SET datecurrent=$2, update_date=$3, update_by=$4
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
