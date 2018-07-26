import React from 'react'
import { mount } from 'enzyme'
import AddressContainer from './AddressContainer'
import address from './__mocks__/newAddress'
import usePostalCode from './country/__mocks__/usePostalCode'
import postalCodeAutoCompleteAddress from './postalCodeAutoCompleteAddress'

/* #FIXME when enzyme adds suport for context */

jest.mock('./postalCodeAutoCompleteAddress')

describe('AddressContainer', () => {
  const accountName = 'qamarketplace'

  const addressWithCountry = {
    ...address,
    country: { value: 'BRA' },
  }

  xit('should render its children', () => {
    const wrapper = mount(
      <AddressContainer
        cors
        accountName={accountName}
        address={addressWithCountry}
        onChangeAddress={jest.fn()}
        rules={usePostalCode}
      >
        <span className="unique" />
      </AddressContainer>,
    )
    expect(wrapper.find('.unique')).toHaveLength(1)
  })

  xit('should handle the validation before calling onChangeAddress', () => {
    const handleAddressChange = jest.fn()
    const children = onChangeAddress => {
      onChangeAddress({ city: { value: 'Rio de Janeiro' } })
      return <span />
    }
    mount(
      <AddressContainer
        cors
        accountName={accountName}
        address={addressWithCountry}
        onChangeAddress={handleAddressChange}
        rules={usePostalCode}
      >
        {children}
      </AddressContainer>,
    )
    expect(handleAddressChange).toHaveBeenCalledWith({
      ...addressWithCountry,
      city: { value: 'Rio de Janeiro', valid: true },
    })
  })

  xit('should short-circuit when country changes', () => {
    const handleAddressChange = jest.fn()
    const children = jest.fn(onChangeAddress => {
      onChangeAddress({ country: { value: 'ECU' } })
      return <span />
    })
    mount(
      <AddressContainer
        cors
        accountName={accountName}
        address={addressWithCountry}
        onChangeAddress={handleAddressChange}
        rules={usePostalCode}
      >
        {children}
      </AddressContainer>,
    )
    expect(handleAddressChange).toHaveBeenCalledWith({
      ...addressWithCountry,
      country: { value: 'ECU' },
    })
  })

  describe('Postal code auto complete', () => {
    beforeEach(() => {
      postalCodeAutoCompleteAddress.mockClear()
    })

    xit('should auto complete postal code when postal code is valid', () => {
      const handleAddressChange = jest.fn()
      const children = jest.fn(onChangeAddress => {
        onChangeAddress({ postalCode: { value: '22231000' } })
        return <span />
      })
      mount(
        <AddressContainer
          cors
          accountName={accountName}
          address={addressWithCountry}
          onChangeAddress={handleAddressChange}
          rules={usePostalCode}
        >
          {children}
        </AddressContainer>,
      )
      expect(postalCodeAutoCompleteAddress).toHaveBeenCalled()
    })

    xit('should not auto complete postal code when postal code is invalid', () => {
      const handleAddressChange = jest.fn()
      const children = jest.fn(onChangeAddress => {
        onChangeAddress({ postalCode: { value: '222' } })
        return <span />
      })
      mount(
        <AddressContainer
          cors
          accountName={accountName}
          address={addressWithCountry}
          onChangeAddress={handleAddressChange}
          rules={usePostalCode}
        >
          {children}
        </AddressContainer>,
      )
      expect(postalCodeAutoCompleteAddress).not.toHaveBeenCalled()
    })

    xit('should not auto complete postal code when postal code was auto completed by geolocation', () => {
      const handleAddressChange = jest.fn()
      const children = jest.fn(onChangeAddress => {
        onChangeAddress({
          postalCode: { value: '22231000', geolocationAutoCompleted: true },
        })
        return <span />
      })
      mount(
        <AddressContainer
          cors
          accountName={accountName}
          address={addressWithCountry}
          onChangeAddress={handleAddressChange}
          rules={usePostalCode}
        >
          {children}
        </AddressContainer>,
      )
      expect(postalCodeAutoCompleteAddress).not.toHaveBeenCalled()
    })

    xit('should not auto complete postal code when prop autoCompletePostalCode is false', () => {
      const handleAddressChange = jest.fn()
      const children = jest.fn(onChangeAddress => {
        onChangeAddress({
          postalCode: { value: '22231000' },
        })
        return <span />
      })
      mount(
        <AddressContainer
          cors
          accountName={accountName}
          address={addressWithCountry}
          onChangeAddress={handleAddressChange}
          autoCompletePostalCode={false}
          rules={usePostalCode}
        >
          {children}
        </AddressContainer>,
      )
      expect(postalCodeAutoCompleteAddress).not.toHaveBeenCalled()
    })
  })
})
