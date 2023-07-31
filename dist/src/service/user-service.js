import { userSchema, userLoginSchema } from "../schemas/user-schema.js";
import { invalidDataError, notFoundError, conflictError } from "../errors/index.js";
import userRepository from "../repository/user-repository.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import AuthRepository from "../repository/auth-repository.js";
async function signUpUser({ email, nome, senha, confirmarSenha, cpf }) {
    if (senha !== confirmarSenha) {
        throw conflictError('Password and confirm Password need to Be Equal');
    }
    const validation = userSchema.validate({ email, nome, senha, confirmarSenha, cpf }, { abortEarly: false });
    if (validation.error) {
        const errors = validation.error.details.map(detail => detail.message);
        throw invalidDataError(errors);
    }
    const userExist = await userRepository.findUserByCPFAndEmail(cpf, email);
    if (userExist) {
        throw conflictError('this user already exists');
    }
    const encryptedPassword = bcrypt.hashSync(senha, 10);
    const data = {
        email: email,
        nome: nome,
        cpf: cpf,
        senha: encryptedPassword
    };
    const createdUser = await userRepository.signUpUser(data);
    return createdUser;
}
async function signInUser(body) {
    const validation = userLoginSchema.validate(body, { abortEarly: false });
    if (validation.error) {
        const errors = validation.error.details.map(detail => detail.message);
        console.log(errors);
        throw invalidDataError(errors);
    }
    const user = await userRepository.findUserByEmail(body.email);
    const encryptedPassword = bcrypt.compareSync(body.senha, user.senha);
    if (!user.id || !encryptedPassword) {
        throw notFoundError();
    }
    const token = uuid();
    await AuthRepository.createSession(user.id, token);
    return token;
}
const userService = {
    signUpUser,
    signInUser
};
export default userService;
