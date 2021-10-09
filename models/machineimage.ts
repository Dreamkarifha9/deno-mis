import { dbconfig } from "../config/dbconnect.ts";
import { Client, PoolClient, QueryResult, time } from "../deps.ts";
const client = new Client(dbconfig);
export default class machineimage {
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

  static async findOne(id: string): Promise<machineimage | null> {
    var MachineList: any = new Object();
    await client.connect();
    try {
      MachineList = await client.queryObject({
        text: `SELECT idmachine FROM machineimg WHERE idmachine =$1 ;`,
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
  static async findOneid(id: string): Promise<machineimage | null> {
    var MachineList: any = new Object();
    await client.connect();
    try {
      MachineList = await client.queryObject({
        text: `SELECT id,pathimage FROM machineimg WHERE id =$1 ;`,
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

  static async findAllbyid(id: string): Promise<machineimage[] | null> {
    var ImagesList: any = new Array();
    await client.connect();
    try {
      ImagesList = await client.queryObject({
        text:
          `SELECT id,idmachine,pathimage FROM machineimg WHERE idmachine=$1 ;`,
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
          `INSERT INTO machineimg (id,idmachine, pathimage,create_date,create_by)
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
        text:
          `UPDATE machineimg SET id=$1, idmachine=$2, pathimage=$3, update_date=$4, update_by=$5
          WHERE idmachine=$1;`,
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
  static async delete(id: string): Promise<boolean> {
    await client.connect();
    try {
      const result: QueryResult = await client.queryObject({
        text: `DELETE FROM machineimg WHERE id=$1;`,
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
  // method for change return data
  static prepare(data: any): machineimage {
    const images = new machineimage(
      data.id,
      data.idmachine,
      data.pathimage,
      data.create_date,
      data.create_by,
      data.update_date,
      data.update_by,
    );
    images.tobase = data.tobase;
    images.index = data.index;
    return images;
  }
}
