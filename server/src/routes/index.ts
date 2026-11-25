import { Router } from "express";
import adminRoutes from "./admin.routes";
import authRoutes from "./auth.routes";
import contactRoutes from "./contact.routes";
import healthRoutes from "./health.routes";
import interestRoutes from "./interest.routes";
import { formLimiter } from "../middlewares/rateLimit";

const router = Router();

router.use(healthRoutes);
router.use("/interest", formLimiter, interestRoutes);
router.use("/contact", formLimiter, contactRoutes);
router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);

export default router;
