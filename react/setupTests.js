import 'jest-enzyme'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

// react-testing-library renders your components to document.body,
// this will ensure they're removed after each test.
import 'react-testing-library/cleanup-after-each'
// this adds jest-dom's custom assertions
import 'jest-dom/extend-expect'

Enzyme.configure({ adapter: new Adapter() })

global.console.warn = warn => {
  throw new Error(warn)
}
