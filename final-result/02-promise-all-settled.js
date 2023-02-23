// Let's use this function for generating async code

async function swapi(path) {
  const response = await fetch(`https://swapi.dev/api/${path}`)

  if (!response.ok) throw new Error(`bad fetch ${path}`)

  return await response.json()
}

// Everybody knows about Promise.all, right?

console.log((await Promise.all([swapi('people/1'), swapi('people/1')])).map(p => p.name))

// But what if one of them errors?

// await Promise.all([swapi('people/1'), swapi('people/2'), swapi('peop')])

// But what if I want the result of everything?

// I can do this:

function always(p) {
  return p.catch(error => error)
}

console.log(await Promise.all([always(swapi('people/1')), always(swapi('peop'))]))

// Yeah, but this doesn't distinguish between regular result and error result

function settled(p) {
  return p.then(v => ({ value: v, status: 'fulfilled' })).catch(error => ({ reason: error, status: 'rejected' }))
}

console.log(await Promise.all([settled(swapi('people/1')), settled(swapi('peop'))]))

// There we go! Now we have this in JS

console.log(await Promise.allSettled([swapi('people/1'), swapi('peop')]))

// Something interesting here, which devs don't notice! Let's write two tasks:
// 1 fails after 1 second, the other succeeds after 5 seconds.

import { setTimeout } from 'node:timers/promises'

// In Promise.all, the Promise.all ends when the first Promise is settled (the rejection)
// BUT! The other promise continues "running". Never forget that! And it's weird and wrong.
await Promise.all([
  setTimeout(1000).then(_ => Promise.reject(1)),
  setTimeout(4000).then(_ => console.log('done')),
]).catch(_ => console.log('promise.all done'))

// Promise.allSettled ends when _all_ of the promises settle, so makes more sense
await Promise.allSettled([
  setTimeout(1000).then(_ => Promise.reject(1)),
  setTimeout(4000).then(_ => console.log('done')),
]).then(_ => console.log('promise.allSettled done'))

// How do we make the other task end when the other's end? We use AbortController
const ac = new AbortController()
await Promise.allSettled([
  setTimeout(1000)
    .then(_ => Promise.reject(1))
    .finally(_ => ac.abort()),
  setTimeout(4000, null, { signal: ac.signal }).finally(_ => console.log('done')),
]).then(_ => console.log('promise.allSettled done'))
