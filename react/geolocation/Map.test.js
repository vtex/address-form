import React from 'react'
import { shallow } from 'test-utils'

import Map from './Map'

describe('Map', () => {
  let shallowWrapper
  let shallowInstance

  function shallowRenderComponent() {
    shallowWrapper = shallow(
      <Map
        loadingElement={<div />}
        geoCoordinates={[1, 2]}
        rules={{}}
        onChangeAddress={jest.fn()}
        loadingGoogle={false}
        googleMaps={null}
      />
    )
      .dive()
      .dive()

    shallowInstance = shallowWrapper.instance()
  }

  beforeEach(() => {
    shallowRenderComponent()
  })

  it('should render without crashing', () => {
    expect(() =>
      shallow(
        <Map
          loadingElement={<div />}
          geoCoordinates={[]}
          rules={{}}
          onChangeAddress={jest.fn()}
          loadingGoogle
          googleMaps={null}
        />
      )
    ).not.toThrow()
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

  it('should re-render if loadingGoogle changed', () => {
    const currentProps = shallowInstance.props
    const currentState = shallowInstance.state

    const shouldUpdate = shallowInstance.shouldComponentUpdate(
      { ...currentProps, loadingGoogle: true },
      currentState
    )

    expect(shouldUpdate).toBe(true)
  })
})
