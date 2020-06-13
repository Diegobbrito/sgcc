const express = require("express");
const server = express();


//configurar pasta publica
server.use(express.static("public"));

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
})
server.get("/create-point", (resquest, response) => {
    return response.render("create-point.html")
});
server.get("/search", (resquest, response) =>{
    return response.render("search-results.html")
})

//Inicia o servidor
server.listen(3333);