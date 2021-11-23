class ClassToIntrospect {
  // constructor stores provided arguments
  constructor(a, b, c = 1) {
    this.a = a;
    this.b = b;
    this.c = c;
  }
}

console.log(ClassToIntrospect.name); // => ClassToIntrospect

console.log(ClassToIntrospect.length);
// => 2 (constructor length, one argument is optional)

console.log(ClassToIntrospect.toString());
/* =>
class ClassToIntrospect {
  // constructor stores provided arguments
  constructor(a, b, c = 1) {
    this.a = a;
    this.b = b;
    this.c = c;
  }
}
*/
