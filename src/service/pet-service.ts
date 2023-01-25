import { Pet } from "../protocols";
import { petSchema } from "../schemas/pet-schema.js";
import { invalidDataError, notFoundError } from "../errors/index.js";
import petsRepository from "../repository/pet-repository.js";

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

const petsService = {
    listPets,
    createPet
}

export default petsService;