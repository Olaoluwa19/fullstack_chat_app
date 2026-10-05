import { Router } from "express";
import { authCallback, getMe } from "../controllers/authController.js";
import { protectRoute } from "../middleware/auth.js";

const router = Router();

// /api/auth/me
router.route("/me").get(protectRoute, getMe);

router.route("/callback").post(authCallback);

export default router;
