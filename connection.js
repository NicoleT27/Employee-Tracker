const Sequelize = require("sequelize");

const connection = mysql.createConnection({
  host: "localhost",
  dialect: "root",
  database: "departments",
  password: "password",
  port: 3306,
});