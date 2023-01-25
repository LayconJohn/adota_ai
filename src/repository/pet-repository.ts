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

const petsRepository = {
    listPets,
    create
};

export default petsRepository;