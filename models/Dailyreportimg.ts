import { dbconfig } from "../config/dbconnect.ts";
import { Client, PoolClient, QueryResult, time } from "../deps.ts";

const client = new Client(dbconfig);

export default class Dailyreportimg {
  public index: number = 0;
  constructor(
    public id: string,
    public dailyreport_id: string,
    public pathimg: string,
    public create_date: Date | null,
    public create_by: string,
    public update_date: Date | null,
    public update_by: string,
    public filename: string,
  ) {
  }

  static async findOneid(
    id: string,
    dailyreport_id: string,
  ): Promise<Dailyreportimg | null> {
    var Dailyreportimglist: any = new Object();
    await client.connect();
    try {
      Dailyreportimglist = await client.queryObject({
        text:
          `SELECT id,dailyreport_id,pathimg,filename FROM dailyreportimg WHERE filename =$1 AND dailyreport_id =$2 ;`,
        args: [id, dailyreport_id],
      });
      if (Dailyreportimglist.rows.toString() === "") {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      await client.end();
    }
    return Dailyreportimglist.rows;
  }

  static async findbyId(id: string): Promise<Dailyreportimg | null> {
    var Dailyreportimglist: any = new Object();
    await client.connect();
    try {
      Dailyreportimglist = await client.queryObject({
        text:
          `SELECT id,dailyreport_id,pathimg,filename FROM dailyreportimg WHERE id =$1 ;`,
        args: [id],
      });
      if (Dailyreportimglist.rows.toString() === "") {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      await client.end();
    }
    return Dailyreportimglist.rows;
  }

  static async findAllbyid(id: string): Promise<Dailyreportimg[] | null> {
    var Dailyreportimglist: any = new Array();
    await client.connect();
    try {
      Dailyreportimglist = await client.queryObject({
        text:
          `SELECT id,dailyreport_id,pathimg,filename FROM dailyreportimg WHERE dailyreport_id=$1 ;`,
        args: [id],
      });
      if (Dailyreportimglist.rows.toString() === "") {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      await client.end();
    }
    return Dailyreportimglist.rows;
  }
  async create() {
    await client.connect();
    try {
      const result: QueryResult = await client.queryObject({
        text:
          `INSERT INTO dailyreportimg (id, dailyreport_id,pathimg,create_date,create_by,filename)
          VALUES ($1, $2, $3, $4,$5,$6);`,
        args: [
          this.id,
          this.dailyreport_id,
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
    dailyreport_id: string,
    pathimg: string,
    update_date: Date,
    update_by: string,
    filename: string,
  ) {
    this.id = id;
    this.dailyreport_id = dailyreport_id;
    this.pathimg = pathimg;
    this.update_by = update_by;
    this.filename = filename;
    await client.connect();
    try {
      const result: QueryResult = await client.queryObject({
        text:
          `UPDATE dailyreportimg SET id=$1, dailyreport_id=$2, pathimg=$3, update_date=$4, update_by=$5, filename=$6
          WHERE idmachine=$1;`,
        args: [
          this.id,
          this.dailyreport_id,
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
  static async delete(id: string) {
    await client.connect();
    try {
      const result: QueryResult = await client.queryObject({
        text: `DELETE FROM dailyreportimg WHERE id=$1;`,
        args: [id],
      });
      return true;
    } catch (error) {
      throw error;
    } finally {
      await client.end();
    }
  }
  // method for change return data
  static prepare(data: any): Dailyreportimg {
    const images = new Dailyreportimg(
      data.id,
      data.dailyreport_id,
      data.pathimg,
      data.create_date,
      data.create_by,
      data.update_date,
      data.update_by,
      data.filename,
    );
    images.index = data.index;
    return images;
  }
}
