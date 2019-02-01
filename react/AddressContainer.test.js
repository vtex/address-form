import React from 'react'
import AddressContainer from './AddressContainer'
import address from './__mocks__/newAddress'
import usePostalCode from './country/__mocks__/usePostalCode'
import postalCodeAutoCompleteAddress from './postalCodeAutoCompleteAddress'
import PostalCodeGetter from './PostalCodeGetter'
import { mount, render } from 'test-utils'

jest.mock('./postalCodeAutoCompleteAddress')

const descendToChild = wrapper =>
  wrapper
    .children()
    .children()
    .children()
    .children()

describe('AddressContainer', () => {
  const accountName = 'qamarketplace'

  const addressWithCountry = {
    ...address,
    country: { value: 'BRA' },
  }

  it('should render its children', () => {
    // Arrange
    const testId = 'foo'

    const { getByTestId } = render(
      <AddressContainer
        cors
        accountName={accountName}
        address={addressWithCountry}
        onChangeAddress={jest.fn()}
        rules={usePostalCode}
      >
        <span data-testid={testId} />
      </AddressContainer>,
    )

    // Act
    const result = getByTestId(testId)

    // Assert
    expect(result).toBeDefined()
  })

  it('should handle the validation before calling onChangeAddress', () => {
    // Arrange
    const handleAddressChange = jest.fn()
    const wrapper = mount(
      <AddressContainer
        cors
        accountName={accountName}
        address={addressWithCountry}
        onChangeAddress={handleAddressChange}
        rules={usePostalCode}
      >
        <PostalCodeGetter rules={usePostalCode} />
      </AddressContainer>,
    )

    // Act
    const onChangeAddress = descendToChild(wrapper).props().onChangeAddress
    onChangeAddress({ city: { value: 'Rio de Janeiro' } })

    // Assert
    expect(handleAddressChange).toHaveBeenCalledWith({
      ...addressWithCountry,
      city: { value: 'Rio de Janeiro', valid: true },
    })
  })

  it('should short-circuit when country changes', () => {
    // Arrange
    const handleAddressChange = jest.fn()
    const wrapper = mount(
      <AddressContainer
        cors
        accountName={accountName}
        address={addressWithCountry}
        onChangeAddress={handleAddressChange}
        rules={usePostalCode}
      >
        <PostalCodeGetter rules={usePostalCode} />
      </AddressContainer>,
    )

    // Act
    const onChangeAddress = descendToChild(wrapper).props().onChangeAddress
    onChangeAddress({ country: { value: 'ECU' } })

    // Assert
    expect(handleAddressChange).toHaveBeenCalledWith({
      ...addressWithCountry,
      country: { value: 'ECU' },
    })
  })

  describe('Postal code auto complete', () => {
    beforeEach(() => {
      postalCodeAutoCompleteAddress.mockClear()
    })

    it('should auto complete postal code when postal code is valid', () => {
      // Arrange
      const handleAddressChange = jest.fn()
      const wrapper = mount(
        <AddressContainer
          cors
          accountName={accountName}
          address={addressWithCountry}
          onChangeAddress={handleAddressChange}
          rules={usePostalCode}
        >
          <PostalCodeGetter rules={usePostalCode} />
        </AddressContainer>,
      )

      // Act
      const onChangeAddress = descendToChild(wrapper).props().onChangeAddress
      onChangeAddress({ postalCode: { value: '22231000' } })

      // Assert
      expect(postalCodeAutoCompleteAddress).toHaveBeenCalled()
    })

    it('should not auto complete postal code when postal code is invalid', () => {
      // Arrange
      const handleAddressChange = jest.fn()
      const wrapper = mount(
        <AddressContainer
          cors
          accountName={accountName}
          address={addressWithCountry}
          onChangeAddress={handleAddressChange}
          rules={usePostalCode}
        >
          <PostalCodeGetter rules={usePostalCode} />
        </AddressContainer>,
      )

      // Act
      const onChangeAddress = descendToChild(wrapper).props().onChangeAddress
      onChangeAddress({ postalCode: { value: '222' } })

      // Assert
      expect(postalCodeAutoCompleteAddress).not.toHaveBeenCalled()
    })

    it('should not auto complete postal code when postal code was auto completed by geolocation', () => {
      // Arrange
      const handleAddressChange = jest.fn()
      const wrapper = mount(
        <AddressContainer
          cors
          accountName={accountName}
          address={addressWithCountry}
          onChangeAddress={handleAddressChange}
          rules={usePostalCode}
        >
          <PostalCodeGetter rules={usePostalCode} />
        </AddressContainer>,
      )

      // Act
      const onChangeAddress = descendToChild(wrapper).props().onChangeAddress
      onChangeAddress({
        postalCode: { value: '22231000', geolocationAutoCompleted: true },
      })

      // Assert
      expect(postalCodeAutoCompleteAddress).not.toHaveBeenCalled()
    })

    it('should not auto complete postal code when prop autoCompletePostalCode is false', () => {
      // Arrange
      const handleAddressChange = jest.fn()
      const wrapper = mount(
        <AddressContainer
          cors
          accountName={accountName}
          address={addressWithCountry}
          onChangeAddress={handleAddressChange}
          autoCompletePostalCode={false}
          rules={usePostalCode}
        >
          <PostalCodeGetter rules={usePostalCode} />
        </AddressContainer>,
      )

      // Act
      const onChangeAddress = descendToChild(wrapper).props().onChangeAddress
      onChangeAddress({ postalCode: { value: '22231000' } })

      // Assert
      expect(postalCodeAutoCompleteAddress).not.toHaveBeenCalled()
    })
  })
})
