import bcrypt from "bcrypt";
import { User } from "../../src/protocols";
import prisma from "../../src/database/db"

type newUser = Omit<User, "confirmarSenha">

export async function createUser(body: newUser) {
    const hashedPassword = await bcrypt.hash(body.senha, 10);
  
    return prisma.users.create({
      data: body
    });
}