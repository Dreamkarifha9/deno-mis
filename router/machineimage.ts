import {
  createPost,
  delectimage,
  getimage,
  sendfileimage,
  uploadimages,
} from "../controllers/ImageController.ts";
import { Router, RouterContext, upload } from "../deps.ts";
import { authMiddleware } from "../middleware/authMiddleware.ts";
const router = new Router();
router.post(
  "/api/createimages",
  authMiddleware,
  createPost,
);
router.post(
  "/api/uploadimage/:id",
  authMiddleware,
  uploadimages,
);
router.get(
  "/api/getimages/:id",
  authMiddleware,
  getimage,
);
router.get(
  "/api/images/:id",
  sendfileimage,
);
router.delete(
  "/api/delectimages/:id",
  authMiddleware,
  delectimage,
);
export default router;
