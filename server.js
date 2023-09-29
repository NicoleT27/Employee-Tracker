const mysql = require("mysql2");
const inquirer = require("inquirer");

const connection = mysql.createConnection(
  `mysql://root:password@localhost:3306/localhost`
);

// const connection = mysql2.createConnection({
//   host: "localhost",
//   dialect: "root",
//   database: "localhost",
//   password: "password",
//   port: 3306,
// });

function start() {
  inquirer
    .prompt({
      type: "list",
      name: "init",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "Add Employee",
        "Update Employee Role",
        "View All Roles",
        "Add Role",
        "View All Departments",
        "Add Department",
      ],
    })
    .then((response) => {
      if (response.init === "View All Employees") {
        viewAllEmployees();
      } else if (response.init === "Add Employee") {
        addEmployees();
      } else if (response.init === "Update Employee Role") {
        updateEmployee();
      } else if (response.init === "View All Roles") {
        viewAllRoles();
      } else if (response.init === "Add Role") {
        addRoles();
      } else if (response.init === "View All Departments") {
        viewAllDepartments();
      } else if (response.init === "Add Department") {
        addDepartments();
      } else {
        console.log("please choose one of the options");
      }
    });
}

function viewAllDepartments() {
  connection.query("SELECT * FROM departments", (error, results) => {
    if (error) throw error;
    console.table(results);
    start();
  });
}
function viewAllRoles() {
  connection.query("SELECT * FROM roles", (error, results) => {
    if (error) throw error;
    console.table(results);
    start();
  });
}
function viewAllEmployees() {
  connection.query("SELECT * FROM employee", (error, results) => {
    if (error) throw error;
    console.table(results);
    start();
  });
}

function addDepartments() {
  inquirer
    .prompt({
      type: "input",
      name: "name",
      message: "What is the name of the department?",
    })
    .then((response) => {
      console.log(response.name);
      `INSERT INTO departments (name) VALUES ("${answer.name}")`;
      connection.query((error, results) => {
        if (error) throw error;
        console.log(`Added department ${answer.name} to the database!`);
        start();
      });
    });
}

function addRoles() {
  inquirer
    .prompt(
      {
        type: "input",
        name: "name",
        message: "What is the name of the role?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary of the role?",
      },
      {
        type: "list",
        name: "department",
        message: "Which department does the role belong to ?",
        choices: departments,
      }
    )
    .then((response) => {
      connection.query("SELECT name FROM departments", (error, results) => {
        if (error) throw error;
        console.tables(response);
        start();
      });
    });
}
