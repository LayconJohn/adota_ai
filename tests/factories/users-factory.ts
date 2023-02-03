import bcrypt from "bcrypt";
import { prisma } from "@prisma/client";

export async function createUser() {
    const incomingPassword = 'senhamuitolouca123';
    const hashedPassword = await bcrypt.hash(incomingPassword, 10);
  
    return;
  }