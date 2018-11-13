import React from 'react'
import GoogleMapsContainer from './GoogleMapsContainer'
import { shallow, mount } from 'enzyme'

jest.mock('./googleMaps')

describe('GoogleMapsContainer', () => {
  const API_KEY = '123'
  const locale = 'pt'

  it('should render without crashing', () => {
    shallow(
      <GoogleMapsContainer apiKey={API_KEY} locale={locale}>
        {jest.fn(() => <div />)}
      </GoogleMapsContainer>
    )
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

  it('should pass googleMaps and loading false once Google SDK is loaded', done => {
    const mockChild = jest.fn(() => <div />)

    mount(
      <GoogleMapsContainer apiKey={API_KEY} locale={locale}>
        {mockChild}
      </GoogleMapsContainer>
    )

    process.nextTick(() => {
      expect(mockChild).toHaveBeenLastCalledWith(
        expect.objectContaining({
          googleMaps: expect.any(Object),
          loading: false,
        })
      )

      done()
    })
  })
})
