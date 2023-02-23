// So let's import the file

import './04-top-level-await.js'

// This works because the whole way ESM is imported in Node.js is ASYNC!

// But we _can_ import a CJS module. Because ASYTNC can call SYNC.,
// import './04-zync.cjs'

// And did you notice how the CJS SYNC console log happened _before_ the ASYNC ESM top-level await! 🎉
