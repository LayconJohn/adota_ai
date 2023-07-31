import prisma from "../database/db.js";
async function signUpUser(body) {
    return prisma.users.create({
        data: body,
        select: {
            nome: true,
            email: true
        }
    });
}
async function findUserByCPFAndEmail(cpf, email) {
    return prisma.users.findFirst({
        where: {
            cpf: cpf,
            email: email
        }
    });
}
async function findUserByEmail(email) {
    return prisma.users.findFirst({
        where: {
            email: email
        }
    });
}
const userRepository = {
    signUpUser,
    findUserByCPFAndEmail,
    findUserByEmail,
};
export default userRepository;
