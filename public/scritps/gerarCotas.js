const db = require("./database/db");

function gerarCotas(){
    db.all(`SELECT name, cnpj, sala FROM empresas WHERE type ='Locatario'`, function (err, rows){
        if(err){
            return console.log(err)
        }
        const total = rows.length
        //Mostrar a pag html com os dados do banco
        return response.render("search-cost.html", {empresas: rows, total});
    });
}
