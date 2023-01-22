import petsService from "../service/pet-service.js";
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

async function postPet(req: Request, res: Response) {
    const data = req.body;
    try {
        const createdPet = await petsService.createPet(data);
        return res.status(httpStatus.CREATED).send(createdPet);
    } catch (error) {
        console.log(error);
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
}

const petsController = {
    getPets,
    postPet
}

export default petsController;