const exampleObject = { a: 1, b: 2 };

Object.assign({ a: 0 }, { b: 1 }); // => { a: 0, b: 1 }
Object.assign({}, 'abc'); // => { '0': 'a', '1': 'b', '2': 'c' }

Object.create({});
Object.create(null);
Object.fromEntries([['a', 1], ['b', 2]]); // => { a: 1, b: 2 }

Object.setPrototypeOf(exampleObject, {});
Reflect.setPrototypeOf(exampleObject, {});

Object.defineProperty(exampleObject, 'c', { value: 4 });
Reflect.defineProperty(exampleObject, 'c', { value: 4 });
Object.defineProperties(exampleObject, { d: { value: 5 } });

Object.freeze(exampleObject);
Object.preventExtensions(exampleObject);
Reflect.preventExtensions(exampleObject);
Object.seal(exampleObject);

Reflect.construct(Set, [[1, 2, 3]]); // = new Set([1, 2, 3])

Reflect.deleteProperty(exampleObject, 'a'); // = delete exampleObject.a;

Reflect.get(exampleObject, 'b'); // = exampleObject.b

Reflect.set(exampleObject, 'a', 1); // equals exampleObject.a = 1

class Example {
  a = 1;
  b = 2;
}

const example = new Example();

console.dir(example); // => Example { a: 1, b: 2 }
console.log(example.constructor); // => [class Example]
console.log(example instanceof Example); // => true

Object.assign(example, { c: 10 });

console.dir(example); // => Example { a: 1, b: 2, c: 10 }
console.log(example.constructor); // => [class Example]
console.log(example instanceof Example); // => true
