import { Router, RouterContext } from "./deps.ts";

import { authMiddleware } from "./middleware/authMiddleware.ts";
import { uploadMiddleware } from "./middleware/uploadfile.ts";
import {
  GuardCreate,
  GuardDelete,
  GuardRead,
  GuardUpdater,
} from "././middleware/user-guard.middleware.ts";

import authController, {
  AuthController,
} from "./controllers/AuthController.ts";
import machineController from "./controllers/MachineController.ts";
import machinedetailsController from "./controllers/MachinedetailsController.ts";
import SizemachineController from "./controllers/SizemachineController.ts";
import CapacityController from "./controllers/CapacitymachineController.ts";
import PowerController from "./controllers/PowemachineController.ts";
import DivisionController from "./controllers/DivisionController.ts";
import ImageController from "./controllers/ImageController.ts";
import SeasonController from "./controllers/SeasonController.ts";
import PlanningimgController from "./controllers/PlanningimgController.ts";
// import RoleController from "./controllers/RoleController.ts";
import KpimainController from "./controllers/KpimainController.ts";
import KpiminorController from "./controllers/KpiminorController.ts";
import HistoryController from "./controllers/HistoryController.ts";
import RegisteractController from "./controllers/RegisteractController.ts";
import MachinegroupController from "./controllers/MachinegroupController.ts";
import DuratypeController from "./controllers/DuratypeController.ts";
import MachineactController from "./controllers/MachineactController.ts";
import Dailyreport from "./controllers/DailyReportController.ts";
import PermissionController from "./controllers/PermissionController.ts";
import MachineactresultController from "./controllers/MachineactresultController.ts";
import RepairhistorymachineController from "./controllers/RepairhistorymachineController.ts";
import NcrController from "./controllers/NcrController.ts";

import { UserRead, UserRole, UserRole1, UserRoles } from "././types.ts";

