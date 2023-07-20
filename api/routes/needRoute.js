import express from "express";
import { 
    createNeed,
    deleteNeed,
    getNeed,
    getNeeds
} from "../controllers/needController.js";
import {verifyToken} from "../middleware/jwt.js"

const router = express.Router();


router.post("/",verifyToken, createNeed);
router.delete("/:id",verifyToken, deleteNeed);
router.get("/single/:id",verifyToken, getNeed);
router.get("/",verifyToken, getNeeds);









export default router;
