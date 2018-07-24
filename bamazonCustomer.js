var express   =    require("express");
var Table = require('easy-table')
var mysql     =    require('mysql');
var inquirer = require('inquirer');

var idOption=[];

var pool      =    mysql.createPool({
    connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'bamazon',
    debug    :  false
});

pool.getConnection(function(err,connection){
  if (err) {
    console.log(JSON.stringify({"code" : 100, "status" : "Error in connection database"}));
    return;
  }   

  console.log('connected as id ' + connection.threadId);
  
  connection.query("select * from products",function(err,rows){
      connection.release();
      if(!err) {
          var t = new Table
          
 
        rows.forEach(function(products) {
          t.cell('Product ID', products.id);
            t.cell('Product Name', products.product_name);
            t.cell('Product Price', '$'+products.price);
            t.newRow()
            idis = products.id.toString();
            idOption.push(idis);


        })
        
        console.log(t.toString())
        console.log(idOption );
        inquire();
      }           

  });

  connection.on('error', function(err) {      
        console.log(JSON.stringify({"code" : 100, "status" : "Error in connection database"}));
        return;     
  });
});

 function inquire() {
    inquirer.prompt([
     {
       type: "list",
       name: "idSelect",
       message: "Select your desired Product id.",
       choices: idOption
     }
   ]).then(answers => {
     console.log(answers)
  });
  }



