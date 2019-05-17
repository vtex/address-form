import React from 'react'
import { mount } from 'test-utils'
import TwoLevels from './TwoLevels'
import useTwoLevels from '../country/__mocks__/useTwoLevels'
import address from '../__mocks__/newAddress'
import MockInput from '../inputs/DefaultInput/__mocks__/Input'
import { IntlProvider } from 'react-intl'
import pt from '../../messages/pt.json'

describe('TwoLevels', () => {
  it('render it right', () => {
    const wrapper = mount(
      <IntlProvider locale="pt" messages={pt}>
        <TwoLevels
          Input={MockInput}
          address={address}
          rules={useTwoLevels}
          onChangeAddress={jest.fn()}
        />
      </IntlProvider>,
    )

    expect(wrapper.find('SelectLevel')).toHaveLength(1)
    expect(wrapper.find('SelectPostalCode')).toHaveLength(1)
  })
})
