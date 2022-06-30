import { calculateFilePaths } from '../../src/utils/fileHandling'

describe(calculateFilePaths, () => {
  test('Should return a flat array', () => {
    const results = calculateFilePaths(['test/*.ts'])

    expect(results.length).toBeGreaterThan(0)
    expect(results.some((result) => result.includes('test/ormconfig.ts'))).toBeTruthy()
  })
})
