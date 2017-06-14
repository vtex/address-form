import keys from 'lodash/keys'
import map from 'lodash/map'
import reduce from 'lodash/reduce'

export function getStates(mapOfStates) {
  return keys(mapOfStates)
}

export function getMapOfStatesAndCities(mapOfStatesAndCities) {
  return reduce(
    mapOfStatesAndCities,
    (memo, cities, state) => {
      memo[state] = keys(cities)
      return memo
    },
    {}
  )
}

export function getMapOfStatesCitiesAndNeighborhoods(
  mapOfStatesCitiesAndNeighborhoods
) {
  return reduce(
    mapOfStatesCitiesAndNeighborhoods,
    (memoStates, cities, state) => {
      memoStates[state] = reduce(
        cities,
        (memoCities, neighborhoods, city) => {
          memoCities[city] = map(
            neighborhoods,
            (postalCode, neighborhood) => neighborhood
          )
          return memoCities
        },
        {}
      )
      return memoStates
    },
    {}
  )
}
