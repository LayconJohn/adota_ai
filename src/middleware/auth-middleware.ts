import {Request, Response, NextFunction} from "express";
import httpStatus from "http-status";
import userRepository from "../repository/user-repository.js";

async function checkToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }

    try {
        const session = await userRepository.findSessionByToken(token);
        if (!session) {
            return res.sendStatus(httpStatus.UNAUTHORIZED);
        }
        res.locals.session = session;
        next();
    } catch (error) {
        return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
}

const authMiddleware = {
    checkToken,
}

export default authMiddleware;