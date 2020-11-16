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
      "Update Employee Role",
      "Update Department",
      "Remove Employee",
      "Update Employee Role",
      "Update Employee Manager",
    ],
  }).then((choice) => {
    // if (choice.user_choice === "Add Employee") {
    //     addEmployee();
    // }
    switch (choice.user_choice) {
      case "Add Employee":
        addEmployee();
        break;
      case "Update Employee Role":
        updateEmployeeRole();
        break;
      case "Update Department":
        updateDepartment();
        break;
      case "View All Employees":
        viewAllEmployees();
        break;
      case "View all Employees By Department":
        viewByDept();
        break;
      case "View All Employees by Manager":
        viewByManager();
        break;
      case "Update Employee Role":
        updateRole();
        break;
    }
  });
}

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
        message: "What is the employee's role?",
      },
      {
        name: "manager_id",
        type: "input",
        message: "what is the employee's manager ID?",
      },
    ])
    .then((answer) => {
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.first_name,
          last_name: answer.last_name,
          role_id: answer.employee_role,
          manager_id: answer.manager_id,
        },
        function (err) {
          if (err) throw err;
          console.log("Employee was added");
          start();
        }
      );
    });
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


start();
