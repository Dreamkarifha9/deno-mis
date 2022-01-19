import { dbconfig } from "../config/dbconnect.ts";
import { Client, PoolClient, QueryResult, time } from "../deps.ts";

const client = new Client(dbconfig);
export default class Kpimain {
  public index: number = 0;
  public divisionname: string = "";
  constructor(
    public id: string,
    public datecurrent: Date,
    public create_date: Date | null,
    public create_by: string,
    public update_date: Date | null,
    public update_by: string,
    public division_fk: number,
    public division_status: boolean,
    public division_statusall: boolean,
  ) {
  }
  static async findOne(id: Date, divisionid: string): Promise<Kpimain | null> {
    var KpimainList: any = new Object();
    await client.connect();
    try {
      KpimainList = await client.queryObject({
        text:
          `SELECT kpimain.id,kpimain.datecurrent,kpimain.division_status,kpimain.division_fk,division.divisionname FROM public.kpimain
          LEFT JOIN division on kpimain.division_fk = division.id
          where datecurrent = $1 and division_fk = $2
          ORDER BY datecurrent ASC  ;`,
        args: [id, divisionid],
      });
      if (KpimainList.rows.toString() === "") {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      await client.end();
    }
    return KpimainList.rows;
  }

  static async findAll(): Promise<Kpimain[] | null> {
    await client.connect();
    var KpimainList: any = new Array();
    try {
      KpimainList = await client.queryObject({
        text:
          `SELECT kpimain.id,kpimain.datecurrent,to_char(kpimain.datecurrent, 'YYYY') as groupdatecurrent,kpimain.division_status,kpimain.division_fk,division.divisionname FROM public.kpimain
        LEFT JOIN division on kpimain.division_fk = division.id
        ORDER BY datecurrent ASC `,
        args: [],
      });

      if (KpimainList.rows.toString() === "") {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      await client.end();
    }
    return KpimainList.rows;
  }

  static async findFristpage(): Promise<Kpimain[] | null> {
    await client.connect();
    var KpimainList: any = new Array();
    try {
      KpimainList = await client.queryObject({
        text:
          `SELECT kpimain.id,kpimain.datecurrent,to_char(kpimain.datecurrent, 'YYYY') as groupdatecurrent,kpimain.division_status,kpimain.division_fk,division.divisionname FROM public.kpimain
        LEFT JOIN division on kpimain.division_fk = division.id
        ORDER BY datecurrent ASC  `,
        args: [],
      });

      if (KpimainList.rows.toString() === "") {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      await client.end();
    }
    return KpimainList.rows;
  }

  static async findAlldivision(iddivision: string): Promise<Kpimain[] | null> {
    await client.connect();
    var KpimainList: any = new Array();
    try {
      KpimainList = await client.queryObject({
        text:
          `SELECT kpimain.id,kpimain.datecurrent,kpimain.datecurrent,to_char(kpimain.datecurrent, 'YYYY') as groupdatecurrent,kpimain.division_status,kpimain.division_fk,division.divisionname FROM public.kpimain
        LEFT JOIN division on kpimain.division_fk = division.id
        where division_fk = $1
        ORDER BY datecurrent ASC `,
        args: [iddivision],
      });

      if (KpimainList.rows.toString() === "") {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      await client.end();
    }
    return KpimainList.rows;
  }
  static async findAlldivision_statusall(
    divisionstatusall: boolean,
  ): Promise<Kpimain[] | null> {
    var KpimainList: any = new Array();
    await client.connect();
    try {
      KpimainList = await client.queryObject({
        text:
          `SELECT kpimain.id,kpimain.datecurrent,to_char(kpimain.datecurrent, 'YYYY') as groupdatecurrent,kpimain.division_status,kpimain.division_fk,division.divisionname FROM public.kpimain
          LEFT JOIN division on kpimain.division_fk = division.id
          where division_statusall = $1
          ORDER BY datecurrent ASC `,
        args: [divisionstatusall],
      });

      if (KpimainList.rows.toString() === "") {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      await client.end();
    }
    return KpimainList.rows;
  }
  static async findAlldivision_status(
    divisionstatus: boolean,
  ): Promise<Kpimain[] | null> {
    var KpimainList: any = new Array();
    await client.connect();
    try {
      KpimainList = await client.queryObject({
        text:
          `SELECT kpimain.id,kpimain.datecurrent,kpimain.division_status,kpimain.division_fk,division.divisionname FROM public.kpimain
          LEFT JOIN division on kpimain.division_fk = division.id
          where division_status = $1
          ORDER BY datecurrent ASC `,
        args: [divisionstatus],
      });

      if (KpimainList.rows.toString() === "") {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      await client.end();
    }
    return KpimainList.rows;
  }
  async createkpimain() {
    await client.connect();
    try {
      const result: QueryResult = await client.queryObject({
        text:
          `INSERT INTO kpimain (id,datecurrent,create_date,create_by,division_fk,division_status,division_statusall)
          VALUES ($1, $2, $3, $4, $5, $6, $7);`,
        args: [
          this.id,
          this.datecurrent,
          time().tz("asia/Jakarta").t,
          this.create_by,
          this.division_fk,
          this.division_status,
          this.division_statusall,
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
    division_status: boolean,
  ) {
    this.id = id;
    this.datecurrent = datecurrent;
    this.update_by = update_by;
    this.division_status = division_status;
    await client.connect();
    try {
      const result: QueryResult = await client.queryObject({
        text:
          `UPDATE kpimain SET datecurrent=$2, update_date=$3, update_by=$4, division_fk=$5, division_status=$6
          WHERE id=$1;`,
        args: [
          this.id,
          this.datecurrent,
          time().tz("asia/Jakarta").t,
          this.update_by,
          this.division_fk,
          this.division_status,
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
