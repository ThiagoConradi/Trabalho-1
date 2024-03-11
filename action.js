// Seu código Javascript vem aqui

let arrayDeMinusculas = "abcdefghijklmnopqrstuxwz"
let arrayDeMaiusculas = "ABCDEFGHIJKLMNOPQRSTUWXYZ"
let arrayDeSimbolos = "!@#$%&*_=+"
let arrayDeNumeros = "1234567890"

// Função que é executada quando o DOM está completamente carregado
document.addEventListener("DOMContentLoaded", function () {
    // Seleciona elementos HTML importantes
    const lowercaseCheckbox = document.getElementById("lowercase");
    const uppercaseCheckbox = document.getElementById("uppercase");
    const numbersCheckbox = document.getElementById("numbers");
    const symbolsCheckbox = document.getElementById("symbols");
    const lengthInput = document.getElementById("length");
    const generateButton = document.getElementById("generate");
    const copyButton = document.getElementById("copy");
    const outputDisplay = document.getElementById("output");
    const strengthBar = document.getElementById("strength-bar");

    // Adiciona um ouvinte de evento para o botão de gerar senha
    generateButton.addEventListener("click", function () {
        // Limites mínimo e máximo para o comprimento da senha
        const minLength = 8;
        const maxLength = 30;
        // Obtém os caracteres permitidos e o tamanho da senha
        const caracteres = obterCaracteres();
        const tamanhoSenha = obterTamanhoSenha();

        // Gera a senha e exibe
        const senha = gerarSenha(caracteres, tamanhoSenha);
        outputDisplay.textContent = senha;
        // Atualiza o indicador de força da senha
        atualizarIndicadorForcaSenha(senha);
    });

    // Função que valida o tamanho da senha antes de gerar
    generateButton.addEventListener("click", function () {
        const minLength = 4;
        const maxLength = 30;
        const caracteres = obterCaracteres();
        const tamanhoSenha = obterTamanhoSenha();

        // Verifica se o tamanho da senha está dentro dos limites
        if (tamanhoSenha < minLength || tamanhoSenha > maxLength) {
            alert("O tamanho da senha deve estar entre 4 e 30 caracteres.");
            return;
        }

        const senha = gerarSenha(caracteres, tamanhoSenha);
        outputDisplay.textContent = senha;
    });

    // Função que verifica se pelo menos um tipo de caractere foi selecionado
    generateButton.addEventListener("click", function () {
        const caracteres = obterCaracteres();
        const tamanhoSenha = obterTamanhoSenha();

        // Verifica se pelo menos um dos checkboxes foi selecionado
        if (caracteres.length === 0) {
            alert("Por favor, selecione pelo menos um tipo de caracteres.");
            return;
        }

        const senha = gerarSenha(caracteres, tamanhoSenha);
        outputDisplay.textContent = senha;
    });


    // Função que gera a senha sem validar
    generateButton.addEventListener("click", function () {
        const caracteres = obterCaracteres();
        const tamanhoSenha = obterTamanhoSenha();
        const senha = gerarSenha(caracteres, tamanhoSenha);
        outputDisplay.textContent = senha;
    });

    // Ouvinte de evento para copiar a senha gerada
    copyButton.addEventListener("click", function () {
        const textarea = document.createElement("textarea");
        textarea.value = outputDisplay.textContent;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        alert("Senha copiada para a área de transferência.");
    });

    // Função para obter os caracteres selecionados
    function obterCaracteres() {
        let caracteres = [];

        // Verifica se cada checkbox está marcado e adiciona os caracteres correspondentes ao array
        var chminusculas = document.getElementById("lowercase")
        if (chminusculas.checked) {
            caracteres += arrayDeMinusculas
        }

        var chmaiusculas = document.getElementById("uppercase")
        if (chmaiusculas.checked) {
            caracteres += arrayDeMaiusculas
        }

        var chsimbolos = document.getElementById("symbols")
        if (chsimbolos.checked) {
            caracteres += arrayDeSimbolos
        }

        var chnumeros = document.getElementById("numbers")
        if (chnumeros.checked) {
            caracteres += arrayDeNumeros
        }

        return caracteres;
    }

    // Função para obter o tamanho da senha
    function obterTamanhoSenha() {
        return parseInt(lengthInput.value);
        return isNaN(tamanho) ? 0 : tamanho;

    }

    // Função para gerar a senha com base nos caracteres e no tamanho especificados
    function gerarSenha(caracteres, tamanhoSenha) {
        let senha = "";
        for (let i = 0; i < tamanhoSenha; i++) {
            let randomIndex = Math.floor(Math.random() * caracteres.length);
            senha += caracteres[randomIndex];
        }
        return senha;
    }

    // Função para atualizar o indicador de força da senha
    function atualizarIndicadorForcaSenha(senha) {
        const strength = calcularForcaSenha(senha);
        let color = "";
        if (senha.length < 8) {
            color = "red";
        } else if (senha.length <= 15) {
            color = "yellow";
        } else {
            color = "green";
        }
        // Atualiza a cor e a largura do indicador de força
        strengthBar.style.backgroundColor = color;
        strengthBar.style.width = `${strength}%`;
    }

    // Função para calcular a força da senha
    function calcularForcaSenha(senha) {
        return Math.min(senha.length * 2, 100);
    }
});
