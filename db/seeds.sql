INSERT INTO department (dept_name)
VALUES 
    ("Accounting"),
    ("Sales"),
    ("IT"),
    ("Engineering"),
    ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES 
    ("Accountant", 100000, 1),
    ("Account Manager", 130000, 1),
    ("Salesperson", 75000, 2),
    ("Lead Salesperson", 90000, 2),
    ("Technician", 70000, 3),
    ("IT Admin", 100000, 3),
    ("Associate Engineer", 110000, 4),
    ("Lead Engineer", 140000, 4),
    ("Lawyer", 110000, 5),
    ("Legal Admin", 140000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ('Tiphany', 'Lyenyng', 2, NULL),
    ('BORD', 'Crowch', 1, 1),
    ('Ronnica', 'Sackes', 1, 1),
    ('Elroy', 'Stitle', 4, NULL),
    ('Maribelle', 'Witnall', 3, 4),
    ('Roth', 'Dutt', 3, 4),
    ('Genovera', 'Wadrey', 6, NULL),
    ('Irvine', 'Louisot', 5, 7),
    ('Erinn', 'Preene', 5, 7),
    ('Shelia', 'Taffurelli', 8, NULL),
    ('Ximenex', 'Delaney', 7, 10),
    ('Kristi', 'Tabord', 7, 10),
    ('Ethelbert', 'Phillippou', 10, NULL),
    ('Chery', 'Trolley', 9, 13),
    ('Arlen', 'Starmore', 9, 13);
