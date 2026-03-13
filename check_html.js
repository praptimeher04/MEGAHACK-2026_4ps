
const fs = require('fs');
const content = fs.readFileSync('d:\\Hackethon\\frontend\\src\\app\\super-admin\\super-admin.html', 'utf8');

let divOpen = 0;
let divClose = 0;
let tableOpen = 0;
let tableClose = 0;

const lines = content.split('\n');
lines.forEach((line, index) => {
  const openDivs = (line.match(/<div/g) || []).length;
  const closeDivs = (line.match(/<\/div>/g) || []).length;
  divOpen += openDivs;
  divClose += closeDivs;
  
  const openTables = (line.match(/<table/g) || []).length;
  const closeTables = (line.match(/<\/table>/g) || []).length;
  tableOpen += openTables;
  tableClose += closeTables;
  
  if (divOpen < divClose) {
    console.log(`Potential imbalance at line ${index + 1}: ${line.trim()}`);
    console.log(`Current counts - Open: ${divOpen}, Close: ${divClose}`);
  }
});

console.log(`Total: Div Open ${divOpen}, Close ${divClose}`);
console.log(`Total: Table Open ${tableOpen}, Close ${tableClose}`);
