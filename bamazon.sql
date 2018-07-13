CREATE DATABASE Bamazon;
USE Bamazon;

CREATE TABLE products (
    id INT PRIMARY KEY auto_increment,
    product_name VARCHAR(50) not null,
    department_name VARCHAR(50) not null,
    price float not null,
    stock_quantity int
);

INSERT INTO 
    products 
        (product_name, department_name, price, 
            stock_quantity)
values
    ("Test Item #1", "Test-Dept.", 42.00, 36),
    ("Test Item #2", "Test-Dept.", 111.11, 69),
    ("Test Item #3", "Test-Dept.", 12.11, 11111),
    ("TEST ITEM #Z", "Test-Dept.", 123.45, 1),
    ("a Simple Hat", "Simple-Dept.", 10.00, 1000000000),
    ("a Simple Shirt", "Simple-Dept.", 10.00, 10000001),
    ("a Simple Pant", "Simple-Dept.", 10.00, 1000),
    ("a Simple Sock", "Simple-Dept.", 10.00, 1),
    ("Toilet Plunger", "Gold-Plated inc.", 100.00, 3000),
    ("Toothpick", "Gold-Plated inc.", 100.00, 10),
    ("the 10th item", "Unknown Corp.", 1000000000, 6)
