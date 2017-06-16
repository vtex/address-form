import { getField, hasOptions, getListOfOptions } from './fields'

describe('Field Selectors', () => {
  it('getField()', () => {
    const rules = {
      fields: [
        { name: 'postalCode', label: 'zipCode' },
        { name: 'city', label: 'community' },
      ],
    }

    const field = getField('city', rules)

    expect(field.label).toBe('community')
  })

  describe('hasOptions()', () => {
    it('for field with options', () => {
      const field = {
        name: 'state',
        options: ['PE', 'SP'],
      }

      const result = hasOptions(field)

      expect(result).toBe(true)
    })

    it('for field with optionsPairs', () => {
      const field = {
        name: 'state',
        optionsPairs: [
          { value: 'PE', label: 'Pernambuco' },
          { value: 'SP', label: 'São Paulo' },
        ],
      }

      const result = hasOptions(field)

      expect(result).toBe(true)
    })

    it('for field with optionsMap', () => {
      const field = {
        name: 'state',
        optionsMap: {
          PE: ['Recife', 'Olinda'],
          SP: ['São Paulo', 'Santos'],
        },
      }

      const result = hasOptions(field)

      expect(result).toBe(true)
    })
  })

  describe('getListOfOptions()', () => {
    it('field with options should get an object of value and label', () => {
      const field = {
        name: 'state',
        options: ['PE', 'SP'],
      }
      const address = {}
      const rules = {}

      const options = getListOfOptions(field, address, rules)

      expect(options[0]).toMatchObject({ value: 'PE', label: 'PE' })
    })

    it('field with optionsPairs should return its optionsPairs', () => {
      const field = {
        name: 'state',
        optionsPairs: [
          { value: 'PE', label: 'Pernambuco' },
          { value: 'SP', label: 'São Paulo' },
        ],
      }
      const address = {}
      const rules = {}

      const options = getListOfOptions(field, address, rules)

      expect(options[0]).toMatchObject({ value: 'PE', label: 'Pernambuco' })
    })

    it('field with optionsMap level 2 should get options based on other field value', () => {
      const field = {
        name: 'city',
        basedOn: 'state',
        level: 2,
        optionsMap: {
          PE: ['Recife', 'Olinda'],
          SP: ['São Paulo', 'Santos'],
        },
      }
      const address = { state: 'PE' }
      const rules = {}

      const options = getListOfOptions(field, address, rules)

      expect(options[0]).toMatchObject({ value: 'Recife', label: 'Recife' })
    })

    it('field with optionsMap level 3 should get options based on other field value', () => {
      const field = {
        name: 'neighborhood',
        basedOn: 'city',
        level: 3,
        optionsMap: {
          PE: {
            Recife: ['Boa Viagem', 'Casa Forte'],
          },
        },
      }
      const address = { state: 'PE', city: 'Recife' }
      const rules = {
        fields: [{ name: 'city', basedOn: 'state' }, { name: 'state' }],
      }

      const options = getListOfOptions(field, address, rules)

      expect(options[0]).toMatchObject({
        value: 'Boa Viagem',
        label: 'Boa Viagem',
      })
    })
  })
})
