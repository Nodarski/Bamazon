var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('easy-table');


var pool = mysql.createPool({
    connectionLimit : 100, 
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'bamazon',
    debug    :  false
});



function start(){
    pool.getConnection(function(err,connection){
        if (err) {
            console.log(JSON.stringify(
              {
                "code" : 100,
                 "status" : "Error in connection database"
              }));

            return;
          }   

      console.log('connected as id ' + connection.threadId);


    connection.query("select * from products",function(err,rows){
      connection.release();
          if(!err) {
              var t = new Table;
              idOption = [ ];


              rows.forEach(function(products) {
                  t.cell('Product ID', products.id);
                  t.cell('Product Name', products.product_name);
                  t.cell('Product Price', '$'+products.price);
                  t.newRow();

                  idis = products.id.toString();
                  stckQuan = products.stock_quantity.toString();
                  idOption.push({id:idis,quantity:stckQuan});

                    if (products.stock_quantity.toString() === '0') {
                      console.log("(ID: " + products.id + ")  " +products.product_name + " is OUT OF STOCK!!");
                    } 


                })

              console.log(t.toString());
              inquire(idOption);
            };        

        });

    connection.on('error', function(err) {      
      console.log(JSON.stringify(
        {
          "code" : 100,
           "status" : "Error in connection database"
          }));
      return;     
      });
    });
};

start();



function inquire(idOption) {
    promtId = [];
    idOption.forEach(function(options){
        if (options.quantity.toString() != 0){
            promtId.push(options.id.toString());
          };
      });

    inquirer.prompt([
        {
            type: "list",
            name: "idSelect",
            message: "Select your desired Product id.",
            choices: promtId
        }
      ]).then(answers => {

        var quanAvail;

        for(i=0;i<idOption.length;i++){
            if(idOption[i].id === answers.idSelect){
                quanAvail = idOption[i].quantity;
              };
          };


        inquirer.prompt([
            {
                type: "input",
                name: "quanSelect",
                message:"Select quantity, please.  " + quanAvail + "  in stock",
                validate: function(input) {
                    inputt = parseInt(input);

                    var done = this.async();

                    setTimeout(function() {
                        if (!inputt) {

                            done('You need to provide a number');
                            return;
                          };
                        if (inputt > quanAvail){
                            done("Not enough in stock, please select a lower quantity.");
                          };

                        done(null, true);
                      }, 500);

                  }

              }
                ]).then(answer => {
                    thingy(answers, answer);
              });
     });
};

function thingy(id, quantity) {
    console.log(id.idSelect + quantity.quanSelect);
    pool.query(`SELECT price FROM products WHERE id = ?;`,
        [id.idSelect], function (error, results) {

        if (error) throw error;

        totalPrice = quantity.quanSelect * results[0].price;

        inquirer.prompt([
            {
                type:"confirm",
                name:'conf',
                message:"Total price will be $" + totalPrice + ". Do you wish to continue?"
            }
        ]).then(answer => {
            if (!answer.conf === true){
                start();
            };
        pool.query(`UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ?;`
            ,[quantity.quanSelect, id.idSelect], function(err){

            if (err) throw err;

            console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
            console.log('Purchase completed!!');
            console.log('Purchase completed!!');
            console.log('Purchase completed!!');
            console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');

            start();
            });
        });
    });
};


