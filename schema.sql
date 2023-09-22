CREATE DATABASE localhost;

USE localhost;

CREATE TABLE departments (
department_id INT NOT NULL AUTO_INCREMENT,
name VARCHAR(30),
PRIMARY KEY(department_id)
);

INSERT INTO departments (name) VALUES("Sales","Engineering","Finance","Legal");

CREATE TABLE roles (
role_id INT AUTO_INCREMENT,
title VARCHAR(30),
salary DECIMAL,
department_id INT,
PRIMARY KEY (role_id)
);



INSERT INTO roles (title, salary, department_id,) VALUES ("Sales Lead",100000,1)("Salesperson",80000,2)("Lead Engineer",150000,3)("Software Engineer",120000,4)("Account Manager ",160000,5)("Accountant",125000,6)("Legal Team Lead",250000,7)("Lawyer",190000,8);

CREATE TABLE employee (
employee_id INT AUTO_INCREMENT,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
manager_id INT
PRIMARY KEY(employee_id)
);

INSERT INTO employee(id,name) VALUES(first_name, last_name, role_id, manager_id);
