import React from 'react'
import renderer from 'react-test-renderer'
import OneLevel from './OneLevel'
import useOneLevel from '../country/__mocks__/useOneLevel'
import address from '../__mocks__/newAddress'

describe('OneLevel', () => {
  it('show state options', () => {
    const tree = renderer
      .create(
        <OneLevel
          address={address}
          rules={useOneLevel}
          onChangeAddress={jest.fn()}
        />
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
