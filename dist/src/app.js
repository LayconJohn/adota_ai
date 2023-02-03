import express from "express";
import cors from "cors";
import httpStatus from "http-status";
import dotenv from "dotenv";
dotenv.config();
import petsRouter from "./router/pet-router";
import userRouter from "./router/user-router";
var server = express();
server
    .use(express.json())
    .use(cors());
server
    .get("/health", function (_req, res) { return res.sendStatus(httpStatus.OK); })
    .use(petsRouter)
    .use(userRouter);
server.listen(process.env.PORT, function () {
    console.log("Running on PORT ".concat(process.env.PORT));
});
export default server;
