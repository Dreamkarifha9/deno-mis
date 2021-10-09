import { dbconfig } from "../config/dbconnect.ts";
import { Client, PoolClient, QueryResult, time } from "../deps.ts";
import { Imachineactresult } from "../entity/Machineactresult.ts";
const client = new Client(dbconfig);

export default class Machineactresult {
  constructor() {
  }
  static async findOne(id: string): Promise<Imachineactresult | null> {
    var _Result: any = new Object();
    await client.connect();
    try {
      _Result = await client.queryObject({
        text: `SELECT * FROM machineactresult WHERE id =$1 ;`,
        args: [id],
      });
      if (_Result.rows.toString() === "") {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      await client.end();
    }
    return _Result.rows;
  }

  static async findMactidAnddodate(
    mactid: string,
    do_date: string,
  ): Promise<Imachineactresult | null> {
    var _Result: any = new Object();
    console.log("inn", mactid);
    console.log("inn", do_date);

    await client.connect();
    try {
      _Result = await client.queryObject({
        text:
          `SELECT * FROM public.machineactresult WHERE mactid =$1 and do_date::DATE =$2 ;`,
        args: [mactid, do_date],
      });
      if (_Result.rows.toString() === "") {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      await client.end();
    }
    return _Result.rows;
  }

  static async findAll(): Promise<Imachineactresult[] | null> {
    var _Result: any = new Array();
    await client.connect();
    try {
      _Result = await client.queryObject({
        text: `SELECT * FROM public.machineactresult
          ORDER BY id ASC ;`,
        args: [],
      });

      if (_Result.rows.toString() === "") {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      await client.end();
    }
    return _Result.rows;
    // return _Result.map((Machineact: any) =>
    //   Machineact.prepare(Machineact)
    // );
  }
}
