import {
  createkpimainimages,
  createPost,
  delectimage,
  getAll,
  getAlldivision,
  getdivision_status,
  getdivision_statusall,
  getFristpage,
  getimage,
  sendfileimage,
  updatekpimain,
} from "../controllers/KpimainController.ts";
import { Router, RouterContext, upload } from "../deps.ts";
import { authMiddleware } from "../middleware/authMiddleware.ts";
const router = new Router();
router.get(
  "/api/kpimainfristpage",
  authMiddleware,
  getFristpage,
);
router.get(
  "/api/kpimainall",
  authMiddleware,
  getAll,
);
router.get(
  "/api/kpimainalldivision/:id",
  authMiddleware,
  getAlldivision,
);
router.get(
  "/api/kpimainalldivisionstatus/:id",
  authMiddleware,
  getdivision_status,
);
router.get(
  "/api/kpimainalldivisionstatusall/:id",
  authMiddleware,
  getdivision_statusall,
);
router.post(
  "/api/createkpimain",
  authMiddleware,
  createPost,
);
router.get(
  "/api/kpimaingetimages/:id",
  authMiddleware,
  getimage,
);
router.get(
  "/api/imageskpimain/:id",
  sendfileimage,
);
router.post(
  "/api/createkpimainimg",
  authMiddleware,
  createkpimainimages,
);
router.delete(
  "/api/kpimainimagesdelete/:id",
  authMiddleware,
  delectimage,
);
export default router;
