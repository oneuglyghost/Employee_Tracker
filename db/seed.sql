/*--departments-*/
INSERT INTO department (name) VALUES
("engineering"),
("marketing"),
("sales");

/*--roles-*/
INSERT INTO role (title, salary, department_id) VALUES
("software engineer", 80000, 1),
("marketing manager", 90000, 2),
("sales representative", 60000, 3);


/*--employees-*/
INSERT Into employee (first_name, last_name, role_id, manager_id) VALUES
("john", "doe", 1, NULL),
("jane", "smith", 2, 1),
("michael", "johnson", 3, 1);