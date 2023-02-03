import { Pet } from "../protocols";
import { petSchema } from "../schemas/pet-schema";
import { invalidDataError, notFoundError, badRequestError, conflictError } from "../errors/index";
import petsRepository from "../repository/pet-repository";

async function listPets() {
    const pets = await petsRepository.listPets();
    
    if (pets.length === 0) {
        throw notFoundError();
    }
    return pets;
}

async function createPet(data: Pet) {
    const validation = petSchema.validate(data, { abortEarly: false});
    if (validation.error) {
        const errors = validation.error.details.map( detail => detail.message); 
        throw invalidDataError(errors);
    }

    const createdPet = await petsRepository.create(data);
    return createdPet;
}

async function findPet(petId: number) {
    if (petId < 1) {
        throw badRequestError();
    }
    const pet = await petsRepository.findPetByPetId(petId);
    if (!pet) {
        throw notFoundError();
    }

    return pet;
}

async function finalizeAdoption(petId: number) {
    if (petId < 1) {
        throw badRequestError();
    }

    const petUpdated = await petsRepository.updatePetByPetId(petId);
    return petUpdated;
}

const petsService = {
    listPets,
    createPet,
    findPet,
    finalizeAdoption
}

export default petsService;