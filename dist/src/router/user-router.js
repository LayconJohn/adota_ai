import { Router } from "express";
import userController from "../controller/user-controler";
var router = Router();
router
    .post("/signup", userController.signUp)
    .post("/signin", userController.signIn);
export default router;
