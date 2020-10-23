import { dbconfig } from "../config/dbconnect.ts";
import { Client, QueryResult } from "../deps.ts";

const client = new Client(dbconfig);
export default class Machine {
  public index: number = 0;
  public divisionname: string = "";
  public sizename: string = "";
  public powername: string = "";
  public capacityname: string = "";
  constructor(
    public idmachine: string,
    public namethai: string,
    public nameeng: string,
    public sizemachine: number,
    public capacity: number,
    public power: number,
    public division: number,
    public point: string,
    public model: string,
    public nummachine: string,
    public usejob: string,
    public capability: string,
    public manufacturer: string,
    public machineinclude: string,
    public genration: string,
    public energy: string,
    public create_date: Date | null,
    public create_by: string,
    public update_date: Date | null,
    public update_by: string,
  ) {
  }
  static async findOne(id: string): Promise<Machine | null> {
    const MachineList: any = new Object();
    try {
      await client.connect();
      const result = await client.query({
        text: `SELECT idmachine FROM historymachine WHERE idmachine =$1 ;`,
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
    return Machine.prepare(MachineList);
  }
  static async findAll(): Promise<Machine[] | null> {
    const MachineList: any = new Array();
    try {
      await client.connect();
      const result = await client.query({
        text:
          `SELECT * FROM public.historymachine LEFT JOIN division on historymachine.division = division.id
          LEFT JOIN size on historymachine.sizemachine = size.id
          LEFT JOIN capacity on historymachine.capacity = capacity.id
          LEFT JOIN power on historymachine.power = power.id ORDER BY idmachine ASC ;`,
        args: [],
      });
      if (result.rows.toString() === "") {
        return null;
      } else {
        result.rows.map((p: any, j: any) => {
          let obj: any = new Object();
          result.rowDescription.columns.map((el: any, i: any) => {
            obj.index = j + 1;
            obj[el.name] = p[i];
          });
          MachineList.push(obj);
        });
      }
    } catch (error) {
      console.log(error.toString());
      return null;
    } finally {
      await client.end();
    }
    return MachineList.map((mahine: any) => Machine.prepare(mahine));
  }
  async create() {
    try {
      await client.connect();
      const result: QueryResult = await client.query({
        text:
          `INSERT INTO historymachine (idmachine,namethai, nameeng, sizemachine, capacity,
  power, division,point,model,nummachine,usejob,capability,manufacturer,machineinclude,
  genration,energy,create_date,create_by)
          VALUES ($1, $2, $3, $4, $5, $6, $7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18);`,
        args: [
          this.idmachine,
          this.namethai,
          this.nameeng,
          this.sizemachine,
          this.capacity,
          this.power,
          this.division,
          this.point,
          this.model,
          this.nummachine,
          this.usejob,
          this.capability,
          this.manufacturer,
          this.machineinclude,
          this.genration,
          this.energy,
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
    idmachine: string,
    namethai: string,
    nameeng: string,
    sizemachine: number,
    capacity: number,
    power: number,
    division: number,
    point: string,
    model: string,
    nummachine: string,
    usejob: string,
    capability: string,
    manufacturer: string,
    machineinclude: string,
    genration: string,
    energy: string,
    update_date: Date,
    update_by: string,
  ) {
    this.idmachine = idmachine;
    this.namethai = namethai;
    this.nameeng = nameeng;
    this.sizemachine = sizemachine;
    this.capacity = capacity;
    this.power = power;
    this.division = division;
    this.point = point;
    this.model = model;
    this.nummachine = nummachine;
    this.usejob = usejob;
    this.capability = capability;
    this.manufacturer = manufacturer;
    this.machineinclude = machineinclude;
    this.genration = genration;
    this.energy = energy;
    this.update_date = update_date;
    this.update_by = update_by;
    try {
      await client.connect();
      const result: QueryResult = await client.query({
        text:
          `UPDATE historymachine SET idmachine=$1, namethai=$2, nameeng=$3, sizemachine=$4,
capacity=$5, power=$6,point=$7,model=$8, 
nummachine=$9, usejob=$10, capability=$11, manufacturer=$12, 
machineinclude=$13, genration=$14, energy=$15, update_date=$16, update_by=$17, division=$18
          WHERE idmachine=$1;`,
        args: [
          this.idmachine,
          this.namethai,
          this.nameeng,
          this.sizemachine,
          this.capacity,
          this.power,
          this.point,
          this.model,
          this.nummachine,
          this.usejob,
          this.capability,
          this.manufacturer,
          this.machineinclude,
          this.genration,
          this.energy,
          this.update_date,
          this.update_by,
          this.division,
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
        text: `DELETE FROM historymachine WHERE idmachine=$1;`,
        args: [this.idmachine],
      });
    } catch (error) {
      console.log(error.toString());
    } finally {
      await client.end();
    }
    return this;
  }
  static prepare(data: any): Machine {
    const mahine = new Machine(
      data.idmachine,
      data.namethai,
      data.nameeng,
      data.sizemachine,
      data.capacity,
      data.power,
      data.division,
      data.point,
      data.model,
      data.nummachine,
      data.usejob,
      data.capability,
      data.manufacturer,
      data.machineinclude,
      data.genration,
      data.energy,
      data.create_date,
      data.create_by,
      data.update_date,
      data.update_by,
    );
    mahine.index = data.index;
    mahine.divisionname = data.divisionname;
    mahine.sizename = data.sizename;
    mahine.powername = data.powername;
    mahine.capacityname = data.capacityname;
    return mahine;
  }
}
