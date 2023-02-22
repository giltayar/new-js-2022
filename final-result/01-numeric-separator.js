//@ts-check

// This is a small number

const smallNumber = 100

// easy, right? Now what about this?

const largeNumber = 100000000

// Is it a million? 10 million? A billion? 🤷‍♂️

const sameButWithSeparators = 100_000_000

// So, yeah. 100 million!

// Notice that you can put them anywhere, so you can confuse people!

const badSeparators = 10_000_0000

// Interestingly, most modern languages have this feature, and they all use "_"!

// But you can't put it in front...

const prefix = _1000

// Or in the back

const suffix = 1000_

// And don't forget all nubers are floating point...

const float = 2_999.4_400

// And no prefix, once again...

const floatPrefix = 2_999._400

// It's one of those little things that make a language easier to use. Love those!


// Stage 4: July 2020
// Iniital commit: April 2017
// Stage 1: May 2017

// Three years!

