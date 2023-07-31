import bcrypt from "bcrypt";
import prisma from "../../src/database/db";
export async function createUser(body) {
    const hashedPassword = await bcrypt.hash(body.senha, 10);
    return prisma.users.create({
        data: {
            nome: body.nome,
            email: body.email,
            senha: hashedPassword,
            cpf: body.cpf
        }
    });
}
