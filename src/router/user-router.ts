import { Router } from "express";
import userController from "../controller/user-controler.js";

const router = Router();

router
    .post("/pets", userController.signUp)

export default router;