import {Request, Response} from "express";
import httpStatus from "http-status";
import { User, UserLogin } from "../protocols.js";
import userService from "../service/user-service.js";

async function signUp(req: Request, res: Response) {
    try {
        const { email, nome, senha, confirmarSenha, cpf } = req.body as User;
        const createdUser = await userService.signUpUser({ email, nome, senha, confirmarSenha, cpf });
        return res.status(httpStatus.CREATED).send(createdUser);
    } catch (error) {
        if (error.name === "ConflictError") {
            return res.sendStatus(httpStatus.CONFLICT);
        }
        if (error.name === "InvalidDataError") {
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(error.details);
        }
        return res.sendStatus(httpStatus.NOT_FOUND);
    }
} 

async function signIn(req: Request, res: Response) {
    const body = req.body as UserLogin;
    try {
        const token = await userService.signInUser(body);
        return res.status(httpStatus.OK).send({acess_token: token});
    } catch (error) {
        console.log(error);
        if (error.name === "InvalidDataError") {
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(error);
        }
        if (error.name === "NotFoundError") {
            return res.sendStatus(httpStatus.NOT_FOUND);
        }
        return res.sendStatus(httpStatus.NOT_FOUND);
    }
}

const userController = {
    signUp,
    signIn
};

export default userController;