const readline = require('readline');

const lines = [];
const rl = readline.createInterface({
  input: process.stdin,
});

// 讀取到一行，先把這一行加進去 lines 陣列，最後再一起處理
rl.on('line', (line) => {
  lines.push(line);
});

function isPrime(p) {
  if (p === 1) return 'Composite';
  // 找根號以內的數就好
  const num = Math.sqrt(p);
  for (let i = 2; i <= num; i += 1) {
    if (p % i === 0) {
      return 'Composite';
    }
  } return 'Prime';
}
// 判斷質數
function solve(input) {
  for (let i = 1; i < input.length; i += 1) {
    console.log(isPrime(Number(input[i])));
  }
}
rl.on('close', () => {
  solve(lines);
});
