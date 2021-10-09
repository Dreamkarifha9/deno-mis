import { dbconfig } from "../config/dbconnect.ts";
import { Client, PoolClient, QueryResult, time } from "../deps.ts";
import { Incrimages } from "../entity/ncrimages.ts";

const client = new Client(dbconfig);

export default class Ncrimg {
  public index: number = 0;
  constructor() {
  }

  static async findOneid(
    filename: string,
    ncr_id: string,
  ): Promise<Incrimages | null> {
    var NcrimgList: any = new Object();
    await client.connect();
    try {
      NcrimgList = await client.queryObject({
        text:
          `SELECT id,ncr_id,pathimg,filename,idmachine FROM ncrimages WHERE filename =$1 AND ncr_id =$2 ;`,
        args: [filename, ncr_id],
      });
      if (NcrimgList.rows.toString() === "") {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      await client.end();
    }
    return NcrimgList.rows;
  }

  static async findbyId(id: string): Promise<Incrimages | null> {
    var NcrimgList: any = new Object();
    await client.connect();
    try {
      NcrimgList = await client.queryObject({
        text:
          `SELECT id,ncr_id,patimg,filename,idmachine FROM ncrimages WHERE id =$1 ;`,
        args: [id],
      });
      if (NcrimgList.rows.toString() === "") {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      await client.end();
    }
    return NcrimgList.rows;
  }

  static async findAllbyid(id: string): Promise<Incrimages[] | null> {
    var NcrimgList: any = new Array();
    await client.connect();
    try {
      NcrimgList = await client.queryObject({
        text:
          `SELECT id,ncr_id,patimg,filename,idmachine FROM ncrimages WHERE ncr_id=$1 ;`,
        args: [id],
      });
      if (NcrimgList.rows.toString() === "") {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      await client.end();
    }
    return NcrimgList.rows;
  }
  static async create(
    data: Partial<Incrimages>,
  ): Promise<any | null> {
    await client.connect();
    try {
      const result: QueryResult = await client.queryObject({
        text:
          `INSERT INTO ncrimages (id, ncr_id,patimg,create_date,create_by,filename,idmachine)
          VALUES ($1, $2, $3, $4,$5,$6,$7);`,
        args: [
          data.id,
          data.ncr_id,
          data.pathimg,
          time().tz("asia/Jakarta").t,
          data.create_by,
          data.filename,
          data.idmachine,
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
    data: Partial<Incrimages>,
  ): Promise<any | null> {
    await client.connect();
    try {
      const result: QueryResult = await client.queryObject({
        text:
          `UPDATE ncrimages SET id=$1, ncr_id=$2, pathimg=$3, update_date=$4, update_by=$5, filename=$6, idmachine=$7
          WHERE idmachine=$1;`,
        args: [
          data.id,
          data.ncr_id,
          data.pathimg,
          time().tz("asia/Jakarta").t,
          data.update_by,
          data.filename,
          data.idmachine,
        ],
      });
    } catch (error) {
      console.log(error);
    } finally {
      await client.end();
    }
    return this;
  }
  static async delete(id: string) {
    await client.connect();
    try {
      const result: QueryResult = await client.queryObject({
        text: `DELETE FROM ncrimages WHERE id=$1;`,
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
