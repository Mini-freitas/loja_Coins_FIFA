// Seleciona o input de range, o thumb e o label
const rangeInput = document.getElementById('rangeInput');
const thumb = document.querySelector('.rangeLabel .thumb');
const rangeLabel = document.querySelector('.rangeLabel');

// Seleciona os parágrafos de saída
const outQuantMoedas = document.getElementById("out_quant_moedas");
const precoReal = document.getElementById("preco_real");
const outPagamento = document.getElementById("out_pagamento");
const outEconomia = document.getElementById("out_economia");
const quantDesconto = document.getElementById("quant_desconto");

// Variáveis de preços
const precoPor100Moedas = 0.2; // Preço para 100 moedas
const desconto = 1; // Desconto de 1%

// Função para atualizar o valor do range e a posição do thumb
function updateRangeValueFromThumb(event) {
    const rangeWidth = rangeLabel.offsetWidth; // Largura do label
    const thumbWidth = thumb.offsetWidth; // Largura do thumb
    const offsetX = event.clientX - rangeLabel.getBoundingClientRect().left; // Posição do clique dentro do label

    // Calcula o valor do range baseado na posição do clique, mas com limites
    const value = (offsetX / rangeWidth) * (rangeInput.max - rangeInput.min) + parseInt(rangeInput.min);

    // Garante que o valor fique dentro dos limites do input range
    rangeInput.value = Math.min(Math.max(value, rangeInput.min), rangeInput.max); 

    // Calcula a posição do thumb em porcentagem, levando em conta a largura do thumb
    const thumbPosition = (rangeInput.value - rangeInput.min) / (rangeInput.max - rangeInput.min) * 100;

    // Garante que o thumb não ultrapasse o limite do label
    thumb.style.left = `${Math.min(Math.max(thumbPosition, 0), 100 - (thumbWidth / rangeWidth) * 100)}%`; // Subtrai a largura do thumb para que ele não ultrapasse 100%
    
    // Atualiza os valores em tempo real
    atualizarValores();
}

// Adiciona um evento de "mousedown" para capturar o movimento do thumb
rangeLabel.addEventListener('mousedown', function (event) {
    updateRangeValueFromThumb(event); // Atualiza o valor e a posição ao clicar
    document.addEventListener('mousemove', moveThumb); // Adiciona o evento de movimento
    document.addEventListener('mouseup', () => { // Remove os eventos de movimento quando o mouse é solto
        document.removeEventListener('mousemove', moveThumb);
    });
});

// Função para mover o thumb enquanto o mouse está pressionado
function moveThumb(event) {
    updateRangeValueFromThumb(event); // Atualiza o valor e a posição do thumb enquanto o mouse se move
}

// Função para atualizar os valores nos parágrafos
function atualizarValores() {
    const quantMoedas = rangeInput.value; // Pega o valor do range (quantidade de moedas)
    const valorEmReal = (quantMoedas / 1000) * precoPor100Moedas; // Calcula o valor em reais
    const valorComDesconto = valorEmReal * (1 - desconto / 100); // Aplica o desconto
    const economia = valorEmReal - valorComDesconto; // Calcula a economia

    // Atualiza os parágrafos com os valores calculados
    outQuantMoedas.textContent = quantMoedas.toLocaleString(); // Exibe a quantidade de moedas
    precoReal.textContent = `R$ ${valorEmReal.toFixed(2).replace('.', ',')}`; // Exibe o valor em reais
    outPagamento.innerHTML = `R$ <b>${valorComDesconto.toFixed(2).replace('.', ',')}</b>`; // Exibe o valor com desconto
    outEconomia.textContent = `R$ ${economia.toFixed(2).replace('.', ',')}`; // Exibe o valor economizado

    // Exibe o desconto
    quantDesconto.textContent = `${desconto}% de desconto`;
}

// Inicializa os valores
window.onload = function() {
    rangeInput.value = 2000000; // Definindo o valor inicial do range (2.000.000)
    atualizarValores(); // Chama a função para atualizar os valores ao carregar a página
}
