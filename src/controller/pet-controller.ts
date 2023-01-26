import petsService from "../service/pet-service.js";
import {Request, Response} from "express";
import httpStatus from "http-status";
import { Pet } from "../protocols";

async function getPets(req: Request, res: Response) {
    try {
        const pets = await petsService.listPets();
        return res.status(httpStatus.OK).send(pets);
    } catch (error) {
        if (error.name === "NotFoundError") {
            return res.sendStatus(httpStatus.NOT_FOUND);
        }
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
}

async function postPet(req: Request, res: Response) {
    const data = req.body;
    try {
        const createdPet = await petsService.createPet(data);
        return res.status(httpStatus.CREATED).send(createdPet);
    } catch (error) {
        if (error.name === "InvalidDataError") {
            return res.status(httpStatus.BAD_REQUEST).send(error.details);
        }
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
}

async function getPetById(req: Request, res: Response) {
    try {
        const petId = Number(req.params.petId);
        const pet = await petsService.findPet(petId);
        return res.status(httpStatus.OK).send(pet)
    } catch (error) {
        if (error.name === "NotFoundError") {
            return res.sendStatus(httpStatus.NOT_FOUND);
        }
        return res.sendStatus(httpStatus.BAD_REQUEST); 
    }
}

async function putPet(req: Request, res: Response) {
    try {
        const petId = Number(req.params.petId);
        const petFinalized = await petsService.finalizeAdoption(petId);
        return res.status(httpStatus.CREATED).send(petFinalized);
    } catch (error) {
        return res.sendStatus(httpStatus.BAD_REQUEST); 
    }
}

const petsController = {
    getPets,
    postPet,
    getPetById,
    putPet
}

export default petsController;