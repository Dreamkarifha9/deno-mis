// import { Context, ServerSentEventTarget, v4 } from "../../deps.ts";
// let clients = new Map<object, Context>();
// export let target: ServerSentEventTarget;
// let processArray: any[] = [];
// let userArray: any[] = [];

// export const headers = new Headers([["access-control-allow-origin", "*"]]);
// export const Eventconnection = async (
//   ctx: Context,
//   userid: string,
//   typeprocess: string,
// ) => {
//   const Usercon = {
//     userid: userid,
//     typeprocess: typeprocess,
//   };
//   target = ctx.sendEvents({ headers });
//   target.dispatchMessage(
//     { msg: "connected", value: userid },
//   );

//   const check = userArray.includes(userid);

//   if (!check) {
//     for (let [key, value] of Object.entries(Usercon)) {
//       if (key === "userid") {
//         userArray.push(value);
//       }
//     }
//     clients.set(Usercon, ctx);
//   }
//   console.log("clients", clients);
// };
// /**
//  * Takes two numbers and returns their sum
//  * @param processid processid
//  * @returns Promise boolean
//  */
// const checkconnection = async (userid: string): Promise<Boolean> => {
//   let statuscheck: boolean = false;
//   clients.forEach(async (ctx: Context, usercon: object) => {
//     for (let [key, value] of Object.entries(usercon)) {
//       if (key === "userid") {
//         if (value === userid) {
//           target = new ServerSentEventTarget(
//             ctx.app,
//             ctx.request.serverRequest,
//           );
//           statuscheck = true;
//         } else {
//           statuscheck = false;
//         }
//       }
//       return statuscheck;
//     }
//     // if (userid == usercon.userid) {
//     // }
//   });
//   // const check = processArray.includes(processid);
//   // if (!check) {
//   //   clients.forEach(async (ctx: Context, processId: string) => {
//   //     target = new ServerSentEventTarget(
//   //       ctx.app,
//   //       ctx.request.serverRequest,
//   //     );
//   //   });
//   //   processArray.push(processid);
//   //   statuscheck = true;
//   // } else {
//   //   statuscheck = false;
//   // }
//   return statuscheck;
// };
// const broadcastEvent = async (obj: object, userid: string) => {
//   let index = 0;
//   await checkconnection(userid);
//   target.dispatchMessage(JSON.stringify(obj));
// };

// /**
//  * Takes two numbers and returns their sum
//  * @param obj obj = {msg:"",value:""}
//   * @param process process id
//  * @returns Promise void
//  */
// export const broadcastEventSingle = async (obj: object, process: string) => {
//   await broadcastEvent(obj, process);
// };
// /**
//  * Takes two numbers and returns their sum
//   * @param process process id
//  * @returns Promise void
//  */
// export const closeconnectionEvent = async () => {
//   await target.close();
// };
