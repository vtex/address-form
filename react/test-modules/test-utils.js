import React from 'react'
import * as reactTestingLibrary from 'react-testing-library'
import { shallow, mount } from 'enzyme'
import renderer from 'react-test-renderer'
import { IntlProvider, intlShape } from 'react-intl'
import defaultStrings from '../../messages/en.json'
import enCountryCodeTranslations from 'i18n-iso-countries/langs/en.json'
import reduce from 'lodash/reduce'
import { getISOAlpha3 } from '../../demo/src/countryISO'

function addCountryCodeNameSpace(obj) {
  return reduce(
    obj,
    (acc, value, key) => {
      acc[`country.${getISOAlpha3(key)}`] = value
      return acc
    },
    {}
  )
}

const messages = {
  ...defaultStrings,
  ...addCountryCodeNameSpace(enCountryCodeTranslations),
}

const customRender = (node, options) => {
  const rendered = reactTestingLibrary.render(
    <IntlProvider
      messages={messages}
      locale="en-US">
      {node}
    </IntlProvider>,
    options
  )

  return {
    ...rendered,
    rerender: newUi =>
      customRender(newUi, {
        container: rendered.container,
        baseElement: rendered.baseElement,
      }),
  }
}

function customMount(node, { context, childContextTypes } = {}) {
  const intlProvider = new IntlProvider({
    locale: 'en-US',
    messages,
  }, {})

  const { intl } = intlProvider.getChildContext()

  return mount(
    React.cloneElement(node, { intl }),
    {
      context: Object.assign({}, context, {intl}),
      childContextTypes: Object.assign({}, { intl: intlShape }, childContextTypes),
    }
  )
}

function customShallow(node, options = { context: {}}) {
  const intlProvider = new IntlProvider({
    locale: 'en-US',
    messages,
  }, {})

  const { intl } = intlProvider.getChildContext()

  return shallow(
    React.cloneElement(node, { intl }),
    { ...options, context: { ...options.context, intl } }
  )
}

// re-export everything
module.exports = {
  ...reactTestingLibrary,
  render: customRender,
  mount: customMount,
  shallow: customShallow,
  rendererCreate(node) {
    return renderer.create(
      <IntlProvider
        messages={messages}
        locale="en-US">
        {node}
      </IntlProvider>
    )
  },
}
