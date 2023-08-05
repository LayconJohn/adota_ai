import prisma from "../database/db.js";
import { Pet } from "../protocols.js";

async function create(data: Pet, userId: number) {
    return prisma.pets.create({
        data: {
            ...data,
            adotado: false,
            userId
        }
    })
}
 
async function listPets() {
    return prisma.pets.findMany({
        where: {
            adotado: false
        },
        include: {
            users: {
                select: {
                    nome: true
                }
            }
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