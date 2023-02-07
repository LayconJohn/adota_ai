import bcrypt from "bcrypt";
import { User } from "../../src/protocols";
import prisma from "../../src/database/db"

type newUser = Omit<User, "confirmarSenha">

export async function createUser(body: newUser): Promise<newUser & {id: number}> {
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