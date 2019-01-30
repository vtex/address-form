import React from 'react'
import { render } from 'test-utils'
import PostalCodeGetter from './PostalCodeGetter'
import address from './__mocks__/newAddress'
import usePostalCode from './country/__mocks__/usePostalCode'
import useOneLevel from './country/__mocks__/useOneLevel'
import useTwoLevels from './country/__mocks__/useTwoLevels'
import useThreeLevels from './country/__mocks__/useThreeLevels'

describe.only('PostalCodeGetter', () => {
  it('renders without crashing', () => {
    render(
      <PostalCodeGetter
        address={address}
        rules={usePostalCode}
        onChangeAddress={jest.fn()}
      />
    )
  })

  it('render PostalCode', () => {
    const handleChange = jest.fn()

    const { getByLabelText } = render(
      <PostalCodeGetter
        address={address}
        rules={usePostalCode}
        onChangeAddress={handleChange}
      />,
    )

    const result = getByLabelText('CEP')

    expect(result).toBeDefined()
  })

  it('render OneLevel', () => {
    const handleChange = jest.fn()

    const { getByLabelText } = render(
      <PostalCodeGetter
        address={address}
        rules={useOneLevel}
        onChangeAddress={handleChange}
      />,
    )

    const result = getByLabelText('Province')

    expect(result).toBeDefined()
  })

  it('render TwoLevels', () => {
    const handleChange = jest.fn()

    const { getByLabelText } = render(
      <PostalCodeGetter
        address={address}
        rules={useTwoLevels}
        onChangeAddress={handleChange}
      />,
    )

    const firstLevel = getByLabelText('Region')
    const secondLevel = getByLabelText('Community')

    expect(firstLevel).toBeDefined()
    expect(secondLevel).toBeDefined()
  })

  it('render ThreeLevels', () => {
    const handleChange = jest.fn()

    const { getByLabelText } = render(
      <PostalCodeGetter
        address={address}
        rules={useThreeLevels}
        onChangeAddress={handleChange}
      />,
    )

    const firstLevel = getByLabelText('Departament')
    const secondLevel = getByLabelText('Province')
    const thirdLevel = getByLabelText('City')

    expect(firstLevel).toBeDefined()
    expect(secondLevel).toBeDefined()
    expect(thirdLevel).toBeDefined()
  })
})
