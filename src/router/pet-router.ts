import { Router } from "express";
import petsController from "../controller/pet-controller";
import authMiddleware from "../middleware/auth-middleware";

const router = Router();

router
    .get("/pets", authMiddleware.checkToken ,petsController.getPets)
    .post("/pets", authMiddleware.checkToken ,petsController.postPet)
    .get("/pets/:petId", authMiddleware.checkToken ,petsController.getPetById)
    .put("/pets/:petId", authMiddleware.checkToken ,petsController.putPet)

export default router;