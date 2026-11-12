import React from 'react'
import AddressSubmitter from './AddressSubmitter'
import { shallow, mount } from 'test-utils'
import fbAddress from './__mocks__/facebookAddress'
import { addValidation } from './transforms/address'
import usaRules from './country/USA'

describe('AddressSubmitter', () => {
  let onSub, onCA, address, wrapper, Component
  beforeEach(() => {
    onSub = jest.fn()
    onCA = jest.fn()
    address = addValidation(fbAddress)
    Component = (
      <AddressSubmitter
        onSubmit={onSub}
        onChangeAddress={onCA}
        address={address}
        rules={usaRules}
      >
        {onSubmit => <button className="unique" onClick={onSubmit} />}
      </AddressSubmitter>
    )
    wrapper = shallow(Component)
      .dive()
      .dive()
  })

  it('should render without crashing', () => {
    mount(Component)
  })

  it('should render its children', () => {
    expect(wrapper.find('.unique')).toHaveLength(1)
  })

  it('should call the received onSubmit function on submission', () => {
    wrapper.find('button').simulate('click')

    expect(onSub).toHaveBeenCalled()
  })

  it('should call the received onChangeAddress function on submission', () => {
    wrapper.find('button').simulate('click')

    expect(onCA).toHaveBeenCalled()
  })

  function submitWith(customAddress) {
    shallow(
      <AddressSubmitter
        onSubmit={onSub}
        onChangeAddress={onCA}
        address={customAddress}
        rules={usaRules}
      >
        {onSubmit => <button className="unique" onClick={onSubmit} />}
      </AddressSubmitter>
    )
      .dive()
      .dive()
      .find('button')
      .simulate('click')
  }

  it('should flag invalid fields with showErrorMessage on submission', () => {
    submitWith({
      ...address,
      postalCode: { ...address.postalCode, value: '' },
    })

    expect(onSub).toHaveBeenCalledWith(false, expect.any(Object))
    expect(onCA).toHaveBeenCalledWith(
      expect.objectContaining({
        postalCode: expect.objectContaining({
          valid: false,
          showErrorMessage: true,
        }),
      })
    )
  })

  it('should clear a stale invalid flag from a field that is valid now', () => {
    submitWith({
      ...address,
      street: { ...address.street, valid: false, reason: 'ERROR_EMPTY_FIELD' },
    })

    expect(onSub).toHaveBeenCalledWith(true, expect.any(Object))
    expect(onCA).toHaveBeenCalledWith(
      expect.objectContaining({
        street: expect.objectContaining({ valid: true }),
      })
    )
  })

  it('should correctly validate the received address', () => {
    wrapper.find('button').simulate('click')

    expect(onSub).toHaveBeenCalledWith(true, expect.any(Object))
  })
})
