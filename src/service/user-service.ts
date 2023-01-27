import { User } from "../protocols";
import { userSchema } from "../schemas/user-schema.js";
import { invalidDataError, notFoundError, badRequestError, conflictError } from "../errors/index.js";
import userRepository from "../repository/user-repository.js";

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
        throw conflictError('this cpf already exists');
    }
    const data = {
        email: body.email,
        nome: body.nome,
        cpf: body.cpf,
        senha: 'bcrypt'
    }
    const createdUser = await userRepository.signUpUser(body);
    return createdUser;
}



const userService = { 
    signUpUser,
};

export default userService;
