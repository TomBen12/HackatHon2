// routes/index.js
import { Router } from "express";
import { renderHome, joinChatRoom } from "../controllers/chatController.js";

const router = Router();

router.get("/", renderHome); // homepage
router.get("/chat/:topic", joinChatRoom); // chat room by topic

export default router;
