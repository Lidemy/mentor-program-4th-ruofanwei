const readline = require('readline');

const lines = [];
const rl = readline.createInterface({
  input: process.stdin,
});

// 讀取到一行，先把這一行加進去 lines 陣列，最後再一起處理
rl.on('line', (line) => {
  lines.push(line);
});


// 回傳數字有幾位數
function digits(n) {
  let result = 0;
  let num = n;
  if (num === 0) return 1;
  while (num > 0) {
    // Math.floor 取得整數
    num = Math.floor(num / 10);
    // 每成功除10就加一次 計算除以10的次數
    result += 1;
  }
  return result;
}

// 回傳數字的位數次方後加總是否等於自己？
function Narcissistic(n) {
  let m = n;
  const dig = digits(m);
  let sum = 0;
  while (m > 0) {
    // 透過對10取餘數得知每一個數字
    sum += (m % 10) ** dig;
    m = Math.floor(m / 10);
  }
  return sum === n;
}
// 水仙花數
function solve(input) {
  // 5 200 => ['5','200']
  const temp = input[0].split(' ');
  const n = Number(temp[0]);
  const m = Number(temp[1]);
  for (let i = n; i <= m; i += 1) {
    if (Narcissistic(i)) {
      console.log(i);
    }
  }
}
rl.on('close', () => {
  solve(lines);
});
