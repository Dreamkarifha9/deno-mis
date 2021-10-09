import { sizemachinegetall } from "../controllers/SizemachineController.ts";
import { Router, RouterContext, upload } from "../deps.ts";
import { authMiddleware } from "../middleware/authMiddleware.ts";
const router = new Router();
router
  .get(
    "/api/sizeall",
    authMiddleware,
    sizemachinegetall,
  );
export default router;
