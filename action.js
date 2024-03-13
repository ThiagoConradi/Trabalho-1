// Seu código Javascript vem aqui

// Definição dos arrays de caracteres
const arrayDeMinusculas = "abcdefghijklmnopqrstuxwz";
const arrayDeMaiusculas = "ABCDEFGHIJKLMNOPQRSTUWXYZ";
const arrayDeSimbolos = "!@#$%&*_=+";
const arrayDeNumeros = "1234567890";

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
        // Obtém os caracteres permitidos e o tamanho da senha
        const caracteres = obterCaracteres();
        const tamanhoSenha = obterTamanhoSenha();

        // Verifica se o tamanho da senha está dentro dos limites
        if (tamanhoSenha < 4 || tamanhoSenha > 30) {
            alert("O tamanho da senha deve estar entre 4 e 30 caracteres.");
            return; // Impede que o código continue executando após exibir o alerta
        }

        // Verifica se pelo menos um dos checkboxes foi selecionado
        if (caracteres.length === 0) {
            alert("Por favor, selecione pelo menos um tipo de caracteres.");
            return;
        }

        // Gera a senha e exibe
        const senha = gerarSenha(caracteres, tamanhoSenha);
        outputDisplay.textContent = senha;
        // Atualiza o indicador de força da senha
        atualizarIndicadorForcaSenha(senha);
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
        let caracteres = "";

        if (lowercaseCheckbox.checked) {
            caracteres += arrayDeMinusculas;
        }
        if (uppercaseCheckbox.checked) {
            caracteres += arrayDeMaiusculas;
        }
        if (symbolsCheckbox.checked) {
            caracteres += arrayDeSimbolos;
        }
        if (numbersCheckbox.checked) {
            caracteres += arrayDeNumeros;
        }

        return caracteres;
    }

    // Função para obter o tamanho da senha
    function obterTamanhoSenha() {
        return parseInt(lengthInput.value);
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
