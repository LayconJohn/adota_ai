import joi from "joi";

const pattern = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

const userSchema = joi.object({
    nome: joi.string().required(),
    email: joi.string().email().required(),
    senha: joi.string().regex(pattern).required(),
    confirmarSenha: joi.string().regex(pattern).required(),
    cpf: joi.string().required()
})

const userLoginSchema = joi.object({
    email: joi.string().email().required(),
    senha: joi.string().required(),
})

export { userSchema, userLoginSchema };