import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import AddressSummary from './AddressSummary'
import address from './__mocks__/addressWithoutValidation'
import usePostalCode from './country/__mocks__/usePostalCode'
import useOneLevel from './country/__mocks__/useOneLevel'

describe('AddressSummary', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(
      <AddressSummary address={address} rules={usePostalCode} />
    )
    expect(wrapper.find('div')).toHaveLength(1)
  })

  it('should render address summary with all its data', () => {
    const tree = renderer.create(
      <AddressSummary
        address={{
          ...address,
          street: 'Praia de Botafogo',
          number: '300',
          complement: '2nd floor',
          neighborhood: 'Botafogo',
          city: 'Rio de Janeiro',
          state: 'AM',
          country: 'BRA',
        }}
        rules={usePostalCode}
      />
    )

    expect(tree).toMatchSnapshot()
  })

  it('should render the postal code if country show its input', () => {
    const wrapper = shallow(
      <AddressSummary address={address} rules={usePostalCode} />
    )

    expect(wrapper.find('.postal-code')).toHaveLength(1)
  })

  it('should not render postal code if the country sets it by another input', () => {
    const wrapper = shallow(
      <AddressSummary address={address} rules={useOneLevel} />
    )

    expect(wrapper.find('.postal-code')).toHaveLength(0)
  })

  it('should render gift list address', () => {
    const tree = renderer.create(
      <AddressSummary
        giftRegistryDescription={'João da Silva'}
        address={address}
        rules={usePostalCode}
      />
    )

    expect(tree).toMatchSnapshot()
  })
})
