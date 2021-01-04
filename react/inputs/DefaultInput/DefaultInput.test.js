import React from 'react'
import { rendererCreate } from 'test-utils'

import address from '../../__mocks__/geolocationAddressValid'
import newAddress from '../../__mocks__/newAddress'
import Input from './index'

const GEOLOCATION_PROPS = {
  field: {
    name: 'number',
    size: 'small',
    maxLength: '9',
    label: 'number',
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
    label: 'number',
  },
  addressId: { value: '1' },
  address: {
    addressId: { value: '1' },
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
    const tree = rendererCreate(<Input {...DEFAULT_PROPS} />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should render disabled input', () => {
    const tree = rendererCreate(<Input {...GEOLOCATION_PROPS} />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should render custom class', () => {
    const props = {
      ...DEFAULT_PROPS,
      className: 'my-class',
    }

    const tree = rendererCreate(<Input {...props} />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should render different input type', () => {
    const props = {
      ...DEFAULT_PROPS,
      type: 'tel',
    }

    const tree = rendererCreate(<Input {...props} />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should render different id', () => {
    const props = {
      ...DEFAULT_PROPS,
      id: 'summary-postal-code',
    }

    const tree = rendererCreate(<Input {...props} />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should render different id based on fieldName', () => {
    const props = {
      ...DEFAULT_PROPS,
      id: 'my-context-{{fieldName}}',
    }

    const tree = rendererCreate(<Input {...props} />).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
