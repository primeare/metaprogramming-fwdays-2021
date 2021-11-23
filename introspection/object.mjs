const symbol = Symbol('for object');

const objToIntrospect = {
  keyOne: 1,
  keyTwo: 10n,
  keyThree: true,
  keyFour: 'string',
  [symbol]: null,
};

console.log(objToIntrospect.constructor); // => link to [Function: Object]
console.log((100).constructor); // => link to [Function: Number]
console.log((true).constructor); // => link to [Function: Boolean]
console.log((() => {}).constructor); // => link to [Function: Function]

console.log(objToIntrospect.prototype); // => undefined

console.log(Object.getPrototypeOf(objToIntrospect));
// => [Object: null prototype] {}

console.log(Reflect.getPrototypeOf(objToIntrospect));
// => [Object: null prototype] {}

console.log(Object.keys(objToIntrospect));
// => [ 'keyOne', 'keyTwo', 'keyThree', 'keyFour' ]

console.log(Object.getOwnPropertyNames(objToIntrospect));
// => [ 'keyOne', 'keyTwo', 'keyThree', 'keyFour' ]

console.log(Object.getOwnPropertySymbols(objToIntrospect));
// => [ Symbol(for object) ]

console.log(Reflect.ownKeys(objToIntrospect));
// => [ 'keyOne', 'keyTwo', 'keyThree', 'keyFour', Symbol(for object) ]

console.log(Object.values(objToIntrospect));
// => [ 1, 10n, true, 'string' ]

console.log(Object.entries(objToIntrospect));
// => [['keyOne', 1], ['keyTwo', 10n], ['keyThree', true], ['keyFour', 'string']]

console.log(Object.prototype.hasOwnProperty.call(objToIntrospect, 'keyOne'));
// => true

console.log(Object.hasOwn(objToIntrospect, 'keyOne')); // => true
console.log(Reflect.has(objToIntrospect, 'keyOne')); // => true

console.log(Object.isExtensible(objToIntrospect)); // => true
console.log(Reflect.isExtensible(objToIntrospect)); // => true

console.log(Object.isFrozen(objToIntrospect)); // => false
console.log(Object.isSealed(objToIntrospect)); // => false

console.log(Object.getOwnPropertyDescriptor(objToIntrospect, symbol));
// => { value: null, writable: true, enumerable: true, configurable: true }

console.log(Reflect.getOwnPropertyDescriptor(objToIntrospect, symbol));
// => { value: null, writable: true, enumerable: true, configurable: true }

console.log(Object.getOwnPropertyDescriptors(objToIntrospect));
/* =>
{
  keyOne: { value: 1, writable: true, enumerable: true, configurable: true },
  keyTwo: { value: 10n, writable: true, enumerable: true, configurable: true },
  keyThree: { value: true, writable: true, enumerable: true, configurable: true },
  keyFour: { value: 'string', writable: true, enumerable: true, configurable: true },
  [Symbol(for object)]: { value: null, writable: true, enumerable: true, configurable: true }
}
*/
