CREATE DATABASE employees;

USE employees;

CREATE TABLE department (
department_id INT NOT NULL AUTO_INCREMENT,
department_name VARCHAR(30),
PRIMARY KEY(department_id)
);

INSERT INTO departments (name) VALUES("Sales"),("Engineering"),("Finance"),("Legal");

CREATE TABLE roles (
role_id INT AUTO_INCREMENT,
title VARCHAR(30),
salary DECIMAL,
department_id INT,
PRIMARY KEY (role_id)
);



INSERT INTO roles (title, salary, department_id) VALUES ("Sales Lead",100000,1),("Salesperson",80000,2),("Lead Engineer",150000,3),("Software Engineer",120000,4),("Account Manager ",160000,5),("Accountant",125000,6),("Legal Team Lead",250000,7),("Lawyer",190000,8);

CREATE TABLE employee (
employee_id INT AUTO_INCREMENT,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
manager_id INT, 
PRIMARY KEY(employee_id)
);

CREATE TABLE managers (
manager_id INT AUTO_INCREMENT,
manager VARCHAR(30),
PRIMARY KEY(manager_id)
);

INSERT INTO managers (manager) VALUES("Mark Roberts"), ("Ashley Rodriguez"), ("Kunal Singh"), ("Sarah Lourd");

INSERT INTO employee (first_name, last_name,role_id, manager_id) VALUES("John","Doe",1, null),("Mike","Chan",2, 1),("Emma","Roberts",3, null),("Kevin","Tupik",4, 2),("Hilary","Brown",5, null),("Malia","Brown",6, 3),("Sarah","Grand",7, null),("Tom","Allen",8, 4);
