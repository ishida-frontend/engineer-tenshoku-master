function testFunc() {
  var testVar = 'test'
  console.log(testVar)
}

testFunc()

unusedFunction = () => {
  console.log('This function is never used.')
}

for (var i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i)
  }, 100 * i)
}
