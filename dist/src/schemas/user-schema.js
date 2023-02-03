import joi from "joi";
var userSchema = joi.object({
    nome: joi.string().required(),
    email: joi.string().email().required(),
    senha: joi.string().required(),
    confirmarSenha: joi.string().required(),
    cpf: joi.string().required()
});
var userLoginSchema = joi.object({
    email: joi.string().email().required(),
    senha: joi.string().required()
});
export { userSchema, userLoginSchema };
