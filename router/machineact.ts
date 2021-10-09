import {
  create,
  deletePost,
  getActseason1,
  getActseason2,
  getActseasonbymonth1,
  getActseasonbymonth2,
  getAll,
  getOne,
} from "../controllers/MachineactController.ts";
import { Router, RouterContext, upload } from "../deps.ts";
import { authMiddleware } from "../middleware/authMiddleware.ts";
const router = new Router();
router.get(
  "/api/machineactseason1/:id/:year",
  authMiddleware,
  getActseason1,
);
router.get(
  "/api/machineactseason2/:id/:year",
  authMiddleware,
  getActseason2,
);
router.get(
  "/api/machineactseasonbymonth1/:id/:year/:month",
  authMiddleware,
  getActseasonbymonth1,
);
router.get(
  "/api/machineactseasonmonth2/:id/:year/:month",
  authMiddleware,
  getActseasonbymonth2,
);
router.post(
  "/api/createmachineact",
  authMiddleware,
  create,
);
router.get(
  "/api/capacityall",
  authMiddleware,
  getAll,
);
export default router;
