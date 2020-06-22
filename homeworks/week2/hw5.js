function join(arr, concatStr) {
  var result = arr.toString()
  var ans = ''
  for (var i = 0; i < arr.length; i++) {
      ans += arr[i] + concatStr
      
  }
  return ans
}

function repeat(str, times) {
  var answer = ''
  for (var i=0;i<=times;i++){
      answer+=str
  }
  return answer
}

console.log(join(['a'], '!'));
console.log(repeat('a', 5));
