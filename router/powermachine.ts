import { powermachinegetall } from "../controllers/PowemachineController.ts";
import { Router, RouterContext, upload } from "../deps.ts";
import { authMiddleware } from "../middleware/authMiddleware.ts";
const router = new Router();
router
  .get(
    "/api/powerall",
    authMiddleware,
    powermachinegetall,
  );
export default router;
