import {
  getFirstLevel,
  getSecondLevel,
  getThirdLevel,
} from './addressFieldsOptions.js'

describe('Transform Address Fields Options', () => {
  it('should get of the first level', () => {
    const firstLevelcountryData = {
      State01: {
        City01: '1',
        City02: '2',
      },
      State02: {
        City03: '3',
      },
    }

    const result = getFirstLevel(firstLevelcountryData)

    expect(result).toMatchSnapshot()
  })

  it('should get map of first level and an array of second level', () => {
    const secondLevelCountryData = {
      State01: {
        City01: '1',
        City02: '2',
      },
      State02: {
        City03: '3',
      },
    }

    const result = getSecondLevel(secondLevelCountryData)

    expect(result).toMatchSnapshot()
  })

  it('should get map of first and second level, and an array of third level', () => {
    const thirdLevelCountryData = {
      State01: {
        City01: {
          Neighborhood1: '1',
          Neighborhood2: '2',
        },
        City02: {
          Neighborhood3: '3',
        },
      },
      State02: {
        City03: {
          Neighborhood1: '4',
        },
      },
    }

    const result = getThirdLevel(thirdLevelCountryData)

    expect(result).toMatchSnapshot()
  })
})
