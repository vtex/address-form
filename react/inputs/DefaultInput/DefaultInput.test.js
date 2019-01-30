import React from 'react'
import renderer from 'react-test-renderer'

import address from '../../__mocks__/geolocationAddressValid'
import newAddress from '../../__mocks__/newAddress'

import Input from './index'

const GEOLOCATION_PROPS = {
  field: {
    name: 'number',
    size: 'small',
    maxLength: '9',
  },
  address: {
    ...address,
    number: {
      ...address.number,
      valid: true,
      loading: false,
    },
    postalCode: {
      value: '',
      loading: false,
      valid: true,
    },
  },
  onChange: jest.fn(),
  onBlur: jest.fn(),
}

const DEFAULT_PROPS = {
  field: {
    name: 'number',
    size: 'small',
    maxLength: '9',
  },
  addressId: {value: '1'},
  address: {
    addressId: {value: '1'},
    ...newAddress,
    number: {
      value: '',
      loading: false,
      valid: true,
    },
  },
  onChange: jest.fn(),
  onBlur: jest.fn(),
}

describe('Input', () => {
  it('should render default case', () => {
    const tree = renderer.create(<Input {...DEFAULT_PROPS} />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should render disabled input', () => {
    const tree = renderer.create(<Input {...GEOLOCATION_PROPS} />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should render custom class', () => {
    const props = {
      ...DEFAULT_PROPS,
      className: 'my-class',
    }
    const tree = renderer.create(<Input {...props} />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should render different input type', () => {
    const props = {
      ...DEFAULT_PROPS,
      type: 'tel',
    }
    const tree = renderer.create(<Input {...props} />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should render different id', () => {
    const props = {
      ...DEFAULT_PROPS,
      id: 'summary-postal-code',
    }
    const tree = renderer.create(<Input {...props} />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should render different id based on fieldName', () => {
    const props = {
      ...DEFAULT_PROPS,
      id: 'my-context-{{fieldName}}',
    }
    const tree = renderer.create(<Input {...props} />).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
