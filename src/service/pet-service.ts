import { Pet } from "../protocols";
import petsRepository from "../repository/pet-repository.js";

function listPets() {
    const pets = petsRepository.listPets();
    
    return pets;
}

async function createPet(data: Pet) {
    const createdPet = await petsRepository.create(data);
    return createdPet;
}

const petsService = {
    listPets,
    createPet
}

export default petsService;