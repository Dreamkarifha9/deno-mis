import {
  createPost,
  deletePost,
  getAll,
  getOne,
  updatePost,
} from "../controllers/MachinegroupController.ts";
import { Router, RouterContext, upload } from "../deps.ts";
import { authMiddleware } from "../middleware/authMiddleware.ts";
const router = new Router();
router.get(
  "/api/machinegroup",
  authMiddleware,
  getAll,
);
export default router;
