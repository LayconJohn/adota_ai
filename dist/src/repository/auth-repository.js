import prisma from "src/database/db";
async function createSession(userId, token) {
    return prisma.sessions.create({
        data: {
            userId: userId,
            token: token
        }
    });
}
async function findSessionByToken(token) {
    return prisma.sessions.findFirst({
        where: {
            token: token
        }
    });
}
const AuthRepository = {
    createSession,
    findSessionByToken
};
export default AuthRepository;
