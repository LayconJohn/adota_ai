import {Request, Response} from "express";
import httpStatus from "http-status";
import { User } from "../protocols.js";

async function signUp(req: Request, res: Response) {
    const body = req.body;
    try {
        
    } catch (error) {
        return res.sendStatus(httpStatus.FORBIDDEN);
    }
} 

const userController = {
    signUp,
};

export default userController;