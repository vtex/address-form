import React from 'react'
import { render, screen } from 'test-utils'
import type { PostalCodeRules } from 'types/rules'

import { useAddressRules } from '../addressRulesContext'
import AddressRules from '../AddressRules'
import defaultRules from '../country/default'
import braRules from '../country/BRA'
import { getField } from '../selectors/fields'

describe('AddressRules', () => {
  let loadedRules: PostalCodeRules | null = null

  const LoadedRulesComponent = () => {
    loadedRules = useAddressRules()

    if (loadedRules == null) {
      return null
    }

    return <span>loaded rules</span>
  }

  beforeEach(() => {
    loadedRules = null
  })

  it('should load the defined rules', async () => {
    let rules: PostalCodeRules | null = null

    const MyComponent = () => {
      rules = useAddressRules()

      return <h1>{rules?.country}</h1>
    }

    render(
      <AddressRules
        country="BRA"
        fetch={(country) => import(`../country/${country}`)}
      >
        <MyComponent />
      </AddressRules>
    )

    await screen.findByText('BRA')

    expect(rules).toEqual(braRules)
  })

  it('should provide default rules when country is unrecognized', async () => {
    const warnSpy = jest
      .spyOn(global.console, 'warn')
      .mockImplementation(() => {})

    render(
      <AddressRules
        country="XXX"
        fetch={(country) => import(`../country/${country}`)}
      >
        <LoadedRulesComponent />
      </AddressRules>
    )

    await screen.findByText('loaded rules')

    expect(loadedRules).toEqual(defaultRules)
    expect(warnSpy).toHaveBeenCalledWith(
      "Couldn't load rules for country XXX, using default rules instead."
    )
  })

  it('should use default rules when error message matches module not found', async () => {
    const warnSpy = jest
      .spyOn(global.console, 'warn')
      .mockImplementation(() => {})

    render(
      <AddressRules
        country="BRA"
        fetch={(country) =>
          Promise.reject(new Error(`Cannot find module '${country}'`))
        }
      >
        <LoadedRulesComponent />
      </AddressRules>
    )

    await screen.findByText('loaded rules')

    expect(loadedRules).toEqual(defaultRules)
    expect(warnSpy).toHaveBeenCalledWith(
      "Couldn't load rules for country BRA, using default rules instead."
    )
  })

  it('should use default rules with IO fetching when country does not exist', async () => {
    const warnSpy = jest
      .spyOn(global.console, 'warn')
      .mockImplementation(() => {})

    render(
      <AddressRules country="XXX" shouldUseIOFetching>
        <LoadedRulesComponent />
      </AddressRules>
    )

    await screen.findByText('loaded rules')

    expect(loadedRules).toEqual(defaultRules)
    expect(warnSpy).toHaveBeenCalledWith(
      "Couldn't load rules for country XXX, using default rules instead."
    )
  })

  it('should merge geolocation field rules with default field rules', async () => {
    let rules: PostalCodeRules | null = null

    const MyComponent = () => {
      rules = useAddressRules()

      return <h1>{rules?.country}</h1>
    }

    render(
      <AddressRules
        country="BRA"
        fetch={(country) => import(`../country/${country}`)}
        useGeolocation
      >
        <MyComponent />
      </AddressRules>
    )

    await screen.findByText('BRA')

    const { default: initialRules } = await import('../country/BRA')

    expect(getField('postalCode', initialRules)).toMatchObject({
      required: true,
    })
    expect(getField('postalCode', rules!)).toMatchObject({
      required: true,
    })

    expect(getField('number', initialRules).notApplicable).toBeUndefined()
    expect(getField('number', rules!)).toMatchObject({
      required: true,
      notApplicable: true,
    })
  })
})
