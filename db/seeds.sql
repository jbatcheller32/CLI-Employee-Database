INSERT INTO department (name)
VALUES ("Accounting"), 
       ("Sales"),
       ("Engineering"),
       ("Marketing"),
       ("Customer Service"); 


INSERT INTO roles (title, salary, department_id)
VALUES ("Billing Support", 50000, 1), 
       ("Accountant", 80000, 1), 
       ("Sales Manager", 80000, 2), 
       ("Sales Rep", 75000, 2), 
       ("Junior Software Engineer", 70000, 3), 
       ("Software Engineer", 100000, 3), 
       ("Lead Software Engineer", 120000, 3), 
       ("Senior Software Engineer", 170000, 3), 
       ("Data Engineer", 75000, 3), 
       ("Data Manager", 100000, 3), 
       ("Marketing Manager", 120000, 4), 
       ("Marketing Coordinator", 85000, 4), 
       ("Custom Service Rep", 45000, 5), 
       ("Technical Support", 50000, 5), 
       ("Customer Success Manager", 80000, 5);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("James", "Batcheller", 8, null), 
       ("Jessica", "Sherwood", 10, null), 
       ("Benjamin", "Sakas", 3, null), 
       ("Garrett", "Soares", 4, 4), 
       ("Mike", "Penhale", 2, 3), 
       ("Erica", "Voulle", 15, 11), 
       ("Corey", "Petersen", 10, null), 
       ("Ashley", "Owens", 7, 1), 
       ("Saint", "Navarez", 9, 10), 
       ("Shane", "O'Neil", 13, 15), 
       ("Cory", "Kennedy", 5, 8), 
       ("Paul", "Rodriguez", 5, 8), 
       ("Dylan", "Jaeb", 14, 15), 
       ("Chris", "Cole", 14, 15), 
       ("Frank", "Reynolds", 13, 15), 
       ("Ishod", "Wair", 5, 6);