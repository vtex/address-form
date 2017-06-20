import React from 'react'
import renderer from 'react-test-renderer'
import TwoLevels from './TwoLevels'
import useTwoLevels from '../country/__mocks__/useTwoLevels'
import address from '../__mocks__/newAddress'

describe('TwoLevels', () => {
  it('without first level selected', () => {
    const tree = renderer
      .create(
        <TwoLevels
          address={address}
          rules={useTwoLevels}
          onChangeAddress={jest.fn()}
        />
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('with first level selected', () => {
    const tree = renderer
      .create(
        <TwoLevels
          address={{
            ...address,
            state: { value: 'I Región' },
          }}
          rules={useTwoLevels}
          onChangeAddress={jest.fn()}
        />
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
