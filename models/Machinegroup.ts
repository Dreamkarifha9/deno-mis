import { dbconfig } from "../config/dbconnect.ts";
import { Client, PoolClient, QueryResult, time } from "../deps.ts";

const client = new Client(dbconfig);
export default class Machinegroup {
  public id: number = 0;
  constructor(
    public name: string,
    public create_by: string,
    public create_date: Date | null,
    public update_date: Date | null,
    public update_by: string,
  ) {
  }
  static async findOne(id: string): Promise<Machinegroup | null> {
    var MachinegroupList: any = new Object();
    await client.connect();
    try {
      MachinegroupList = await client.queryObject({
        text: `SELECT * FROM machinegroup WHERE id =$1 ;`,
        args: [id],
      });
      if (MachinegroupList.rows.toString() === "") {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      await client.end();
    }
    return MachinegroupList.rows;
  }
  static async findAllidDivision(id: string): Promise<Machinegroup[] | null> {
    var MachinegroupList: any = new Array();
    await client.connect();
    try {
      MachinegroupList = await client.queryObject({
        text:
          `SELECT * FROM public.historymachine LEFT JOIN division on historymachine.division = division.id
          LEFT JOIN size on historymachine.sizemachine = size.id
          LEFT JOIN capacity on historymachine.capacity = capacity.id
          LEFT JOIN power on historymachine.power = power.id
          WHERE historymachine.division = $1
          ORDER BY idmachine ASC ;`,
        args: [id],
      });
      if (MachinegroupList.rows.toString() === "") {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      await client.end();
    }
    return MachinegroupList.rows;
  }
  static async findAll(): Promise<Machinegroup[] | null> {
    var MachinegroupList: any = new Array();
    await client.connect();
    try {
      MachinegroupList = await client.queryObject({
        text: `SELECT * FROM machinegroup ORDER BY id ASC ;`,
        args: [],
      });

      if (MachinegroupList.rows.toString() === "") {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      await client.end();
    }
    return MachinegroupList.rows;
    // return RegisterList.map((registeract: any) =>
    //   Registeract.prepare(registeract)
    // );
  }
  async create() {
    await client.connect();
    try {
      const result: QueryResult = await client.queryObject({
        text: `INSERT INTO machinegroup (name,create_by, create_date)
          VALUES ($1, $2, $3);`,
        args: [
          this.name,
          this.create_by,
          time().tz("asia/Jakarta").t,
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
    name: string,
    update_by: string,
    update_date: Date,
  ) {
    this.id = id;
    this.name = name;
    this.update_by = update_by;
    await client.connect();
    try {
      const result: QueryResult = await client.queryObject({
        text: `UPDATE machinegroup SET name=$2, update_by=$3, update_date=$4
          WHERE id=$1;`,
        args: [
          this.id,
          this.name,
          this.update_by,
          time().tz("asia/Jakarta").t,
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
        text: `DELETE FROM machinegroup WHERE id=$1;`,
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
