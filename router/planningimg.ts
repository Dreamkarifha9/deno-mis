import {
  create,
  delectimage,
  getimage,
  sendfileimage,
} from "../controllers/PlanningimgController.ts";
import { Router, RouterContext, upload } from "../deps.ts";
import { authMiddleware } from "../middleware/authMiddleware.ts";
const router = new Router();

router.post(
  "/api/createplanimg",
  authMiddleware,
  create,
);
router.get(
  "/api/getimagesplan/:id",
  authMiddleware,
  getimage,
);
router.get(
  "/api/imagesplan/:id",
  sendfileimage,
);
router.delete(
  "/api/delectimagesplan/:id",
  authMiddleware,
  delectimage,
);
export default router;
