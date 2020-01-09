export function removeNonWords(string) {
  return string && string.replace(/\W/g, '')
}
