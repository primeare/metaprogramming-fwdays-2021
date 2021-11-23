const functionToIntrospect = (a, b, c = 1) => {
  // returns a sum of arguments
  return a + b + c;
};

console.log(functionToIntrospect.length); // => 2 (one argument is optional)
console.log(functionToIntrospect.name); // => functionToIntrospect

console.log(functionToIntrospect.toString());
/* =>
(a, b, c = 1) => {
  // returns a sum of arguments
  return a + b + c;
}
*/
