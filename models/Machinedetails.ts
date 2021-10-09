import { dbconfig } from "../config/dbconnect.ts";
import { Client, PoolClient, QueryResult, time } from "../deps.ts";
import { format } from "https://deno.land/x/pg_format@v1.0.0/index.js";

const client = new Client(dbconfig);

export default class Machinedetails {
  public index: number = 0;
  constructor(
    public id: string,
    public idmachine: string,
    public orders: string,
    public name: string,
    public unit: string,
    public idproduct: string,
    public w3: string,
    public m1: string,
    public m3: string,
    public y1: string,
    public y2: string,
    public y3: string,
    public oh: string,
    public number: string,
    public create_date: Date | null,
    public create_by: string,
    public update_date: Date | null,
    public update_by: string,
  ) {
  }
  static async findallbyid(id: any): Promise<Machinedetails[] | null> {
    await client.connect();
    const myNestedArray = id;
    //! ใช้ Libary formate select IN
    const sql = format(
      "SELECT id,idmachine,name,orders FROM machinedetails WHERE idmachine IN(%L)",
      myNestedArray,
    );
    var MachinedetailsList: any = new Array();
    try {
      MachinedetailsList = await client.queryObject({
        text: sql,
      });
      if (MachinedetailsList.rows.toString() === "") {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      await client.end();
    }
    return MachinedetailsList.rows;
  }
  static async findOne(id: string): Promise<Machinedetails[] | null> {
    await client.connect();
    var MachinedetailsList: any = new Array();
    try {
      MachinedetailsList = await client.queryObject({
        text: `SELECT * FROM machinedetails WHERE idmachine =$1;`,
        args: [id],
      });
      if (MachinedetailsList.rows.toString() === "") {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      await client.end();
    }
    return MachinedetailsList.rows;
  }
  static async findOneId(id: string): Promise<Machinedetails | null> {
    await client.connect();
    var MachineList: any = new Object();
    try {
      MachineList = await client.queryObject({
        text: `SELECT id FROM machinedetails WHERE id=$1;`,
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

  async create() {
    await client.connect();
    try {
      const result: QueryResult = await client.queryObject({
        text: `INSERT INTO machinedetails (id,idmachine, orders, name, unit,
  idproduct, w3,m1,m3,y1,y2,y3,oh,number,
  create_date,create_by)
          VALUES ($1, $2, $3, $4, $5, $6, $7,$8,$9,$10,$11,$12,$13,$14,$15,$16);`,
        args: [
          this.id,
          this.idmachine,
          this.orders,
          this.name,
          this.unit,
          this.idproduct,
          this.w3,
          this.m1,
          this.m3,
          this.y1,
          this.y2,
          this.y3,
          this.oh,
          this.number,
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
  static async update(
    id: string,
    idmachine: string,
    orders: string,
    name: string,
    unit: string,
    idproduct: string,
    w3: string,
    m1: string,
    m3: string,
    y1: string,
    y2: string,
    y3: string,
    oh: string,
    number: string,
    update_date: Date,
    update_by: string,
  ) {
    await client.connect();
    try {
      const result: QueryResult = await client.queryObject({
        text:
          `UPDATE machinedetails SET id=$1, idmachine=$2, name=$3, orders=$4,
          unit=$5, idproduct=$6,w3=$7,m1=$8,m3=$9, 
y1=$10, y2=$11, y3=$12, oh=$13, 
number=$14, update_date=$15, update_by=$16
          WHERE id=$1;`,
        args: [
          id,
          idmachine,
          name,
          orders,
          unit,
          idproduct,
          w3,
          m1,
          m3,
          y1,
          y2,
          y3,
          oh,
          number,
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
        text: `DELETE FROM machinedetails WHERE id=$1;`,
        args: [id],
      });
      return true;
    } catch (error) {
      throw error;
      console.log(error);
    } finally {
      await client.end();
    }
  }
}
