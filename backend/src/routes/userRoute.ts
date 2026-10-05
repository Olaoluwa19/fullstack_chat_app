import { Router } from "express";
import { protectRoute } from "../middleware/auth.js";
import { getUsers } from "../controllers/userController.js";

const router = Router();

router.route("/").get(protectRoute, getUsers);

export default router;
