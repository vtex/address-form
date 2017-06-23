/* eslint react/prop-types: 0 */
import React from 'react'
import { mount } from 'enzyme'
import AddressContainer from './AddressContainer'
import address from './__mocks__/newAddress'
import usePostalCode from './country/__mocks__/usePostalCode'
import useOneLevel from './country/__mocks__/useOneLevel'

describe('AddressContainer', () => {
  const accountName = 'qamarketplace'

  const rules = {
    BRA: usePostalCode,
    ECU: useOneLevel,
  }

  const addressWithCountry = {
    ...address,
    country: { value: 'BRA' },
  }

  it('should call children with the right arguments', () => {
    const children = jest.fn(() => <span />)

    mount(
      <AddressContainer
        accountName={accountName}
        address={addressWithCountry}
        onChangeAddress={jest.fn()}
        rules={rules}
      >
        {children}
      </AddressContainer>
    )

    expect(children).toHaveBeenCalledWith(expect.any(Function))
  })

  it('should handle the validation before calling onChangeAddress', () => {
    const handleAddressChange = jest.fn()

    const children = onChangeAddress => {
      onChangeAddress({ city: { value: 'Rio de Janeiro' } })
      return <span />
    }

    mount(
      <AddressContainer
        accountName={accountName}
        address={addressWithCountry}
        onChangeAddress={handleAddressChange}
        rules={rules}
      >
        {children}
      </AddressContainer>
    )

    expect(handleAddressChange).toHaveBeenCalledWith({
      ...addressWithCountry,
      city: { value: 'Rio de Janeiro', valid: true },
    })
  })

  it('should short-circuit when country changes', () => {
    const handleAddressChange = jest.fn()

    const children = jest.fn(onChangeAddress => {
      onChangeAddress({ country: { value: 'ECU' } })
      return <span />
    })

    mount(
      <AddressContainer
        accountName={accountName}
        address={addressWithCountry}
        onChangeAddress={handleAddressChange}
        rules={rules}
      >
        {children}
      </AddressContainer>
    )

    expect(handleAddressChange).toHaveBeenCalledWith({
      ...addressWithCountry,
      country: { value: 'ECU' },
    })
  })
})
