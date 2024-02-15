const connection = require('./connection');

const viewAllDepartments = async() => {
    const [rows]= await (await connection).execute("SELECT id, name FROM department");
    return rows;
};

const viewAllRoles = async() => {
    const [rows]= await (await connection).execute("SELECT r.id, r.title, r.salary, d.name AS department FROM role r INNER JOIN department d ON r.department_id = d.id");
    return rows;
};

const viewAllEmployees = async () => {
    const [rows] = await (await connection).execute('SELECT e.id, e.first_name, e.last_name, r.title AS job_title, d.name AS department, r.salary, CONCAT(m.first_name, " ", m.last_name) AS manager FROM employee e LEFT JOIN role r ON e.role_id= r.id LEFT JOIN department d ON r.department_id = d.id LEFT JOIN employee m ON e.manager_id = m.id');
    return rows; 
};
const addDepartment = async (name) => {
    const [result] = await (await connection).execute('INSERT INTO department (name) VALUES (?)', [name]);
    return result.insertId;
};

const addRole = async (title, salary, departmentId) => {
    const [result] = await (await connection).execute('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, departmentId]);
    return result.insertId;
};

const addEmployee = async (firstName, lastName, roleId, managerId) => {
    const [result] = await (await connection).execute('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, roleId, managerId]);
    return result.insertId;
};

const updateEmployeeRole = async (employeeId, roleId) => {
    const [result] = await (await connection).execute('UPDATE employee SET role_id = ? WHERE id = ?', [roleId, employeeId]);
    return result.affectedRows > 0;
};

module.exports = {
    viewAllDepartments,
    viewAllRoles,
    viewAllEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole
};
