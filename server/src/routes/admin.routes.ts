import { Router } from "express";
import {
  exportInterestCsv,
  getInterest,
  getMessages,
  updateMessage,
} from "../controllers/admin.controller";
import { requireAuth, requireRole } from "../middlewares/auth";

const router = Router();

router.use(requireAuth, requireRole("admin"));
router.get("/interest", getInterest);
router.get("/interest.csv", exportInterestCsv);
router.get("/messages", getMessages);
router.patch("/messages/:id", updateMessage);

export default router;
