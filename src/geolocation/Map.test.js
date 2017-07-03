import React from 'react'
import { shallow, mount } from 'enzyme'
import Map from './Map'

describe('Map', () => {
  const mockFn = jest.fn(() => <div />)
  let shallowWrapper, shallowInstance

  function shallowRenderComponent() {
    shallowWrapper = shallow(
      <Map
        loadingElement={<div />}
        geoCoordinates={[1, 2]}
        rules={{}}
        onChangeAddress={jest.fn()}
        loadingGoogle={false}
        googleMaps={null}
      >
        {mockFn}
      </Map>
    )

    shallowInstance = shallowWrapper.instance()
  }

  beforeEach(() => {
    mockFn.mockClear()
    shallowRenderComponent()
  })

  it('should render without crashing', () => {
    shallow(
      <Map
        loadingElement={<div />}
        geoCoordinates={[]}
        rules={{}}
        onChangeAddress={jest.fn()}
        loadingGoogle
        googleMaps={null}
      >
        {jest.fn(() => <div />)}
      </Map>
    )
  })

  it('should pass a function to child', () => {
    expect(mockFn).toHaveBeenCalledWith(expect.any(Function))
  })

  it("should not re-render if rules and geoCoords didn't change", () => {
    const currentProps = shallowInstance.props
    const currentState = shallowInstance.state

    const shouldUpdate = shallowInstance.shouldComponentUpdate(
      currentProps,
      currentState
    )

    expect(shouldUpdate).toBe(false)
  })

  it('should re-render if rules changed', () => {
    const currentProps = shallowInstance.props
    const currentState = shallowInstance.state

    const shouldUpdate = shallowInstance.shouldComponentUpdate(
      { ...currentProps, rules: { country: 'USA' } },
      currentState
    )

    expect(shouldUpdate).toBe(true)
  })

  it('should re-render if geoCoords changed', () => {
    const currentProps = shallowInstance.props
    const currentState = shallowInstance.state

    const shouldUpdate = shallowInstance.shouldComponentUpdate(
      { ...currentProps, geoCoordinates: [2, 3] },
      currentState
    )

    expect(shouldUpdate).toBe(true)
  })

  it('should re-render if geoCoords changed', () => {
    const currentProps = shallowInstance.props
    const currentState = shallowInstance.state

    const shouldUpdate = shallowInstance.shouldComponentUpdate(
      { ...currentProps, geoCoordinates: [2, 3] },
      currentState
    )

    expect(shouldUpdate).toBe(true)
  })
})
