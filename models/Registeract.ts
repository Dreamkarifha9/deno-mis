import { dbconfig } from "../config/dbconnect.ts";
import { DEFAULT_SETUP } from "../config/constants.ts";
import { Client, Pool, PoolClient, QueryResult, time } from "../deps.ts";
import { format } from "https://deno.land/x/pg_format@v1.0.0/index.js";

const client = new Client(dbconfig);

export default class Registeract {
  public id: number = 0;
  public index: number = 0;
  public divisionname: string = "";
  public sizename: string = "";
  public powername: string = "";
  public capacityname: string = "";
  public actdescription: string = "";
  public namethai: string = "";
  public dura_day: string = "";
  public name: string = "";
  public machinegroupname: string = "";

  constructor(
    public actcode: string,
    public description: string,
    public standard: string,
    public duratypeid: number,
    public is_active: boolean,
    public machinedetailsid: string,
    public result_type: number,
    public machinegroupid: number,
    public checkyear: number,
    public monthcurrent: number,
    public season_id: number,
    public update_date: Date | null,
    public update_by: string,
  ) {
  }
  static async findfristpage(): Promise<Registeract[] | null> {
    var RegisterList: any = new Object();
    await client.connect();
    try {
      RegisterList = await client.queryObject({
        text:
          `SELECT machineactivitydetails.id, machineactivitydetails.actcode, machineactivitydetails.description as actdescription, machineactivitydetails.duratypeid,
        machineactivitydetails.is_active, machineactivitydetails.update_date, machinedetails.idmachine, machineactivitydetails.update_by,
        duratype.description, duratype.dura_day, machinedetails.name, machinedetails.orders, machineactivitydetails.machinegroupid,
        machinegroup.name as machinegroupname, machineactivitydetails.machinedetailsid, machineactivitydetails.standard
        FROM machineactivity AS machineactivitydetails
        LEFT JOIN duratype on duratype.id = machineactivitydetails.duratypeid 
        LEFT JOIN machinedetails on machinedetails.id = machineactivitydetails.machinedetailsid
        LEFT JOIN machinegroup on machinegroup.id = machineactivitydetails.machinegroupid
        ORDER BY machineactivitydetails.id DESC LIMIT 15 ;`,
      });
      if (RegisterList.rows.toString() === "") {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      await client.end();
    }
    return RegisterList.rows;
  }
  static async findOne(id: string): Promise<Registeract | null> {
    var RegisterList: any = new Object();
    await client.connect();
    try {
      RegisterList = await client.queryObject({
        text: `SELECT * FROM machineactivity WHERE id =$1 ;`,
        args: [id],
      });
      if (RegisterList.rows.toString() === "") {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      await client.end();
    }
    return RegisterList.rows;
  }
  static async findAllidDivision(id: string): Promise<Registeract[] | null> {
    var MachineList: any = new Array();
    await client.connect();
    try {
      MachineList = await client.queryObject({
        text:
          `SELECT * FROM public.historymachine LEFT JOIN division on historymachine.division = division.id
          LEFT JOIN size on historymachine.sizemachine = size.id
          LEFT JOIN capacity on historymachine.capacity = capacity.id
          LEFT JOIN power on historymachine.power = power.id
          WHERE historymachine.division = $1
          ORDER BY idmachine ASC ;`,
        args: [id],
      });
      if (MachineList.rows.toString() === "") {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      await client.end();
    }
    return MachineList.rows;
  }
  static async findmachinegroupid(
    id: string,
    seasonid: string,
  ): Promise<Registeract[] | null> {
    var RegisterList: any = new Array();
    await client.connect();
    try {
      RegisterList = await client.queryObject({
        text:
          `SELECT machineactivitydetails.id, machineactivitydetails.actcode, machineactivitydetails.description as actdescription, machineactivitydetails.duratypeid,
        machineactivitydetails.is_active, machineactivitydetails.update_date, machineactivitydetails.standard, machineactivitydetails.checkyear,
         machineactivitydetails.monthcurrent , machinedetails.idmachine, machineactivitydetails.update_by,
        duratype.description, duratype.dura_day, machinedetails.name
        FROM machineactivity AS machineactivitydetails LEFT JOIN duratype on duratype.id = machineactivitydetails.duratypeid 
        LEFT JOIN machinedetails on machinedetails.id = machineactivitydetails.machinedetailsid
        where machinegroupid = $1 and season_id = $2
        ORDER BY machineactivitydetails.id ASC ;`,
        args: [id, seasonid],
      });

      if (RegisterList.rows.toString() === "") {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      await client.end();
    }
    return RegisterList.rows;
    // return RegisterList.map((registeract: any) =>
    //   Registeract.prepare(registeract)
    // );
  }
  static async findAllOffset(
    offset: number,
    limit: number,
  ): Promise<any[] | null> {
    var RegisterList: any = new Array();
    await client.connect();
    try {
      // await client.connect();
      RegisterList = await client.queryObject({
        text:
          `SELECT machineactivitydetails.id, machineactivitydetails.actcode, machineactivitydetails.description as actdescription, machineactivitydetails.duratypeid,
          machineactivitydetails.is_active, machineactivitydetails.update_date, machinedetails.idmachine, machineactivitydetails.update_by,
          duratype.description, duratype.dura_day, machinedetails.name, machinedetails.orders, machineactivitydetails.machinegroupid,
		      machinegroup.name as machinegroupname, machineactivitydetails.machinedetailsid, machineactivitydetails.standard, machineactivitydetails.season_id
          FROM machineactivity AS machineactivitydetails
		      LEFT JOIN duratype on duratype.id = machineactivitydetails.duratypeid 
          LEFT JOIN machinedetails on machinedetails.id = machineactivitydetails.machinedetailsid
		      LEFT JOIN machinegroup on machinegroup.id = machineactivitydetails.machinegroupid
          ORDER BY machineactivitydetails.id ASC offset $1 limit $2;`,
        args: [offset, limit],
      });

      if (RegisterList.rows.toString() === "") {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      await client.end();
    }
    return RegisterList.rows;
    // return RegisterList.map((registeract: any) =>
    //   Registeract.prepare(registeract)
    // );
  }
  static async findAll(): Promise<any[] | null> {
    var RegisterList: any = new Array();
    await client.connect();
    try {
      // await client.connect();
      RegisterList = await client.queryObject({
        text:
          `SELECT machineactivitydetails.id, machineactivitydetails.actcode, machineactivitydetails.description as actdescription, machineactivitydetails.duratypeid,
          machineactivitydetails.is_active, machineactivitydetails.update_date, machinedetails.idmachine, machineactivitydetails.update_by,
          duratype.description, duratype.dura_day, machinedetails.name, machinedetails.orders, machineactivitydetails.machinegroupid,
		      machinegroup.name as machinegroupname, machineactivitydetails.machinedetailsid, machineactivitydetails.standard, machineactivitydetails.season_id
          FROM machineactivity AS machineactivitydetails
		      LEFT JOIN duratype on duratype.id = machineactivitydetails.duratypeid 
          LEFT JOIN machinedetails on machinedetails.id = machineactivitydetails.machinedetailsid
		      LEFT JOIN machinegroup on machinegroup.id = machineactivitydetails.machinegroupid
          ORDER BY machineactivitydetails.id ASC;`,
        args: [],
      });

      if (RegisterList.rows.toString() === "") {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      await client.end();
    }
    return RegisterList.rows;
    // return RegisterList.map((registeract: any) =>
    //   Registeract.prepare(registeract)
    // );
  }

  // static async createtest(args: any) {
  //   await client.connect();
  //   try {
  //     const myArray = [1, 2, 3];
  //     const myObject = { a: 1, b: 2 };
  //     const myNestedArray = [
  //       [
  //         "TEST03",
  //         "เช็คความร้อน",
  //         1,
  //         true,
  //         "2020-12-08 08:17:33.719",
  //         "462d1b6c-2704-49f1-a1bf-c615e34ae999",
  //         "test",
  //         {
  //           "Result": false,
  //         },
  //         1,
  //         null,
  //         "1. โกเวอร์เนอร์วาล์วต้องไม่มรอยรั่วของไอน้ำ",
  //       ],
  //       [
  //         "TEST04",
  //         "เช็คความร้อน1",
  //         1,
  //         true,
  //         "2020-12-08 08:17:33.719",
  //         "462d1b6c-2704-49f1-a1bf-c615e34ae879",
  //         "test",
  //         {
  //           "Result": false,
  //         },
  //         1,
  //         null,
  //         "1. โกเวอร์เนอร์วาล์วต้องไม่มรอยรั่วของไอน้ำ",
  //       ],
  //     ];

  //     const sql = format(
  //       "INSERT INTO machineactivity (actcode,description, duratypeid, is_active, update_date,machinedetailsid,update_by,result_type,machinegroupid,checkyear,standard) VALUES %L",
  //       myNestedArray,
  //     );

  //     const result: QueryResult = await client.queryObject({
  //       text: sql,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     await client.end();
  //   }
  //   return this;
  // }
  async create() {
    await client.connect();
    try {
      const result: QueryResult = await client.queryObject({
        text: `INSERT INTO machineactivity (actcode,description, duratypeid,
          is_active, update_date,machinedetailsid,update_by,result_type,machinegroupid,checkyear,standard,monthcurrent,
          season_id)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);`,
        args: [
          this.actcode,
          this.description,
          this.duratypeid,
          this.is_active,
          time().tz("asia/Jakarta").t,
          this.machinedetailsid,
          this.update_by,
          this.result_type,
          this.machinegroupid,
          this.checkyear,
          this.standard,
          this.monthcurrent,
          this.season_id,
        ],
      });
    } catch (error) {
      console.log(error);
    } finally {
      await client.end();
    }
    return this;
  }
  static async update(
    id: number,
    standard: string,
    description: string,
    update_by: string,
  ) {
    await client.connect();
    try {
      const result: QueryResult = await client.queryObject({
        text:
          `UPDATE machineactivity SET standard=$2, description=$3, update_date=$4, update_by=$5
          WHERE id=$1;`,
        args: [
          id,
          standard,
          description,
          time().tz("asia/Jakarta").t,
          update_by,
        ],
      });
    } catch (error) {
      console.log(error);
    } finally {
      await client.end();
    }
    return this;
  }
  static async delete(id: string): Promise<boolean> {
    await client.connect();
    try {
      const result: QueryResult = await client.queryObject({
        text: `DELETE FROM machineactivity WHERE id=$1;`,
        args: [id],
      });
      return true;
    } catch (error) {
      throw error;
    } finally {
      await client.end();
    }
  }
}
