const express = require("express");
const server = express();

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

server.get("/create-point", (request, response) => {

    return response.render("create-point.html")
});

server.post("/savepoint", (request, response) =>{
    //request.body = O corpo do formulario
    // Inserir dados na tabela
const query = `
        INSERT INTO places(
            name,
            image,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
`;

const values = [ 
    request.body.name,
    request.body.image,
    request.body.address,
    request.body.address2,
    request.body.state,
    request.body.city,
    request.body.items
]
function afterInsertData(err){
    if(err){
        console.log(err);
        return response.send("Erro no cadastro");
    }
    console.log("Cadastrado com sucesso");
    console.log(this);
    return response.render("create-point.html", { saved: true});
}
db.run(query, values, afterInsertData);
});

server.get("/search", (request, response) =>{
    //Verificando se a pesquisa está vazia
    const search = request.query.search;
    if(search ==""){
        return response.render("search-results.html", {total: 0});
    }


    //Pegando os dados do banco 
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows){
        if(err){
            return console.log(err)
        }
        const total = rows.length
        //Mostrar a pag html com os dados do banco
        return response.render("search-results.html", {places: rows, total});
    });
})

//Inicia o servidor
server.listen(3333);