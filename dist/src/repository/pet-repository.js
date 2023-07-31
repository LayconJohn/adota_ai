import prisma from "../database/db.js";
async function create(data, userId) {
    return prisma.pets.create({
        data: {
            ...data,
            userId
        }
    });
}
async function listPets() {
    return prisma.pets.findMany({
        where: {
            adotado: false
        }
    });
}
async function findPetByPetId(petId) {
    return prisma.pets.findFirst({
        where: {
            id: petId
        }
    });
}
async function updatePetByPetId(petId) {
    return prisma.pets.update({
        where: {
            id: petId
        },
        data: {
            adotado: true
        }
    });
}
const petsRepository = {
    listPets,
    create,
    findPetByPetId,
    updatePetByPetId
};
export default petsRepository;
