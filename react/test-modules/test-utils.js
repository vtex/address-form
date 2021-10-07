import React from 'react'
import * as reactTestingLibrary from '@testing-library/react'
import { shallow, mount } from 'enzyme'
import renderer from 'react-test-renderer'
import { IntlProvider, intlShape } from 'react-intl'
import enCountryCodeTranslations from 'i18n-iso-countries/langs/en.json'
import reduce from 'lodash/reduce'
import countryCodes from 'i18n-iso-countries/codes.json'

import defaultStrings from '../../messages/en.json'

function getISOAlpha3(countryCodeAlpha2) {
  return countryCodes.find((c) => c[0] === countryCodeAlpha2)?.[1] ?? null
}

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
    <IntlProvider messages={messages} locale="en-US">
      {node}
    </IntlProvider>,
    options
  )

  return {
    ...rendered,
    rerender: (newUi) =>
      customRender(newUi, {
        container: rendered.container,
        baseElement: rendered.baseElement,
      }),
  }
}

function customMount(node, { context, childContextTypes } = {}) {
  const intlProvider = new IntlProvider(
    {
      locale: 'en-US',
      messages,
    },
    {}
  )

  const { intl } = intlProvider.getChildContext()

  return mount(React.cloneElement(node, { intl }), {
    context: { ...context, intl },
    childContextTypes: {
      intl: intlShape,
      ...childContextTypes,
    },
  })
}

function customShallow(node, options = { context: {} }) {
  const intlProvider = new IntlProvider(
    {
      locale: 'en-US',
      messages,
    },
    {}
  )

  const { intl } = intlProvider.getChildContext()

  return shallow(React.cloneElement(node, { intl }), {
    ...options,
    context: { ...options.context, intl },
  })
}

// re-export everything
module.exports = {
  ...reactTestingLibrary,
  render: customRender,
  mount: customMount,
  shallow: customShallow,
  rendererCreate(node) {
    return renderer.create(
      <IntlProvider messages={messages} locale="en-US">
        {node}
      </IntlProvider>
    )
  },
}
