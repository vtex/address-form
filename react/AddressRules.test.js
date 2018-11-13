import React from 'react'
import AddressRules from './AddressRules'
import { shallow } from 'enzyme'
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
    const wrapper = shallow(
      <AddressRules
        country={'BRA'}
        fetch={country => import('./country/' + country)}
      >
        <h1>It works!</h1>
      </AddressRules>,
    )

    const instance = wrapper.instance()

    await instance.componentDidMount()
    wrapper.update()

    expect(wrapper.find('h1')).toHaveLength(1)
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
