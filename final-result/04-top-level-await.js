// It used to be, that to write async code, we needed to wrap it:

import { setTimeout } from 'timers/promises'

async function main() {
  await setTimeout(500)
  console.log('done')
}

main()

// now we don't need this scaffolding!

await setTimeout(500)
console.log('done')

// There's a caveat! It has to be in ESM. Let's try this in CJS:

// goto the same file in CJS...
