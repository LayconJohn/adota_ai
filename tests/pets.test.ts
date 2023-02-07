import supertest from "supertest";
import httpStatus from "http-status";
import server from "../src/app";
import  { createPets } from "./factories/pets-factory";
import {  createUser, createSession } from "./factories/index";
import { cleanDb, generateValidToken } from "./helpers";
import { User } from "../src/protocols";

const app = supertest(server);

beforeEach(async () => {
  await cleanDb();
});

afterAll(async () => {
  await cleanDb();
});

type UserWithId = User & {id: number}

describe("GET /pets", () => {  
  it("should respond with status 400 if no token is given", async () => {
    const response = await app.get("/pets");

    expect(response.statusCode).toBe(httpStatus.BAD_REQUEST);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = 'tokeninvalido';

    const response = await app.post("/pets").set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(httpStatus.UNAUTHORIZED);
  });

    describe("When token is valid", () => {
        it("should response with status code 200 and pets data", async ()=> {
          const user = await createUser({
            nome: "Nomezinho",
            email: "email@email.com",
            senha: "senha",
            cpf: "10101011101"
          });
          const token = await generateValidToken(user);
          const pets = await createPets(user.id);
          const response = await app.get('/pets').set("Authorization", `Bearer ${token}`);
          //console.log(response.body);
          expect(response.statusCode).toBe(httpStatus.OK);
        });

        it("should response with status 404 when dont have pets data", async () => {
          const user = await createUser({
            nome: "Nomezinho",
            email: "email@email.com",
            senha: "senha",
            cpf: "10101011101"
          });
          const token = await generateValidToken(user);
          const response = await app.get('/pets').set("Authorization", `Bearer ${token}`);
          expect(response.statusCode).toBe(httpStatus.NOT_FOUND);
        });
    });
});

describe("POST /pets", () => {
  it("should respond with status 400 if no token is given", async () => {
    const response = await app.get("/pets");

    expect(response.statusCode).toBe(httpStatus.BAD_REQUEST);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = 'tokeninvalido';

    const response = await app.post("/pets").set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("When token is valid", () => {
    
  });
});