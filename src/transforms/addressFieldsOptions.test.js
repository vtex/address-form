import {
  getStates,
  getMapOfStatesAndCities,
  getMapOfStatesCitiesAndNeighborhoods,
} from './addressFieldsOptions.js'

describe('Transform Address Fields Options', () => {
  it('should get an array of states', () => {
    const mapStateAndCities = {
      State01: {
        City01: '1',
        City02: '2',
      },
      State02: {
        City03: '3',
      },
    }

    const result = getStates(mapStateAndCities)

    expect(result).toMatchSnapshot()
  })

  it('should get map of state and an array of cities', () => {
    const mapStateAndCities = {
      State01: {
        City01: '1',
        City02: '2',
      },
      State02: {
        City03: '3',
      },
    }

    const result = getMapOfStatesAndCities(mapStateAndCities)

    expect(result).toMatchSnapshot()
  })

  it('should get map of state, city and an array of neighborhoods', () => {
    const mapStateCitiesAndNeighborhoods = {
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

    const result = getMapOfStatesCitiesAndNeighborhoods(
      mapStateCitiesAndNeighborhoods
    )

    expect(result).toMatchSnapshot()
  })
})
