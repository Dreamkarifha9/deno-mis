import { dbconfig } from "../config/dbconnect.ts";
import { Client, PoolClient, QueryResult, time } from "../deps.ts";

const client = new Client(dbconfig);

export default class Division {
  constructor(
    public divisionname: string,
  ) {
  }
  static async findAll(): Promise<Division[] | null> {
    var divisionlist: any = new Array();
    await client.connect();
    try {
      divisionlist = await client.queryObject({
        text: `SELECT * FROM division ORDER BY id ASC ;`,
        args: [],
      });
      if (divisionlist.rows.toString() === "") {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      await client.end();
    }
    return divisionlist.rows;
  }
  static async findOne(id: string): Promise<Division | null> {
    var divisionlist: any = new Object();
    await client.connect();
    try {
      divisionlist = await client.queryObject({
        text: `SELECT * FROM division WHERE id =$1 ORDER BY id ASC ;`,
        args: [id],
      });
      if (divisionlist.rows.toString() === "") {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      await client.end();
    }
    return divisionlist.rows;
  }
  static async findOneDivisionname(
    divisionname: string,
  ): Promise<Division | null> {
    var divisionlist: any = new Object();
    await client.connect();
    try {
      divisionlist = await client.queryObject({
        text: `SELECT * FROM division WHERE divisionname =$1 ORDER BY id ASC ;`,
        args: [divisionname],
      });
      if (divisionlist.rows.toString() === "") {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      await client.end();
    }
    return divisionlist.rows;
  }
  async create() {
    await client.connect();
    try {
      const result: QueryResult = await client.queryObject({
        text: `INSERT INTO division (divisionname)
          VALUES ($1);`,
        args: [
          this.divisionname,
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
    divisionname: string,
  ) {
    await client.connect();
    console.log("id >>>>>>", id);
    console.log("divisionname >>>>>>", divisionname);

    try {
      const result: QueryResult = await client.queryObject({
        text: `UPDATE division SET divisionname=$2
          WHERE id=$1;`,
        args: [
          id,
          divisionname,
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
