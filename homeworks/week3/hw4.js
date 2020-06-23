const readline = require('readline');

const lines = [];
const rl = readline.createInterface({
  input: process.stdin,
});

// 讀取到一行，先把這一行加進去 lines 陣列，最後再一起處理
rl.on('line', (line) => {
  lines.push(line);
});
// 反轉字串
function words(str) {
  let ans = '';
  for (let i = str.length - 1; i >= 0; i -= 1) {
    ans += str[i];
  }
  return ans;
}
// 判斷迴文
function solve(input) {
  const str = input[0];
  // 判斷反轉字串後是否等於反轉前
  if (words(str) === str) {
    console.log('True');
  } else {
    console.log('False');
  }
}
rl.on('close', () => {
  solve(lines);
});
