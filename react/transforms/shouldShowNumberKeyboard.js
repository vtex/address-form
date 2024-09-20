/**
 * Removes non-numeric characters from a string, keeping only digits, spaces, and dashes.
 * @param {string} string
 * @returns {string}
 */
function removeNonWords(string) {
  return (string || '').replace(/[^\d\s-]/g, '')
}

/**
 * Determines whether to show the number keyboard based on the input mask.
 * @param {string|number|null|undefined|NaN} [mask]
 * @returns {boolean}
 */
export function shouldShowNumberKeyboard(mask) {
  if (mask === undefined || mask === null || mask === '') {
    return true
  }

  if (Number.isNaN(mask)) {
    return false
  }

  const maskString = typeof mask === 'number' ? mask.toString() : mask

  const numericString = removeNonWords(maskString)
  const isPurelyNumeric = /^[\d\s-]+$/.test(numericString)

  return isPurelyNumeric && !/[a-zA-Z]/.test(maskString)
}
