import { Router } from "express";
import { protectRoute } from "../middleware/auth.js";
import { getChats, getOrCreateChat } from "../controllers/chatController.js";

const router = Router();
router.use(protectRoute);

router.route("/").get(getChats);
router.route("/with/:participantId").get(getOrCreateChat);

export default router;
