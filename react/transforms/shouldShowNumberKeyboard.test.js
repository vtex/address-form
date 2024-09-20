import { shouldShowNumberKeyboard } from './shouldShowNumberKeyboard'

describe('shouldShowNumberKeyboard', () => {
  test('Should return true for mask rule undefined', () => {
    expect(shouldShowNumberKeyboard(undefined)).toBe(true)
  })

  test('Should return true for mask rule null', () => {
    expect(shouldShowNumberKeyboard(null)).toBe(true)
  })

  test('Should return true for mask rule empty string', () => {
    expect(shouldShowNumberKeyboard('')).toBe(true)
  })

  test('Should return true for mask rule numeric string without separators', () => {
    expect(shouldShowNumberKeyboard('9999')).toBe(true)
  })

  test('Should return true for mask rule numeric string with spaces', () => {
    expect(shouldShowNumberKeyboard('999 99')).toBe(true)
  })

  test('Should return true for mask rule numeric string with dashes', () => {
    expect(shouldShowNumberKeyboard('9999-99')).toBe(true)
  })

  test('Should return false for mask rulee for string with letters', () => {
    expect(shouldShowNumberKeyboard('999AA')).toBe(false)
  })

  test('Should return false for mask rulee for string with mixed letters and spaces', () => {
    expect(shouldShowNumberKeyboard('999 AA')).toBe(false)
  })

  test('Should return false for mask rulee for mixed numeric and letter string with dashes', () => {
    expect(shouldShowNumberKeyboard('9AA9-99')).toBe(false)
  })

  test('Should return false for mask rulee for NaN', () => {
    expect(shouldShowNumberKeyboard(NaN)).toBe(false)
  })
})
