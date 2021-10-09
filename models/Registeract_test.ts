import { dbClient } from "../db.ts";
import { Client, Pool, QueryResult, time } from "../deps.ts";
import { format } from "https://deno.land/x/pg_format@v1.0.0/index.js";
import { Iregister } from "../entity/register.ts";

class RegisteractModel {
  private dbClient: Client;

  constructor(dbClient: Client) {
    this.dbClient = dbClient;
  }
  async insert(
    data: Omit<Iregister, "id">,
  ): Promise<any | null> {
    console.log("insert", data);
    try {
      await this.dbClient.connect();
      const text = `INSERT INTO machineactivity (actcode,description,
         duratypeid,is_active, update_date,machinedetailsid,
         update_by,result_type,machinegroupid,checkyear,
         standard,monthcurrent,season_id)VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`;
      const result = await this.dbClient.queryObject({
        text,
        args: [
          data.actcode,
          data.description,
          data.duratypeid,
          data.is_active,
          time().tz("asia/Jakarta").t,
          data.machinedetailsid,
          data.update_by,
          data.result_type,
          data.machinegroupid,
          data.checkyear,
          data.standard,
          data.monthcurrent,
          data.season_id,
        ],
      });
      await this.dbClient.end();
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  async update(
    data: Omit<Iregister, "id"> & { id: number },
  ): Promise<any | null> {
    try {
      await this.dbClient.connect();
      const text =
        `UPDATE machineactivity SET standard=$2, description=$3, update_date=$4, update_by=$5
      WHERE id=$1;`;
      const result = await this.dbClient.queryObject({
        text,
        args: [
          data.id,
          data.standard,
          data.description,
          time().tz("asia/Jakarta").t,
          data.update_by,
        ],
      });
      await this.dbClient.end();
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.dbClient.connect();
      const text = `DELETE FROM machineactivity WHERE id=$1`;
      await this.dbClient.queryObject({
        text,
        args: [id],
      });
      await this.dbClient.end();
      return true;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string): Promise<any> {
    try {
      await this.dbClient.connect();
      const text = `SELECT * FROM machineactivity WHERE id =$1 ;`;
      const result = await this.dbClient.queryObject({
        text,
        args: [id],
      });
      await this.dbClient.end();
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  async findfristpage(): Promise<any> {
    try {
      await this.dbClient.connect();
      const text =
        `SELECT machineactivitydetails.id, machineactivitydetails.actcode, machineactivitydetails.description as actdescription, machineactivitydetails.duratypeid,
      machineactivitydetails.is_active, machineactivitydetails.update_date, machinedetails.idmachine, machineactivitydetails.update_by,
      duratype.description, duratype.dura_day, machinedetails.name, machinedetails.orders, machineactivitydetails.machinegroupid,
      machinegroup.name as machinegroupname, machineactivitydetails.machinedetailsid, machineactivitydetails.standard
      FROM machineactivity AS machineactivitydetails
      LEFT JOIN duratype on duratype.id = machineactivitydetails.duratypeid 
      LEFT JOIN machinedetails on machinedetails.id = machineactivitydetails.machinedetailsid
      LEFT JOIN machinegroup on machinegroup.id = machineactivitydetails.machinegroupid
      ORDER BY machineactivitydetails.id DESC LIMIT 15 ;`;
      const result = await this.dbClient.queryObject({
        text,
      });
      await this.dbClient.end();
      return result.rows;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findAll(): Promise<any> {
    try {
      await this.dbClient.connect();
      const text =
        `SELECT machineactivitydetails.id, machineactivitydetails.actcode, machineactivitydetails.description as actdescription, machineactivitydetails.duratypeid,
      machineactivitydetails.is_active, machineactivitydetails.update_date, machinedetails.idmachine, machineactivitydetails.update_by,
      duratype.description, duratype.dura_day, machinedetails.name, machinedetails.orders, machineactivitydetails.machinegroupid,
      machinegroup.name as machinegroupname, machineactivitydetails.machinedetailsid, machineactivitydetails.standard
      FROM machineactivity AS machineactivitydetails
      LEFT JOIN duratype on duratype.id = machineactivitydetails.duratypeid 
      LEFT JOIN machinedetails on machinedetails.id = machineactivitydetails.machinedetailsid
      LEFT JOIN machinegroup on machinegroup.id = machineactivitydetails.machinegroupid
      ORDER BY machineactivitydetails.id;`;
      const result = await this.dbClient.queryObject({
        text,
      });
      await this.dbClient.end();
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  async findAllidDivision(id: string): Promise<any> {
    try {
      await this.dbClient.connect();
      const text =
        `SELECT * FROM public.historymachine LEFT JOIN division on historymachine.division = division.id
      LEFT JOIN size on historymachine.sizemachine = size.id
      LEFT JOIN capacity on historymachine.capacity = capacity.id
      LEFT JOIN power on historymachine.power = power.id
      WHERE historymachine.division = $1
      ORDER BY idmachine ASC ;`;
      const result = await this.dbClient.queryObject({
        text,
        args: [id],
      });
      await this.dbClient.end();
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  async findmachinegroupid(id: string, seasonid: string): Promise<any> {
    try {
      await this.dbClient.connect();
      const text =
        `SELECT machineactivitydetails.id, machineactivitydetails.actcode, machineactivitydetails.description as actdescription, machineactivitydetails.duratypeid,
      machineactivitydetails.is_active, machineactivitydetails.update_date, machineactivitydetails.standard, machineactivitydetails.checkyear,
       machineactivitydetails.monthcurrent , machinedetails.idmachine, machineactivitydetails.update_by,
      duratype.description, duratype.dura_day, machinedetails.name
      FROM machineactivity AS machineactivitydetails LEFT JOIN duratype on duratype.id = machineactivitydetails.duratypeid 
      LEFT JOIN machinedetails on machinedetails.id = machineactivitydetails.machinedetailsid
      where machinegroupid = $1 and season_id = $2
      ORDER BY machineactivitydetails.id ASC ;`;
      const result = await this.dbClient.queryObject({
        text,
        args: [id, seasonid],
      });
      await this.dbClient.end();
      return result.rows;
    } catch (error) {
      throw error;
    }
  }
}

export const Registeract = new RegisteractModel(dbClient);
