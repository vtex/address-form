import React from 'react'
import { render, screen } from 'test-utils'

import { validateAddress } from '../validateAddress'
import InputFieldContainer from '../InputFieldContainer'
import DefaultInput from '../inputs/DefaultInput'
import type { PostalCodeFieldRule, PostalCodeRules } from '../types/rules'
import type { AddressWithValidation } from '../types/address'
import { TWO_LEVELS } from '../constants'

const cityField: PostalCodeFieldRule = {
  name: 'city',
  label: 'city',
  level: 2,
  basedOn: 'state',
  optionsMap: {
    PB: ['Cabedelo'],
  },
}

const rulesWithOptions: PostalCodeRules = {
  country: null,
  abbr: null,
  postalCodeFrom: TWO_LEVELS,
  postalCodeLevels: ['state', 'city'],
  fields: [
    {
      name: 'postalCode',
      fixedLabel: 'CEP',
      required: true,
      regex: /^\d{5}-?\d{3}$/,
    },
    {
      name: 'state',
      label: 'state',
      options: ['PB'],
    },
    cityField,
  ],
}

const address: AddressWithValidation = validateAddress(
  {
    addressId: { value: '1' },
    addressQuery: { value: null },
    addressType: { value: 'residential' },
    city: { value: null },
    complement: { value: null },
    country: { value: null },
    geoCoordinates: { value: [] },
    isDisposable: { value: true },
    neighborhood: { value: null },
    number: { value: null },
    postalCode: { value: null },
    receiverName: { value: null },
    reference: { value: null },
    state: { value: 'PB' },
    street: { value: null },
  },
  rulesWithOptions
)

describe('InputField container', () => {
  it('should render a select for fields with options', () => {
    render(
      <InputFieldContainer
        field={cityField}
        address={address}
        rules={rulesWithOptions}
        Input={DefaultInput}
        onChangeAddress={jest.fn()}
      />
    )

    const citySelect = screen.getByRole('combobox')

    expect(citySelect).toBeInTheDocument()
    expect(citySelect).toHaveValue('')
    expect(citySelect).toMatchInlineSnapshot(`
      <select
        class="error"
        id="ship-city"
        name="city"
      >
        <option
          value=""
        />
        <option
          value="Cabedelo"
        >
          Cabedelo
        </option>
      </select>
    `)
  })

  it('should include custom value in combobox options if postalCode is valid', () => {
    const myAddress = validateAddress(
      {
        ...address,
        postalCode: {
          value: '58410050',
        },
        city: {
          value: 'Campina Grande',
        },
      },
      rulesWithOptions
    )

    render(
      <InputFieldContainer
        field={cityField}
        address={myAddress}
        rules={rulesWithOptions}
        Input={DefaultInput}
        onChangeAddress={jest.fn()}
      />
    )

    const citySelect = screen.getByRole('combobox')

    expect(citySelect).toHaveValue('Campina Grande')
    expect(citySelect).toMatchInlineSnapshot(`
      <select
        class="success"
        id="ship-city"
        name="city"
      >
        <option
          disabled=""
          value=""
        />
        <option
          value="Cabedelo"
        >
          Cabedelo
        </option>
        <option
          value="Campina Grande"
        >
          Campina Grande
        </option>
      </select>
    `)
  })

  it('should not include value in combobox if postalCode is invalid', () => {
    const myAddress = validateAddress(
      {
        ...address,
        city: {
          value: 'Campina Grande',
        },
      },
      rulesWithOptions
    )

    render(
      <InputFieldContainer
        field={cityField}
        address={myAddress}
        rules={rulesWithOptions}
        Input={DefaultInput}
        onChangeAddress={jest.fn()}
      />
    )

    const citySelect = screen.getByRole('combobox')

    expect(citySelect).toHaveValue('Cabedelo')
    expect(citySelect).toMatchInlineSnapshot(`
      <select
        class="error"
        id="ship-city"
        name="city"
      >
        <option
          disabled=""
          value=""
        />
        <option
          value="Cabedelo"
        >
          Cabedelo
        </option>
      </select>
    `)
  })

  it('should not include null value in combobox', () => {
    const myAddress = validateAddress(
      {
        ...address,
        city: {
          value: null,
        },
      },
      rulesWithOptions
    )

    render(
      <InputFieldContainer
        field={cityField}
        address={myAddress}
        rules={rulesWithOptions}
        Input={DefaultInput}
        onChangeAddress={jest.fn()}
      />
    )

    const citySelect = screen.getByRole('combobox')

    expect(citySelect).toMatchInlineSnapshot(`
      <select
        class="error"
        id="ship-city"
        name="city"
      >
        <option
          value=""
        />
        <option
          value="Cabedelo"
        >
          Cabedelo
        </option>
      </select>
    `)
  })

  it('should render empty combobox if basedOn field value is not set', () => {
    const myAddress = validateAddress(
      {
        ...address,
        state: {
          value: '',
        },
      },
      rulesWithOptions
    )

    render(
      <InputFieldContainer
        field={cityField}
        address={myAddress}
        rules={rulesWithOptions}
        Input={DefaultInput}
        onChangeAddress={jest.fn()}
      />
    )

    const citySelect = screen.getByRole('combobox')

    expect(citySelect).toHaveValue('')
    expect(citySelect).toMatchInlineSnapshot(`
      <select
        class="error"
        id="ship-city"
        name="city"
      >
        <option
          value=""
        />
      </select>
    `)
  })
})
