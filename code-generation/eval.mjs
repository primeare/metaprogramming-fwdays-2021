const json = '{"a":1,"b":2,"c":true,"d":"string","e":null}';

const evalJSON = eval('(' + json + ')');

const staticCodeExecutionResult = eval(`
  const a = 7;
  const b = 243;
  a * b;
`);

const dynamicCodeExecutionResult = (arr) => eval(`
  [Math.min(${arr}), Math.max(${arr})]
`);

console.log(evalJSON);
console.log(staticCodeExecutionResult);
console.log(dynamicCodeExecutionResult([5, 7, 2, 3, 1, 4, 0]));
