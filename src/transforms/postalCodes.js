import map from 'lodash/map'
import reduce from 'lodash/reduce'
import values from 'lodash/values'

export function statePostalCodes(mapOfStateAndCities) {
  return map(mapOfStateAndCities, (cities, state) => ({
    state,
    postalCode: values(cities)[0],
  }))
}

export function citiesPostalCodes(mapOfStateAndCities) {
  return reduce(
    mapOfStateAndCities,
    (memo, cities, state) => {
      memo[state] = map(cities, (postalCode, city) => ({ postalCode, city }))
      return memo
    },
    {}
  )
}

export function neighborhoodPostalCodes(mapOfStateCitiesAndNeighborhoods) {
  return reduce(
    mapOfStateCitiesAndNeighborhoods,
    (memo, cities, state) => {
      memo[state] = reduce(
        cities,
        (memoCities, neighborhoods, city) => {
          memoCities[city] = map(neighborhoods, (postalCode, neighborhood) => ({
            postalCode,
            neighborhood,
          }))
          return memoCities
        },
        {}
      )
      return memo
    },
    {}
  )
}
