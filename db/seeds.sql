INSERT INTO department (name)
  VALUES ('Sales'),
  ('Research'),
  ('Marketing'),
  ('Business'),
  ('HR');

  INSERT INTO role (title, salary, department_id)
  VALUES ('CEO', 300000, 4),
  ('CFO', 250000, 4),
  ('CTO', 250000, 4),
  ('Sales Lead', 150000, 1),
  ('Sales Rep', 90000, 1),
  ('Sales Intern', 40000, 1),
  ('Lead Researcher', 150000, 2),
  ('Researcher', 100000, 2),
  ('Research Intern', 40000, 2),
    ('Marketing Lead', 150000, 3),
  ('Marketing Rep', 90000, 3),
  ('Marketing Intern', 40000, 3),
    ('Admin', 80000, 5),
  ('HR Rep', 70000, 5);

  INSERT INTO employee (first_name, last_name, role_id, manager_id)
  VALUES ('Sylva', 'Ryba', 1, NULL),
  ('Holger', 'Graner', 2, 1),
    ('Gabriel', 'Hsu', 3, 1),
      ('Arif', 'Steuben', 4, 1),
  ('Kiera', 'Germain', 5, 4),
  ('Jozefa', 'Bennett', 6, 4),
  ('Leyla', 'Stirling', 7, 1),
  ('Ige', 'Leigh', 8, 7),
  ('Isabel', 'Matsuda', 9, 7),
  ('Delia', 'Sandberg', 10, 1),
  ('Shayna', 'Kovac', 11, 10),
  ('Caron', 'Tisza', 12, 10),
  ('Nigul', 'Herbertson', 13, 1),
  ('Isaac', 'Lundin', 14, 13);