import prisma from "../src/database/db";


export async function cleanDb() {
  
    await prisma.pets.deleteMany({});
    await prisma.sessions.deleteMany({});
    await prisma.users.deleteMany({});
  }