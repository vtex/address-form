import React from 'react'
import { mount, render } from 'test-utils'

import AddressContainer from './AddressContainer'
import AddressForm from './AddressForm'
import StyleguideInput from './inputs/StyleguideInput'
import address from './__mocks__/newAddress'
import usePostalCode from './country/__mocks__/usePostalCode'
import postalCodeAutoCompleteAddress from './postalCodeAutoCompleteAddress'
import PostalCodeGetter from './PostalCodeGetter'

jest.mock('./postalCodeAutoCompleteAddress')

const descendToChild = (wrapper) =>
  wrapper.children().children().children().children()

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
      </AddressContainer>
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
      </AddressContainer>
    )

    // Act
    const { onChangeAddress } = descendToChild(wrapper).props()

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
      </AddressContainer>
    )

    // Act
    const { onChangeAddress } = descendToChild(wrapper).props()

    onChangeAddress({ country: { value: 'ECU' } })

    // Assert
    expect(handleAddressChange).toHaveBeenCalledWith({
      ...addressWithCountry,
      country: { value: 'ECU' },
    })
  })

  it('should call onChangeAddress when postal code changes if shouldHandleAddressChangeOnMount is true', () => {
    const handleAddressChange = jest.fn()
    const addressWithPostalCode = {
      ...address,
      postalCode: { value: '22250-040' },
    }

    const wrapper = mount(
      <AddressContainer
        rules={usePostalCode}
        address={addressWithPostalCode}
        onChangeAddress={handleAddressChange}
        shouldHandleAddressChangeOnMount
      >
        <PostalCodeGetter rules={usePostalCode} />
      </AddressContainer>
    )

    wrapper.setProps({
      address: { ...address, postalCode: { value: '22250-041' } },
    })

    expect(handleAddressChange).toHaveBeenCalledTimes(2)
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
        </AddressContainer>
      )

      // Act
      const { onChangeAddress } = descendToChild(wrapper).props()

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
        </AddressContainer>
      )

      // Act
      const { onChangeAddress } = descendToChild(wrapper).props()

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
        </AddressContainer>
      )

      // Act
      const { onChangeAddress } = descendToChild(wrapper).props()

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
        </AddressContainer>
      )

      // Act
      const { onChangeAddress } = descendToChild(wrapper).props()

      onChangeAddress({ postalCode: { value: '22231000' } })

      // Assert
      expect(postalCodeAutoCompleteAddress).not.toHaveBeenCalled()
    })
  })
  describe('fieldsStyleRules', () => {
    describe('should use different required indicators when using StyleguideInput and fieldsStyleRules is set', () => {
      it('asterisk-on-label', () => {
        const wrapper = mount(
          <AddressContainer
            fieldsStyleRules={{ requiredIndicator: 'asterisk-on-label' }}
            address={address}
            rules={usePostalCode}
            Input={StyleguideInput}
            onChangeAddress={jest.fn()}
          >
            <AddressForm rules={usePostalCode} />
          </AddressContainer>
        )

        expect(wrapper.find('div.vtex-address-form__street label')).toHaveText(
          'Street *'
        )
        expect(
          wrapper.find('div.vtex-address-form__street input').props()
            .placeholder
        ).toBeNull()

        expect(
          wrapper.find('div.vtex-address-form__complement label')
        ).toHaveText('Additional information (e.g.: apt 201)')
        expect(
          wrapper.find('div.vtex-address-form__complement input').props()
            .placeholder
        ).toBeNull()
      })

      it('optional-placeholder', () => {
        const wrapper = mount(
          <AddressContainer
            fieldsStyleRules={{ requiredIndicator: 'optional-placeholder' }}
            rules={usePostalCode}
            address={address}
            Input={StyleguideInput}
            onChangeAddress={jest.fn()}
          >
            <AddressForm rules={usePostalCode} />
          </AddressContainer>
        )

        expect(wrapper.find('div.vtex-address-form__street label')).toHaveText(
          'Street'
        )
        expect(
          wrapper.find('div.vtex-address-form__street input').props()
            .placeholder
        ).toBeNull()

        expect(
          wrapper.find('div.vtex-address-form__complement label')
        ).toHaveText('Additional information (e.g.: apt 201)')
        expect(
          wrapper.find('div.vtex-address-form__complement input').props()
            .placeholder
        ).toBe('Optional')
      })

      it('default = optional-placeholder', () => {
        const wrapper = mount(
          <AddressContainer
            rules={usePostalCode}
            address={address}
            Input={StyleguideInput}
            onChangeAddress={jest.fn()}
          >
            <AddressForm rules={usePostalCode} />
          </AddressContainer>
        )

        expect(wrapper.find('div.vtex-address-form__street label')).toHaveText(
          'Street'
        )
        expect(
          wrapper.find('div.vtex-address-form__street input').props()
            .placeholder
        ).toBeNull()

        expect(
          wrapper.find('div.vtex-address-form__complement label')
        ).toHaveText('Additional information (e.g.: apt 201)')
        expect(
          wrapper.find('div.vtex-address-form__complement input').props()
            .placeholder
        ).toBe('Optional')
      })
    })
  })
})
