// Gerar uma combinação secreta de 4 dígitos únicos
function generateCombination() {
    let digits = [];
    while (digits.length < 4) {
        let num = Math.floor(Math.random() * 10);
        if (!digits.includes(num)) digits.push(num);
    }
    return digits.join('');
}

// Inicializando a combinação e o histórico de tentativas
let combination = generateCombination();
let attempts = [];

// Verificar o palpite do jogador
function checkGuess(guess) {
    let bulls = 0;
    let cows = 0;
    const guessArr = guess.split('');
    guessArr.forEach((digit, i) => {
        if (digit === combination[i]) {
            bulls++;
        } else if (combination.includes(digit)) {
            cows++;
        }
    });
    return { bulls, cows };
}

// Lidar com a tentativa do jogador
function handleGuess() {
    const guessInput = document.getElementById('guess');
    const guess = guessInput.value;

    // Validação do palpite
    if (guess.length !== 4 || isNaN(guess)) {
        alert('A tentativa deve ser um número de 4 dígitos únicos.');
        return;
    }

    // Comparar o palpite com a combinação secreta
    const result = checkGuess(guess);
    attempts.unshift({ guess, result });

    // Exibir histórico de tentativas
    displayAttempts();

    // Verificar vitória
    if (result.bulls === 4) {
        alert('Parabéns! Você adivinhou a combinação secreta!');
        combination = generateCombination(); // Gerar nova combinação para continuar jogando
        attempts = []; // Resetar tentativas
        displayAttempts();
    }

    // Atualizar o resultado na tela
    document.getElementById('gameResult').textContent = `Bulls: ${result.bulls}, Cows: ${result.cows}`;
    guessInput.value = '';
}

// Exibir o histórico de tentativas
function displayAttempts() {
    const attemptsList = document.getElementById('attemptsList');
    attemptsList.innerHTML = '';
    attempts.forEach((attempt, index) => {
        const attemptDiv = document.createElement('div');
        attemptDiv.classList.add('attempt');
        attemptDiv.textContent = `Tentativa ${index + 1}: ${attempt.guess} - Bulls: ${attempt.result.bulls}, Cows: ${attempt.result.cows}`;
        attemptsList.appendChild(attemptDiv);
    });
}

// Mostrar a combinação secreta atual
function showCombination() {
    alert(`A combinação secreta é: ${combination}`);
}