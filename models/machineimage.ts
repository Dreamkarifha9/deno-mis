import { dbconfig } from "../config/dbconnect.ts";
import { Client, QueryResult, Base64 } from "../deps.ts";

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
    const MachineList: any = new Object();
    try {
      await client.connect();
      const result = await client.query({
        text: `SELECT idmachine FROM machineimg WHERE idmachine =$1 ;`,
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
    return machineimage.prepare(MachineList);
  }
  static async findOneid(id: string): Promise<machineimage | null> {
    const MachineList: any = new Object();
    try {
      await client.connect();
      const result = await client.query({
        text: `SELECT id,pathimage FROM machineimg WHERE id =$1 ;`,
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
    return machineimage.prepare(MachineList);
  }

  static async findAllbyid(id: string): Promise<machineimage[] | null> {
    const ImagesList: any = new Array();
    try {
      await client.connect();
      const result = await client.query({
        text:
          `SELECT id,idmachine,pathimage FROM machineimg WHERE idmachine=$1 ;`,
        args: [id],
      });
      if (result.rows.toString() === "") {
        return null;
      } else {
        result.rows.map((p: any, j: any) => {
          let obj: any = new Object();
          result.rowDescription.columns.map((el: any, i: any) => {
            obj.index = j;
            obj[el.name] = p[i];
          });
          ImagesList.push(obj);
        });
      }
    } catch (error) {
      console.log(error.toString());
      return null;
    } finally {
      await client.end();
    }
    return ImagesList.map((images: any) => machineimage.prepare(images));
  }
  async create() {
    try {
      await client.connect();
      const result: QueryResult = await client.query({
        text:
          `INSERT INTO machineimg (id,idmachine, pathimage,create_date,create_by)
          VALUES ($1, $2, $3, $4,$5);`,
        args: [
          this.id,
          this.idmachine,
          this.pathimage,
          this.create_date,
          this.create_by,
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
    pathimage: string,
    update_date: Date,
    update_by: string,
  ) {
    this.id = id;
    this.idmachine = idmachine;
    this.pathimage = pathimage;
    this.update_date = update_date;
    this.update_by = update_by;
    try {
      await client.connect();
      const result: QueryResult = await client.query({
        text:
          `UPDATE machineimg SET id=$1, idmachine=$2, pathimage=$3, update_date=$4, update_by=$5
          WHERE idmachine=$1;`,
        args: [
          this.id,
          this.idmachine,
          this.pathimage,
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
  async delete() {
    try {
      await client.connect();
      const result: QueryResult = await client.query({
        text: `DELETE FROM machineimg WHERE id=$1;`,
        args: [this.id],
      });
    } catch (error) {
      console.log(error.toString());
    } finally {
      await client.end();
    }
    return this;
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
