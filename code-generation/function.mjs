const json = '{"a":1,"b":2,"c":true,"d":"string","e":null}';

const parseJSON = new Function('json', 'return JSON.parse(json)');
const parseJSONResult = parseJSON(json);

const multiply = new Function('a', 'b', 'return a * b');
const multiplyResult = multiply(7, 243);

const arr = [5, 7, 2, 3, 1, 4, 0];
const minMax = new Function('arr', 'return [Math.min(...arr), Math.max(...arr)]');
const minMaxResult = minMax(arr);

console.log(parseJSONResult);
console.log(multiplyResult);
console.log(minMaxResult);
