import prisma from "../database/db.js";
import { Pet } from "../protocols";

async function create(data: Pet) {
    return prisma.pets.create({
        data: data
    })
}

async function listPets() {
    return prisma.pets.findMany({
        where: {
            adotado: false
        }
    });
}

async function findPetByPetId(petId: number) {
    return prisma.pets.findFirst({
        where: {
            id: petId
        }
    })
}

const petsRepository = {
    listPets,
    create,
    findPetByPetId
};

export default petsRepository;