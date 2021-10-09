import { database } from "../../config/dbconnect.ts";
import { Client, time } from "../../deps.ts";

class RegisterRepository {
  async findAll(): Promise<any> {
    var result: any;
    try {
      result = await database.queryObject({
        text:
          `SELECT machineactivitydetails.id, machineactivitydetails.actcode, machineactivitydetails.description as actdescription, machineactivitydetails.duratypeid,
          machineactivitydetails.is_active, machineactivitydetails.update_date, machinedetails.idmachine, machineactivitydetails.update_by,
          duratype.description, duratype.dura_day, machinedetails.name, machinedetails.orders, machineactivitydetails.machinegroupid,
		      machinegroup.name as machinegroupname, machineactivitydetails.machinedetailsid, machineactivitydetails.standard
          FROM machineactivity AS machineactivitydetails
		      LEFT JOIN duratype on duratype.id = machineactivitydetails.duratypeid 
          LEFT JOIN machinedetails on machinedetails.id = machineactivitydetails.machinedetailsid
		      LEFT JOIN machinegroup on machinegroup.id = machineactivitydetails.machinegroupid
          ORDER BY machineactivitydetails.id;`,
        args: [],
      });
    } catch (error) {
      throw error;
    } finally {
      await database.end();
    }
    return result;
  }

  async findfristpage(): Promise<any> {
    var result: any;
    try {
      console.log("Inn");
      result = await database.queryObject({
        text:
          `SELECT machineactivitydetails.id, machineactivitydetails.actcode, machineactivitydetails.description as actdescription, machineactivitydetails.duratypeid,
          machineactivitydetails.is_active, machineactivitydetails.update_date, machinedetails.idmachine, machineactivitydetails.update_by,
          duratype.description, duratype.dura_day, machinedetails.name, machinedetails.orders, machineactivitydetails.machinegroupid,
		      machinegroup.name as machinegroupname, machineactivitydetails.machinedetailsid, machineactivitydetails.standard
          FROM machineactivity AS machineactivitydetails
		      LEFT JOIN duratype on duratype.id = machineactivitydetails.duratypeid 
          LEFT JOIN machinedetails on machinedetails.id = machineactivitydetails.machinedetailsid
		      LEFT JOIN machinegroup on machinegroup.id = machineactivitydetails.machinegroupid
          ORDER BY machineactivitydetails.id DESC LIMIT 15 ;`,
        args: [],
      });
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      console.log("close");
    }
    return result;
  }

  async findmachinegroupid(id: string, seasonid: string): Promise<any> {
    var result: any;
    try {
      result = await database.queryObject({
        text:
          `SELECT machineactivitydetails.id, machineactivitydetails.actcode, machineactivitydetails.description as actdescription, machineactivitydetails.duratypeid,
        machineactivitydetails.is_active, machineactivitydetails.update_date, machineactivitydetails.standard, machineactivitydetails.checkyear,
         machineactivitydetails.monthcurrent , machinedetails.idmachine, machineactivitydetails.update_by,
        duratype.description, duratype.dura_day, machinedetails.name
        FROM machineactivity AS machineactivitydetails LEFT JOIN duratype on duratype.id = machineactivitydetails.duratypeid 
        LEFT JOIN machinedetails on machinedetails.id = machineactivitydetails.machinedetailsid
        where machinegroupid = $1 and season_id = $2
        ORDER BY machineactivitydetails.id ASC ;`,
        args: [id, seasonid],
      });
    } catch (error) {
      throw error;
    } finally {
      await database.end();
    }
    return result;
  }

  async findById(id: number): Promise<any> {
    var result: any;
    try {
      result = await database.queryObject({
        text: "SELECT id,name FROM users WHERE id = $1;",
        args: [id],
      });
    } catch (error) {
      throw error;
    } finally {
      await database.end();
    }
    return result;
  }

  async create(user: any): Promise<any> {
    var result: any;
    try {
      result = await database.queryObject({
        text: `INSERT INTO machineactivity (actcode,description, duratypeid,
          is_active, update_date,machinedetailsid,update_by,result_type,machinegroupid,checkyear,standard,monthcurrent,
          season_id)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);`,
        args: [
          user.actcode,
          user.description,
          user.duratypeid,
          user.is_active,
          time().tz("asia/Jakarta").t,
          user.machinedetailsid,
          user.update_by,
          user.result_type,
          user.machinegroupid,
          user.checkyear,
          user.standard,
          user.monthcurrent,
          user.season_id,
        ],
      });
    } catch (error) {
      throw error;
    } finally {
      await database.end();
    }
    return result;
  }

  async update(user: any): Promise<any> {
    var result: any;
    try {
      result = await database.queryObject({
        text:
          `UPDATE machineactivity SET standard=$2, description=$3, update_date=$4, update_by=$5
          WHERE id=$1;`,
        args: [
          user.id,
          user.standard,
          user.description,
          time().tz("asia/Jakarta").t,
          user.update_by,
        ],
      });
    } catch (error) {
      throw error;
    } finally {
      await database.end();
    }
    return result;
  }

  async delete(id: number): Promise<boolean> {
    var result: any;
    try {
      result = await database.queryObject({
        text: `DELETE FROM machineactivity WHERE id=$1;`,
        args: [id],
      });
    } catch (error) {
      throw error;
    } finally {
      await database.end();
    }
    return true;
  }
}

export default new RegisterRepository();
