import { Pool } from "../deps.ts";

const dbconfig = {
  user: "postgres",
  password: "200711",
  database: "MIS",
  hostname: "192.168.2.88",
  port: 5432,
  tsl: {
    enforce: false,
  },
};

// const POOL_CONNECTIONS = 60;
// const dbPool = new Pool({
//   user: "postgres",
//   password: "200711",
//   database: "MIS",
//   hostname: "localhost",
//   port: 5432,
// }, POOL_CONNECTIONS);
// const dbconfig = {
//   user: "postgres",
//   password: "200711",
//   database: "MIS",
//   hostname: "localhost",
//   port: 5432,
// };
export { dbconfig };
