import React from 'react'
import { mount, rendererCreate } from 'test-utils'
import AddressSummary from './AddressSummary'
import address from './__mocks__/addressWithoutValidation'
import fbAddress from './__mocks__/facebookAddress'
import usePostalCode from './country/__mocks__/usePostalCode'
import displayBrazil from './country/__mocks__/displayBrazil'
import displayUSA from './country/__mocks__/displayUSA'
import displayNoSummary from './country/__mocks__/displayNoSummary'

describe('AddressSummary', () => {
  it('renders without crashing', () => {
    const wrapper = mount(
      <AddressSummary address={address} rules={displayBrazil} />,
    )
    expect(wrapper.find('div')).toHaveLength(1)
  })

  it('should render each field in its own span', () => {
    const wrapper = mount(
      <AddressSummary address={fbAddress} rules={displayUSA} />,
    )

    expect(wrapper.find('.street')).toHaveText('1 Hacker Way')
    expect(wrapper.find('.complement')).toHaveText('2nd floor')
    expect(wrapper.find('.city')).toHaveText('Menlo Park')
    expect(wrapper.find('.state')).toHaveText('CA')
  })

  it('should not render spans for empty fields', () => {
    const wrapper = mount(
      <AddressSummary
        address={{
          ...fbAddress,
          complement: null,
        }}
        rules={displayUSA}
      />,
    )

    expect(wrapper.find('.complement')).toHaveLength(0)
  })

  it('should not show country span if set so', () => {
    const wrapper = mount(
      <AddressSummary
        address={fbAddress}
        rules={displayUSA}
        showCountry={false}
      />,
    )

    expect(wrapper.find('.country')).toHaveLength(0)
  })

  it('should render child component', () => {
    function MyChild() {
      return <div />
    }

    const wrapper = mount(
      <AddressSummary address={address} rules={displayBrazil}>
        <MyChild />
      </AddressSummary>,
    )

    expect(wrapper.find('MyChild')).toHaveLength(1)
  })

  it('should call click handler', () => {
    const handleClick = jest.fn()

    const wrapper = mount(
      <AddressSummary
        address={address}
        rules={displayBrazil}
        canEditData={false}
        onClickMaskedInfoIcon={handleClick}
      />,
    )

    const maskedInfoIcon = wrapper.find('.client-masked-info')
    maskedInfoIcon.simulate('click', { preventDefault() {} })

    expect(handleClick).toHaveBeenCalled()
  })

  it('should render gift list address', () => {
    const tree = rendererCreate(
      <AddressSummary
        giftRegistryDescription={'João da Silva'}
        address={address}
        rules={usePostalCode}
      />,
    )

    expect(tree).toMatchSnapshot()
  })

  it('should format address according to rules', () => {
    const brazilianAddress = rendererCreate(
      <AddressSummary
        address={{
          ...address,
          street: 'Av. Praia de Botafogo',
          number: '300',
          complement: 'ap. 322',
          neighborhood: 'Botafogo',
          city: 'Rio de Janeiro',
          state: 'RJ',
          country: 'BRA',
        }}
        rules={displayBrazil}
      />,
    )

    const americanAddress = rendererCreate(
      <AddressSummary
        address={{
          ...address,
          street: '1 Infinite Loop',
          number: null,
          complement: 'Suite 306',
          neighborhood: null,
          city: 'Cupertino',
          state: 'CA',
          country: 'USA',
        }}
        rules={displayUSA}
      />,
    )

    expect(brazilianAddress).toMatchSnapshot()
    expect(americanAddress).toMatchSnapshot()
  })

  it('should render using default if rules do not contain summary', () => {
    global.console = { warn: jest.fn() }

    const wrapper = rendererCreate(
      <AddressSummary address={fbAddress} rules={displayNoSummary} />,
    )

    expect(wrapper).toMatchSnapshot()
  })
})
