const range = (start, end, step = 1) => {
  const iterator = {
    *[Symbol.iterator]() {
      for (let i = start; i <= end; i += step) {
        yield i;
      }
    }
  };

  const handlers = {
    has(target, key) {
      if (typeof key === 'symbol') {
        return Reflect.has(target, key);
      }

      let n = Number(key); // cast type to number

      if (n >= start && n <= end) {
        return true;
      }

      return false;
    }
  };

  return new Proxy(iterator, handlers);
};

// use

console.log(15 in range(10, 20));

for (const n of range(10, 20)) {
  console.log(n);
}
