import prisma from "../database/db";
import { User } from "../protocols";
import dayjs from "dayjs";

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

async function findUserByEmail(email: string) {
    return prisma.users.findFirst({
        where: {
            email: email
        }
    });
}

async function createSession(userId: number, token: string) {
    return prisma.sessions.create({
        data: {
            userId: userId,
            token: token
        }
    }) 
}

async function findSessionByToken(token: string) {
    return prisma.sessions.findFirst({
        where: {
            token: token
        }
    })
}

const userRepository = {
    signUpUser,
    findUserByCPFAndEmail,
    findUserByEmail,
    createSession,
    findSessionByToken
};

export default userRepository;