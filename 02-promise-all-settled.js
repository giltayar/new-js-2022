// Let's use this function for generating async code

async function swapi(path) {
  const response = await fetch(`https://swapi.dev/api/${path}`)

  if (!response.ok) throw new Error(`bad fetch ${path}`)

  return await response.json()
}

// Everybody knows about Promise.all, right?

// But what if one of them errors?

// But what if I want the result of everything? Let's define `always`

// Yeah, but this doesn't distinguish between regular result and error result. Let's try again

// There we go! Now we have this in JS

// Something interesting here, which devs don't notice! Let's write two tasks:
// 1 fails after 1 second, the other succeeds after 5 seconds.

import { setTimeout } from "node:timers/promises"

// In Promise.all, the Promise.all ends when the first Promise is settled (the rejection)
// BUT! The other promise continues "running". Never forget that! And it's weird and wrong.

// Promise.allSettled ends when _all_ of the promises settle, so makes more sense

// How do we make the other task end when the other's end? We use AbortController
