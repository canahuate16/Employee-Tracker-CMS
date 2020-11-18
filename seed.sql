/* joins all the tables together based on the ID */

select * from employee
inner join role on employee.role_id = role.id
inner join department on role.dept_id = department.id;