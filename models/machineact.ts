import { dbconfig } from "../config/dbconnect.ts";
import { Client, PoolClient, QueryResult, time } from "../deps.ts";

const client = new Client(dbconfig);

export default class Machineact {
  public index: number = 0;
  public divisionname: string = "";
  public sizename: string = "";
  public powername: string = "";
  public capacityname: string = "";
  public actdescription: string = "";
  public namethai: string = "";
  public dura_day: string = "";
  public name: string = "";
  public seasonname: string = "";
  public description: string = "";
  public standard: string = "";
  public machinedetailsname: string = "";
  public orders: string = "";
  constructor(
    public id: string,
    public actid: number,
    public actyear: string,
    public actmonth: string,
    public d1: JSON,
    public d2: JSON,
    public d3: JSON,
    public d4: JSON,
    public d5: JSON,
    public d6: JSON,
    public d7: JSON,
    public d8: JSON,
    public d9: JSON,
    public d10: JSON,
    public d11: JSON,
    public d12: JSON,
    public d13: JSON,
    public d14: JSON,
    public d15: JSON,
    public d16: JSON,
    public d17: JSON,
    public d18: JSON,
    public d19: JSON,
    public d20: JSON,
    public d21: JSON,
    public d22: JSON,
    public d23: JSON,
    public d24: JSON,
    public d25: JSON,
    public d26: JSON,
    public d27: JSON,
    public d28: JSON,
    public d29: JSON,
    public d30: JSON,
    public d31: JSON,
    public idmachine: string,
    public update_date: Date | null,
    public update_by: string,
  ) {
  }
  static async findOne(id: string): Promise<Machineact | null> {
    var RegisterList: any = new Object();
    await client.connect();
    try {
      RegisterList = await client.queryObject({
        text: `SELECT * FROM machineact WHERE id =$1 ;`,
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

  static async findOnedupicateact(
    actid: string,
    actyear: string,
    actmonth: string,
    idmachine: string,
    season_id: string,
  ): Promise<Machineact | null> {
    var RegisterList: any = new Object();
    await client.connect();
    try {
      RegisterList = await client.queryObject({
        text:
          `SELECT machineact.id,machineactivity.description,machineactivity.standard, machineact.actyear, machineact.actmonth,machineact.idmachine,
              machineact.actid, season.id as sid FROM machineact
              LEFT JOIN machineactivity on machineactivity.id = machineact.actid
              LEFT JOIN season on season.id = machineactivity.season_id WHERE actid = $1 and actyear= $2 and actmonth= $3 and idmachine= $4 and season.id = $5 ;`,
        args: [actid, actyear, actmonth, idmachine, season_id],
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

  static async findbyacttivityseason2(
    idmachine: string,
    year: string,
  ): Promise<Machineact[] | null> { ///* เอาไปโชว์หน้ากิจกรรมหน้าซ่อม
    var RegisterList: any = new Array();
    let season_id = 2;
    await client.connect();
    try {
      RegisterList = await client.queryObject({
        text:
          `SELECT machineact.id,machineactivity.description,machineactivity.standard, machineact.actyear, machineact.actmonth,machineact.idmachine, machineact.d1,machineact.d2,machineact.d3,machineact.d4,machineact.d5,machineact.d6,
          machineact.d7,machineact.d8,machineact.d9,machineact.d10,machineact.d11,machineact.d12,machineact.d13,machineact.d14,machineact.d15,machineact.d16,
          machineact.d17,machineact.d18,machineact.d19,machineact.d20,machineact.d21,machineact.d22,machineact.d23,machineact.d24,machineact.d25,machineact.d26,
          machineact.d27,machineact.d28,machineact.d29,machineact.d30,machineact.d31, season.name as seasonname, machineactivity.id as activityid,
		      machinedetails.name as machinedetailsname, machinedetails.orders as orders FROM machineact
          LEFT JOIN machineactivity on machineactivity.id = machineact.actid
          LEFT JOIN season on season.id = machineactivity.season_id
		      LEFT JOIN machinedetails on machinedetails.id = machineactivity.machinedetailsid
		      WHERE machineact.idmachine = $1 AND machineactivity.season_id = $2 AND machineact.actyear = $3
          order by activityid,cast(actmonth as int) asc ;`,
        args: [idmachine, season_id, year],
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
    // return RegisterList.map((Machineact: any) =>
    //   Machineact.prepare(Machineact)
    // );
  }

  static async findbyacttivityseason1(
    idmachine: string,
    year: string,
  ): Promise<Machineact[] | null> { ///* เอาไปโชว์หน้ากิจกรรมหน้าผลิต
    var RegisterList: any = new Array();
    let season_id = 1;
    await client.connect();
    try {
      RegisterList = await client.queryObject({
        text:
          `SELECT machineact.id,machineactivity.description,machineactivity.standard, machineact.actyear, machineact.actmonth,machineact.idmachine, machineact.d1,machineact.d2,machineact.d3,machineact.d4,machineact.d5,machineact.d6,
          machineact.d7,machineact.d8,machineact.d9,machineact.d10,machineact.d11,machineact.d12,machineact.d13,machineact.d14,machineact.d15,machineact.d16,
          machineact.d17,machineact.d18,machineact.d19,machineact.d20,machineact.d21,machineact.d22,machineact.d23,machineact.d24,machineact.d25,machineact.d26,
          machineact.d27,machineact.d28,machineact.d29,machineact.d30,machineact.d31, season.name as seasonname, machineactivity.id as activityid,
		      machinedetails.name as machinedetailsname, machinedetails.orders as orders FROM machineact
          LEFT JOIN machineactivity on machineactivity.id = machineact.actid
          LEFT JOIN season on season.id = machineactivity.season_id
		      LEFT JOIN machinedetails on machinedetails.id = machineactivity.machinedetailsid
		      WHERE machineact.idmachine = $1 AND machineactivity.season_id = $2 AND machineact.actyear = $3
          order by activityid,cast(actmonth as int) asc ;`,
        args: [idmachine, season_id, year],
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
    // return RegisterList.map((Machineact: any) =>
    //   Machineact.prepare(Machineact)
    // );
  }

  static async findbyacttivityseasonbymonth2(
    idmachine: string,
    year: string,
    month: string,
  ): Promise<Machineact[] | null> { ///* เอาไปโชว์หน้ากิจกรรมหน้าซ่อม
    var RegisterList: any = new Array();
    let season_id = 2;
    await client.connect();
    try {
      RegisterList = await client.queryObject({
        text:
          `SELECT machineact.id,machineactivity.description,machineactivity.standard, machineact.actyear, machineact.actmonth,machineact.idmachine, machineact.d1,machineact.d2,machineact.d3,machineact.d4,machineact.d5,machineact.d6,
          machineact.d7,machineact.d8,machineact.d9,machineact.d10,machineact.d11,machineact.d12,machineact.d13,machineact.d14,machineact.d15,machineact.d16,
          machineact.d17,machineact.d18,machineact.d19,machineact.d20,machineact.d21,machineact.d22,machineact.d23,machineact.d24,machineact.d25,machineact.d26,
          machineact.d27,machineact.d28,machineact.d29,machineact.d30,machineact.d31, season.name as seasonname, machineactivity.id as activityid,
          machinedetails.name as machinedetailsname, machinedetails.orders as orders FROM machineact
          LEFT JOIN machineactivity on machineactivity.id = machineact.actid
          LEFT JOIN season on season.id = machineactivity.season_id
          LEFT JOIN machinedetails on machinedetails.id = machineactivity.machinedetailsid
        WHERE machineact.idmachine = $1 AND machineactivity.season_id = $2 AND machineact.actyear = $3 AND machineact.actmonth = $4 order by activityid,cast(actmonth as int) asc  ;`,
        args: [idmachine, season_id, year, month],
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
    // return RegisterList.map((Machineact: any) =>
    //   Machineact.prepare(Machineact)
    // );
  }

  static async findbydivision_allmachineact(
    season: string,
    division: string,
    year: string,
    month: string,
  ): Promise<Machineact[] | null> { ///* REPORT การหาว่ากิจกรรมไหน ที่ยังไม่ได้ทำ
    var RegisterList: any = new Array();
    await client.connect();
    try {
      RegisterList = await client.queryObject({
        text:
          `SELECT  distinct on (machineact.idmachine) machineact.id,machineactivity.description,machineactivity.standard, machineact.actyear,
          machineact.actmonth,machineact.idmachine,machineact.d1,machineact.d2,machineact.d3,machineact.d4,machineact.d5,machineact.d6,machineact.d7,
          machineact.d8,machineact.d9,machineact.d10,
          machineact.d11,machineact.d12,machineact.d13,machineact.d14,machineact.d15,machineact.d16,machineact.d17,machineact.d18,machineact.d19,
          machineact.d20,machineact.d21,machineact.d22,machineact.d23,machineact.d24,machineact.d25,machineact.d26,
          machineact.d27,machineact.d28,machineact.d29,machineact.d30,machineact.d31, season.name as seasonname, machineactivity.id as activityid,
          machinedetails.name as machinedetailsname, machinedetails.orders as orders,historymachine.namethai, machineactivity.duratypeid FROM machineact
          LEFT JOIN historymachine on historymachine.idmachine = machineact.idmachine
          LEFT JOIN machineactivity on machineactivity.id = machineact.actid
          LEFT JOIN season on season.id = machineactivity.season_id
          LEFT JOIN machinedetails on machinedetails.id = machineactivity.machinedetailsid
	        where machineactivity.season_id = $1 AND historymachine.division = $2 AND machineact.actyear = $3 AND machineact.actmonth = $4 AND
          (machineact.d1::text like '%P%' or 
          machineact.d2::text like '%P%' or
          machineact.d3::text like '%P%' or
          machineact.d4::text like '%P%' or
          machineact.d5::text like '%P%' or
          machineact.d6::text like '%P%' or
          machineact.d7::text like '%P%' or
          machineact.d8::text like '%P%' or
          machineact.d9::text like '%P%' or
          machineact.d10::text like '%P%' or
          machineact.d11::text like '%P%' or
          machineact.d12::text like '%P%' or
          machineact.d13::text like '%P%' or
          machineact.d14::text like '%P%' or
          machineact.d15::text like '%P%' or
          machineact.d16::text like '%P%' or
          machineact.d17::text like '%P%' or
          machineact.d18::text like '%P%' or
          machineact.d19::text like '%P%' or
          machineact.d20::text like '%P%' or
          machineact.d21::text like '%P%' or
          machineact.d22::text like '%P%' or
          machineact.d23::text like '%P%' or
          machineact.d24::text like '%P%' or
          machineact.d25::text like '%P%' or
          machineact.d26::text like '%P%' or
          machineact.d27::text like '%P%' or
          machineact.d28::text like '%P%' or
          machineact.d29::text like '%P%' or
          machineact.d30::text like '%P%' or
          machineact.d31::text like '%P%')
          order by machineact.idmachine, machineact.actid  ;`,
        args: [season, division, year, month],
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

  static async findbyacttivityseasonbymonth1(
    idmachine: string,
    year: string,
    month: string,
  ): Promise<Machineact[] | null> { ///* เอาไปโชว์หน้ากิจกรรมหน้าผลิต
    var RegisterList: any = new Array();
    let season_id = 1;
    await client.connect();
    try {
      RegisterList = await client.queryObject({
        text:
          `SELECT machineact.id,machineactivity.description,machineactivity.standard, machineact.actyear, machineact.actmonth,machineact.idmachine,
          machineact.d1,machineact.d2,machineact.d3,machineact.d4,machineact.d5,machineact.d6,machineact.d7,machineact.d8,machineact.d9,machineact.d10,
          machineact.d11,machineact.d12,machineact.d13,machineact.d14,machineact.d15,machineact.d16,machineact.d17,machineact.d18,machineact.d19,
          machineact.d20,machineact.d21,machineact.d22,machineact.d23,machineact.d24,machineact.d25,machineact.d26,
          machineact.d27,machineact.d28,machineact.d29,machineact.d30,machineact.d31, season.name as seasonname, machineactivity.id as activityid,
          machinedetails.name as machinedetailsname, machinedetails.orders as orders FROM machineact
          LEFT JOIN machineactivity on machineactivity.id = machineact.actid
          LEFT JOIN season on season.id = machineactivity.season_id
          LEFT JOIN machinedetails on machinedetails.id = machineactivity.machinedetailsid
        WHERE machineact.idmachine = $1 AND machineactivity.season_id = $2 AND machineact.actyear = $3 AND machineact.actmonth = $4 order by activityid,cast(actmonth as int) asc ;`,
        args: [idmachine, season_id, year, month],
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
    // return RegisterList.map((Machineact: any) =>
    //   Machineact.prepare(Machineact)
    // );
  }

  static async findAll(): Promise<Machineact[] | null> {
    var RegisterList: any = new Array();
    await client.connect();
    try {
      RegisterList = await client.queryObject({
        text: `SELECT * FROM public.machineact
          ORDER BY id ASC ;`,
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
    // return RegisterList.map((Machineact: any) =>
    //   Machineact.prepare(Machineact)
    // );
  }
  async create() {
    await client.connect();
    try {
      const result: QueryResult = await client.queryObject({
        text:
          `INSERT INTO machineact (id,actid, actyear, actmonth, d1,d2,d3,d4,d5,d6,d7,d8,d9,d10,d11,d12,d13,d14,d15,d16,d17,d18,d19,d20,d21,d22,d23,d24,d25,d26,d27,d28,d29,d30,d31,update_date,update_by,idmachine)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11,$12,$13,$14,$15,$16,$17,$18,$19,$20,
            $21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35,$36,$37,$38);`,
        args: [
          this.id,
          this.actid,
          this.actyear,
          this.actmonth,
          JSON.stringify(this.d1),
          JSON.stringify(this.d2),
          JSON.stringify(this.d3),
          JSON.stringify(this.d4),
          JSON.stringify(this.d5),
          JSON.stringify(this.d6),
          JSON.stringify(this.d7),
          JSON.stringify(this.d8),
          JSON.stringify(this.d9),
          JSON.stringify(this.d10),
          JSON.stringify(this.d11),
          JSON.stringify(this.d12),
          JSON.stringify(this.d13),
          JSON.stringify(this.d14),
          JSON.stringify(this.d15),
          JSON.stringify(this.d16),
          JSON.stringify(this.d17),
          JSON.stringify(this.d18),
          JSON.stringify(this.d19),
          JSON.stringify(this.d20),
          JSON.stringify(this.d21),
          JSON.stringify(this.d22),
          JSON.stringify(this.d23),
          JSON.stringify(this.d24),
          JSON.stringify(this.d25),
          JSON.stringify(this.d26),
          JSON.stringify(this.d27),
          JSON.stringify(this.d28),
          JSON.stringify(this.d29),
          JSON.stringify(this.d30),
          JSON.stringify(this.d31),
          time().tz("asia/Jakarta").t,
          this.update_by,
          this.idmachine,
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
        text: `DELETE FROM machineactivity WHERE id=$1;`,
        args: [this.id],
      });
    } catch (error) {
      console.log(error);
    } finally {
      await client.end();
    }
    return this;
  }
  static prepare(data: any): Machineact {
    const machineact = new Machineact(
      data.id,
      data.actid,
      data.actyear,
      data.actmonth,
      data.d1,
      data.d2,
      data.d3,
      data.d4,
      data.d5,
      data.d6,
      data.d7,
      data.d8,
      data.d9,
      data.d10,
      data.d11,
      data.d12,
      data.d13,
      data.d14,
      data.d15,
      data.d16,
      data.d17,
      data.d18,
      data.d19,
      data.d20,
      data.d21,
      data.d22,
      data.d23,
      data.d24,
      data.d25,
      data.d26,
      data.d27,
      data.d28,
      data.d29,
      data.d30,
      data.d31,
      data.idmachine,
      data.update_date,
      data.update_by,
    );

    machineact.id = data.id;
    machineact.index = data.index;
    machineact.divisionname = data.divisionname;
    machineact.sizename = data.sizename;
    machineact.powername = data.powername;
    machineact.capacityname = data.capacityname;
    machineact.actdescription = data.actdescription;
    machineact.namethai = data.namethai;
    machineact.dura_day = data.dura_day;
    machineact.name = data.name;
    machineact.seasonname = data.seasonname;
    machineact.description = data.description;
    machineact.standard = data.standard;
    machineact.machinedetailsname = data.machinedetailsname;
    machineact.orders = data.orders;

    return machineact;
  }
}
