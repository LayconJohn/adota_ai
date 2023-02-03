import supertest from "supertest";
import httpStatus from "http-status";
import server from "../src/app.js";
import petsFactory from "./factories/pets-factory";

const app = supertest(server);

describe("GET /pets", () => {
    it("should respond with status 401 if no token is given", async () => {
        const response = await server.get("/pets");
    
        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
      });
    
      it("should respond with status 401 if given token is not valid", async () => {
        const token = "tokeninvalido";
    
        const response = await server.get("/pets").set("Authorization", `Bearer ${token}`);
    
        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
      });
    

    describe("When token is valid", () => {
        it("should response with status code 200 and pets data", async ()=> {
            const response = await app.get('/pets');
    
            expect(response.statusCode).toBe(httpStatus.OK);
            expect(response.body).toEqual(petsFactory.listPets());
        });
    });
});