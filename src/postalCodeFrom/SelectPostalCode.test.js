import React from 'react'
import { mount } from 'enzyme'
import SelectPostalCode from './SelectPostalCode'
import useOneLevel from '../country/__mocks__/useOneLevel'
import useTwoLevels from '../country/__mocks__/useTwoLevels'
import useThreeLevels from '../country/__mocks__/useThreeLevels'
import address from '../__mocks__/newAddress'

describe('SelectPostalCode', () => {
  describe('for one level', () => {
    it('should render select for first level', () => {
      const wrapper = mount(
        <SelectPostalCode
          address={address}
          rules={useOneLevel}
          onChangeAddress={jest.fn()}
        />
      )

      const firstLevelName = useOneLevel.postalCodeLevel

      expect(wrapper.find(`select[name="${firstLevelName}"]`)).toHaveLength(1)
    })

    it('should change the right field', () => {
      const handleChange = jest.fn()
      const wrapper = mount(
        <SelectPostalCode
          address={address}
          rules={useOneLevel}
          onChangeAddress={handleChange}
        />
      )

      const firstLevelName = useOneLevel.postalCodeLevel

      const event = { target: { value: 'Azuay___0000' } }
      wrapper
        .find(`select[name="${firstLevelName}"]`)
        .simulate('change', event)

      expect(handleChange).toHaveBeenCalledWith({
        ...address,
        [firstLevelName]: 'Azuay',
        postalCode: '0000',
      })
    })
  })

  describe('for two levels', () => {
    it('should render select for second level', () => {
      const wrapper = mount(
        <SelectPostalCode
          address={address}
          rules={useTwoLevels}
          onChangeAddress={jest.fn()}
        />
      )

      const secondLevelName = useTwoLevels.postalCodeLevels[1]

      expect(wrapper.find(`select[name="${secondLevelName}"]`)).toHaveLength(1)
    })

    it('should change the right field', () => {
      const handleChange = jest.fn()
      const wrapper = mount(
        <SelectPostalCode
          address={address}
          rules={useTwoLevels}
          onChangeAddress={handleChange}
        />
      )

      const secondLevelName = useTwoLevels.postalCodeLevels[1]

      const event = { target: { value: 'Camiña___1150000' } }
      wrapper
        .find(`select[name="${secondLevelName}"]`)
        .simulate('change', event)

      expect(handleChange).toHaveBeenCalledWith({
        ...address,
        [secondLevelName]: 'Camiña',
        postalCode: '1150000',
      })
    })
  })

  describe('for three levels', () => {
    it('should render select for third level', () => {
      const wrapper = mount(
        <SelectPostalCode
          address={address}
          rules={useThreeLevels}
          onChangeAddress={jest.fn()}
        />
      )

      const thirdLevelName = useThreeLevels.postalCodeLevels[2]

      expect(wrapper.find(`select[name="${thirdLevelName}"]`)).toHaveLength(1)
    })

    it('should change the right field', () => {
      const handleChange = jest.fn()
      const wrapper = mount(
        <SelectPostalCode
          address={address}
          rules={useThreeLevels}
          onChangeAddress={handleChange}
        />
      )

      const thirdLevelName = useThreeLevels.postalCodeLevels[2]

      const event = { target: { value: 'Canasmoro___90400' } }
      wrapper
        .find(`select[name="${thirdLevelName}"]`)
        .simulate('change', event)

      expect(handleChange).toHaveBeenCalledWith({
        ...address,
        [thirdLevelName]: 'Canasmoro',
        postalCode: '90400',
      })
    })
  })
})
