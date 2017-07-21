import postalCodeAutoCompleteAddress from './postalCodeAutoCompleteAddress'
import newAddress from './__mocks__/newAddress'
import usePostalCode from './country/__mocks__/usePostalCode'

jest.mock('./transforms/address')
jest.mock('./postalCodeService')

describe('postalCodeAutoCompleteAddress()', () => {
  const accountName = 'qamarketplace'
  const address = {
    ...newAddress,
    country: { value: 'BRA' },
    postalCode: { value: '22231000' },
  }

  it('should return the postal code field with loading true', () => {
    const callback = jest.fn()

    const resultAddress = postalCodeAutoCompleteAddress(
      address,
      accountName,
      usePostalCode,
      callback
    )

    expect(resultAddress.postalCode.loading).toBe(true)
  })

  it('should call callback function', done => {
    function callback(data) {
      done()
    }

    postalCodeAutoCompleteAddress(address, accountName, usePostalCode, callback)
  })

  it('should call callback function with the postal code loading false', done => {
    function callback(data) {
      expect(data.postalCode.loading).toBeFalsy()
      done()
    }

    postalCodeAutoCompleteAddress(address, accountName, usePostalCode, callback)
  })

  it('should handle promise rejection', done => {
    const rejectionAddress = {
      ...address,
      postalCode: { value: '22251000' },
    }

    function callback(data) {
      expect(data.postalCode.loading).toBeUndefined()
      done()
    }

    postalCodeAutoCompleteAddress(
      rejectionAddress,
      accountName,
      usePostalCode,
      callback
    )
  })

  it('should remove empty fields', done => {
    function callback(data) {
      expect(data.number).toBeUndefined()
      expect(data.complement).toBeUndefined()
      expect(data.reference).toBeUndefined()
      done()
    }

    postalCodeAutoCompleteAddress(address, accountName, usePostalCode, callback)
  })
})
