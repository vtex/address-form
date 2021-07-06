import postalCodeAutoCompleteAddress from './postalCodeAutoCompleteAddress'
import newAddress from './__mocks__/newAddress'
import usePostalCode from './country/__mocks__/usePostalCode'

jest.mock('./postalCodeService')

const waitForResult = async () => {
  jest.runAllTimers()

  await new Promise(setImmediate)
  await new Promise(setImmediate)
}

describe('postalCodeAutoCompleteAddress()', () => {
  const cors = false
  const accountName = null
  const address = {
    ...newAddress,
    country: { value: 'BRA' },
    postalCode: { value: '22231000' },
  }

  it('should return the postal code field with loading true', () => {
    const callback = jest.fn()

    const resultAddress = postalCodeAutoCompleteAddress({
      cors,
      accountName,
      address,
      rules: usePostalCode,
      callback,
    })

    expect(resultAddress.postalCode.loading).toBe(true)
  })

  it('should call callback function', async () => {
    jest.useFakeTimers()

    const callback = jest.fn()

    postalCodeAutoCompleteAddress({
      cors,
      accountName,
      address,
      rules: usePostalCode,
      callback,
    })

    await waitForResult()

    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('should call callback function with the postal code loading false', async () => {
    jest.useFakeTimers()

    const callback = jest.fn()

    postalCodeAutoCompleteAddress({
      cors,
      accountName,
      address,
      rules: usePostalCode,
      callback,
    })

    await waitForResult()

    expect(callback).toHaveBeenCalledWith(
      expect.objectContaining({
        postalCode: expect.objectContaining({ loading: undefined }),
      })
    )
  })

  it('should handle promise rejection', async () => {
    jest.useFakeTimers()

    const callback = jest.fn()

    const rejectionAddress = {
      ...address,
      postalCode: { value: '22251000' },
    }

    postalCodeAutoCompleteAddress({
      cors,
      accountName,
      address: rejectionAddress,
      rules: usePostalCode,
      callback,
    })

    await waitForResult()

    expect(callback).toHaveBeenCalledWith(
      expect.objectContaining({
        postalCode: expect.objectContaining({ loading: undefined }),
      })
    )
  })

  it('should keep address id when auto completing fields', async () => {
    const addressId = 'addressId1autoComplete'
    const modifiedAddress = {
      ...address,
      addressId: { value: addressId },
      postalCode: { value: '22251000' },
    }

    await new Promise((resolve) => {
      function callback(data) {
        expect(data.addressId.value).toBe(addressId)
        resolve()
      }

      postalCodeAutoCompleteAddress({
        cors,
        accountName,
        address: modifiedAddress,
        rules: usePostalCode,
        callback,
      })
    })
  })
})
