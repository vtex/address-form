import React from 'react'
import { shallow, render, waitFor } from 'test-utils'

import AddressRules from './AddressRules'
import defaultRules from './country/default'
import braRules from './country/BRA'
import { getField } from './selectors/fields'

describe('AddressRules', () => {
  it('should load the defined rules', async () => {
    const instance = shallow(
      <AddressRules
        country="BRA"
        fetch={(country) => import(`./country/${country}`)}
      >
        <h1>It works!</h1>
      </AddressRules>
    ).instance()

    const rules = await instance.componentDidMount()

    expect(rules).toEqual(braRules)
  })

  it('should call onLoadRules if passed', async () => {
    const onLoadRules = jest.fn()

    const instance = shallow(
      <AddressRules
        country="BRA"
        fetch={(country) => import(`./country/${country}`)}
        onLoadRules={onLoadRules}
      >
        <h1>It works!</h1>
      </AddressRules>
    ).instance()

    const rules = await instance.componentDidMount()

    expect(rules).toEqual(braRules)
    expect(onLoadRules).toHaveBeenCalledWith({ rules })
  })

  it('should render its children', async () => {
    const testId = 'foo'

    const { container, getByTestId } = render(
      <AddressRules
        country="BRA"
        fetch={(country) => import(`./country/${country}`)}
      >
        <span data-testid={testId} />
      </AddressRules>
    )

    const result = await waitFor(() => getByTestId(testId), {
      container,
    })

    expect(result).toBeDefined()
  })

  it('should provide default rules when country is unrecognized', async () => {
    const prevWarn = global.console.warn

    jest.spyOn(global.console, 'warn').mockImplementation()

    const instance = shallow(
      <AddressRules
        country="XXX"
        fetch={(country) => import(`./country/${country}`)}
      >
        <h1>It works!</h1>
      </AddressRules>
    ).instance()

    const rules = await instance.componentDidMount()

    expect(rules).toEqual(defaultRules)

    global.console.warn = prevWarn
  })

  it('should merge geolocation field rules with default field rules', async () => {
    const instance = shallow(
      <AddressRules
        country="BRA"
        fetch={(country) => import(`./country/${country}`)}
        useGeolocation
      >
        <h1>It works!</h1>
      </AddressRules>
    ).instance()

    const { default: initialRules } = await import('./country/BRA')
    const rules = await instance.componentDidMount()

    expect(getField('postalCode', initialRules)).toMatchObject({
      required: true,
    })
    expect(getField('postalCode', rules)).toMatchObject({
      required: true,
    })

    expect(getField('number', initialRules).notApplicable).toBeUndefined()
    expect(getField('number', rules)).toMatchObject({
      required: true,
      notApplicable: true,
    })
  })
})
