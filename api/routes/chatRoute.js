import express from "express";
import {
  createChat,
  getChats,
} from "../controllers/chatController.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.post("/", verifyToken, createChat);
router.get("/:id", verifyToken, getChats);

export default router;