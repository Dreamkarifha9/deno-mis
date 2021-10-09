import { duratypeall, duratypeone } from "../controllers/DuratypeController.ts";
import { Router, RouterContext, upload } from "../deps.ts";
import { authMiddleware } from "../middleware/authMiddleware.ts";
const router = new Router();
router.get(
  "/api/duratype",
  authMiddleware,
  duratypeall,
);
router.get(
  "/api/duratypes/:id",
  authMiddleware,
  duratypeone,
);
export default router;
