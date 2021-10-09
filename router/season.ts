import { seasongetall } from "../controllers/SeasonController.ts";
import { Router, RouterContext, upload } from "../deps.ts";
import { authMiddleware } from "../middleware/authMiddleware.ts";
const router = new Router();
router
  .get(
    "/api/season",
    authMiddleware,
    seasongetall,
  );
export default router;
