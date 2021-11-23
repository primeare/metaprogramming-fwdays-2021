class User {
  constructor(name, age, password) {
    this.name = name;
    this.age = age;
    this.password = password;
  }

  [Symbol.toPrimitive](hint) {
    if (hint === 'number') {
      return this.age;
    }

    if (hint === 'string') {
      return `${this.name} (${this.age} years old)`;
    }

    return this;
  }
}

const user = new User('Charles Gibson', 54, 'SeCreT-PassW0rd');

console.log(+user); // => 54
console.log(`${user}`); // => Charles Gibson (54 years old)

console.log(user);
// => User { name: 'Charles Gibson', age: 54, password: 'SeCreT-PassW0rd' }
