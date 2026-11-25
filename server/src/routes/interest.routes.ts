import { Router } from "express";
import { createInterest } from "../controllers/interest.controller";

const router = Router();
router.post("/", createInterest);

export default router;