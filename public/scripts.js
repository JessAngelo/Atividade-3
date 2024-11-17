document.addEventListener('DOMContentLoaded', () => {
    const cnpj = document.getElementById("cnpj");
    const cep = document.getElementById("cep");
    const telefone = document.getElementById("telefone");

    // Máscara para CNPJ
    cnpj.addEventListener("input", () => {
        cnpj.value = cnpj.value
            .replace(/\D/g, "") // Remove tudo que não for número
            .replace(/^(\d{2})(\d)/, "$1.$2")
            .replace(/\.(\d{3})(\d)/, ".$1.$2")
            .replace(/\.(\d{3})(\d)/, "$1/$2")
            .replace(/(\d{4})(\d)/, "$1-$2");
    });

    // Máscara para CEP
    cep.addEventListener("input", () => {
        cep.value = cep.value.replace(/\D/g, "").replace(/^(\d{5})(\d)/, "$1-$2");
    });

    // Máscara para Telefone
    telefone.addEventListener("input", () => {
        telefone.value = telefone.value
            .replace(/\D/g, "") // Remove tudo que não for número
            .replace(/^(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{4,5})(\d)/, "$1-$2");
    });

    // Validações adicionais
    const form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
        // Validação dos campos (somente números onde necessário)
        const cnpjValue = cnpj.value.replace(/\D/g, "");
        const telefoneValue = telefone.value.replace(/\D/g, "");
        const cepValue = cep.value.replace(/\D/g, "");

        // Verifica se CNPJ tem 14 caracteres numéricos
        if (cnpjValue.length !== 14) {
            event.preventDefault();
            alert("O CNPJ precisa ter 14 dígitos numéricos.");
            return;
        }

        // Verifica se telefone tem 10 ou 11 dígitos numéricos
        if (telefoneValue.length < 10 || telefoneValue.length > 11) {
            event.preventDefault();
            alert("O telefone precisa ter 10 ou 11 dígitos numéricos.");
            return;
        }

        // Verifica se o CEP tem 8 dígitos numéricos
        if (cepValue.length !== 8) {
            event.preventDefault();
            alert("O CEP precisa ter 8 dígitos numéricos.");
            return;
        }
    });
});
