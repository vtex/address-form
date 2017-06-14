import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import diff from 'lodash/difference'
import AddressForm, { filterFields } from './AddressForm'
import newAddress from './__mocks__/newAddress'
import BRA from './country/BRA'
import ECU from './country/ECU'
import CHL from './country/CHL'

describe('AddressForm', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <AddressForm
        address={newAddress}
        rules={BRA}
        onChangeAddress={jest.fn()}
      />,
      div
    )
  })

  it('should omit fields that are used in to get the postal code', () => {
    const tree = renderer
      .create(
        <AddressForm
          address={newAddress}
          rules={BRA}
          onChangeAddress={jest.fn()}
        />
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  describe('Filter fields', () => {
    function getFieldNames(fields) {
      return fields.map(({ name }) => name)
    }

    it('should filter when postal code is from postal code', () => {
      const fields = filterFields(BRA)

      expect(
        diff(getFieldNames(BRA.fields), getFieldNames(fields))
      ).toMatchSnapshot()
    })

    it('should filter when postal code is from state', () => {
      const fields = filterFields(ECU)

      expect(
        diff(getFieldNames(ECU.fields), getFieldNames(fields))
      ).toMatchSnapshot()
    })

    it('should filter when postal code is from city', () => {
      const fields = filterFields(CHL)

      expect(
        diff(getFieldNames(CHL.fields), getFieldNames(fields))
      ).toMatchSnapshot()
    })
  })
})
