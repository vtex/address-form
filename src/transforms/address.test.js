import { addValidation, removeValidation, addNewField } from './address'
import address from '../__mocks__/newAddress'
import addressWithoutValidation from '../__mocks__/addressWithoutValidation'

describe('Address Transform', () => {
  it('should add validation object to fields', () => {
    const result = addValidation(addressWithoutValidation)

    expect(result).toMatchObject(address)
  })

  it('should remove validation object from fields', () => {
    const result = removeValidation(address)

    expect(result).toMatchObject(addressWithoutValidation)
  })

  it('should add a new field to all address properties', () => {
    const fieldName = 'foo'
    const value = 'bar'

    const result = addNewField(address, fieldName, value)

    expect(result).toHaveProperty(`addressId.${fieldName}`, value)
    expect(result).toHaveProperty(`postalCode.${fieldName}`, value)
  })

  it('should add a new field property but keep previous ones', () => {
    const changedAddress = {
      ...address,
      postalCode: { value: '123', valid: true },
    }
    const fieldName = 'foo'
    const value = 'bar'

    const result = addNewField(changedAddress, fieldName, value)

    expect(result).toHaveProperty(`postalCode.${fieldName}`, value)
    expect(result).toHaveProperty('postalCode.value', '123')
    expect(result).toHaveProperty('postalCode.valid', true)
  })
})
