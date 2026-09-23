const fs = require("fs");
let data = fs.readFileSync("employee.txt", "utf-8");
let characters = data.length;
let lines = data.split("\n").filter(line => line.length > 0).length;
let words = data.trim().split(/\s+/).length;
console.log("Number of Words:", words);
console.log("Number of Lines:", lines);
console.log("Number of Characters:", characters);