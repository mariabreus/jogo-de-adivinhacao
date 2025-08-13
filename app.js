let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroAleatorio = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto){ 
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
     if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo de Advinhação');
    exibirTextoNaTela('p', 'Escolha um numero entre 1 e 10:');
}

exibirMensagemInicial();

function verificarChute() {
let chute = document.querySelector('input').value;
    if(chute == numeroAleatorio) {
            exibirTextoNaTela('h1', 'Você acertou!');
            let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
            let mensagemtentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}.`;
            exibirTextoNaTela('p', mensagemtentativas);
            document.getElementById('reiniciar').removeAttribute('disabled');
        } else {
            if (chute > numeroAleatorio) {
                exibirTextoNaTela('p', 'O número é menor!');
            } else {
                exibirTextoNaTela('p', 'O número é maior!');
            }
            tentativas++;
            limparCampo();

        }
}
function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados =[];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}
function reiniciarJogo() {
    numeroAleatorio = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}


