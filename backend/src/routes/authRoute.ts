import { Router } from "express";
import { getMe } from "../controllers/authController";
import { protectRoute } from "../middleware/auth";

const router = Router();

// /api/auth/me
router.get("/me", protectRoute, getMe);

export default router;
