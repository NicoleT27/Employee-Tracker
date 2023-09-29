const mysql = require("mysql2");
const inquirer = require("inquirer");

// const connection = mysql.createConnection(
//   `mysql://root:password@localhost:3306/localhost`
// );

const connection = mysql.createConnection({
  host: "localhost",
  dialect: "root",
  database: "localhost",
  password: "password",
  port: 3306,
});

function start() {
  inquirer
    .prompt({
      type: "list",
      name: "start",
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
      if (response.start === "View All Employees") {
        viewAllEmployees();
      } else if (response.start === "Add Employee") {
        addEmployees();
      } else if (response.start === "Update Employee Role") {
        updateEmployee();
      } else if (response.start === "View All Roles") {
        viewAllRoles();
      } else if (response.start === "Add Role") {
        addRoles();
      } else if (response.start === "View All Departments") {
        viewAllDepartments();
      } else if (response.start === "Add Department") {
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
