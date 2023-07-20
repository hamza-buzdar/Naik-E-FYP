import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import { getProcessrequests, intent, confirm } from "../controllers/processrequestController.js";

const router = express.Router();

// router.post("/:needId", verifyToken, createProcessrequest);
router.get("/", verifyToken, getProcessrequests);
router.post("/create-payment-intent/:id", verifyToken, intent);
router.put("/", verifyToken, confirm);

export default router;