function join(arr, concatStr) {
  var result = arr.toString()
  var ans = ''
  for (var i = 0; i < arr.length-1; i++) {
    ans += arr[i] + concatStr 
  }
  return ans + arr[arr.length-1]
}

function repeat(str, times) {
  var answer = ''
  for (var i=0;i<=times;i++){
      answer+=str
  }
  return answer
}

console.log(join(['a'], '!'));
console.log(join([1, 2, 3], '')) //正確回傳值：123
console.log(join(["a", "b", "c"], "!")) //正確回傳值：a!b!c
console.log(join(["a", 1, "b", 2, "c", 3], ',')) //正確回傳值：a, 1, b, 2, c, 3
console.log(repeat('a', 5));
