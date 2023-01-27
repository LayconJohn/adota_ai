import prisma from "../database/db.js";
import { User } from "../protocols";

type newUser = Omit<User, "confirmarSenha">

async function signUpUser(body: newUser) {
    return prisma.users.create({
        data: body
    })
}

async function findUserByCPFAndEmail(cpf: string, email: string) {
    return prisma.users.findFirst({
        where: {
            cpf: cpf,
            email: email
        }
    })
}

const userRepository = {
    signUpUser,
    findUserByCPFAndEmail
};

export default userRepository;