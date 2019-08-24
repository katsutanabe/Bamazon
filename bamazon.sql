DROP DATABASE IF exists bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;


CREATE TABLE products ( 
id int(11) AUTO_INCREMENT  NOT NULL ,
products_name varchar(30) NOT NULL,
department_id int(11) NOT NULL,
price decimal(10,2) NOT NULL,
stock_quantity int(11) NOT NULL,
PRIMARY KEY (id),
KEY department_id (department_id)
);
