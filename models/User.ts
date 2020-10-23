import { dbconfig } from "../config/dbconnect.ts";
import { Client, QueryResult } from "../deps.ts";

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
  }
  static async findByUserId(params: object): Promise<User | null> {
    const userList: any = new Object();
    try {
      await client.connect();
      const result = await client.query({
        text: `SELECT * FROM users WHERE user_id = $1;`,
        args: [params],
      });
      if (result.rows.toString() === "") {
        return null;
      } else {
        result.rows.map((u: any) => {
          result.rowDescription.columns.map((el: any, index: any) => {
            userList[el.name] = u[index];
          });
        });
      }
    } catch (error) {
      console.log(error.toString());
    } finally {
      await client.end();
    }
    return User.prepare(userList);
  }
  static async findByUsername(params: object): Promise<User | null> {
    const userList: any = new Object();
    try {
      await client.connect();
      const result = await client.query({
        text: `SELECT * FROM users WHERE username = $1;`,
        args: [params],
      });
      if (result.rows.toString() === "") {
        return null;
      } else {
        result.rows.map((u: any) => {
          result.rowDescription.columns.map((el: any, index: any) => {
            userList[el.name] = u[index];
          });
        });
      }
    } catch (error) {
      console.log(error.toString());
    } finally {
      await client.end();
    }
    return User.prepare(userList);
  }
  static async findByUserrole(id: string): Promise<User | null> {
    const userList: any = new Object();
    try {
      await client.connect();
      const result = await client.query({
        text: `SELECT roles FROM users WHERE user_id = $1;`,
        args: [id],
      });
      if (result.rows.toString() === "") {
        return null;
      } else {
        result.rows.map((u: any) => {
          result.rowDescription.columns.map((el: any, index: any) => {
            userList[el.name] = u[index];
          });
        });
      }
    } catch (error) {
      console.log(error.toString());
    } finally {
      await client.end();
    }
    return User.prepare(userList);
  }
  // static async findByUsername(params: string): Promise<User | null> {
  //   const userList: any = new Object();
  //   console.log(params);
  //   try {
  //     await client.connect();
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
  //     console.log(error.toString());
  //   } finally {
  //     await client.end();
  //   }
  //   return User.prepare(userList);
  // }
  async save() {
    try {
      await client.connect();
      const result: QueryResult = await client.query({
        text: `INSERT INTO users (user_id, name, username,
               password, employee_id, createdate, createby,
                updatedate, updateby, is_active)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`,
        args: [
          this.user_id,
          this.name,
          this.username,
          this.password,
          this.employee_id,
          this.createdate,
          this.createby,
          this.updatedate,
          this.updateby,
          this.is_active,
        ],
      });
    } catch (error) {
      console.log(error.toString());
    } finally {
      await client.end();
    }
    return this;
  }
  static prepare(data: any) {
    return data;
  }
}
