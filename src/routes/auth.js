import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";

const router = Router();

router.post('/resetpassword', authController.resetPassword);

export default router;