import { Router } from "express";
import { protectRoute } from "../middleware/auth";
import { getMessages } from "../controllers/messageController";

const router = Router();

router.route("/chat/:chatId").get(protectRoute, getMessages);

export default router;
