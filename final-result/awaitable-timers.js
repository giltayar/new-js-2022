// Copied (and modified) from https://github.com/jasnell/awaitable-timers/blob/main/index.js

class AbortError extends Error {
  constructor() {
    super('The operation was aborted');
    this.code = 'ABORT_ERR';
    this.name = 'AbortError';
  }
}

class ERR_INVALID_ARG_TYPE extends TypeError {
  constructor(name, type) {
    super(`${name} must be of type ${type}`);
    this.code = 'ERR_INVALID_ARG_TYPE';
  }
}

const _setTimeout = globalThis.setTimeout;

function cancelListenerHandler(timer, clear, reject) {
  clear(timer);
  reject(new AbortError());
}

function validateAbortSignal(signal, name) {
  if (signal !== undefined &&
      (signal === null ||
       typeof signal !== 'object' ||
       !('aborted' in signal))) {
    throw new ERR_INVALID_ARG_TYPE(name, 'AbortSignal');
  }
}

export function setTimeout(after, value, options = {}) {
  if (options == null || typeof options !== 'object')
    return Promise.reject(new ERR_INVALID_ARG_TYPE('options', 'Object'));
  const { signal, ref = true } = options;
  try {
    validateAbortSignal(signal, 'options.signal');
  } catch (err) {
    return Promise.reject(err);
  }
  if (typeof ref !== 'boolean')
    return Promise.reject(new ERR_INVALID_ARG_TYPE('options.ref', 'boolean'));
  if (signal?.aborted)
    return Promise.reject(new AbortError());
  let oncancel;
  const ret = new Promise((resolve, reject) => {
    const timeout = _setTimeout(resolve, after, value);
    if (typeof timeout?.unref === 'function' && !ref)
      timeout.unref();
    if (signal) {
      oncancel =
        cancelListenerHandler.bind(
          undefined,
          timeout,
          clearTimeout,
          reject);
      signal.addEventListener('abort', oncancel, { once: true });
    }
  });
  return oncancel !== undefined ?
    ret.finally(() => signal.removeEventListener('abort', oncancel)) : ret;
}
