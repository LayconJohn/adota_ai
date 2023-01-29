import { User, UserLogin } from "../protocols";
import { userSchema, userLoginSchema } from "../schemas/user-schema.js";
import { invalidDataError, notFoundError, badRequestError, conflictError } from "../errors/index.js";
import userRepository from "../repository/user-repository.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

async function signUpUser(body: User) {
    if (body.senha !== body.confirmarSenha) {
        throw conflictError('Password and confirm Password need to Be Equal');
    }
    const validation = userSchema.validate(body, { abortEarly: false });
    if (validation.error) {
        const errors = validation.error.details.map( detail => detail.message);
        throw invalidDataError(errors);
    }
    const userExist = await userRepository.findUserByCPFAndEmail(body.cpf, body.email);
    if (userExist) {
        throw conflictError('this user already exists');
    }
    const encryptedPassword = bcrypt.hashSync(body.senha, 13);
    const data = {
        email: body.email,
        nome: body.nome,
        cpf: body.cpf,
        senha: encryptedPassword
    }
    const createdUser = await userRepository.signUpUser(data);
    return createdUser;
}

async function signInUser(body: UserLogin) {
    const validation = userLoginSchema.validate(body, { abortEarly: false });
    if (validation.error) {
        const errors = validation.error.details.map( detail => detail.message);
        throw invalidDataError(errors);
    }
    const user = await userRepository.findUserByEmail(body.email);
    const encryptedPassword = await bcrypt.compareSync(body.senha, user.senha);
    if (!user || !encryptedPassword) {
        throw notFoundError();
    }
    const token = uuid();
    await userRepository.createSession(user.id, token);
    return token;
}


const userService = { 
    signUpUser,
    signInUser
};

export default userService;
