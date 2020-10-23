import { dbconfig } from "../config/dbconnect.ts";
import { Client, QueryResult, Base64 } from "../deps.ts";

const client = new Client(dbconfig);

export default class Planningimg {
  public tobase: string = "";
  public index: number = 0;
  public static people: any = [];
  constructor(
    public id: string,
    public idmachine: string,
    public pathimage: string,
    public seasonid: number,
    public create_date: Date | null,
    public create_by: string,
    public update_date: Date | null,
    public update_by: string,
  ) {
  }

  static async findOne(
    idmachine: string,
    pathimage: string,
    seasonid: number,
  ): Promise<Planningimg | null> {
    const MachineList: any = new Object();
    try {
      await client.connect();
      const result = await client.query({
        text:
          `SELECT idmachine,pathimage,seasonid FROM planningimg WHERE idmachine =$1 AND pathimage =$2 AND seasonid =$3 ;`,
        args: [idmachine, pathimage, seasonid],
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
    return Planningimg.prepare(MachineList);
  }
  static async findOneid(id: string): Promise<Planningimg | null> {
    const imagesplanlist: any = new Object();
    try {
      await client.connect();
      const result = await client.query({
        text: `SELECT id,pathimage FROM planningimg WHERE id =$1 ;`,
        args: [id],
      });
      if (result.rows.toString() === "") {
        return null;
      } else {
        result.rows.map((p) => {
          // let obj: any = new Object()
          result.rowDescription.columns.map((el, i) => {
            imagesplanlist[el.name] = p[i];
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
    return Planningimg.prepare(imagesplanlist);
  }

  static async findAllbyid(id: string): Promise<Planningimg[] | null> {
    const ImagesList: any = new Array();
    try {
      await client.connect();
      const result = await client.query({
        text:
          `SELECT id,idmachine,pathimage,seasonid FROM planningimg WHERE idmachine=$1 ;`,
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
    return ImagesList.map((images: any) => Planningimg.prepare(images));
  }
  async create() {
    try {
      await client.connect();
      const result: QueryResult = await client.query({
        text:
          `INSERT INTO planningimg (id, pathimage,seasonid,create_date,create_by,idmachine)
          VALUES ($1, $2, $3, $4,$5,$6);`,
        args: [
          this.id,
          this.pathimage,
          this.seasonid,
          this.create_date,
          this.create_by,
          this.idmachine,
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
        text: `DELETE FROM planningimg WHERE id=$1;`,
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
  static prepare(data: any): Planningimg {
    const images = new Planningimg(
      data.id,
      data.idmachine,
      data.pathimage,
      data.seasonid,
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
