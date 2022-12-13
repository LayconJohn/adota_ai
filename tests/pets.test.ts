import supertest from "supertest";
import httpStatus from "http-status";
import server from "../src/app";
import petsFactory from "./factories/pets-factory";

const app = supertest(server);

describe("GET /pets", () => {
    it("should response with status code 200 and pets data", async ()=> {
        const response = await app.get('/pets');

        expect(response.statusCode).toBe(httpStatus.OK);
        expect(response.body).toEqual(petsFactory.listPets());
    });
});