import CountryType from './CountryType'

test('failing prop', () => {
  const result = CountryType({ country: 'MORE' }, 'country', 'Component')

  expect(result).toBeInstanceOf(Error)
})

test('OK prop', () => {
  const result = CountryType({ country: 'BRA' }, 'country', 'Component')

  expect(result).toBeUndefined()
})
