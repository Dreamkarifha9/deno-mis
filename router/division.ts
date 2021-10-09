import { getAll,createdivision,updatedivision } from "../controllers/DivisionController.ts";
import { Router, RouterContext, upload } from "../deps.ts";
import { authMiddleware } from "../middleware/authMiddleware.ts";
const router = new Router();
router.get(
  "/api/division",
  authMiddleware,
  getAll,
);
router.post(
  "/api/createdivision",
  authMiddleware,
  createdivision,
);
router.put(
  "/api/updatedivision/:id",
  authMiddleware,
  updatedivision,
);
export default router;
