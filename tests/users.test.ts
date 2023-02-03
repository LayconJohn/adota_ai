import supertest from "supertest";
import httpStatus from "http-status";
import server from "../src/app";
import { prisma } from "@prisma/client";
import { createUser } from "./factories";

const app = supertest(server);

describe("POST /signup", () => {
    it ("should respond with status 409 when the email or cpf is already exist", async () => {
        await createUser({
            email: "email@example.com",
            nome: "nome",
            senha: "senha",
            cpf: "00011100111"
        });
        const body = {
            email: "email@example.com",
            nome: "outro nome",
            senha: "outrasenha",
            confirmarSenha: "outrasenha",
            cpf: "00011100111"
        }

        const response = await app.post("/signup").send(body);
    
        expect(response.statusCode).toBe(httpStatus.CONFLICT);
    });

    it ("should respond with status 409 when senha is diferent of confirmarSenha", async () => {
        const body = {
            email: "email@example.com",
            nome: "nome",
            senha: "senha",
            confirmarSenha: "senha1",
            cpf: "00011100111"
        }

        const response = await app.post("/signup").send(body);
    
        expect(response.statusCode).toBe(httpStatus.CONFLICT);
    })

    it ("should response with status 422 and array with errors schemas", async () => {
        const body = {
            email: "email",
            nome: "nome",
            senha: "senha",
            confirmarSenha: "senha",
        };

        const response = await app.post("/signup").send(body);
    
        expect(response.statusCode).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });

    it ("should return status 201", async () => {
        const body = {
            email: "email@example.com",
            nome: "nome",
            senha: "senha",
            confirmarSenha: "senha",
            cpf: "00011100111"
        }

        const response = await app.post("/signup").send(body);
    
        expect(response.statusCode).toBe(httpStatus.CREATED);
    });
});