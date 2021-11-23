import vm from 'vm';
import Benchmark from 'benchmark';

// Prepare

global.arr = [5, 7, 2, 3, 1, 4, 0];

export const script = new vm.Script(`
  [Math.min(...arr), Math.max(...arr)]
`);

const minMaxFunction = vm.compileFunction(`
  return [Math.min(...arr), Math.max(...arr)]
`, ['arr']);

const minMax = new Function('arr', 'return [Math.min(...arr), Math.max(...arr)]');

const generalMinMax = (arr) => {
  return [Math.min(...arr), Math.max(...arr)];
};

// Benchmark

const suite = new Benchmark.Suite;

suite.add('general function', () => {
  return generalMinMax(global.arr);
});

suite.add('VM compileFunction', () => {
  return minMaxFunction(global.arr);
});

suite.add('VM runInThisContext', () => {
  return vm.runInThisContext(`
    [Math.min(...arr), Math.max(...arr)]
  `);
});

suite.add('VM script.runInThisContext', () => {
  return script.runInThisContext();
});

suite.add('eval', () => {
  return eval('[Math.min(...arr), Math.max(...arr)]');
});

suite.add('new Function', () => {
  return minMax(global.arr);
});

// Add listeners

suite.on('cycle', (event) => {
  console.log(String(event.target));
});

suite.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
});

suite.on('error', (err) => console.error(err));

// Run async benchmark

suite.run({ async: true });
