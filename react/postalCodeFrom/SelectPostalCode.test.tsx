import React from 'react'
import { render, screen, userEvent } from 'test-utils'
import { IntlProvider } from 'react-intl'

import DefaultInput from '../inputs/DefaultInput'
import SelectPostalCode from './SelectPostalCode'
import useOneLevel from '../country/__mocks__/useOneLevel'
import useTwoLevels from '../country/__mocks__/useTwoLevels'
import address from '../__mocks__/newAddress'
import pt from '../../messages/pt.json'
import { validateAddress } from '../validateAddress'

describe('SelectPostalCode', () => {
  it('should render all options with postal codes', () => {
    const firstLevelOptions =
      useOneLevel.firstLevelPostalCodes?.map(({ label, postalCode }) => ({
        value: `${label}___${postalCode}`,
        label,
      })) ?? []

    render(
      <IntlProvider locale="pt" messages={pt}>
        <SelectPostalCode
          Input={DefaultInput}
          address={address}
          rules={useOneLevel}
          onChangeAddress={jest.fn()}
        />
      </IntlProvider>
    )

    const options = screen.getAllByRole('option')

    expect(options).toHaveLength(firstLevelOptions.length + 1)

    firstLevelOptions.forEach(({ value, label }) => {
      const option = screen.getByRole('option', { name: label })

      expect(option).toBeInTheDocument()
      expect(option).toHaveValue(value)
    })
  })

  it('should render postal-code-defining field with postal code appended to its value', () => {
    render(
      <IntlProvider locale="pt" messages={pt}>
        <SelectPostalCode
          Input={DefaultInput}
          address={{
            ...address,
            postalCode: { value: '0001' },
            state: { value: 'Bolivar' },
          }}
          rules={useOneLevel}
          onChangeAddress={jest.fn()}
        />
      </IntlProvider>
    )

    const state = screen.getByRole('combobox', { name: 'Província' })

    expect(state).toHaveValue('Bolivar___0001')
  })

  it('should handle change leaving postal-code-defining-field clean', async () => {
    const handleChange = jest.fn()

    render(
      <SelectPostalCode
        Input={DefaultInput}
        address={{
          ...address,
          postalCode: { value: '0001' },
          state: { value: 'Bolivar' },
        }}
        rules={useOneLevel}
        onChangeAddress={handleChange}
      />
    )

    const state = screen.getByRole('combobox', { name: 'Province' })
    const option = screen.getByRole('option', { name: 'Azuay' })

    await userEvent.selectOptions(state, option)

    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        postalCode: { value: '0000' },
        state: expect.objectContaining({
          value: 'Azuay',
          postalCodeAutoCompleted: true,
        }),
      })
    )
  })

  it('should render single option for address with valid postalCode', () => {
    const myAddress = validateAddress(
      {
        ...address,
        postalCode: {
          value: '281930',
        },
        state: {
          value: 'Región XIV',
        },
        neighborhood: {
          value: 'My Neighborhood',
        },
      },
      useTwoLevels
    )

    render(
      <SelectPostalCode
        Input={DefaultInput}
        address={myAddress}
        rules={useTwoLevels}
        onChangeAddress={jest.fn()}
      />
    )

    const neighborhood = screen.getByRole('combobox')
    const option = screen.getByRole('option', {
      name: 'My Neighborhood',
    }) as HTMLOptionElement

    const allOptions = screen.getAllByRole('option')

    expect(neighborhood).toHaveValue(option.value)
    expect(allOptions).toHaveLength(2)
  })
})
