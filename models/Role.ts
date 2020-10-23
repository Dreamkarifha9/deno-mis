import { dbconfig } from "../config/dbconnect.ts";
import { Client, QueryResult } from "../deps.ts";

import {
  Context,
  GetRoleCreate,
  GetRoleRead,
  GetRoleUpdate,
  GetRoleDelete,
  convertToEnv,
} from "./../types.ts";

const client = new Client(dbconfig);

export default class Role {
  constructor(
    public id: number,
    public powername: string,
  ) {
  }
  static async CreatefileRole() {
    try {
      var sampleObject = {
        rolename: "Admin",
      };
      var json = JSON.stringify(sampleObject);

      const encoder = new TextEncoder();
      const data = encoder.encode(json);
      Deno.writeFileSync("Rolefile/Create.txt", data);
    } catch (error) {
      console.log(error);
    }
  }
  static async UpdatefileRole() {
    var sampleObject = {
      rolename: "Admin",
    };
    var json = JSON.stringify(sampleObject);
    const encoder = new TextEncoder();
    const data = encoder.encode(json);
    Deno.writeFileSync("Rolefile/Update.txt", data);
  }
  static async ReadfileRole() {
    var sampleObject = {
      rolename: "Admin",
    };
    var json = JSON.stringify(sampleObject);
    const encoder = new TextEncoder();
    const data = encoder.encode(json);
    Deno.writeFileSync("Rolefile/Read.txt", data);
  }
  static async DeletefileRole() {
    var sampleObject = {
      rolename: "Admin",
    };
    var json = JSON.stringify(sampleObject);
    const encoder = new TextEncoder();
    const data = encoder.encode(json);
    Deno.writeFileSync("Rolefile/Delete.txt", data);
  }
  // method for change return data
  static prepare(data: any): Role {
    const role = new Role(
      data.id,
      data.powername,
    );
    return role;
  }
}
