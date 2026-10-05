import { Router } from "express";
import { protectRoute } from "../middleware/auth.js";
import { getMessages } from "../controllers/messageController.js";

const router = Router();

router.route("/chat/:chatId").get(protectRoute, getMessages);

export default router;
