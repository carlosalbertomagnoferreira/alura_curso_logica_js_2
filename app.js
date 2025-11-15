let h1 = 'Jogo do Número Secreto';
let maximoDeNumeros = 10;
let paragrafo = `Escolha um número entre 1 e ${maximoDeNumeros}`;
let numeroAleatorio = gerarNumeroAleatorio();
let maior = 'O número secreto é maior';
let menor = 'O número secreto é menor';
let tentativas = 1;
let numerosSorteados = [numeroAleatorio];

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female');
}

function limparInput() {
    document.querySelector('input').value = '';
}

function verificarChute() {
    let chute = document.querySelector('input').value;
    let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
    let ganhou = `Voce acertou o número secreto com ${tentativas} ${palavraTentativa}!`;
    if (chute == numeroAleatorio) {
        exibirTextoNaTela('h1', 'Parabéns!');
        exibirTextoNaTela('p', ganhou);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        exibirTextoNaTela('p', chute > numeroAleatorio ? menor : maior);
        limparInput();
        tentativas++;
    }
}

function gerarNumeroAleatorio() {
    return parseInt(Math.random() * maximoDeNumeros) + 1;
}

function checkConstaNaLista(numero) {
    return numerosSorteados.includes(numero)
}

function reiniciarJogo() {
    if (numerosSorteados.length == maximoDeNumeros){
        numerosSorteados = [];
    }
    numeroAleatorio = gerarNumeroAleatorio();
    let numeroNovo = false;
    while (!numeroNovo){
        if (checkConstaNaLista(numeroAleatorio)) {
            numeroAleatorio = gerarNumeroAleatorio();
        } else {
            numerosSorteados.push(numeroAleatorio);
            numeroNovo = true;
        }
    }
    limparInput();
    exibirTextoNaTela('h1', h1);
    exibirTextoNaTela('p', paragrafo);
    document.getElementById('reiniciar').setAttribute('disabled', true);
    tentativas = 1;
    console.log(numerosSorteados);
}

exibirTextoNaTela('h1', h1);
exibirTextoNaTela('p', paragrafo);
