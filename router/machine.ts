import {
  createexcel,
  createPost,
  deletePost,
  getAll,
  getDivisionall,
  getFristpage,
  getmachindivisionid,
  getMachinebyid,
  updatePost,
} from "../controllers/MachineController.ts";
import { Router, RouterContext, upload } from "../deps.ts";
import { authMiddleware } from "../middleware/authMiddleware.ts";
const router = new Router();
router.get(
  "/api/machine",
  authMiddleware,
  getAll,
);
router.get(
  "/api/machineFristpage",
  authMiddleware,
  getFristpage,
);
router.post(
  "/api/createmachine",
  authMiddleware,
  createPost,
);
router.post(
  "/api/createmachineexcel",
  authMiddleware,
  createexcel,
);
router.put(
  "/api/updatemachine/:idmachine",
  authMiddleware,
  updatePost,
);
router.delete(
  "/api/machine/:idmachine",
  authMiddleware,
  deletePost,
);
router.get(
  "/api/machinefinbyid/:id",
  authMiddleware,
  getMachinebyid,
);
router.get(
  "/api/machinedivisionidall/:id",
  authMiddleware,
  getmachindivisionid,
);
export default router;
