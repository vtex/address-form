import React from 'react'
import renderer from 'react-test-renderer'
import SelectLevel from './SelectLevel'
import useThreeLevels from '../country/__mocks__/useThreeLevels'
import address from '../__mocks__/newAddress'

describe('SelectLevel', () => {
  it('show state options', () => {
    const tree = renderer
      .create(
        <SelectLevel
          level={0}
          address={address}
          rules={useThreeLevels}
          onChangeAddress={jest.fn()}
        />
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('show city options', () => {
    const tree = renderer
      .create(
        <SelectLevel
          level={1}
          address={address}
          rules={useThreeLevels}
          onChangeAddress={jest.fn()}
        />
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
