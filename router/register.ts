import {
  createPost,
  deletePost,
  getAll,
  getFristpage,
  getMachinegroupid,
  getOne,
  updatePost,
} from "../controllers/RegisterController_test.ts";
import { Router, RouterContext, upload } from "../deps.ts";
import { authMiddleware } from "../middleware/authMiddleware.ts";
const router = new Router();
router
  .get(
    "/api/getregisteractmachinegroupid/:id/:seasonid",
    authMiddleware,
    getMachinegroupid,
  );
router
  .get(
    "/api/getregisteract",
    authMiddleware,
    getAll,
  );
router
  .get(
    "/api/getregisteractfristpage",
    authMiddleware,
    getFristpage,
  );
router
  .post(
    "/api/createregisteract",
    authMiddleware,
    createPost,
  );
router
  .put(
    "/api/updatregisteract/:id",
    authMiddleware,
    updatePost,
  );
router
  .delete(
    "/api/deleteregisteract/:id",
    authMiddleware,
    deletePost,
  );
export default router;
