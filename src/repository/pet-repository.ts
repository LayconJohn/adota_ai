import prisma from "../database/db.js";
import { Pet } from "../protocols";

async function create(data: Pet) {
    return prisma.pets.create({
        data: data
    })
}

function listPets(): Pet[]  {
    return [
        {
            nome: "Rex",
            raca: "Boxer",
            nascimento: "12/3/2020",
            adotado: false,
            descricao: "Gosta bastante de brincar com corda",
            imagem: "https://petepop.ig.com.br/wp-content/uploads/2021/05/Lucie-Heles%CC%8Cicova%CC%81-Unsplash.jpg",
            contato: "(11) 981818181"
        },
        {
            nome: "Naninha",
            raca: "SDR",
            nascimento: "12/11/2022",
            adotado: false,
            descricao: "Acabou de nascer, previsa ir ao veterinário para checkup",
            imagem: "https://static1.patasdacasa.com.br/articles/0/22/40/@/15884-foto-do-gato-siames-filhote-mostra-como-articles_media_slider_mobile-2.jpg",
            contato: "(75) 988888888"
        },
    ]
}

const petsRepository = {
    listPets,
    create
};

export default petsRepository;