import { Pet } from "../protocols.js";
import { petSchema } from "../schemas/pet-schema.js";
import { invalidDataError, notFoundError, badRequestError, conflictError } from "../errors/index.js";
import petsRepository from "../repository/pet-repository.js";

async function listPets(page: number) {
    if (page < 1 || isNaN(page)) {
        throw badRequestError();
    }

    let firstPage = 0;
    let lastPage = 9;
    if (page > 1) {
      firstPage = (page * 9) - 9;
      lastPage = page * 9;
    }  

    const pets = await petsRepository.listPets();
    
    if (pets.length === 0) {
        throw notFoundError();
    }
    return pets.reverse().slice(firstPage, lastPage);
}
 
async function createPet(data: Pet, userId: number) {
    const validation = petSchema.validate({...data, adotado: false, userId: userId}, { abortEarly: false});
    if (validation.error) {
        const errors = validation.error.details.map( detail => detail.message); 
        throw invalidDataError(errors);
    }

    const createdPet = await petsRepository.create(data, userId);
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