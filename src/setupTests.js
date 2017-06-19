import 'jest-enzyme'

global.console.warn = warn => {
  throw new Error(warn)
}
