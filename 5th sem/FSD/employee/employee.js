const fs = require("fs");
const empId = process.argv[2];
const name = process.argv[3];
const joiningDate = process.argv[4];
const employee = `${empId}. ${name}. ${joiningDate}\n`;
fs.appendFileSync("employee.txt", employee);
console.log("Employee Saved");
