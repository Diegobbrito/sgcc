//Importanar dependendia do sqlite 3
const sqlite3 = require("sqlite3").verbose();
//Criar objeto que irá fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db");

//Utilizando o objeto de banco de dados
// db.serialize(()=>{
//Criando a tabela
    // db.run(`
    //     CREATE TABLE IF NOT EXISTS places(
    //         id INTEGER PRIMARY KEY AUTOINCREMENT,
    //         name TEXT,
    //         image TEXT,
    //         address TEXT,
    //         address2 TEXT,
    //         state TEXT,
    //         city TEXT,
    //         items TEXT
    //     );
    
    //  `);
//Inserir dados na tabela
// const query = `
//         INSERT INTO places(
//             name,
//             image,
//             address,
//             address2,
//             state,
//             city,
//             items
//         ) VALUES (?,?,?,?,?,?,?);
// `;

// const values = [ 
//     "",
//     "",
//     "",
//     "",
//     "",
//     "",
//     "",
// ]
// function afterInsertData(err){
//     if(err){
//         return console.log(err);
//     }
//     console.log("Cadastrado com sucesso");
//     console.log(this);
// }
// db.run(query, values, afterInsertData);

//consultar os dados
// db.all(`SELECT * FROM places`, function (err, rows){
//     if(err){
//         return console.log(err)
//     }
//     console.log("Aqui estão seus registros: ");
//     console.log(rows);
// });

//deletar daddos
// db.run(`DELETE FROM places WHERE id - ?`, [5], function (err){
//     if(err){
//         return console.log(err)
//     }
//     console.log("Registro deletado com sucesso");
// });

// });

module.exports = db;