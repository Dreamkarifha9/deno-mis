import { dbconfig } from "../config/dbconnect.ts";
import { Client, PoolClient, QueryResult, time } from "../deps.ts";

const client = new Client(dbconfig);

export default class User {
  public user_id: string;
  public name: string;
  public username: string;
  public employee_id: string;
  public password: string;
  public createdate: Date = new Date();
  public createby: string;
  public updatedate: Date = new Date();
  public updateby: string;
  public is_active: boolean = false;
  public roles: string;
  public json_b: any;
  public division: string;
  public permission: any;
  public refresh_token: string;

  constructor({
    user_id = "",
    name = "",
    username = "",
    employee_id = "",
    password = "",
    createby = "",
    updateby = "",
    is_active = false,
    roles = "",
    division = "",
    permission = [],
    refresh_token = "",
  }) {
    this.user_id = user_id;
    this.name = name;
    this.username = username;
    this.employee_id = employee_id;
    this.password = password;
    this.createby = createby;
    this.updateby = updateby;
    this.is_active = is_active;
    this.roles = roles;
    this.division = division;
    this.permission = permission;
    this.refresh_token = refresh_token;
  }
  static async findByUserId(params: string): Promise<User | null> {
    var userList: any = new Object();
    await client.connect();
    try {
      userList = await client.queryObject({
        text: `SELECT * FROM users WHERE user_id = $1;`,
        args: [params],
      });
      if (userList.rows.toString() === "") {
        return null;
      }
    } catch (error) {
      console.log(error);
    } finally {
      await client.end();
    }
    return userList.rows;
  }
  static async findAll(): Promise<User[] | null> {
    var userlist: any = new Array();

    await client.connect();
    try {
      userlist = await client.queryObject({
        text: `SELECT * FROM users ;`,
        args: [],
      });
      if (userlist.rows.toString() === "") {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      await client.end();
    }
    return userlist.rows;
  }
  static async findtest(params: string): Promise<User | null> {
    var userList: any = new Object();
    await client.connect();
    try {
      userList = await client.queryObject({
        text: `SELECT json_b FROM users WHERE username = $1;`,
        args: [params],
      });
      if (userList.rows.toString() === "") {
        return null;
      }
    } catch (error) {
      console.log(error);
    } finally {
      await client.end();
    }
    return userList.rows;
  }
  static async findByUsername(params: object): Promise<User | null> {
    var userList: any = new Object();
    await client.connect();
    try {
      userList = await client.queryObject({
        text: `SELECT * FROM users WHERE username = $1;`,
        args: [params],
      });
      if (userList.rows.toString() === "") {
        return null;
      }
    } catch (error) {
      console.log(error);
    } finally {
      await client.end();
    }
    return userList.rows;
  }
  static async findByUserrole(id: string): Promise<User | null> {
    var userList: any = new Object();
    await client.connect();
    try {
      userList = await client.queryObject({
        text: `SELECT roles FROM users WHERE user_id = $1;`,
        args: [id],
      });
      if (userList.rows.toString() === "") {
        return null;
      }
    } catch (error) {
      console.log(error);
    } finally {
      await client.end();
    }
    return userList.rows;
  }
  // static async findByUsername(params: string): Promise<User | null> {
  //   const userList: any = new Object();
  //   console.log(params);
  //   try {
  //
  //     const result = await client.query({
  //       text: "SELECT * FROM users WHERE username = $1 ;",
  //       args: [params],
  //     });
  //     if (result.rows.toString() === "") {
  //       return null;
  //     } else {
  //       result.rows.map((u) => {
  //         result.rowDescription.columns.map((el, index) => {
  //           userList[el.name] = u[index];
  //         });
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     await client.end();
  //   }
  //   return User.prepare(userList);
  // }
  async save() {
    await client.connect();
    try {
      const result: QueryResult = await client.queryObject({
        text: `INSERT INTO users (user_id, name, username,
               password, employee_id, createdate, createby,
                updatedate, updateby, is_active, division)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);`,
        args: [
          this.user_id,
          this.name,
          this.username,
          this.password,
          this.employee_id,
          time().tz("asia/Jakarta").t,
          this.createby,
          time().tz("asia/Jakarta").t,
          this.updateby,
          this.is_active,
          this.division,
        ],
      });
    } catch (error) {
      console.log(error);
    } finally {
      await client.end();
    }
    return this;
  }

  async updaterefresh_token() {
    await client.connect();
    try {
      const result: QueryResult = await client.queryObject({
        text:
          `UPDATE users SET refresh_token=$1, updatedate=$2, updateby=$3 WHERE user_id=$4;`,
        args: [
          this.refresh_token,
          time().tz("asia/Jakarta").t,
          this.updateby,
          this.user_id,
        ],
      });
    } catch (error) {
      console.log(error);
    } finally {
      await client.end();
    }
    return this;
  }

  async updatepassword() {
    await client.connect();
    try {
      const result: QueryResult = await client.queryObject({
        text:
          `UPDATE users SET password=$1, updatedate=$2, updateby=$3 WHERE user_id=$4;`,
        args: [
          this.password,
          time().tz("asia/Jakarta").t,
          this.updateby,
          this.user_id,
        ],
      });
    } catch (error) {
      console.log(error);
    } finally {
      await client.end();
    }
    return this;
  }
  async update() {
    await client.connect();
    try {
      const result: QueryResult = await client.queryObject({
        text:
          `UPDATE users SET permission=$1, updatedate=$2, updateby=$3 WHERE user_id=$4;`,
        args: [
          JSON.stringify(this.permission),
          time().tz("asia/Jakarta").t,
          this.updateby,
          this.user_id,
        ],
      });
    } catch (error) {
      console.log(error);
    } finally {
      await client.end();
    }
    return this;
  }
}
