import {
  RouterContext,
  makeJwt,
  Jose,
  Payload,
  setExpiration,
  bcrypt,
  createHash,
  Client,
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
      console.log(username);
      if (!username || !password) {
        ctx.response.status = 422;
        ctx.response.body = { message: "Please provide email and password" };
        return;
      }

      let user = await User.findByUsername(username);
      if (!user) {
        ctx.response.status = 422;
        ctx.response.body = { message: "Incorrect username" };
        return;
      }
      const passwordMatched = await bcrypt.compareSync(
        passwordhashed,
        user.password,
      );
      if (!passwordMatched) {
        ctx.response.status = 422;
        ctx.response.body = { message: "Incorrect password" };
        return;
      }
      const payload: Payload = {
        iss: user.username,
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
          iss: user.username,
          exp: setExpiration(10800),
        },
        key: keyrefresh,
      };
      //------ refresh token----------//
      const refreshToken = await makeJwt(jwtInputrefresh);
      const response_data = {
        "userId": user.user_id,
        "refreshToken": refreshToken,
      };
      let arraytoken = tokenList.find((item) => {
        return item.userId === user?.user_id;
      });
      if (arraytoken === undefined) {
        tokenList.push(response_data);
      } else {
        arraytoken.refreshToken = refreshToken;
      }
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
      console.log("User Login :", user.username, " at :", new Date());
      console.log("User :", token);
      console.log(tokenList);
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
      console.log(error.toString());
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
  async refreshtoken(ctx: RouterContext) {
    try {
      const body = await ctx.request.body();
      const value = await body.value;
      const userId = value.userId;
      const refreshToken = value.refreshToken;
      const isToken = tokenList.find((e) => e.refreshToken === refreshToken);
      console.log(isToken, refreshToken);
      if ((refreshToken) && (isToken !== undefined)) {
        let user = await User.findByUserId(userId);
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
          const response_data = {
            "userId": user.user_id,
            "token": token,
            "refreshToken": refreshToken,
            "expiresIn": payload.exp,
          };
          tokenList.map((col, i) => {
            if (col.userId == response_data.userId) {
              tokenList[i].refreshToken = refreshToken;
            }
          });

          // console log user login
          console.log(
            "User refreashtoken :",
            user.username,
            " at :",
            new Date(),
          );

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
      console.log(error.toString());
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
    let user = await User.findByUsername(employee_id);

    if (user) {
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
      });
      await user.save();
      ctx.response.status = 201;
      ctx.response.body = {
        id: user.user_id,
        employee_id: user.employee_id,
        username: user.username,
      };
    }
  }
}

export default new AuthController();
