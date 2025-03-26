// routes/index.js
import { Router } from "express";
import { renderHome, joinChatRoom } from "../controllers/chatController.js";

const router = Router();

router.get("/", renderHome);
router.get("/chat/:topic", joinChatRoom);

export default router;
