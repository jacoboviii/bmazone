const mysql = require("mysql");
const inquirer = require("inquirer");

// connect to the mysql server and sql database
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId + "\n");
    // run the start function after the connection is made to prompt the user
    start();
});

function start() {
    // query the database for all items being sold
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        //Construct an array of objects and pass that in to inquirer
        let productArray = [];
        results.forEach(item => {
            productArray.push({
                name: `ID: ${item.item_id} || product name: ${item.product_name} || price: $${item.price}`,
                value: item.item_id
            });
        })

        inquirer
            .prompt([
                {
                    name: "product",
                    type: "list",
                    message: "What would you like to buy? Please make a selection.",
                    choices: productArray
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "How many articles are you buying?",
                    validate: value => {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    }
                }
            ])
            .then(answer => {
                // get the information of the chosen product
                const chosenProduct = results.find(item => item.item_id === answer.product);

                // Check to see if there's enough product
                if (parseInt(answer.quantity) > chosenProduct.stock_quantity) {
                    console.log("Insufficient product quantity! Try again.\n");
                    start();
                } else {
                    // Update the database
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: chosenProduct.stock_quantity - parseInt(answer.quantity)
                            },
                            {
                                item_id: chosenProduct.item_id
                            }
                        ],
                        function (error) {
                            if (error) throw err;
                            // Show order total to the user
                            let total = parseInt(answer.quantity) * chosenProduct.price;
                            console.log("========================================================");
                            console.log("Order placed succesfully!");
                            console.log(`Order Details: ${chosenProduct.product_name} @ $${chosenProduct.price} x ${answer.quantity}`);
                            console.log(`Order total: $${total}`);
                            console.log("========================================================\n");
                            start();
                        }
                    );
                }
            });
    });
};