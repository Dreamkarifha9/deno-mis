import {
  create,
  getAll,
  getmenuAll,
  getmenuchildAll,
  getpermissionAll,
  update,
} from "../controllers/PermissionController.ts";
import { Router, RouterContext, upload } from "../deps.ts";
import { authMiddleware } from "../middleware/authMiddleware.ts";
const router = new Router();

router.put(
  "/api/updatepermission",
  authMiddleware,
  update,
);
router.post(
  "/api/createpermission",
  authMiddleware,
  create,
);
router.get(
  "/api/getpermissiontable/:id",
  authMiddleware,
  getpermissionAll,
);
router.get(
  "/api/getpermissionall",
  authMiddleware,
  getAll,
);
router.get(
  "/api/getmenuall",
  authMiddleware,
  getmenuAll,
);
router.get(
  "/api/getmenuchildall",
  authMiddleware,
  getmenuchildAll,
);
export default router;
