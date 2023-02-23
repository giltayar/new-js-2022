// Does top-level await work in CJS?

const { setTimeout } = require('timers/promises')

await setTimeout(500)
console.log('done')

// It doesn't! Why? Let's understand by "require"-ing ESM code with top-level await
// So... let's go to ./04-top-level-await-import.cjs
