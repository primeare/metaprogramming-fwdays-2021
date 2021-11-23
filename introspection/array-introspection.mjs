const arr = [1, 2, 3];

console.log(Reflect.ownKeys(arr)); // => [ '0', '1', '2', 'length' ]
console.log(arr.toString()); // => '1, 2, 3'
console.log(typeof arr); // => 'object'

console.log(Reflect.ownKeys(Array.prototype));
/* =>
[
  'length',
  'constructor',
  'concat',
  'copyWithin',
  'fill',
  'find',
  'findIndex',
  'lastIndexOf',
  'pop',
  'push',
  'reverse',
  'shift',
  'unshift',
  'slice',
  'sort',
  'splice',
  'includes',
  'indexOf',
  'join',
  'keys',
  'entries',
  'values',
  'forEach',
  'filter',
  'flat',
  'flatMap',
  'map',
  'every',
  'some',
  'reduce',
  'reduceRight',
  'toLocaleString',
  'toString',
  'at',
  Symbol(Symbol.iterator),
  Symbol(Symbol.unscopables)
]
*/

console.log(arr[Symbol.iterator].toString());
// => function values() { [native code] }

console.log(arr[Symbol.unscopables]);
/* =>
[Object: null prototype] {
  copyWithin: true,
  entries: true,
  fill: true,
  find: true,
  findIndex: true,
  flat: true,
  flatMap: true,
  includes: true,
  keys: true,
  values: true,
  at: true
}
*/
