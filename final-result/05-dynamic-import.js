// So we've seen imports, right? Those are static. But what if we want to import based on a condition?

const { setTimeout } =
  typeof document == null ? await import('./node-timers-polyfill.js') : await import('node:timers/promises')

await setTimeout(1000)

// Nice! Note the "await". We now know why this is, right?

// Note that "import" is interesting. It looks like a function, but IS NOT!

//* const import = function() {}

// You can't override it! 😱
// Because it's NOT a function. It's a "syntactic form"
// Why? To enable static analysis of a file to determine all the imports
// BTW, event in CJS files you _cannot_ override it! How is that possible? Because
// JS reserved the "import" (and "export") as a keyword from a long time ago, even before ESM.
// What about default imports? They come out as a named import named "default":

const defaultImport = (await import('./05-default-import.js')).default

console.log(defaultImport)

// Let's go to ./05-dynamic-import.cjs to see how this is used in CJS
//
// Back!
//
// Initial commit: September 2016
// Stage 2: October 2016 (there never was a stage 1)
// Stage 4: June 2019
//
// 3 years!
