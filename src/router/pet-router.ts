import { Router } from "express";
import petsController from "../controller/pet-controller";

const router = Router();

router.get("/pets", petsController.getPets);

export default router;