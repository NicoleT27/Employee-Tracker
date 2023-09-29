const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  // Your username
  user: "root",
  // Your password
  password: "password",
  database: "employees",
});

connection.connect(function (err) {
  if (err) throw err;
  start();
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
  connection.query("SELECT * FROM department", (error, results) => {
    if (error) throw error;
    console.table(results);
    start();
  });
}
function viewAllRoles() {
  connection.query("SELECT roles.title,roles.id, department.department_name, roles.salary FROM roles join department on roles.department_id = department.id", (error, results) => {
    if (error) throw error;
    console.table(results);
    start();
  });
}
function viewAllEmployees() {
  connection.query(
    "SELECT * FROM employee",
    (error, results) => {
      if (error) throw error;
      console.table(results);
      start();
    }
  );
}


function addRoles() {
  connection.query("SELECT * FROM department", (error, results) => {
    if (error) throw error;
    inquirer
      .prompt([
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
          choices: ["Sales", "Engineering", "Finance", "Legal"],
        },
      ])
      .then((response) => {
        `INSERT INTO roles (title) VALUES ("${response.title}"),("${response.salary}")(department)`;
        connection.query((error, results) => {
          if (error) throw error;
          console.log("Added role with salary to the database!");
          start();
        });
      });
  });
}

function addEmployees() {
  connection.query("SELECT * FROM employee", (error, results) => {
    if (error) throw error;
    inquirer
      .prompt([
        {
          type: "input",
          name: "firstName",
          message: "What is the employee's first name?",
        },
        {
          type: "input",
          name: "lastName",
          message: "What is the employee's last name?",
        },
        {
          type: "list",
          name: "role",
          message: "What is the employee's role ?",
          choices: [
            "Sales Lead",
            "Salesperson",
            "Lead Engineer",
            "Software Engineer",
            "Account Manager ",
            "Accountant",
            "Legal Team Lead",
            "Lawyer",
          ],
        },
        {
          type: "list",
          name: "manager",
          message: "Who is the employee's manager ?",
          choices: [
            "Mark Roberts",
            "Ashley Rodriguez",
            "Kunal Singh",
            "Sarah Lourd",
          ],
        }
      ])
      .then((response) => {
        `INSERT INTO roles (title) VALUES (${response.title}),("${response.salary}")(department)`;
        connection.query((error, results) => {
          if (error) throw error;
          console.los("added role with salary to the database!");
          start();
        });
      });
  });
}

function addDepartments() {
    inquirer
      .prompt({
        type: "input",
        name: "firstName",
        message: "What is the name of the department?",
      })
      .then((response) => {
        `INSERT INTO department (department_name) VALUES ("${response.title}")`;
        connection.query((error, results) => {
          if (error) throw error;
          console.log("added department to the database");
          start();
        });
      });
  };


// function updateEmployee() {
//   const queryEmployees = "SELECT employee.employee_id, employee.first_name, employee.last_name, roles.title FROM employee LEFT JOIN roles ON employee.role_id = roles.id";
//    const queryRoles = "Select * FROM roles";
//   connection.query (queryEmployees,(error, resEmployees) => {
//     if (error) throw error;
//     connection.query (queryRoles,(error, resRoles) => {
//     if (error) throw error;
//       inquirer
//       .prompt([
//         {
//           type: "list",
//           name: "employee",
//           message: "Which employee would you like to update?",
//           choices: resEmployees.map(
//             (employee) =>
//             `${employee.first_name} ${employee.last_name}`
//           ),
//         },
//         {
//           type: "list",
//           name: "role",
//           message: "Select the new role",
//           choices: resRoles.map((role) => role.title),
//         },
//       ]).then (response) => {
//         const employee = resEmployees.find(
//           (employee) =>
//             `${employee.first_name} ${employee.last_name}` === response.employee
//           );
//           const role = resRoles.find(
//             (role) => role.title === response.role
//           );
//           const query =
//         "UPDATE employee SET role_id = ? WHERE id = ?";
//          connection.query(
//           query, [role.id, employee.id],
//           (error, result) => {
//               if (error) throw error;
//          );
//           start();
//     }
//     })
//   })
// };
