import {
  bcrypt,
  Client,
  createHash,
  Jose,
  makeJwt,
  Payload,
  RouterContext,
  setExpiration,
  v4,
} from "../deps.ts";

import key from "../config/key.ts";
import keyrefresh from "../config/keyrefresh.ts";
import User from "../models/User.ts";

const header: Jose = {
  alg: "HS256",
  typ: "JWT",
};

const tokenList = new Array();

export class AuthController {
  async login(ctx: RouterContext) {
    try {
      const body = await ctx.request.body();

      const value = await body.value;

      const username = value.username;
      const password = value.password;
      const hash = createHash("sha3-512");
      hash.update(password);
      const hashInHex = hash.toString();
      let passwordhashed = hashInHex;
      if (!username || !password) {
        ctx.response.status = 422;
        ctx.response.body = { message: "Please provide email and password" };
        return;
      }

      var user: any = await User.findByUsername(username);
      if (!user) {
        ctx.response.status = 422;
        ctx.response.body = { message: "Incorrect username" };
        return;
      }
      const passwordMatched = await bcrypt.compareSync(
        passwordhashed,
        user[0].password,
      );
      if (!passwordMatched) {
        ctx.response.status = 422;
        ctx.response.body = { message: "Incorrect password" };
        return;
      }
      const payload: Payload = {
        iss: user[0].username,
        exp: setExpiration(7200),
      };
      const header: Jose = {
        alg: "HS256",
        typ: "JWT",
      };
      const token = await makeJwt({ header, payload, key });
      const jwtInputrefresh = {
        header: { typ: "JWT", alg: "HS256" as const },
        payload: {
          iss: user[0].username,
          exp: setExpiration(10800),
        },
        key: keyrefresh,
      };
      //------ refresh token----------//
      const refreshToken = await makeJwt(jwtInputrefresh);
      let _user = await User.findByUserId(user[0].user_id);
      _user = new User({
        user_id: user[0].user_id,
        name: "",
        username: "",
        employee_id: "",
        password: "",
        createby: "",
        updateby: "",
        is_active: true,
        division: "",
        roles: "",
        permission: [],
        refresh_token: refreshToken,
      });
      await _user.updaterefresh_token();

      // // update lastlogon
      // user = new User({
      //   user_id: user.user_id,
      //   employee_id: user.employee_id,
      //   username: user.username,
      //   password: user.password,
      //   is_active: user.is_active,
      // });
      // await user.lastLogin();
      // // console log user login

      /// create current yearid
      var now = new Date();
      var currentyear = now.getFullYear();
      currentyear = currentyear + 543;
      console.log("currentyear", currentyear);

      Object.assign(user, { currenty: currentyear });
      console.log("user", user);
      ctx.response.status = 200;
      ctx.response.body = {
        success: true,
        data: user,
        token: token,
        refreshToken: refreshToken,
        expiresIn: payload.exp,
        auth: true,
      };
    } catch (error) {
      console.log(error);
    }
  }
  async getalluser(ctx: RouterContext) {
    const listuser = await User.findAll();
    if (listuser) {
      ctx.response.status = 200;
      ctx.response.body = listuser;
    }
  }
  async getUserRole(ctx: RouterContext) {
    const id: string = ctx.params.userid!;
    const roles = await User.findByUserrole(id);
    if (roles) {
      ctx.response.status = 200;
      ctx.response.body = roles;
    }
  }
  async getJsonb(ctx: RouterContext) {
    const roles = await User.findtest("test");

    if (roles) {
      // const result = JSON.parse(roles.json_b);
      // console.log(roles.json_b);
      // // roles.json_b.id
      // roles.json_b.foreach((item: any) => {
      //   console.log(item.id);
      // });
      // for (let item in roles.json_b) {
      //   console.log(item);
      // }
      ctx.response.status = 200;
      ctx.response.body = roles;
    }
  }
  async refreshtoken(ctx: RouterContext) {
    try {
      const body = await ctx.request.body();
      const value = await body.value;
      const userId = value.userId;
      const refreshToken = value.refreshToken;

      let _user: any = await User.findByUserId(userId);

      const isToken = _user[0].refresh_token;

      if ((refreshToken) && (isToken !== undefined)) {
        var user = await User.findByUserId(userId);
        if (!user) {
          ctx.response.status = 400;
          ctx.response.body = {
            success: false,
            message:
              "refreshtoken unsuccessfully, because you are not register !",
          };
          return;
        } else {
          let payload: Payload = {
            iss: user.username,
            exp: setExpiration(7200),
          };
          let header: Jose = {
            alg: "HS256",
            typ: "JWT",
          };
          let token = await makeJwt({ header, payload, key });

          //**********************************
          const jwtInputrefresh = {
            header: { typ: "JWT", alg: "HS256" as const },
            payload: {
              iss: user.username,
              exp: setExpiration(10800),
            },
            key: keyrefresh,
          };
          //------ refresh token----------//
          let refreshToken = await makeJwt(jwtInputrefresh);

          user = new User({
            user_id: userId,
            name: "",
            username: "",
            employee_id: "",
            password: "",
            createby: "",
            updateby: "",
            is_active: true,
            division: "",
            roles: "",
            permission: [],
            refresh_token: refreshToken,
          });
          await user.updaterefresh_token();

          ctx.response.status = 200;
          ctx.response.body = {
            success: true,
            token: token,
            refreshToken: refreshToken,
            expiresIn: payload.exp,
          };
        }
      } else {
        ctx.response.status = 401,
          ctx.response.body = {
            success: false,
            error: "Unauthorized",
          };
      }
    } catch (error) {
      console.log(error);
    }
  }
  async register(ctx: RouterContext) {
    const obj = await ctx.request.body();

    const value = await obj.value;
    const username = value.username;
    const name = value.name;
    const employee_id = value.employee_id;
    const password = value.password;
    const createby = value.createby;
    const updateby = value.update;
    const is_active = value.is_active;
    const division = value.division;
    let user = await User.findByUsername(username);

    if (user) {
      console.log("inn");
      ctx.response.status = 422;
      ctx.response.body = { message: "Username is already used" };
    } else {
      const id = v4.generate();
      let salt = await bcrypt.genSaltSync(8);
      const hash = createHash("sha3-512");
      hash.update(password);
      const hashInHex = hash.toString();
      let passwordhash = hashInHex;
      const hashedPassword = await bcrypt.hashSync(passwordhash, salt);
      user = new User({
        user_id: id,
        name,
        username,
        employee_id,
        password: hashedPassword,
        createby,
        updateby,
        is_active,
        division,
      });
      await user.save();
      ctx.response.status = 200;
      ctx.response.body = {
        id: user.user_id,
        name: user.name,
        username: user.username,
        employee_id: user.employee_id,
        password: user.password,
        create: user.createby,
        updateby: user.updateby,
        is_active: user.is_active,
        division,
      };
    }
  }

