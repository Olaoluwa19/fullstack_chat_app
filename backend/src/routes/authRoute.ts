import { Router } from "express";
import { authCallback, getMe } from "../controllers/authController";
import { protectRoute } from "../middleware/auth";

const router = Router();

// /api/auth/me
router.route("/me").get(protectRoute, getMe);

router.route("/callback").post(authCallback);

export default router;
