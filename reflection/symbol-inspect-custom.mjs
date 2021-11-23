const inspect = Symbol.for('nodejs.util.inspect.custom');

class User {
  constructor(name, age, password) {
    this.name = name;
    this.age = age;
    this.password = password;
  }

  static [Symbol.hasInstance](instance) {
    if (instance === this) return true;
    if (instance.password === '*****') return true;
    return false;
  }

  [inspect]() {
    const userFakePassword = {
      ...this,
      password: '*****',
    };

    Object.defineProperty(userFakePassword, 'constructor', {
      value: User,
      enumerable: false,
    });

    return userFakePassword;
  }
}

const user = new User('Charles Gibson', 54, 'SeCreT-PassW0rd');

console.log(user);
// => { name: 'Charles Gibson', age: 54, password: '*****' }
