import React from 'react'
import { shallow, mount } from 'test-utils'

import GoogleMapsContainer from './GoogleMapsContainer'

jest.mock('./googleMaps')

describe('GoogleMapsContainer', () => {
  const API_KEY = '123'
  const locale = 'pt'

  it('should render without crashing', () => {
    expect(() =>
      shallow(
        <GoogleMapsContainer apiKey={API_KEY} locale={locale}>
          {jest.fn(() => (
            <div />
          ))}
        </GoogleMapsContainer>
      )
    ).not.toThrow()
  })

  it('should pass loading as true at first', () => {
    const mockChild = jest.fn(() => <div />)

    shallow(
      <GoogleMapsContainer apiKey={API_KEY} locale={locale}>
        {mockChild}
      </GoogleMapsContainer>
    )

    expect(mockChild).toHaveBeenCalledWith({ googleMaps: null, loading: true })
  })

  it('should pass googleMaps and loading false once Google SDK is loaded', async () => {
    const mockChild = jest.fn(() => <div />)

    mount(
      <GoogleMapsContainer apiKey={API_KEY} locale={locale}>
        {mockChild}
      </GoogleMapsContainer>
    )

    await new Promise((resolve) => process.nextTick(resolve))

    expect(mockChild).toHaveBeenLastCalledWith(
      expect.objectContaining({
        googleMaps: expect.any(Object),
        loading: false,
      })
    )
  })
})
