const db = require("./../database/db");

module.exports = {
    cadastro : function(request, response) {
        return response.render("create-cost.html");
    },
    postCadastro : function (request, response){
        const query = `
        INSERT INTO custos(
            type,
            valor,
            mes,
            ano
        ) VALUES (?,?,?,?);
        `;

        const values = [ 
            request.body.type,
            request.body.valor,
            request.body.mes,
            request.body.ano
        ]
        function afterInsertData(err){
            if(err){
                console.log(err);
                return response.send("Erro no cadastro");
            }
            console.log("Cadastrado com sucesso");
            console.log(this);
            return response.render("create-cost.html", { saved: true});
        }
            db.run(query, values, afterInsertData);
    }
      
}


