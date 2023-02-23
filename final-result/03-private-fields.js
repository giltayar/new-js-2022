// I don't use class. I never found a use for it!
// But some people do, so this is for them.


class Circle {
  constructor(radius) {
    this.r = radius;
  }

  circumference() {
    return 2 * Math.PI * this.r;
  }

  area() {
    return Math.PI * this.r ** 2;
  }
}

// But let's say I want to hide `r`. I can do this, which is what lots of people do


class Circle2 {
  constructor(radius) {
    this._r = radius;
  }

  circumference() {
    return 2 * Math.PI * this._r;
  }

  area() {
    return Math.PI * this._r ** 2;
  }
}

// This is nice, and for me, sufficient enough!
// (well, I would do wihout, but that's me:)

function makeCircle(radius) {
  return {
    circumference() {
      return 2 * Math.PI * radius;
    },

    area() {
      return Math.PI * radius ** 2;
    }
  }
}

// But for some use cases, the need to hide is real (e.g. API-s). We can do this:
const r = Symbol()

export class Circle3 {
  constructor(radius) {
    this[r] = radius;
  }

  circumference() {
    return 2 * Math.PI * this[r];
  }

  area() {
    return Math.PI * this[r] ** 2;
  }
}

// But we can still enumerate the properties and get at the private field
const c = new Circle3(42)

console.log(Object.getOwnPropertySymbols(c))

// And use that to get at the field:

console.log(c[Object.getOwnPropertySymbols(c)[0]])

// ouch.
// So whadda we do? We use private fields!

class Circle4 {
  #r

  constructor(radius) {
    this.#r = radius;
  }

  circumference() {
    return 2 * Math.PI * this.#r;
  }

  area() {
    return Math.PI * this.#r ** 2;
  }
}

// Now nobody can access the field outside the class!
console.log(Object.getOwnPropertyDescriptors(new Circle4()))

// Let's try and circumvent by injecting a function into the object!

const c4 = new Circle4()

// c4.hackIt = function() {return this.#r}

// console.log(c4.hackIt())

// What about injecting it into the proototype?

// Object.getPrototypeOf(c4).hackIt = function() {return this.#r}

// No way to circumvent it!
