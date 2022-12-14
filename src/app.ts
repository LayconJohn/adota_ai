import express from "express";
import cors from "cors";
import httpStatus from "http-status";
import dotenv from "dotenv";
dotenv.config();

import petsRouter from "./router/pet-router"

const server = express();

server
    .use(express.json())
    .use(cors())
    .get("/health", (_req, res) => res.sendStatus(httpStatus.OK))
    .use(petsRouter)

server.listen(process.env.PORT, () => {
    console.log(`Running on PORT ${process.env.PORT}`);
})

export default server;