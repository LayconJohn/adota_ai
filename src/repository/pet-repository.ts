import prisma from "../database/db";
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

async function updatePetByPetId(petId: number) {
    return prisma.pets.update({
        where: {
            id: petId
        },
        data: {
            adotado: true
        }
    })
}

const petsRepository = {
    listPets,
    create,
    findPetByPetId,
    updatePetByPetId
};

export default petsRepository;