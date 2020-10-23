import { dbconfig } from "../config/dbconnect.ts";
import { Client, QueryResult } from "../deps.ts";

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
  static async findOne(id: string): Promise<Machinedetails[] | null> {
    const MachinedetailsList: any = new Array();
    try {
      await client.connect();
      const result = await client.query({
        text: `SELECT * FROM machinedetails WHERE idmachine=$1;`,
        args: [id],
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
          MachinedetailsList.push(obj);
        });
      }
    } catch (error) {
      console.log(error.toString());
      return null;
    } finally {
      await client.end();
    }
    return MachinedetailsList.map((mahine: any) =>
      Machinedetails.prepare(mahine)
    );
  }
  static async findOneId(id: string): Promise<Machinedetails | null> {
    const MachineList: any = new Object();
    try {
      await client.connect();
      const result = await client.query({
        text: `SELECT id FROM machinedetails WHERE id=$1;`,
        args: [id],
      });
      if (result.rows.toString() === "") {
        return null;
      } else {
        result.rows.map((p) => {
          // let obj: any = new Object()
          result.rowDescription.columns.map((el, i) => {
            MachineList[el.name] = p[i];
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
    return Machinedetails.prepare(MachineList);
  }
  async create() {
    try {
      await client.connect();
      const result: QueryResult = await client.query({
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
  async update(
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
    this.id = id;
    this.idmachine = idmachine;
    this.name = name;
    this.orders = orders;
    this.unit = unit;
    this.idproduct = idproduct;
    this.w3 = w3;
    this.m1 = m1;
    this.m3 = m3;
    this.y1 = y1;
    this.y2 = y2;
    this.y3 = y3;
    this.oh = oh;
    this.number = number;
    this.update_date = update_date;
    this.update_by = update_by;
    try {
      await client.connect();
      const result: QueryResult = await client.query({
        text:
          `UPDATE machinedetails SET id=$1, idmachine=$2, name=$3, orders=$4,
          unit=$5, idproduct=$6,w3=$7,m1=$8,m3=$9, 
y1=$10, y2=$11, y3=$12, oh=$13, 
number=$14, update_date=$15, update_by=$16
          WHERE id=$1;`,
        args: [
          this.id = id,
          this.idmachine = idmachine,
          this.name = name,
          this.orders = orders,
          this.unit = unit,
          this.idproduct = idproduct,
          this.w3 = w3,
          this.m1 = m1,
          this.m3 = m3,
          this.y1 = y1,
          this.y2 = y2,
          this.y3 = y3,
          this.oh = oh,
          this.number = number,
          this.update_date = update_date,
          this.update_by = update_by,
        ],
      });
    } catch (error) {
      console.log(error.toString());
    } finally {
      await client.end();
    }
    return this;
  }
  async delete() {
    try {
      await client.connect();
      const result: QueryResult = await client.query({
        text: `DELETE FROM machinedetails WHERE id=$1;`,
        args: [this.id],
      });
    } catch (error) {
      console.log(error.toString());
    } finally {
      await client.end();
    }
    return this;
  }
  static prepare(data: any): Machinedetails {
    const machinedetails = new Machinedetails(
      data.id,
      data.idmachine,
      data.orders,
      data.name,
      data.unit,
      data.idproduct,
      data.w3,
      data.m1,
      data.m3,
      data.y1,
      data.y2,
      data.y3,
      data.oh,
      data.number,
      data.create_date,
      data.create_by,
      data.update_date,
      data.update_by,
    );
    machinedetails.index = data.index;
    return machinedetails;
  }
}
