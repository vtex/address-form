import React from 'react'
import { mount } from 'test-utils'
import ThreeLevels from './ThreeLevels'
import useThreeLevels from '../country/__mocks__/useThreeLevels'
import address from '../__mocks__/newAddress'
import MockInput from '../inputs/DefaultInput/__mocks__/Input'
import { IntlProvider } from 'react-intl'
import pt from '../../messages/pt.json'

describe('ThreeLevels', () => {
  it('without first and second level selected', () => {
    const wrapper = mount(
      <IntlProvider locale="pt" messages={pt}>
        <ThreeLevels
          Input={MockInput}
          address={address}
          rules={useThreeLevels}
          onChangeAddress={jest.fn()}
        />
      </IntlProvider>,
    )

    expect(wrapper.find('SelectLevel')).toHaveLength(2)
    expect(wrapper.find('SelectPostalCode')).toHaveLength(1)
  })
})
