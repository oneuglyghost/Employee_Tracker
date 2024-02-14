const { viewAllRoles, addRole } = require('../db/queries');

const getAllRoles = async () => {
  return await viewAllRoles();
};

const createRole = async (title, salary, departmentId) => {
  return await addRole(title, salary, departmentId);
};

module.exports = {
  getAllRoles,
  createRole
};