const fs = require("fs");
const text = fs.readFileSync("sample.txt", "utf-8");
const characters = text.length;
const lines = text.split("\n").length;
const words = text.trim().split(/\s+/).length;
console.log("Number of words:", words);
console.log("Number of lines:", lines);
console.log("Number of characters:", characters);

