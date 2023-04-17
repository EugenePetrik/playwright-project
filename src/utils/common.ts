export async function sleep(time: number) {
  return new Promise(resolve => {
    // eslint-disable-next-line no-promise-executor-return
    return setTimeout(resolve, time);
  });
}

export async function waitFor<T>(predicate: () => T | Promise<T>, options?: { timeout?: number; wait?: number }): Promise<T> {
  // eslint-disable-next-line no-magic-numbers
  const { timeout = 10000, wait = 300 } = options || {};

  const startDate = new Date();

  while (new Date().getTime() - startDate.getTime() < timeout) {
    const result = await predicate();
    if (result) return result;
    await sleep(wait);
  }

  throw Error(`Wait time of ${timeout}ms exceeded`);
}
