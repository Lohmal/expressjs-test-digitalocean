import { Router } from "express";
import formRoutes from "./formRoutes";

const router = Router();

// Form routes
router.use("/forms", formRoutes);

export default router;
