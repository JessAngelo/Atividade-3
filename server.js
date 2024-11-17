const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

app.use(bodyParser.urlencoded({ extended: true }));

let empresas = []; 


app.post('/cadastro', (req, res) => {
    const novaEmpresa = {
        cnpj: req.body.cnpj,
        razaoSocial: req.body.razaoSocial,
        nomeFantasia: req.body.nomeFantasia,
        endereco: req.body.endereco,
        cidade: req.body.cidade,
        uf: req.body.uf,
        cep: req.body.cep,
        telefone: req.body.telefone,
        email: req.body.email
    };
    
    empresas.push(novaEmpresa); 
    res.redirect('/listagem'); 
});

app.get('/listagem', (req, res) => {
    if (empresas.length === 0) {
        return res.send("<h1>Não há empresas cadastradas!</h1><a href='/'>Voltar ao Cadastro</a>");
    }

    const filePath = path.join(__dirname, 'views', 'listagem.html');
    
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.error("Erro ao ler o arquivo listagem.html:", err);
            return res.status(500).send("Erro ao carregar a página de listagem.");
        }

        let empresasTabela = '';
        empresas.forEach(empresa => {
            empresasTabela += `
                <tr>
                    <td>${empresa.cnpj}</td>
                    <td>${empresa.razaoSocial}</td>
                    <td>${empresa.nomeFantasia}</td>
                    <td>${empresa.endereco}</td>
                    <td>${empresa.cidade}</td>
                    <td>${empresa.uf}</td>
                    <td>${empresa.cep}</td>
                    <td>${empresa.telefone}</td>
                    <td>${empresa.email}</td>
                </tr>
            `;
        });

        const htmlComEmpresas = data.replace('{{empresas}}', empresasTabela);
        res.send(htmlComEmpresas); 
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'empresas.html')); 
});


app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});
