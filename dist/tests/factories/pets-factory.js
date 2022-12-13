var listPets = function () {
    return [
        {
            nome: "Rex",
            raça: "Boxer",
            nascimento: 12 / 3 / 2020,
            adotado: false,
            descrição: "Gosta bastante de brincar com corda",
            imagem: "https://petepop.ig.com.br/wp-content/uploads/2021/05/Lucie-Heles%CC%8Cicova%CC%81-Unsplash.jpg",
            contato: "(11) 981818181"
        },
    ];
};
var petsFactory = {
    listPets: listPets
};
export default petsFactory;
