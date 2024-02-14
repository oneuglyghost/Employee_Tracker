const { viewAllDepartments, addDepartment } = require('../db/queries');

const getAllDepartments = async () => {
  return await viewAllDepartments();
};

const createDepartment = async (name) => {
  return await addDepartment(name);
};

module.exports = {
  getAllDepartments,
  createDepartment
};