import { Router } from "express";
import petsController from "../controller/pet-controller";
import authMiddleware from "../middleware/auth-middleware";

const router = Router();

router
    .all("/pets", authMiddleware.checkToken)
    .get("/pets", petsController.getPets)
    .post("/pets", petsController.postPet)
    .get("/pets/:petId", petsController.getPetById)
    .put("/pets/:petId", petsController.putPet)

export default router;