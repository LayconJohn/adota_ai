import { User } from "../src/protocols";
import prisma from "../src/database/db";
import { createUser, createSession } from "./factories";
import { v4 as uuid } from "uuid";


export async function cleanDb() {
    await prisma.pets.deleteMany({});
    await prisma.sessions.deleteMany({});
    await prisma.users.deleteMany({});
}

export async function generateValidToken(user?) {
  const incomingUser = user || (await createUser({
    nome: "Nomezinho",
    email: "email@email.com",
    senha: "senha",
    cpf: "10101011101"
  }));

  const token = uuid();
  await createSession(token, user.id || incomingUser.id);

  return token;
}

type UserWithId = User & {id: number}