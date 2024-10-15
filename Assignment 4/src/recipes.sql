create database recipes;
use recipes;

create table users (
user_id INT PRIMARY KEY AUTO_INCREMENT,
username VARCHAR(50) NOT NULL UNIQUE
);

create table recipes (
recipe_id INT PRIMARY KEY AUTO_INCREMENT,
user_id INT, 
FOREIGN KEY (user_id) REFERENCES users(user_id),
recipe_name VARCHAR(300) NOT NULL,
instructions TEXT NOT NULL
);

create table ingredients (
ingredient_id INT PRIMARY KEY AUTO_INCREMENT,
recipe_id INT,
FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id),
ingredient_name VARCHAR(300) NOT NULL,
quantity VARCHAR(50) NOT NULL
);

select * from recipes;
select * from users;
select * from ingredients;

