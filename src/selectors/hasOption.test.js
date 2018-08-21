import hasOption from './hasOption'

describe('hasOption', () => {
  it('should return a valid option for a valid field', () => {
    const field = 'Rio de Janeiro'
    const options = ['São Paulo', 'Rio de Janeiro']

    const result = hasOption(field, options)

    expect(result).toBe('Rio de Janeiro')
  })

  it('should return false for an invalid field', () => {
    const field = 'Brasília'
    const options = ['São Paulo', 'Rio de Janeiro']

    const result = hasOption(field, options)

    expect(result).toBe(false)
  })

  it('should return a valid option for a field typed without accent', () => {
    const field = 'Sao Paulo'
    const options = ['São Paulo', 'Rio de Janeiro']

    const result = hasOption(field, options)

    expect(result).toBe('São Paulo')
  })

  it('should return a valid option for a field with different case', () => {
    const field = 'Rio De Janeiro'
    const options = ['São Paulo', 'Rio de Janeiro']

    const result = hasOption(field, options)

    expect(result).toBe('Rio de Janeiro')
  })
})
