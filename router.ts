import { Router, RouterContext, upload } from "./deps.ts";

import { authMiddleware } from "./middleware/authMiddleware.ts";
import { uploadMiddleware } from "./middleware/uploadfile.ts";
import {
  GuardCreate,
  GuardDelete,
  GuardRead,
  GuardUpdater,
} from "././middleware/user-guard.middleware.ts";

import authController from "./controllers/AuthController.ts";
import machineController from "./controllers/MachineController.ts";
import machinedetailsController from "./controllers/MachinedetailsController.ts";
import SizemachineController from "./controllers/SizemachineController.ts";
import CapacityController from "./controllers/CapacitymachineController.ts";
import PowerController from "./controllers/PowemachineController.ts";
import DivisionController from "./controllers/DivisionController.ts";
import ImageController from "./controllers/ImageController.ts";
import SeasonController from "./controllers/SeasonController.ts";
import PlanningimgController from "./controllers/PlanningimgController.ts";
import RoleController from "./controllers/RoleController.ts";
import KpimainController from "./controllers/KpimainController.ts";
import KpiminorController from "./controllers/KpiminorController.ts";
import HistoryController from "./controllers/HistoryController.ts";

import { UserRead, UserRole, UserRole1, UserRoles } from "././types.ts";

const router = new Router();

router.get("/", (ctx: RouterContext) => {
  ctx.response.body = "Hello World 12";
})
  .get("/api/messages/:userid", RoleController.testeventsource)
  .get("/api/testsend", RoleController.testsnd)
  .get("/api/closeconnect", RoleController.closeconnect)
  // .get("/api/getrole", RoleController.testeventsource)
  .get("/api/getuserroles/:userid", authController.getUserRole)
  .post("/api/login", authController.login)
  .post("/api/register", authController.register)
  .post("/api/refreshtoken", authController.refreshtoken)
  .get(
    "/api/machineAll",
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
    "/api/createmachinedetails",
    authMiddleware,
    machinedetailsController.create.bind(machinedetailsController),
  ).put(
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
  .post(
    "/api/rolecreate",
    RoleController.Createfile.bind(RoleController),
  )
  .post(
    "/api/roleupdate",
    RoleController.Updatefile.bind(RoleController),
  )
  .post(
    "/api/roleread",
    RoleController.Readfile.bind(RoleController),
  )
  .post(
    "/api/roledelete",
    RoleController.Deletefile.bind(RoleController),
  )
  .get(
    "/api/kpimainall",
    authMiddleware,
    KpimainController.getAll.bind(KpimainController),
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
  );

export default router;
