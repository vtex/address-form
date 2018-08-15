import React from 'react'
import { mount } from 'enzyme'
import AutoCompletedFields from './AutoCompletedFields'
import newAddress from './__mocks__/newAddress'
import usePostalCode from './country/__mocks__/usePostalCode'

describe('AutoCompletedFields', () => {
  const children = <span className="link-edit">Edit</span>

  it('renders without crashing', () => {
    mount(
      <AutoCompletedFields
        rules={usePostalCode}
        address={newAddress}
        onChangeAddress={jest.fn()}
      >
        {children}
      </AutoCompletedFields>
    )
  })

  it("should display nothing if there's no autocompleted fields", () => {
    const wrapper = mount(
      <AutoCompletedFields
        rules={usePostalCode}
        address={newAddress}
        onChangeAddress={jest.fn()}
      >
        {children}
      </AutoCompletedFields>
    )
    expect(wrapper.html()).toBe(null)
  })

  it('should display nothing if there are autocompleted fields with no value', () => {
    const wrapper = mount(
      <AutoCompletedFields
        rules={usePostalCode}
        address={{
          ...newAddress,
          state: {
            postalCodeAutoCompleted: true,
            value: null,
            valueOptions: ['Buenos Aires', 'Entre Ríos'],
          },
        }}
        onChangeAddress={jest.fn()}
      >
        {children}
      </AutoCompletedFields>
    )
    expect(wrapper.html()).toBe(null)
  })

  describe('', () => {
    const state = 'RJ'
    const city = 'Rio de Janeiro'
    const neighborhood = 'Botafogo'
    const onChangeAddress = jest.fn()
    const address = {
      ...newAddress,
      state: { value: state },
      city: { value: city, geolocationAutoCompleted: true },
      neighborhood: { value: neighborhood, postalCodeAutoCompleted: true },
    }

    let wrapper
    beforeEach(() => {
      wrapper = mount(
        <AutoCompletedFields
          rules={usePostalCode}
          address={address}
          onChangeAddress={onChangeAddress}
        >
          {children}
        </AutoCompletedFields>
      )
    })

    it('should contain an AddressSummary component', () => {
      const AddressSummary = wrapper.find('AddressSummary')

      expect(AddressSummary).toHaveLength(1)
    })

    it('should show only the autocompleted fields', () => {
      const AddressSummary = wrapper.find('AddressSummary')

      expect(AddressSummary.prop('address').city).toBe(city)
      expect(AddressSummary.prop('address').neighborhood).toBe(neighborhood)
      expect(AddressSummary.prop('address').state).toBe(undefined)
    })

    it('should remove auto completed properties from fields when click change', () => {
      const linkChange = wrapper.find('.link-edit')
      onChangeAddress.mockClear()

      linkChange.simulate('click', { preventDefault() {} })

      expect(onChangeAddress).toHaveBeenCalled()

      const onChangeAddressArgument = onChangeAddress.mock.calls[0][0]

      expect(onChangeAddressArgument.state).toHaveProperty('value', state)
      expect(onChangeAddressArgument.state).toHaveProperty(
        'geolocationAutoCompleted',
        undefined
      )
      expect(onChangeAddressArgument.city).toHaveProperty('value', city)
      expect(onChangeAddressArgument.state).toHaveProperty(
        'postalCodeAutoCompleted',
        undefined
      )
    })

    it('should not display country information', () => {
      expect(wrapper.find('.country')).toHaveLength(0)
    })
  })

  it('should not show postal code when address is completed with postal code', () => {
    const onChangeAddress = jest.fn()
    const address = {
      ...newAddress,
      postalCode: { value: '22231000', postalCodeAutoCompleted: true },
      state: { value: 'RJ', postalCodeAutoCompleted: true },
      city: { value: 'Rio de Janeiro', postalCodeAutoCompleted: true },
      neighborhood: { value: 'Botafogo', postalCodeAutoCompleted: true },
      number: { value: '300', postalCodeAutoCompleted: true },
      street: { value: 'Praia de Botafogo', postalCodeAutoCompleted: true },
    }

    const wrapper = mount(
      <AutoCompletedFields
        rules={usePostalCode}
        address={address}
        onChangeAddress={onChangeAddress}
      >
        {children}
      </AutoCompletedFields>
    )

    const AddressSummary = wrapper.find('AddressSummary')

    expect(AddressSummary.prop('address').postalCode).toBe(undefined)
  })

  it('should show postal code when address is completed with geolocation', () => {
    const onChangeAddress = jest.fn()
    const postalCode = '22231000'
    const address = {
      ...newAddress,
      postalCode: { value: postalCode, geolocationAutoCompleted: true },
      state: { value: 'RJ', geolocationAutoCompleted: true },
      city: { value: 'Rio de Janeiro', geolocationAutoCompleted: true },
      neighborhood: { value: 'Botafogo', geolocationAutoCompleted: true },
      number: { value: '300', geolocationAutoCompleted: true },
      street: { value: 'Praia de Botafogo', geolocationAutoCompleted: true },
    }

    const wrapper = mount(
      <AutoCompletedFields
        rules={usePostalCode}
        address={address}
        onChangeAddress={onChangeAddress}
      >
        {children}
      </AutoCompletedFields>
    )

    const AddressSummary = wrapper.find('AddressSummary')

    expect(AddressSummary.prop('address').postalCode).toBe(postalCode)
  })
})
