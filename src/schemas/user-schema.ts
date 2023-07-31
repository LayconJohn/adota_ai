import joi from "joi";

const patternPassword = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
const patternCpf = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;

const userSchema = joi.object({
    nome: joi.string().required(),
    email: joi.string().email().required(),
    senha: joi.string().regex(patternPassword).required(),
    confirmarSenha: joi.string().regex(patternPassword).required(),
    cpf: joi.string().regex(patternCpf).required()
})

const userLoginSchema = joi.object({
    email: joi.string().email().required(),
    senha: joi.string().required(),
})

export { userSchema, userLoginSchema };