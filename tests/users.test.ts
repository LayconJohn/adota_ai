import supertest from "supertest";
import httpStatus from "http-status";
import server from "../src/app";

const app = supertest(server);

describe("POST /signup", () => {
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