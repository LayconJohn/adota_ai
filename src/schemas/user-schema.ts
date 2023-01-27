import joi from "joi";

const userSchema = joi.object({
    nome: joi.string().required(),
    email: joi.string().email().required(),
    senha: joi.string().required(),
    confirmarSenha: joi.string().required(),
    cpf: joi.string().required()
})

export { userSchema };