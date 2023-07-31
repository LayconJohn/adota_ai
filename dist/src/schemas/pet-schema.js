import joi from "joi";
const petSchema = joi.object({
    nome: joi.string().min(1).required(),
    raca: joi.string().min(1).required(),
    adotado: joi.boolean().required(),
    descricao: joi.string().min(1).required(),
    imagem: joi.string().min(1).required(),
    contato: joi.string().min(1).required(),
    nascimento: joi.string(),
    userId: joi.number().required()
});
export { petSchema };
