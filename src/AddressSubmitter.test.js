import React from 'react'
import AddressSubmitter from './AddressSubmitter'
import { shallow, mount } from 'enzyme'

describe('AddressSubmitter', () => {
  it('should render without crashing', () => {
    const onSub = jest.fn()
    mount(
      <AddressSubmitter onSubmit={onSub}>
        {onSubmit => <span />}
      </AddressSubmitter>,
    )
  })

  it('should render its children', () => {
    const onSub = jest.fn()
    const wrapper = shallow(
      <AddressSubmitter onSubmit={onSub}>
        {onSubmit => <span className="unique" />}
      </AddressSubmitter>,
    ).dive()

    expect(wrapper.find('.unique')).toHaveLength(1)
  })

  it('should pass down the received submit function', () => {
    const onSub = jest.fn()
    shallow(
      <AddressSubmitter onSubmit={onSub}>
        {onSubmit => <button onClick={onSubmit} />}
      </AddressSubmitter>,
    )
      .dive()
      .find('button')
      .simulate('click')

    expect(onSub).toHaveBeenCalled()
  })
})
