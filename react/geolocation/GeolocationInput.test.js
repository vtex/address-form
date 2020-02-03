
import React from 'react'
import { rendererCreate } from 'test-utils'

import GeolocationInput from './GeolocationInput'
import mockAddress from '../__mocks__/newAddress'

const DEFAULT_PROPS = {
  address: mockAddress,
  loadingGoogle: true,
  onChangeAddress: jest.fn(),
  rules:{
    country: 'BRA',
  },
}

describe('GeolocationInput', () => {
  it('should render default case', () => {
    const tree = rendererCreate(<GeolocationInput {...DEFAULT_PROPS} />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should render with changed label', () => {
    const props = {
      ...DEFAULT_PROPS,
      inputProps: {
        field: {
          fixedLabel: 'Teste',
        },
      },
    }
    const tree = rendererCreate(<GeolocationInput {...props} />).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
