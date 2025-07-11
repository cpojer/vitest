import type { ViteUserConfig } from 'vitest/config'
import { expect, test } from 'vitest'

test('is multi worker', () => {
  // @ts-expect-error -- internal
  const config: NonNullable<ViteUserConfig['test']> = globalThis.__vitest_worker__.config

  if (config.pool === 'forks') {
    expect(config.poolOptions?.forks?.singleFork).toBe(false)
  }
  else {
    expect(config.pool).toBe('threads')
    expect(config.poolOptions?.threads?.singleThread).toBe(false)
  }
})
