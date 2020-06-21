function capitalize(str) {
  var answer = ''
  if (str[0] >= 'a' && str[0] <= 'z') {
      answer = str[0].toUpperCase()
  } else answer = str[0]
  for (var i = 1; i < str.length; i++) {
      answer += str[i]
  }
  return answer
}

console.log(capitalize('hello'));
