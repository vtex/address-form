import React from 'react'
import { mount, shallow } from 'enzyme'
import SelectPostalCode from './SelectPostalCode'
import useOneLevel from '../country/__mocks__/useOneLevel'
import useTwoLevels from '../country/__mocks__/useTwoLevels'
import useThreeLevels from '../country/__mocks__/useThreeLevels'
import address from '../__mocks__/newAddress'
import find from 'lodash/find'

describe('SelectPostalCode', () => {
  const firstLevelName = useOneLevel.postalCodeLevel
  const firstLevelField = find(
    useOneLevel.fields,
    field => field.name === firstLevelName
  )

  it('should call children with the right arguments', () => {
    const idComponent = jest.fn(() => <div />)

    shallow(
      <SelectPostalCode
        address={address}
        rules={useOneLevel}
        onChangeAddress={jest.fn()}
      >
        {idComponent}
      </SelectPostalCode>
    )

    expect(idComponent).toHaveBeenCalledWith({
      address,
      field: firstLevelField,
      options: expect.any(Array),
      onChangeAddress: expect.any(Function),
    })
  })

  it('should call children with options with postal codes', () => {
    const idComponent = jest.fn(() => <div />)
    const firstLevelOptions = useOneLevel.firstLevelPostalCodes.map(({
      label,
      postalCode,
    }) => ({
      value: `${label}___${postalCode}`,
      label: label,
    }))

    shallow(
      <SelectPostalCode
        address={address}
        rules={useOneLevel}
        onChangeAddress={jest.fn()}
      >
        {idComponent}
      </SelectPostalCode>
    )

    expect(idComponent).toHaveBeenCalledWith({
      address,
      field: expect.anything(),
      options: firstLevelOptions,
      onChangeAddress: expect.any(Function),
    })
  })

  it('should call children with address with postal-code-defining-field with postal code appended to its value', () => {
    const idComponent = jest.fn(() => <div />)
    shallow(
      <SelectPostalCode
        address={{
          ...address,
          postalCode: { value: '0001' },
          state: { value: 'Bolivar' },
        }}
        rules={useOneLevel}
        onChangeAddress={jest.fn()}
      >
        {idComponent}
      </SelectPostalCode>
    )

    const calledWithAddress = idComponent.mock.calls[0][0].address

    expect(calledWithAddress.state).toMatchObject({
      value: 'Bolivar___0001',
    })
  })

  it('should handle change leaving postal-code-defining-field clean', () => {
    const idComponent = jest.fn(({ onChangeAddress }) => {
      onChangeAddress({ state: { value: 'Azuay___0000' } })
      return <div />
    })
    const handleChange = jest.fn()

    shallow(
      <SelectPostalCode
        address={{
          ...address,
          postalCode: { value: '0001' },
          state: { value: 'Bolivar' },
        }}
        rules={useOneLevel}
        onChangeAddress={handleChange}
      >
        {idComponent}
      </SelectPostalCode>
    )

    expect(handleChange).toHaveBeenCalledWith({
      postalCode: { value: '0000' },
      state: { value: 'Azuay' },
    })
  })
})
