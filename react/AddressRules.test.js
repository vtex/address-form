import React from 'react'
import AddressRules from './AddressRules'
import { shallow, render, waitForElement } from 'test-utils'
import defaultRules from './country/default'
import braRules from './country/BRA'

describe('AddressRules', () => {
  it('should load the defined rules', async () => {
    const instance = shallow(
      <AddressRules
        country={'BRA'}
        fetch={country => import('./country/' + country)}
      >
        <h1>It works!</h1>
      </AddressRules>,
    ).instance()

    const rules = await instance.componentDidMount()
    expect(rules).toEqual(braRules)
  })

  it('should render its children', async () => {
    const testId = 'foo'

    const { container, getByTestId } = render(
      <AddressRules
        country={'BRA'}
        fetch={country => import('./country/' + country)}
      >
        <span data-testid={testId} />
      </AddressRules>,
    )

    const result = await waitForElement(
      () => getByTestId(testId),
      { container }
    )

    expect(result).toBeDefined()
  })

  it('should provide default rules when country is unrecognized', async () => {
    global.console = { warn: jest.fn() }

    const instance = shallow(
      <AddressRules
        country={'XXX'}
        fetch={country => import('./country/' + country)}
      >
        <h1>It works!</h1>
      </AddressRules>,
    ).instance()

    const rules = await instance.componentDidMount()
    expect(rules).toEqual(defaultRules)
  })
})
