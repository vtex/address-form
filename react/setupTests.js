/// <reference types="jest" />

import 'jest-enzyme'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

// this adds jest-dom's custom assertions
import '@testing-library/jest-dom/extend-expect'

Enzyme.configure({ adapter: new Adapter() })

global.console.warn = (warn) => {
  throw new Error(warn)
}
