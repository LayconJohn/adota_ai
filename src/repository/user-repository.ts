import prisma from "../database/db.js";
import { User } from "../protocols.js";
import dayjs from "dayjs";

type newUser = Omit<User, "confirmarSenha">

async function signUpUser(body: newUser) {
    return prisma.users.create({
        data: body,
        select: {
            nome: true,
            email: true
        }
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

async function findUserByEmail(email: string) {
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