import joi from "joi";

const contactPattern = /(?:\()[0-9]{2}(?:\))\s?[0-9]{4,5}(?:-)[0-9]{4}$/
const birthPattern = /(\d{2})[-.\/](\d{2})[-.\/](\d{4})/ 
const imagePattern = /(((https?|ftp):\/\/)?([\w\-\.])+(\.)([\w]){2,4}([\w\/+=%&_\.~?\-]*))*$/

const petSchema = joi.object({
    nome: joi.string().min(1).required(),
    raca: joi.string(),
    adotado: joi.boolean().required(),
    descricao: joi.string().min(1).required(),
    imagem: joi.string().regex(imagePattern).min(1).required(),
    contato: joi.string().regex(contactPattern).min(1).required(),
    nascimento: joi.string().regex(birthPattern),
    userId: joi.number().required()
})

export { petSchema };