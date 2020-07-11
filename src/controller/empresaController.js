const db = require("./../database/db");

module.exports = {
    cadastro : function(request, response) {
        return response.render("create-empresa.html")
    },
    postCadastro : function (request, response){
        const query = `
        INSERT INTO empresas(
            name,
            type,
            cnpj,
            telefone,
            andar,
            sala
        ) VALUES (?,?,?,?,?,?);
        `;

        const values = [ 
            request.body.name,
            request.body.type,
            request.body.cnpj,
            request.body.telefone,
            request.body.andar,
            request.body.sala
        ]
        function afterInsertData(err){
            if(err){
                console.log(err);
                return response.send("Erro no cadastro");
            }
            console.log("Cadastrado com sucesso");
            console.log(this);
            return response.render("create-empresa.html", { saved: true});
        }
            db.run(query, values, afterInsertData);
    },
    getEmpresas: function(request,response){
        const search = request.query.search;
        if(search ==""){
            return response.render("search-empresas.html", {total: 0});
        }

    //Pegando os dados do banco 
        db.all(`SELECT * FROM empresas`, function (err, rows){
            if(err){
                return console.log(err)
            }
            const total = rows.length
            //Mostrar a pag html com os dados do banco
            return response.render("search-empresas.html", {empresas: rows, total});
        });
    }
}

