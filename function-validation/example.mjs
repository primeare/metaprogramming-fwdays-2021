import { validate } from './lib.mjs';

const validatedFunction = validate((userName /* string */, userAge /* number */, callback /* function */) => {
  // here we are sure that arguments are of a valid type
});


validatedFunction('Charles Gibson', 54, null); // => throws an error
