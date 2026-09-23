const fs = require("fs");
let data = fs.readFileSync("employee.txt", "utf-8");
console.log("Before Edit:");
console.log(data);
data = data.replace("Rahul", "Rahul Sharma");
fs.writeFileSync("employee.txt", data);
console.log("After Edit:");
console.log(data);