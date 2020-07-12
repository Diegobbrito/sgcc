const express = require("express");
const server = express();
const VisitanteController = require('./controller/visitanteController');
const EmpresaController = require('./controller/empresaController');
const CustoController = require('./controller/custosController');
const EstacionamentoController = require('./controller/estacionamentoController');
const CotasController = require('./controller/CotasController');



//importar o banco de dados
const db = require("./database/db");

//configurar pasta publica
server.use(express.static("public"));

//Habilitando o uso do request.body na aplicação
server.use(express.urlencoded({extended: true}));

//Utilizando template engine
//npm install nunjucks
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
    express: server,
    noCache: true
});

//Configuração dos caminhos da pagina
//Pagina inicial

server.get("/", (request, response)=>{
    return response.render("index.html");
});

server.get("/create-visitante", VisitanteController.cadastro);
server.post("/save-visitante", VisitanteController.postCadastro);
server.get("/search", VisitanteController.getVisitantes);

server.get("/create-empresa", EmpresaController.cadastro);
server.post("/saveempresa", EmpresaController.postCadastro);
server.get("/search-empresas", EmpresaController.getEmpresas)

server.get("/create-cost", CustoController.cadastro);
server.post("/save-cost", CustoController.postCadastro);

server.get("/estacionamento", EstacionamentoController.getEstacionamento);

server.get("/cotas", CotasController.getGenerate);
server.post("/cotas-save", CotasController.custos);


//Inicia o servidor
server.listen(3333);