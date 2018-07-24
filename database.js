var mysql = require('mysql');

function login() {
   
    var connection = mysql.createConnection ({
        host : 'localhost',
        user : 'root',
        password : 'root',
        database : 'bamazon',
        multipleStatements : true
    });

    var pool = mysql.createPool({
        connectionLimit:10,
        host: 'localhost',
        user:'root',
        password: 'root',
        database: 'bamazon',
        multipleStatements: true
    });


    return pool;
    
};

module.exports = {
    login: login
};