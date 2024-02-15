const inquirer = require("inquirer");
const { viewAllDepartments, viewAllRoles, viewAllEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole } = require("./db/queries");
const { departmentPrompt, rolePrompt, employeePrompt } = require("./utils/prompts");

const startApp = async () => {
  let continueApp = true;
  
  while (continueApp) {
    const { choice } = await inquirer.prompt([
      {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Exit"
         ]
      }
    ]);
    
    switch (choice) {
      case "View all departments":
        const departments = await viewAllDepartments();
        console.table(departments);
        break;

      case "View all roles":
        const roles = await viewAllRoles();
        console.table(roles);
        break;

      case "View all employees":
        const employees = await viewAllEmployees();
        console.table(employees);
        break;


      case "Add a department":
        const { name: departmentName } = await departmentPrompt();
        await addDepartment(departmentName);
        console.log("Department added successfully!");
        break;

      case "Add a role":
        const departmentsForRole = await viewAllDepartments();
        const { title, salary, departmentId } = await rolePrompt(departmentsForRole);
        await addRole(title, salary, departmentId);
        console.log("Role added successfully!");
        break;

      case "Add an employee":
        const rolesForEmployee = await viewAllRoles();
        const employeesForManager = await viewAllEmployees();
        const { firstName, lastName, roleId, managerId } = await employeePrompt(rolesForEmployee, employeesForManager);
        await addEmployee(firstName, lastName, roleId, managerId);
        console.log("Employee added successfully!");
        break;

      case "Update an employee role":
        const employeesForUpdate = await viewAllEmployees();
        const { employeeId, roleId: newRoleId } = await inquirer.prompt([
          {
            type: "list",
            name: "employeeId",
            message: "Select the employee to update:",
            choices: employeesForUpdate.map(employee => ({
              name: `${employee.first_name} ${employee.last_name}`,
              value: employee.id
            }))
          },
          {
            type: "list",
            name: "roleId",
            message: "Select the new role for the employee:",
            choices: rolesForEmployee.map(role => ({
              name: role.title,
              value: role.id
            }))
          }
        ]);
        await updateEmployeeRole(employeeId, newRoleId);
        console.log("Employee role updated successfully!");
        break;


      case "Exit":
        continueApp = false;
        break;

    }
  }
  
  console.log("Goodbye!");
  process.exit();
};

startApp();
