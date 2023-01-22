import { Router } from "express";
import petsController from "../controller/pet-controller.js";
var router = Router();
router
    .get("/pets", petsController.getPets)
    .post("/pets", petsController.postPet);
export default router;
