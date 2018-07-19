import 'jest-enzyme'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

global.console.warn = warn => {
  throw new Error(warn)
}
