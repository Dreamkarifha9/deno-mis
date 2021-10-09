import { dbconfig } from "../config/dbconnect.ts";
import { Client, PoolClient, QueryResult, time } from "../deps.ts";

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
    public machinegroupid: number,
    public fis_refcode: string,
    public create_date: Date | null,
    public create_by: string,
    public update_date: Date | null,
    public update_by: string,
  ) {
  }
  static async findOne(id: string): Promise<Machine | null> {
    var MachineList: any = new Object();
    await client.connect();
    try {
      MachineList = await client.queryObject({
        text: `SELECT idmachine FROM historymachine WHERE idmachine =$1 ;`,
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

  static async findAllidMachinegroupid(id: string): Promise<Machine[] | null> {
    var MachineList: any = new Object();
    await client.connect();
    try {
      MachineList = await client.queryObject({
        text:
          `SELECT idmachine,namethai,machinegroupid FROM historymachine where historymachine.machinegroupid = $1
          ORDER BY idmachine ASC  ;`,
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

  static async findAllidDivision(id: string): Promise<Machine[] | null> {
    var MachineList: any = new Array();
    await client.connect();
    try {
      MachineList = await client.queryObject({
        text:
          `SELECT historymachines.idmachine,historymachines.namethai,historymachines.division,historymachines.nameeng,historymachines.point,historymachines.model,
          historymachines.nummachine, historymachines.sizemachine, historymachines.energy, historymachines.usejob, historymachines.capability,historymachines.manufacturer,
          historymachines.machineinclude, historymachines.genration,historymachines.machinegroupid, size.sizename, capacity.capacityname, 
          power.powername, division.divisionname FROM historymachine as historymachines LEFT JOIN division on historymachines.division = division.id
                    LEFT JOIN size on historymachines.sizemachine = size.id
                    LEFT JOIN capacity on historymachines.capacity = capacity.id
                    LEFT JOIN power on historymachines.power = power.id
                   WHERE  historymachines.division = $1
                    ORDER BY idmachine ASC ;`,
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

  static async findAll(): Promise<Machine[] | null> {
    var MachineList: any = new Object();
    await client.connect();
    try {
      MachineList = await client.queryObject({
        text:
          `SELECT historymachines.idmachine,historymachines.namethai,historymachines.division,historymachines.nameeng,historymachines.point,historymachines.model,
          historymachines.nummachine, historymachines.sizemachine, historymachines.energy, historymachines.usejob, historymachines.capability,historymachines.manufacturer,
          historymachines.machineinclude, historymachines.genration,historymachines.machinegroupid, size.sizename, capacity.capacityname, 
          power.powername, division.divisionname FROM historymachine as historymachines LEFT JOIN division on historymachines.division = division.id
                    LEFT JOIN size on historymachines.sizemachine = size.id
                    LEFT JOIN capacity on historymachines.capacity = capacity.id
                    LEFT JOIN power on historymachines.power = power.id ORDER BY idmachine ASC ;`,
        args: [],
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

  static async findfristpage(): Promise<Machine[] | null> {
    var MachineList: any = new Object();
    await client.connect();
    try {
      MachineList = await client.queryObject({
        text:
          `SELECT historymachines.idmachine,historymachines.namethai,historymachines.division,historymachines.nameeng,historymachines.point,historymachines.model,
      historymachines.nummachine, historymachines.sizemachine, historymachines.energy, historymachines.usejob, historymachines.capability,historymachines.manufacturer,
      historymachines.machineinclude, historymachines.genration,historymachines.machinegroupid, size.sizename, capacity.capacityname, 
      power.powername, division.divisionname FROM historymachine as historymachines LEFT JOIN division on historymachines.division = division.id
                LEFT JOIN size on historymachines.sizemachine = size.id
                LEFT JOIN capacity on historymachines.capacity = capacity.id
                LEFT JOIN power on historymachines.power = power.id ORDER BY idmachine DESC LIMIT 15;`,
        args: [],
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
  async create() {
    await client.connect();
    try {
      const result: QueryResult = await client.queryObject({
        text:
          `INSERT INTO historymachine (idmachine,namethai, nameeng, sizemachine, capacity,
  power, division,point,model,nummachine,usejob,capability,manufacturer,machineinclude,
  genration,energy,create_date,create_by,machinegroupid)
          VALUES ($1, $2, $3, $4, $5, $6, $7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19);`,
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
          time().tz("asia/Jakarta").t,
          this.create_by,
          this.machinegroupid,
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
    await client.connect();
    try {
      const result: QueryResult = await client.queryObject({
        text:
          `UPDATE historymachine SET idmachine=$1, namethai=$2, nameeng=$3, sizemachine=$4,
capacity=$5, power=$6,point=$7,model=$8, 
nummachine=$9, usejob=$10, capability=$11, manufacturer=$12, 
machineinclude=$13, genration=$14, energy=$15, update_date=$16, update_by=$17, division=$18
          WHERE idmachine=$1;`,
        args: [
          idmachine,
          namethai,
          nameeng,
          sizemachine,
          capacity,
          power,
          point,
          model,
          nummachine,
          usejob,
          capability,
          manufacturer,
          machineinclude,
          genration,
          energy,
          time().tz("asia/Jakarta").t,
          update_by,
          division,
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
        text: `DELETE FROM historymachine WHERE idmachine=$1;`,
        args: [this.idmachine],
      });
    } catch (error) {
      console.log(error);
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
      data.machinegroupid,
      data.fis_refcode,
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
