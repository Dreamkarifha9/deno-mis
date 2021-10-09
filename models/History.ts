import { dbconfig } from "../config/dbconnect.ts";
import { Client, PoolClient, QueryResult, time } from "../deps.ts";

const client = new Client(dbconfig);

export default class Historyimg {
  public tobase: string = "";
  public index: number = 0;
  public static people: any = [];
  constructor(
    public id: string,
    public idmachine: string,
    public pathimage: string,
    public create_date: Date | null,
    public create_by: string,
    public update_date: Date | null,
    public update_by: string,
  ) {
  }

  static async findOne(
    idmachine: string,
    pathimage: string,
  ): Promise<Historyimg | null> {
    var MachineList: any = new Object();
    await client.connect();
    try {
      MachineList = await client.queryObject({
        text:
          `SELECT idmachine,pathimage FROM historyimg WHERE idmachine =$1 AND pathimage =$2 ;`,
        args: [idmachine, pathimage],
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
  static async findOneid(id: string): Promise<Historyimg | null> {
    var imagesplanlist: any = new Object();
    await client.connect();
    try {
      imagesplanlist = await client.queryObject({
        text: `SELECT id,pathimage FROM historyimg WHERE id =$1 ;`,
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

  static async findAllbyid(id: string): Promise<Historyimg[] | null> {
    var ImagesList: any = new Array();
    await client.connect();
    try {
      const result = await client.queryObject({
        text:
          `SELECT id,idmachine,pathimage FROM historyimg WHERE idmachine=$1 ;`,
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
          `INSERT INTO historyimg (id,idmachine, pathimage,create_date,create_by)
          VALUES ($1, $2, $3, $4,$5);`,
        args: [
          this.id,
          this.idmachine,
          this.pathimage,
          time().tz("asia/Jakarta").t,
          this.create_by,
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
    idmachine: string,
    pathimage: string,
    update_date: Date,
    update_by: string,
  ) {
    this.id = id;
    this.idmachine = idmachine;
    this.pathimage = pathimage;
    this.update_by = update_by;
    await client.connect();
    try {
      const result: QueryResult = await client.queryObject({
        text: `UPDATE historyimg SET pathimage=$3, update_date=$4, update_by=$5
          WHERE id=$1;`,
        args: [
          this.id,
          this.idmachine,
          this.pathimage,
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
  async delete() {
    await client.connect();
    try {
      const result: QueryResult = await client.queryObject({
        text: `DELETE FROM historyimg WHERE id=$1;`,
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
