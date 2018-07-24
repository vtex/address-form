import React from 'react'

export function withPadding(Input, padLevel) {
  return function PaddedInput(props) {
    return <Input {...props} padLevel={padLevel} />
  }
}
