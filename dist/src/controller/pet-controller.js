import petsService from "../service/pet-service.js";
import httpStatus from "http-status";
async function getPets(req, res) {
    try {
        const pets = await petsService.listPets();
        return res.status(httpStatus.OK).send(pets);
    }
    catch (error) {
        if (error.name === "NotFoundError") {
            return res.sendStatus(httpStatus.NOT_FOUND);
        }
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
}
async function postPet(req, res) {
    const data = req.body;
    const { userId } = res.locals.session;
    try {
        const createdPet = await petsService.createPet(data, Number(userId));
        return res.status(httpStatus.CREATED).send(createdPet);
    }
    catch (error) {
        if (error.name === "InvalidDataError") {
            return res.status(httpStatus.BAD_REQUEST).send(error.details);
        }
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
}
async function getPetById(req, res) {
    try {
        const petId = Number(req.params.petId);
        const pet = await petsService.findPet(petId);
        return res.status(httpStatus.OK).send(pet);
    }
    catch (error) {
        if (error.name === "NotFoundError") {
            return res.sendStatus(httpStatus.NOT_FOUND);
        }
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
}
async function putPet(req, res) {
    try {
        const petId = Number(req.params.petId);
        const petFinalized = await petsService.finalizeAdoption(petId);
        return res.status(httpStatus.CREATED).send(petFinalized);
    }
    catch (error) {
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
}
const petsController = {
    getPets,
    postPet,
    getPetById,
    putPet
};
export default petsController;
