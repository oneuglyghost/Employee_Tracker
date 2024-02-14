const { viewAllEmployees, addEmployee, updateEmployeeRole } = require('../db/queries');

const getAllEmployees = async () => {
  return await viewAllEmployees();
};

const createEmployee = async (firstName, lastName, roleId, managerId) => {
  return await addEmployee(firstName, lastName, roleId, managerId);
};

const updateEmployee = async (employeeId, roleId) => {
  return await updateEmployeeRole(employeeId, roleId);
};

module.exports = {
  getAllEmployees,
  createEmployee,
  updateEmployee
};