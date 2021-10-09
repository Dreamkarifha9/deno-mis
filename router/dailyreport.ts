import {
  createkdailyreportimg,
  createPost,
  delectimage,
  getAll,
  getFristpage,
  getimage,
  getOne,
  sendfileimage,
} from "../controllers/DailyReportController.ts";
import { Router, RouterContext, upload } from "../deps.ts";
import { authMiddleware } from "../middleware/authMiddleware.ts";
const router = new Router();
router.get(
  "/api/dailyreportfristpage",
  authMiddleware,
  getFristpage,
);
router.get(
  "/api/dailyreportall",
  authMiddleware,
  getAll,
);
router.get(
  "/api/dailyreportone/:id",
  authMiddleware,
  getOne,
);
router.post(
  "/api/createdailyreport",
  authMiddleware,
  createPost,
);
router.get(
  "/api/dailyreportgetimages/:id",
  authMiddleware,
  getimage,
);
router.get(
  "/api/imagesdailyreport/:id",
  sendfileimage,
);
router.post(
  "/api/createdailyreportimg",
  authMiddleware,
  createkdailyreportimg,
);
router.delete(
  "/api/dailyreportimagesdelete/:id",
  authMiddleware,
  delectimage,
);
export default router;
