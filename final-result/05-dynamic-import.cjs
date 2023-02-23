// Remember how we couldn't require an ESM? Let's do so now!
// (No top level await! 😢)

async function main() {
  console.log(await import('./05-default-import.js'))
}

main()

// But that meanns that if I need an ESM package, then the path to it must be ASYNC!
// This is why migration to ESM in Node.js should be starting now!
//
// Now go back to the ESM module