import {Request, Response} from "express";
import httpStatus from "http-status";
import { User, UserLogin } from "../protocols.js";
import userService from "../service/user-service.js";

async function signUp(req: Request, res: Response) {
    const body = req.body as User;
    try {
        await userService.signUpUser(body);
        return res.sendStatus(httpStatus.CREATED);
    } catch (error) {
        if (error.name === "ConflictError") {
            return res.sendStatus(httpStatus.CONFLICT);
        }
        if (error.name === "InvalidDataError") {
            return res.sendStatus(httpStatus.BAD_REQUEST);
        }
        return res.sendStatus(httpStatus.FORBIDDEN);
    }
} 

async function signIn(req: Request, res: Response) {
    const body = req.body as UserLogin;
    try {
        const token = await userService.signInUser(body);
        return res.status(httpStatus.OK).send({token: token});
    } catch (error) {
        if (error.name === "InvalidDataError") {
            return res.sendStatus(httpStatus.BAD_REQUEST);
        }
        if (error.name === "NotFoundError") {
            return res.sendStatus(httpStatus.NOT_FOUND);
        }
        return res.sendStatus(httpStatus.FORBIDDEN);
    }
}

const userController = {
    signUp,
    signIn
};

export default userController;