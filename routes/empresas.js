const express = require("express");
const router = express.Router();
const path = require("path");

let empresas = []; 

router.get("/cadastro", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/empresas.html")); 
});

router.post("/cadastro", (req, res) => {
    const { cnpj, razaoSocial, nomeFantasia, endereco, cidade, uf, cep, email, telefone } = req.body;

    
    let errors = {};
    if (!cnpj || !/^\d{14}$/.test(cnpj)) errors.cnpj = "CNPJ inválido. Deve conter exatamente 14 números.";
    if (!razaoSocial) errors.razaoSocial = "Razão Social é obrigatória.";
    if (!nomeFantasia) errors.nomeFantasia = "Nome Fantasia é obrigatório.";
    if (!endereco) errors.endereco = "Endereço é obrigatório.";
    if (!cidade) errors.cidade = "Cidade é obrigatória.";
    if (!uf || uf.length !== 2) errors.uf = "UF inválido. Deve conter 2 caracteres.";
    if (!cep || !/^\d{8}$/.test(cep)) errors.cep = "CEP inválido. Deve conter exatamente 8 números.";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "E-mail inválido.";
    if (!telefone || !/^\d{10,11}$/.test(telefone)) errors.telefone = "Telefone inválido. Deve conter 10 ou 11 números.";

    if (Object.keys(errors).length > 0) {
        return res.sendFile(path.join(__dirname, "../views/empresas.html")); 
    }

    empresas.push({ cnpj, razaoSocial, nomeFantasia, endereco, cidade, uf, cep, email, telefone });

    res.redirect("/listagem");
});


router.get("/listagem", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/listagem.html"));  m
});

module.exports = router;
