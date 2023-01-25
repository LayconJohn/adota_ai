import { Pet } from "../protocols";
import { petSchema } from "../schemas/pet-schema.js";
import { invalidDataError, notFoundError, badRequestError } from "../errors/index.js";
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

const petsService = {
    listPets,
    createPet,
    findPet
}

export default petsService;