import { Router } from "express";
import { login, register, getMe } from "./../controllers/auth";
import { authorize, protect } from "./../middlewares/auth";
const router = Router();
router.route("/register").post(register);
router.route("/login").post(login);
router
  .route("/me")
  .get(protect, authorize("publisher", "admin", "user"), getMe);

export { router as authRouter };
