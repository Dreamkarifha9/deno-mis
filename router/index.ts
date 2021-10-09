import { Router } from "https://deno.land/x/oak/mod.ts";
import register from "./register.ts";
import season from "./season.ts";
import sizemachine from "./sizemachine.ts";
import user from "./user.ts";
import powermachine from "./powermachine.ts";
import planningimg from "./planningimg.ts";
import permission from "./permission.ts";
import machineimage from "./machineimage.ts";
import machinegroup from "./machinegroup.ts";
import machinedetails from "./machinedetails.ts";
import machine from "./machine.ts";
import machineact from "./machineact.ts";
import kpimain from "./kpimain.ts";
import division from "./division.ts";
import duratype from "./duratype.ts";
import dailryreport from "./dailyreport.ts";

export default {
  dailryreport,
  duratype,
  division,
  kpimain,
  machineact,
  machine,
  machinedetails,
  machinegroup,
  machineimage,
  permission,
  register,
  season,
  sizemachine,
  user,
  powermachine,
  planningimg,
};
