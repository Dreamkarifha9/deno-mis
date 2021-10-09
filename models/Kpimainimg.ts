import { dbconfig } from "../config/dbconnect.ts";
import { Client, PoolClient, QueryResult, time } from "../deps.ts";

const client = new Client(dbconfig);

export default class Kpimainimg {
  public index: number = 0;
  constructor(
    public id: string,
    public fkid: string,
    public pathimg: string,
    public create_date: Date | null,
    public create_by: string,
    public update_date: Date | null,
    public update_by: string,
    public filename: string,
  ) {
  }

  static async findOneid(id: string, fkid: string): Promise<Kpimainimg | null> {
    await client.connect();
    var imagesplanlist: any = new Object();
    try {
      imagesplanlist = await client.queryObject({
        text:
          `SELECT id,fkid,pathimg,filename FROM kpimainimg WHERE filename =$1 AND fkid =$2 ;`,
        args: [id, fkid],
      });
      if (imagesplanlist.rows.toString() === "") {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      await client.end();
    }
    return imagesplanlist.rows;
  }

  static async findbyId(id: string): Promise<Kpimainimg | null> {
    await client.connect();
    var imagesplanlist: any = new Object();
    try {
      imagesplanlist = await client.queryObject({
        text: `SELECT id,fkid,pathimg,filename FROM kpimainimg WHERE id =$1 ;`,
        args: [id],
      });
      if (imagesplanlist.rows.toString() === "") {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      await client.end();
    }
    return imagesplanlist.rows;
  }

  static async findAllbyid(id: string): Promise<Kpimainimg[] | null> {
    await client.connect();
    var ImagesList: any = new Array();
    try {
      ImagesList = await client.queryObject({
        text: `SELECT id,fkid,pathimg,filename FROM kpimainimg WHERE fkid=$1 ;`,
        args: [id],
      });
      if (ImagesList.rows.toString() === "") {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      await client.end();
    }
    return ImagesList.rows;
  }
  async create() {
    await client.connect();
    try {
      const result: QueryResult = await client.queryObject({
        text:
          `INSERT INTO kpimainimg (id, fkid,pathimg,create_date,create_by,filename)
          VALUES ($1, $2, $3, $4,$5,$6);`,
        args: [
          this.id,
          this.fkid,
          this.pathimg,
          time().tz("asia/Jakarta").t,
          this.create_by,
          this.filename,
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
    id: string,
    fkid: string,
    pathimg: string,
    update_date: Date,
    update_by: string,
    filename: string,
  ) {
    this.id = id;
    this.fkid = fkid;
    this.pathimg = pathimg;
    this.update_by = update_by;
    this.filename = filename;
    await client.connect();
    try {
      const result: QueryResult = await client.queryObject({
        text:
          `UPDATE kpimainimg SET id=$1, fkid=$2, pathimg=$3, update_date=$4, update_by=$5, filename=$6
          WHERE idmachine=$1;`,
        args: [
          this.id,
          this.fkid,
          this.pathimg,
          time().tz("asia/Jakarta").t,
          this.update_by,
          this.filename,
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
        text: `DELETE FROM kpimainimg WHERE id=$1;`,
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
