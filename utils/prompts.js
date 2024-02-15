const inquirer = require("inquirer");

const departmentPrompt = () => {
    return inquirer.createPromptModule([
        {
            type:"input",
            name: "name",
            message: "Enter the department name:"
        }
    ]);
};

const rolePrompt = async (departments) => {
    return inquirer.prompt([
        {
            type:"input",
            name: "title",
            message: "Enter the role title:"
        },
        {
            type: "number",
            name: "salary",
            message: "Enter the role salary:"
        },
        {
            type: "list",
            name: "departmentId",
            message: "Select the department:",
            choices: departments.map(department => ({
              name: department.name,
              value: department.id
            }))
        }
    ]);
};

const employeePrompt =async (role,employees) => {
    return inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "Enter the employee\"s first name:"
          },
          {
            type: "input",
            name: "lastName",
            message: "Enter the employee\"s last name:"
          },
          {
            type: "list",
            name: "roleId",
            message: "Select the employee\"s role:",
            choices: roles.map(role => ({
              name: role.title,
              value: role.id
            }))
          },
          {
            type: "list",
            name: "managerId",
            message: "Select the employee\"s manager:",
            choices: [{ name: "None", value: null }, ...employees.map(employee => ({
              name: `${employee.first_name} ${employee.last_name}`,
              value: employee.id
            }))]
          }
    ]);
};

module.exports = {
    departmentPrompt,
    rolePrompt,
    employeePrompt
};