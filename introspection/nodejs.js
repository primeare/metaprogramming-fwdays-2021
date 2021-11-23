console.log(__dirname); // => /path/to/the
console.log(__filename); // => /path/to/the/nodejs.js

console.log(require.main); // metadata of the entrypoint module
console.log(require.main === module); // is an entrypoint module

console.log(module.filename); // => /path/to/the/nodejs.js
console.log(module.path); // => /path/to/the
