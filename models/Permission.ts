import { dbconfig } from "../config/dbconnect.ts";
import { Client, PoolClient, QueryResult, time } from "../deps.ts";

const client = new Client(dbconfig);

export default class Permission {
  public id: number = 0;
  public menuchildeng: string = "";
  public name: string = "";
  public menuchildname: string = "";
  public menuname: string = "";
  constructor(
    public idmenu: number,
    public idmenuchild: number,
    public view_read: boolean,
    public view_create: boolean,
    public view_edit: boolean,
    public view_delete: boolean,
    public permission: JSON,
    public userid: string,
  ) {
  }
  static async findAll(): Promise<Permission[] | null> {
    var permissionlist: any = new Array();
    await client.connect();
    try {
      permissionlist = await client.queryObject({
        text:
          `SELECT menuchild.menuchildeng FROM menu LEFT JOIN menuchild on menu.id = menuchild.menuid;`,
        args: [],
      });
      if (permissionlist.rows.toString() === "") {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      await client.end();
    }
    return permissionlist.rows;
  }

  static async findpermissionAll(userid: string): Promise<Permission[] | null> {
    var permissionlist: any = new Array();
    await client.connect();
    try {
      permissionlist = await client.queryObject({
        text:
          `SELECT permissionmenu.id, permissionmenu.idmenu, permissionmenu.idmenuchild, permissionmenu.view_read, permissionmenu.view_create,
          permissionmenu.view_edit, permissionmenu.view_delete, permissionmenu.permission, permissionmenu.userid, menu.menuname,menuchild.menuchildeng,
          menuchild.menuchildname, users.name, users.user_id FROM public.permissionmenu
          LEFT JOIN menu on permissionmenu.idmenu = menu.id
          LEFT JOIN menuchild on permissionmenu.idmenuchild = menuchild.id
          LEFT JOIN users on permissionmenu.userid = users.user_id
          where users.user_id = $1
          ORDER BY id ASC ;`,
        args: [userid],
      });
      if (permissionlist.rows.toString() === "") {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      await client.end();
    }
    return permissionlist.rows;
  }

  static async findOne(
    id: string,
  ): Promise<Permission | null> {
    var permissionList: any = new Object();
    await client.connect();
    try {
      permissionList = await client.queryObject({
        text: `SELECT * FROM public.permissionmenu
          where id = $1 ;`,
        args: [id],
      });
      console;
      if (permissionList.rows.toString() === "") {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      await client.end();
    }
    return permissionList.rows;
  }

  static async findOnedupicateact(
    userid: string,
    idmenu: string,
    idmenuchild: string,
  ): Promise<Permission | null> {
    var permissionList: any = new Object();
    await client.connect();
    try {
      permissionList = await client.queryObject({
        text: `SELECT * FROM public.permissionmenu
          where userid = $1 and idmenu = $2 and idmenuchild = $3 ;`,
        args: [userid, idmenu, idmenuchild],
      });
      console;
      if (permissionList.rows.toString() === "") {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      await client.end();
    }
    return permissionList.rows;
  }

  async create() {
    await client.connect();
    try {
      const result: QueryResult = await client.queryObject({
        text:
          `INSERT INTO permissionmenu (idmenu,idmenuchild, view_read,view_create,view_edit,view_delete,permission,userid)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`,
        args: [
          this.idmenu,
          this.idmenuchild,
          this.view_read,
          this.view_delete,
          this.view_edit,
          this.view_delete,
          JSON.stringify(this.permission),
          this.userid,
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
    id: number,
    view_read: boolean,
    view_create: boolean,
    view_edit: boolean,
    view_delete: boolean,
    permission: JSON,
    userid: string,
  ) {
    await client.connect();
    try {
      const result: QueryResult = await client.queryObject({
        text:
          `UPDATE permissionmenu SET view_read=$2, view_create=$3, view_edit=$4, view_delete=$5, permission=$6
          WHERE id=$1 and userid=$7 ;`,
        args: [
          id,
          view_read,
          view_create,
          view_edit,
          view_delete,
          JSON.stringify(permission),
          userid,
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
