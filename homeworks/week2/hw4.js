function printFactor(n) {
    var answer = ''
    for (var i=1;i<=n;i++){
        if (n%i===0)
            console.log(i)
    }

}

printFactor(10);
