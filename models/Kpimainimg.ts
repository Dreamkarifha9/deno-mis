import { dbconfig } from "../config/dbconnect.ts";
import { Client, QueryResult, Base64 } from "../deps.ts";

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
    const imagesplanlist: any = new Object();
    try {
      await client.connect();
      const result = await client.query({
        text:
          `SELECT id,fkid,pathimg,filename FROM kpimainimg WHERE filename =$1 AND fkid =$2 ;`,
        args: [id, fkid],
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
    return Kpimainimg.prepare(imagesplanlist);
  }

  static async findbyId(id: string): Promise<Kpimainimg | null> {
    const imagesplanlist: any = new Object();
    try {
      await client.connect();
      const result = await client.query({
        text: `SELECT id,fkid,pathimg,filename FROM kpimainimg WHERE id =$1 ;`,
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
    return Kpimainimg.prepare(imagesplanlist);
  }

  static async findAllbyid(id: string): Promise<Kpimainimg[] | null> {
    const ImagesList: any = new Array();
    try {
      await client.connect();
      const result = await client.query({
        text: `SELECT id,fkid,pathimg,filename FROM kpimainimg WHERE fkid=$1 ;`,
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
    return ImagesList.map((images: any) => Kpimainimg.prepare(images));
  }
  async create() {
    try {
      await client.connect();
      const result: QueryResult = await client.query({
        text:
          `INSERT INTO kpimainimg (id, fkid,pathimg,create_date,create_by,filename)
          VALUES ($1, $2, $3, $4,$5,$6);`,
        args: [
          this.id,
          this.fkid,
          this.pathimg,
          this.create_date,
          this.create_by,
          this.filename,
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
    fkid: string,
    pathimg: string,
    update_date: Date,
    update_by: string,
    filename: string,
  ) {
    this.id = id;
    this.fkid = fkid;
    this.pathimg = pathimg;
    this.update_date = update_date;
    this.update_by = update_by;
    this.filename = filename;
    try {
      await client.connect();
      const result: QueryResult = await client.query({
        text:
          `UPDATE kpimainimg SET id=$1, fkid=$2, pathimg=$3, update_date=$4, update_by=$5, filename=$6
          WHERE idmachine=$1;`,
        args: [
          this.id,
          this.fkid,
          this.pathimg,
          this.update_date,
          this.update_by,
          this.filename,
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
        text: `DELETE FROM kpimainimg WHERE id=$1;`,
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
  static prepare(data: any): Kpimainimg {
    const images = new Kpimainimg(
      data.id,
      data.fkid,
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
