const range = (start, end, step = 1) => ({
  *[Symbol.iterator]() {
    for (let i = start; i <= end; i += step) {
      yield i;
    }
  }
});

for (const n of range(10, 20)) {
  console.log(n); // => 10...20
}
