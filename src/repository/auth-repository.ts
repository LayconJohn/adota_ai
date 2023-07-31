import prisma from "../database/db.js"

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

const AuthRepository = {
    createSession,
    findSessionByToken
};

export default AuthRepository;