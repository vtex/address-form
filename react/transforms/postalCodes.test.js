import {
  firstLevelPostalCodes,
  secondLevelPostalCodes,
  thirdLevelPostalCodes,
} from './postalCodes'

describe('Postal Code Transforms', () => {
  it('should transform state postal codes', () => {
    const oneLevelCountryData = {
      StateName01: {
        City01: '1',
        City02: '1',
      },
      StateName02: {
        City03: '2',
      },
    }

    const result = firstLevelPostalCodes(oneLevelCountryData)

    expect(result).toMatchSnapshot()
  })

  it('should transform cities postal codes', () => {
    const twoLevelsCountryData = {
      StateName01: {
        City01: '1',
        City02: '2',
      },
      StateName02: {
        City03: '3',
      },
    }

    const result = secondLevelPostalCodes(twoLevelsCountryData)

    expect(result).toMatchSnapshot()
  })

  it('should transform neighborhoods postal codes', () => {
    const threeLevelsCountryData = {
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

    const result = thirdLevelPostalCodes(threeLevelsCountryData)

    expect(result).toMatchSnapshot()
  })
})
