const readline = require('readline');

const lines = [];
const rl = readline.createInterface({
  input: process.stdin,
});

// 讀取到一行，先把這一行加進去 lines 陣列，最後再一起處理
rl.on('line', (line) => {
  lines.push(line);
});

// 好多星星
function solve(input) {
  const n = Number(input[0]);
  for (let i = 1; i <= n; i += 1) {
    console.log('*'.repeat(i));
  }
}
rl.on('close', () => {
  solve(lines);
});
