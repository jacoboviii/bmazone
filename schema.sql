DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT default 40,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, price, stock_quantity)
VALUES ("Cascadian Farm Organic Graham Crunch Cereal 9.6 oz Box", 3.00, 100),
("REBBL Turmeric Golden Milk", 2.99, 80),
("Tom's Of Maine Natural Maximum Strength Sensitive ", 3.79, 50),
("Clif Builder's Protein Crunchy Peanut Butter ", 1.25, 80),
("Changing Seas, Salmon Cold Smoked", 8.99, 70),
("Alta Palla, Sparkling Water Peach Organic", 5.00, 50),
("AmazonBasics 13-Inch Felt Laptop Sleeve", 11.99, 200),
("Fellowes 58024 Medium Mouse Pad", 5.19, 150),
("AmazonBasics Lightning to USB A Cable", 7.99, 400),
("Fire TV with 4K Ultra HD and Alexa Voice Remote", 69.99, 30);



