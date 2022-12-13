import express from "express";
import cors from "cors";
import httpStatus from "http-status";
import dotenv from "dotenv";
dotenv.config();
import petsRouter from "./router/pet-router";
var server = express();
server
    .use(express.json())
    .use(cors())
    .get("/health", function (_req, res) { return res.sendStatus(httpStatus.OK); })
    .use(petsRouter);
server.listen(process.env.PORT, function () {
    console.log("Running on PORT ".concat(process.env.PORT));
});
export default server;
