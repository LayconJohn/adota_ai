import httpStatus from "http-status";
import AuthRepository from "../repository/auth-repository.js";
async function checkToken(req, res, next) {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    try {
        const session = await AuthRepository.findSessionByToken(token);
        if (!session) {
            return res.sendStatus(httpStatus.UNAUTHORIZED);
        }
        res.locals.session = session;
        next();
    }
    catch (error) {
        return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
}
const authMiddleware = {
    checkToken,
};
export default authMiddleware;
