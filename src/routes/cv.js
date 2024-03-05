import { Router } from "express";
import { cvController } from "../controllers/cv.controller.js";

const router = Router();

// WIP: all cv endpoints
router.post("/fillCv", cvController.postCv);
router.get("/getCv/:username", cvController.getCv);

export default router;
