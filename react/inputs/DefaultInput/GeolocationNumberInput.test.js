import React from 'react'
import { rendererCreate } from 'test-utils'

import address from '../../__mocks__/geolocationAddress'

import GeolocationNumberInput from './GeolocationNumberInput'

const DEFAULT_PROPS = {
  field: {
    name: 'number',
    size: 'small',
    maxLength: '9',
    label: 'number',
  },
  address: {
    ...address,
    postalCode: {
      value: '',
      loading: false,
      valid: false,
    },
  },
  onChangeAddress: jest.fn(),
  onBlur: jest.fn(),
}

describe('InputText', () => {
  it('should render default case', () => {
    const tree = rendererCreate(<GeolocationNumberInput {...DEFAULT_PROPS} />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should render disabled input', () => {
    const props = {
      ...DEFAULT_PROPS,
      disabled: true,
    }
    const tree = rendererCreate(<GeolocationNumberInput {...props} />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should render custom class', () => {
    const props = {
      ...DEFAULT_PROPS,
      className: 'my-class',
    }
    const tree = rendererCreate(<GeolocationNumberInput {...props} />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should render different input type', () => {
    const props = {
      ...DEFAULT_PROPS,
      type: 'tel',
    }
    const tree = rendererCreate(<GeolocationNumberInput {...props} />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should render different id', () => {
    const props = {
      ...DEFAULT_PROPS,
      id: 'summary-postal-code',
    }
    const tree = rendererCreate(<GeolocationNumberInput {...props} />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should render different id based on fieldName', () => {
    const props = {
      ...DEFAULT_PROPS,
      id: 'my-context-{{fieldName}}',
    }
    const tree = rendererCreate(<GeolocationNumberInput {...props} />).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
