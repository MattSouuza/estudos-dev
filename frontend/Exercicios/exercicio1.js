var endereco = {
    rua: "Rua dos pinheiros",
    numero: 1293,
    bairro: "Centro",
    cidade: "São Paulo",
    uf: "SP"
};

endereco.dadosEndereco = function () {
    var stringRetorno = `O usuário mora em ${this.cidade} / ${this.uf}, no bairro ${this.bairro}, na rua ${this.rua} com nº ${this.numero}.`;

    return stringRetorno;
}

console.log(endereco.dadosEndereco());