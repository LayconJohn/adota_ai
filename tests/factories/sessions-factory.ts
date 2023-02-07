import prisma from "../../src/database/db";
import { createUser } from "./users-factory";

export async function createSession(token: string, userId: number) {
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