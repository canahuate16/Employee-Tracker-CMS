const mysql = require("mysql");
const inquirer = require("inquirer");
require ('dotenv').config();


// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // My port;
  port: 3306,

  // My username
  user: "root",

  // My password
  password: process.env.DB_PASSWORD,

  database: "employee_DB",
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});
//start the series of questions to the user
function start() {
  inquirer
    .prompt({
      name: "user_choice",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Departments",
        "View All Roles",
        "Add Employee",
        "Add Department",
        "Add Role",
        "Update Department",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager",
        "Exit"
      ],
    }).then((choice) => {

      switch (choice.user_choice) {
        case "Add Employee":
          addEmployee();
          break;
        case "Add Role":
          addEmployeeRole();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "View All Employees":
          viewAllEmployees();
          break;
        case "View All Departments":
          viewDepartments();
          break;
        case "View All Roles":
          viewRoles();
          break;
        case "Update Employee Role":
          updateRole();
          break;
        case "Exit":
          exit();
          break;
      }
    });
}
//adding an employee
function addEmployee() {
  inquirer
    .prompt([
      {
        name: "first_name",
        type: "input",
        message: "What is the employee's first name?",
      },
      {
        name: "last_name",
        type: "input",
        message: "What is the employee's last name?",
      },
      {
        name: "employee_role",
        type: "type",
        message: "Enter the role ID #",
      },
      // {
      //   name: "manager_id",
      //   type: "input",
      //   message: "what is the employee's manager ID?",
      // },
    ])
    .then((answer) => {
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.first_name,
          last_name: answer.last_name,
          role_id: answer.employee_role,
          // manager_id: answer.manager_id,
        },
        function (err) {
          if (err) throw err;
          console.log("Employee was added");
          start();
        }
      );
    });
}
//Add employee role
function addEmployeeRole() {
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "What role are you adding?",
      },
      {
        name: "salary",
        type: "input",
        message: "What is the salary for this role?",
      },
      {
        name: "dept_id",
        type: "type",
        message: "What is the department ID?",
      },
    ])
    .then((answer) => {
      connection.query(
        "INSERT INTO role SET ?",
        {
          title: answer.title,
          salary: answer.salary,
          dept_id: answer.dept_id,  //do I need to ask this or is this being joined from somewhere else?
        },
        function (err) {
          if (err) throw err;
          console.log("A role has been added");
          start();
        }
      );
    });
}
//add department

function addDepartment() {
  inquirer
    .prompt([
      {
        name: "dept_name",
        type: "input",
        message: "What is the department's name?",
      },
    ])
    .then((answer) => {
      connection.query(
        "INSERT INTO department SET ?",
        {
          dept_name: answer.dept_name,
        },
        function (err) {
          if (err) throw err;
          console.log("Departmentadded");
          start();
        }
      );
    });
}
//update employee role
function updateRole() {
  inquirer
    .prompt([
      {
        name: "selectEmployee",
        type: "input",
        message: "Which employee would you like to update?",

      },

      {
        type: "input",
        message: "What is the new role being updated?",
        name: "updateRole"
      }
    ])
    .then(function (answer) {
      // let query = `INSERT INTO department (name) VALUES ("${answer.deptName}")`
      //let query = `'UPDATE employee SET role_id=${answer.updateRole} WHERE first_name= ${answer.selectEmployee}`;
      //console.log(query);

      connection.query('UPDATE employee SET role_id=? WHERE first_name= ?', [answer.updateRole, answer.selectEmployee],
        function (err, res) {
          if (err) throw err;
          console.table(res);
          start();
        });
    });
}

//view all employees
function viewAllEmployees() {
  // select from the db
  let query = "SELECT * FROM employee";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });

  // show the result to the user (console.table)
}


function viewDepartments() {
  // select from the db
  let query = "SELECT * FROM department";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });

  // show the result to the user (console.table)
}


function viewRoles() {
  // select from the db
  let query = "SELECT * FROM role";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });

  // show the result to the user (console.table)
}

function exit() {
  connection.end;
  process.exit();
}







// function viewAllEmployees(){
//     connection.query ("SELECT * FROM employee", function (err,results){
//         if (err) throw err;
//         inquirer
//         .prompt ([
//             {
//                 name: "employee",
//                 type: "rawlist",
//                 employees: function(){
//                     var employeeArray = [];
//                     for (let i = 0; i < results.length; i++) {
//                          employeeArray.push( results[i].first_name);

//                     }
//                     return employeeArray;
//                 },
//                 message: "Select an employee"
//             },
//         ])
//         .then(function(answer) {
//             // get the information of the chosen employe
//             let selectedEmployee;
//             for (var i = 0; i < results.length; i++) {
//               if (results[i].first_name === answer.employee) {
//                 selectedEmployee = results[i];
//               }
//             }

//         connection.query(
//           "UPDATE employee SET ? WHERE ?",
//           [
//             {
//               highest_bid: answer.bid
//             },
//             {
//               id: chosenItem.id
//             }
//           ],
//           function(error) {
//             if (error) throw err;
//             console.log("Bid placed successfully!");
//             start();
//           }
//         );

//       else {
//         // bid wasn't high enough, so apologize and start over
//         console.log("Your bid was too low. Try again...");
//         start();
//       }
//     });

//     })
// }


