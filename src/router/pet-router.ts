import { Router } from "express";
import petsController from "../controller/pet-controller.js";

const router = Router();

router
    .get("/pets", petsController.getPets)
    .post("/pets", petsController.postPet)
    .get("/pets/:petId", petsController.getPetById)
    .put("/pets/:petId", petsController.putPet)

export default router;