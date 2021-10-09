import {
  createexcel,
  createPost,
  deletePost,
  getAll,
  getAllmachinebyid,
  updatePost,
} from "../controllers/MachinedetailsController.ts";
import { Router, RouterContext, upload } from "../deps.ts";
import { authMiddleware } from "../middleware/authMiddleware.ts";
const router = new Router();
router.get(
  "/api/machinedetailsall/:id",
  authMiddleware,
  getAll,
);
router.post(
  "/api/machinedetailsallbyid",
  authMiddleware, //*ใช้สำรหับ หน้า Registeract เพื่อค้นหาชิ้นส่วนอะไหล่
  getAllmachinebyid,
);
router.post(
  "/api/createmachinedetails",
  authMiddleware,
  createPost,
);
router.post(
  "/api/createmachinedetailsexcel",
  authMiddleware,
  createexcel,
);
router.put(
  "/api/updatededailsmachine/:id",
  authMiddleware,
  updatePost,
);
router.delete(
  "/api/machinedetails/:id",
  authMiddleware,
  deletePost,
);
export default router;
