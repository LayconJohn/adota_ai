import petsRepository from "../repository/pet-repository";

function listPets() {
    const pets = petsRepository.listPets();
    
    return pets;
}

const petsService = {
    listPets
}

export default petsService;