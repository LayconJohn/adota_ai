import { Router } from "express";
import petsController from "../controller/pet-controller.js";
import authMiddleware from "../middleware/auth-middleware.js";
const router = Router();
router
    .get("/pet", authMiddleware.checkToken, petsController.getPets)
    .post("/pet", authMiddleware.checkToken, petsController.postPet)
    .get("/pet/:petId", authMiddleware.checkToken, petsController.getPetById)
    .put("/pet/:petId", authMiddleware.checkToken, petsController.putPet);
export default router;
