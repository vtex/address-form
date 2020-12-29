import map from 'lodash/map'
import find from 'lodash/find'

import cleanStr from './cleanStr'

export default function hasOption(value, options) {
  const cleanField = cleanStr(value)
  const cleanOptions = map(options, (str) => ({
    clean: cleanStr(str),
    value: str,
  }))

  const option = find(cleanOptions, (opt) => opt.clean === cleanField)

  if (option) {
    return option.value
  }

  return false
}
