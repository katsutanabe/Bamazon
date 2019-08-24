//packages
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");
// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon_db"
});
connection.connect();//to call it
// var to manage connection the conncetion (with function) and help display the table nicely
var display = function() {
  connection.query("SELECT * FROM products", function(err, res) {// to connect to the database through the query
    if (err) throw err;
    console.log("-------------------------------");
    console.log(" Welcome to Bamazon ");
    console.log("-------------------------------");
    console.log("");
    console.log("Find your Product Below");
    console.log("");
  
//table variable to connect to our cli table 
  var table = new Table({
   head: ["Product Id", "Product name", "Product Description", "Cost", "Stock"],
  // colWidths: [8, 20, 20, 20, 8],
  // colAligns: ["center", "left", "right"],
   style:{
     'padding-left': 10,
     'color': 'blue',

   }
  });

// for loop to use the length of the result and then push the product name and price
  for (var i = 0; i <res.length; i++) {
    table.push ([res [i].id, res[i].products_name,res[i].department_name,res[i].price,res[i].stock_quantity]);
  };
  console.log(table.toString());
  shopping();
  console.log("");
});

};
// var shopping: series of questions to select which product and how many to purchase

var shopping = function() {
  inquirer.prompt({
    type: "input",
    name: "productToBuy",
    message: "Enter the product Id of the item you wish to purchase."
  }).then(function(answer1){
   //query to connect to the database(connection query)
    var selection = answer1.productToBuy;
    selection =  selection.toString();
    connection.query("SELECT * FROM products WHERE Id=?", selection, function(err,res) {
      if (err) throw err;
      if (res.length ===0){
        console.log("That Product doesn't exist, Please enter a Product Id form the list above");


        shopping();
      } else {
       // console.log("all is ok");
       inquirer.prompt({
         name: "quantity",
         type: "input",
         message: "How many items would you like to purchase?"
       })
      .then(function(answer2){
        var quantity = answer2.quantity;
        var queryId = quantity - 1;
        if (quantity>res[queryId].stock_quantity ) {
          console.log(
            "Our appologies we only have " + res[0].stock_quantity + "items of the product selected"
          )
          shopping();
        }else{
          console.log("");
          console.log(res[0].products_name  +  " purchased");
          console.log(quantity + "qty @ S" + res[0].price);
        //reresh quantity left
       
          var newQuantity = res[0].stock_quantity - quantity;
          connection.query(
            "UPDATE products SET stock_quantity = " + newQuantity + " WHERE id = " +res[0].id, function(err,resUpdate) {
              if (err) throw err;
              console.log("");
              console.log("Your Order has been Processed");
              console.log("Thank you for your Purchase!");
              console.log("");
              connection.end();
            }
          );
        };
      })
      }
    });
  });
}

display() 
















