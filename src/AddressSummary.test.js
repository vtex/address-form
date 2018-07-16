import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import AddressSummary from './AddressSummary'
import address from './__mocks__/addressWithoutValidation'
import usePostalCode from './country/__mocks__/usePostalCode'
import useOneLevel from './country/__mocks__/useOneLevel'
import displayBrazil from './country/__mocks__/displayBrazil'
import displayUSA from './country/__mocks__/displayUSA'

describe('AddressSummary', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(
      <AddressSummary address={address} rules={usePostalCode} />,
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
      />,
    )

    expect(tree).toMatchSnapshot()
  })

  it('should render the postal code if country show its input', () => {
    const wrapper = shallow(
      <AddressSummary address={address} rules={usePostalCode} />,
    )

    expect(wrapper.find('.postal-code')).toHaveLength(1)
  })

  it('should not render postal code if the country sets it by another input', () => {
    const wrapper = shallow(
      <AddressSummary address={address} rules={useOneLevel} />,
    )

    expect(wrapper.find('.postal-code')).toHaveLength(0)
  })

  it('should render child component', () => {
    function MyChild() {
      return <div />
    }

    const wrapper = shallow(
      <AddressSummary address={address} rules={useOneLevel}>
        <MyChild />
      </AddressSummary>,
    )

    expect(wrapper.find('MyChild')).toHaveLength(1)
  })

  it('should call click handler', () => {
    const handleClick = jest.fn()

    const wrapper = shallow(
      <AddressSummary
        address={address}
        rules={useOneLevel}
        canEditData={false}
        onClickMaskedInfoIcon={handleClick}
      />,
    )

    const maskedInfoIcon = wrapper.find('.client-masked-info')
    maskedInfoIcon.simulate('click', { preventDefault() {} })

    expect(handleClick).toHaveBeenCalled()
  })

  it('should render gift list address', () => {
    const tree = renderer.create(
      <AddressSummary
        giftRegistryDescription={'João da Silva'}
        address={address}
        rules={usePostalCode}
      />,
    )

    expect(tree).toMatchSnapshot()
  })

  it('should format address according to rules', () => {
    const brazilianAddress = renderer.create(
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

    const americanAddress = renderer.create(
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
        rules={displayBrazil}
      />,
    )

    expect(brazilianAddress).toMatchSnapshot()
    expect(americanAddress).toMatchSnapshot()
  })

  it('should format address according to rules', () => {
    const brazilianAddress = renderer.create(
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
          postalCode: '22250-040',
        }}
        rules={displayBrazil}
      />,
    )

    const americanAddress = renderer.create(
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
          postalCode: '95014',
        }}
        rules={displayUSA}
      />,
    )

    expect(brazilianAddress).toMatchSnapshot()
    expect(americanAddress).toMatchSnapshot()
  })
})
