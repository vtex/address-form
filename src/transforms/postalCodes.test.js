import {
  statePostalCodes,
  citiesPostalCodes,
  neighborhoodPostalCodes,
} from './postalCodes'

describe('Postal Code Transforms', () => {
  it('should transform state postal codes', () => {
    const mapOfStateAndCities = {
      StateName01: {
        City01: '1',
        City02: '1',
      },
      StateName02: {
        City03: '2',
      },
    }

    const result = statePostalCodes(mapOfStateAndCities)

    expect(result).toMatchSnapshot()
  })

  it('should transform cities postal codes', () => {
    const mapOfStateAndCities = {
      StateName01: {
        City01: '1',
        City02: '2',
      },
      StateName02: {
        City03: '3',
      },
    }

    const result = citiesPostalCodes(mapOfStateAndCities)

    expect(result).toMatchSnapshot()
  })

  it('should transform neighborhoods postal codes', () => {
    const mapOfStateAndCities = {
      StateName01: {
        City01: {
          Neighborhood1: '1',
          Neighborhood2: '2',
        },
        City02: {
          Neighborhood3: '3',
          Neighborhood4: '4',
        },
      },
      StateName02: {
        City03: {
          Neighborhood5: '5',
        },
      },
    }

    const result = neighborhoodPostalCodes(mapOfStateAndCities)

    expect(result).toMatchSnapshot()
  })
})
