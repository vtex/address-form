import React from 'react'
import { render, screen } from 'test-utils'
import type { PostalCodeRules } from 'types/rules'

import { useAddressRules } from '../addressRulesContext'
import AddressRules from '../AddressRules'
import defaultRules from '../country/default'
import braRules from '../country/BRA'
import { getField } from '../selectors/fields'

describe('AddressRules', () => {
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

    let rules: PostalCodeRules | null = null

    const MyComponent = () => {
      rules = useAddressRules()

      if (rules == null) {
        return null
      }

      return <span>loaded rules</span>
    }

    render(
      <AddressRules
        country="XXX"
        fetch={(country) => import(`../country/${country}`)}
      >
        <MyComponent />
      </AddressRules>
    )

    await screen.findByText('loaded rules')

    expect(rules).toEqual(defaultRules)
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
      required: false,
    })

    expect(getField('number', initialRules).notApplicable).toBeUndefined()
    expect(getField('number', rules!)).toMatchObject({
      required: true,
      notApplicable: true,
    })
  })
})
