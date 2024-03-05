import { Router } from "express";
import companyController from "../controllers/company.controller.js";

const router = Router();

router.post('/signupCompany',companyController.signUpCompany);
router.post('/signinCompany', companyController.signInCompany);



export default router;