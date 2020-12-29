import React from 'react'
import { mount } from 'test-utils'
import { IntlProvider } from 'react-intl'

import OneLevel from './OneLevel'
import useOneLevel from '../country/__mocks__/useOneLevel'
import address from '../__mocks__/newAddress'
import MockInput from '../inputs/DefaultInput/__mocks__/Input'
import pt from '../../messages/pt.json'

describe('OneLevel', () => {
  it('render it right', () => {
    const wrapper = mount(
      <IntlProvider locale="pt" messages={pt}>
        <OneLevel
          Input={MockInput}
          address={address}
          rules={useOneLevel}
          onChangeAddress={jest.fn()}
        />
      </IntlProvider>
    )

    expect(wrapper.find('SelectPostalCode')).toHaveLength(1)
  })
})
