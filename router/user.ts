import {
  getalluser,
  getUserRole,
  login,
  refreshtoken,
  register,
  update,
  updatepassword,
} from "../controllers/AuthController.ts";
import { Router, RouterContext, upload } from "../deps.ts";
import { authMiddleware } from "../middleware/authMiddleware.ts";
const router = new Router();
router.get("/api/getuserroles/:userid", getUserRole);
router.post("/api/login", login);
router.post("/api/register", register);
router.post("/api/updatepassword/:id", updatepassword);
router.put("/api/updateuser/:id", authMiddleware, update);
router.post("/api/refreshtoken", refreshtoken);
router.get(
  "/api/userall",
  authMiddleware,
  getalluser,
);
export default router;
