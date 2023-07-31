import { Router } from "express";
import userController from "../controller/user-controler.js";
const router = Router();
router
    .post("/user", userController.signUp)
    .post("/login", userController.signIn);
export default router;