  async updatepassword(ctx: RouterContext) {
    try {
      const id: string = ctx.params.id!;
      const body = await ctx.request.body();
      const value = await body.value;
      const password = value.password;
      const updateby = value.update_by;

      //*------------------ SET HAS PASSWORD //*------------------------
      let salt = await bcrypt.genSaltSync(8);
      const hash = createHash("sha3-512");
      hash.update(password);
      const hashInHex = hash.toString();
      let passwordhash = hashInHex;
      const hashedPassword = await bcrypt.hashSync(passwordhash, salt);
      //*-------------------------------------------------------------------
      let user = await User.findByUserId(id);
      user = new User({
        user_id: id,
        name: "",
        username: "",
        employee_id: "",
        password: hashedPassword,
        createby: "",
        updateby: updateby,
        is_active: true,
        division: "",
        roles: "",
        permission: [],
      });
      console.log("user", user);
      await user.updatepassword();
      ctx.response.status = 201;
      ctx.response.body = user;
    } catch (error) {
      console.log(error);
    }
  }
  async update(ctx: RouterContext) {
    try {
      const id: string = ctx.params.id!;
      const body = await ctx.request.body();
      const value = await body.value;
      const permission = value.permission;
      const update_date = new Date();
      const update_by = value.updateby;
      let user = await User.findByUserId(id);
      user = new User({
        user_id: id,
        name: "",
        username: "",
        employee_id: "",
        password: "",
        createby: "",
        updateby: update_by,
        is_active: true,
        division: "",
        roles: "",
        permission: permission,
      });
      await user.update();
      ctx.response.status = 200;
      ctx.response.body = user;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new AuthController();
