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
  connection.query(
    "SELECT roles.role_id, roles.title, department.department_name, roles.salary FROM roles JOIN department ON roles.department_id = department.department_id",
    (error, results) => {
      if (error) throw error;
      console.table(results);
      start();
    }
  );
}
function viewAllEmployees() {
  connection.query(
"SELECT employee.employee_id, employee.first_name, employee.last_name, joined_table.title, department.department_name, joined_table.salary, managers.manager_name AS manager_name FROM employee LEFT JOIN (SELECT roles.title, roles.salary, managers.manager_id FROM roles JOIN managers ON roles.role_id = managers.manager_id) AS joined_table ON employee.employee_id = joined_table.manager_id JOIN department ON employee.employee_id = department.department_id JOIN managers ON joined_table.manager_id = managers.manager_id",
    (error, results) => {
      if (error) throw error;
      console.table(results);
      start();
    }
  );
}


function addRoles() {
 connection.query(
   "SELECT department.department_name FROM department LEFT JOIN roles ON department.department_id = roles.role_id",
   (error, results) => {
     if (error) {
       console.error(error);
       return;
     }

     const department = results.map(({ department_id, department_name }) => ({
       name: department_name,
       value: department_id,
     }));

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
           choices: department,
         },
       ])
       .then((response) => {
         const query = "INSERT INTO roles (title, salary, department_id) SELECT '${response.title}', '${response.salary}', department_id FROM department WHERE department_name = '${response.department_name}'";
         connection.query(query, (error) => {
           if (error) {
             console.error(error);
             return;
           }
           console.log("Added new role with salary to the database!");
           start();
         });
       });
   }
 );
  };

  connection.query(
    "SELECT roles.role_id, title FROM roles",
    (error, results) => {
      if (error) {
        console.error(error);
        return;
      }

      const roles = results.map(({ role_id, title }) => ({
        name: title,
        value: role_id,
      }));

      connection.query(
        "SELECT managers.manager_id, manager_name FROM managers",
        (error, results) => {
          if (error) {
            console.error(error);
            return;
          }

          const managers = results.map(({ manager_id, manager_name }) => ({
            name: manager_name,
            value: manager_id,
          }));

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
                choices: roles,
              },
              {
                type: "list",
                name: "manager",
                message: "Who is the employee's manager ?",
                choices: [{ name: "None", value: null }, ...managers],
              },
            ])
            .then((response) => {
              const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${response.firstName}', '${response.lastName}', '${response.role_id}', '${response.manager_id}')`;
              connection.query(query, (error) => {
                if (error) {
                  console.error(error);
                  return;
                }
                console.log("Added Employee to Database!");
                start();
              });
            });
        }
      );
    }
  );




function addDepartments() {
  connection.query("SELECT department_name FROM department", (error, results) => {
    if (error) {
      console.error(error);
      return;
    } 

    inquirer
      .prompt({
        type: "input",
        name: "department_name",
        message: "What is the name of the department?",
      })
      .then((response) => {
         const query = `INSERT INTO department (department_name) VALUES ('${response.department_name}')`;
         connection.query(query, (error) => {
              if (error) {
                console.error(error);
                return;
              }
              console.log("Added department to the database!");
              start();
   });
          });
      }
    );
  };




//  function updateEmployee() {
// const employees = "SELECT employee.employee_id, employee.first_name, employee.last_name, roles.title FROM employee LEFT JOIN roles ON employee.role_id = roles.id";
//    const roles = "Select * FROM roles";
//   connection.query (employees,(error, employees) => {
//     if (error) throw error;
//     connection.query (roles,(error, roles) => {
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
// //         const employee = resEmployees.find(
// //           (employee) =>
// //             `${employee.first_name} ${employee.last_name}` === response.employee
// //           );
//           // const role = resRoles.find(
//           //    (role) => role.title === response.role
//           //  );
//            const query =
//          `UPDATE employee SET role_id WHERE id = ('${response.role_id')`
//          connection.query(
//            query, [role.id, employee.id],
//            (error, result) => {
//                if (error) throw error;
//           );
//            start();
//  }
//      })
//    })
//  };
