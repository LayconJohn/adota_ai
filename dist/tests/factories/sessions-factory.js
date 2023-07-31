import prisma from "../../src/database/db";
import { createUser } from "./users-factory";
export async function createSession(token, userId) {
    const user = await createUser({
        nome: "Nomezinho",
        email: "email@email.com",
        senha: "senha",
        cpf: "10101011101"
    });
    return prisma.sessions.create({
        data: {
            token: token,
            userId: userId,
        },
    });
}