const router = new Router();
var count = 0;
router.get("/", (ctx: RouterContext) => {
  count:
  count++;
  ctx.response.body = `${`Hello World`} ${count}`;
})
  .get("/api/getjsonb", authController.getJsonb)
  // .get("/api/messages/:userid", RoleController.testeventsource)
  // .get("/api/testsend", RoleController.testsnd)
  // .get("/api/closeconnect", RoleController.closeconnect)
  // .get("/api/getrole", RoleController.testeventsource)
  .get("/api/getuserroles/:userid", authController.getUserRole)
  .post("/api/login", authController.login)
  .post("/api/register", authController.register)
  .post("/api/updateuser/:id", authMiddleware, authController.update)
  .post("/api/refreshtoken", authController.refreshtoken)
  .get("/api/getregisteracts/:id", authMiddleware, RegisteractController.getOne)
  .delete(
    "/api/deletedoucmentimgrepairhistory/:id",
    authMiddleware,
    RepairhistorymachineController.delectdoucmentimage,
  )
  .delete(
    "/api/deletemoreimgrepairhistory/:id",
    authMiddleware,
    RepairhistorymachineController.delectmoreimage,
  )
  .post(
    "/api/createrepairhistorymachine",
    authMiddleware,
    RepairhistorymachineController.createPost,
  )
  .post(
    "/api/updaterepairhistorymachine",
    authMiddleware,
    RepairhistorymachineController.updatePost,
  )
  .get(
    "/api/sendimagerepairhistory/:id",
    RepairhistorymachineController.sendfileimage,
  )
  .get(
    "/api/repairhistorymachineall/:idmachine",
    authMiddleware,
    RepairhistorymachineController.getAll,
  )
  .get(
    "/api/machineactresultall",
    authMiddleware,
    MachineactresultController.getAll,
  )
  .get(
    "/api/machineactresultOne/:id",
    authMiddleware,
    MachineactresultController.getOne,
  )
  .get(
    "/api/machineactresultMactidAndDodate/:mactid/:dodate",
    authMiddleware,
    MachineactresultController.getMactidAndDodate,
  )
  .get(
    "/api/userall",
    authMiddleware,
    authController.getalluser,
  )
  .post(
    "/api/updatepassword/:id",
    authMiddleware,
    authController.updatepassword,
  )
  .post(
    "/api/updatepermission",
    authMiddleware,
    PermissionController.update,
  )
  .post(
    "/api/createpermission",
    authMiddleware,
    PermissionController.create,
  )
  .get(
    "/api/getpermissiontable/:id",
    authMiddleware,
    PermissionController.getpermissionAll,
  )
  .get(
    "/api/getpermissionall",
    authMiddleware,
    PermissionController.getAll,
  )
  .get(
    "/api/getmenuall",
    authMiddleware,
    PermissionController.getmenuAll,
  )
  .get(
    "/api/getmenuchildall",
    authMiddleware,
    PermissionController.getmenuchildAll,
  )
  .get(
    "/api/getregisteractmachinegroupid/:id/:seasonid",
    authMiddleware,
    RegisteractController.getMachinegroupid,
  )
  .get("/api/getregisteract", authMiddleware, RegisteractController.getAll)
  .get(
    "/api/getregisteractoffset/:offset/:limit",
    authMiddleware,
    RegisteractController.getOffset,
  )
  .get(
    "/api/getregisteractfristpage",
    authMiddleware,
    RegisteractController.getFristpage,
  )
  .get(
    "/api/duratype",
    authMiddleware,
    DuratypeController.getAll.bind(DuratypeController),
  )
  .get(
    "/api/duratypes/:id",
    authMiddleware,
    DuratypeController.getOne.bind(DuratypeController),
  )
  .get(
    "/api/machinegroup",
    authMiddleware,
    MachinegroupController.getAll.bind(MachinegroupController),
  )
  .get(
    "/api/machineactseason1/:id/:year",
    authMiddleware,
    MachineactController.getActseason1.bind(MachineactController),
  )
  .get(
    "/api/machineactseason2/:id/:year",
    authMiddleware,
    MachineactController.getActseason2.bind(MachineactController),
  )
  .get(
    "/api/machineactseasonbymonth1/:id/:year/:month",
    authMiddleware,
    MachineactController.getActseasonbymonth1.bind(MachineactController),
  )
  .get(
    "/api/machineactseasonmonth2/:id/:year/:month",
    authMiddleware,
    MachineactController.getActseasonbymonth2.bind(MachineactController),
  )
  .get(
    "/api/machineactbydivision/:seasonid/:divisionid/:year/:month",
    authMiddleware,
    MachineactController.getdivision_allmachineact.bind(MachineactController),
  )
  .post(
    "/api/createmachineact",
    authMiddleware,
    MachineactController.create.bind(MachineactController),
  )
  .post(
    "/api/createregisteract",
    authMiddleware,
    RegisteractController.create.bind(RegisteractController),
  )
  .post(
    "/api/createregisteracttest",
    authMiddleware,
    RegisteractController.testcreate.bind(RegisteractController),
  )
  .put(
    "/api/updatregisteract/:id",
    authMiddleware,
    RegisteractController.update.bind(RegisteractController),
  )
  .delete(
    "/api/deleteregisteract/:id",
    authMiddleware,
    RegisteractController.delete.bind(RegisteractController),
  )
  .get(
    "/api/machineFristpage",
    authMiddleware,
    machineController.getFristpage.bind(machineController),
  )
  .get(
    "/api/machine",
    authMiddleware,
    machineController.getAll.bind(machineController),
  )
  .get(
    "/api/sizeall",
    authMiddleware,
    SizemachineController.getAll.bind(SizemachineController),
  )
  .get(
    "/api/capacityall",
    authMiddleware,
    CapacityController.getAll.bind(CapacityController),
  )
  .get(
    "/api/powerall",
    authMiddleware,
    PowerController.getAll.bind(PowerController),
  )
  .post(
    "/api/createmachine",
    authMiddleware,
    GuardCreate(),
    machineController.create.bind(machineController),
  )
  .post(
    "/api/createmachineexcel",
    authMiddleware,
    machineController.createexcel.bind(machineController),
  )
  .put(
    "/api/updatemachine/:idmachine",
    authMiddleware,
    machineController.update.bind(machineController),
  )
  .delete(
    "/api/machine/:idmachine",
    authMiddleware,
    machineController.delete.bind(machineController),
  )
  .get(
    "/api/machinedetailsall/:id",
    authMiddleware,
    machinedetailsController.getAll.bind(machinedetailsController),
  )
  .post(
    "/api/machinedetailsallbyid",
    authMiddleware, //*ใช้สำรหับ หน้า Registeract เพื่อค้นหาชิ้นส่วนอะไหล่
    machinedetailsController.getAllmachinebyid.bind(machinedetailsController),
  )
  .post(
    "/api/createmachinedetails",
    authMiddleware,
    machinedetailsController.create.bind(machinedetailsController),
  )
  .post(
    "/api/createmachinedetailsexcel",
    authMiddleware,
    machinedetailsController.createexcel.bind(machinedetailsController),
  )
  .put(
    "/api/updatededailsmachine/:id",
    authMiddleware,
    machinedetailsController.update.bind(machinedetailsController),
  )
  .delete(
    "/api/machinedetails/:id",
    authMiddleware,
    machinedetailsController.delete.bind(machinedetailsController),
  )
  .get(
    "/api/division",
    authMiddleware,
    DivisionController.getAll.bind(DivisionController),
  )
  .post(
    "/api/createdivision",
    authMiddleware,
    DivisionController.createdivision.bind(DivisionController),
  )
  .put(
    "/api/updatedivision/:id",
    authMiddleware,
    DivisionController.updatedivision.bind(DivisionController),
  )
  .get(
    "/api/machinefinbyid/:id",
    authMiddleware,
    machineController.getMachinebyid.bind(machineController),
  )
  .get(
    "/api/machinedivisionidall/:id",
    authMiddleware,
    machineController.getmachindivisionid.bind(machineController),
  )
  .post(
    "/api/createimages",
    authMiddleware,
    ImageController.create.bind(ImageController),
  )
  .post(
    "/api/uploadimage/:id",
    authMiddleware,
    ImageController.uploadimages.bind(ImageController),
  )
  .get(
    "/api/getimages/:id",
    authMiddleware,
    ImageController.getimage.bind(ImageController),
  )
  .get(
    "/api/images/:id",
    ImageController.sendfileimage.bind(ImageController),
  )
  .delete(
    "/api/delectimages/:id",
    authMiddleware,
    ImageController.delectimage.bind(ImageController),
  )
  .post(
    "/api/createplanimg",
    authMiddleware,
    PlanningimgController.create.bind(PlanningimgController),
  )
  .get(
    "/api/getimagesplan/:id",
    authMiddleware,
    PlanningimgController.getimage.bind(PlanningimgController),
  )
  .get(
    "/api/imagesplan/:id",
    PlanningimgController.sendfileimage.bind(PlanningimgController),
  )
  .delete(
    "/api/delectimagesplan/:id",
    authMiddleware,
    PlanningimgController.delectimage.bind(PlanningimgController),
  )
  .get(
    "/api/season",
    SeasonController.getAll.bind(SeasonController),
  )
  // .post(
  //   "/api/rolecreate",
  //   RoleController.Createfile.bind(RoleController),
  // )
  // .post(
  //   "/api/roleupdate",
  //   RoleController.Updatefile.bind(RoleController),
  // )
  // .post(
  //   "/api/roleread",
  //   RoleController.Readfile.bind(RoleController),
  // )
  // .post(
  //   "/api/roledelete",
  //   RoleController.Deletefile.bind(RoleController),
  // )
  .get(
    "/api/kpimainfristpage",
    authMiddleware,
    KpimainController.getFristpage.bind(KpimainController),
  )
  .get(
    "/api/kpimainall",
    authMiddleware,
    KpimainController.getAll.bind(KpimainController),
  )
  .get(
    "/api/kpimainalldivision/:id",
    authMiddleware,
    KpimainController.getAlldivision.bind(KpimainController),
  )
  .get(
    "/api/kpimainalldivisionstatus/:id",
    authMiddleware,
    KpimainController.getdivision_status.bind(KpimainController),
  )
  .get(
    "/api/kpimainalldivisionstatusall/:id",
    authMiddleware,
    KpimainController.getdivision_statusall.bind(KpimainController),
  )
  .post(
    "/api/createkpimain",
    authMiddleware,
    KpimainController.createkpaimain.bind(KpimainController),
  )
  .get(
    "/api/kpimaingetimages/:id",
    authMiddleware,
    KpimainController.getimage.bind(KpimainController),
  )
  .get(
    "/api/imageskpimain/:id",
    KpimainController.sendfileimage.bind(KpimainController),
  )
  .post(
    "/api/createkpimainimg",
    authMiddleware,
    KpimainController.createkpimainimages.bind(KpimainController),
  )
  .delete(
    "/api/kpimainimagesdelete/:id",
    authMiddleware,
    KpimainController.delectimage.bind(KpimainController),
  ).get(
    "/api/kpiminorall",
    authMiddleware,
    KpiminorController.getAll.bind(KpiminorController),
  )
  .post(
    "/api/createkpiminor",
    authMiddleware,
    KpiminorController.createkpaimain.bind(KpiminorController),
  )
  .get(
    "/api/kpiminorgetimages/:id",
    authMiddleware,
    KpiminorController.getimage.bind(KpiminorController),
  )
  .get(
    "/api/imageskpiminor/:id",
    KpiminorController.sendfileimage.bind(KpiminorController),
  )
  .post(
    "/api/createkpiminorimg",
    authMiddleware,
    KpiminorController.createkpimainimages.bind(KpiminorController),
  )
  .delete(
    "/api/kpiminorimagesdelete/:id",
    authMiddleware,
    KpiminorController.delectimage.bind(KpiminorController),
  )
  .get(
    "/api/dailyreportone/:id",
    authMiddleware,
    Dailyreport.getOne.bind(Dailyreport),
  )
  .get(
    "/api/dailyreportfristpage",
    authMiddleware,
    Dailyreport.getFristpage.bind(Dailyreport),
  )
  .get(
    "/api/dailyreportall",
    authMiddleware,
    Dailyreport.getAll.bind(Dailyreport),
  )
  .post(
    "/api/createdailyreport",
    authMiddleware,
    Dailyreport.createdailyreport.bind(Dailyreport),
  )
  .get(
    "/api/dailyreportgetimages/:id",
    authMiddleware,
    Dailyreport.getimage.bind(Dailyreport),
  )
  .get(
    "/api/imagesdailyreport/:id",
    Dailyreport.sendfileimage.bind(Dailyreport),
  )
  .post(
    "/api/createdailyreportimg",
    authMiddleware,
    Dailyreport.createkdailyreportimg.bind(Dailyreport),
  )
  .delete(
    "/api/dailyreportimagesdelete/:id",
    authMiddleware,
    Dailyreport.delectimage.bind(Dailyreport),
  )
  .post(
    "/api/createhistory",
    authMiddleware,
    HistoryController.create.bind(HistoryController),
  ).get(
    "/api/getimageshistory/:id",
    authMiddleware,
    HistoryController.getimage.bind(HistoryController),
  ).get(
    "/api/imageshistory/:id",
    HistoryController.sendfileimage.bind(HistoryController),
  ).delete(
    "/api/delectimageshistory/:id",
    authMiddleware,
    HistoryController.delectimage.bind(HistoryController),
  )
  .get(
    "/api/ncrone/:id",
    authMiddleware,
    NcrController.getOne,
  )
  .get(
    "/api/ncrfristpage/:id",
    authMiddleware,
    NcrController.getFristpage,
  )
  .get(
    "/api/ncrall",
    authMiddleware,
    NcrController.getAll,
  )
  .post(
    "/api/createncr",
    authMiddleware,
    NcrController.createncr,
  )
  .get(
    "/api/ncrgetimages/:id",
    authMiddleware,
    NcrController.getimage,
  )
  .get(
    "/api/imagesncr/:id",
    NcrController.sendfileimage,
  )
  .post(
    "/api/createncrimg",
    authMiddleware,
    NcrController.createkncrimg,
  )
  .delete(
    "/api/ncrimagesdelete/:id",
    authMiddleware,
    NcrController.delectimage,
  );

export default router;
