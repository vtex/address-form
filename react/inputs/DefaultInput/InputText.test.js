import React from 'react'
import renderer from 'react-test-renderer'

import address from '../../__mocks__/newAddress'

import InputText from './InputText'

const DEFAULT_PROPS = {
  field: {
    name: 'postalCode',
    size: 'small',
    maxLength: '9',
  },
  address: {
    ...address,
    postalCode: {
      value: '',
      loading: false,
      valid: false,
    },
  },
  onChange: jest.fn(),
  onBlur: jest.fn(),
}

describe('InputText', () => {
  it('should render default case', () => {
    const tree = renderer.create(<InputText {...DEFAULT_PROPS} />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should render disabled input', () => {
    const props = {
      ...DEFAULT_PROPS,
      disabled: true,
    }
    const tree = renderer.create(<InputText {...props} />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should render custom class', () => {
    const props = {
      ...DEFAULT_PROPS,
      className: 'my-class',
    }
    const tree = renderer.create(<InputText {...props} />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should render different input type', () => {
    const props = {
      ...DEFAULT_PROPS,
      type: 'tel',
    }
    const tree = renderer.create(<InputText {...props} />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should render different id', () => {
    const props = {
      ...DEFAULT_PROPS,
      id: 'summary-postal-code',
    }
    const tree = renderer.create(<InputText {...props} />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should render different id based on fieldName', () => {
    const props = {
      ...DEFAULT_PROPS,
      id: 'my-context-{{fieldName}}',
    }
    const tree = renderer.create(<InputText {...props} />).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
