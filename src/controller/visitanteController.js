const db = require("./../database/db");

module.exports = {
    cadastro : function(request, response) {
        return response.render("create-visitante.html");
    },
    postCadastro : function (request, response){
            const query = `
            INSERT INTO visitante(
                name,
                cpf,
                telefone
            ) VALUES (?,?,?);
            `;

            const values = [ 
                request.body.name,
                request.body.cpf,
                request.body.telefone
            ]
            function afterInsertData(err){
                if(err){
                    console.log(err);

                    return response.render("partials/erro.html");
                }
                console.log("Cadastrado com sucesso");
                console.log(this);
                return response.render("create-visitante.html", { saved: true});
            }
            db.run(query, values, afterInsertData);
    },
    getVisitantes: function(request, response){
        const search = request.query.search;
        if(search ==""){
            return response.render("search-results.html", {total: 0});
        }

        //Pegando os dados do banco 
        db.all(`SELECT * FROM visitante`, function (err, rows){
            if(err){
                return console.log(err)
            }
            const total = rows.length
            //Mostrar a pag html com os dados do banco
            return response.render("search-results.html", {visitantes: rows, total});
        });
    }
}

