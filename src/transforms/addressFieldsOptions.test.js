import {
  getOneLevel,
  getTwoLevels,
  getThreeLevels,
} from './addressFieldsOptions.js'

describe('Transform Address Fields Options', () => {
  it('should get one level', () => {
    const oneLevelcountryData = {
      State01: {
        City01: '1',
        City02: '2',
      },
      State02: {
        City03: '3',
      },
    }

    const result = getOneLevel(oneLevelcountryData)

    expect(result).toMatchSnapshot()
  })

  it('should get map of first level and an array of second level', () => {
    const twoLevelsCountryData = {
      State01: {
        City01: '1',
        City02: '2',
      },
      State02: {
        City03: '3',
      },
    }

    const result = getTwoLevels(twoLevelsCountryData)

    expect(result).toMatchSnapshot()
  })

  it('should get map of first and second level, and an array of third level', () => {
    const threeLevelCountryData = {
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

    const result = getThreeLevels(threeLevelCountryData)

    expect(result).toMatchSnapshot()
  })

  it('should handle the case where the second level is an array', () => {
    const twoLevelsCountryData = {
      State01: ['City01', 'City02'],
      State02: ['City03'],
    }

    const result = getTwoLevels(twoLevelsCountryData)

    expect(result).toMatchSnapshot()
  })

  it('should handle the case where the third level is an array', () => {
    const threeLevelCountryData = {
      State01: {
        City01: ['Neighborhood1', 'Neighborhood2'],
        City02: ['Neighborhood3'],
      },
      State02: {
        City03: ['Neighborhood4'],
      },
    }

    const result = getThreeLevels(threeLevelCountryData)

    expect(result).toMatchSnapshot()
  })
})
