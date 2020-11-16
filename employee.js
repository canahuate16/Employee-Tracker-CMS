const mysql = require("mysql");
const inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // My port;
  port: 8080,

  // My username
  user: "root",

  // My password
  password: "Etauhanac16",
  database: "Employee_DB",
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

function start() {
  inquirer({
    name: "user_choice",
    type: "list",
    message: "What would you like to do?",
    choices: [
      "View All Employees",
      "View all Employees By Department",
      "View All Employees by Manager",
      "Add Employee",
      "Add Employee Role",
      "Add Department",
      "Remove Employee",
      "Update Employee Role",
      "Update Employee Manager",
    ],
  })
  .then((choice) => {
    // if (choice.user_choice === "Add Employee") {
    //     addEmployee();
    // }
    switch (choice.user_choice){
        case 'Add Employee':
            addEmployee()
            break;
        case "Add Employee Role":
            addEmployeeRole()
            break;
        case 'Add Department':
            addDepartment()
            break;
        case  "View All Employees":
            viewAllEmployees()
            break;
        case "View all Employees By Department":
            viewByDept()
            break;
        case "View All Employees by Manager":
            viewByManager()
            break;
        case  "Update Employee Role":
            updateRole()
            break;
    }
  })
}

