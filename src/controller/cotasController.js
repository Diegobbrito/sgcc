const db = require("./../database/db");

module.exports = {
    getGenerate: function(request, response){
        return response.render("create-cotas.html");
    },
    custos: function(request, response){

        const mes = request.body.mes;
        const ano = request.body.ano;
            
        function custos(){
            var query =`SELECT SUM(valor) as soma from custos WHERE mes = ${mes} and ano = ${ano}` 
                db.all(query, function(err, result) {  
                if(err){
                    return console.log(err)
                }

                console.log({result})
                let gasto
                if(result[0].soma != null)
                gasto = {gastos: result[0].soma}
                else
                gasto = gasto = {gastos: 0}
                armazenar(gasto);
                });
            }
            query = `SELECT COUNT(name) as soma from empresas WHERE type = 'Locador'` 

           db.all(query, function(err, result) {  
                if(err){
                    return console.log(err)
                }

                console.log({result})
            
                let locador = {locador: result[0].soma}
                armazenar(locador);
                custo = custos();
                
            });
            let calculo = {}; 

           function armazenar(resultado){
                if(resultado.locador != undefined ){calculo.locador = resultado.locador;}
                if(resultado.gastos !=undefined ){calculo.gastos = resultado.gastos;}
                
                console.log({calculo})
                if(calculo.gastos != undefined && calculo.locador != undefined ){
                    console.log("Chamando after")
                    calculo.cotas = calculo.gastos / calculo.locador;
                    afterResult({calculo});
                }
            }
            
            
            function afterResult(resultados){
                console.log("Entrei no after")
                console.log(resultados.calculo.gastos)
                if(resultados.calculo.gastos !== 0){
                    console.log("Entrei no if")
                    console.log(resultados)
                    return response.render("search-cost.html", {resultados});
                }
                return response.render("partials/erro-gastos.html")
        }
      
    }
}