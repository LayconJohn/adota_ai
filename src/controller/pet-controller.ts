import petsService from "../service/pet-service";
import {Request, Response} from "express";
import httpStatus from "http-status";
import { Pet } from "../protocols";

function getPets(req: Request, res: Response) {
    try {
        const pets = petsService.listPets();
        return res.status(httpStatus.OK).send(pets);
    } catch (error) {
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
}

const petsController = {
    getPets
}

export default petsController;