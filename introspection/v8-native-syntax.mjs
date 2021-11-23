// run this file using command `node --allow_natives_syntax v8-native-syntax.mjs`

const exampleFunction = (...args) => Math.max(...args);

console.log(%FunctionGetScriptSourcePosition(exampleFunction)); // => 97

// See also: https://github.com/v8/v8/blob/master/src/runtime/runtime.h#L868
console.log(%GetOptimizationStatus(exampleFunction));

console.log(%FunctionGetScriptSource(exampleFunction));
