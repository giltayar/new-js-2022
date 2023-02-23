// Let's require an ESM module

// This won't work because a SYNC method ("require") can't be used to call ASYNC functionality (ESM Loading)
// This will fail whether the module has top level await or not, because ESM loading is ASYNC
// Now let's try this in ESM.
// Goto ./04-top-level-await-import.js
