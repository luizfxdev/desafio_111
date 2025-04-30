// Seleção dos elementos do DOM que serão manipulados
document.addEventListener('DOMContentLoaded', function() {
    const solveButton = document.getElementById('solve-button');
    const resetButton = document.getElementById('reset-button');
    const numbersInput = document.getElementById('numbers-input');
    const resultContainer = document.getElementById('result');

    // Adiciona efeito de animação ao carregar a página
    setTimeout(() => {
        document.querySelector('.container').style.opacity = '1';
    }, 100);

    // Evento de clique no botão DESVENDAR
    solveButton.addEventListener('click', function() {
        solveElementalPuzzle();
    });

    // Evento de clique no botão REINICIAR
    resetButton.addEventListener('click', function() {
        // Limpa a entrada e o resultado
        numbersInput.value = '';
        resultContainer.innerHTML = '';
        // Adiciona classe para animar o reset
        resultContainer.classList.add('reset-animation');
        // Remove a classe após a animação
        setTimeout(() => {
            resultContainer.classList.remove('reset-animation');
        }, 500);
    });

    // Permite o uso da tecla Enter para submeter
    numbersInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            solveElementalPuzzle();
        }
    });

    // Função principal que resolve o enigma dos elementos
    function solveElementalPuzzle() {
        // Obtém o valor do input e verifica se não está vazio
        const inputValue = numbersInput.value.trim();
        
        if (!inputValue) {
            showResult('Por favor, insira números separados por vírgulas.', 'error');
            return;
        }

        try {
            // Converte a string de entrada em um array de números
            // Primeiro divide por vírgulas, depois converte cada item para número
            const numbers = inputValue.split(',')
                .map(num => num.trim())
                .map(num => {
                    // Verifica se é um número válido
                    if (isNaN(parseInt(num))) {
                        throw new Error(`"${num}" não é um número válido!`);
                    }
                    return parseInt(num);
                });

            // Chama a função que implementa a lógica do desafio
            const result = elementalPowerSum(numbers);
            
            // Exibe o resultado na interface
            showResult(result);
            
        } catch (error) {
            // Trata qualquer erro que possa ocorrer durante o processamento
            showResult(error.message, 'error');
        }
    }

    // Função que implementa a lógica do desafio dos elementos
    function elementalPowerSum(arr) {
        // Array para armazenar o resultado final
        let resultArray = [];
        
        // Para cada número no array de entrada
        for (let num of arr) {
            // Verificamos se o número é múltiplo dos elementos mágicos
            let isElemental = false;
            let elementSymbol = '';
            
            // Verifica múltiplos de 3 (Fogo)
            if (num % 3 === 0) {
                elementSymbol += '🔥';
                isElemental = true;
            }
            
            // Verifica múltiplos de 5 (Água)
            if (num % 5 === 0) {
                elementSymbol += '💧';
                isElemental = true;
            }
            
            // Verifica múltiplos de 7 (Terra)
            if (num % 7 === 0) {
                elementSymbol += '🌱';
                isElemental = true;
            }
            
            // Verifica múltiplos de 11 (Ar)
            if (num % 11 === 0) {
                elementSymbol += '💨';
                isElemental = true;
            }
            
            // Se o número for múltiplo de pelo menos um elemento,
            // adiciona o(s) símbolo(s) correspondente(s) ao resultado
            if (isElemental) {
                resultArray.push(elementSymbol);
            } else {
                // Caso contrário, adiciona o próprio número ao resultado
                resultArray.push(num.toString());
            }
        }
        
        // Junta todos os elementos do array em uma única string
        return resultArray.join('');
    }

    // Função auxiliar para exibir o resultado na interface
    function showResult(text, type = 'success') {
        resultContainer.innerHTML = '';
        
        // Anima o resultado com um efeito de surgimento
        resultContainer.style.opacity = '0';
        
        setTimeout(() => {
            if (type === 'error') {
                resultContainer.innerHTML = `<span class="error">${text}</span>`;
                resultContainer.style.color = 'var(--vermelho-puro)';
            } else {
                resultContainer.innerHTML = text;
                resultContainer.style.color = 'var(--text-light)';
                
                // Adiciona destaque especial a cada emoji dos elementos
                highlightElements();
            }
            
            resultContainer.style.opacity = '1';
        }, 200);
    }

    // Função para destacar visualmente os símbolos dos elementos no resultado
    function highlightElements() {
        // Substitui os emojis por spans com classes especiais para estilização
        let html = resultContainer.innerHTML;
        
        // Destaca o elemento Fogo
        html = html.replace(/🔥/g, '<span class="element-fire">🔥</span>');
        
        // Destaca o elemento Água
        html = html.replace(/💧/g, '<span class="element-water">💧</span>');
        
        // Destaca o elemento Terra
        html = html.replace(/🌱/g, '<span class="element-earth">🌱</span>');
        
        // Destaca o elemento Ar
        html = html.replace(/💨/g, '<span class="element-air">💨</span>');
        
        resultContainer.innerHTML = html;
        
        // Adiciona estilos inline para os elementos
        const fireElements = document.querySelectorAll('.element-fire');
        const waterElements = document.querySelectorAll('.element-water');
        const earthElements = document.querySelectorAll('.element-earth');
        const airElements = document.querySelectorAll('.element-air');
        
        fireElements.forEach(el => {
            el.style.textShadow = '0 0 5px var(--vermelho-puro)';
        });
        
        waterElements.forEach(el => {
            el.style.textShadow = '0 0 5px #00a2ff';
        });
        
        earthElements.forEach(el => {
            el.style.textShadow = '0 0 5px #2ecc71';
        });
        
        airElements.forEach(el => {
            el.style.textShadow = '0 0 5px #a0a0a0';
        });
    }
});