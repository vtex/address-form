import type { ReactNode } from 'react'
import React from 'react'
import * as reactTestingLibrary from '@testing-library/react'
import { shallow, mount } from 'enzyme'
import renderer from 'react-test-renderer'
import { IntlProvider } from 'react-intl'
import enCountryCodeTranslations from 'i18n-iso-countries/langs/en.json'
import reduce from 'lodash/reduce'
import countryCodes from 'i18n-iso-countries/codes.json'

import { intlShape } from '../intl/utils'
import defaultStrings from '../../messages/en.json'

function getISOAlpha3(countryCodeAlpha2: string) {
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

const customRender = (
  node: ReactNode,
  options?: Omit<reactTestingLibrary.RenderOptions, 'queries'>
) => {
  const rendered = reactTestingLibrary.render(
    <IntlProvider messages={messages} locale="en-US">
      {node}
    </IntlProvider>,
    options
  )

  return {
    ...rendered,
    rerender: (newUi: ReactNode) =>
      customRender(newUi, {
        container: rendered.container,
        baseElement: rendered.baseElement,
      }),
  }
}

function customMount(node, { context = {}, childContextTypes = {} } = {}) {
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

export * from '@testing-library/react'

function rendererCreate(node) {
  return renderer.create(
    <IntlProvider messages={messages} locale="en-US">
      {node}
    </IntlProvider>
  )
}

export {
  customRender as render,
  customMount as mount,
  customShallow as shallow,
  rendererCreate,
}
