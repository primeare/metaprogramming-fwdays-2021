import vm from 'vm';

global.arr = [5, 7, 2, 3, 1, 4, 0];

export const script = new vm.Script(`
  [Math.min(...arr), Math.max(...arr)]
`);

const scriptMinMaxResult = script.runInThisContext();

const minMaxFunction = vm.compileFunction(`
  return [Math.min(...arr), Math.max(...arr)]
`, ['arr']);

const functionMinMaxResult = minMaxFunction(global.arr);

const contextMinMaxResult = vm.runInThisContext(`
  [Math.min(...arr), Math.max(...arr)]
`);

console.log(scriptMinMaxResult);
console.log(functionMinMaxResult);
console.log(contextMinMaxResult);
